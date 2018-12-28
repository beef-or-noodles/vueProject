const baseURL = '/api' //设置默认基础地址 location.origin
export default{
  getCode : baseURL + '/getCode',//取得验证码
  login : baseURL + '/login',//登陆
  addUser : baseURL + '/addUser'//添加用户
}
