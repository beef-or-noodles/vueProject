var express = require('express');
var router = express.Router();
var returnData = require('../../tool/returnData');
const config = require("../../tool/config")
/*
 1. fs.stat  检测是文件还是目录(目录 文件是否存在)
 2. fs.mkdir  创建目录 （创建之前先判断是否存在）
 3. fs.writeFile  写入文件(文件不存在就创建,但不能创建目录)
 4. fs.appendFile 写入追加文件
 5.fs.readFile 读取文件
 6.fs.readdir 读取目录
 7.fs.rename 重命名
 8. fs.rmdir  删除目录
 9. fs.unlink 删除文件
*/
var fs = require('fs');//node文件模块
var multer = require('multer');
var path = require("path");
// 使用硬盘存储模式设置存放接收到的文件的路径以及文件名
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var arr = []
        if(req.headers.hasOwnProperty("dirname")){
            arr = req.headers.dirname.split("_")
        }else{
            arr = file.originalname.split("_")
        }
        // 接收到文件后输出的保存路径（若不存在则需要创建）
        arr.splice(arr.length-1,1)
        var str = arr.join("/")
        var uploadFolder = './upload/'+str+'/';
        createFolder(uploadFolder);
        cb(null, 'upload/'+str+"/");
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 时间戳 + 文件原始名，比如 151342376785-123.jpg
        var time2 = new Date().getTime();
        var fileName = file.originalname.split(".")[1]
        if(!fileName){
            fileName = "png";
        }
        var setUrl = time2 + "." + fileName;
        cb(null, setUrl);
    }
});

// 创建文件夹
var createFolder = function(folder){
    mkdirsSync(folder)
};

// 递归创建目录 同步方法
function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}

// 创建 multer 对象
var upload = multer({ storage: storage });

/* POST upload listing. */
router.post('/upload', upload.single('file'), function(req, res, next) {
    var file = req.file;
    // 接收文件成功后返回数据给前端
    let pathUrl = ""
    //正式
    if(config.EVN === "production"){
        var desc = file.destination.substr(7,file.destination.length)
        pathUrl = `http://39.99.193.63:8889/${desc}/${file.filename}`
    }else{
        //本地开发
        pathUrl = `/server/${file.destination}/${file.filename}`
    }


    var data = {path: pathUrl};
    var returnD = returnData(200,data,'上传成功',true);
    res.json(returnD);
});

// 导出模块（在 app.js 中引入）
module.exports = router;
