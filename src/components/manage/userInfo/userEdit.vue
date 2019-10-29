<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="4">
                <div class="search">
                    <el-input placeholder="搜索用户" @keyup.enter.native="searchUser" size="small" v-model="userSearch">
                        <i slot="prefix" class="el-input__icon el-icon-search"></i>
                    </el-input>
                </div>
            </el-col>
            <el-col :span="20">
                <el-button type="primary" size="small" @click="searchUser" icon="el-icon-search">搜索</el-button>
                <el-button type="primary" size="small" @click="addUserBtn(1)" icon="el-icon-plus">添加用户</el-button>
                <el-button type="danger" size="small" @click="delect" icon="el-icon-delete">批量删除</el-button>
            </el-col>
        </el-row>
        <div class="content">
            <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
                      @selection-change="handleSelectionChange">
                <el-table-column type="selection">
                </el-table-column>
                <el-table-column label="用户ID" prop="id" width="80px" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="userName" width="70px" label="头像">
                    <template slot-scope="scope">
                        <div class="headIcon">
                            <img :src="scope.row.image"/>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="userName" label="用户名" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="passWord" label="密码" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="Email" label="邮箱" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="creatTime" width="140px" label="注册时间" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span>{{setTime(scope.row.creatTime)}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="Email" label="状态" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <span v-if="scope.row.user_type == 0" style="color: red;"> 禁用</span>
                        <span v-else style="color: green;">启用</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" fixed="right" width="250">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="update(scope.row,2)">修改</el-button>
                        <el-button type="primary" size="mini" @click="updateRoot(scope.row.id)">修改权限</el-button>
                        <el-button v-if="scope.row.user_type == 0" type="primary" @click='stopUser(scope.row.id,1)'
                                   size="mini">启用
                        </el-button>
                        <el-button v-else type="danger" @click='stopUser(scope.row.id,0)' size="mini">禁用</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagesize">
                <wPage @pageSize="pageSize" @pageNo="pageNo" :total="paging.total"></wPage>
            </div>
        </div>
        <!-- 增加弹窗 -->
        <el-dialog title="增加用户" :visible.sync="editDialog" width="450px" :close-on-click-modal="false">
            <div class="box">
                <el-form v-model="fromData" label-width="80px">
                    <el-form-item label="用户名:" prop="username" :error="userNameMessage">
                        <el-input v-model="fromData.username" @blur="judgeName"></el-input>
                    </el-form-item>
                    <el-form-item label="密码:" prop="password">
                        <el-input type="password" v-model="fromData.password"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码:" prop="relPassword">
                        <el-input type="password" v-model="fromData.relPassword"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱:" prop="relPassword">
                        <el-input type="email" v-model="fromData.Email"></el-input>
                    </el-form-item>
                    <el-form-item label="上传头像:" prop="imgurl">
                        <fileupload @change="fileChange" :img="fromData.imgurl" :autoUp="false" :copper="true"></fileupload>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
      <el-button @click="editDialog = false" size="small">取 消</el-button>
      <el-button type="primary" @click="addUser(submitType)" size="small">确 定</el-button>
    </span>
        </el-dialog>


        <!-- 增加弹窗 -->
        <el-dialog title="修改权限" :visible.sync="rootDialog" :close-on-click-modal="false">
            <div class="box">
                <div v-for="item in rootMenuList" :key="item.menu_id" class="rootBox">
                    <div class="rootTitle">
                        <el-checkbox v-model="item.oneRoot">{{item.menu_name}}</el-checkbox>
                    </div>
                    <div class="rootcont">
                        <el-checkbox-group v-model="item.twoRoot">
                            <el-checkbox v-for="elem in item.twoData" :key="elem.menu_id" :label="elem.menu_id">
                                {{elem.menu_name}}
                            </el-checkbox>
                        </el-checkbox-group>
                    </div>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="rootDialog = false" size="small">取 消</el-button>
              <el-button type="primary" @click="saveRoot" size="small">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>
<script>
    import fileupload from "../components/uploade";
    export default {
        components:{
            fileupload
        },
        data() {
            return {
                rootDialog: false,
                editDialog: false,
                submitType: 1, //1：增加  2：修改
                isCompress: true, //是否压缩
                imgFormData: '', //图片file对象
                imgurl: '',
                updateID: '',
                userSearch: '',
                fromData: {
                    username: '',
                    password: '',
                    relPassword: '',
                    imgurl: '',
                    Email: '',
                },
                tableData: [],
                idList: [],
                userNameMessage: '',
                paging: {
                    pageNo: 1,
                    pageSize: 10,
                    total: 1,
                },
                rootMenuList: [],
            }
        },
        created() {

        },
        watch: {
            editDialog(val) {
                if (val == false) {
                    this.fromData = {
                        username: '',
                        password: '',
                        relPassword: '',
                        imgurl: '',
                        Email: '',
                    };
                }
                ;
            },
        },
        mounted() {
            //do something after mounting vue instance
            this.getUserList();
        },
        methods: {
            setTime: function (val) {
                let date = new Date(val);
                let time = date.getTime();
                let settime = this.$tool.formatTime(time / 1000, true);
                return settime
            },
            pageSize(val){
                this.paging.pageSize = val;
                this.getUserList();
            },
            pageNo(val){
                this.paging.pageNo = val;
                this.getUserList();
            },
            // 多选
            handleSelectionChange(val) {
                let arr = []
                for (let i in val) {
                    arr.push(val[i].id)
                }
                this.idList = arr;
            },

            //上传图片
            fileChange(val){
                this.fromData.imgurl = val;
            },
            //增加
            addUserBtn(type) {
                this.editDialog = true;
                this.submitType = type;
            },
            // 修改
            update(val, type) {
                this.editDialog = true;
                this.submitType = type;
                this.updateID = val.id;
                this.fromData = {
                    username: val.userName,
                    password: val.passWord,
                    relPassword: val.passWord,
                    imgurl: val.image,
                    Email: val.Email,
                };
                this.imgurl = val.image;
            },
            //判断用户名是否存在
            judgeName() {
                this.$post(this.$api.judegeUserName, {
                    userName: this.fromData.username
                }).then((data) => {
                    if (data.type == 1) {
                        this.userNameMessage = data.msg;
                    } else {
                        this.userNameMessage = "";
                    }
                });
            },
            // 添加用户
            addUser(type) {
                if (this.fromData.username == "" || this.fromData.password == '' || this.fromData.password == '') {
                    this.$message({
                        message: '请输入信息',
                        type: 'info'
                    });
                } else if (this.fromData.password !== this.fromData.relPassword) {
                    this.$message({
                        message: '与输入密码不符',
                        type: 'info'
                    });
                } else if (this.userNameMessage != "") {
                    this.$message({
                        message: '用户名已存在',
                        type: 'info'
                    });
                } else {
                    let params = {
                        userName: this.fromData.username,
                        passWord: this.fromData.password,
                        imgurl: this.fromData.imgurl,
                        Email: this.fromData.Email,
                    }
                    if (type === 1) {
                        this.$post(this.$api.addUser, params).then((data) => {
                            this.editDialog = false;
                            this.getUserList();
                        });
                    } else if (type === 2) { //修改接口
                        params.id = this.updateID;
                        this.$post(this.$api.updateUser, params).then((data) => {
                            this.editDialog = false;
                            this.getUserList();
                        });
                    }

                }

            },
            //批量删除
            delect(){
              let idList = {idList:this.idList};
              if(idList.length == 0){
                  this.$message({type:'error',message:"请选择需要删除的用户"})
                  return false;
              }
              this.$post(this.$api.delectUser,idList).then(data=>{
                    this.getUserList();
              });
            },
            //得到用户列表
            getUserList() {
                this.$post(this.$api.userQuery, this.paging).then((data) => {
                    this.tableData = data.data;
                    this.paging.total = data.total;
                });
            },
            //查找用户
            searchUser() {
                let params = {
                    userSearch: this.userSearch,
                }
                if (this.userSearch == '') {
                    this.getUserList();
                } else {
                    this.$post(this.$api.searchUser, params).then((data) => {
                        this.tableData = data;
                    });
                }
            },
            //禁用启用用户
            stopUser(id = "", type) {
                let params = {}
                params.userId = id;
                params.userType = type;
                this.$post(this.$api.stopUser, params).then((data) => {
                    this.getUserList();
                });
            },
            /**
             * 保存权限
             */
            saveRoot() {
                //(id,value),
                let id = this.updateID
                let data = this.rootMenuList;
                let arr = "";
                data.forEach(item => {
                    if (item.oneRoot) {
                        arr += `(${id},${item.menu_id}),`
                        item.twoRoot.forEach(lis => {
                            arr += `(${id},${lis}),`
                        })
                    }
                });
                let params = {
                    userID: id,
                    values: arr.substr(0, arr.length - 1),
                }
                this.$post(this.$api.saveRoot, params).then((data) => {
                    this.rootDialog = false;
                })
            },
            //修改用户权限
            updateRoot(id) {
                let params = {
                    userId: id,
                }
                this.updateID = id;
                this.$post(this.$api.queryRootList, {}).then((data) => {
                    data.forEach(item => {
                        item['oneRoot'] = false;
                        item['twoRoot'] = [];
                    })
                    this.$post(this.$api.queryRoot, params).then((data1) => {
                        this.rootDialog = true;
                        if (data1.length > 0) {
                            data1.forEach(item => {
                                data.forEach(lis => {
                                    if (item.menu_id == lis.menu_id) {
                                        lis['oneRoot'] = true;
                                        let arr = [];
                                        item.twoData.forEach(elem => {
                                            arr.push(elem.menu_id);
                                        })
                                        lis['twoRoot'] = arr;
                                    }
                                });
                            });
                        }
                        this.rootMenuList = data;
                    });
                });

            }
        }
    }
</script>
<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }

    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
</style>
<style scoped>
    .search {
        overflow: hidden;
    }

    .rootBox {
        margin-top: 10px;
        box-shadow: 0px 0px 5px #c0ccda;
    }

    .rootTitle {
        background: #fafafa;
        padding: 10px;
        border-top: 8px solid #3a8ee6;
    }

    .rootcont {
        padding: 15px;
    }

    .content {
        margin: 20px 0;
    }

    .block {
        text-align: right;
    }

    .headIcon {
        width: 40px;
        height: 40px;
        border-radius: 5px;
        overflow: hidden;
    }

    .headIcon img {
        width: 100%;
    }
</style>
