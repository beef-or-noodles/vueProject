<template>
    <div class="contents">
        <div class="title" v-text="artieData.articeTitle"></div>
        <div class="other">
            <div class="time"><i class="el-icon-user"></i>作者：<span v-text="artieData.author"></span></div>
            <div class="time"><i class="el-icon-time"></i>发布时间：<span v-text="artieData.strTime"></span></div>
            <div class="check"><i class="el-icon-view"></i><span v-text="artieData.clickNumber"></span>人已阅读</div>
        </div>
        <div class="des">
            <span class="ti">简介：</span>
            <span v-text="artieData.abstract"></span>
        </div>
        <div class="artice" v-html="artieData.content">

        </div>
    </div>
</template>

<script>
    export default {
        name: "wcontent",
        data() {
            return {
                artieData: {},
                articeId:"",
            }
        },
        mounted(){
            this.articeId = this.$route.params.id;
            this.clickNumber();
        },
        watch:{
          "$route"(to,form){
              this.articeId = this.$route.params.id;
              this.clickNumber();
          }
        },
        methods: {
            getArtice() {
                this.$post(this.$api.articeInfo, {id: this.articeId}).then((data) => {
                    if(data != null){
                        this.artieData = data;
                    }else{
                        this.$router.replace({'path':'/404'});
                    }
                });
            },
            clickNumber(){
                this.$post(this.$api.articeClickNumber, {id: this.articeId}).then((data) => {
                    this.getArtice();
                });
            }
        },
    }
</script>

<style lang="less" scoped>
    @import "../less/public";
    .contents{
        min-height: 100%;
        width: 100%;
        background: white;
        padding: 20px;
        box-sizing: border-box;
        .title{
            text-align: left;
            font-size: 20px;
            font-weight: 600;
        }
        .other{
            font-size: 14px;
            color:#797b7c;
            width: 100%;
            margin:30px 0;
            &>div{
                display: inline-block;
                margin-right: 25px;
            }
            .check,.time{
                i{
                    margin-right: 5px;
                    color: @color;
                }
            }
        }
        .des{
            width: 100%;
            background: @color2;
            padding: 5px;
            box-sizing: border-box;
            .overHidden(2);
            font-size: 14px;
            .ti{
                color:black;
                font-weight: 600;
            }
        }
        .artice{
            line-height: 30px;
            margin-top: 30px;
            letter-spacing: 1px;
            text-align: justify;
        }
    }
</style>