import axios from 'axios'
import api from '../api/apiurl.js'
import store from '../vuex/store/store.js'
// axios.defaults.withCredentials = true; //是否携带cookie
axios.defaults.baseURL = api.baseURL; //默认请求地址
const http_status={'400':'请求错误','401':'未授权，请登录','403':'拒绝访问','404':'请求地址出错','408':'请求超时','500':'服务器内部错误','501':'服务未实现','502':'网关错误','503':'服务不可用','504':'网关超时','505':'HTTP版本不受支持'};

axios.defaults.timeout = 15000;

//防止重复提交
let pending = [];
let cancelToken = axios.CancelToken;
let removePending = (config)=>{
    for (let p in pending){
        if(pending[p].u+ pending[p].data=== config.url + '&' + config.method+JSON.stringify(config.data)){
            pending[p].f(); //执行取消操作
            pending.splice(p, 1); //把这条记录从数组中移除
        }
    }
}

// 设置拦截器
axios.interceptors.request.use( function(config) {
    removePending(config)
    config.cancelToken = new cancelToken((c)=>{
        // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
        pending.push({ u: config.url + '&' + config.method, f: c ,data:JSON.stringify(config.data)});
    });
   let userData = store.state.userData
    if (userData.user_info.hasOwnProperty('id') && userData) {
        let token = userData.user_info.id
        config.headers.token = token;
    }
    setloading(); //加载动画
    return config;
}, function (error) {
    console.log('进入请求拦截器');
    endLoading();
    // 对请求错误做些什么
    return Promise.reject(error);
});
// 添加响应拦截器
axios.interceptors.response.use(function(response){
    // 对响应数据做点什么
    removePending(response.config)
    endLoading();
    return response;
}, function (error) {
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
var loadingCount = 0;//设置请求个数
let timer = null;

function setloading() {
    if(loadingCount === 0){
        timer = setTimeout(()=>{
            store.commit("setToast",{show:true,icon:"loading",title:"加载中..."})
        },300);
    }
    loadingCount++
}

//关闭加载
function endLoading() {
    if(loadingCount<=0)return
    loadingCount--
    if(loadingCount === 0){
        window.clearTimeout(timer)
        store.commit("setToast")
    }

}
//psot 请求
export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(response => {
                if (response.data.code == 200) {
                    if (response.data.diaShow) {
                        store.commit("setToast",{show:true,icon:"success",title:response.data.msg})
                    }
                    resolve(response.data.data);
                } else {
                    store.commit("setToast",{show:true,icon:"error",title:response.data.msg})
                }
            }, err => {
                console.log(err)
                try {
                    let status = err.response.status;
                    store.commit("setToast",{show:true,icon:"error",title:http_status[status]})
                } catch (e) {
                    store.commit("setToast",{show:true,icon:"error",title:' 请求超时'})
                }
                reject(err)
            })
    })
};

//get 请求
export function get(url) {
    return new Promise((resolve, reject) => {
        axios.get(url)
          .then(response => {
              if (response.data.code == 200) {
                  if (response.data.diaShow) {
                      store.commit("setToast",{show:true,icon:"success",title:response.data.msg})
                  }
                  resolve(response.data.data);
              } else {
                  store.commit("setToast",{show:true,icon:"error",title:response.data.msg})
              }
          }, err => {
              console.log(err)
              try {
                  let status = err.response.status;
                  store.commit("setToast",{show:true,icon:"error",title:http_status[status]})
              } catch (e) {
                  store.commit("setToast",{show:true,icon:"error",title:' 请求超时'})
              }
              reject(err)
          })
    })
};

// 上传图片
export function uploadImg(url, data) {
    let param = new FormData(); // 创建form对象
    param.append("file", data); //) // 通过append向form对象添加数据
    return new Promise((resolve, redect) => {
        axios({
            method: 'post',
            url: url,
            data: param,
            headers: {
                "Content-Type": "multipart/form-data"
            },
        }).then(response => {
            if (response.data.code == 200) {
                resolve(response.data.data);
                if (response.data.diaShow) {
                    store.commit("setToast",{show:true,icon:"success",title:response.data.msg})
                }
            } else {
                store.commit("setToast",{show:true,icon:"error",title:response.data.msg})
            }
        }, err => {
            reject(err)
        });
    })

}
