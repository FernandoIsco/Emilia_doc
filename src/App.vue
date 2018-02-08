<template>
  <div id="app">
    <commonHeader></commonHeader>
    <div class="content">
      <leftBar v-bind:chapters="chapters"></leftBar>
      <router-view/>
    </div>
  </div>
</template>

<script>
import commonHeader from '@/components/header'
import leftBar from '@/components/leftbar'

let chapters = require('./data/data.json')

export default {
  name: 'App',
  data () {
    return {
      chapters: chapters.data,
      content: ''
    }
  },
  components: {commonHeader, leftBar}
}
</script>

<style>
  body, ul {margin: 0;padding: 0;}
  li {list-style: none;}
  a {text-decoration: none; color: #666}
  .content {width: 100%;display: flex;flex-direction: row;}
</style>
