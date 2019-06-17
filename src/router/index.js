/*
路由器模块
* */
import Vue from 'vue'
import VueRouter from 'vue-router'

import Reg from '../components/reg'
import Login from '../components/Login'
import Home from '../components/Home'

Vue.use(VueRouter)

export default new VueRouter({
  // 多个路由
  routes: [
    {
      path: '/reg',
      component: Reg
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/',
      redirect: '/reg'
    }
  ]
})
