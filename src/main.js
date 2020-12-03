// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import http from './http'
import api from './api'

import router from './router'
import App from './App'
import 'xe-utils'
import VXETable from 'vxe-table'
import 'vxe-table/lib/style.css'
import './assets/style/global.css'
import 'default-passive-events'

import echarts from 'echarts'
Vue.prototype.$echarts = echarts
import moment from 'moment'
import Print from 'vue-print-nb'
Vue.use(Print);
// import "./mock/index"

import axios from 'axios'
Vue.prototype.$http = axios
import store from './store/index'

Vue.use(VXETable)
Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.filter('dateFmt', (input, formatString = "YYYY-MM-DD") => {
  //es5函数参数设置默认值
  //const lastFormatString = formatString || ''
   // moment(input) 把时间字符串转成时间对象
   // format(formatString) 把时间对象，按照指定格式，格式化成符合条件的字符串
  return moment(input).format(formatString)
})


function btnArr(code){

  var arr = store.state.btnArr
  return arr.indexOf(code) > -1
}
Vue.prototype.hasPerm = btnArr;

router.beforeEach((to,from,next) =>{
  let username = localStorage.getItem('username')
  if(username != null){
    next()
  }else{
    if(to.path == "/login"){
      next()
    }else{
      next({name:'login'})
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  created(){
    store.commit('addMenu',router)
  },
  components: { App },
  template: '<App/>'
})
