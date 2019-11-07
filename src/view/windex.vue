<template>
    <div>
        <wheader></wheader>
        <div class="centerBox">
            <div class="left">
                <wleft></wleft>
            </div>
            <div class="right">
                <transition name="fade">
                    <router-view> </router-view>
                </transition>
            </div>
        </div>
        <div class="bikes">
            <div class="bike bikeAni"></div>
        </div>
    </div>
</template>

<script>
    import wheader from "./components/wheader"
    import wleft from "./components/wleft"
    export default {
        name: "windex",
        components:{
            wheader,wleft
        },
    }
</script>

<style lang="less" scoped>
   @import "less/public.less";
   @import "less/bike.less";
    .centerBox{
        position: relative;
        top: 70px;
        height: calc(100vh - 70px);
        overflow: auto;
        &>div{
            position: absolute;
        }
        .left{
            width: 280px;
            left: 0;
        }
        .right{
            width: calc(100% - 300px);
            right: 0;
            height: 100%;
            overflow: auto;
        }

        .fade-enter {
            opacity:0;
        }
        .fade-leave{
            opacity:1;
        }
        .fade-enter-active{
            transition:opacity .5s;
        }
        .fade-leave-active{
            opacity:0;
        }
    }
</style>