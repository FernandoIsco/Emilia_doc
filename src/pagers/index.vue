<template>
  <div id="app">
    <commonHeader v-on:login="login"></commonHeader>
    <div class="content">
      <leftBar v-bind:chapters="chapters" v-on:showContent="showContent"></leftBar>
      <div class="editor wInherit" v-if="isAdmin != 1"><mavon-editor v-model="content" class="wInherit" :toolbarsFlag="false" :editable="false" :default_open="defaultOpen" :subfield="false"></mavon-editor></div>
      <div class="editor wInherit" v-else><mavon-editor v-model="content" class="wInherit" :ishljs="true" @save="saveCont"></mavon-editor></div>
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
      isAdmin: localStorage.getItem('isAdmin')
    }
  },
  created: function () {
    this.getToken()
    this.getDocument()
  },
  methods: {
    getToken () {
      let data = {n: 'token', q: {token: ''}}
      this.$http(this.xhrData('post', data)).then((res) => {
        console.log(res)
      }).catch(function (error) {
        console.log(error)
      })
    },
    getDocument () {
      let data = {n: 'document'}
      this.$http(this.xhrData('get', data)).then((res) => {
        this.chapters = res.data.result
        this.showContent(0)
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
      let data = {n: 'document', q: {id: this.chapterId.toString(), value: value, render: render}}
      this.$http(this.xhrData('put', data)).then((res) => {
        if (this.chapters.length <= 0) return true

        for (let i = 0; i < this.chapters.length; i++) {
          let chapter = this.chapters[i]
          if (this.chapterId.toString() === chapter.id.toString()) {
            chapter.render = render
            chapter.content = value
            return true
          }

          if (chapter.hasOwnProperty('sub')) {
            for (let j = 0; j < chapter.sub.length; j++) {
              let subChapter = chapter.sub[j]
              if (this.chapterId.toString() === subChapter.id.toString()) {
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
