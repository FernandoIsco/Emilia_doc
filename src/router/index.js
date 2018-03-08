import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/pagers/index/index.vue'
import Doc from '@/pagers/doc/doc.vue'
import Blog from '@/pagers/blog/blog.vue'

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
    },
    {
      path: '/blog/:id',
      name: 'Blog',
      component: Blog
    }
  ]
})
