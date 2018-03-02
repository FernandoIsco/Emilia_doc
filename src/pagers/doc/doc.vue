<template>
  <div>
    <common-header v-on:searchAct="searchAct"></common-header>
    <div class="content">
      <leftBar v-bind:chapters="chapters" v-on:showContent="showContent"></leftBar>
      <div class="editor wInherit" v-if="editable"><mavon-editor v-model="content" class="wInherit" :ishljs="true" @save="saveCont"></mavon-editor></div>
      <div class="editor wInherit" v-else><mavon-editor v-model="content" class="wInherit" :toolbarsFlag="false" :editable="false" :default_open="defaultOpen" :subfield="false"></mavon-editor></div>
    </div>
    <login-dialog></login-dialog>
  </div>
</template>

<script src="./doc.js"></script>

<style scoped>
@import "./doc.css";
</style>
