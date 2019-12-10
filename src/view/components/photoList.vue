<template>
    <div class="">
        <!--<el-button type="primary" style="" @click="pagingData">加载更多</el-button>-->
<!--        <water-fall :img="imgsArr" :colNum="colNum" :intervalN="intervalN"></water-fall>-->
        <a_water_fall></a_water_fall>
    </div>
</template>

<script>
    import waterFall from './componentView/waterFall.vue'
    import a_water_fall from './componentView/a_water_fall.vue'
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
            waterFall,a_water_fall
        },
        created() {
            //do something after creating vue instance
            this.queryPhoto();
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
            }
        },


    }
</script>
<style scoped>
</style>
