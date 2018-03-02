<template>
  <div>
    <common-header v-bind:searchAble="0"></common-header>
    <Login-dialog></Login-dialog>
    <div class="blog-list">
      <div class="item" v-for="blog in blogs" v-bind:key="blog.id">
        <div class="title">
          <a>{{blog.title}}</a>
        </div>
        <div class="meta">
          <a>{{blog.user_id}}</a>
          <span class="dot">-</span>
          <span class="date">{{blog.created_at}}</span>
          <span class="dot">-</span>
          <a>{{blog.comments}} 评论</a>
        </div>
        <div class="content">
          <a>{{blog.summary}}</a>
        </div>
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
      blogs: ''
    }
  },
  created: function () {
    this.getBlogs()
  },
  methods: {
    getBlogs () {
      let _ = this
      this.$http.fetch({n: 'blogs', q: {ta: {pa: 0, li: 5}}}).then(function (data) {
        _.blogs = data.result.list
      }).catch(function (error) {
        console.log(error)
      })
    }
  },
  components: {commonHeader, LoginDialog}
}
</script>

<style scoped>
.blog-list {width: 1000px; margin: 30px auto 0; padding: 0 24px;font-family: -apple-system,"Helvetica Neue",Helvetica,Arial,"PingFang SC","Hiragino Sans GB","WenQuanYi Micro Hei","Microsoft Yahei",sans-serif}
.blog-list .item {padding: 15px 10px 30px;border-bottom: 1px solid #eee}
.blog-list .item .title {font-size: 18px;line-height: 24px;margin-bottom: 6px;}
.blog-list .item .meta {font-size: 14px;margin-bottom: 6px;}
.blog-list .item .dot {display: inline-block;padding: 0 5px;}
.blog-list .item .meta a {color: #009a61;}
.blog-list .item .meta span {color: #9E9E9E;}
.blog-list .item .content {font-size: 16px;line-height: 24px;}
</style>
