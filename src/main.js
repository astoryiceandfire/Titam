// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/index'
import ElementUI from 'element-ui'
import $ from 'jquery'
import axios from 'axios'
Vue.config.productionTip = false

import 'bootstrap/js/bootstrap.min.js'
import 'bootstrap/css/bootstrap.min.css'
import '@/assets/css/font-awesome.min.css'
import 'element-ui/lib/theme-default/index.css'
import './style/common.css'
import API from '@/api.js'
import VueQuillEditor from 'vue-quill-editor'
var querystring = require('querystring');
Vue.prototype.API = API
Vue.use(ElementUI)
Vue.use(VueQuillEditor)
//添加请求拦截器

// Vue.directive('role', function (el, binding) {
  
//    // console.log(binding.value)
//     // Vue.nextTick(function () {
//     //   console.log(el,el.parentNode.removeChild(el))
//     // })
   
     
 
// })

axios.interceptors.request.use(function(config){    
      config.data = querystring.stringify(config.data)

     return config;
   },function(error){
   
     return Promise.reject(error);
   });

axios.interceptors.response.use(function (response) {
   
    return response;
  }, function (error) {
    // Do something with response error 
    return Promise.reject(error);
  });



/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
