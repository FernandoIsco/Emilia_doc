import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pagers/index'
import FrameworkBase from '@/pagers/base'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/base',
      name: 'FrameworkBase',
      component: FrameworkBase
    }
  ]
})
