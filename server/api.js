var models = require('./db'); //数据库链接信息
var express = require('express');
var router = express.Router();
var mysql = require('mysql'); //引入数据库驱动
var $sql = require('./sqlfun'); //sql语句

// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();
var jsonWrite = function(res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: '1',
      msg: '操作失败'
    });
  } else {
    res.json(ret);
  }
};

// 登录用户接口
router.post('/login', (req, res) => {
  var sql = $sql.user.UserLogin;
  var params = req.body;
  conn.query(sql, [params.userName], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      var data = {}
      //  jsonWrite(res, result);
      if(result.length == 0){
        data.isLogin = false;
        data.msg = '用户名不存在';
      }

      for (var i = 0; i < result.length; i++) {
        if (result[i].passWord == params.passWord) {
          data.isLogin = true;
          data.msg = '登陆成功';
        }else{
          data.isLogin = false;
          data.msg = '密码错误';
        }
      }
      res.send(data);//返回数据给前台
      res.end('is over');
    }
  })
});
// 增加用户接口
router.post('/addUser', (req, res) => {
  var sql = $sql.user.UserAdd;
  var params = req.body;
  conn.query(sql, [params.userName, params.passWord], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      res.send("返回回来了！");
      res.end('is over');
    }
  })
});
//查询所有用户数据
router.post('/userQuery',(req,res)=>{
  var sql = $sql.user.UserQuery;
  var params = req.body;
  let pageNo = (params.pageNo - 1) * params.pageSize;
  let pageSize = params.pageSize;
  conn.query(sql,[pageNo,pageSize],function(err,result){
    if(err){
      console.log(err);
    }
    if(result){
      res.send(result);
    }
  })
});
//删除用户
router.post('/delectUser',(req,res)=>{
  var sql = $sql.user.delectUser;
  var id = req.body.id;
  var idList = req.body.idList;
  let list = "";
  if(id == "" || id == undefined){
    list = idList
  }else{
    list = id;
  }
  conn.query(sql,[list],function(err,result){
    if(err){
      console.log(err);
    }
    if(result){
      res.send("成功");
    }
  })
})
//模糊查询
router.post('/searchUser',(req,res)=>{

  var sql = $sql.user.searchUser;
  var value = '%'+req.body.userSearch+'%';
  conn.query(sql,[value],function(err,result){
    if(err){
      console.log(err);
    }
    if(result){
      res.send(result);
    }
  })
})
module.exports = router;
