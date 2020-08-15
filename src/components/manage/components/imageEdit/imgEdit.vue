<template>
  <div>
    <div class="box_img">
      <draggable v-model="imgList">
        <transition-group class="imgList">
          <div v-for="(item,index) in imgList" :key="index" class="imgBox">
            <template v-if="input">
              <el-input class="input" v-if="inputShow" v-model="item.value" size="mini" placeholder="请输入说明" />
              <img :src="item.url" alt="">
            </template>
            <template v-else>
              <img :src="item" alt="">
            </template>
            <div class="hanld">
              <i title="设为封面" v-if="control.crop" :style="{color:index==0?'red':'white'}"  @click="setIndex(index)"  class="el-icon-picture"></i>
              <el-upload
                      v-if="control.edit"
                      ref="upload"
                      size="mini"
                      :on-change="handlePreview"
                      action=""
                      :show-file-list="false"
                      :auto-upload="false"
              >
                <i title="替换图片" class="el-icon-folder" @click="edits(item,index)"></i>
              </el-upload>
              <i title="图片剪裁" class="el-icon-scissors" v-if="control.cover" @click="crop(item,index)" ></i>
              <i title="删除图片" v-if="control.delete" class="el-icon-delete" @click="deletImg(index)"></i>
            </div>
          </div>
        </transition-group>
      </draggable>
      <template v-if="single">
        <div v-if="imgDisable" class="avatar-uploader" @click.stop="errorMsg">
          <i class="el-icon-plus avatar-uploader-icon" />
        </div>
        <el-upload
          v-else
          ref="upload"
          size="mini"
          :on-change="handlePreview"
          action=""
          :multiple="multiple"
          :show-file-list="false"
          :auto-upload="false"
          class="avatar-uploader"
        >
          <div class="el-icon-plus avatar-uploader-icon">
            <p>{{ title }}</p>
          </div>
        </el-upload>
      </template>
      <!--图片剪裁-->
      <el-dialog append-to-body :visible.sync="editImgDialog" width="1250px" :close-on-click-modal="false">
        <div class="imgBox">
          <div class="copper">
            <vueCropper
              ref="cropper"
              :img="option.img"
              :output-type="option.outputType"
              :fixed-box="option.fixedBox"
              :center-box="option.centerBox"
              :auto-crop="option.autoCrop"
              :auto-crop-width="option.autoCropWidth"
              :auto-crop-height="option.autoCropHeight"
              :mode="option.mode"
              :enlarge="2"
              @realTime="realTime"
            />
          </div>
          <div class="preview-box">
            <div :style="previews.div" class="preview">
              <img :src="previews.url" :style="previews.img">
            </div>
          </div>
        </div>
        <div class="btnBox">
          <div>
            <el-button type="primary" icon="el-icon-refresh-left" size="small" @click="left" />
          </div>
          <div>
            <el-button type="primary" icon="el-icon-refresh-right" size="small" @click="right" />
          </div>
          <div>
            <el-button type="primary" size="small" @click="down('blob')">保存</el-button>
          </div>
          <div>请使用鼠标滚轮放大或缩小图片</div>
        </div>
      </el-dialog>
    </div>

  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
