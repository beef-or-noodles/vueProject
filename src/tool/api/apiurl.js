const baseURL = ''+'/api' //设置默认基础地址  /api  location.origin http://119.23.22.57:8889
export default {
  upload: baseURL + '/upload',
  getCode: baseURL + '/getCode', //取得验证码
  sendEmail: baseURL + '/sendEmail' //发送验证码

  login: baseURL + '/login', //登陆
  addUser: baseURL + '/addUser', //添加用户
  userQuery: baseURL + '/userQuery', //查询所有用户
  delectUser: baseURL + '/delectUser', //删除用户
  searchUser: baseURL + '/searchUser', //模糊查询用户
  updateUser: baseURL + '/updateUser', //修改用户信息
  judegeUserName: baseURL + '/judegeUserName', //用户名是否存在

  addColumn: baseURL + '/addColumn', //修改用户信息
  selectColumn: baseURL + '/selectColumn', //查询顶级栏目
  queryColumn: baseURL + '/queryColumn', //查询顶级栏目
  searchColumn: baseURL + '/searchColumn', //模糊查询
  delectColumn: baseURL + '/delectColumn', //删除栏目
  updateColumn: baseURL + '/updateColumn', //修改
  batchSort: baseURL + '/batchSort', //保存批量排序
  queryPhoto:baseURL + '/queryPhoto',//查询相册

  addArtice: baseURL + '/addArtice', //保存批量排序
  queryArtice: baseURL + '/queryArtice', //根据栏目id查询文章
  delectArtice: baseURL + '/delectArtice', //删除文章
  updateArtice: baseURL + '/updateArtice', //修改文章
  searchArtice: baseURL + '/searchArtice', //模糊查询

  queryRecycle: baseURL + '/queryRecycle', //查询回收站文章
  delectRecycle: baseURL + '/delectRecycle', //彻底删除文章

  articeInfo: baseURL + '/articeInfo', //根据id查询文章详情
  articeClickNumber: baseURL + '/articeClickNumber', //文章点击率
  recommend: baseURL + "/recommend",//设置推荐文章
  queryRecommend: baseURL + "/queryRecommend",//查询推荐文章


}
