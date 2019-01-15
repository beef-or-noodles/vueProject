var models = require('../db'); //数据库链接信息
var express = require('express');
var router = express.Router();
var mysql = require('mysql'); //引入数据库驱动
var $sql = require('../sqlfun'); //sql语句
var returnData = require('../tool/returnData');//返回数据封装
// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();

router.post('/addColumn',(req,res)=>{
  var sql = $sql.column.addColumn;
  var params = req.body;
  if(params.show){
    params.show = 1;
  }else{
    params.show = 0;
  }
  console.log(params);
  conn.query(sql,[params.columnName,params.belongId,params.sort,params.show],function(err,result){
    if(err){
      console.log(err);
    };
    if(result){
      var rdata = returnData(200,'','添加成功',true);
      res.send(rdata);
    }
  });
});


module.exports = router;
