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
        <div class="artice" v-highlight v-html="artieData.content"></div>

        <wmessage :articeId="articeId" ref="wmessage"></wmessage>
    </div>
</template>

<script>
    import wmessage from "./wmessage"
    export default {
        name: "wcontent",
        data() {
            return {
                artieData: {},
                articeId:0,
            }
        },
        components:{
            wmessage
        },
        created(){
            this.articeId = Number(this.$route.params.id);
        },
        mounted(){
            this.clickNumber();
        },
        watch:{
          "$route"(to,form){
            if(to.name == form.name){
              this.articeId = Number(this.$route.params.id);
              this.clickNumber();
            }
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
            },

            pagingData(){
                this.$refs.wmessage.pagingData();
            }
        },
    }
</script>
<style>
    .contents .artice img{
        max-width: 100%;
    }
</style>
<style lang="less" scoped>
    @import "../less/public";
    .contents{
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
            box-sizing: border-box;
            .overHidden(2);
            font-size: 14px;
            padding: 10px;
            .ti{
                color:black;
                font-weight: 600;
            }
        }
        .artice{
            min-height: 300px;
            line-height: 25px;
            margin-top: 20px;
            letter-spacing: 1px;
            text-align: justify;
        }
    }
</style>
