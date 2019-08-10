<template>
    <div class="box">
        <div v-if="!copper">
            <div>
                <el-upload class="avatar-uploader" :action="$api.upload" ref="upload"
                           :show-file-list="false" :on-change="uploadChange" :auto-upload="false">
                    <img v-if="imgurl" :src="imgurl" ref="imgUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
        </div>
        <div v-else>
            <div class="avatarBox" @click="edit = true">
                <img v-if="imgurl" :src="imgurl" ref="imgUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </div>
        </div>
        <div v-if="!autoUp">
            <el-button type="primary" style="width:120px ;" size="mini" @click="submitUpload">上传</el-button>
        </div>

        <el-dialog append-to-body :visible.sync="edit" width="284px" :close-on-click-modal="true">
            <img-edit @saveImg="saveImg"></img-edit>
        </el-dialog>
    </div>
</template>

<script>
    import imgEdit from "./imgEdit";

    export default {
        components: {
            imgEdit
        },
        data() {
            return {
                isCompress: true,
                imgurl:'',
                fromData: {
                    imgurl: "",
                },
                imgFormData: "",
                edit:false,
            }
        },
        props: {
            hitting: { //是否压缩
                type: Boolean,
                default: true
            },
            autoUp: {//自动上传
                type: Boolean,
                default: false
            },
            copper: {//是否剪裁
                type: Boolean,
                default: false
            },
            img:{
                type:String,
                default:"",
            }
        },
        watch:{
          img(val){
              this.imgurl = val
          }
        },
        methods: {
            // 选择图片
            uploadChange(file, fileList) {
                console.log(file.raw.type);
                const type = file.raw.type;
                let typeArr = ["image/jpeg","image/png","image/jpg"]
                console.log(typeArr.indexOf(type) != -1);
                if(typeArr.indexOf(type) != -1){
                    this.imgurl = URL.createObjectURL(file.raw);
                    this.imgFormData = file.raw;
                    if (this.autoUp) {
                        this.submitUpload();
                    }
                }else{
                    this.$message({
                        message: '请选择正确格式的图片',
                        type: 'error'
                    });
                }

            },

            //剪辑图片返回数据
            saveImg(val){
                this.imgurl = val;
                this.edit = false;
            },
            //手动上传图片
            submitUpload() {
                var _this = this;
                if (this.imgurl != "") {
                    if (this.hitting) {
                        lrz(_this.imgurl)
                            .then(function (rst) {
                                //成功时执行
                                console.log("压缩图片");
                                _this.$post(_this.$api.upload, rst.formData).then((data) => {
                                    _this.fromData.imgurl = data.path;
                                    _this.$emit("change",data.path)
                                })
                            }).catch(function (error) {
                            //失败时执行
                        }).always(function () {
                            //不管成功或失败，都会执行
                        })
                    } else {
                        console.log("不压缩");
                        this.$uploadImg(this.$api.upload, this.imgFormData).then((data) => {
                            this.fromData.imgurl = data.path;
                            this.$emit("change",data.path)
                        })
                    }
                } else {
                    this.$message({
                        message: '请选择图片',
                        type: 'info'
                    });
                }

            },
        },
    }
</script>

<style lang="less" scoped>
    .box {
        display: block;
        .avatarBox{
            width: 120px;
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            &:hover{
                border-color: #409EFF;
            }
        }
    }
</style>