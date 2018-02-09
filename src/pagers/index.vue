<template>
  <div id="app">
    <commonHeader v-on:login="login"></commonHeader>
    <div class="content">
      <leftBar v-bind:chapters="chapters" v-on:showContent="showContent"></leftBar>
      <div>{{content}}</div>
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
      content: '',
      loginShow: 0
    }
  },
  created: function () {
    this.getApiData()
  },
  methods: {
    getApiData () {
      this.$http.get('http://myblog.com/api?n=document').then((res) => {
        this.chapters = res.data.result
      }).catch(function (error) {
        console.log(error)
      })
    },
    showContent (id) {
      for (let i = 0; i < this.chapters.length; i++) {
        let chapter = this.chapters[i]
        if (id.toString() === chapter.id.toString()) {
          this.content = chapter.render
          return true
        }

        if (chapter.hasOwnProperty('sub')) {
          for (let j = 0; j < chapter.sub.length; j++) {
            let subChapter = chapter.sub[j]
            if (id.toString() === subChapter.id.toString()) {
              this.content = subChapter.render
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
</style>
