<template>
    <div class="indexBg">
        <wheader @close="close"></wheader>
        <waudio></waudio>
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
        <div class="bikes">
            <div class="bike bikeAni"></div>
        </div>
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
                leftNav: false
            }
        },
        methods: {
            close(val) {
                this.leftNav = val;
            }
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
      /* min-height: calc(100vh - 360px);*/
       min-height:150vh;
       padding-bottom: 10px;
   }
    .centerBox{
        &>div{
           float: left;
        }
        .left{
            width: 280px;
            &.leftNav{
                right: -280px;
            }
        }
        .right{
            margin-left: 20px;
            width: calc(100% - 300px);
            height: 100%;
            overflow: auto;
        }
    }
    .footer{
        height: 150px;
    }
</style>
