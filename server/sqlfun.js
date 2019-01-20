// sql语句
var sqlMap = {
  countAll: 'select count(*) from userinfo', // ?表名   计算数据库总条数
  // 用户
  user: {
    UserLogin: 'SELECT * FROM userinfo WHERE userName = ?;', //登陆语句
    UserAdd: 'insert into userinfo(userName, passWord, image) values ( ?, ?,?);', //添加语句
    UserQuery: "select * from userinfo limit ?,?;", //查询所有用户表
    delectUser: 'DELETE FROM userinfo WHERE id in (?);', //删除用户
    searchUser: "select * from userinfo where concat(userName,passWord,id,creatTime) like ?;", //模糊查询用户
    updateUser: "UPDATE userInfo SET userName = ? ,passWord = ? ,image = ? WHERE id = ?", //修改用户名和密码
  },
  //栏目
  column:{
    addColumn:'insert into columnList(columnName, belongId, sort, checkRoot, belongName) values ( ?, ?, ?, ?,?);',//增加栏目
    queryColumn:'select * from columnList;',//查询栏目表
    queryTopColumn:'select * from columnList where belongId = ?;',//查询栏目表
    delectColumn:'delete from columnList where id in (?);',//删除栏目
    searchColumn:'select * from columnList where concat(columnName) like ?;',//根据名字模糊查询
    updateColumn:'update columnList set columnName = ? ,belongId = ? , checkRoot = ? ,belongName = ?, sort = ? where id = ?;',//根据ID修改
  },
  artice:{
    addArtice:'insert into artice(columnId,articeTitle,abstract,content,author,checkRoot,imgurl,columnName) values(?,?,?,?,?,?,?,?);',//添加文章
    queryArtice:'select * from artice where columnId = ? and recycle = 1',//根据栏目id查找文章
    delectArtice:'DELETE FROM artice WHERE id in (?);',//删除文章
  },
}

module.exports = sqlMap;
