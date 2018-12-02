// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUi from'element-ui'//引入element-ui
import 'element-ui/lib/theme-chalk/index.css'//手动引入element-ui 的css
import Qs from 'qs'
import store from './tool/vuex/store/store.js'
import {post} from './tool/axios/axiosPost.js'
import api from './tool/api/apiurl.js'
//将axios挂载到Vue实例中的$ajax上面,在项目中的任何位置通过this.$post使用
Vue.prototype.$post = post;
Vue.prototype.$api = api;
Vue.config.productionTip = false
Vue.use(ElementUi)//调用element-ui
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
