/**
 * Created by dev2 on 2019/9/20. node操作文件
 */
var fs = require("fs");

/*
* 创建文件夹
* path：路径加名字
* */
function creatDir(path){
    var params = {};
    try{
        fs.mkdirSync(path);
    }catch (e) {
        console.error(e);
        params = e
    }
    return params
}
/*
*文件读取
* @params path 基础路径
* */
function getReaddir(path){
    let obj=[]
    function readdir(url){
      let files = fs.readdirSync(url);
      console.log(files.length);
        files.forEach(function(item , index){
            let params = {
                path:"",
                isDirectory:false,
            }
            var stat = fs.statSync(url+"/"+item);
            if(stat.isFile()){
                params.path = path+"/"+item
            }else if(stat.isDirectory()){
                params.path = path+"/"+item
                params.isDirectory = true
            }
            obj.push(params)
        });
    }
    readdir(path);
    return obj
}

/*删除文件*/
function delectFile(path){
    var params = {};
    var stat = fs.statSync(path);
    if(stat.isFile()){
        try{
            fs.unlinkSync(path);
        }catch (e) {
            params=e
        }
    }else if(stat.isDirectory()){
        try{
            fs.rmdirSync(path);
        }catch (e) {
            params=e
        }
    }
    return params
}

/*修改文件内容*/
function editFile(path,data){
    var params = false;
    try {
        fs.writeFileSync(path,data);
        params = true;
    }catch (e) {
        console.log(e);
    }
    return params
}

/*读取文件内容*/
function readFile(path){
    var params = {
        data:"",
    }
    try{
        var data = fs.readFileSync(path,'utf8');
        params = {
            data:data.toString(),
        }
    }catch(err) {
        if (err) throw err
    }
    return params
}

module.exports={
    getReaddir,delectFile,creatDir
}
