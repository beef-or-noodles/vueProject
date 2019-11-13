<template>
    <div class="header">
        <div class="centerBox">
            <ul>
                <li @click="topClick(item)" :class="{active:item.id == activeid}" v-for="item in list" :key="item.id">{{item.name}}</li>
            </ul>
        </div>
        <div class="canvas">
            <div class="title">
                <div class="icon">
                    <img src="../../assets/images/bg.jpg" alt="">
                </div>
                <div class="txt">
                    任他红尘滚滚，我自清风明月
                </div>
            </div>

            <canvas class="box" width="100%" height="150" id="myCanvas"></canvas>
        </div>

    </div>
</template>

<script>
    export default {
        name: "wheader",
        data() {
            return {
                list: [{
                    active:true,
                    name:"首页",
                    src:"/index",
                    id:1,
                },{
                    active:false,
                    name:"相册",
                    src:"/photoList",
                    id:2,
                },{
                    active:false,
                    name:"关于我",
                    src:"/",
                    id:3,
                },{
                    active:false,
                    name:"用户注册",
                    src:"/login",
                    id:4,
                }],
                activeid:1,
            }
        },
        mounted(){
            this.init()
        },
        methods: {
            topClick(item) {
                if(item.src == "/login"){
                    window.open(item.src, '_blank');
                }else{
                    this.$router.push({path:item.src})
                    this.activeid = item.id
                }
            },
            init(){
                var dom = document.getElementById("myCanvas");
                let y = dom.height;
                let num = 1;
                let timer = null
                timer = setInterval(()=>{
                    num+=2.5;
                    if(num<y){
                        this.drow(dom,num);
                    }else{
                        clearInterval(timer);
                    }
                },10)
            },
            drow(dom,y) {
                var c = dom;
                var width = c.width;
                var height = c.height;
                var offset = height - y;
                var offset0 = height-(y/3)
                var offset1 = height-(y/1.5)
                var offset3 = height-(y/3)
                var ctx=c.getContext("2d");
                ctx.clearRect(0,0,c.width,c.height);
                ctx.beginPath();

                ctx.moveTo(0, offset);
                ctx.lineTo(width/2, offset3);
                ctx.lineTo(width, offset);
                ctx.lineTo(width, height);
                ctx.lineTo(width/2, offset3);
                ctx.lineTo(0, height);
                ctx.fillStyle="rgba(225,225,225,0.1)";
                ctx.fill();

                ctx.beginPath();
                ctx.moveTo(0, offset1);
                ctx.lineTo(width/2, offset3);
                ctx.lineTo(width,  offset1);
                ctx.lineTo(width, height);
                ctx.lineTo(width/2, offset3);
                ctx.lineTo(0, height);
                ctx.fillStyle="rgba(225,225,225,0.3)";
                ctx.fill();

                ctx.beginPath();
                ctx.moveTo(0, offset0);
                ctx.lineTo(width/2, offset3);
                ctx.lineTo(width, offset0);
                ctx.lineTo(width, height);
                ctx.lineTo(width/2, offset3);
                ctx.lineTo(0, height);
                ctx.fillStyle="rgba(225,225,225,0.5)";
                ctx.fill();

                ctx.beginPath();
                ctx.moveTo(width/2, offset0);
                ctx.lineTo(0, height);
                ctx.lineTo(width, height);
                ctx.moveTo(width/2, offset0);
                ctx.fillStyle="#efefef";
                ctx.fill();
            }
        },
    }
</script>

<style lang="less" scoped>
    @import "../less/public.less";
    @height:60px;
.header{
    position: relative;
    width: 100%;
    top: 0;
    left: 0;
    font-size: 0;
    .canvas{
        width: 100%;
        height: 150px;
        z-index: 99;
        position: relative;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .box{
            position: absolute;
            width: 100%;
            height: 150px;
        }
        .title{
            z-index: 99;
            .icon{
                width: 70px;
                height: 70px;
                overflow: hidden;
                border-radius: 50%;
                margin: 0 auto;
                margin-bottom: 20px;
                border: 5px solid rgba(255,255,255,.2);
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            .txt{
                color: #5f606f;
                font-weight: 600;
                font-size: 14px;
            }
        }

    }
    .centerBox{
        height: @height;
        font-size: 14px;
        ul{
            display: flex;
            align-items: center;
            float: right;
            height: @height;
            color: white;
            &>li{
              display: inline-block;
              margin-left:20px ;
              text-align: center;
              position: relative;
                &::after{
                    content: "";
                    position: absolute;
                    width: 100%;
                    height: 3px;
                    border-radius: 5px;
                    background: @color;
                    left: 0;
                    bottom: -30px;
                    transition: all .28s ease;
                }
                &:hover{
                    cursor: pointer;
                    color: @color;
                }
                &.active{
                    color: @color;
                    &::after{
                        bottom: -5px;
                    }
                }
            }
            .icon{
                width: 50px;
                height: 50px;
                border-radius: 50%;
                overflow: hidden;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
}
</style>