<template>
    <div class="home">
        <a-water-fall ref="waterfall">
            <template slot-scope="scope">
                <div class="box" @click="detail(scope.row)">
                    <div class="img"><img :src="scope.row.imgurl" alt=""></div>
                    <div class="title">{{scope.row.articeTitle}}</div>
                    <div class="desc">{{scope.row.abstract}}</div>
                    <div class="time">{{scope.row.strTime}}</div>
                    <div>{{scope.row.autor}}</div>
                </div>
            </template>
        </a-water-fall>
    </div>
</template>

<script>
    import aWaterFall from "./componentView/aWaterFall"
    export default {
        name: "index",
        components:{aWaterFall},
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
                    this.dataList=data.data;
                    this.$refs.waterfall.setData(data.data);
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

        .box{
            width: 100%;
            padding: 15px;
            box-sizing: border-box;
            text-align: justify;
            background: white;
            border-radius: 6px;
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

</style>
