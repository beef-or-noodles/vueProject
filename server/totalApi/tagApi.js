/**
 * Created by Administrator on 2020/6/26.
 */
var models = require('../db'); //数据库连接信息
var express = require('express');
var router = express.Router();
var mysql = require('mysql'); //引入sql驱动
var $sql = require('../sqlfun'); //载入sql语句
var returnData = require('../tool/returnData'); //返回封装数据

var conn = mysql.createConnection(models.mysql); //创建连接
conn.connect(); //连接数据库

// 查询所有标签
router.post('/queryAllTag',function(req,res){
    let sql = $sql.tag.queryAllTag
    conn.query(sql,function (err,result) {
        if(err){
            let Edata = returnData(500, '', '服务器错误', true);
            res.send(Edata);
        }
        if(result){
            let data = result
            let rdata = returnData(200, data, '', false);
            res.send(rdata);
        }
    })
})

// 删除标签
router.post('/delectTag',function(req,res){
    let sql = $sql.tag.delectTag
    conn.query(sql,[req.body.id],function (err,result) {
        if(err){
            let Edata = returnData(500, '', '服务器错误', true);
            res.send(Edata);
        }
        if(result){
            let rdata = returnData(200, '', '删除标签成功', true);
            res.send(rdata);
        }
    })
})

// 修改标签
router.post('/updateTag',function(req,res){
    let sql = $sql.tag.updateTag
    conn.query(sql,[req.body.tag_name,req.body.id],function (err,result) {
        if(err){
            let Edata = returnData(500, '', '服务器错误', true);
            res.send(Edata);
        }
        if(result){
            let rdata = returnData(200, '', '修改成功', true);
            res.send(rdata);
        }
    })
})

// 添加标签
router.post('/addTag',function(req,res){
    let sql = $sql.tag.addTag
    conn.query(sql,[req.body.tag_name],function (err,result) {
        if(err){
            console.log(err);
            let Edata = returnData(500, '', '服务器错误', true);
            res.send(Edata);
        }
        if(result){
            let rdata = returnData(200, '', '添加成功', true);
            res.send(rdata);
        }
    })
})
module.exports = router