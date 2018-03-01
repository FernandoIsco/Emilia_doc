<template>
  <div class="header">
    <ul class="nav" v-if="userName == ''">
      <li><a @click="login">sign in</a></li>
    </ul>
    <ul class="nav" v-else>
      <li><a>{{userName}}</a></li>
      <li><a @click="logout">sign out</a></li>
    </ul>
    <div class="search">
      <input type="text" class="search-input" autocomplete="off" @keyup="searchAct" v-model="searchKey"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      searchKey: '',
      userName: this.$cookie.get('userName') || ''
    }
  },
  methods: {
    login () {
      this.$emit('login', [1])
    },
    logout () {
      this.$emit('logout')
    },
    searchAct () {
      this.$emit('searchAct', this.searchKey)
    }
  }
}
</script>

<style scoped>
  .header {display: flex; flex-direction: row-reverse; position: relative; height: 40px; background-color: #fff; padding: 10px 10px 10px 100px;box-shadow: 0 0 1px rgba(0,0,0,0.25);}

  .search {height: 30px; padding: 5px 0;}
  .search-input {width: 150px; height: 30px; outline: none; line-height: 30px; font-size: 16px; color: #2c3e50; padding: 0 35px; border: 1px solid #e3e3e3; border-radius: 15px; background: #fff url(../assets/images/search.png) 8px 4px no-repeat; background-size: 25px;}

  .nav {display: flex;}
  .nav li a {display: inline-block;line-height: 30px;padding: 5px 10px;font-size: 18px;}
  .nav li a:hover {color: #42b983;cursor: pointer;}
</style>
