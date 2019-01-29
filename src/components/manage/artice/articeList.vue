<template>
<div>
  <el-row :gutter="20">
    <el-col :span="4">
      <div class="search">
        <el-input placeholder="搜索文章" @keyup.enter.native="searchUser" size="small" v-model="searchArtuce">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
    </el-col>
    <el-col :span="20">
      <el-button type="primary" size="small" icon="el-icon-search">搜索</el-button>
      <el-button type="primary" size="small" @click='dialogVisible = true' icon="el-icon-plus">添加文章</el-button>
      <el-button type="danger" size="small" @click="delect(idList,false)" icon="el-icon-delete">批量删除文章</el-button>
    </el-col>
  </el-row>
  <div class="content">
    <el-col :span="5" class="columnLeft">
      <div>
        <el-input placeholder="搜索栏目" v-model="filterText" size="small">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <!-- 栏目树 -->
        <el-tree :data="treeData" :props="defaultProps" :filter-node-method="filterNode" @node-click="treeClick" ref="tree2"></el-tree>
      </div>
    </el-col>
    <el-col :span="19">
      <div>
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" height="613" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection">
          </el-table-column>
          <el-table-column label="" width='80'>
            <template slot-scope="scope">
              <div class="image">
                <img :src="scope.row.imgurl" />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="">
            <template slot-scope="scope">
              <div class="articeTitle">
                <h5>{{scope.row.articeTitle}}</h5>
              </div>
              <el-tooltip class="item" effect="dark" :content="scope.row.articeTitle" placement="bottom">
                <div class="abs">
                  <p>
                    {{scope.row.abstract}}
                  </p>
                </div>
              </el-tooltip>
              <el-col :span="14">
                时间：{{setTime(scope.row.creatTime)}}
              </el-col>
              <el-col :span="10">
                <span>状态：</span>
                <span style="color:red;" v-if="scope.row.checkRoot == 0">待审核</span>
                <span style="color:green;" v-if="scope.row.checkRoot == 1">审核通过</span>
              </el-col>
            </template>
          </el-table-column>
          <el-table-column label="" fixed="right" width="150">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="editArtice(scope.row)">编辑</el-button>
              <el-button type="danger" @click="delect(scope.row.id, true)" size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="block">
          <el-pagination @size-change="changePagesize" @current-change="currentChange" @prev-click="prevClick" @next-click='nextClick' :page-sizes="[10, 20, 30, 40]" :page-size="10" layout="sizes, prev, pager, next" :total="paging.total">
          </el-pagination>
        </div>
      </div>
    </el-col>
  </div>

  <!-- 编辑弹窗 -->
  <el-dialog title="编辑" :visible.sync="dialogVisible" width="1100px">
    <div class="diaContent">
      <el-row :gutter="15">
        <el-col :span="7">
          <el-form label-width="80px" :model="fromArtie">
            <el-form-item label="文章标题:" prop="articeTitle">
              <el-input v-model="fromArtie.articeTitle" size="small"></el-input>
            </el-form-item>
            <el-form-item label="文章摘要:" style="margin-bottom:10px;">
              <el-input type="textarea" v-model="fromArtie.abstract" size="small"></el-input>
            </el-form-item>
            <el-form-item label="所属栏目:">
              <el-select v-model="fromArtie.columnId" style="width:100%;" filterable value-key="id" placeholder="请选择">
                <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="创建时间:">
              <el-date-picker v-model="fromArtie.time" type="datetime" placeholder="选择日期时间" default-time="12:00:00" style="width:100%;">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="是否审核:" style="margin-bottom:10px;">
              <el-switch v-model="fromArtie.checkRoot" active-color="#13ce66" inactive-color="#ff4949" active-text="审核通过" inactive-text="待审核">
              </el-switch>
            </el-form-item>
            <el-form-item label="作者:" style="margin-bottom:10px;">
              <el-input v-model="fromArtie.author" size="small"></el-input>
            </el-form-item>
            <el-form-item label="缩略图:">
              <el-upload class="avatar-uploader" ref="upload" :action="$api.upload" :show-file-list="false" :auto-upload="false" :on-change="handlePreview" :on-success="handleAvatarSuccess">
                <img v-if="imgurl" :src="imgurl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <el-button style="margin-left: 10px;" size="small" type="primary" @click="submitUpload">上传</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="17">
          <!-- 富文本编辑器 -->
          <wang-edit v-model="fromArtie.content" :isClear="isClear" @change="change"></wang-edit>
        </el-col>
      </el-row>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addArtice">保存</el-button>
    </span>
  </el-dialog>
