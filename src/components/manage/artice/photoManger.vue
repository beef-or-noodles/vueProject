<template>
<div>
  <el-row>
    <el-col :span="24">
      <el-button type="primary" size="small" @click="upPhoto" icon="el-icon-upload2">上传照片</el-button>
      <el-button type="primary" size="small" @click="creatPhoto = true" icon="el-icon-circle-plus-outline">创建相册</el-button>
      <el-button type="warning" size="small" @click="keepSort" icon="el-icon-sort">相册排序</el-button>
    </el-col>
  </el-row>

  <div class="content">



  </div>


  <!-- 弹窗 -->
  <el-dialog title="创建相册" :close-on-click-modal="false" width="420px" :visible.sync="creatPhoto">
    <el-form :model="form" label-width="85px">
      <el-form-item label="相册名称：" :label-width="formLabelWidth">
        <el-input v-model="fromData.photoName" placeholder="相册名" size="small" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="相册描述：" :label-width="formLabelWidth">
        <el-input v-model="fromData.describe" placeholder="相册描述" type="textarea" rows="5" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="封面图:" prop="imgurl">
        <el-col :span="12">
          <el-upload class="avatar-uploader" :action="$api.upload" ref="upload" :show-file-list="false" :on-change="uploadChange" :auto-upload="false">
            <img v-if="imgurl" :src="imgurl" ref="imgUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>
        <el-col :span="12">
          <br />
          <span>压缩：</span>
          <el-switch v-model="isCompress" active-text="是" inactive-text="否">
          </el-switch>
          <br />
          <el-button type="primary" size="mini" @click="submitUpload">上传</el-button>
        </el-col>
      </el-form-item>
      <el-col :span="10">
        <el-form-item label="是否显示:">
          <el-switch v-model="fromData.checkRoot" active-color="#13ce66" inactive-color="#ff4949" active-text="是" inactive-text="否"></el-switch>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="排序:" prop="relPassword">
          <el-input-number v-model="fromData.sort" size="small" :min="0" label="排序"></el-input-number>
        </el-form-item>
      </el-col>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="creatPhoto = false">取 消</el-button>
      <el-button type="primary" @click="creatPhoto = false">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>
<script>
export default {
  data() {
    return {
      creatPhoto: false,

      isCompress: true, //是否压缩
      imgFormData: '', //图片file对象
      imgurl: '',

      fromData: {
        photoName: '',
        describe: '',
        checkRoot: '',
        sort: '',
      }
    }
  },
  created() {

  },
  methods: {
    upPhoto() {

    },
    addPhoto() {

    },
    keepSort() {

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
                _this.fromData.imgurl = data.path;
              })
            }).catch(function(error) {
              //失败时执行
            }).always(function() {
              //不管成功或失败，都会执行
            })
        } else {
          console.log("不压缩");
          this.$uploadImg(this.$api.upload, this.imgFormData).then((data) => {
            this.fromData.imgurl = data.path;
          })
        }
      } else {
        this.$message({
          message: '请选择图片',
          type: 'info'
        });
      }

    },

  }
}
</script>
<style scoped>
.content {
  padding: 20px;
}
</style>
