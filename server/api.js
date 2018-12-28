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
  var sql = $sql.user.login;
  var params = req.body;
  console.log("sql", sql);
  console.log("params", params);
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
  var sql = $sql.user.add;
  var params = req.body;
  console.log("sql", sql);
  console.log("params", params);
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
//验证码接口
router.get('/getCold',(req,res)=>{
  res.send('11');
  res.end('is over');
});
module.exports = router;
