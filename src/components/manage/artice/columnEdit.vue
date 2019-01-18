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
        <el-button type="warning" size="small" @click="keepSort" icon="el-icon-plus">保存排序</el-button>
    </el-col>
  </el-row>
  <div class="content">
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" height="590" style="width: 100%">
      <el-table-column label="栏目ID" prop="id" width="80px" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="父栏目名" show-overflow-tooltip>
        <template slot-scope='scope'>
          <span v-if="scope.row.belongId == 0"><i style="color:red;" class="el-icon-caret-right"></i>{{scope.row.belongName}}</span>
          <span v-else>　{{scope.row.belongName}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="columnName" label="栏目名" show-overflow-tooltip>
      </el-table-column>
      <el-table-column label="是否显示">
        <template slot-scope="scope">
          <span v-if="scope.row.checkRoot == 1" style="color:#00b504;">是</span>
          <span v-else style="color:red;">否</span>
        </template>
      </el-table-column>
      <el-table-column label="排序" width="150">
        <template slot-scope="scope">
          <el-input-number v-model="scope.row.sort" size="small" @change="numberBlur(scope.row)" :min="0" label="排序"></el-input-number>
        </template>
      </el-table-column>
      <el-table-column label="操作" fixed="right" width="150">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="update(scope.row,2)">修改</el-button>
          <el-button type="danger" @click='delect(scope.row.id,true)' size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <!-- 增加弹窗 -->
  <el-dialog title="栏目编辑" :visible.sync="editDialog" width="450px" :close-on-click-modal="false">
    <div class="box">
      <el-form v-model="fromData" label-width="80px">
        <el-form-item label="栏目名称:">
          <el-input v-model="fromData.columnName"></el-input>
        </el-form-item>
        <el-form-item label="所属栏目:">
          <el-select v-model="fromData.belongId" style="width:100%;" filterable value-key="id" placeholder="请选择">
            <el-option :key="0" label="顶级栏目" :value="{id:'0',name:'顶级栏目'}">
            </el-option>
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-col :span="12">
          <el-form-item label="是否显示:">
            <el-switch v-model="fromData.checkRoot" active-color="#13ce66" inactive-color="#ff4949" active-text="是" inactive-text="否"></el-switch>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="栏目排序:" prop="relPassword">
            <el-input-number v-model="fromData.sort" size="small" :min="0" label="排序"></el-input-number>
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
      options: [],
      value8: '',

      editDialog: false,
      submitType: 1, //1：增加  2：修改
      updateID: '',
      userSearch: '',
      fromData: {
        columnName: '',
        belongId: {
          id: '0',
          name: '顶级栏目'
        },
        sort: 0,
        checkRoot: true,
      },
      tableData: [],
      idList: [],
      columnSort:[],
    }
  },
  created() {

  },
  watch: {
    editDialog(val) {
      if (val == false) {
        this.fromData = {
          columnName: '',
          sort: false,
          belongId: {
            id: '0',
            name: '顶级栏目'
          },
          checkRoot: true,
          sort:0,
        };
      } else {
        this.selectColumn();
      };
    },
  },
  mounted() {
    //do something after mounting vue instance
    this.getUserList();
    this.selectColumn();
  },
  methods: {
    //排序改变
    numberBlur(val) {
      var arr = {
        'id':val.id,
        'sort':val.sort,
      }
      if(this.columnSort.length == 0){
        this.columnSort.push(arr);
      }else{
        var i = 0;
        let a = this.columnSort.some((item,index)=>{//匹配数组元素
          if(item.id == arr.id){
            i = index;
            return true;
          }
        });
        if(a){
          this.columnSort.splice(i,1,arr);
        }else{
          this.columnSort.push(arr);
        }
      }
    },
    //保存数组元素
    keepSort(){
      var params = this.columnSort;
      if(this.columnSort.length != 0){
        this.$post(this.$api.batchSort,params).then((data) => {
          this.columnSort = [];
        });
      }else{
        this.$message({
          message: '请修改排序',
          type: 'info'
        });
      }

    },
    //增加
    addUserBtn(type) {
      this.editDialog = true;
      this.submitType = type;
    },
    // 查询顶级栏目
    selectColumn() {
      this.$post(this.$api.selectColumn).then((data) => {
        let arr = []
        for(let i in data){
          arr.push({id:data[i].id+'',name:data[i].columnName});
        }
        this.options = arr;
      });
    },
    // 修改栏目
    update(val, type) {
      this.editDialog = true;
      this.submitType = type;
      this.updateID = val.id;
      let num = '';
      let select = {
        id: val.belongId+'',
        name: val.belongName,
      };

      if (val.checkRoot == 1) {
        num = true;
      } else {
        num = false;
      }
      let _this = this;
      this.fromData = {
        columnName: val.columnName,
        belongId: select,
        sort: val.sort,
        checkRoot: num,
      }


    },
    // 添加栏目
    addUser(type) {
      let params = this.fromData;
      if (type === 1) {
        if(this.fromData.columnName != ""){
          this.$post(this.$api.addColumn, params).then((data) => {
            this.editDialog = false;
            this.getUserList();
          });
        }else{
          this.$message({
            message: '请输入栏目名称',
            type: 'info'
          });
        }
      } else if (type === 2) { //修改接口
        params.id = this.updateID;
        this.$post(this.$api.updateColumn, params).then((data) => {
          this.editDialog = false;
          this.getUserList();
        });
      }

    },
    //得到栏目列表
    getUserList() {
      this.$post(this.$api.queryColumn,{type:1}).then((data) => {
        var arr  = [];
        for(let i in data){
          arr.push(data[i]);
          for(let f in data[i].children){
            arr.push(data[i].children[f]);
          }
        }
        this.tableData = arr;
      });
    },
    //查找栏目
    searchUser() {
      let params = {
        userSearch: this.userSearch,
      }
      if (this.userSearch == '') {
        this.getUserList();
      } else {
        this.$post(this.$api.searchColumn, params).then((data) => {
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
        this.$post(this.$api.delectColumn, params).then((data) => {
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
