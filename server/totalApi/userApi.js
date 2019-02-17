var models = require('../db'); //数据库链接信息
var express = require('express');
var router = express.Router();
var mysql = require('mysql'); //引入数据库驱动
var $sql = require('../sqlfun'); //sql语句
var returnData = require('../tool/returnData');//返回数据封装
// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();

// 登录用户接口
router.post('/login', (req, res) => {
  var sql = $sql.user.UserLogin;
  var params = req.body;
  conn.query(sql, [params.userName], function(err, result) {
    if (err) {
      console.log(err);
      let Edata = returnData(500, '', '服务器错误', true);
      res.send(Edata);
    }
    if (result) {
      var data = {}
      if (result.length == 0) {
        data.isLogin = false;
        data.msg = '用户名不存在';
      }

      for (var i = 0; i < result.length; i++) {
        if (result[i].passWord == params.passWord) {
          data.isLogin = true;
          data.msg = '登陆成功';
          data.data = result;
        } else {
          data.isLogin = false;
          data.msg = '密码错误';
        }
      }
      let rdata = returnData(200,data,'登陆成功',false);
      res.send(rdata); //返回数据给前台
    }
  })
});
// 增加用户接口
router.post('/addUser', (req, res) => {
  var sql = $sql.user.UserAdd;
  var params = req.body;
  conn.query(sql, [params.userName, params.passWord,params.imgurl], function(err, result) {
    if (err) {
      console.log(err);
      let Edata = returnData(500, '', '服务器错误', true);
      res.send(Edata);
    }
    if (result) {
      let data = returnData(200,'','添加成功',true);
      res.send(data);
    }
  })
});
//判断用户名是否以存在
router.post('/judegeUserName',(req,res)=>{
  var name = req.body.userName;
  var sql = `select * from userinfo where userName = '${name}'`
  conn.query(sql,function(err,result){
    if (err) {
      console.log(err);
      let Edata = returnData(500, '', '服务器错误', true);
      res.send(Edata);
    }
    if(result){
      var data = "";
      if(result != ""){
        data = returnData(200,{type:1,msg:'用户名已存在'},'用户名已存在',false);
      }else{
        data = returnData(200,{type:0,msg:'可以使用'},'可以使用',false);
      }

      res.send(data);
    }
  });
});
//查询所有用户数据
router.post('/userQuery', (req, res) => {
  // 查询总条数
  var params = req.body;
  let pageNo = (params.pageNo - 1) * params.pageSize;
  let pageSize = params.pageSize;

  var sqls = 'select count(*) from userinfo;'+`select * from userinfo where id != 7 limit ${pageNo},${pageSize};`

  conn.query(sqls, function(err, result) {
    if (err) {
      console.log(err);
      let Edata = returnData(500, '', '服务器错误', true);
      res.send(Edata);
    }
    if (result) {
      let total = result[0][0]['count(*)'];//得到总条数
      let data = {
        'total':total,
        'pageSize':pageSize,
        'pageNo' : pageNo,
        'data':result[1],
      };

      let rdata = returnData(200,data,'',false);
      res.send(rdata);
    }
  })
});

// 修改用户信息
router.post('/updateUser',(req,res)=>{
  var sql = $sql.user.updateUser;
  var id = req.body.id;
  var userName = req.body.userName;
  var passWord = req.body.passWord;
  var imgurl = req.body.imgurl
  conn.query(sql,[userName,passWord,imgurl,id],function(err,result){
    if(err){
      console.log(err);
      let Edata = returnData(500, '', '服务器错误', true);
      res.send(Edata);
    }
    if(result){
      let rdata = returnData(200,'','',true);
      res.send(rdata);
    }
  })
});
//删除用户
router.post('/delectUser', (req, res) => {
  var sql = $sql.user.delectUser;
  var id = req.body.id;
  var idList = req.body.idList;
  let list = "";
  if (id == "" || id == undefined) {
    list = idList
  } else {
    list = id;
  }
  conn.query(sql, [list], function(err, result) {
    if (err) {
      console.log(err);
      let Edata = returnData(500, '', '服务器错误', true);
      res.send(Edata);
    }
    if (result) {
      let rdata = returnData(200,'','删除成功',true);
      res.send(rdata);
    }
  })
})
//模糊查询
router.post('/searchUser', (req, res) => {
  var sql = $sql.user.searchUser;
  var value = '%' + req.body.userSearch + '%';
  conn.query(sql, [value], function(err, result) {
    if (err) {
      console.log(err);
      let Edata = returnData(500, '', '服务器错误', true);
      res.send(Edata);
    }
    if (result) {
      let rdata = returnData(200,result,'共找到 '+result.length+' 条数据',true);
      res.send(rdata);
    }
  })
});
module.exports = router;
