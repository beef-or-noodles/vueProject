// The Vue build version to load with the `import` command
/* jshint esversion: 6 */
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router/index';
import ElementUi from 'element-ui'; //引入element-ui
import 'element-ui/lib/theme-chalk/index.css'; //手动引入element-ui 的css
import Qs from 'qs';
import lrz from 'lrz';//图片压缩工具
import store from './tool/vuex/store/store.js';
import tool from './tool/public.js';
import './assets/css/elementUI.css';
import {
  post,
  get,
  uploadImg
} from './tool/axios/axiosPost.js';
import api from './tool/api/apiurl.js';
//将axios挂载到Vue实例中的$ajax上面,在项目中的任何位置通过this.$post使用
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$uploadImg = uploadImg;
Vue.prototype.$api = api;
Vue.prototype.$tool = tool;//工具类
Vue.config.productionTip = false;
Vue.use(ElementUi); //调用element-ui
import "../static/view/css/iconfont.css";
//使用导航缓存页面插件
// import Navigation from 'vue-navigation'
// Vue.use(Navigation, {router,store,keyName:"KEY"})


//全局组件
Vue.component('wPage', resolve=>(require(["@/components/manage/components/wPage"],resolve)))

// markdowm
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// use
Vue.use(mavonEditor)
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
});

Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block)=>{
    hljs.highlightBlock(block)
  })
})

store.commit("setToast")
//路由守卫
router.beforeEach((to, from, next) => {
  var login = store.state.userData.user_info;
  if(to.name == from.name){
    document.documentElement.scrollTop=document.body.scrollTop=0;
  }

  store.commit("setToast")
  if(to.meta.rootLogin){
    if(!login.isLogin){
      ElementUi.Message.error("请登陆")
      router.push('/login');
    }
  }
  if (to.meta.title != '' && to.meta.title != undefined) {
    document.title = to.meta.title;
  } else {
    document.title = "一二三首页";
  }
  next();
});
