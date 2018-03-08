<template>
  <div>
    <common-header v-bind:searchAble="0" v-bind:wrapStyle="{'width': '1000px', 'margin': '0 auto'}"></common-header>
    <Login-dialog></Login-dialog>
    <div class="blog-list">
      <div class="item" v-for="blog in blogs" v-bind:key="blog.id">
        <div class="title">
          <a v-bind:href="blog.id|getHref">{{blog.title}}</a>
        </div>
        <div class="meta">
          <a>{{blog.username}}</a>
          <span class="dot">-</span>
          <span class="date">{{(new Date(blog.created_at)).toDateString()}}</span>
          <span class="dot">-</span>
          <a>{{blog.comments}} 评论</a>
        </div>
        <a class="content" v-bind:href="blog.id|getHref">
          {{blog.summary}}
        </a>
      </div>
    </div>
  </div>
</template>

<script src="./index.js"></script>

<style scoped>
  @import "./index.css";
</style>
