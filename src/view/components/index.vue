<template>
    <div class="home">
        <a-water-fall ref="waterfall">
            <template slot-scope="scope">
                <div class="box" @click="detail(scope.row)">
                    <div class="img"><img :src="imgStr(scope.row.imgurl)" alt=""></div>
                    <div class="title">{{scope.row.articeTitle}}</div>
                    <div class="desc">{{scope.row.abstract}}</div>
                    <div class="time">{{scope.row.strTime}} <span class=" zanBtn el-icon-star-off" title="更多小星星" style="color:red;"></span></div>
                    <div class="">{{scope.row.autor}}</div>
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
      activated(){
        console.log("缓存");
      },
        mounted(){
            this.queryArtice()
        },
        methods: {
            imgStr(url){
                return url?url.split(',')[0]:''
            },
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
            .zanBtn {
                font-size: 20px;
                width: 30px;
                cursor: pointer;
                float: right;
            }
            &:hover{
                cursor: pointer;
            }
            &.bg1{
                background: rgba(230,79,42,.1);
            }
            &.bg2{
                /*background: #409EFF;*/
            }

            .img{
                height: 120px;
                overflow: hidden;
                margin: -13px;
                margin-bottom: 0;
                img{
                    width: 100%;
                }
            }
            .title{
                margin: 10px 0;
                font-size: 14px;
            }
            .desc{
                color: #868686;
                font-size: 12px;
            }
            .time{
                font-size: 12px;
                margin-top: 10px;
            }
        }

</style>
