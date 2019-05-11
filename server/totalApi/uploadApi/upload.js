var express = require('express');
var router = express.Router();
var returnData = require('../../tool/returnData');
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

// 使用硬盘存储模式设置存放接收到的文件的路径以及文件名
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // 接收到文件后输出的保存路径（若不存在则需要创建）
        cb(null, 'upload/');
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 时间戳 + 文件原始名，比如 151342376785-123.jpg
        var time2 = new Date().Format("yyyy-MM-dd-HH-mm:ss");
        var imgUrl = time2 + "-" + file.originalname;
        var setUrl = "";
        if(imgUrl.indexOf('.') == -1){
          setUrl = imgUrl + ".jpg"
        }else{
          setUrl = imgUrl;
        }
        cb(null, setUrl);
    }
});

// 创建文件夹
var createFolder = function(folder){
    try{
        // 测试 path 指定的文件或目录的用户权限,我们用来检测文件是否存在
        // 如果文件路径不存在将会抛出错误"no such file or directory"
        fs.accessSync(folder);
    }catch(e){
        // 文件夹不存在，以同步的方式创建文件目录。
        fs.mkdirSync(folder);
    }
};

var uploadFolder = '../../upload/';
createFolder(uploadFolder);

// 创建 multer 对象
var upload = multer({ storage: storage });

/* POST upload listing. */
router.post('/upload', upload.single('file'), function(req, res, next) {
    var file = req.file;
    // 接收文件成功后返回数据给前端
    let pathUrl = `/server/${file.destination}/${file.filename}`
    var data = {path: pathUrl};
    var returnD = returnData(200,data,'上传成功',true);
    res.json(returnD);
});

// 导出模块（在 app.js 中引入）
module.exports = router;
