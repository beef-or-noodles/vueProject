
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
}
export default mutations
