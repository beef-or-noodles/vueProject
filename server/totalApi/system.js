/**
 * Created by Administrator on 2019/12/12.
 */
var models = require('../db'); //数据库连接信息
var express = require('express');
var router = express.Router();
var mysql = require('mysql'); //引入sql驱动
var $sql = require('../sqlfun'); //载入sql语句
var returnData = require('../tool/returnData'); //返回封装数据
var files = require("../tool/file");

var conn = mysql.createConnection(models.mysql); //创建连接
conn.connect(); //连接数据库


// 查询日志
router.post('/queryLog', function(req, res) {
    var params = req.body;
    let pageNo = (params.pageNo - 1) * params.pageSize;
    let pageSize = params.pageSize;
    var sqls = `select count(*) from user_log; select * from user_log order by creatTime DESC limit ${pageNo},${pageSize}`

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
/*添加日志*/
function connLog(data){
    var sql = $sql.log.userLog;
    conn.query(sql, [data.userId,data.ip,data.api,data.versions,data.params], function(err, result) {
        if (err) {console.log(err);}
        if (result) {}
    })
}
/*查询统计数据*/
// 查询日志
router.post('/queryChart', function(req, res) {
    var sqls = `select count(*) from user_log where system = 'Windows';
                select count(*) from user_log where system = 'iPhone' or system='Android';
                select count(*) from user_log where system != 'Windows' and  system != 'iPhone' and system!='Android';
                select count(*) from artice where articeType = 0;
                select count(*) from artice where articeType = 1;
                select count(*) from artice where articeType = 2;
                select count(*) from userinfo;
                select count(*) from columnlist;
                select count(*) from comments;
                `
    conn.query(sqls, function(err, result) {
        if (err) {
            console.log(err);
            let Edata = returnData(500, '', '服务器错误', true);
            res.send(Edata);
        }
        if (result) {
            var systemMun = {
                pc:result[0][0]["count(*)"],
                mobile:result[1][0]["count(*)"],
                other:result[2][0]["count(*)"],
            }
            var contentNum = {
                artice:result[3][0]["count(*)"],
                photo:result[4][0]["count(*)"],
                music:result[5][0]["count(*)"],
                user:result[6][0]["count(*)"],
                column:result[7][0]["count(*)"],
                comments:result[8][0]["count(*)"],
            }
            let data = {
                systemMun,
                contentNum,
            };
            let rdata = returnData(200, data, '', false);
            res.send(rdata);
        }
    })
});

//查询时间段内的数据
router.post('/queryTimeLog', function(req, res) {
    let params = req.body
    let sqls = `SELECT
                \tDATE_FORMAT( creatTime, '%Y-%m-%d' ) DAY,
                \tCOUNT( id ) count 
                FROM
                \t\`user_log\` 
                WHERE
                \tcreatTime BETWEEN '${params.beginTime}' 
                \tAND '${params.endTime}' 
                GROUP BY
                \tDAY 
                ORDER BY
                \tcreatTime;`
    conn.query(sqls, function(err, result) {
        if (err) {
            console.log(err);
            let Edata = returnData(500, '', '服务器错误', true);
            res.send(Edata);
        }
        if (result) {
            let data = result
            let rdata = returnData(200, data, '', false);
            res.send(rdata);
        }
    })
})


/*得到文件列表*/
router.post("/queryFileList",function(req,res){
    var path = req.body.path
    var fileList = files.getReaddir(path);
    let rdata = returnData(200, fileList, '', false);
    res.send(rdata);
});
//创建文件夹
router.post("/creatDir",function(req,res){
    var path = req.body.path
    var bol = files.creatDir(path);
    var rdata = {}
    if(bol.hasOwnProperty('code')){
         rdata = returnData(500, bol, `创建失败${bol.code}`, true);
    }else{
         rdata = returnData(200, bol, '新建成功', true);
    }
    res.send(rdata);
});
//删除文件
router.post("/delectFile",function(req,res){
    var path = req.body.path
    var bol = files.delectFile(path);
    var rdata = {}
    if(bol.hasOwnProperty('code')){
        rdata = returnData(500, bol, `删除失败${bol.code}`, true);
    }else{
        rdata = returnData(200, bol, '删除成功', true);
    }
    res.send(rdata);
});

module.exports = {router,connLog};
