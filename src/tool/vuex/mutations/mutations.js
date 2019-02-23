
const mutations = {
  //添加方法
  addBook(state,book){
    state.bookList.push(book);
    return true
  },
  setUserInfo(state,userInfo){
    state.user_info = userInfo;
    return true
  },
}
export default mutations
