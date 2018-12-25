// sql语句
var sqlMap = {
    // 用户
    user: {
        login: 'SELECT passWord FROM userinfo WHERE userName = ?;',//登陆语句
        add: 'insert into userinfo(userName, passWord) values ( ?, ?);'//添加语句
    }
}

module.exports = sqlMap;
