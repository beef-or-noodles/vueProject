/**
 * Created by Administrator on 2019/12/20. 留言
 */
/**
 * Created by Administrator on 2019/12/12.
 */
var models = require('../db'); //数据库连接信息
var express = require('express');
var router = express.Router();
var mysql = require('mysql'); //引入sql驱动
var $sql = require('../sqlfun'); //载入sql语句
var returnData = require('../tool/returnData'); //返回封装数据

var conn = mysql.createConnection(models.mysql); //创建连接
conn.connect(); //连接数据库

// 根据文章id查询主评论
router.post('/queryComment', function(req, res) {
    var params = req.body;
    var pageNo = (params.pageNo - 1) * params.pageSize;
    var pageSize = params.pageSize;
    let queryList = $sql.commentApi.queryComment
    var sqls = `select count(*) from comments where articeId=${params.articeId} and messageId=0;${queryList}`
    conn.query(sqls,[params.articeId,pageNo,pageSize], function(err, result) {
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

// 根据子评论
router.post('/queryCommentChild', function(req, res) {
    var params = req.body;
    var pageNo = (params.pageNo - 1) * params.pageSize;
    var pageSize = params.pageSize;
    let queryList = $sql.commentApi.queryCommentChild
    var sqls = `select count(*) from comments where messageId=${params.messageId} and messageId=0;${queryList}`
    conn.query(sqls,[params.messageId,pageNo,pageSize], function(err, result) {
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


// 后台查询所有评论
router.post('/queryAllComment', function(req, res) {
    var params = req.body;
    var pageNo = (params.pageNo - 1) * params.pageSize;
    var pageSize = params.pageSize;
    let queryList = $sql.commentApi.queryAllComment
    var sqls = `select count(*) from comments ;${queryList}`
    conn.query(sqls,[pageNo,pageSize], function(err, result) {
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
/*删除平评论*/
router.post('/delectComment', function(req, res) {
    var params = req.body;
    var sql = $sql.commentApi.delectComment

    conn.query(sql, [params.id], function(err, result) {
        if (err) {
            console.log(err);
            let Edata = returnData(500, '', '服务器错误', true);
            res.send(Edata);
        }
        if (result) {
            let data = returnData(200, '', '删除成功', true);
            res.send(data);
        }
    })
});


/*点赞*/
router.post('/clickLikes', function(req, res) {
    var params = req.body;
    var totalPush = $sql.commentApi.clickLikes

    conn.query(totalPush, [params.id], function(err, result) {
        if (err) {
            console.log(err);
            let Edata = returnData(500, '', '服务器错误', true);
            res.send(Edata);
        }
        if (result) {
            let data = returnData(200, '', '添加成功', false);
            res.send(data);
        }
    })
});

/*添加评论*/
router.post('/addComment', function(req, res) {
    var params = req.body;
    var arr =[params.messageId,params.userId,params.articeId,params.title,params.commentUserId,params.toCommentId];
    var sql = $sql.commentApi.addComment
    var totalPush = $sql.commentApi.totalPush
    if(params.messageId != 0){
        conn.query(totalPush, [params.messageId], function(err, result) {
            if (err) {
                console.log(err);
                let Edata = returnData(500, '', '添加总条数错误', true);
                res.send(Edata);
            }
            if (result) {

            }
        })
    }

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


module.exports = router;
