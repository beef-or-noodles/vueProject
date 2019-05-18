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
var sendEmailData = function(emailId,subject,title,contentHtml) {
  var rdata = {};
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
    if (error) {
      rdata = returnData(500, '', '邮件发送失败', true);
    } else {
      rdata = returnData(200, '', '发送成功请注意查收', true);
    }
  });
  return rdata;
};




router.post('/sendEmail', (req, res) => {
  var params = req.body;
  var emailId = params.emailId;
  var datas = sendEmailData(emailId,'验证码接收通知','验证码','<div style="color:red;">我的第一封邮件</div>');
  res.send(datas); //返回数据给前台
});


module.exports = router;
