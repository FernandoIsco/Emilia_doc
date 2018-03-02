import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pagers/index/index.vue'
import Doc from '@/pagers/doc/doc.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/doc',
      name: 'Doc',
      component: Doc
    }
  ]
})
