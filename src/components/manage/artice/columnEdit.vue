<template>
<div>
  <el-row :gutter="20">
    <el-col :span="4">
      <div class="search">
        <el-input placeholder="搜索栏目" @keyup.enter.native="searchUser" size="small" v-model="userSearch">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
    </el-col>
    <el-col :span="20">
      <el-button type="primary" size="small" @click="searchUser" icon="el-icon-search">搜索</el-button>
      <el-button type="primary" size="small" @click="addUserBtn(1)" icon="el-icon-plus">添加栏目</el-button>
      <el-button type="danger" size="small" @click="delect('',false)" icon="el-icon-delete">批量删除栏目</el-button>
    </el-col>
  </el-row>
  <div class="content">
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" height="590" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection">
      </el-table-column>
      <el-table-column label="栏目ID" prop="id" width="80px" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="userName" label="父栏目名" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="passWord" label="栏目名" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="是否显示">
        <template slot-scope="scope">
          <el-switch v-model="ifShow" active-color="#13ce66" inactive-color="#ff4949" active-text="是" inactive-text="否">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="排序" width="150">
        <template slot-scope="scope">
          <el-input-number v-model="number1" size="small" @change="numberChange" :min="1" label="排序"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="update(scope.row,2)">修改</el-button>
          <el-button type="danger" @click='delect(scope.row.id,true)' size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">

      <el-pagination @size-change="changePagesize" @current-change="currentChange" @prev-click="prevClick" @next-click='nextClick' :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="sizes, prev, pager, next" :total="paging.total">
      </el-pagination>
    </div>
  </div>
  <!-- 增加弹窗 -->
  <el-dialog title="栏目编辑" :visible.sync="editDialog" width="450px" :close-on-click-modal="false">
    <div class="box">
      <el-form v-model="fromData" label-width="80px">
        <el-form-item label="栏目名称:" prop="username">
          <el-input v-model="fromData.username"></el-input>
        </el-form-item>
        <el-form-item label="所属栏目:" prop="password">
          <el-select v-model="value8" style="width:100%;" filterable placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-col :span="12">
          <el-form-item label="是否显示:" prop="relPassword">
            <el-switch v-model="ifShow"  active-color="#13ce66" inactive-color="#ff4949" active-text="是" inactive-text="否"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="栏目排序:" prop="relPassword">
            <el-input-number v-model="number1" size="small" @change="numberChange" :min="1" label="排序"></el-input-number>
          </el-form-item>
        </el-col>
      </el-form>

    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="editDialog = false" size="small">取 消</el-button>
      <el-button type="primary" @click="addUser(submitType)" size="small">确 定</el-button>
    </span>
  </el-dialog>
</div>
</template>
<script>
export default {
  data() {
    return {
      ifShow: true, //是否显示
      number1: 6, //排序
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value8: '',




      editDialog: false,
      submitType: 1, //1：增加  2：修改
      updateID: '',
      userSearch: '',
      fromData: {
        username: '',
        password: '',
        relPassword: '',
      },
      tableData: [],
      idList: [],
      paging: {
        pageNo: 1,
        pageSize: 10,
        total: 1,
      },
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
        };
      };
    },
  },
  mounted() {
    //do something after mounting vue instance
    this.getUserList();
  },
  methods: {
    //排序改变
    numberChange(val) {
      console.log(val);
    },
    // 转换时间格式
    setTime: function(val) {
      let date = new Date(val);
      let time = date.getTime();
      let settime = this.$tool.formatTime(time / 1000, true);
      return settime
    },
    // 改变每页条数
    changePagesize(value) {
      this.paging.pageSize = value;
      this.getUserList();
    },
    // 当前页改变
    currentChange(val) {
      this.paging.pageNo = val;
      this.getUserList();
    },
    // 上一页
    prevClick(val) {
      this.paging.pageNo = val;
      this.getUserList();
    },
    // 下一页
    nextClick(val) {
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
      };
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
      } else {
        let params = {
          userName: this.fromData.username,
          passWord: this.fromData.password,
          imgurl: this.fromData.imgurl,
        }
        if (type === 1) {
          this.$post(this.$api.addUser, params).then((data) => {
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            this.editDialog = false;
            this.getUserList();
          });
        } else if (type === 2) { //修改接口
          params.id = this.updateID;
          this.$post(this.$api.updateUser, params).then((data) => {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.editDialog = false;
            this.getUserList();
          });
        }

      }

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
    //删除用户
    delect(id = "", type) {
      let params = {}
      if (type) {
        params.id = id;
      } else {
        if (this.idList == "" || this.idList.length == 0) {
          this.$message({
            message: '请选择记录',
            type: 'info',
            duration: 1500,
          });
          return;
        } else {
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

.content {
  margin: 20px 0;
}

.block {
  background-color: white;
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
