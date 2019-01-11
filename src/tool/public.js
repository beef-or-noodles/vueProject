const tool = {
  // 截取连接地址
  getUrlParam: function(name) { // 获取url参数值
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    //构造一个含有目标参数的正则表达式对象
    var index = window.location.href.split("?")
    var str = '';
    if (str.length !== 2) {
      str = index[index.length - 1]
    } else {
      str = index[1]
    }
    if (str) {
      var r = str.substr(0).match(reg);
      //匹配目标参数
      if (r != null)
        return decodeURI(r[2]);
      return '';
    } else {
      return ''
    }
  },

  //将时间戳转换成标准日期格式
  /*
  *timestamp时间戳
  *time 是否显示时间true false
  */
  formatTime:function (timestamp,time) {
      var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + '-';
      var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
      var D = (date.getDate() < 10 ? '0'+(date.getDate()) : date.getDate()) + ' ';
      var h = date.getHours() + ':';
      var m = date.getMinutes() + ':';
      var s = date.getSeconds();
      if(time){
        return Y+M+D+h+m+s;
      }else{
        return Y+M+D;
      }

  },
  //带天数的时间转换
  /*
  *   ''  显示天 1，不显示天 2，不显示天和小时
  */
  countDown: function(times,t='') {
    var day = 0,
      hour = 0,
      minute = 0,
      second = 0; //时间默认值
    if (times > 0) {
      day = Math.floor(times / (60 * 60 * 24));
      hour = Math.floor(times / (60 * 60)) - (day * 24);
      minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
      second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
    }
    if (day <= 9) day = day;
    if (hour <= 9) hour = '0' + hour;
    if (minute <= 9) minute = '0' + minute;
    if (second <= 9) second = '0' + second;
    //显示
    let txt;
    if(t == ''){
      txt = `${day}天${hour}：${minute}：${second}`
    }else if(t == 1){
        txt = `${hour}：${minute}：${second}`
    }else if(t == 2){
      txt = `${minute}：${second}`
    }

    return txt;
  },
  //时间转换
  timeago: function(value) {
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime();
    var diffValue = now - value * 1000;
    if (diffValue < 0) {
      return;
    }
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;
    var result = ""
    if (monthC >= 1) {
      result = "" + parseInt(monthC) + "月前";
    } else if (weekC >= 1) {
      result = "" + parseInt(weekC) + "周前";
    } else if (dayC >= 1) {
      result = "" + parseInt(dayC) + "天前";
    } else if (hourC >= 1) {
      result = "" + parseInt(hourC) + "小时前";
    } else if (minC >= 1) {
      result = "" + parseInt(minC) + "分钟前";
    } else
      result = "刚刚";
    return result;
  },

//或取几天前的时间
  getDateStr:function(AddDayCount) {
     var dd = new Date();
     dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
     var y = dd.getFullYear();
     var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0
     var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0
     return y+"-"+m+"-"+d;
  },
  //得到星期几
  getWeek:function(day){
    var weekDay = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    var myDate = new Date(Date.parse(day));
    let week = weekDay[myDate.getDay()]
    return week;
  },

  //验证
  // 验证手机号
  validatemobile: function(name) {
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
    if (!myreg.test(name)) {
      return false;
    }
    return true;
  },
 // 验证邮箱
  validateemail: function(name) {
    var myreg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    if (!myreg.test(name)) {
      return false;
    }
    return true;
  },
}
export default tool
