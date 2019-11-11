<template>
    <div class="audio" :class="{active:hide}">
        <audio @oncanplay="oncanplay" src="" ref="audio"></audio>
        <div class="box">
            <div class="explanded" :class="hide?' el-icon-d-arrow-left':' el-icon-d-arrow-right'" @click="hide=!hide">
            </div>
            <div class="icon">
                <div class="cen"></div>
                <img src="../../assets/images/preview.jpg" alt="">
            </div>
            <div class="titleBox">
                <div class="title">我是标题标题标题标题</div>
                <div class="plalyCon">
                    <div class="menu el-icon-s-unfold" @click="listHide=!listHide"></div>
                    <div class="left el-icon-d-arrow-left"></div>
                    <div class="play" :class="playState?'el-icon-video-pause':'el-icon-video-play'" @click="playAudio"></div>
                    <div class="right el-icon-d-arrow-right"></div>
                </div>
            </div>
            <div class="slidBar">
                <div class="bar" :style="{width:'0%'}"></div>
            </div>
        </div>
        <div class="mp3List" :class="{active:listHide}">
            <a class="selectmp3" v-for="item in 5">
                <span>我们在这个世界相遇</span>
                <div class="icon el-icon-close"></div>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "audioPlay",
        data() {
            return {
                hide: false,
                listHide:false,
                audio:null,
                playState:false,
                src:"",
            }
        },
        mounted(){
            this.audio = this.$refs.audio
        },
        watch: {
            hide(val) {
                if(val){
                  this.listHide=false
                }
            },
        },
        methods: {
           loadMp3(){
               let url = ""
               ID3.loadTags(url, function() {
                   var tags = ID3.getAllTags(url);
                   alert(tags.artist + " - " + tags.title + ", " + tags.album);
               });
           },
            /*可以播放了*/
            oncanplay(){
                console.log("加载完成");
            },
            playAudio(url){
               let audio = this.audio
                let val = "https://webfs.yun.kugou.com/201911111749/edff5d77053dd5be6e677d9fde2f87da/G171/M0B/18/10/i5QEAF2c0cKAJ63iADBEFy9sicA739.mp3"
                if(this.playState){
                    audio.pause();
                    this.playState = false
                }else{
                    if(this.src != val){
                        console.log("123");
                        audio.src = val;
                        this.src = val
                    }
                    audio.play();
                    this.playState = true
                }
            }
        },
    }
</script>

<style lang="less" scoped>
    @import "../less/public";
    .audio{
        position: fixed;
        bottom: 20%;
        right: 0;
        width: 300px;
        height: 85px;
        background: white;
        z-index: 999;
        box-shadow: 0 2px 3px #bbbdbe;
        .mp3List{
            background: #474747;
            color: white;
            height: 0px;
            overflow: auto;
            display: block;
            &.active{
                height: 100px;
                padding: 5px 0;
            }
            .selectmp3{
                padding: 5px 10px;
                padding-bottom: 5px;
                font-size: 12px;
                display: block;

                .icon{
                    float: right;
                }
            }
        }
        &.active{
          right: -270px;
        }
        .box{
            position: relative;
            height: 100%;
            .explanded{
                position: absolute;
                left: 0;
                width: 30px;
                height: 100%;
                background: #e64f2a;
                color: white;
                font-size: 20px;
                text-align: center;
                display: flex;
                justify-content: center;
                align-items: center;
                box-sizing: border-box;
                transition: all .36s ease;
                &:hover{
                    cursor: pointer;
                    padding-left: 5px;
                }
            }
            .icon{
                width: 70px;
                height: 70px;
                overflow: hidden;
                position: absolute;
                left: 40px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                top: 5px;
                animation: rotateAnimate 3s infinite;
                -webkit-animation: rotateAnimate 10s linear infinite;
                .cen{
                    position: absolute;
                    content: "";
                    display: block;
                    width: 15px;
                    height: 15px;
                    background: white;
                    z-index: 99;
                    border-radius: 50%;
                    border: 4px solid rgba(0,0,0,.3);
                    opacity: .8;
                }
                img{
                    height: 100%;
                }
            }
            .titleBox{
                position: absolute;
                left: 120px;
                width: 180px;
                overflow: hidden;
                height: 100%;
                top: 10px;
                text-align: center;
                .title{
                    font-weight: 600;
                    font-size: 14px;
                    margin-bottom: 10px;
                }
                .plalyCon{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    &>div{
                        width: 40px;
                        font-size: 25px;
                        &:hover{
                            color: @color;
                        }
                    }
                    .left,.right{
                        font-size: 20px;
                    }
                }
            }
            .slidBar{
                position: absolute;
                width: calc(100% - 30px);
                left: 30px;
                height: 5px;
                background: #ffd7ce;
                bottom: 0;
                .bar{
                    width: 0;
                    height: 5px;
                    background: @color;
                }
            }
        }
    }

    @keyframes rotateAnimate {
        0%{
            transform: rotate(0deg);
        }
        100%{
            transform: rotate(360deg);
        }

    }
</style>