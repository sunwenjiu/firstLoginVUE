/**
 * Created by zhoufeng on 18/2/16.
 * http配置
 */
import axios from 'axios'
// import store from './store/index'
/* import * as types from './store/modules/types'
import router from './router/index'
import $ from 'jquery' */

const service = axios.create({
  baseURL: 'http://localhost:8080/',
  // baseURL:'https://www.kmyg2008.com',
  timeout: 60000, // 30000
  withCredentials: false
})
service.defaults.withCredentials = false
service.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8,text/event-stream'
/*
service.interceptors.request.use( // http request 拦截器
  config => {
    // store.state.token config.headers.Authorization = `token ${store.state.token}`;
    if (store.state.user.loginFlag) {
      config.headers.Authorization = `${store.state.user.token}`
    }
    return config
  },
  err => {
    console.log('-------- 请求异常 ----------' + err)
    return Promise.reject(err)
  })
*/

// http response 拦截器
/* service.interceptors.response.use(
  response => {
    // console.log(JSON.stringify(response));
    return response
  },
  error => {
    console.log('------- error message -------' + JSON.stringify(error.message))
    if (error.message && error.message === 'Network Error') {
      console.log('-------- Network Error ----------')
    }
    if (error.message && error.message === 'timeout of 30000ms exceeded') {
      // store.commit(types.LOGOUT);
      // router.replace({
      //     path: 'login',
      //     query: {redirect: router.currentRoute.fullPath}
      // });
      console.log('-------- timeout of 30000ms exceeded ----------')
    }
    if (error && error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          // store.commit(types.LOGOUT);
          // router.replace({
          //     path: 'login',
          //     query: {redirect: router.currentRoute.fullPath}
          // });
          console.log('-------- error-401 ----------')
        case 302:
          // store.commit(types.LOGOUT);
          // router.replace({
          //     path: 'login',
          //     query: {redirect: router.currentRoute.fullPath}
          // });
          console.log('-------- error-302----------')
        case 404:
          console.log('error-404')
          // router.replace({
          //     path: 'error-404',
          //     query: {redirect: router.currentRoute.fullPath}
          // });
        case 500:
          console.log('error-500')
                // router.replace({
                //     path: 'error-500',
                //     query: {redirect: router.currentRoute.fullPath}
                // });
      }
    }
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(error)// error.response.data
  }) */

export default service
