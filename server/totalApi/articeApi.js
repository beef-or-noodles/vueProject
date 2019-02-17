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
  if(params.imgurl == ''){
    params.imgurl = '/server/upload/noImg.png'
  }
  var sql = $sql.artice.addArtice;
  var time = new Date(params.setTime).getTime().toString();
  conn.query(sql, [params.columnId.id,params.articeTitle,params.abstract,params.content,params.author,params.checkRoot,params.imgurl,params.columnId.name,time], function(err, result) {
    if (err) {
      console.log(err);
        let Edata = returnData(500, '', '服务器错误', true);
        res.send(Edata);
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
  var time = new Date(params.setTime).getTime().toString();
  conn.query(sql, [params.columnId.id,params.articeTitle,params.abstract,params.content,params.author,params.checkRoot,params.imgurl,params.columnId.name,time,params.id], function(err, result) {
    if (err) {
      console.log(err);
      let Edata = returnData(500, '', '服务器错误', true);
      res.send(Edata);
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
  let pageNo = (params.pageNo - 1) * params.pageSize;
  let pageSize = params.pageSize;

  var sqls = `select count(*) from artice where recycle=1 and columnId = ${params.columnId} ;select * from artice where recycle=1 and columnId = ${params.columnId} order by setTime DESC limit ${pageNo},${pageSize}`

  conn.query(sqls, [params.columnId], function(err, result) {
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
      let rdata = returnData(200, data, '', false);
      res.send(rdata);
    }
  })
});

//删除文章加入回收站
router.post('/delectArtice', (req, res) => {
  var id = req.body.id;
  var idList = req.body.idList;
  var type = req.body.recycle; //1文章 0回收站
  var params = [];
  if (id == "" || id == undefined) {
    params = idList;
  } else {
    params.push(id);
  }
  var idArr = [];
  var sql = `UPDATE artice SET recycle = CASE id `;
  for(let i in params){
    sql += `WHEN ${params[i]} THEN ${type} `
    idArr.push(params[i]);
  }
  var idTxt = idArr.join(',')//分割字符串
  sql += `END WHERE id IN (${idTxt})`;

  conn.query(sql,function(err, result) {
    if (err) {
      console.log(err);
      let Edata = returnData(500, '', '服务器错误', true);
      res.send(Edata);
    }
    if (result) {
      var rdata='';
      if(type == 0){
         rdata = returnData(200, '', '删除成功可在回收站查看', true);
      }else{
         rdata = returnData(200, '', '文章恢复成功', true);
      }

      res.send(rdata);
    }
  })
})

//模糊查询
router.post('/searchArtice', (req, res) => {
  var sql = $sql.artice.searchArtice;
  var value = '%' + req.body.searchName + '%';
  var type = req.body.recycle;  //type 1 文章  0 回收站
  conn.query(sql, [type,value], function(err, result) {
    if (err) {
      console.log(err);
      let Edata = returnData(500, '', '服务器错误', true);
      res.send(Edata);
    }
    if (result) {
      let rdata = returnData(200, result, '共找到 ' + result.length + ' 条数据', true);
      res.send(rdata);
    }
  })
});

// 查询回收站文章
router.post('/queryRecycle', function(req, res) {
  var params = req.body;
  var sql = $sql.artice.queryArtice;
  let pageNo = (params.pageNo - 1) * params.pageSize;
  let pageSize = params.pageSize;

  var sqls = `select count(*) from artice where recycle = 0 ; select * from artice where recycle=0 order by creatTime DESC limit ${pageNo},${pageSize}`

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
      let rdata = returnData(200, data, '', false);
      res.send(rdata);
    }
  })
});

// 彻底删除文章
router.post('/delectRecycle', (req, res) => {
  var sql = $sql.artice.delectArtice;
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

module.exports = router;
