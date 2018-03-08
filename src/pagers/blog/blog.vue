<template>
  <div>
    <common-header v-bind:searchAble="0" v-bind:wrapStyle="{'width': '1000px', 'margin': '0 auto'}"></common-header>
  </div>
</template>

<script>
import commonHeader from '@/components/header'
import LoginDialog from '@/components/login'

export default {
  name: 'Index',
  data () {
    return {
      blogId: this.$route.params.id
    }
  },
  components: {commonHeader, LoginDialog}
}
</script>
