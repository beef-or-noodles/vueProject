// node 后端服务器

const userApi = require('./totalApi/userApi.js');//挂在接口
const upload = require('./totalApi/uploadApi/upload');
const columnApi = require('./totalApi/columnApi');
const articeApi = require('./totalApi/articeApi');
const sendEmailApi = require('./totalApi/sendEmailApi');
const system = require('./totalApi/system');
const commentApi = require('./totalApi/commentApi');
const config = require("./tool/config")

const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
let http = require("http");
let https = require("https");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//请求拦截
app.all('*', function (req, res, next) {
    /*res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",'1')
    res.header("Content-Type", "application/json;charset=utf-8");*/
    if(config.loseApi.indexOf(req.path) != -1 || req.path.indexOf(".")!=-1){
        next();
    }else{
        let txt = (req.headers["user-agent"].split(";")[0]).split(" ")[1];
        let versions = txt.substr(1,txt.length);
        let params = JSON.stringify(req.body);
        let userId = req.headers.token;
        let data = {
            ip:req.ip,
            api:req.path,
            params,
            versions,
            userId
        }
        system.connLog(data)
        next();
    }
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
// 服务开启后访问指定编译好的dist文件下的数据
app.use(express.static(path.resolve(__dirname, './dist')))
app.use(express.static(path.resolve(__dirname, './upload')))
app.get('*', function(req, res) {
    const html = fs.readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf-8')
    res.send(html)
})
// 后端api路由
app.use('/api', [userApi,upload,columnApi,articeApi,sendEmailApi,system.router,commentApi]);

const httpsOption = { //加入Https证书
    key : fs.readFileSync("./https/2215442_www.smartwu.top.key"),
    cert: fs.readFileSync("./https/2215442_www.smartwu.top.pem")
}

// Create service
// http.createServer(app).listen(server);
if (config.EVN == "production") {
    //生产环境
    var server =  https.createServer(httpsOption, app)
    var io      = require('socket.io').listen(server);
    server.listen('443', () => {
        console.log('Server listening on Port 443');
    })
}else{
    //开发环境
    var server  = require('http').createServer(app);
    var io      = require('socket.io').listen(server);
    server.listen('8889', () => {
        console.log('Server listening on Port 8889');
    })
}





/*-------------scoketio  start---------------*/

// socket.emit('message',"this is a test");//发送给对应的客户端
//
// io.sockets.emit('message',"this is a test");//发送给所有客户端
//
// socket.broadcast.emit('message',"this is a test");//发送给除了发送者之外的所有客户端
//
// socket.broadcast.to('game').emit('message','nice game');//发送给房间game中除了发送者的所有客户端
//
// io.sockets.in('game').emit('message','cool game');//发送给房间game中的所有客户端，包括发送者
//
// io.sockets.socket(socketid).emit('message','for your eyes only');//发送给指定socketId的客户端


//WebSocket连接监听
io.on('connection', function (socket) {
    socket.emit('open');//通知客户端已连接
    console.log('一个客户已连接');
    // 打印握手信息
    socket.on('login', function(msg){
        console.log('接收消息: ' + msg);
    });
    socket.on('sendX', function(msg,fn){
        console.log('接收消息: ' + msg);
        socket.broadcast.emit('message',msg);
    });

    //监听出退事件
    socket.on('disconnect', function () {
        // 广播用户已退出
        socket.broadcast.emit('system');
        console.log('广播用户已退出');
    });

});

/*-------------end---------------*/


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
