const baseURL = ''+'/api' //设置默认基础地址  /api  location.origin http://119.23.22.57:8889
export default {
  upload: baseURL + '/upload',
  getCode: baseURL + '/getCode', //取得验证码
  sendEmail: baseURL + '/sendEmail', //发送验证码

  login: baseURL + '/login', //登陆
  addUser: baseURL + '/addUser', //添加用户
  userQuery: baseURL + '/userQuery', //查询所有用户
  userQueryId:baseURL + '/userQueryId', //根据id查询用户信息
  delectUser: baseURL + '/delectUser', //删除用户
  searchUser: baseURL + '/searchUser', //模糊查询用户
  updateUser: baseURL + '/updateUser', //修改用户信息
  judegeUserName: baseURL + '/judegeUserName', //用户名是否存在
  addNewUser:baseURL + '/addNewUser',
  stopUser:baseURL + '/stopUser', //禁用启用
  queryRoot:baseURL + '/queryRoot', //查询用户权限
  queryRootList:baseURL + '/queryRootList', //查询所有权限
  saveRoot:baseURL + '/saveRoot', //保存权限修改

  addColumn: baseURL + '/addColumn', //修改用户信息
  selectColumn: baseURL + '/selectColumn', //查询顶级栏目
  queryColumn: baseURL + '/queryColumn', //查询顶级栏目
  searchColumn: baseURL + '/searchColumn', //模糊查询
  delectColumn: baseURL + '/delectColumn', //删除栏目
  updateColumn: baseURL + '/updateColumn', //修改
  batchSort: baseURL + '/batchSort', //保存批量排序
  queryPhoto:baseURL + '/queryPhotoAll',//查询相册

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

  queryLog:baseURL + "/queryLog", //查询日志
  queryChart:baseURL + "/queryChart", //查询图标数据
  queryTimeLog:baseURL + "/queryTimeLog", //查询时间段图标数据

  addComment:baseURL+"/addComment",//添加评论
  queryComment:baseURL+"/queryComment",//查询评论
  queryCommentChild:baseURL+"/queryCommentChild",//查询子评论
  clickLikes:baseURL+"/clickLikes",//点赞
  queryAllComment:baseURL+"/queryAllComment",//查询所有评论
  delectComment:baseURL+"/delectComment",//删除评论

  queryFileList:baseURL+"/queryFileList",//查询文件
  creatDir:baseURL+"/creatDir",//创建文件夹
  delectFile:baseURL+"/delectFile",//删除文件

  queryAllTag: baseURL+"/queryAllTag",
  delectTag: baseURL+"/delectTag",
  updateTag: baseURL+"/updateTag",
  addTag: baseURL+'/addTag'
}
