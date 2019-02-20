/*
 *网络爬虫 天气
 */
var http = require('http');

(function() {
  var time = new Date().getTime();
  var data = {

  }; //请求数据

  var opt = {
    host: 'www.baidu.com', //要访问的域名
    path: "/home/other/data/weatherInfo?city=%E9%87%8D%E5%BA%86&indextype=manht&_req_seqid=0x8678e1bc000a8407&asyn=1&t="+time+"&sid=1459_21090_18560_19897_26350_28413", //接口和参数
    method: 'get',
  };
  var sendmsg = "";
  var req = http.request(opt, function(req) {
    req.on('data', function(chunk) {
      sendmsg += chunk;
    });
    req.on('end', function(d) {
      var list = JSON.parse(sendmsg);
      console.log(list);
    });
  });
  req.write(data + "\n"); //发送请求
  req.end(); //请求发送完毕
})();

// module.exports = reptile;
