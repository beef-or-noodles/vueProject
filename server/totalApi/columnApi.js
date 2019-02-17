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
      let Edata = returnData(500, '', '服务器错误', true);
      res.send(Edata);
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
      let Edata = returnData(500, '', '服务器错误', true);
      res.send(Edata);
    };
    if (result) {
      let data = result;
      var rdata = returnData(200, data, '', false);
      res.send(rdata);
    }
  });
});
// 查找所有栏目
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
/*
 *type 0 查看所有   1.按照树型格式输出 2 按照树型格式输出只有可看的
 */
router.post('/queryColumn', (req, res) => {
  var sql = $sql.column.queryColumn;
  var type = req.body.type;
  conn.query(sql, function(err, result) {
    if (err) {
      console.log(err);
      let Edata = returnData(500, '', '服务器错误', true);
      res.send(Edata);
    };
    if (result) {
      var data = result;
      var rdata = '';
      if (type == 0) {
        rdata = returnData(200, data, '', false);
      } else if (type == 1) {
        /*
         *------返回树型结构显示全部------------------------------
         */
        var rootMenu = []; //父栏目
        var chird = []; //子栏目
        var setData = [];
        // 拆分父子栏目
        for (let i in data) {
          if (data[i].belongId == 0) {
            rootMenu.push(data[i])
          } else {
            chird.push(data[i])
          }
        }
         rootMenu.sort(sortRule('sort',true));//排序

        // 拼合树型数据
        for (let f in rootMenu) {
              var id = rootMenu[f].id; //取得父ID
              var name = rootMenu[f].columnName; //取得父名字
              var children = []; //子栏目
              for (let q in chird) {
                  var cId = chird[q].belongId;
                  if (id == cId) {
                    let item = chird[q];
                    item.label = chird[q].columnName
                    children.push(item);
                  }
              }
              children.sort(sortRule('sort',true));//排序
              let arr = rootMenu[f];
              arr.label = name;
              arr.children = children;
              setData.push(arr);

          }
        rdata = returnData(200, setData, '', false);
      }else if (type == 2) {
        /*
         *------返回树型结构显示过滤------------------------------
         */
        var rootMenu = []; //父栏目
        var chird = []; //子栏目
        var setData = [];
        // 拆分父子栏目
        for (let i in data) {
          if (data[i].belongId == 0) {
            rootMenu.push(data[i])
          } else {
            chird.push(data[i])
          }
        }
        // 拼合树型数据
        for (let f in rootMenu) {
            if (rootMenu[f].checkRoot == 1) {
              var id = rootMenu[f].id; //取得父ID
              var name = rootMenu[f].columnName; //取得父名字
              var children = []; //子栏目
              for (let q in chird) {
                if (rootMenu[f].checkRoot == 1) {
                  var cId = chird[q].belongId;
                  if (id == cId) {
                    children.push({
                      'id': chird[q].id,
                      'label': chird[q].columnName,
                    })
                  }
                }
              }
              let arr = {
                'id': id,
                'label': name,
                'children': children,
              }
              setData.push(arr);
            }
          }
        rdata = returnData(200, setData, '', false);
      }
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
      let Edata = returnData(500, '', '服务器错误', true);
      res.send(Edata);
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

        var articeSql = `select * from artice where columnId = ${list}`
        conn.query(articeSql,function(Aerr,Aresult){//查询是否存在文章
          if(Aerr){
            let Edata = returnData(500, '', '服务器错误', true);
            res.send(Edata);
          }
          if(Aresult){
            if(Aresult.length == 0 || Aresult == ''){
              conn.query(sql, [list], function(err, result) {//执行删除
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
            }else{//有文章给出提示
              let rdata = returnData(500, '', '请删除所属文章,在进行删除操作', true);
              res.send(rdata);
            }
          }
        });

      } else { //存在
        let rdata = returnData(500, '', '此栏目是顶级栏目，请确保没有子栏目再删除', true);
        res.send(rdata);
      }

    }
  })

})

// 修改
router.post('/updateColumn', (req, res) => {
  var sql = $sql.column.updateColumn;
  var id = req.body.id;
  var columnName = req.body.columnName;
  var belongId = req.body.belongId.id;
  var checkRoot = req.body.checkRoot;
  var belongName = req.body.belongId.name;
  var sort = req.body.sort;
  conn.query(sql, [columnName, belongId, checkRoot, belongName, sort, id], function(err, result) {
    if (err) {
      console.log(err);
      let Edata = returnData(500, '', '服务器错误', true);
      res.send(Edata);
    }
    if (result) {
      let rdata = returnData(200, '', '', true);
      res.send(rdata);
    }
  })
});

// 批量排序
router.post('/batchSort',(req,res)=>{
  var params = req.body;
  var idArr = [];
  var sql = `UPDATE columnList SET sort = CASE id `;
  for(let i in params){
    sql += `WHEN ${params[i].id} THEN ${params[i].sort} `
    idArr.push(params[i].id);
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
      let rdata = returnData(200, '', '报存成功', true);
      res.send(rdata);
    }
  })
});

module.exports = router;
