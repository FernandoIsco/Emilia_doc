<template>
  <div>
    <common-header v-on:searchAct="searchAct"></common-header>
    <div class="content">
      <leftBar v-bind:chapters="chapters" v-on:showContent="showContent"></leftBar>
      <div class="editor" v-if="editable"><div class="editor-body"><mavon-editor v-model="content" class="wInherit" :ishljs="true" @save="saveCont"></mavon-editor></div></div>
      <div class="editor" v-else><div class="editor-body"><mavon-editor v-model="content" :toolbarsFlag="false" :editable="false" :default_open="defaultOpen" :subfield="false"></mavon-editor></div></div>
    </div>
    <login-dialog></login-dialog>
  </div>
</template>

<script src="./doc.js"></script>

<style scoped>
@import "./doc.css";
</style>
