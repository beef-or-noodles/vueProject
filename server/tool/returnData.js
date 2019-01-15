/*
 *返回数据
 *code状态码  200/成功  500/服务器错误
 *diaShow:前端是否显示接口提示信息
 *
 *
 */

function returnData(code = 500, data = null,msgs=null,diaShow = true) {
  var msg = msgs;
  var data = {
    'code': code,
    'data': data,
    'msg': msg,
    'diaShow':diaShow,
  };
  if(msg == ''){
    switch (code) {
      case 500:
        data.msg = '服务器错误'
        break;
      case 200:
        data.msg = "操作成功"
        break;
      default:
        data.msg = "状态码错误"
    }
  }

  return data;
};

module.exports = returnData;
