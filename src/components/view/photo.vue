<template>
  <div style="width:300px;height300px;">
    111
    <vue-waterfall-easy :imgsArr="imgsArr" @scrollReachBottom="getData"></vue-waterfall-easy>
  </div>
</template>

<script>
import vueWaterfallEasy from 'vue-waterfall-easy'
export default {
  name: 'app',
  data() {
    return {
      imgsArr: [],
      group: 1, // request param
    }
  },
  components: {
    vueWaterfallEasy
  },
  created() {
    //do something after creating vue instance
    this.getData();
  },
  methods: {
    getData() {
      this.imgsArr = [{
        src: "https://lfyfly.github.io/vue-waterfall-easy/demo/static/img/3.jpg",
        href: "https://www.baidu.com",
        info: "一些图片描述文字"
      }]
      console.log(this.imgsArr);
    },

  },


}
</script>
