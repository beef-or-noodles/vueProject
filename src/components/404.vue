<template>
  <div class="content">
    <div class="Pages">
      <div class="bike bikeAni" :class="{active:back}"></div>
      <div class="txt">
        404：我迷路了=><span class="goback" @click="goback">返回</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      back:false
    }
  },
  created() {

  },
  methods:{
    goback(){
      this.back = true;
      setTimeout(()=>{
        this.$router.go(-1);//返回上一层
      },900)
    }
  }
}
</script>
<style lang="less" scoped>
  @import "less/bike.less";
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
  .Pages{
    position: relative;
    display: flex;
    align-items: center;
    flex-direction:column;
    width: 180px;
    height: 180px;
  }
.Pages img{
  width: 300px;
  height: 300px;
}
.active{
  left: -1400px;
}
.txt{
  font-size: 18px;
  font-weight: bold;
  position: absolute;
  top:140px ;
  width: 100%;
}
  .goback{
    &:hover{
      cursor: pointer;
    }
    color: #E64F2A;
  }
</style>
