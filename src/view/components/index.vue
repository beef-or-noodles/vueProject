<template>
    <div class="home">
        <div class="banner">
            滚动图片
        </div>
        <div class="list">
            <div class="box" :key="index" :class="[index%4==3||index%4==0?'bg1':'bg2']" v-for="(item,index) in dataList">
                <div>{{item.articeTitle}}</div>
                <div>{{item.abstract}}</div>
                <div>{{item.strTime}}</div>
                <div>{{item.autor}}</div>
                <div class="img"><img :src="item.imgurl" alt=""></div>
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
                    pageSize: 20,
                    total: 0,
                },
            }
        },
        mounted(){
            this.queryArtice()
        },
        methods: {
            // 根据栏目ID查询文章列表
            queryArtice() {
                let params = this.paging;
                params.type = 1;
                this.$post(this.$api.queryArtice, params).then((data) => {
                    this.paging.total = data.total;
                    this.dataList = data.data
                    console.log(data);
                });
            },
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
            &.bg1{
                background: rgba(230,79,42,.2);
            }
            &.bg2{
                /*background: #409EFF;*/
            }
            .img{
                width: 80px;
                height: 80px;
                overflow: hidden;
                img{
                    width: 100%;
                }
            }
        }
    }
</style>