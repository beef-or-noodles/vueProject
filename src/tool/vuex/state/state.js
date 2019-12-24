const state = {
   bookList:["西游记","水浒传","红楼梦","三国演义"],
   userData:{
      rootMenu:[],//用户权限表
      navIndex:1,//导航索引
      leftnavActive:{ //左侧导航索引
         first:0,
         child:0,
      },
      mangerIndex:"1-1",//后台导航
      user_info:{},//用户信息
      toast:{//加载动画
         show:false,
         icon:"loading",//success , error  ,warning,loading,
         time:2000,//关闭时间毫秒
         title:"",//文字描述
      },
   },
}
var locaData = localStorage.getItem("userData")
if(!locaData){
   localStorage.setItem("userData",JSON.stringify(state.userData))
}
export default state
