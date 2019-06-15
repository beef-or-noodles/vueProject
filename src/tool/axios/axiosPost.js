import axios from 'axios'
import {
    Loading,
    Message
} from 'element-ui'
import api from '../api/apiurl.js'
import store from '../vuex/store/store.js'
// axios.defaults.withCredentials = true; //是否携带cookie
axios.defaults.baseURL = api.baseURL; //默认请求地址
axios.defaults.timeout = 6000;
let loading;
// 设置拦截器
axios.interceptors.request.use( function(config) {
   let userData = store.state.userData
    if (userData.user_info.hasOwnProperty('data') && userData) {
        let token = userData.user_info.data[0].id
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
    loading = Loading.service({
        spinner: 'el-icon-loading',
        text: '客官别慌，随后就到',
        background: 'rgba(0,0,0,0)',
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
                if (response.data.code == 200) {
                    if (response.data.diaShow) {
                        messageBox('success', response.data.msg, 1500);
                    }
                    resolve(response.data.data);
                } else {
                    messageBox('error', response.data.msg, 1500);
                }
            }, err => {
                console.log(err)
                try {
                    let status = err.response.status;
                    if (status === 404) {
                        messageBox('error', '没找到请求地址' + status, 1500);
                    } else if (status === 500 || status === 504) {
                        messageBox('error', '服务器错误' + status, 1500);
                    }
                } catch (e) {
                    messageBox('error', ' 请求超时' + status, 1500);
                }
                endLoading();
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
                endLoading();
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
            endLoading();
            reject(err)
        });
    })

}
