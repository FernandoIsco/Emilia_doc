<template>
  <div class="leftbar">
    <ul class="main_menu">
      <li v-for="chapter in chapters" v-bind:key="chapter.id">
        <a @click="showContent(chapter.id)">{{ chapter.name }}</a>
        <ul v-if="chapter.hasOwnProperty('sub')" class="sub_menu">
          <li v-for="subChapter in chapter.sub" v-bind:key="subChapter.id">
            <a @click="showContent(subChapter.id)" >{{ subChapter.name }}</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'LeftBar',
  data () {
    return {
      chapter: '',
      subChapter: ''
    }
  },
  methods: {
    showContent: function (id) {
      this.$emit('showContent', [id])
    }
  },
  props: ['chapters']
}
</script>

<style scoped>
  .leftbar {padding-top: 20px;width: 220px;display: flex;flex-direction: column;border-right:1px rgba(0,0,0,0.1) solid;}
  .leftbar li a{display: inline-block;text-indent: 16px;line-height: 36px;cursor: pointer;white-space: nowrap;width: 100%;overflow: hidden;}
  .leftbar li:hover {background-color: #f2f2f2;}
  .leftbar li:hover>a{color: #42b983}

  .sub_menu {padding-left: 20px;}
</style>
