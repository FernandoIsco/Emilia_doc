<template>
  <div id="app">
    <commonHeader v-on:login="login" v-on:logout="logout" v-on:searchAct="searchAct"></commonHeader>
    <div class="content">
      <leftBar v-bind:chapters="chapters" v-on:showContent="showContent"></leftBar>
      <div class="editor wInherit" v-if="editable"><mavon-editor v-model="content" class="wInherit" :ishljs="true" @save="saveCont"></mavon-editor></div>
      <div class="editor wInherit" v-else><mavon-editor v-model="content" class="wInherit" :toolbarsFlag="false" :editable="false" :default_open="defaultOpen" :subfield="false"></mavon-editor></div>
    </div>
    <LoginDialog v-show="loginShow == 1" v-on:login="login"></LoginDialog>
  </div>
</template>

<script src="./index.js"></script>

<style scoped>
@import "./index.css";
</style>
