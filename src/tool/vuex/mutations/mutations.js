
const mutations = {
  //添加方法
  addBook(state,book){
    state.bookList.push(book);
    return true
  }
}
export default mutations
