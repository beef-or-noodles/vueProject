/*
 * 栏目路由表数据配置
 *rootMainName 一级栏目名称
 *rooutMainIcon :一级栏目Icon
 *power ：是否显示权限
 *menuIndex ：一级栏目序号
 *rootMainList：二级栏目类表
 *rootChildName :二级栏目名称
 *rootPower  ：二级栏目权限
 *rootLogin  : 是否需要登陆
 *path: 二级栏目栏目路由地址
 *icon 二级栏目Icon
 *name  :  路由名称
 *rootPath : 路由页面路径，对应文件夹路径
 */
export const routerMenuData = [{
  rootMainName: '文章管理',
  power: true,
  rooutMainIcon:'el-icon-tickets',
  menuIndex:'1',
  rootMainList: [{
    rootChildName:'文章列表',
    rootPower:true,
    rootLogin:true,
    rootPath:'/manage/artice/articeList',
    path:'/home/articeList',
    name:'articeList',
    icon:'',
  },{
    rootChildName:'文章编辑',
    rootPower:true,
    rootLogin:true,
    rootPath:'/manage/artice/articeEdit',
    path:'/home/articeEdit',
    name:'articeEdit',
    icon:'',
  }]
}];


// 单个路由配置
/*
*routerName  :路由名称
*routerPath  :路由页面路径
*path        :路由路径名字
*name        :路由名字
*power       :查看权限
*/
export const routerData = [{
  routerName:'登陆',
  routerPath:'/manage/login/login',
  power:true,
  path:'/login',
  name:'login',
}];
