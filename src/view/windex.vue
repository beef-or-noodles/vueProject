<template>
    <div class="indexBg">
        <wheader :scroll="scroll" @close="close"></wheader>
        <waudio :musicList="musicList"></waudio>
        <div class="content">
            <div class="centerBox">
                <div class="left" :class="{leftNav:!leftNav}">
                    <wleft></wleft>
                </div>
                <div class="right">
                    <router-view> </router-view>
                </div>
            </div>
        </div>
        <div class="footer">

        </div>
       <!-- <div class="bikes">
            <div class="bike bikeAni"></div>
        </div>-->
    </div>
</template>

<script>
    import wheader from "./components/wheader"
    import wleft from "./components/wleft"
    import waudio from "./components/audioPlay"
    export default {
        name: "windex",
        components:{
            wheader,wleft,waudio
        },
        data() {
            return {
                leftNav: false,
                musicList:[],
                paging: {
                    pageNo: 1,
                    pageSize: 20,
                    total: 0,
                },
                scroll:0,
            }
        },
        created(){
            // 插入 meta 标签
            var oMeta = document.createElement('meta');
            oMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0,minimum-scale=1.0, user-scalable=0';
            oMeta.name = 'viewport';
            document.getElementsByTagName('head')[0].appendChild(oMeta);
        },
        mounted(){
          this.getTreeList();
            let _this = this;
            window.onscroll = function () {
                var t = document.documentElement.scrollTop || document.body.scrollTop; //变量t就是滚动条滚动时，到顶部的距离
                _this.scroll = t
            }
        },
        methods: {
            close(val) {
                this.leftNav = val;
            },
            //得到栏目列表queryRecommend
            getTreeList() {
                this.$post(this.$api.queryPhoto, {
                    isType: 2,
                }).then((data) => {
                    console.log(data);
                    if(data.length>0){
                        this.queryArtice(data[0].id)
                    }

                });
            },
            // 根据栏目ID查询文章列表
            queryArtice(id) {
                let params = this.paging;
                params.columnId = id;
                params.type = 1;
                this.$post(this.$api.queryArtice, params).then((data) => {
                    this.paging.total = data.total;
                    this.musicList = data.data;
                });
            },
        },
    }
</script>

<style lang="less" scoped>
   @import "less/public.less";
   @import "less/bike.less";
   .indexBg{
       position: relative;
       background: url("../assets/images/bg.jpg") no-repeat;
       background-size: cover;
       background-attachment: fixed;
       background-position:center center;
   }
   .content{
       background: #efefef;
       width: 100%;
   }
    .centerBox{
        overflow: hidden;
        .left{
            float: left;
            width: 280px;
            &.leftNav{
                right: -280px;
            }
        }
        .right{
            float: right;
            width: calc(100% - 300px);
        }
    }
    .footer{
        height: 150px;
    }
</style>
