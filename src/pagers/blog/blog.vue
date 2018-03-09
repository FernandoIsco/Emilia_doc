<template>
  <div>
    <common-header v-bind:searchAble="0" v-bind:wrapStyle="{'width': '1000px', 'margin': '0 auto'}"></common-header>
    <login-dialog></login-dialog>
    <div class="blog">
      <div class="blog-head">
        <h2 class="blog-title">{{blog.title}}</h2>
        <div class="meta">
          <a class="author">{{blog.username}}</a>
          <span class="date">{{blog.created_at}}</span>
        </div>
      </div>
      <div class="blog-content">
        <mavon-editor v-if="editable" v-model="blog.summary" :ishljs="true" @save="saveCont"></mavon-editor>
        <mavon-editor v-else v-model="blog.summary" :toolbarsFlag="false" :editable="false" :default_open="'preview'"
                      :subfield="false"></mavon-editor>
      </div>
    </div>
  </div>
</template>

<script>
import commonHeader from '@/components/header'
import LoginDialog from '@/components/login'

export default {
  name: 'Index',
  data () {
    return {
      blog: null,
      editable: parseInt(this.$cookie.get('isAdmin')) === 1 && this.$cookie.get('userName') !== ''
    }
  },
  created: function () {
    let _ = this
    let blogId = this.$route.params.id
    let data = {n: 'blogs', q: {w: {id: blogId}}}
    this.$http.fetch(data).then(function (data) {
      _.blog = data.result.blog
    }).catch(function (error) {
      console.log(error)
    })
  },
  components: {commonHeader, LoginDialog}
}
</script>

<style scoped>
  .blog {
    width: 1000px;
    margin: 0 auto;
  }

  .blog .blog-head {
    padding-top: 30px;
    margin-bottom: 10px;
  }

  .blog-head .blog-title {
    font-size: 24px;
    margin-bottom: 10px;
  }

  .blog-head .meta {
    font-size: 14px;
  }

  .blog-head .meta .author {
    display: inline-block;
    color: #009a61;
    margin-right: 5px;
  }

  .blog-head .meta span {
    color: #9E9E9E;
  }
</style>
