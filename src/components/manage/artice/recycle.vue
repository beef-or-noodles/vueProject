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
      <el-button type="primary" size="small" @click="searchRecycle" icon="el-icon-search">搜索</el-button>
      <el-button type="primary" size="small" @click="regainArtice" icon="el-icon-refresh">恢复文章</el-button>
      <el-button type="danger" size="small" @click="delect" icon="el-icon-delete">彻底删除</el-button>
    </el-col>
  </el-row>
  <div class="content">
    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" height="590" style="width: 100%" @selection-change="handleSelectionChange">
      <el-table-column type="selection">
      </el-table-column>
      <el-table-column prop="id" label="文章ID" width="80px">
      </el-table-column>
      <el-table-column prop="articeTitle" label="标题" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="abstract" label="摘要" show-overflow-tooltip>
      </el-table-column>
      <el-table-column prop="columnName" label="栏目" width="150">
      </el-table-column>
      <el-table-column prop="creatTime" label="创建时间" width="250">
        <template slot-scope="scope">
          {{setTime(scope.row.creatTime)}}
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination @size-change="changePagesize" @current-change="currentChange" @prev-click="prevClick" @next-click='nextClick' :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="sizes, prev, pager, next" :total="paging.total">
      </el-pagination>
    </div>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      userSearch: '',
      userID:this.$store.state.user_info.id,
      tableData: [],
      paging: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
      },
      idList: [],
    }
  },
  mounted() {
    this.queryRecycle();
  },
  methods: {
    setTime: function(val) {
      let date = new Date(val);
      let time = date.getTime();
      let settime = this.$tool.formatTime(time / 1000, true);
      return settime
    },
    // 改变每页条数
    changePagesize(value) {
      this.paging.pageSize = value;
      this.queryRecycle();
    },
    // 当前页改变
    currentChange(val) {
      this.paging.pageNo = val;
      this.queryRecycle();
    },
    // 上一页
    prevClick(val) {
      this.paging.pageNo = val;
      this.queryRecycle();
    },
    // 下一页
    nextClick(val) {
      this.paging.pageNo = val;
      this.queryRecycle();
    },

    // 多选
    handleSelectionChange(val) {
      let arr = []
      for (let i in val) {
        arr.push(val[i].id)
      }
      this.idList = arr;
    },
    //查询回收站文章
    queryRecycle() {
      let params = this.paging;
      params.userID = this.userID;
      this.$post(this.$api.queryRecycle, params).then((data) => {
        this.paging.total = data.total;
        this.tableData = data.data;
      });
    },
    delect() {
      let params = {}
      if (this.idList == "" || this.idList.length == 0) {
        this.$message({
          message: '请选择',
          type: 'info',
          duration: 1500,
        });
        return;
      } else {
        params.idList = this.idList;
      }
      this.$confirm('此操作将永久删除文章, 是否继续?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$post(this.$api.delectRecycle, params).then((data) => {
          this.queryRecycle();
        });
      }).catch(() => {});

    },
    regainArtice() {
      let params = {}
      if (this.idList == "" || this.idList.length == 0) {
        this.$message({
          message: '请选择',
          type: 'info',
          duration: 1500,
        });
        return;
      } else {
        params.idList = this.idList;
      }

      this.$confirm('是否恢复选中文件?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        params.recycle = 1;
        this.$post(this.$api.delectArtice, params).then((data) => {
          this.queryRecycle();
        });
      }).catch(() => {});

    },
    //查找回收站文章
    searchRecycle() {
      let params = {
        searchName: this.userSearch,
        recycle: 0,
      }
      if (this.userSearch == '') {
        this.queryRecycle();
      } else {
        params.userID = this.userID;
        this.$post(this.$api.searchArtice, params).then((data) => {
          this.tableData = data;
        });
      }
    },
  }
}
</script>
<style scoped>
.content {
  margin: 20px 0;
}

.block {
  text-align: right;
}
</style>
