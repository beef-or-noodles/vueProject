<template>
    <div class="leftBox">
        <div class="boxList">
            <div class="top">
                文章导航
            </div>
            <div class="box navBox">
                <ul class="first">
                    <li :class="{active:item.id == active.first}" v-for="item in list">
                        <a @click.stop="firstClick(item)">{{item.label}}</a>
                        <ul class="child">
                            <li @click.stop="childClick(chi.id)" :class="{active:chi.id == active.child}" v-for="chi in item.children"><a>{{chi.label}}</a></li>
                        </ul>
                    </li>
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
        name: "wleft",
        data() {
            return {
                active:{
                    first:1,
                    child:1,
                },
                list: []
            }
        },
        created(){
            this.getTreeList();
        },
        methods: {
            firstClick(item) {
                this.active.first = item.id
                if(item.children.length == 0){
                    this.$router.push({
                        path:"/list/"+item.id,
                    })
                }
            },
            childClick(id){
                this.active.child = id
                this.$router.push({
                    path:"/list/"+id,
                })
            },
            //得到栏目列表
            getTreeList() {
                this.$post(this.$api.queryColumn, {
                    type: 2,
                    userID:this.userID,
                }).then((data) => {
                    this.list = data;
                });
            },
        },
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
            background:@color2;
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
        .navBox{
            padding: 5px 0;
            padding-left: 10px;
            .first{
                &>li{
                    margin-bottom: 5px;
                    ul{
                        height: 0;
                        transition: all .36s ease;
                        overflow: hidden;
                    }
                }
                &>li>a{
                    padding-left:  10px;
                    border-left: 3px solid @color3;
                    display: block;
                }
                &>li.active>a{
                    border-left: 3px solid @color;
                    color: @color;
                }
                &>li.active>ul{
                    height: auto;
                }
            }
            .child{
                padding-left: 25px;
                font-size: 12px;
                li{
                    padding-top: 5px;
                    position: relative;
                    &::after{
                        content: "";
                        position: absolute;
                        width: 5px;
                        height: 5px;
                        background: @color3;
                        left: -15px;
                        top: calc(50%);
                    }
                    &.active{
                        &>a{
                            color: @color;
                        }
                        &::after{
                            background: @color;
                        }
                    }
                }
            }
              ul li{

              }
        }
    }
}
</style>