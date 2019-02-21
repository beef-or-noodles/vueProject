<template>
  <!-- <div class="flex">
    <div class="item" v-for="elem in 8">
      {{elem}}
    </div>
  </div> -->
  <div class="">
      <water-fall></water-fall>
  </div>
</template>

<script>
import waterFall from './componentView/waterFall.vue'
export default {
  name: 'app',
  data() {
    return {
      imgsArr: [],
      group: 1, // request param
      paging: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
      },
    }
  },
  components: {
    waterFall
  },
  created() {
    //do something after creating vue instance
    this.getData();
  },
  methods: {
    getData() {
      let params = this.paging;
      params.columnId = 18;
      params.type = 1;
      this.$post(this.$api.queryArtice,params).then((data)=>{
        console.log(data);
      });
    },

  },


}
</script>
<style scoped>
.flex {
  display: flex;
  /* flex-direction:row;*/
  /* flex-direction: row | row-reverse | column | column-reverse; 排列方式*/
  /* flex-wrap: wrap;  */
  /* flex-wrap: nowrap | wrap | wrap-reverse; 自动换行*/
  flex-flow: row wrap;
  /* justify-content: flex-start | flex-end | center | space-between | space-around; 定义主轴的对齐方式*/
  /* align-items: flex-start | flex-end | center | baseline | stretch; 定义在交叉轴上的对齐方式 */
}

.item {
  width: calc(25%);
  height: 90px;
  background-color: red;
  margin: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 70px;
  overflow: hidden;
  /* flex-shrink:1 空间不足项目缩小 0不缩小*/
  flex-grow:1;/*等分剩下空间*/
  /* order:1 数值越小越靠前*/
  /* flex-basis: <length> | auto; default auto 项目分配之前的px*/
   /* align-self: auto | flex-start | flex-end | center | baseline | stretch; 允许元素拥有自己的对齐方式*/
}
</style>
