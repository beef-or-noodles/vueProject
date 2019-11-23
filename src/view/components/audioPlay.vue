<template>
    <div class="audio" :class="{active:hide}">
        <audio @ended="ended" @timeupdate="timeupdate" @canplay="canplay" src="" ref="audio"></audio>
        <div class="box">
            <div class="explanded" :class="hide?' el-icon-d-arrow-left':' el-icon-d-arrow-right'" @click="hide=!hide">
            </div>
            <div class="icon" :class="{stopAnimate:!playState}">
                <div class="cen"></div>
                <img :src="musicData.imgurl" alt="">
            </div>
            <div class="titleBox">
                <div class="title" :title="musicData.articeTitle">{{musicData.articeTitle}}-{{musicData.author}}</div>
                <div class="plalyCon">
                    <div class="menu el-icon-s-unfold" @click="listHide=!listHide"></div>
                    <div class="left el-icon-d-arrow-left" @click="arrowLeft"></div>
                    <div class="play" :class="playState?'el-icon-video-pause':'el-icon-video-play'"
                         @click="playAudio(musicData.content)"></div>
                    <div class="right el-icon-d-arrow-right" @click="arrowRight"></div>
                </div>
            </div>
            <div class="slidBar">
                <div class="starttime">{{formatTime(timeBar.value)}}</div>
                <div class="endtime">{{formatTime(timeBar.total)}}</div>
                <div class="bar" :style="{width:widthbar+'%'}"></div>
            </div>
        </div>
        <div class="mp3List" :class="{active:listHide}">
            <div class="selectmp3" v-for="(item,index) in musicList">
                <a @click="setMusicData(item,index)" :class="{active:item.id == musicData.id}">{{item.articeTitle}}-{{item.author}}</a>
                <div class="icon el-icon-close"></div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "audioPlay",
        data() {
            return {
                hide: true,//组件状态
                listHide: false,//列表状态
                audio: null,
                playState: false,//播放状态
                src: "",
                widthbar:0,//进度条
                timeBar:{
                  total:0,
                  value:0,
                },
                musicData:{},
                index:0,//当前第几首歌曲
            }
        },
        mounted() {
            this.audio = this.$refs.audio;
            /*this.init();*/
        },
        props: {
            musicList: {
                type: Array,
                default: function(){
                    return []
                }
            },
        },
        watch: {
            hide(val) {
                if (val) {
                    this.listHide = false
                }
            },
        },
        methods: {
            init(){
                this.musicData = this.musicList[this.index];
                this.audio.src = this.musicData.content;
            },
            loadMp3() {
                let url = ""
                ID3.loadTags(url, function () {
                    var tags = ID3.getAllTags(url);
                    alert(tags.artist + " - " + tags.title + ", " + tags.album);
                });
            },
            /*可以播放了*/
            canplay() {
                console.log("加载完成");
                this.timeBar.total = this.audio.duration
            },
            ended(){
              console.log("播放结束");
              let total = this.musicList.length;
              if(this.index+1 < total){
                  this.index = this.index+1
                  let item = this.musicList[this.index];
                  this.setMusicData(item,this.index);
              }else{
                  this.playState = false
              }
            },
            timeupdate(){
                let curentTime = this.audio.currentTime;//当前播放时间
                this.timeBar.value = curentTime;
                let num = 100 / this.timeBar.total; //百分比
                let value = curentTime * num
                this.widthbar = value;
            },
            setMusicData(item,index){
                /*切换选项前先设置状态为暂停*/
                this.playState = false;
                this.index = index;
                this.playAudio(item.content);
                this.musicData = item;
            },
            arrowLeft(){
                if(this.index>0){
                    this.index = this.index-1
                }else{
                    this.index = this.musicList.length-1
                }
                let item = this.musicList[this.index];
                this.setMusicData(item,this.index);
            },
            arrowRight(){
                if(this.index<this.musicList.length-1){
                    this.index = this.index+1
                }else{
                    this.index = 0
                }
                let item = this.musicList[this.index];
                this.setMusicData(item,this.index);
            },

            /*播放和暂停*/
            playAudio(url) {
                let audio = this.audio
                if (this.playState) {
                    audio.pause();
                    this.playState = false
                } else {
                    if (this.musicData.content != url) {/*url不同重新加载MP3然后播放*/
                        audio.src = url;
                        audio.load();
                    }
                    audio.play();
                    this.playState = true
                }
            },


            /*格式化时间*/
            formatTime(s=0) {
                let minute = Math.floor(s/60);
                let second =  Math.floor(s - minute*60);
                let t1 = "";
                let t2 = "";
                if(minute<10){
                    t1 =  "0"+minute
                }else{
                    t1 =  minute
                }
                if(second<10){
                    t2 =  "0"+second
                }else{
                    t2 =  second
                }
                return t1+':'+t2;
            }
        },
    }
</script>

<style lang="less" scoped>
    @import "../less/public";

    .audio {
        position: fixed;
        bottom: 20%;
        right: 0;
        width: 320px;
        height: 90px;
        background: white;
        z-index: 999;
        box-shadow: 0 2px 3px #bbbdbe;
        .mp3List {
            background: #474747;
            color: white;
            height: 0px;
            overflow: auto;
            display: block;
            &.active {
                height: 100px;
                padding: 5px 0;
            }
            .selectmp3 {
                padding: 5px 10px;
                padding-bottom: 5px;
                font-size: 12px;
                display: block;
                &>a.active{
                    color:@color;
                }
                .icon {
                    float: right;
                    &:hover{
                        color: @color;
                        cursor: pointer;
                    }
                }
            }
        }
        &.active {
            right: -290px;
        }
        .box {
            position: relative;
            height: 100%;
            .explanded {
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
                &:hover {
                    cursor: pointer;
                    padding-left: 5px;
                }
            }
            .icon {
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
                animation: rotateAnimate 10s infinite;
                -webkit-animation: rotateAnimate 10s linear infinite;
                &.stopAnimate {
                    animation-play-state: paused;
                    -webkit-animation-play-state: paused; /* Safari 和 Chrome */
                }
                .cen {
                    position: absolute;
                    content: "";
                    display: block;
                    width: 15px;
                    height: 15px;
                    background: white;
                    z-index: 99;
                    border-radius: 50%;
                    border: 4px solid rgba(0, 0, 0, .3);
                    opacity: .8;
                }
                img {
                    height: 100%;
                    width: 100%;
                }
            }
            .titleBox {
                position: absolute;
                left: 110px;
                width: 210px;
                overflow: hidden;
                height: calc(100% - 10px);
                padding-top: 10px;
                text-align: center;
                box-sizing: content-box;
                .title {
                    font-weight: 600;
                    font-size: 14px;
                    margin-bottom: 10px;
                    .overHidden(1);
                    height: 20px;
                }
                .plalyCon {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    & > div {
                        width: 40px;
                        font-size: 25px;
                        &:hover {
                            color: @color;
                            cursor: pointer;
                        }
                    }
                    .left, .right {
                        font-size: 20px;
                    }
                }
            }
            .slidBar {
                position: absolute;
                width: calc(100% - 30px);
                left: 30px;
                height: 5px;
                background: #ffd7ce;
                bottom: 0;
                .starttime{
                    font-size: 12px;
                    float: left;
                    margin-top: -15px;
                    margin-left: 5px;
                }
                .endtime{
                    font-size: 12px;
                    float: right;
                    margin-top: -15px;
                    margin-right: 5px;
                }
                .bar {
                    width: 0;
                    height: 5px;
                    background: @color;
                }
            }
        }
    }

    @keyframes rotateAnimate {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }

    }
</style>
