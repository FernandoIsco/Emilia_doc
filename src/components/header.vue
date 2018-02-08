<template>
  <div class="header">
    <div class="search">
      <input type="text" class="search-input" autocomplete="off" />
    </div>

  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {}
  }
}
</script>

<style scoped>
  .header {display: flex; flex-direction: row-reverse; position: relative; height: 40px; background-color: #fff; padding: 10px 100px;box-shadow: 0 0 1px rgba(0,0,0,0.25);}

  .search {height: 30px; padding: 5px 0;}
  .search-input {width: 150px; height: 30px; outline: none; line-height: 30px; font-size: 16px; color: #2c3e50; padding: 0 35px; border: 1px solid #e3e3e3; border-radius: 15px; background: #fff url(../assets/images/search.png) 8px 4px no-repeat; background-size: 25px;}
</style>
