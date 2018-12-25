// sql语句
var sqlMap = {
    // 用户
    user: {
        login: 'SELECT userpsw FROM admin WHERE username = ?;',
        add: 'insert into admin(username, userpsw) values ( ?, ?);'
    }
}

module.exports = sqlMap;
