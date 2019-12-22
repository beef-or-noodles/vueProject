const state = {
   bookList:["西游记","水浒传","红楼梦","三国演义"],
   userData:{
      rootMenu:[],//用户权限表
      navIndex:1,//导航索引
      leftnavActive:{ //左侧导航索引
         first:0,
         child:0,
      },
      mangerIndex:"1-1",
      user_info:{},//用户信息
   },
}
var locaData = localStorage.getItem("userData")
if(!locaData){
   localStorage.setItem("userData",JSON.stringify(state.userData))
}
console.log(locaData);
export default state
