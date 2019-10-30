<template>
    <div>
        <wheader></wheader>
        <div class="centerBox">
            <div class="left">
                <wleft></wleft>
            </div>
            <div class="right">
                <router-view />
            </div>
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
    .centerBox{
        position: relative;
        top: 70px;
        height: calc(100vh - 70px);
        overflow: auto;
        &>div{
            position: absolute;
        }
        .left{
            width: 300px;
            left: 0;
        }
        .right{
            width: calc(100% - 320px);
            right: 0;
        }
    }
</style>