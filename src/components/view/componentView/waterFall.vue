<template>
<div class="water-fall" id="waterFall">
  <div class="water-item" v-for="(elem,index) in imgData" :key="index">
    <img class="img" :src="elem" alt="">
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      imgData: [],
      arrHeight: [],
      arrLeft: [],
      divWidth: '',
      interval: this.intervalN,
      index: this.colNum,
    }
  },
  mounted() {
    var data = this.img
    this.imgData.push(...data);
    var _this = this;
    setTimeout(function() {
      _this.loadImg();
    }, 50);
  },
  props: {
    colNum: {//显示几列
      type: Number,
      default: 3
    },
    img: {
      type: Array,
    },
    intervalN:{//间距
      type: Number,
      default: 10,
    }
  },
  watch: {
    img: function(val) { //添加数据
      var data = this.img
      this.imgData.push(...data);
    }
  },
  updated() {
    this.loadImg();
  },
  methods: {
    loadImg() {
      var _this = this;

      //获取盒子的宽度
      var div = document.getElementsByClassName('water-item');

      //取得盒子宽度
      var pageWidth = document.getElementById("waterFall").offsetWidth;
      //取得所有img图片
      var imgOload = $('#waterFall .img');
      //数组存储这一列的高度
      //一列几条
      var index = _this.index;
      var interval = _this.interval; //间隔多少像素
      var offset = (index - 1) * interval;
      var divWidth = (pageWidth / index) - (offset / 3); //每个盒子应该有的宽度
      _this.divWidth = divWidth
      $("#waterFall>div").css('width', divWidth);
      _this.arrHeight = new Array(index).fill(0) //数组长度
      _this.arrLeft = new Array(index).fill(0) //偏移量
      //计算该有的偏移量
      for (var i = 0; i < _this.arrLeft.length; i++) {
        var left = (divWidth * i) + (interval * i)
        div[i].style.left = left + 'px';
        _this.arrLeft[i] = left;
      }
      //添加初始高度
      for (var i = 0; i < _this.imgData.length; i++) {
        imgOload[i].onload = (function() {
          //取得最小值
          var k = 0; //k 就是对应下标
          for (var j = 1; j < _this.arrHeight.length; j++) {
            if (_this.arrHeight[j] < _this.arrHeight[k]) {
              k = j;
            };
          }
          var leftA = (divWidth * k) + (interval * k)
          div[i].style.left = leftA + 'px';
          div[i].style.top = _this.arrHeight[k] + interval + 'px';
          _this.arrHeight[k] = _this.arrHeight[k] + div[i].offsetHeight + interval; //根新列高度
          var maxHeight = Math.max(..._this.arrHeight);
          //设置盒子高度
          document.getElementById("waterFall").style.height = maxHeight + 'px';
        })(i)
      };
    },
  }
}
</script>
<style scoped>
.water-fall {
  position: relative;
  width: 100%;
}

.water-item {
  position: absolute;
  /* width:25%; */
  background: #449d44;
  transition: all .36s ease;
}

.water-item img {
  width: 100%;
}
</style>
