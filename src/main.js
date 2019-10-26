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
import './assets/css/iconfont/iconfont.css';
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


new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
});

// 格式时间
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
//路由守卫
router.beforeEach((to, from, next) => {
  var login = store.state.userData.user_info;
  if(to.meta.rootLogin){
    if(!login.isLogin){
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
