<template>
    <div class="listBox">
        <div class="list" v-for="item in 20">
            <div class="title">新闻</div>
            <div class="des">摘要</div>
            <div class="other">
                <div class="time"><i class="el-icon-time"></i>发布时间：2019-03-05</div>
                <div class="check"><i class="el-icon-view"></i>查看66次</div>
                <div class="time"></div>
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
            &:hover{
                cursor: pointer;
                border-color: @color;
                .title{
                    color: @color;
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