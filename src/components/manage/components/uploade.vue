<template>
    <div class="box">
        <div v-if="!copper">
            <div v-if="fileType==1">
                <el-upload :multiple="multiple" class="avatar-uploader" :action="$api.upload" ref="upload"
                           :show-file-list="false" :on-change="uploadChange" :auto-upload="false">
                    <img v-if="imgurl && !multiple" :src="imgurl" ref="imgUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
            <div v-else-if="fileType ==2" class="mp3">
                <el-upload :multiple="multiple" :action="$api.upload" ref="upload"
                           :show-file-list="false" :on-change="uploadChange" :auto-upload="false">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
                {{dataUrl}}
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
        <!--图盘剪裁-->
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
                imgFormData: "",
                edit:false,
                dataUrl:"",
            }
        },
        props: {
            hitting: { //是否压缩
                type: Boolean,
                default: true
            },
            dirName:{ //文件夹名字
                type: String,
                default: ""
            },
            autoUp: {//自动上传
                type: Boolean,
                default: false
            },
            copper: {//是否剪裁
                type: Boolean,
                default: false
            },
            multiple:{/*多个上传*/
                type: Boolean,
                default: false
            },
            img:{ //图片地址
                type:String,
                default:"",
            },
            fileType:{ //上传类型 1图片 2MP3
                type:[String,Number],
                default:1,
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
                const type = file.raw.type;
                console.log(type);
                let typeArr = []
                if(this.fileType == 1){
                    typeArr = ["image/jpeg","image/png","image/jpg"]
                }else if (this.fileType == 2) {
                    typeArr = ["audio/mp3"]
                }
                if(typeArr.indexOf(type) != -1){
                    this.imgurl = URL.createObjectURL(file.raw);
                    this.imgFormData = file.raw;
                    if (this.autoUp) {
                        this.submitUpload();
                    }
                }else{
                    this.$message({
                        message: '请选择正确格式的文件',
                        type: 'error'
                    });
                }

            },

            //剪辑图片返回数据
            saveImg(val){
                this.imgurl = val;
                if (this.autoUp) {
                    this.submitUpload();
                }
                this.edit = false;
            },
            //手动上传图片
            submitUpload() {
                var _this = this;
                if(this.fileType==1){
                    if (this.imgurl != "") {
                        if (this.hitting) {
                            lrz(_this.imgurl)
                                .then(function (rst) {
                                    //成功时执行
                                    let file = _this.fileCon(rst.file)
                                    _this.$uploadImg(_this.$api.upload,file).then((data) => {
                                        _this.$emit("change",data.path)
                                    })
                                }).catch(function (error) {
                                //失败时执行
                            }).always(function () {
                                //不管成功或失败，都会执行
                            })
                        } else {
                            console.log("不压缩");
                            let file = _this.fileCon(this.imgFormData)
                            this.$uploadImg(this.$api.upload, file).then((data) => {
                                this.$emit("change",data.path)
                            })
                        }
                    } else {
                        this.$message({
                            message: '请选择图片',
                            type: 'info'
                        });
                    }
                }else if (this.fileType==2) {
                    console.log("上传MP3");
                    let file = _this.fileCon(this.imgFormData)
                    this.$uploadImg(this.$api.upload, file).then((data) => {
                        this.dataUrl = data.path
                        this.$emit("change",data.path)
                    })
                }
            },
            fileCon(file){
                let type = file.type.split('/')[1]
                let name = this.dirName+'_.'+type
                var new_file = new File([file],name,{type:file.type});
                return new_file
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