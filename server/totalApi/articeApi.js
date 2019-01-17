var models = require('../db');//数据库连接信息
var express = require('express');
var router = express.Router();
var mysql = require('mysql');//引入sql驱动
var $sql = require('../sqlfun');//载入sql语句
var returnData = require('../tool/returnData');//返回封装数据

var conn = mysql.createConnection(models.mysql);//创建连接
conn.connect();//连接数据库





module.exports = router;
