<template>
  <div class="leftbar">
    <ul class="main-menu">
      <li v-for="chapter in chapters" v-bind:key="chapter.id">
        <a @click="showContent(chapter.id, true)" v-bind:class="{gray: chapter.searched === 0}">{{ chapter.name }}</a>
        <ul class="sub-menu">
          <li v-for="subChapter in chapter.sub" v-bind:key="subChapter.id">
            <a @click="showContent(subChapter.id)"
               v-bind:class="{gray: subChapter.searched === 0}">{{ subChapter.name}}</a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'LeftBar',
  mounted: function () {
    this.leftBarStyle.height = window.screen.availHeight + 'px'
  },
  data () {
    return {
      chapterId: 0,
      chapter: '',
      subChapter: '',
      leftBarStyle: {'height': '100%'}
    }
  },
  methods: {
    showContent: function (id, main) {
      window.scrollTo(0, 0)

      main = main || false
      if (main) this.chapterId = id

      this.$emit('showContent', [id])
    }
  },
  props: ['chapters']
}
</script>

<style scoped>
  .leftbar {
    position: absolute;
    bottom: 0;
    left: 0;
    top: 62px;
    font-family: "Helvetica Neue", "Hiragino Sans GB", "Microsoft YaHei", "\9ED1\4F53", Arial, sans-serif;
    padding-top: 20px;
    width: 15%;
    display: flex;
    flex-direction: column;
    border-right: 1px rgba(0, 0, 0, 0.1) solid;
    overflow-y: auto;
    z-index: 1501;
    background-color: #fff;
  }

  .leftbar li a {
    display: inline-block;
    text-indent: 16px;
    line-height: 18px;
    cursor: pointer;
    white-space: nowrap;
    width: 100%;
    overflow: hidden;
    padding: 10px 5px;
  }

  .leftbar li a.gray {
    color: #ccc
  }

  .leftbar li a:hover {
    background-color: #f2f2f2;
    color: #42b983
  }

  .sub-menu {
    padding-left: 20px;
  }
</style>
