/*
 * 定义路由表数据
 *rootMainName 一级栏目名称
 *power ：是否显示权限
 *rootMainList：二级栏目类表
 *rootChildName :二级栏目名称
 *rootPower  ：二级栏目权限
 *path: 二级栏目栏目路由路径，对应文件夹路径
 */
export default routerData = [{
  rootMainName: '文章管理',
  power: true,
  rootMainList: [{
    rootChildName:'文章列表',
    rootPower:true,
    path:'/'
  }]
}]
