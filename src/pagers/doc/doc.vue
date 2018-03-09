<template>
  <div>
    <common-header v-on:searchAct="searchAct"></common-header>
    <div class="content">
      <leftBar v-bind:chapters="chapters" v-on:showContent="showContent"></leftBar>
      <div class="editor">
        <div class="editor-body">
          <mavon-editor v-if="editable" v-model="content" :ishljs="true" @save="saveCont"></mavon-editor>
          <mavon-editor  v-else v-model="content" :toolbarsFlag="false" :editable="false" :default_open="'preview'" :subfield="false"></mavon-editor>
        </div>
        <div class="footer">
          <ul>
            <li><a href="https://github.com/FernandoIsco/Emilia" target="_blank">项目地址</a></li>
            <li><a href="mailto:604625124@qq.com">联系邮箱</a></li>
          </ul>
        </div>
      </div>
    </div>
    <login-dialog></login-dialog>
  </div>
</template>

<script src="./doc.js"></script>

<style scoped>
@import "./doc.css";
</style>
