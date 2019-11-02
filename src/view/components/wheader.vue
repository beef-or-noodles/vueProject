<template>
    <div class="header">
        <div class="centerBox">
            <ul>
                <li @click="topClick(item)" :class="{active:item.id == activeid}" v-for="item in list" :key="item.id">{{item.name}}</li>
                <li>
                    <div class="icon">
                        <img src="../../assets/images/404bg.jpg" alt="">
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "wheader",
        data() {
            return {
                list: [{
                    active:true,
                    name:"首页",
                    src:"/index",
                    id:1,
                },{
                    active:false,
                    name:"相册",
                    src:"/content",
                    id:2,
                },{
                    active:false,
                    name:"关于我",
                    src:"/list",
                    id:3,
                },{
                    active:false,
                    name:"管理",
                    src:"/login",
                    id:4,
                }],
                activeid:1,
            }
        },
        methods: {
            topClick(item) {
                if(item.src == "/login"){
                    window.open(item.src, '_blank');
                }else{
                    this.$router.push({path:item.src})
                    this.activeid = item.id
                }


            }
        },
    }
</script>

<style lang="less" scoped>
    @import "../less/public.less";
    @height:60px;
.header{
    position: fixed;
    width: 100%;
    height: @height;
    box-shadow: 1px 2px 5px #797b7c;
    top: 0;
    left: 0;
    background: #fafafa;
    .centerBox{
        ul{
            display: flex;
            align-items: center;
            float: right;
            height: @height;
            &>li{
              display: inline-block;
              margin-left:20px ;
              text-align: center;
              position: relative;
                &::after{
                    content: "";
                    position: absolute;
                    width: 100%;
                    height: 3px;
                    border-radius: 5px;
                    background: @color;
                    left: 0;
                    bottom: -30px;
                    transition: all .28s ease;
                }
                &:hover{
                    cursor: pointer;
                }
                &.active{
                    color: @color;
                    &::after{
                        bottom: -5px;
                    }
                }
            }
            .icon{
                width: 50px;
                height: 50px;
                border-radius: 50%;
                overflow: hidden;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
    }
}
</style>