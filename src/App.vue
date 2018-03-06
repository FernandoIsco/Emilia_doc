<template>
  <router-view/>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  body, ul {margin: 0;padding: 0;}
  li {list-style: none;}
  a {text-decoration: none; color: #666}
  .none {display: none}

  .leftbar::-webkit-scrollbar, .editor::-webkit-scrollbar { /*滚动条整体样式*/
    width: 8px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 0;
  }

  .leftbar::-webkit-scrollbar-thumb, .editor::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #c2c2c2;
  }

  .leftbar::-webkit-scrollbar-track, .editor::-webkit-scrollbar-track { /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
    border-radius: 10px;
    background: #fff;
  }
</style>