</div>
</template>
<script>
import wangEdit from '../publicComponents/wangEditor'
export default {
  components: {
    wangEdit
  },
  data() {
    return {
      dialogVisible: false,
      searchArtuce: '', //搜索文章
      filterText: '',
      isClear: false,
      imgurl: '',
      paging: {
        pageNo: 1,
        pageSize: 10,
        total: 30,
      },
      options: [],
      fromArtie: {
        articeTitle: '',
        abstract: '',
        imgurl: '',
        content: '',
        columnId: {},
        author: '',
        checkRoot: false,
      },
      tableData: [],
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      idList: [],
      columnId: '',
      articeId: '',
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    },
    dialogVisible(val) {
      if (!val) {
        this.fromArtie = {
          articeTitle: '',
          abstract: '',
          imgurl: '',
          content: '',
          columnId: {},
          author: '',
          checkRoot: false,
        }
        this.articeId = "";
      }
    }
  },
  mounted() {
    this.getTreeList(); //得到树壮列表
    this.getColumnList();
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
    },
    // 当前页改变
    currentChange(val) {
      this.paging.pageNo = val;

    },
    // 上一页
    prevClick(val) {
      this.paging.pageNo = val;

    },
    // 下一页
    nextClick(val) {
      this.paging.pageNo = val;

    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 上传之前
    handlePreview(file, fileList) {
      this.imgurl = URL.createObjectURL(file.raw);
    },
    // 上传图片
    handleAvatarSuccess(res, file) {
      this.fromArtie.imgurl = res.data.path;
    },
    //手动上传缩略图
    submitUpload() {
      this.$message({
        message: '上传成功',
        type: 'success'
      });
      this.$refs.upload.submit();
    },
    // 富文本编辑框改变事件
    change(val) {
      this.fromArtie.content = val;
    },
    //得到栏目列表
    getTreeList() {
      this.$post(this.$api.queryColumn, {
        type: 1
      }).then((data) => {
        this.treeData = data;
      });
    },
    // 树点击事件
    treeClick(data, index, val) {
      let id = data.id; //当前点击栏目id
      this.queryArtice(id);
    },

    // 根据栏目ID查询文章
    queryArtice(id) {
      this.columnId = id;
      let params = {
        columnId: id,
      }
      this.$post(this.$api.queryArtice, params).then((data) => {
        this.tableData = data;
      });
    },
    //查询所有栏目
    getColumnList() {
      this.$post(this.$api.queryColumn, {
        type: 0
      }).then((data) => {
        var arr = [];
        for (let i in data) {
          let item = {
            id: data[i].id + "",
            name: data[i].columnName,
          }
          arr.push(item);
        }
        this.options = arr;
      });
    },
    //添加文章
    addArtice() {
      let params = this.fromArtie;
      if (this.fromArtie.articeTitle == "") {
        this.$message({
          message: '请输入标题',
          type: 'info'
        });
      } else if (this.fromArtie.content == '') {
        this.$message({
          message: '请输入内容',
          type: 'info'
        });
      } else if (this.fromArtie.columnId == '') {
        this.$message({
          message: '请选择栏目',
          type: 'info'
        });
      } else {
        if (this.articeId == '') {
          this.$post(this.$api.addArtice, params).then((data) => {
            this.dialogVisible = false;
            this.queryArtice(this.columnId);
          });
        } else {
          params.id = this.articeId;
          this.$post(this.$api.updateArtice, params).then((data) => {
            this.dialogVisible = false;
            this.queryArtice(this.columnId);
          });
        }

      }

    },
    // 多选
    handleSelectionChange(val) {
      let arr = []
      for (let i in val) {
        arr.push(val[i].id)
      }
      this.idList = arr;
    },
    //删除文章
    delect(id = "", type) {
      let params = {}
      if (type) {
        params.id = id;
      } else {
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

      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$post(this.$api.delectArtice, params).then((data) => {
          this.queryArtice(this.columnId);
        });
      }).catch(() => {});

    },
    // 编辑文章
    editArtice(row) {
      var arr = {};
      for (var key in row) {
        arr[key] = row[key];
      }
      if (row.checkRoot == 0) {
        arr.checkRoot = false;
      } else {
        arr.checkRoot = true;
      }
      arr.columnId = {
        id: row.columnId + '',
        name: row.columnName,
      }
      this.fromArtie = arr;
      this.dialogVisible = true;
      this.articeId = row.id;
    }
  },
}
</script>
<style>
.columnLeft .el-input__inner {
  border-radius: 0;
}

.diaContent .el-form-item {
  margin-bottom: 0px;

}

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
  margin-bottom: 0;
  height: 645px;
  overflow: auto;
}

.columnLeft {
  height: 645px;
  overflow: auto;
  background: rgba(255, 255, 255, 0.5);
}

.image {
  width: 70px;
  height: 70px;
  overflow: hidden;
  border-radius: 5px;
}

.image img {
  width: 100%;
}

.articeTitle h5 {
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.block {
  text-align: right;
}

.abs p {
  height: 15px;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  line-height: 18px;
  text-align: justify;
  margin-top: 5px;
  text-align: justify;
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
