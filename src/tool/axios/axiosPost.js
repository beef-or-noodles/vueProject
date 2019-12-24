import axios from 'axios'
import {
    Loading,
    Message
} from 'element-ui'
import api from '../api/apiurl.js'
import store from '../vuex/store/store.js'
// axios.defaults.withCredentials = true; //是否携带cookie
axios.defaults.baseURL = api.baseURL; //默认请求地址
const http_status={'400':'请求错误','401':'未授权，请登录','403':'拒绝访问','404':'请求地址出错','408':'请求超时','500':'服务器内部错误','501':'服务未实现','502':'网关错误','503':'服务不可用','504':'网关超时','505':'HTTP版本不受支持'};

axios.defaults.timeout = 15000;
let loading = null;
let timer = null
// 设置拦截器
axios.interceptors.request.use( function(config) {
   let userData = store.state.userData
    if (userData.user_info.hasOwnProperty('id') && userData) {
        let token = userData.user_info.id
        config.headers.token = token;
    }
    /*请求超过一秒没回来就打开加载动画*/
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
function setloading() {
    store.commit("setToast",{show:true,icon:"loading",title:"加载中..."})
}

//关闭加载 清除请求定时器
function endLoading() {
    store.commit("setToast")
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
        axios.get(url, data)
            .then(response => {
                if (response.data.code == 200) {
                    resolve(response.data.data);
                    if (response.data.diaShow) {
                        messageBox('success', response.data.msg, 1500);
                    }
                } else {
                    messageBox('error', response.data.msg, 1500);
                }
            }, err => {
                let status = err.response.status;
                if (status === 404) {
                    messageBox('error', '没找到请求地址' + status, 1500);
                } else if (status === 500 || status === 504) {
                    messageBox('error', '服务器错误' + status, 1500);
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
                    messageBox('success', response.data.msg, 1500);
                }
            } else {
                messageBox('error', response.data.msg, 1500);
            }
        }, err => {
            let status = err.response.status;
            if (status === 404) {
                messageBox('error', '没找到请求地址' + status, 1500);
            } else if (status === 500 || status === 504) {
                messageBox('error', '服务器错误' + status, 1500);
            }
            reject(err)
        });
    })

}
