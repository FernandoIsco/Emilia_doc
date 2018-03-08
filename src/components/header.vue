<template>
  <div class="header">
    <div class="wrap" v-bind:style="wrapStyle">
      <ul class="nav" v-if="userName == ''">
        <li><a @click="showLoginAct">登录</a></li>
      </ul>
      <ul class="nav" v-else>
        <li><a>{{userName}}</a></li>
        <li><a @click="logout">登出</a></li>
      </ul>
      <div class="search" v-show="searchAble == 1">
        <input type="text" class="search-input" autocomplete="off" @keyup="searchAct" v-model="searchKey"/>
      </div>
    </div>
  </div>
</template>

<script>
import bus from '../utils/event'
export default {
  name: 'Header',
  data () {
    return {
      searchKey: '',
      userName: this.$cookie.get('userName') || ''
    }
  },
  methods: {
    showLoginAct () {
      bus.$emit('showLoginAct')
    },
    logout () {
      let _ = this
      this.$http.remove({n: 'userLogin'}).then(function (data) {
        _.$cookie.del('userName')
        _.$cookie.del('isAdmin')
        window.location.reload()
      }).catch(function (error) {
        console.log(error)
      })
    },
    searchAct () {
      this.$emit('searchAct', {searchKey: this.searchKey})
    }
  },
  props: {
    'searchAble': {
      default: 1,
      type: Number
    },
    'wrapStyle': {}
  }
}
</script>

<style scoped>
  .header {
    font-family: "Helvetica Neue", "Hiragino Sans GB", "Microsoft YaHei", "\9ED1\4F53", Arial, sans-serif;
    position: relative;
    box-shadow: 0 1px 2px rgba(150, 150, 150, 0.4);
  }

  .wrap {
    display: flex;
    flex-direction: row-reverse;
    height: 40px;
    background-color: #fff;
    padding: 10px;
  }

  .search {
    height: 30px;
    padding: 5px 5px 5px 0;
  }

  .search-input {
    width: 150px;
    height: 30px;
    outline: none;
    line-height: 30px;
    font-family: "Helvetica Neue", "Hiragino Sans GB", "Microsoft YaHei", "\9ED1\4F53", Arial, sans-serif;
    font-size: 16px;
    color: #2c3e50;
    padding: 0 35px;
    border: 1px solid #e3e3e3;
    border-radius: 15px;
    background: #fff url(../assets/images/search.png) 8px 4px no-repeat;
    background-size: 25px;
  }

  .nav {
    display: flex;
  }

  .nav li a {
    display: inline-block;
    line-height: 30px;
    padding: 5px 10px;
  }

  .nav li a:hover {
    color: #42b983;
    cursor: pointer;
  }
</style>
