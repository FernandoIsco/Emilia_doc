<template>
  <div id="app">
    <commonHeader v-on:login="login"></commonHeader>
    <div class="content">
      <leftBar v-bind:chapters="chapters" v-on:showContent="showContent"></leftBar>
      <div class="editor" v-if="isAdmin != 1" v-html="renderContent"></div>
      <div class="editor" v-else><mavon-editor v-model="content"></mavon-editor></div>
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
      chapters: '',
      renderContent: '',
      content: '',
      loginShow: 0,
      isAdmin: localStorage.getItem('isAdmin')
    }
  },
  created: function () {
    this.getApiData()
  },
  methods: {
    getApiData () {
      if (process.env.NODE_ENV !== 'development') {
        this.$http.get('http://myblog.com/api?n=document').then((res) => {
          this.chapters = res.data.result
        }).catch(function (error) {
          console.log(error)
        })
      } else {
        let data = require('@/data/data.json')
        this.chapters = data.data
      }

      this.showContent(0)
    },
    showContent (id) {
      if (this.chapters.length <= 0) {
        return true
      }

      this.renderContent = this.chapters[0].render
      this.content = this.chapters[0].content

      for (let i = 0; i < this.chapters.length; i++) {
        let chapter = this.chapters[i]
        if (id.toString() === chapter.id.toString()) {
          this.renderContent = chapter.render
          this.content = chapter.content
          return true
        }

        if (chapter.hasOwnProperty('sub')) {
          for (let j = 0; j < chapter.sub.length; j++) {
            let subChapter = chapter.sub[j]
            if (id.toString() === subChapter.id.toString()) {
              this.renderContent = subChapter.render
              this.content = subChapter.content
              return true
            }
          }
        }
      }
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
</style>
