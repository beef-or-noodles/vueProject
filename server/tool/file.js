/**
 * Created by dev2 on 2019/9/20. node操作文件
 */
var fs = require("fs");

/*读取文件内容*/
export function readFile(path){
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
/*
* 创建文件夹
* path：路径加名字
* */
export function creatDir(path){
    var params = false;
    try{
        fs.mkdirSync(path);
        params = true;
    }catch (e) {
        console.error(e);
    }
    return params
}
/*
*文件读取
* @params path 基础路径
* */
export function getReaddir(path){
    let obj=[]
    function readdir(url){
      let files = fs.readdirSync(url);
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
export function delectFile(path){
    var params = false;

    var stat = fs.statSync(path);
    if(stat.isFile()){
        try{
            fs.unlinkSync(path);
            params = true;
        }catch (e) {
            console.log(e);
        }
    }else if(stat.isDirectory()){
        try{
            fs.rmdirSync(path);
            params = true;
        }catch (e) {
            console.log(e);
        }
    }
    return params
}

/*修改文件内容*/
export function editFile(path,data){
    var params = false;
    try {
        fs.writeFileSync(path,data);
        params = true;
    }catch (e) {
        console.log(e);
    }
    return params
}