import draggable from 'vuedraggable'
import { loadImageToBlob, getBase64 } from '@/tool/public/blobChange'
export default {
    name: 'UploadImgEdit',
    components: {
        VueCropper, draggable
    },
    props: {
        title: { // 文字提示
            type: String,
            default: ''
        },
        /*
     * 是否加入输入框
     * true：return[{value:"文字",url:"图片地址"}]
     * false：return [url,url]
     * */
        input: {
            type: Boolean,
            default: false
        },
        inputShow: { // 输入框是否显示
            type: Boolean,
            default: true
        },
        edit: {// 是否需要在上传的时候剪辑
            type: Boolean,
            default: false
        },
        max: { // 最大数量  单张图片不传 max就使用默认值
            type: Number,
            default: 1
        },
        folder: {// 文件夹名字
            type: String,
            default: 'other'
        },
        /*
    * 操作按钮显示
      cover, 裁剪
      crop, 设置封面
      delete, 删除
      edit  编辑
      * */
        operation: {
            type: Array,
            default: () => {
                return []
            }
        },
        verify: { // 文件规则 size format
            type: Object,
            default: () => {
                return {}
            }
        },
        imgList: {
            type: Array,
            default: () => {
                return []
            }
        },
        cropXY: { // 是否固定剪裁框宽度
            type: Object,
            default: () => {
                return {
                    fixedBox: true,
                    autoCropWidth: 300,
                    autoCropHeight: 300
                }
            }
        }

    },
    data() {
        return {
            previews: {},
            editImgDialog: false,
            option: {
                img: '',
                outputType: 'png',
                fixedBox: false,
                centerBox: true,
                autoCrop: true,
                autoCropWidth: 300,
                autoCropHeight: 300,
                mode: 'cover',
                outputSize: 0.3
            },
            downImg: '#',
            imgerror: '',
            editImage: -1,

            rule: {
                size: 2,
                format: 'jpg/png/jpeg/gif'
            },
            control: {
                cover: false, // 裁剪
                crop: false, // 设置封面
                delete: false, // 删除
                edit: false // 编辑
            }
        }
    },
    computed: {
        imgDisable() {
            if (this.imgList.length >= this.max) {
                return true
            } else {
                return false
            }
        },
        // 单张图片
        single() {
            if (this.imgList.length === 1 && this.max === 1) {
                return false
            } else {
                return true
            }
        },
        multiple() {
            return this.max !== 1
        }
    },
    watch: {
        editImgDialog(newValue, oldValue) {
            if (newValue === false) {
                this.option.img = ''
                this.editImage = -1
            }
        },
        operation: {
            handler(val) {
                const data = this.control
                val.forEach(item => {
                    data[item] = true
                })
            },
            deep: true,
            immediate: true
        },
        verify: {
            handler(val) {
                const rule = JSON.parse(JSON.stringify(this.rule))
                this.rule = { ...rule, ...val }
            },
            deep: true,
            immediate: true
        },
        cropXY: {
            handler(val) {
                const option = JSON.parse(JSON.stringify(this.option))
                this.option = { ...option, ...val }
            },
            deep: true,
            immediate: true
        }
    },
    methods: {
    // 上传之前校验格式
        handlePreview(file) {
            const rule = this.rule
            const type = file.raw.type.split('/')[1]
            const isLt2M = file.raw.size / 1024 / 1024
            if (rule.format.indexOf(type) === -1) {
                this.$message.error('上传文件只能是 ' + rule.format + ' 格式!')
                return
            }
            if (isLt2M > rule.size) {
                this.$message.error('上传头像图片大小不能超过 ' + rule.size + 'MB!')
                return
            }
            if (this.imgList.length >= this.max && this.editImage === -1) {
                this.$message.error('最多上传' + this.max + '个文件')
                return
            }
            const url = URL.createObjectURL(file.raw)
            if (this.edit) {
                this.option.img = url
                this.editImgDialog = true
            } else {
                this.saveImg(url)
            }
        },
        left() {
            this.$refs.cropper.rotateLeft()
        },
        right() {
            this.$refs.cropper.rotateRight()
        },
        // 实时预览函数
        realTime(data) {
            this.previews = data
        },
        // 下载图片
        down(type) {
            var aLink = document.createElement('a')
            aLink.download = 'author-img'
            if (type === 'blob') {
                this.$refs.cropper.getCropBlob((data) => {
                    this.downImg = window.URL.createObjectURL(data)
                    this.saveImg(this.downImg)
                    // aLink.href = window.URL.createObjectURL(data) //下载到本地
                    // aLink.click()
                })
            } else {
                this.$refs.cropper.getCropData((data) => {
                    this.downImg = data
                    this.saveImg(this.downImg)
                    // aLink.href = data;
                    // aLink.click()
                })
            }
        },
        // 剪辑图片返回数据
        saveImg(val) {
            if (this.editImage < 0) {
                // 增加
                if (this.input) {
                    this.imgList.push({
                        value: '',
                        url: val,
                        source: 2
                    })
                } else {
                    this.imgList.push(val)
                }
            } else {
                // 修改
                if (this.input) {
                    const data = this.imgList[this.editImage]
                    data.url = val
                    this.imgList.splice(this.editImage, 1)
                    this.imgList.splice(this.editImage, 0, data)
                } else {
                    this.imgList.splice(this.editImage, 1)
                    this.imgList.splice(this.editImage, 0, val)
                }
            }
            if (this.max === 1) {
                // 单张自动上传
                this.aotoUpload(this.imgList)
            } else {
                // 多张返回本地路径
                this.change(this.imgList)
            }
            this.editImgDialog = false
            this.editImage = -1
        },
        // 删除图片
        deletImg(index) {
            this.imgList.splice(index, 1)
        },
        // 编辑图片
        async crop(item, index) {
            this.editImage = index
            let url = ''
            if (this.input) {
                url = item.url
            } else {
                url = item
            }
            if (url.indexOf('http:') !== -1) {
                const blob = await getBase64(url)
                url = blob
            }
            this.option.img = url
            this.editImgDialog = true
        },
        edits(item, index) {
            this.editImage = index
        },
        // 设置为第一张
        setIndex(index) {
            const arr = this.imgList
            const img = arr[index]
            this.imgList.splice(index, 1)
            arr.unshift(img)
            this.imgList = arr
        },
        // 错误提示
        errorMsg() {
            this.$message.error(`最多上传${this.max}个文件`)
        },
        // 单张图片自动上传
        aotoUpload(val) {
            this.uploadImg(val, 'name').then(data => {
                this.change(data)
            })
        },
        // 数据改变抛出数据
        change(val) {
            this.$emit('change', val)
        },
        // 上传图片至服务器
        async each(imgArr) {
            function pushData(arr, list) {
                return new Promise((reslove) => {
                    // 将blob地址转换为文件对象
                    loadImageToBlob(list.item).then(data => {
                        arr.push({
                            index: list.index,
                            file: data,
                            source: list.source
                        })
                        reslove()
                    })
                })
            }
            const arr = []
            if (this.input) {
                for (const i in imgArr) {
                    const data = {
                        item: imgArr[i].url,
                        index: i,
                        value: imgArr[i].value,
                        source: imgArr[i].source
                    }
                    if (imgArr[i].url.indexOf('blob') !== -1) {
                        await pushData(arr, data)
                    }
                }
            } else {
                for (const i in imgArr) {
                    const data = {
                        item: imgArr[i],
                        index: i
                    }
                    if (imgArr[i].indexOf('blob') !== -1) {
                        await pushData(arr, data)
                    }
                }
            }
            return arr
        },
        // 递归upload  递归上传图片  组件外部 使用this.$refs 调用该方法 返回一个promise对象
        // name 文件夹名称
        async uploadImg(imgArr = []) {
            if (!(imgArr instanceof Array)) {
                this.$message.error('请传入图片数组')
                return
            }
            const _this = this
            const arr = await this.each(imgArr)
            const length = arr.length
            let index = 0
            const imgList = imgArr
            return new Promise((resolve, reject) => {
                if (length > 0) {
                    var upload = function() {
                        // blob转file
                        if (index < length) {
                            const file = _this.fileCon(arr[index].file)
                            _this.$uploadImg(_this.$api.upload,file).then(data => {
                                const key = data.path
                                if (_this.input) {
                                    const newArr = arr[index]
                                    delete newArr.file
                                    newArr.url = key
                                    imgList.splice(arr[index].index, 1, newArr)
                                } else {
                                    imgList.splice(arr[index].index, 1, key)
                                }
                                index += 1
                                upload()
                            })
                        } else {
                            resolve(imgList)
                        }
                    }
                    upload()
                } else {
                    resolve(imgList)
                }
            })
        },
        //给file添加名字
        fileCon(file){
          let type = file.type.split('/')[1]
          const folder = this.folder
          let name = folder+'_.'+type
          var new_file = new File([file],name,{type:file.type});
          return new_file
        }

    }
}
</script>

