<template>
    <div>
        <div class="box">
            <div class="imgBox">
                <div class="copper">
                    <vueCropper
                            ref="cropper"
                            :img="option.img"
                            :outputType="option.outputType"
                            :fixedBox="option.fixedBox"
                            :centerBox="option.centerBox"
                            :autoCrop="option.autoCrop"
                            :autoCropWidth="option.autoCropWidth"
                            :autoCropHeight="option.autoCropHeight"
                            :mode="option.mode"
                            @realTime="realTime"
                            :enlarge="2"
                    ></vueCropper>
                </div>
                <div class="preview-box">
                    <div :style="previews.div" class="preview">
                        <img :src="previews.url" :style="previews.img">
                    </div>
                </div>
            </div>
            <div class="btnBox">
                <div>
                    <el-upload
                            size="mini"
                            ref="upload"
                            :on-change="handlePreview"
                            action=""
                            :show-file-list="false"
                            :auto-upload="false">
                        <el-button slot="trigger" size="small" type="primary">选择图片</el-button>
                    </el-upload>
                </div>
                <div>
                    <el-button type="primary" icon="el-icon-refresh-left" @click="left" size="small"></el-button>
                </div>
                <div>
                    <el-button type="primary" icon="el-icon-refresh-right" @click="right" size="small"></el-button>
                </div>
                <div>
                    <el-button type="primary" @click="down('blob')" size="small">保存</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {VueCropper} from "vue-cropper";

    export default {
        name: "uploadImgEdit",
        components: {
            VueCropper
        },
        data() {
            return {
                previews: {},
                option: {
                    img: "",
                    outputType: "png",
                    fixedBox: false,
                    centerBox: true,
                    autoCrop: true,
                    autoCropWidth: 150,
                    autoCropHeight: 150,
                    mode: "cover"
                },
                downImg: '#',
            }
        },
        methods: {
            handlePreview(file) {
                this.option.img = URL.createObjectURL(file.raw);
                console.log(file);
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
                        this.$emit("saveImg",this.downImg);
                        // aLink.href = window.URL.createObjectURL(data) //下载到本地
                        // aLink.click()
                    })
                } else {
                    this.$refs.cropper.getCropData((data) => {
                        this.downImg = data;
                        this.$emit("saveImg",this.downImg);
                        // aLink.href = data;
                        // aLink.click()
                    })
                }
            },
        },
    }
</script>

<style lang="less" scoped>
    .box{
        overflow: hidden;
    }
    .copper {
        width: 240px;
        height: 240px;
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
        & > div {
            float: left;
            margin-right: 5px
        }
    }


</style>