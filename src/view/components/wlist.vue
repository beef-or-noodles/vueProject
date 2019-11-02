<template>
    <div class="listBox">
        <div class="list" v-for="item in 20">
            <div class="pic" v-if="true">
                <img src="../../assets/images/preview.jpg" alt="">
            </div>
            <div class="right" :class="{noImg:false}">
                <div class="title">新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻新闻</div>
                <div class="des">摘要摘要摘要摘要摘要摘要摘要摘要摘要</div>
                <div class="other">
                    <div class="time"><i class="el-icon-time"></i>发布时间：2019-03-05</div>
                    <div class="check"><i class="el-icon-view"></i>查看66次</div>
                    <div class="time"></div>
                </div>
            </div>
           
        </div>
    </div>
</template>

<script>
    export default {
        name: "wlist"
    }
</script>

<style lang="less" scoped>
 @import "../less/public";
    .listBox{
        .list{
            background: white;
            width: 100%;
            padding: 15px;
            margin-bottom: 15px;
            border-bottom: 2px solid @color4;
            transition: all .36s ease;
            box-sizing: border-box;
            position: relative;
            overflow: hidden;
            min-height:137px;
            .pic{
                width: 150px;
                height: 105px;
                overflow: hidden;
                display: flex;
                justify-content: center;
                align-items: center;
                position: relative;
                &::after{
                    content: "";
                    position: absolute;
                    width: 15px;
                    height: 15px;
                    transition: all .5s ease;
                    right: 0;
                    top: 0;
                    border-top: 2px solid @color;
                    border-right: 2px solid @color;
                    z-index: 88;
                }
                &::before{
                    content: "";
                    position: absolute;
                    width: 15px;
                    height: 15px;
                    transition: all .5s ease;
                    left: 0;
                    bottom: 0;
                    border-left: 2px solid @color;
                    border-bottom: 2px solid @color;
                    z-index: 88;
                }
                img{
                    height: 100%;
                    transition: all .5s ease;
                }
            }
            .right{
                position: absolute;
                width: calc(100% - 180px);
                right: 0;
                top: 15px;
                &.noImg{
                    width:calc(100% - 30px);
                    left: 15px;
                }
            }
            &:hover{
                cursor: pointer;
                border-color: @color;
                .title{
                    color: @color;
                }
                .pic{
                    &::after,&::before{
                        width: 100%;
                        height: 100%;
                    }
                    img{
                        transform: scale(1.1);
                    }
                }
            }
            .title{
                font-size: 16px;
                font-weight: 600;
                .overHidden
            }
            .des{
                font-size: 14px;
                color: #797b7c;
                margin-top: 10px;
                min-height: 42px;
                .overHidden(2)
            }
            .other{
                font-size: 12px;
                color:#797b7c;
                margin-top: 10px;
                width: 100%;
                &>div{
                    display: inline-block;
                    margin-right: 15px;
                }
                .check,.time{
                    i{
                        margin-right: 5px;
                    }
                }
            }
        }
    }
</style>