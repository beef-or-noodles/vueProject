<template>
    <div class="">
        <!--        <water-fall :img="imgsArr" :colNum="colNum" :intervalN="intervalN"></water-fall>-->
        <a-water-fall :imgDom="true" ref="waterfall">
            <template slot-scope="scope">
                <div class="centerbox">
                    <img class="img" :src="scope.row.imgurl" alt="">
                    <div class="msgBox">
                        <div class="zanBtn el-icon-star-off" title="留下小星星" style="color:red;"></div>
                        <div class="zan_num">5</div>
                        <div class="title">
                            {{scope.row.columnName}}
                        </div>
                    </div>
                    <div class="abs">
                        <span>{{scope.row.describe}}</span>
                    </div>
                </div>
            </template>
        </a-water-fall>

    </div>
</template>

<script>
    import waterFall from './componentView/waterFall.vue'
    import aWaterFall from "./componentView/aWaterFall"

    export default {
        name: 'app',
        data() {
            return {
                imgsArr: [],
                group: 1, // request param
                paging: {
                    pageNo: 1,
                    pageSize:10,
                    total: 0,
                },
                colNum: 3,
                intervalN: 10,

                paging: {
                    pageNo: 1,
                    pageSize: 10,
                    total: 0,
                    columnId: "",
                },
            }
        },
        components: {
            waterFall, aWaterFall
        },
        created() {
            //do something after creating vue instance

        },
          activated(){
            console.log("缓存");
          },
        mounted() {
            /*     this.$refs.waterfall.setData(this.imgsArr);*/
            this.queryPhoto();
        },
        methods: {
            queryPhoto() {
                this.$post(this.$api.queryPhoto, {isType: 1}).then((data) => {
                    this.imgsArr = data;
                    if (data.length > 0) {
                        this.paging.columnId = data[0].id;
                        this.queryList()
                    }
                });
            },
            // 根据栏目ID查询文章列表
            queryList() {
                let params = this.paging;
                params.type = 1;
                this.$post(this.$api.queryArtice, params).then((data) => {

                    this.$refs.waterfall.setData(data.data);
                    this.paging.total = data.total;
                });
            },

            pagingData() {
                if (this.paging.pageNo * this.paging.pageSize < this.paging.total) {
                    this.paging.pageNo++;
                    this.queryList()
                } else {
                    console.log("没有更多了");
                }
            }


        },


    }
</script>
<style lang="less" scoped>
    .centerbox {
        background: white;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .msgBox {
        background: white;
        overflow: hidden;
        padding: 5px 0
    }

    .msgBox > div {
        float: left;
    }

    .zanBtn {
        font-size: 20px;
        width: 30px;
        text-align: center;
        cursor: pointer;
    }

    .title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .abs {
        text-align: justify;
        padding: 0px 8px 8px 8px;

        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .water-item:hover .zanBtn {
        animation: animat 1s linear infinite;
    }

    @keyframes animat {
        0% {
            transform: scale(0.9);
        }
        50% {
            transform: scale(1.3);
        }
        100% {
            transform: scale(1);
        }
    }
</style>
