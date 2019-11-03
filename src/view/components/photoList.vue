<template>
    <div class="">     <el-button type="primary" style="" @click="addImg">加载更多</el-button>
        <water-fall :img="imgsArr" :colNum="colNum" :intervalN="intervalN"></water-fall>

    </div>
</template>

<script>
    import waterFall from './componentView/waterFall.vue'

    export default {
        name: 'app',
        data() {
            return {
                imgsArr: [],
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
            waterFall
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
            addImg() {
                this.imgsArr = [{
                    img: 'http://demo.htmleaf.com/1808/201808011428/images/item-2.jpg',
                    title: '标题呀',
                    goodNum: '30',
                    click: true,
                    abs: '这是简介呢！！！！！'
                }]
            }
        },


    }
</script>
<style scoped>
</style>
