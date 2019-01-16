var models = require('../db'); //数据库链接信息
var express = require('express');
var router = express.Router();
var mysql = require('mysql'); //引入数据库驱动
var $sql = require('../sqlfun'); //sql语句
var returnData = require('../tool/returnData'); //返回数据封装
// 连接数据库
var conn = mysql.createConnection(models.mysql);

conn.connect();
// 添加数据库
router.post('/addColumn', (req, res) => {
  var sql = $sql.column.addColumn;
  var params = req.body;
  if (params.checkRoot) {
    params.checkRoot = 1;
  } else {
    params.checkRoot = 0;
  }
  conn.query(sql, [params.columnName, params.belongId.id, params.sort, params.checkRoot, params.belongId.name], function(err, result) {
    if (err) {
      console.log(err);
    };
    if (result) {
      var rdata = returnData(200, '', '添加成功', true);
      res.send(rdata);
    }
  });
});
//查找顶级栏目
router.post('/selectColumn', (req, res) => {
  var sql = $sql.column.queryTopColumn;
  conn.query(sql, [0], function(err, result) {
    if (err) {
      console.log(err);
    };
    if (result) {
      let data = result;
      var rdata = returnData(200, data, '', false);
      res.send(rdata);
    }
  });
});
// 查找所有栏目
//查找顶级栏目
router.post('/queryColumn', (req, res) => {
  var sql = $sql.column.queryColumn;
  conn.query(sql, function(err, result) {
    if (err) {
      console.log(err);
    };
    if (result) {
      let data = result;
      var rdata = returnData(200, data, '', false);
      res.send(rdata);
    }
  });
});
//模糊查询
router.post('/searchColumn', (req, res) => {
  var sql = $sql.column.searchColumn;
  var value = '%' + req.body.userSearch + '%';
  conn.query(sql, [value], function(err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      let rdata = returnData(200, result, '共找到 ' + result.length + ' 条数据', true);
      res.send(rdata);
    }
  })
});

//删除栏目
router.post('/delectColumn', (req, res) => {
  var sql = $sql.column.delectColumn;
  var id = req.body.id;
  var idList = req.body.idList;
  var list = "";
  if (id == "" || id == undefined) {
    list = idList
  } else {
    list = id;
  }
  let sqls = `select * from columnList where belongId = ${list}`
  conn.query(sqls, function(errs, results) {
    if (errs) {
      console.log(errs);
    }
    if (results) {
      if (results.length == 0 || results == '') { //判断是否纯在子栏目   不存在
        conn.query(sql, [list], function(err, result) {
          if (err) {
            console.log(err);
          }
          if (result) {
            let rdata = returnData(200, '', '删除成功', true);
            res.send(rdata);
          }
        })
      }else{ //存在
        let rdata = returnData(500, '', '此栏目是顶级栏目，请确保没有子栏目再删除', true);
        res.send(rdata);
      }

    }
  })

})

// 修改
router.post('/updateColumn',(req,res)=>{
  var sql = $sql.column.updateColumn;
  var id = req.body.id;
  var columnName = req.body.columnName;
  var belongId = req.body.belongId.id;
  var checkRoot = req.body.checkRoot;
  var belongName = req.body.belongId.name;
  var sort = req.body.sort;
  conn.query(sql,[columnName,belongId,checkRoot,belongName,sort,id],function(err,result){
    if(err){
      console.log(err);
    }
    if(result){
      let rdata = returnData(200,'','',true);
      res.send(rdata);
    }
  })
});

module.exports = router;
