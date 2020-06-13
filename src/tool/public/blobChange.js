/**
 * Created by HIAPAD on 2020/4/9.
 */

// blob字符串转换成blob对象
export function loadImageToBlob(url) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest()
        xhr.open('get', url, true)
        xhr.responseType = 'blob'
        xhr.onload = function() {
            // 注意这里的this.response 是一个blob对象 就是文件对象
            if (this.status === 200) {
                resolve(this.response)
            } else {
                reject('错误')
            }
        }
        xhr.send()
    })
}
// 将网络图片转换为base64
export function getBase64(img) {
    function getBase64Image(img, width, height) {
        var canvas = document.createElement('canvas')
        canvas.width = width || img.width
        canvas.height = height || img.height
        var ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        var dataURL = canvas.toDataURL()
        return dataURL
    }
    var image = new Image()
    image.crossOrigin = 'anonymous'
    image.src = img
    return new Promise((resolve, reject) => {
        image.onload = function() {
            resolve(getBase64Image(image))// 将base64传给done上传处理
        }
    })
}

