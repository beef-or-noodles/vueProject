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
  rootMainName: '系统',
  power: true,
  rooutMainIcon: 'el-icon-setting',
  menuIndex: '1',
  rootPath: '/manage/system',
  rootMainList: [{
    rootChildName: '系统日志',
    rootPower: true,
    rootLogin: true,
    rootPath: '/manage/system/logList',
    path: '/home/logList',
    name: 'logList',
    icon: 'el-icon-message',
  }]
},{
  rootMainName: '文章管理',
  power: true,
  rooutMainIcon: 'el-icon-tickets',
  menuIndex: '1',
  rootPath: '/manage/artice',
  rootMainList: [{
    rootChildName: '栏目编辑',
    rootPower: true,
    rootLogin: true,
    rootPath: '/manage/artice/columnEdit',
    path: '/home/columnEdit',
    name: 'columnEdit',
    icon: '',
  },{
    rootChildName: '相册管理',
    rootPower: true,
    rootLogin: true,
    rootPath: '/manage/artice/photoManger',
    path: '/home/photoManger',
    name: 'photoManger',
    icon: '',
  },{
    rootChildName: '音乐列表',
    rootPower: true,
    rootLogin: true,
    rootPath: '/manage/artice/musicList',
    path: '/home/musicList',
    name: 'musicList',
    icon: '',
  },{
    rootChildName: '文章列表',
    rootPower: true,
    rootLogin: true,
    rootPath: '/manage/artice/articeList',
    path: '/home/articeList',
    name: 'articeList',
    icon: '',
  }, {
    rootChildName: '回收站',
    rootPower: true,
    rootLogin: true,
    rootPath: '/manage/artice/recycle',
    path: '/home/recycle',
    name: 'recycle',
    icon: '',
  }]
}, {
  rootMainName: '账号管理',
  power: true,
  rooutMainIcon: 'el-icon-news',
  menuIndex: '1',
    rootPath: '/manage/userInfo',
  rootMainList: [{
    rootChildName: '账号管理',
    rootPower: true,
    rootLogin: true,
    rootPath: '/manage/userInfo/userEdit',
    path: '/home/userEdit',
    name: 'userEdit',
    icon: '',
  }]
}, {
  rootMainName: '工具箱',
  power: true,
  rooutMainIcon: 'el-icon-s-cooperation',
  menuIndex: '1',
  rootPath: '/manage/tool',
  rootMainList: [{
    rootChildName: '邮件',
    rootPower: true,
    rootLogin: true,
    rootPath: '/manage/tool/email',
    path: '/home/email',
    name: 'email',
    icon: 'el-icon-message',
  },{
    rootChildName: 'scoket',
    rootPower: true,
    rootLogin: true,
    rootPath: '/manage/tool/scoket',
    path: '/home/scoket',
    name: 'scoket',
    icon: 'el-icon-message',
  }]
}];
