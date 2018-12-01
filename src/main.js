// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUi from'element-ui'//引入element-ui
import 'element-ui/lib/theme-chalk/index.css'//手动引入element-ui 的css
import axios from 'axios'
import Qs from 'qs'
Vue.config.productionTip = false
Vue.use(ElementUi)//调用element-ui
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
