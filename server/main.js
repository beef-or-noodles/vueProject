// node 后端服务器

const userApi = require('./totalApi/userApi.js');//挂在接口
const upload = require('./totalApi/uploadApi/upload');
const columnApi = require('./totalApi/columnApi');
const articeApi = require('./totalApi/articeApi');
const sendEmailApi = require('./totalApi/sendEmailApi');

const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
let http = require("http");
let https = require("https");
const app = express();


// // 具体参数我们在后面进行解释
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});




// 使用 session 中间件
app.use(session({
    secret :  'secret', // 对session id 相关的cookie 进行签名
    resave : true,
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie : {
        maxAge : 1000 * 60 * 2, // 设置 session 的有效时间，单位毫秒
    },
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
// 服务开启后访问指定编译好的dist文件下的数据
app.use(express.static(path.resolve(__dirname, '../dist')))
app.get('*', function(req, res) {
    const html = fs.readFileSync(path.resolve(__dirname, '../dist/index.html'), 'utf-8')
    res.send(html)
})
// 后端api路由
app.use('/api', [userApi,upload,columnApi,articeApi,sendEmailApi]);

const httpsOption = { //加入Https证书
    key : fs.readFileSync("./https/2215442_www.smartwu.top.key"),
    cert: fs.readFileSync("./https/2215442_www.smartwu.top.pem")
}

// Create service
// http.createServer(app).listen(server);
https.createServer(httpsOption, app).listen(443);
console.log('服务启动成功 服务端口:8889......');


// at the top of app.js
var server  = require('http').createServer(app);
var io      = require('socket.io').listen(server);

// at the bottom of app.js
server.listen('8889', () => {
    console.log('Server listening on Port 8889');
})

// your code
io.on('connect', (socket) => {
    io.on("submit",(val)=>{
       console.log("接收",val);
    });
    console.log("scoket链接成功");
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
