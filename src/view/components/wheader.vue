<template>
    <div class="header">
        <div class="nav" :style="'background:rgba(85,85,85,'+option+')'">
            <div class="centerBox">
                <ul>
                    <li @click="topClick(item)" :class="{active:item.id == activeid}" v-for="item in list" :key="item.id">
                        {{item.name}}
                    </li>
                    <li class="slidebar" :class="{open:openSlider}" @click="leftNav">
                        <div class="s1"></div>
                        <div class="s2"></div>
                        <div class="s3"></div>
                    </li>
                </ul>
            </div>
        </div>

        <div class="canvas">
            <div class="title">
                <div class="icon">
                    <img src="../../assets/images/bg.jpg" alt="">
                </div>
                <div class="txt">
                    <!--任他红尘滚滚，我自清风明月-->
                </div>
            </div>

            <canvas class="box" width="100%" height="200px" id="myCanvas"></canvas>
        </div>

    </div>
</template>

<script>
    export default {
        name: "wheader",
        data() {
            return {
                list: [{
                    active: true,
                    name: "首页",
                    src: "/index",
                    id: 1,
                }, {
                    active: false,
                    name: "相册",
                    src: "/photoList",
                    id: 2,
                }, {
                    active: false,
                    name: "关于我",
                    src: "/",
                    id: 3,
                }, {
                    active: false,
                    name: "登录小站",
                    src: "/login",
                    id: 4,
                }],
                activeid: 1,
                openSlider: false,
                option:0,
            }
        },
        mounted() {
            this.init();
            let _this = this;
            var dom = document.getElementById("myCanvas");
            let n = 200
            window.onscroll = function () {
                var t = document.documentElement.scrollTop || document.body.scrollTop; //变量t就是滚动条滚动时，到顶部的距离
                if(t/200<=1){
                    _this.option = t/200;
                }else{
                    _this.option = 1
                }
                let num = n - t
                if(num>0){
                    _this.drow(dom, num);
                }
            }
        },
        methods: {
            leftNav() {
                this.openSlider = !this.openSlider
                this.$emit("close", this.openSlider);
            },
            topClick(item) {
                if (item.src == "/login") {
                    window.open(item.src, '_blank');
                } else {
                    this.$router.push({path: item.src})
                    this.activeid = item.id
                }
            },
            init() {
                var dom = document.getElementById("myCanvas");
                let y = dom.height;
                let num = 1;
                let timer = null
                timer = setInterval(() => {
                    num += 3;
                    if (num < y) {
                        this.drow(dom, num);
                    } else {
                        clearInterval(timer);
                    }
                }, 10)
            },
            drow(dom, y) {
                var c = dom;
                var width = c.width;
                var height = c.height;
                var offset = height - y;
                var offset0 = height - (y / 3)
                var offset1 = height - (y / 1.5)
                var offset3 = height - (y / 3)
                var ctx = c.getContext("2d");
                ctx.clearRect(0, 0, c.width, c.height);
                ctx.beginPath();

                ctx.moveTo(0, offset);
                ctx.lineTo(width / 2, offset3);
                ctx.lineTo(width, offset);
                ctx.lineTo(width, height);
                ctx.lineTo(width / 2, offset3);
                ctx.lineTo(0, height);
                ctx.fillStyle = "rgba(225,225,225,0.1)";
                ctx.fill();

                ctx.beginPath();
                ctx.moveTo(0, offset1);
                ctx.lineTo(width / 2, offset3);
                ctx.lineTo(width, offset1);
                ctx.lineTo(width, height);
                ctx.lineTo(width / 2, offset3);
                ctx.lineTo(0, height);
                ctx.fillStyle = "rgba(225,225,225,0.3)";
                ctx.fill();

                ctx.beginPath();
                ctx.moveTo(0, offset0);
                ctx.lineTo(width / 2, offset3);
                ctx.lineTo(width, offset0);
                ctx.lineTo(width, height);
                ctx.lineTo(width / 2, offset3);
                ctx.lineTo(0, height);
                ctx.fillStyle = "rgba(225,225,225,0.5)";
                ctx.fill();

                ctx.beginPath();
                ctx.moveTo(width / 2, offset0);
                ctx.lineTo(0, height);
                ctx.lineTo(width, height);
                ctx.moveTo(width / 2, offset0);
                ctx.fillStyle = "#efefef";
                ctx.fill();
            }
        },
    }
</script>

<style lang="less" scoped>
    @import "../less/public.less";

    @height: 60px;
    .header {
        position: relative;
        width: 100%;
        top: 0;
        left: 0;
        font-size: 0;
        padding-top: 60px;

        .canvas {
            width: 100%;
            height: 200px;
            z-index: 99;
            position: relative;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            .box {
                position: absolute;
                left: 0;
                width: 100%;
                height: 200px;
            }

            .title {
                z-index: 99;

                .icon {
                    width: 70px;
                    height: 70px;
                    overflow: hidden;
                    border-radius: 50%;
                    margin: 0 auto;
                    margin-bottom: 20px;
                    border: 5px solid rgba(255, 255, 255, .2);

                    img {
                        width: 100%;
                        height: 100%;
                    }
                }

                .txt {
                    position: absolute;
                    color: #5f606f;
                    font-weight: 600;
                    font-size: 14px;
                    width: 100%;
                    bottom: 10px;
                    left: 0;
                    text-align: center;
                }
            }

        }
        .nav{
            font-size: 14px;
            position: fixed;
            z-index: 999;
            top: 0;
            width: 100%;
            height: @height;
            font-size: 14px;
        }
        .centerBox {
            ul {
                display: flex;
                align-items: center;
                float: right;
                height: @height;
                color: white;
                & > li {
                    display: inline-block;
                    margin-left: 20px;
                    text-align: center;
                    position: relative;

                    &::after {
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

                    &:hover {
                        cursor: pointer;
                        color: @color;
                    }

                    &.active {
                        color: @color;

                        &::after {
                            bottom: -5px;
                        }
                    }
                }

                .slidebar {
                    width: 36px;
                    height: 36px;
                    z-index: 100;
                    position: relative;
                    display: none;

                    & > div {
                        position: absolute;
                        width: 100%;
                        height: 2px;
                        border-radius: 50px;
                        background: #FFFFFF;
                        left: 0;
                    }

                    .s1 {
                        top: 7px;
                    }

                    .s2 {
                        top: calc(50% - 1px);
                    }

                    .s3 {
                        bottom: 7px;
                    }

                    &.open {
                        .s2 {
                            width: 0;
                            left: 50%;
                        }

                        .s1 {
                            transform-origin: 0 0;
                            transform: rotate(45deg);
                            top: 5px;
                            left: 5px;
                        }

                        .s3 {
                            transform-origin: 0 0;
                            transform: rotate(-45deg);
                            bottom: 5px;
                            left: 5px;
                        }
                    }
                }

            }
        }
    }
</style>
