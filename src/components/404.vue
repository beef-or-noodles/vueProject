<template>
  <div class="content">
    <div class="Pages">
      <img src="@/assets/images/404bg.jpg" alt="404页面未找到">
      <div class="txt">
        一不小心走丢了。。。。<br />
        3S后返回上一页
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{

    }
  },
  created() {
    //do something after creating vue instance
    let _this = this;
    // setTimeout(function () {
    //   _this.$router.go(-1);
    // }, 3000);
  }
}
</script>
<style scoped>
.content{
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #ebeef5;
  text-align: center;
  display: flex;
      justify-content:center;
      align-items:Center;
}
.Pages img{
  width: 300px;
  height: 300px;
}
.txt{
  font-size: 18px;
}
</style>