<style lang="less" scoped>
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
        font-size: 24px;
        color: #8c939d;
        width: 98px;
        height: 98px;
        text-align: center;
        border: 1px solid #e1e1e8;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
      p{
        font-size: 12px;
        line-height: 30px;
      }
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    .imgList{
        .imgBox{
            position: relative;
            width: 100px;
            height: 100px;
            margin-right: 5px;
            margin-bottom: 5px;
            overflow: hidden;
            border-radius: 4px;
            float: left;
            img{
                width: 100%;
                height: 100%;
            }
            .input{
              position: absolute;
              bottom: -30px;
              line-height: initial;
            }
            .hanld{
                position: absolute;
                bottom:0;
                display: none;
                background-color: rgba(0,0,0,.5);
                width: 100%;
                line-height: 30px;
                text-align: center;
                color: white;
              &>i{
                margin-right: 8px;
                &:hover{
                  cursor: pointer;
                }
              }
              &>div{
                display: inline-block;
                margin-right: 8px;
              }
              & :last-child{
                margin-right: 0;
              }
              .el-button{
                margin-left: 5px;
              }
            }
            &:hover{
                cursor:move;
                .hanld{
                    display: block;
                }
            }
        }

    }

    .copper {
        width: 600px;
        height: 600px;
    }

    .preview {
        width: 100px;
        height: 100px;
        border: 1px solid #ccc;
        background-color: #ccc;
        margin: 5px;
        overflow: hidden;
    }

    .imgBox {

        & > div {
            display: inline-block;
        }
    }

    .btnBox {
        text-align: center;
        margin: 15px;
        overflow: hidden;
        & > div {
            float: left;
            margin-right: 5px
        }
    }

</style>
