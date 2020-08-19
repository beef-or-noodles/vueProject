// sql语句
var sqlMap = {
    countAll: 'select count(*) from userinfo', // ?表名   计算数据库总条数
    // 用户
    user: {
        UserLogin: 'SELECT * FROM userinfo WHERE userName = ? or Email = ?;', //登陆语句
        UserAdd: 'insert into userinfo(userName, passWord, image,Email) values ( ?, ?,?,?);', //添加语句
        UserQuery: "select * from userinfo limit ?,?;", //查询所有用户表
        delectUser: 'DELETE FROM userinfo WHERE id in (?);', //删除用户
        searchUser: "select * from userinfo where concat(userName,passWord,id,creatTime) like ?;", //模糊查询用户
        updateUser: "UPDATE userinfo SET userName = ? ,passWord = ? ,image = ? ,Email=? WHERE id = ?", //修改用户名和密码
        updateUserType: "UPDATE userinfo SET user_type = ?  WHERE id = ?", //修改用户状态
    },
    //栏目
    column: {
        addColumn: 'insert into columnlist(columnName, belongId, sort, checkRoot, belongName,`describe`,imgUrl, userID,isType,checkUrl,href) values ( ?, ?, ?, ?,?,?,?,?,?,?,?);', //增加栏目
        queryColumn: 'select * from columnlist where userID=? AND isType = 0;', //查询栏目表
        queryAllColumn: 'select * from columnlist where isType = 0', //查询栏目表'
        queryTopColumn: 'select * from columnlist where userID=? and belongId = ?;', //查询栏目表
        queryPhoto: 'SELECT * FROM columnlist WHERE userID = ? AND isType = ?; ',
        delectColumn: 'delete from columnlist where id in (?);', //删除栏目
        searchColumn: 'select * from columnlist where userID=? and concat(columnName) like ?;', //根据名字模糊查询
        updateColumn: 'update columnlist set columnName = ? ,belongId = ? , checkRoot = ? ,belongName = ?, sort = ? , `describe` = ? ,imgUrl = ? ,checkUrl = ? ,href = ? where id = ?;', //根据ID修改
        queryPhotoAll: `SELECT * FROM columnlist WHERE isType = ?; `
    },
    artice: {
        addArtice: 'insert into artice(userID,columnId,articeTitle,abstract,content,markdownStr,author,checkRoot,imgurl,columnName,setTime,strTime,articeType,tags) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?);', //添加文章
        //addArticeNoimg: 'insert into artice(userID,columnId,articeTitle,abstract,content,markdownStr,author,checkRoot,columnName,setTime,strTime,articeType) values(?,?,?,?,?,?,?,?,?,?,?,?);', //添加文章
        queryArtice: 'select * from artice where recycle=1 and columnId=?', //根据栏目id查找文章
        delectArtice: 'DELETE FROM artice WHERE id in (?);', //删除文章
        updateArtice: ' UPDATE artice set columnId=?,articeTitle=?,abstract=?,content=?,author=?,checkRoot=?,imgurl=?,columnName=?,setTime=?, markdownStr=?, tags=? where id = ?', //修改文章
        searchArtice: 'select * from artice where userID = ? and recycle=? and concat(articeTitle,author,abstract) like ?;', //根据名字模糊查询
        articeInfo: 'select * from artice where checkRoot=1 and id = ?', //前台查询
        articeClickNumber: 'UPDATE artice SET clickNumber = clickNumber+1 WHERE id=?', //点击率
        articeLikeNumber: 'UPDATE artice SET likeNumber = likeNumber+1 WHERE id=?', //喜欢
        recommendArtice: 'update artice set recommend = ? where id = ?', //设置推荐文章
        queryRecommend: 'select * from artice where recommend = 1 and recycle = 1 and checkRoot = 1 order by setTime DESC limit 0,8', //查询前八条数据
    },
    log: {
        userLog: 'insert into user_log(userId,ip,api,system,params) values(?,?,?,?,?);',
    },
    // 标签
    tag:{
        queryAllTag: 'select * from tag',
        delectTag: 'DELETE FROM tag WHERE id = ?',
        updateTag: 'UPDATE tag set tag_name = ? where id = ?',
        addTag: 'insert into tag(tag_name) values(?)'
    },
    //权限
    root: {
        queryRoot: `SELECT
                \tuserinfo.id,
                \troot_menu.menu_id,
                \troot_menu.menu_name,
                \troot_menu.rootPath,
                \troot_menu.menu_grade,
                \troot_menu.main_id 
                FROM
                \tuserinfo
                \tINNER JOIN root_center ON userinfo.id = root_center.user_id
                \tINNER JOIN root_menu ON root_center.menu_id = root_menu.menu_id WHERE id = ?;`,
        queryRootList: `select * from root_menu;`,
        removeEoot_menu: `DELETE FROM root_center WHERE user_id = ?;`,//删除权限中间表数据
        insertRootMenu: ``,//添加数据
    },
    commentApi: {
        addComment: `insert into comments(messageId,userId,articeId,title,commentUserId,toCommentId) values(?,?,?,?,?,?);`,
        queryComment: `SELECT
                        u.userName,
                        u.image,
                        cm.id,
                        cm.messageId,
                        cm.userId,
                        cm.articeId,
                        cm.creatTime,
                        cm.likes,
                        cm.title,
                        cm.commentUserId,
                        cm.commentTotal 
                    FROM
                        comments cm
                        LEFT JOIN userinfo u ON u.id = cm.userId 
                    WHERE
                        cm.articeId = ? 
                        AND cm.messageId = 0
                    ORDER BY
                        cm.creatTime DESC 
                        LIMIT ?,?`,
        queryCommentChild:`SELECT
                            u.userName,
                            u.image,
                            cm.messageId,
                            cm.userId,
                            cm.articeId,
                            cm.creatTime,
                            cm.commentUserId,
                            cm.likes,
                            cm.title,
                            u2.userName AS commentUserName,
                            cm.id,
                            comments.title AS commentText
                            FROM
                            comments AS cm
                            LEFT JOIN userinfo AS u ON u.id = cm.userId
                            LEFT JOIN userinfo AS u2 ON u2.id = cm.commentUserId
                            LEFT JOIN comments ON cm.toCommentId = comments.id
                            WHERE
                            cm.messageId = ?
                            ORDER BY
                            cm.creatTime DESC
                            LIMIT ?, ?`,//查询回复
        totalPush:`update comments set commentTotal=commentTotal+1 where id = ?`,//总数计算
        clickLikes:`update comments set likes=likes+1 where id = ?`,//留言点赞
        queryAllComment:`SELECT
                            u.userName,
                            u.image,
                            cm.messageId,
                            cm.userId,
                            cm.articeId,
                            cm.creatTime,
                            cm.commentUserId,
                            cm.likes,
                            cm.title,
                            u2.userName AS commentUserName,
                            cm.id,
                            comments.title AS commentText
                            FROM
                            comments AS cm
                            LEFT JOIN userinfo AS u ON u.id = cm.userId
                            LEFT JOIN userinfo AS u2 ON u2.id = cm.commentUserId
                            LEFT JOIN comments ON cm.toCommentId = comments.id
                            ORDER BY
                            cm.creatTime DESC
                            LIMIT ?, ?`,
        delectComment:`DELETE FROM comments WHERE id=?;`,//删除评论
    }
}

module.exports = sqlMap;
