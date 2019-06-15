
const getters = {
  getBookList(state){
    return state.bookList;
  },
  /**
   * 获取用户权限信息
   */
  getRootMenu(state){
    return state.userData.rootMenu;
  },
  /**
   * 获取用户登录信息
   */
  getUserInfo(state){
    return state.userData.user_info;
  }
}
export default getters
