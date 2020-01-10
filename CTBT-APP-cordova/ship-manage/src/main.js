// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI, { Col } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios'

// import $ from 'jquery'

//import VueAxios from 'vue-axios'
//引入echarts
import echarts from 'echarts'

import base from './base.js'
Vue.use(base);



Vue.use(ElementUI)
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.prototype.$axios = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
 data(){
   return {
    info:null
   // userName:'CTBTforV'
   }
  },
  router,
  components: { App },
  template: '<App/>',


})
/**
 * qQ0CsBemyq1DlGgtJRKK6WVUwQTmnei5,4,1016
 *
 *
 */
