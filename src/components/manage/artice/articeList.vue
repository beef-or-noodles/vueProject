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
      <el-button type="danger" size="small" icon="el-icon-delete">批量删除文章</el-button>
    </el-col>
  </el-row>
  <div class="content">
    <el-col :span="5" class="columnLeft">
      <div>
        <el-input placeholder="搜索栏目" v-model="filterText" size="small">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <!-- 栏目树 -->
        <el-tree :data="data2" :props="defaultProps" :filter-node-method="filterNode" ref="tree2"></el-tree>
      </div>
    </el-col>
    <el-col :span="19">
      <div>
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" height="590" style="width: 100%">
          <el-table-column type="selection">
          </el-table-column>
          <el-table-column label="" width='80'>
            <template slot-scope="scope">
              <div class="image">
                <img src="../../../../static/images/icon.jpg" />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="">
            <template slot-scope="scope">

              <div class="articeTitle">
                <h5>这里是标题这里是标题这里是标题标题啊就是标题真的是标题</h5>
              </div>
              <el-tooltip class="item" effect="dark" content="这里是标题这里是标题这里是标题标题啊就是标题真的是标题" placement="bottom">
                <div class="abs">
                  <p>
                    这里是标题这里是标题这里是标题标题啊就是标题真的是标题
                    这里是标题这里是标题这里是标题标题啊就是标题真的是标题
                  </p>
                </div>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="" fixed="right" width="150">
            <template slot-scope="scope">
              <el-button type="primary" size="mini">编辑</el-button>
              <el-button type="warning" size="mini">审核</el-button>
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
            <el-form-item label="文章标题:">
              <el-input v-model="fromArtie.title" size="small"></el-input>
            </el-form-item>
            <el-form-item label="文章摘要:" style="margin-bottom:10px;">
              <el-input type="textarea" v-model="fromArtie.title" size="small"></el-input>
            </el-form-item>
            <el-form-item label="创建时间:">
              <el-date-picker v-model="fromArtie.time" type="datetime" placeholder="选择日期时间" default-time="12:00:00" style="width:100%;">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="是否审核:" style="margin-bottom:10px;">
              <el-switch v-model="fromArtie.audit" active-color="#13ce66" inactive-color="#ff4949" active-text="审核通过" inactive-text="待审核">
              </el-switch>
            </el-form-item>
            <el-form-item label="作者:" style="margin-bottom:10px;">
              <el-input v-model="fromArtie.anthor" size="small"></el-input>
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
      <el-button type="primary" @click="dialogVisible = false">保存</el-button>
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
      fromArtie: {
        title: '',
        time: '',
        anthor: '',
        audit: false,
        imgurl: '',
        content: '',
      },
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }],
      data2: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  },
  mounted() {

  },
  methods: {
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
    handlePreview(file,fileList) {
      this.imgurl = URL.createObjectURL(file.raw);
    },
    // 上传图片
    handleAvatarSuccess(res, file) {
      this.$message({
        message: '上传成功',
        type: 'success'
      });
      this.fromArtie.imgurl = res.data.path;
    },
    //手动上传缩略图
    submitUpload() {
      this.$refs.upload.submit();
    },
    // 富文本编辑框改变时间
    change(val) {
      this.fromArtie.content = val;
    },
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
  background-color: white;
  height: 645px;
  overflow: auto;
}

.columnLeft {
  border-right: 1px solid #dcdfe6;
  height: 645px;
  overflow: auto;
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
  background-color: white;
  text-align: right;
}

.abs p {
  height: 35px;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 18px;
  text-align: justify;
  margin-top: 5px;
  text-indent: 2em;
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
