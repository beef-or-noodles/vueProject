<template>
    <div>
        <wheader></wheader>
        <waudio></waudio>
        <canvas class="canvas" height="200px" id="myCanvas"></canvas>

        <div class="centerBox">

            <div class="left">
                <wleft></wleft>
            </div>
            <div class="right">
                <transition name="fade">
                    <router-view> </router-view>
                </transition>
            </div>
        </div>
        <div class="bikes">
            <div class="bike bikeAni"></div>
        </div>
    </div>
</template>

<script>
    import wheader from "./components/wheader"
    import wleft from "./components/wleft"
    import waudio from "./components/audioPlay"
    export default {
        name: "windex",
        components:{
            wheader,wleft,waudio
        },
        mounted(){
          this.init()
        },
        methods: {
            init(){
               var dom = document.getElementById("myCanvas");

               let y = dom.height;
               console.log(y);
               let num = 1;
               let timer = null
                timer = setInterval(()=>{
                   num+=2;
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
                var offset3 = height-(y/2)
                var ctx=c.getContext("2d");
                ctx.clearRect(0,0,c.width,c.height);
                ctx.beginPath();

                ctx.moveTo(0, offset);
                ctx.lineTo(width/2, offset3);
                ctx.lineTo(width, offset);
                ctx.lineTo(width, height);
                ctx.lineTo(width/2, height/2);
                ctx.lineTo(0, height);
                ctx.fillStyle="rgba(225,225,225,0.1)";
                ctx.fill();

                ctx.beginPath();
                ctx.moveTo(0, offset0);
                ctx.lineTo(width/2, offset3);
                ctx.lineTo(width, offset0);
                ctx.lineTo(width, height);
                ctx.lineTo(width/2, height/2);
                ctx.lineTo(0, height);
                ctx.fillStyle="rgba(225,225,225,0.3)";
                ctx.fill();

                ctx.beginPath();
                ctx.moveTo(0, offset1);
                ctx.lineTo(width/2, offset3);
                ctx.lineTo(width,  offset1);
                ctx.lineTo(width, height);
                ctx.lineTo(width/2, height/2);
                ctx.lineTo(0, height);
                ctx.fillStyle="rgba(225,225,225,0.5)";
                ctx.fill();

                ctx.beginPath();
                ctx.moveTo(width/2, height/2);
                ctx.lineTo(0, height);
                ctx.lineTo(width, height);
                ctx.moveTo(width/2, height/2);
                ctx.fillStyle="rgba(225,225,225,1)";
                ctx.fill();
            }
        },
    }
</script>

<style lang="less" scoped>
    .canvas{
        position: relative;
        width: 100%;
        height: 200px;
        box-sizing: border-box;
        z-index: 999;
        background: url("../assets/images/preview.jpg");
        background-size: cover;
    }

   @import "less/public.less";
   @import "less/bike.less";
    .centerBox{
        position: relative;
        top: 70px;
        height: calc(100vh - 70px);
        overflow: auto;
        &>div{
            position: absolute;
        }
        .left{
            width: 280px;
            left: 0;
        }
        .right{
            width: calc(100% - 300px);
            right: 0;
            height: 100%;
            overflow: auto;
        }

        .fade-enter {
            opacity:0;
        }
        .fade-leave{
            opacity:1;
        }
        .fade-enter-active{
            transition:opacity .5s;
        }
        .fade-leave-active{
            opacity:0;
        }
    }
</style>
