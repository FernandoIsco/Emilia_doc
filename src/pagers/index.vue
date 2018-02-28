<template>
  <div id="app">
    <commonHeader v-on:login="login" v-on:logout="logout"></commonHeader>
    <div class="content">
      <leftBar v-bind:chapters="chapters" v-on:showContent="showContent"></leftBar>
      <div class="editor wInherit" v-if="editable"><mavon-editor v-model="content" class="wInherit" :ishljs="true" @save="saveCont"></mavon-editor></div>
      <div class="editor wInherit" v-else><mavon-editor v-model="content" class="wInherit" :toolbarsFlag="false" :editable="false" :default_open="defaultOpen" :subfield="false"></mavon-editor></div>
    </div>
    <LoginDialog v-show="loginShow == 1" v-on:login="login"></LoginDialog>
  </div>
</template>

<script>
import commonHeader from '@/components/header'
import leftBar from '@/components/leftbar'
import LoginDialog from '@/components/login'

export default {
  name: 'Index',
  data () {
    return {
      defaultOpen: 'preview',
      chapters: '',
      renderContent: '',
      chapterId: 0,
      content: '',
      loginShow: 0,
      editable: parseInt(this.$cookie.get('isAdmin')) === 1 && this.$cookie.get('userName') !== ''
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
      this.renderContent = this.chapters[0].render
      this.content = this.chapters[0].content

      for (let i = 0; i < this.chapters.length; i++) {
        let chapter = this.chapters[i]
        if (this.chapterId.toString() === chapter.id.toString()) {
          this.renderContent = chapter.render
          this.content = chapter.content
          return true
        }

        if (chapter.hasOwnProperty('sub')) {
          for (let j = 0; j < chapter.sub.length; j++) {
            let subChapter = chapter.sub[j]
            if (this.chapterId.toString() === subChapter.id.toString()) {
              this.renderContent = subChapter.render
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
    login (bool) {
      this.loginShow = bool
    },
    logout () {
      let _ = this
      this.$http.remove({n: 'userLogin'}).then(function (data) {
        _.$cookie.del('userName')
        _.$cookie.del('isAdmin')
        window.location.reload()
      }).catch(function (error) {
        console.log(error)
      })
    }
  },
  components: {commonHeader, leftBar, LoginDialog}
}
</script>

<style>
  .content {width: 100%;display: flex;flex-direction: row;}
  .editor {padding: 20px}
  .wInherit {width: inherit}
</style>
