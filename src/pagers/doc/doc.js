import commonHeader from '@/components/header'
import leftBar from '@/components/leftbar'
import loginDialog from '@/components/login'

export default {
  name: 'Index',
  data () {
    return {
      chapters: '', // 所有章节
      chapterId: 0, // 当前选中的章节
      content: '', // 显示内容
      editable: parseInt(this.$cookie.get('isAdmin')) === 1 && this.$cookie.get('userName') !== '',
      searchInterval: ''
    }
  },
  created: function () {
    this.getToken()
  },
  methods: {
    getToken () {
      let _ = this
      _.$http.post({n: 'token'}).then(function (data) {
        _.$cookie.set('session', data.result.token)
      }).then(function () {
        _.getDocument()
      }).catch(function (error) {
        console.log(error)
      })
    },
    getDocument () {
      let _ = this
      _.$http.fetch({n: 'document'}).then(function (data) {
        _.chapters = data.result.documents
        _.showContent(0)
      }).catch(function (error) {
        console.log(error)
      })
    },
    showContent (id) {
      if (this.chapters.length <= 0) {
        return true
      }

      this.chapterId = id
      this.content = this.chapters[0].content

      for (let i = 0; i < this.chapters.length; i++) {
        let chapter = this.chapters[i]
        if (this.chapterId.toString() === chapter.id.toString()) {
          this.content = chapter.content
          return true
        }

        if (chapter.hasOwnProperty('sub')) {
          for (let j = 0; j < chapter.sub.length; j++) {
            let subChapter = chapter.sub[j]
            if (this.chapterId.toString() === subChapter.id.toString()) {
              this.content = subChapter.content
              return true
            }
          }
        }
      }
    },
    saveCont: function (value, render) {
      let _ = this
      let json = {n: 'document', q: {id: this.chapterId.toString(), value: value, render: render}}
      this.$http.put(json).then(function (data) {
        if (_.chapters.length <= 0) return true

        for (let i = 0; i < _.chapters.length; i++) {
          let chapter = _.chapters[i]
          if (_.chapterId.toString() === chapter.id.toString()) {
            chapter.render = render
            chapter.content = value
            return true
          }

          if (chapter.hasOwnProperty('sub')) {
            for (let j = 0; j < chapter.sub.length; j++) {
              let subChapter = chapter.sub[j]
              if (_.chapterId.toString() === subChapter.id.toString()) {
                subChapter.render = render
                subChapter.content = value
                return true
              }
            }
          }
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    searchAct (data) {
      let ids
      clearTimeout(this.searchInterval)
      if (data.searchKey) {
        let _ = this
        this.searchInterval = setTimeout(function () {
          ids = []
          _.$http.fetch({n: 'document', q: {w: {sk: data.searchKey}}}).then(function (data) {
            if (data.result.ids) {
              for (let i = 0; i < data.result.ids.length; i++) {
                let idItem = data.result.ids[i]
                ids.push(idItem.id)
                ids.push(idItem.parent_id)
              }
            }
            _.searchContent(ids)
          }).catch(function (error) {
            console.log(error)
          })
        }, 250)
      } else {
        this.searchContent(ids)
      }
    },
    searchContent (ids) {
      for (let i = 0; i < this.chapters.length; i++) {
        let chapter = this.chapters[i]
        chapter.searched = (!ids || (ids && ids.indexOf(chapter.id) >= 0)) ? 1 : 0

        if (chapter.hasOwnProperty('sub')) {
          for (let j = 0; j < chapter.sub.length; j++) {
            let subChapter = chapter.sub[j]
            subChapter.searched = (!ids || (ids && ids.indexOf(subChapter.id) >= 0)) ? 1 : 0
          }
        }
      }
    }
  },
  components: {commonHeader, leftBar, loginDialog}
}
