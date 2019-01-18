const baseURL = '/api' //设置默认基础地址 location.origin
export default{
  upload:baseURL + '/upload',
  getCode : baseURL + '/getCode',//取得验证码
  login : baseURL + '/login',//登陆
  addUser : baseURL + '/addUser',//添加用户
  userQuery:baseURL + '/userQuery',//查询所有用户
  delectUser:baseURL + '/delectUser',//删除用户
  searchUser:baseURL + '/searchUser',//模糊查询用户
  updateUser:baseURL + '/updateUser',//修改用户信息

  addColumn:baseURL + '/addColumn',//修改用户信息
  selectColumn:baseURL + '/selectColumn',//查询顶级栏目
  queryColumn:baseURL + '/queryColumn',//查询顶级栏目
  searchColumn:baseURL + '/searchColumn',//模糊查询
  delectColumn:baseURL + '/delectColumn',//删除栏目
  updateColumn:baseURL + '/updateColumn',//修改
  batchSort:baseURL + '/batchSort', //保存批量排序
}
