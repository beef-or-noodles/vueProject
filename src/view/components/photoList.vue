<template>
    <div class="">
<!--        <water-fall :img="imgsArr" :colNum="colNum" :intervalN="intervalN"></water-fall>-->
        <a-water-fall ref="waterfall">
            <template slot-scope="scope">
                <div class="centerbox">
                    <img class="img" :src="scope.row.imgUrl" alt="">
                    <div class="msgBox">
                        <div class="zanBtn el-icon-star-off" title="更多小星星" style="color:red;"></div>
                        <div class="zan_num">{{scope.row.goodNum}}</div>
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
                imgsArr: [{
                  imgUrl:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575954354299&di=2cd60bf9936224baccf805b2ca19c2e7&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fe42041da63fba7cefa1eca54c2851f39206adbef656c-oUYcCZ_fw658",
                  goodNum:5,
                  columnName:"图片信息",
                  describe:'2017年儿童杂志边框插图合集|插画|儿童插画'
                },{
                  imgUrl:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3681806718,180800645&fm=26&gp=0.jpg",
                  goodNum:5,
                  columnName:"图片信息",
                  describe:'2017年儿童杂志边框插图合集|插画|儿童插画'
                },{
                  imgUrl:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575954456595&di=df2d3b06f982ad1c60a7c926fdc4cbbe&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201608%2F06%2F20160806210806_GTQHj.thumb.700_0.jpeg",
                  goodNum:5,
                  columnName:"图片信息",
                  describe:'2017年儿童杂志边框插图合集|插画|儿童插画'
                },{
                  imgUrl:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575954555475&di=38d8a9f56c6203a1df0d8969ed26e496&imgtype=jpg&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D349322184%2C3775147202%26fm%3D214%26gp%3D0.jpg",
                  goodNum:5,
                  columnName:"图片信息",
                  describe:'2017年儿童杂志边框插图合集|插画|儿童插画'
                }],
                group: 1, // request param
                paging: {
                    pageNo: 1,
                    pageSize: 10,
                    total: 0,
                },
                colNum: 3,
                intervalN: 10,
            }
        },
        components: {
            waterFall,aWaterFall
        },
        created() {
            //do something after creating vue instance
            this.queryPhoto();
        },
        mounted(){
            this.$refs.waterfall.setData(this.imgsArr);
        },
        methods: {
            queryPhoto() {
                this.$post(this.$api.queryPhoto).then((data) => {
                    this.imgsArr = data;
                });
            },
          pagingData() {
                this.imgsArr = [{
                  imgUrl:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575954354299&di=2cd60bf9936224baccf805b2ca19c2e7&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fe42041da63fba7cefa1eca54c2851f39206adbef656c-oUYcCZ_fw658",
                  goodNum:5,
                  columnName:"图片信息",
                  describe:'2017年儿童杂志边框插图合集|插画|儿童插画'
                },{
                  imgUrl:"https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3681806718,180800645&fm=26&gp=0.jpg",
                  goodNum:5,
                  columnName:"图片信息",
                  describe:'2017年儿童杂志边框插图合集|插画|儿童插画'
                },{
                  imgUrl:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575954456595&di=df2d3b06f982ad1c60a7c926fdc4cbbe&imgtype=0&src=http%3A%2F%2Fimg3.duitang.com%2Fuploads%2Fitem%2F201608%2F06%2F20160806210806_GTQHj.thumb.700_0.jpeg",
                  goodNum:5,
                  columnName:"图片信息",
                  describe:'2017年儿童杂志边框插图合集|插画|儿童插画'
                },{
                  imgUrl:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1575954555475&di=38d8a9f56c6203a1df0d8969ed26e496&imgtype=jpg&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D349322184%2C3775147202%26fm%3D214%26gp%3D0.jpg",
                  goodNum:5,
                  columnName:"图片信息",
                  describe:'2017年儿童杂志边框插图合集|插画|儿童插画'
                }]
              this.$refs.waterfall.setData(this.imgsArr);
            }
        },


    }
</script>
<style lang="less" scoped>
    .centerbox{
        background: white;
        img{
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
