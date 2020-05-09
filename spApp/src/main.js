import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import { Group, Cell } from 'vux'

import Vuex from 'vuex'
Vue.use(Vuex)
import store from '@/store/'

import Vue2Touch from 'vue2x-touch'
Vue.use(Vue2Touch)

import base from '@/store/base'

//以阻止 vue 在启动时生成生产提示。
Vue.config.productionTip = false

//node获取数据baseurl

//axios.defaults.baseURL = 'http://don.com'
axios.defaults.baseURL = ''


Vue.prototype.base = base;
Vue.use(VueAxios, axios)



// 自定义事件注册title
Vue.directive('title', {
    inserted: function(el, binding) {
        document.title = el.dataset.title
    }
})

//全局组件
import tabbar from '@/components/tabbar'
import loginLayer from '@/components/loginLayer'
Vue.component(tabbar.name, tabbar)
Vue.component(loginLayer.name, loginLayer)
import { AlertPlugin, ToastPlugin ,Alert} from 'vux'
Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(Alert)

// 点击延迟
const FastClick = require('fastclick')
FastClick.attach(document.body)

/* 登录拦截器 */
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!base.auth.loggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
