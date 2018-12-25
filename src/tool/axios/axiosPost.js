import axios from 'axios'
import {
  Loading,
  Message
} from 'element-ui'
import api from '../api/apiurl.js'
// axios.defaults.withCredentials = true; //是否携带cookie
axios.defaults.baseURL = api.baseURL; //默认请求地址

let loading;
// 设置拦截器
axios.interceptors.request.use(function(config) {
  //发送请求前做些什么
  config => {
      const token = localStorage.getItem('TOKEN');//得到存入浏览器的token
      config.data = JSON.stringify(config.data);
      config.timeout = 3000;
      config.headers = {'Content-Type': 'application/json'}
      if(token){
         config.headers.token = token;
      }
      return config;
    },
    setloading(); //加载动画
  return config;
}, function(error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
// 添加响应拦截器
axios.interceptors.response.use(function(response) {
  // 对响应数据做点什么
  endLoading();
  return response;
}, function(error) {
  // 对响应错误做点什么
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
function setloading() {
  loading = Loading.service({
    spinner: 'el-icon-loading',
    text: '努力加载中。。。。',
    background: 'rgba(0,0,0,0.5)',
    target: document.querySelector('.loadingTarget'),
  });
}
//关闭加载
function endLoading() {
  loading.close();
}
/*
 *消息提示
 *type:success  warning   info   error
 *msg：消息文字
 *time：关闭时间
 */
function messageBox(type, msg, time) {
  Message({
    type: type,
    message: msg,
    duration: time,
    showClose: true,
  });
};
//psot 请求
export function post(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        if(response.data.code == 200){
          resolve(response.data.data);
        }else{
          messageBox('error',response.data.msg,1500);
        }
      }, err => {
        let status = err.response.status;
        if(status === 404){
          messageBox('error', '没找到请求地址'+status, 1500);
        }else if(status === 500){
          messageBox('error', '服务器错误'+status, 1500);
        }
        reject(err)
      })
  })
};
//get 请求
export function get(url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, data)
      .then(response => {
        if(response.data.code == 200){
          resolve(response.data);
        }else{
          messageBox('error',response.data.msg,1500);
        }
      }, err => {
        let status = err.response.status;
        if(status === 404){
          messageBox('error', '没找到请求地址'+status, 1500);
        }else if(status === 500){
          messageBox('error', '服务器错误'+status, 1500);
        }
        reject(err)
      })
  })
}
