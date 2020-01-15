
const mutations = {
  //添加方法
  addBook(state,book){
    state.bookList.push(book);
    return true
  },
  setUserInfo(state,userInfo={}){
    state.userData.user_info = userInfo;
    return true
  },
  setRootMenu(state,rootMenu=[]){
    state.userData.rootMenu = rootMenu;
    return true
  },
  //设置头部索引
  setNavIndex(state,index=1){
    state.userData.navIndex = index;
  },
  //设置左侧索引
  setLeftNavIndex(state,data={first:0,child:0}){
    state.userData.leftnavActive = data;
  },
  //设置后台导航
  setMangerIndex(state,index="1-1"){
    state.userData.mangerIndex = index;
  },
  //设置toast加载动画
  setToast(state,data){
    let toast = {
      show: false,
      icon: "loading",//success , error  ,warning,loading,
      time: 2000,//关闭时间毫秒
      title: "",//文字描述
      shade:false,//是否有遮罩
      ...data
    }
    state.userData.toast = toast;
  }
}
export default mutations
