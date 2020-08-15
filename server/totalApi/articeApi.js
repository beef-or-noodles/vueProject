var models = require('../db'); //数据库连接信息
var express = require('express');
var router = express.Router();
var mysql = require('mysql'); //引入sql驱动
var $sql = require('../sqlfun'); //载入sql语句
var returnData = require('../tool/returnData'); //返回封装数据

var schedule = require("node-schedule"); //定时任务

var conn = mysql.createConnection(models.mysql); //创建连接
conn.connect(); //连接数据库


var setTimeOut = {};
//添加文章
router.post('/addArtice', function(req, res) {
  var params = req.body;
  if (params.checkRoot) {
    params.checkRoot = 1;
  } else {
    params.checkRoot = 0;
  }
  var userID = req.headers.token;
  var time = new Date(params.setTime).getTime().toString();
  var strTime = new Date(params.setTime).Format("yyyy-MM-dd HH:mm").toString();
  var sql = $sql.artice.addArtice;
  var arr = [userID,params.columnId.id, params.articeTitle, params.abstract, params.content,params.markdownStr, params.author, params.checkRoot, params.imgurl, params.columnId.name, time,strTime, params.articeType,params.tags]
  // if (params.imgurl == '') {
  //   sql =  $sql.artice.addArticeNoimg
  //   arr = [userID,params.columnId.id, params.articeTitle, params.abstract, params.content,params.markdownStr, params.author, params.checkRoot, params.columnId.name, time,strTime,params.articeType]
  // }
  conn.query(sql, arr, function(err, result) {
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
  if (params.checkRoot) {
    params.checkRoot = 1;
  } else {
    params.checkRoot = 0;
  }
  var setTime = params.setTime;
  // var setTime = new Date().getTime() + 10000;
  var sql = $sql.artice.updateArtice;
  var upSql = "update artice set setTime = ? where id = ?" //取消置顶
  var time = new Date(params.setTime).getTime().toString();

  //判断是否执行置顶任务 然后置顶自动失效
  var timeName = `T${params.id}`; //组成key值
  if (params.setTime > new Date().getTime()) {
    if (setTimeOut.hasOwnProperty(timeName)) { //判断是否存在这个定时器
      setTimeOut[timeName].cancel(); //取消定时
      console.log(typeof setTimeOut[timeName]);
      var date = new Date(setTime);
      setTimeOut[timeName] = schedule.scheduleJob(date, function() {
        let id = params.id;
        let creatTime = new Date(params.creatTime).getTime();
        conn.query(upSql, [creatTime, id], function(err, result) {
          if (err) {
            console.log(err);
          }
          if (result) {
            console.log('取消置顶成功');
          }
        });
      });
      setTimeOut.timeName; //调用
    } else {
      var date = new Date(setTime);
      setTimeOut[timeName] = schedule.scheduleJob(date, function() {
        let id = params.id;
        let creatTime = new Date(params.creatTime).getTime();
        conn.query(upSql, [creatTime, id], function(err, result) {
          if (err) {
            console.log(err);
          }
          if (result) {
            console.log('取消置顶成功');
          }
        });
      });
      setTimeOut.timeName; //调用
    }
  }

  conn.query(sql, [params.columnId.id, params.articeTitle, params.abstract, params.content, params.author, params.checkRoot, params.imgurl, params.columnId.name, time,params.markdownStr, params.tags, params.id], function(err, result) {
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
function sortRule(title, type) {
  return function(a, b) {
    var v1 = a[title];
    var v2 = b[title];
    if (type) {
      if (v1 < v2) {
        return -1
      } else if (v1 == v2) {
        return 0
      } else if (v1 > v2) {
        return 1
      }
    } else {
      if (v1 > v2) {
        return -1
      } else if (v1 == v2) {
        return 0
      } else if (v1 < v2) {
        return 1
      }
    }

  }
}

// 根据栏目id查找文章
/*
 *type:0 后台查询所有文章  1 前台查询已审核文章
 */
router.post('/queryArtice', function(req, res) {
  var params = req.body;
  var sql = $sql.artice.queryArtice;
  let pageNo = (params.pageNo - 1) * params.pageSize;
  let pageSize = params.pageSize;
  var sqls = "";
  var arr = []
  if(params.columnId == "" || typeof params.columnId==="undefined"){
    sqls = `select count(*) from artice where recycle=1 and checkRoot=1 and articeType = 0;select *,id as artice_id,(select count(*) as commentNum from comments where articeId = artice_id) as commentNum from artice where recycle=1 and checkRoot = 1 and articeType = 0 order by setTime DESC limit ${pageNo},${pageSize}`
  }else{
    arr = [params.columnId]
    if (params.type == 0) {//查询所有
      sqls = `select count(*) from artice where recycle=1 and columnId = ${params.columnId} ;select *,id as artice_id,(select count(*) as commentNum from comments where articeId = artice_id) as commentNum from artice where recycle=1 and columnId = ${params.columnId} order by setTime DESC limit ${pageNo},${pageSize}`
    } else if (params.type == 1) {//查询可看文章
      sqls = `select count(*) from artice where recycle=1 and checkRoot=1 and columnId = ${params.columnId} ;select *,id as artice_id,(select count(*) as commentNum from comments where articeId = artice_id) as commentNum from artice where recycle=1 and checkRoot = 1 and columnId = ${params.columnId} order by setTime DESC limit ${pageNo},${pageSize}`
    }
  }
  // 查询 所有标签
  const tagSql = $sql.tag.queryAllTag
  conn.query(tagSql,arr,function(err,result){
    if (err) {
      console.log(err);
      let Edata = returnData(500, '', '标签查询失败', true);
      res.send(Edata);
    }
    if(result){
      let tagList = result
      conn.query(sqls, arr,function(err, result) {
        if (err) {
          console.log(err);
          let Edata = returnData(500, '', '服务器错误', true);
          res.send(Edata);
        }
        if (result) {
          let articleList = result[1]
          if(articleList){
            articleList.forEach(item=>{
              let tag = item.tags
              let newArr = []
              if(tag){
                let arr = tag.split(',')
                 newArr = tagList.filter((item)=>{return arr.some((ls=>{return item.id == ls}))})
              }
              item['tags'] = newArr
            })
          }
          let total = result[0][0]['count(*)']; //得到总条数
          let data = {
            'total': total,
            'pageSize': pageSize,
            'pageNo': pageNo,
            'data': articleList,
          };
          let rdata = returnData(200, data, '', false);
          res.send(rdata);
        }
      })
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
  for (let i in params) {
    sql += `WHEN ${params[i]} THEN ${type} `
    idArr.push(params[i]);
  }
  var idTxt = idArr.join(',') //分割字符串
  sql += `END WHERE id IN (${idTxt})`;

  conn.query(sql, function(err, result) {
    if (err) {
      console.log(err);
      let Edata = returnData(500, '', '服务器错误', true);
      res.send(Edata);
    }
    if (result) {
      var rdata = '';
      if (type == 0) {
        rdata = returnData(200, '', '删除成功可在回收站查看', true);
      } else {
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
  var type = req.body.recycle; //type 1 文章  0 回收站
  var userID = req.headers.token
  var arr = []
  // 查询 所有标签
  const tagSql = $sql.tag.queryAllTag
  conn.query(tagSql,arr,function(err,result) {
    if (err) {
      console.log(err);
      let Edata = returnData(500, '', '标签查询失败', true);
      res.send(Edata);
    }
    if (result) {
      let tagList = result
      conn.query(sql, [userID,type, value ], function(err, result) {
        if (err) {
          console.log(err);
          let Edata = returnData(500, '', '服务器错误', true);
          res.send(Edata);
        }
        if (result) {
          let articleList = result
          if(articleList){
            articleList.forEach(item=>{
              let tag = item.tags
              let newArr = []
              if(tag){
                let arr = tag.split(',')
                newArr = tagList.filter((item)=>{return arr.some((ls=>{return item.id == ls}))})
              }
              item['tags'] = newArr
            })
          }
          let rdata = returnData(200, articleList, '共找到 ' + result.length + ' 条数据', true);
          res.send(rdata);
        }
      })
    }
  })

});

// 查询回收站文章
router.post('/queryRecycle', function(req, res) {
  var params = req.body;
  var sql = $sql.artice.queryArtice;
  let pageNo = (params.pageNo - 1) * params.pageSize;
  let pageSize = params.pageSize;
  var userID = req.headers.token
  var sqls = `select count(*) from artice where userID = ${userID} and recycle = 0 ; select * from artice where recycle=0 order by creatTime DESC limit ${pageNo},${pageSize}`

  conn.query(sqls, function(err, result) {
    if (err) {
      console.log(err);
      let Edata = returnData(500, '', '服务器错误', true);
      res.send(Edata);
    }
    if (result) {
      let total = result[0][0]['count(*)']; //得到总条数
      let data = {
        'total': total,
        'pageSize': pageSize,
        'pageNo': pageNo,
        'data': result[1],
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
      let rdata = returnData(200, '', '删除成功', true);
      res.send(rdata);
    }
  })
})



//推荐文章接口 recommendArtice
router.post('/recommend', (req, res) => {
  var sql = $sql.artice.recommendArtice;
  var type = req.body.type;
  var id = req.body.id;
  conn.query(sql, [type, id], function(err, result) {
    if (err) {
      console.log(err);
      let Edata = returnData(500, '', '服务器错误', true);
      res.send(Edata);
    }
    if (result) {
      let rdata = returnData(200, '', '设置成功', true);
      res.send(rdata);
    }
  });
});

// 根据ID查询文章详情
router.post('/articeInfo', (req, res) => {
  var sql = $sql.artice.articeInfo;
  var id = req.body.id;
  conn.query(sql, [id], function(err, result) {
    if (err) {
      console.log(err);
      let Edata = returnData(500, '', '服务器错误', true);
      res.send(Edata);
    }
    if (result) {
      var data = result[0];
      let rdata = returnData(200, data, '成功', false);
      res.send(rdata);
    }
  })
})

//查询推荐文章
router.post('/queryRecommend', (req, res) => {
  var sql = $sql.artice.queryRecommend;
  conn.query(sql, function(err, result) {
    if (err) {
      console.log(err);
      let Edata = returnData(500, '', '服务器错误', true);
      res.send(Edata);
    }
    if (result) {
      let rdata = returnData(200, result, '成功', false);
      res.send(rdata);
    }
  })
});

// 文章点击率
// 根据ID查询文章详情
router.post('/articeClickNumber', (req, res) => {
  var sql = $sql.artice.articeClickNumber;
  var id = req.body.id;
  conn.query(sql, [id], function(err, result) {
    if (err) {
      console.log(err);
      let Edata = returnData(500, '', '服务器错误', true);
      res.send(Edata);
    }
    if (result) {
      let rdata = returnData(200, '', '成功', false);
      res.send(rdata);
    }
  })
})

module.exports = router
