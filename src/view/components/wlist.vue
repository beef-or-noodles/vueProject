<template>
    <div class="listBox">
        <div class="list" @click="checkArtice(item)" v-for="item in tableData">
            <div class="pic" v-if="true">
                <img :src="item.imgurl" alt="">
            </div>
            <div class="right" :class="{noImg:false}">
                <div class="title">{{item.articeTitle}}</div>
                <div class="des">{{item.abstract}}</div>
                <div class="other">
                    <div class="time"><i class="el-icon-time"></i>发布时间：{{item.strTime}}</div>
                    <div class="check"><i class="el-icon-view"></i>查看{{item.clickNumber}}次</div>
                    <div class="time"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "wlist",
        data() {
            return {
                paging: {
                    pageNo: 1,
                    pageSize: 10,
                    total: 0,
                },
                tableData: [],
                columnId:this.$route.params.id
            }
        },
        mounted(){
            this.queryArtice();
        },
        watch:{
            '$route'(to,form){
                this.columnId = to.params.id;
                this.queryArtice();
            }
        },
        methods: {
            // 根据栏目ID查询文章列表
            queryArtice() {
                let params = this.paging;
                params.columnId = this.columnId;
                params.type = 1;
                this.$post(this.$api.queryArtice, params).then((data) => {
                    this.tableData = data.data;
                    this.paging.total = data.total;
                    this.tableData = data.data;
                });
            },
            checkArtice(item){
                this.$router.push({
                    path:"/content/"+item.id,
                })
            }
        },
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
                    opacity: 0;
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
                    opacity: 0;
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
                    }
                    /*img{
                        transform: scale(1.1);
                    }*/
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