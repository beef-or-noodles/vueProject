<template>
<div>
  <div>
    <el-input placeholder="搜索文章" style="width:200px;" @keyup.enter.native="serchArtice" size="small" v-model="searchName">
      <i slot="prefix" class="el-input__icon el-icon-search"></i>
    </el-input>
    <el-button type="primary" @click='serchArtice' size="small" icon="el-icon-search">搜索</el-button>
    <el-button type="primary" size="small" @click='dialogVisible = true' icon="el-icon-plus">添加文章</el-button>
    <el-button type="danger" size="small" @click="delect(idList,false)" icon="el-icon-delete">批量删除文章</el-button>
  </div>
      <div class="content">
    <div class="columnLeft">
      <div>
        <el-input placeholder="搜索栏目" v-model="filterText" size="small">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <!-- 栏目树 -->
        <el-tree :data="treeData" :props="defaultProps" :filter-node-method="filterNode" @node-click="treeClick" ref="tree2"></el-tree>
      </div>
    </div>
    <div class="contentRight">
      <div>
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection">
          </el-table-column>
          <el-table-column label="" width='80'>
            <template slot-scope="scope">
              <div class="image">
                <img :src="imgStr(scope.row.imgurl)" />
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
      </div>
    </div>
  </div>
  <div class="pagesize">
    <wPage @pageSize="pageSize" @pageNo="pageNo" :total="paging.total"></wPage>
  </div>
  <!-- 编辑弹窗 -->
  <el-dialog title="编辑" :close-on-click-modal="false" :visible.sync="dialogVisible" width="1200px">
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
<!--              <fileupload :img="fromArtie.imgurl" @change="fileChange" :autoUp="false" :copper="true" dirName="artice_cover"></fileupload>-->
              <img-edit folder="artice_cover" ref="imgEdit" :imgList="imgurlArr" @change="imgEditChange" title="选择图片" :max="5" :cropXY="{fixedBox:false}" :operation="['cover','crop','delete','edit']"></img-edit>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="17">
          <el-radio-group v-model="editer">
            <el-radio :label="1">富文本编辑器</el-radio>
            <el-radio :label="2">markdown编辑器</el-radio>
          </el-radio-group>
          <div style="margin-top: 15px">
            <!-- 富文本编辑器 -->
            <wang-edit v-show="editer == 1" v-model="fromArtie.content" :isClear="isClear" @change="change" ref="edit"></wang-edit>
            <mavon-editor v-show="editer == 2" style="min-height: 580px" @change="markdown"  ref=md @imgAdd="imgAdd" v-model="fromArtie.markdownStr"></mavon-editor>
          </div>
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
import fileupload from "../components/uploade";
import imgEdit from '../components/imageEdit/imgEdit'
export default {
  components: {
    wangEdit,
    fileupload,
    imgEdit
  },
  data() {
    return {
      editer: 1,
      dialogVisible: false,
      searchName: '', //搜索文章
      filterText: '',
      isClear: false,
      imgurlArr: [],
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
        checkRoot: true,
        setTime: new Date(),
        creatTime: new Date(),
        articeType:0,
        markdownStr: ''
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
          checkRoot: true,
          setTime: new Date(),
          creatTime: new Date(),
          articeType:0,
          markdownStr: ''
        }
        this.articeId = "";
        this.stickDate = 1; //置顶天数
        this.stick = false;
        this.imgurlArr = []
        this.$refs.edit.saveHtml("");
      }
    }
  },
  mounted() {
    this.getTreeList(); //得到树壮列表
    this.getColumnList();
  },
  methods: {
    imgStr(url){
        return url?url.split(',')[0]:''
    },
    setTime: function(val) {
      let date = new Date(val);
      let time = date.getTime();
      let settime = this.$tool.formatTime(time / 1000, true);
      return settime
    },
    pageSize(val){
      this.paging.pageSize = val;
      this.queryArtice(this.columnId);
    },
    pageNo(val){
      this.paging.pageNo = val;
      this.queryArtice(this.columnId);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    //上传图片
    fileChange(val){
      this.fromArtie.imgurl = val;
    },
    imgEditChange(val){
      this.imgurlArr=val
    },
    // 富文本编辑框改变事件
    change(val) {
      this.fromArtie.content = val;
    },
    markdown(value,render){
        this.fromArtie.markdownStr = value;
        this.fromArtie.content = render;
    },
    imgAdd(pos, $file){
      this.$uploadImg(this.$api.upload,$file).then(data=>{
        this.$refs.md.$img2Url(pos, data.path);
      })
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
        type: 0,
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
        // 上传图片
        this.$refs.imgEdit.uploadImg(this.imgurlArr).then(data=>{
          params.imgurl = data.join(",")
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
        })



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
      if(row.markdownStr){
        this.editer = 2
      }else{
        this.editer = 1
      }
      if(row.imgurl){
        this.imgurlArr = row.imgurl.split(',')
      }
      setTimeout(()=>{
        this.$refs.edit.saveHtml(row.content);
      })

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
<style scoped>
.search {
  overflow: hidden;
}

.content {
  margin: 20px 0;
  margin-bottom: 0;
  overflow: auto;
  position: absolute;
  height: calc(90% - 150px);
  width: calc(90% - 230px);
}

.columnLeft {
  height: 100%;
  overflow: auto;
  width: 230px;
  background: rgba(255, 255, 255, 0.5);
}
.contentRight{
  position: absolute;
  right: 0;
  top: 0;
  width: calc(100% - 230px);
  height: 100%;
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
