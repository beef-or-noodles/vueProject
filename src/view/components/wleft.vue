<template>
    <div class="leftBox">
        <div class="boxList">
            <div class="top">
                文章导航
            </div>
            <div class="tjBox box">
                <ul>
                    <li><a>文章标题</a></li>
                    <li><a>文章标题</a></li>
                    <li><a>文章标题</a></li>
                </ul>
            </div>
        </div>
        <div class="boxList">
            <div class="top">
                站长推荐
            </div>
            <div class="tjBox box">
                <ul>
                    <li><a>文章标题</a></li>
                    <li><a>文章标题</a></li>
                    <li><a>文章标题</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "wleft"
    }
</script>

<style lang="less" scoped>
    @import "../less/public.less";
.leftBox{
    .boxList{
        background: white;
        margin-bottom: 15px;
        .top{
            border-left: 6px solid @color;
            font-weight: 500;
            padding: 5px 10px;
            font-size: 16px;
        }
        .tjBox{
            padding: 2px 0;
            ul{
                li{
                    padding-left: 20px;
                    position: relative;
                    margin: 5px 0;
                    font-size: 14px;
                    &::after{
                        content: "";
                        position: absolute;
                        width: 6px;
                        height: 6px;
                        background: @color;
                        top: calc(50% - 3px);
                        left: 5px;
                    }
                }
            }
        }
    }
}
</style>