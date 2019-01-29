var models = require('../db'); //数据库连接信息
var express = require('express');
var router = express.Router();
var mysql = require('mysql'); //引入sql驱动
var $sql = require('../sqlfun'); //载入sql语句
var returnData = require('../tool/returnData'); //返回封装数据

var conn = mysql.createConnection(models.mysql); //创建连接
conn.connect(); //连接数据库

//添加文章
router.post('/addArtice', function(req, res) {
  var params = req.body;
  if(params.checkRoot){
    params.checkRoot = 1;
  }else{
    params.checkRoot = 0;
  }
  var sql = $sql.artice.addArtice;
  conn.query(sql, [params.columnId.id,params.articeTitle,params.abstract,params.content,params.author,params.checkRoot,params.imgurl,params.columnId.name], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      let data = returnData(200, '', '添加成功', true);
      res.send(data);
    }
  })
});

//修改文章
router.post('/updateArtice', function(req, res) {
  var params = req.body;
  if(params.checkRoot){
    params.checkRoot = 1;
  }else{
    params.checkRoot = 0;
  }
  var sql = $sql.artice.updateArtice;
  conn.query(sql, [params.columnId.id,params.articeTitle,params.abstract,params.content,params.author,params.checkRoot,params.imgurl,params.columnId.name,params.id], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      let data = returnData(200, '', '修改成功', true);
      res.send(data);
    }
  })
});
/*
*title 排序字段
*type true 升序 fasle 降序
*/
function sortRule(title,type){
  return function(a,b){
    var v1 = a[title];
    var v2 = b[title];
    if(type){
      if(v1<v2){
        return -1
      }else if(v1 == v2){
        return 0
      }else if(v1 > v2){
        return 1
      }
    }else{
      if(v1 > v2){
        return -1
      }else if(v1 == v2){
        return 0
      }else if(v1 < v2){
        return 1
      }
    }

  }
}

// 根据栏目id查找文章
router.post('/queryArtice', function(req, res) {
  var params = req.body;
  var sql = $sql.artice.queryArtice;
  conn.query(sql, [params.columnId], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      let sortData = result.sort(sortRule('id',true));//排序
      let data = returnData(200, result, '', false);
      res.send(data);
    }
  })
});

//删除文章加入回收站
router.post('/delectArtice', (req, res) => {
  var sql = $sql.artice.delectArtice;
  var id = req.body.id;
  var idList = req.body.idList;
  var params = [];
  if (id == "" || id == undefined) {
    params = idList;
  } else {
    params.push(id);
  }
  var idArr = [];
  var sql = `UPDATE artice SET recycle = CASE id `;
  for(let i in params){
    sql += `WHEN ${params[i]} THEN 0 `
    idArr.push(params[i]);
  }
  var idTxt = idArr.join(',')//分割字符串
  sql += `END WHERE id IN (${idTxt})`;

  conn.query(sql,function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      let rdata = returnData(200, '', '删除成功可在回收站查看', true);
      res.send(rdata);
    }
  })
})
module.exports = router;
