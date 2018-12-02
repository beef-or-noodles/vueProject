import axios from 'axios'
import { Loading,Message  } from 'element-ui'
import api from './api'
axios.defaults.withCredentials = true;//是否携带cookie
axios.defaults.baseURL = api.baseURL;//默认请求地址
//axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
let loading;
  // 设置拦截器
  axios.interceptors.request.use(function(config){
      //发送请求前做些什么
      config => {
        // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
        config.data = JSON.stringify(config.data);
        config.headers = {
          'Content-Type':'application/json'
        }
        // if(token){
        //   config.params = {'token':token}
        // }
        return config;
      },
      setloading();//加载动画
      return config;
    }, function (error) {
      // 对请求错误做些什么
      messageBox('error',error,1500);
      return Promise.reject(error);
  });
  // 添加响应拦截器
  axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    endLoading();
    return response;
  }, function (error) {
    // 对响应错误做点什么
    messageBox('error',error,1500);
    endLoading();
    return Promise.reject(error);
  });

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
//加载动画
function setloading(){
  loading = Loading.service({
    spinner:'el-icon-loading',
    text:'努力加载中。。。。',
    background:'rgba(0,0,0,0)',
    target:document.querySelector('.loadingTarget'),
  });
}
//关闭加载
function endLoading(){
  loading.close();
}
/*
*消息提示
*type:success  warning   info   error
*msg：消息文字
*time：关闭时间
*/
function messageBox(type,msg,time){
   Message({
     type:type,
     message:msg,
     duration:time,
     showClose:true,
   });
};
//psot 请求
 export function post(url,data = {}){
   return new Promise((resolve,reject) => {
     axios.post(url,data)
          .then(response => {
                resolve(response.data);
          },err => {
            messageBox('error',err,1500);
            reject(err)
          })
   })
 }
