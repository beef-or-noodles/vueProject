/**
 * Created by Administrator on 2019/12/12.
 */
var models = require('../db'); //数据库连接信息
var express = require('express');
var router = express.Router();
var mysql = require('mysql'); //引入sql驱动
var $sql = require('../sqlfun'); //载入sql语句
var returnData = require('../tool/returnData'); //返回封装数据
var file = require("../tool/file");

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

/*得到文件列表*/
router("/queryFileList",function(req,res){
    var fileList = file.getReaddir("");
});
/*删除文件*/
router("/deleteFileList",function(req,res){

});

module.exports = {router,connLog};
