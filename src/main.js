// The Vue build version to load with the `import` command
/* jshint esversion: 6 */
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router/index';
import ElementUi from 'element-ui'; //引入element-ui
import 'element-ui/lib/theme-chalk/index.css'; //手动引入element-ui 的css
import Qs from 'qs';
import store from './tool/vuex/store/store.js';
import tool from './tool/public.js'
import {
  post,
  get
} from './tool/axios/axiosPost.js';
import api from './tool/api/apiurl.js';
//将axios挂载到Vue实例中的$ajax上面,在项目中的任何位置通过this.$post使用
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$api = api;
Vue.prototype.$tool = tool;//工具类
Vue.config.productionTip = false;
Vue.use(ElementUi); //调用element-ui
/* eslint-disable no-new */
// router.push('/')
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
});

//路由守卫
router.beforeEach((to, from, next) => {
  var login = sessionStorage.getItem('userInfo');
  var user = JSON.parse(login);
  if(to.meta.rootLogin){
    if(!user.isLogin){
        ElementUi.Message.error("请登陆")
        router.push('/login');
    }
  }
  if (to.meta.title != '' && to.meta.title != undefined) {
    document.title = to.meta.title;
  } else {
    document.title = "首页";
  }
  next();
});
