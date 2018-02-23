// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import myConfig from './lib/config/config'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.config.productionTip = false
Vue.prototype.$http = axios
Vue.use(mavonEditor)
Vue.use(myConfig)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App, mavonEditor},
  template: '<App/>'
})
