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
      <el-button type="primary" size="small" @click="editDialog = true" icon="el-icon-plus">添加用户</el-button>
      <el-button type="danger" size="small" @click="delect('',false)" icon="el-icon-delete">批量删除</el-button>
    </el-col>
  </el-row>
  <div class="content">
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark"  height="590" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection">
      </el-table-column>
      <el-table-column label="用户ID" prop="id" width="80px" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="userName" label="用户名" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="userName" label="账号" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="passWord" label="密码" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="creatTime" label="注册时间" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="220">
        <template slot-scope="scope">
          <el-button type="primary" size="mini">修改</el-button>
          <el-button type="warning" size="mini">权限</el-button>
          <el-button type="danger" @click='delect(scope.row.id,true)' size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination

        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="sizes, prev, pager, next"
        :total="100">
      </el-pagination>
    </div>
  </div>
  <!-- 增加弹窗 -->
  <el-dialog title="增加用户" :visible.sync="editDialog" width="450px" :close-on-click-modal="false">
    <div class="box">
      <el-form v-model="fromData" label-width="80px">
        <el-form-item label="用户名:" prop="username">
          <el-input v-model="fromData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input type="password" v-model="fromData.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码:" prop="relPassword">
          <el-input type="password" v-model="fromData.relPassword"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="editDialog = false" size="small">取 消</el-button>
      <el-button type="primary" @click="addUser()" size="small">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>
<script>
export default {
  data() {
    return {
      editDialog: false,
      userSearch: '',
      fromData: {
        username: '',
        password: '',
        relPassword: '',
      },
      tableData: [],
      idList: []
    }
  },
  created() {

  },
  mounted() {
    //do something after mounting vue instance
    this.getUserList();
  },
  methods: {
    handleSelectionChange(val) {
      let arr = []
      for (let i in val) {
        arr.push(val[i].id)
      }
      this.idList = arr;
    },
    // 添加用户
    addUser() {
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
      } else {
        let params = {
          userName: this.fromData.username,
          passWord: this.fromData.password,
        }
        this.$post(this.$api.addUser, params).then((data) => {
          this.$message({
            message: '添加成功',
            type: 'success'
          });
          this.editDialog = false;
          this.getUserList();
        });
      }

    },
    //得到用户列表
    getUserList() {
      let params = {
        pageNo: 1,
        pageSize: 20,
      }
      this.$post(this.$api.userQuery, params).then((data) => {
        this.tableData = data;
      });
    },
    //查找用户
    searchUser(){
      let params = {
        userSearch:this.userSearch,
      }
      if(this.userSearch == ''){
        this.getUserList();
      }else{
        this.$post(this.$api.searchUser, params).then((data) => {
          console.log(data);
          this.tableData = data;
        });
      }
    },
    //删除用户
    delect(id = "", type) {
      let params = {}
      if (type) {
        params.id = id;
      } else {
        if(this.idList == "" || this.idList.length == 0) {
          this.$message({
            message: '请选择记录',
            type: 'info',
            duration:1500,
          });
          return;
        }else{
          params.idList = this.idList;
        }

      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          this.$post(this.$api.delectUser, params).then((data) => {
            this.$message({
              message: '删除成功',
              type: 'success'
            });
            this.getUserList();
          });
      }).catch(() => {});

    }
  }
}
</script>
<style scoped>
.search {
  overflow: hidden;
}

.content {
  margin: 20px 0;
}
.block{
  background-color: white;
  text-align: right;
}
</style>
