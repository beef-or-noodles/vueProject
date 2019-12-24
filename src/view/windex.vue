<template>
    <div class="indexBg">
        <wheader :scroll="scroll" @close="close"></wheader>
        <waudio :musicList="musicList"></waudio>
        <div class="content">
            <div class="centerBox">
                <div class="left" :style="{top:leftTop+'px'}" :class="{leftNav:!leftNav}">
                    <wleft></wleft>
                </div>
                <div class="right">
                    <keep-alive>
                       <router-view ref="view"></router-view>
                    </keep-alive>
                </div>
            </div>
        </div>
        <div class="footer">
            Copyright 2018 by wuwanqiang&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;渝ICP备19006911号-1
        </div>
    </div>
</template>

<script>
    import wheader from "./components/wheader"
    import wleft from "./components/wleft"
    import waudio from "./components/audioPlay"
    export default {
        name: "windex",
        components: {
            wheader, wleft, waudio
        },
        data() {
            return {
                leftNav: false,
                musicList: [],
                paging: {
                    pageNo: 1,
                    pageSize: 10,
                    total: 0,
                },
                scroll: 0,
                leftTop: 0,
            }
        },
        created() {
            // 插入 meta 标签
            var oMeta = document.createElement('meta');
            oMeta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0,minimum-scale=1.0, user-scalable=0';
            oMeta.name = 'viewport';
            document.getElementsByTagName('head')[0].appendChild(oMeta);
        },
        mounted() {
            this.getTreeList();
            let _this = this;
            let windowWidth = window.innerWidth
            window.onscroll = function () {
                var t = document.documentElement.scrollTop || document.body.scrollTop; //变量t就是滚动条滚动时，到顶部的距离
                _this.scroll = t
                if (windowWidth > 960) {
                    if (t > 200) {
                        _this.leftTop = t - 190
                    } else {
                        _this.leftTop = 0
                    }
                }

                if(document.documentElement.scrollTop != 0){
                    /*到底加载更多数据*/
                    if (t + $(window).height() == $(document).height()) {
                        setTimeout(() => {
                            try {
                                _this.$refs.view.pagingData();

                            } catch (e) {
                              console.log(e);
                            }
                        }, 300)
                    }
                }

            }
        },
      activated(){
         console.log("1233333333333333333333");
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
                    if (data.length > 0) {
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

    .indexBg {
        position: relative;
        background: #4568DC;
        background: -webkit-linear-gradient(to right, #B06AB3, #4568DC);
        background: linear-gradient(to right, #B06AB3, #4568DC);
    }

    .content {
        background: #efefef;
        width: 100%;
    }

    .centerBox {
        position: relative;
        min-height: calc(100vh - 320px);
        overflow: hidden;

        .left {
            transition: all 0s ease;
            float: left;
            width: 280px;
            position: absolute;
            left: 0;
            top: 0;

            &.leftNav {
                right: -280px;
            }
        }

        .right {
            float: right;
            width: calc(100% - 300px);
        }
    }

    .footer {
        text-align: center;
        background: #efefef;
        margin-top: 20px;
        font-size: 12px;
        line-height: 50px;
    }
</style>
