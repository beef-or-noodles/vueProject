<template>
    <div class="userInfo">
        <div class="head_img">
            <img src="../../../static/images/l_bg.jpg" alt="">
            <div class="imgEdit hover" @click="uploadImg" v-if="type">
                <i class="iconfont icon-tupian"></i>
                <p>上传头像</p>
            </div>
        </div>
        <div class="infoMessage">
            <canvas class="canvas" width="100%" height="80px" ref="canShade"></canvas>
            <div class="message">
                <div class="name">
                    <i class="iconfont icon-yonghu"></i>
                    <div v-if="!type">用户名</div>
                    <div v-else>
                        <input class="input" placeholder="输入用户名" type="text">
                    </div>
                </div>
                <div class="email">
                    <i class="iconfont icon-youxiang"></i>
                    <div v-if="!type">15945451@qq.com</div>
                    <div v-else>
                        <input placeholder="1502337640@qq.com" class="input" type="text">
                    </div>
                </div>
                <div class="btn" v-if="type">
                    保存修改
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "userInfo",
    data() {
      return {
        type:true,//false查看 true编辑
      }
    },
    mounted(){
      this.draw()
    },
    methods:{
      uploadImg(){
        console.log("上传图片");
      },
      draw(){
        let dom = this.$refs.canShade
        let width = dom.width;
        let height = dom.height
        console.log(width,height);
        var ctx = dom.getContext("2d");
        ctx.beginPath();
        ctx.moveTo(0, height);
        ctx.lineTo(width, 0);
        ctx.lineTo(width, height);
        ctx.fillStyle = "white";
        ctx.fill();
      }
    }
  }
</script>

<style lang="less" scoped>
    @import "../less/public.less";
    .userInfo{
        background-color: white;
        .infoMessage{
            position: relative;
            .canvas{
                position: absolute;
                top: -90px;
                width: 100%;
                height: 90px;
                z-index: 99;
            }
            .message{
                position: relative;
                top: -70px;
                z-index: 99;
                padding: 10px;
                width: 100%;
                box-sizing: content-box;
                box-sizing: border-box;
                min-height: 180px;
                color: #000;
                font-size: 18px;
                text-align: right;
                &>div{
                    margin-top: 10px;
                    display: flex;
                    align-items: flex-end;
                    justify-content: flex-end;

                    input{
                        border: none;
                        width: 180px;
                        font-size: 18px;
                        color: #000;
                    }
                }
                .name{
                    input{
                        width: 120px;
                    }
                }
                .iconfont{
                    margin-right: 10px;
                }
                .btn{
                    display: block;
                    position: absolute;
                    width: 100px;
                    line-height: 40px;
                    text-align: center;
                    font-size: 16px;
                    background-color: @color;
                    color: white;
                    font-weight: 500;
                    right: 0;
                    bottom: -70px;
                }
            }


        }
    }
    .head_img{
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        max-height: 300px;
        overflow: hidden;
        .imgEdit{
            position: absolute;
            color: white;
            text-align: center;
            background: rgba(0,0,0,0.5);
            width: 100px;
            padding: 10px;
            .iconfont{
                font-size: 40px;
            }

        }
        img{
            display: block;
            width: 100%;
        }
    }
</style>
