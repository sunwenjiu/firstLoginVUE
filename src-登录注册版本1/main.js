// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import iView from 'iview'
import router from './router'
import axios from 'axios'
// import axios from './http'
import 'iview/dist/styles/iview.css'
Vue.config.productionTip = false
/* eslint-disable no-new */

Vue.use(iView)
axios.defaults.baseURL = '/api'
/* axios.defaults.withCredentials = true
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8,text/event-stream'
// axios.defaults.headers.get['Content-Type'] = 'application/json;charset=utf-8,text/event-stream'
axios.defaults.baseURL = 'http://localhost:8080' */
// Vue.prototype.axios = axios // 重写ajax提交
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
