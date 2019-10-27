<template>
<div>

    <div class="infosbox">
      <div class="newsview">
        <h3 class="news_title">{{artieData.articeTitle}}</h3>
        <div class="bloginfo">
          <ul>
            <li class="author">作者：{{artieData.author}}</li>
            <li class="lmname">{{artieData.columnName}}</li>
            <li class="timer">时间：{{setTime(artieData.creatTime)}}</li>
            <li class="view">{{artieData.clickNumber}}人已阅读</li>
          </ul>
        </div>
        <div class="news_about"><strong>简介:</strong><span v-html="artieData.abstract"></span></div>
        <div class="news_con" v-html="artieData.content"></div>
      </div>
      <div class="share">
        <p class="diggit"><a href="JavaScript:makeRequest('/e/public/digg/?classid=3&amp;id=19&amp;dotop=1&amp;doajax=1&amp;ajaxarea=diggnum','EchoReturnedText','GET','');"> 很赞哦！ </a>(<b id="diggnum">13</b>)</p>
      </div>
    <!--  <div class="nextinfo">
        <p>上一篇：<a href="/news/life/2018-03-13/804.html">作为一个设计师,如果遭到质疑你是否能恪守自己的原则?</a></p>
        <p>下一篇：<a href="/news/life/">返回列表</a></p>
      </div>-->
    </div>

</div>
</template>
<script>
export default {
  data() {
    return {
      artieData:'',
    }
  },
  watch:{
    $route(to,from){
      console.log(111111);
       this.clickNumber(this.$route.query.id);
    }
  },
  mounted() {
     this.clickNumber(this.$route.query.id);
  },
  methods: {
    setTime: function(val) {
      let date = new Date(val);
      let time = date.getTime();
      let settime = this.$tool.formatTime(time / 1000, true);
      return settime
    },
    getArtice(id) {
      this.$post(this.$api.articeInfo, {id: id}).then((data) => {
        if(data != null){
          this.artieData = data;
        }else{
          this.$router.replace({'path':'/404'});
        }

      });
    },
    clickNumber(id){
      this.$post(this.$api.articeClickNumber, {id: id}).then((data) => {
        this.getArtice(id);
      });
    }
  }
}
</script>
<style scoped>

</style>
