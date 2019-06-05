/**
 * 发送邮件
 *
 * @type {[type]}
 */
var nodemailer = require('nodemailer'); //导入模块
var express = require('express');
var router = express.Router();
var returnData = require('../tool/returnData'); //返回数据封装



/**
 * [description]
 * @param  {[type]} emailId     [接收人邮箱]
 * @param  {[type]} subject     [邮件主题]
 * @param  {[type]} title       [明文]
 * @param  {[type]} contentHtml [内容html]
 * @return {[type]}             [description]
 */
function sendEmailData(emailId = '', subject = '', title = '', contentHtml = '') {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: 'QQ', //
      auth: {
        user: '1570769179@qq.com', //邮箱帐号
        pass: 'nduvulymguecgddj' //这儿是指授权码，在邮箱设置里获取
      }
    });

    var mailOptions = {
      from: '1570769179@qq.com', // 发送者邮箱
      to: emailId, // 接受者邮箱
      subject: subject, // 邮件主题
      text: title, // 明文
      html: contentHtml, // html body
      // attachments: [ //发送附件
      //   {
      //     filename: 'bz001.jpg', //附件名字
      //     path: './img/bz001.jpg' //附件所在的本地路径
      //   }
      // ]
    };
    transporter.sendMail(mailOptions, function(error, info) {
      var rdata = {};
      if (error) {
        rdata = returnData(500, '', error, false);
        reject(rdata)
      } else {
        rdata = returnData(200, '', '发送成功', false);
        resolve(rdata)
      }

    });
  });

};



router.post('/sendEmail', (req, res) => {
  var params = req.body;
  var emailId = params.emailId;
  var subject = "验证码接收通知";
  var title = '验证码';
  var contentHtml = `<div style="color:red;">我的第一封邮件</div>`;
  sendEmailData(emailId, subject, subject, title, contentHtml).then((data) => {
    res.send(data); //返回数据给前台
  });
});

router.post('/getCode', (req, res) => {
  var params = req.body;
  var emailId = params.emailId;
  var subject = "验证码接收通知";
  //获取指定区间范围随机数，包括lowerValue和upperValue
  function randomFrom(lowerValue,upperValue)
  {
   return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
  }
  let code = randomFrom(10000,99999);
  var title = `<div>您的邮箱验证码是　<span style="color:green;">${code}</span>　，请不要告诉他人</div>`;
  req.session.code = code;
  sendEmailData(emailId, subject, subject, title).then((data) => {
    res.send(data); //返回数据给前台
  });
});

module.exports = router;
