<template>
    <div class="home">
        <div class="banner">
            滚动图片
        </div>
        <div class="list">
            <div class="box" @click="detail(item)" :key="index" :class="[index%4==3||index%4==0?'bg1':'bg2']" v-for="(item,index) in dataList">
                <div class="img"><img :src="item.imgurl" alt=""></div>
                <div class="title">{{item.articeTitle}}</div>
                <div class="desc">{{item.abstract}}</div>
                <div class="time">{{item.strTime}}</div>
                <div>{{item.autor}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "index",
        data() {
            return {
                dataList:[],
                paging: {
                    pageNo: 1,
                    pageSize: 10,
                    total: 0,
                },
            }
        },
        mounted(){
            this.queryArtice()
        },
        methods: {
            //查询文章列表
            queryArtice() {
                let params = this.paging;
                params.type = 1;
                this.$post(this.$api.queryArtice, params).then((data) => {
                    this.paging.total = data.total;
                    this.dataList.push(...data.data)
                });
            },
            detail(item){
                this.$router.push({
                    path:"/content/"+item.id,
                })
            },
            /*分页查询*/
            pagingData(){
                if(this.paging.pageNo*this.paging.pageSize < this.paging.total){
                    this.paging.pageNo++;
                    this.queryArtice()
                }else{
                    console.log("没有更多了");
                }
            }
        },
    }
</script>

<style lang="less" scoped>
.banner{
    width: 100%;
    height: 200px;
    border-radius: 8px;
    background: #3a8ee6;
}
    .list {
        display: flex;
        flex-wrap: wrap;
        .box{
            width: 50%;
            padding: 15px;
            box-sizing: border-box;
            text-align: justify;
            &:hover{
                cursor: pointer;
                .title{
                    color:#e64f2a;
                }
            }
            &.bg1{
                background: rgba(230,79,42,.1);
            }
            &.bg2{
                /*background: #409EFF;*/
            }
            .img{
                width: 80px;
                height: 80px;
                overflow: hidden;
                border-radius: 10px;
                margin: 0 auto;
                img{
                    width: 100%;
                }
            }
            .title{
                text-align: center;
                margin: 10px 0;
                font-size: 14px;
            }
            .desc{
                text-align: center;
                color: #868686;
                font-size: 12px;
            }
            .time{
                font-size: 12px;
                text-align: center;
            }
        }
    }
</style>