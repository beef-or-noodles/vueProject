<template>
<div>
  <el-row :gutter="20">
    <el-col :span="4">
      <div class="search">
        <el-input placeholder="搜索文章" @keyup.enter.native="serchArtice" size="small" v-model="searchName">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
    </el-col>
    <el-col :span="20">
      <el-button type="primary" @click='serchArtice' size="small" icon="el-icon-search">搜索</el-button>
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
                  <p style="margin-bottom:10px;">
                    {{scope.row.abstract}}
                  </p>
                </div>
              </el-tooltip>
              <el-col :span="9">
                时间：{{setTime(scope.row.creatTime)}}
              </el-col>
              <el-col :span="5">
                &nbsp;<span v-show="scope.row.setTime > (new Date().getTime())" style="color:green;">已置顶</span>
              </el-col>
              <el-col :span="6">
                <span>状态：</span>
                <span style="color:red;" v-if="scope.row.checkRoot == 0">待审核</span>
                <span style="color:green;" v-if="scope.row.checkRoot == 1">审核通过</span>
              </el-col>
              <el-col :span="4">
                <span>推荐：</span>
                <el-button type="danger" v-if="scope.row.recommend == 0" size="mini" plain @click="setRecommend(scope.row.id,1,scope.$index)">否</el-button>
                <el-button type="primary" v-if="scope.row.recommend == 1" size="mini" plain @click="setRecommend(scope.row.id,0,scope.$index)">是</el-button>
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
            <br />
            <el-form-item label="创建时间:">
              <el-date-picker :disabled="true" v-model="fromArtie.creatTime" type="datetime" placeholder="选择日期时间" default-time="12:00:00" style="width:100%;">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="是否审核:" style="margin-bottom:10px;">
              <el-switch v-model="fromArtie.checkRoot" active-color="#13ce66" inactive-color="#ff4949" active-text="审核通过" inactive-text="待审核">
              </el-switch>
            </el-form-item>
            <el-form-item label="作者:" style="margin-bottom:10px;">
              <el-input v-model="fromArtie.author" size="small"></el-input>
            </el-form-item>
            <el-form-item label="是否置顶:" style="margin-bottom:10px;">
              <el-checkbox v-model="stick"></el-checkbox>
              <el-input-number :disabled="!stick" v-model="stickDate" size="mini" :min="1"></el-input-number>　(天)
            </el-form-item>
            <el-form-item label="缩略图:">
              <el-col :span="24">
                <el-upload class="avatar-uploader" :action="$api.upload" ref="upload" :show-file-list="false" :on-change="uploadChange" :auto-upload="false">
                  <img v-if="imgurl" :src="imgurl" ref="imgUrl" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-col>
              <el-col :span="24">
                <span>是否压缩：</span>
                <el-switch v-model="isCompress" active-text="是" inactive-text="否">
                </el-switch>
                <el-button type="primary" size="mini" @click="submitUpload">上传</el-button>
              </el-col>
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
      searchName: '', //搜索文章
      filterText: '',
      isClear: false,
      imgurl: '',
      isCompress: true, //是否压缩
      imgFormData: '', //图片file对象
      time: new Date(),
      stick: false, //是否置顶
      stickDate: 1, //置顶天数
      paging: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
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
        setTime: new Date(),
        creatTime: new Date(),
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
          setTime: new Date(),
          creatTime: new Date(),
        }
        this.articeId = "";
        this.stickDate = 1; //置顶天数
        this.stick = false;
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
      this.queryArtice(this.columnId);
    },
    // 当前页改变
    currentChange(val) {
      this.paging.pageNo = val;
      this.queryArtice(this.columnId);
    },
    // 上一页
    prevClick(val) {
      this.paging.pageNo = val;
      this.queryArtice(this.columnId);
    },
    // 下一页
    nextClick(val) {
      this.paging.pageNo = val;
      this.queryArtice(this.columnId);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 选择图片
    uploadChange(file, fileList) {
      this.imgurl = URL.createObjectURL(file.raw);
      this.imgFormData = file.raw;
    },
    //手动上传图片
    submitUpload() {
      var _this = this;
      if (this.imgurl != "") {
        if (this.isCompress) {
          lrz(_this.imgurl)
            .then(function(rst) {
              //成功时执行
              console.log("压缩图片");
              _this.$post(_this.$api.upload, rst.formData).then((data) => {
                _this.fromArtie.imgurl = data.path;
              })
            }).catch(function(error) {
              //失败时执行
            }).always(function() {
              //不管成功或失败，都会执行
            })
        } else {
          console.log("不压缩");
          this.$uploadImg(this.$api.upload, this.imgFormData).then((data) => {
            this.fromArtie.imgurl = data.path;
          })
        }
      } else {
        this.$message({
          message: '请选择图片',
          type: 'info'
        });
      }

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
      this.fromArtie.columnId = {
        id: data.id + '',
        name: data.columnName,
      }
      this.paging.pageNo = 1;
      this.columnId = id;
      this.queryArtice(id);
    },

    // 根据栏目ID查询文章
    queryArtice(id) {
      let params = this.paging;
      params.columnId = id;
      params.type = 0;
      this.$post(this.$api.queryArtice, params).then((data) => {
        this.tableData = data.data;
        this.paging.total = data.total;
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
    //搜索文章
    serchArtice() {
      if (this.searchName == '') {
        this.$message({
          message: '请输入搜索内容',
          type: 'info'
        });
        return;
      }
      this.$post(this.$api.searchArtice, {
        searchName: this.searchName,
        recycle: 1,
      }).then((data) => {
        if (data != '') {
          this.tableData = data;
          this.paging.total = 10;
        }

      });
    },
    //添加文章
    addArtice() {
      var params = this.fromArtie;
      if (this.fromArtie.articeTitle == "") {
        this.$message({
          message: '请输入标题',
          type: 'info'
        });
      } else if (this.fromArtie.content == '<p><br></p>' || this.fromArtie.content == '') {
        this.$message({
          message: '请输入内容',
          type: 'info'
        });
      } else if (JSON.stringify(this.fromArtie.columnId) == '{}') {
        this.$message({
          message: '请选择栏目',
          type: 'info'
        });
      } else {
        var time = new Date().getTime();
        if (this.stick) { //置顶几天
          params.setTime = time + (this.stickDate * 24 * 60 * 60 * 1000);
        }else{
          params.setTime = new Date(params.creatTime).getTime();
        }
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
      this.$confirm('此操作将删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        params.recycle = 0;
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
      var nowDate = new Date().getTime();
      if (row.setTime > nowDate) {//是置顶
        this.stick = true;
        var times = arr.setTime - nowDate;
        var day = Math.ceil(times/1000/60/60/24);//计算天数
        this.stickDate = day;
      }
      this.fromArtie = arr;
      this.dialogVisible = true;
      this.articeId = row.id;
    },
    //设置推荐文章
    setRecommend(id,type,index){
      var params = {
        id:id,
        type:type,
      }
      this.$post(this.$api.recommend,params).then((data)=>{
        this.tableData[index].recommend = type;
      });
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
