<template>
<div class="water-fall" id="waterFall">
  <div class="water-item" v-for="elem in imgData" :key="elem">
    <img :src="elem" alt="">
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      imgData: ['http://demo.htmleaf.com/1704/201704121503/img/set1/11.jpg', 'http://demo.htmleaf.com/1704/201704121503/img/set1/2.jpg', 'http://demo.htmleaf.com/1808/201808011428/images/item-1.jpg',
        'http://demo.htmleaf.com/1808/201808011428/images/item-5.jpg','http://demo.htmleaf.com/1704/201704101508/images/4.jpg','http://demo.htmleaf.com/1704/201704101508/images/2.jpg','http://demo.htmleaf.com/1704/201704101508/images/9.jpg'
      ]
    }
  },
  mounted() {
    //获取盒子的宽度
    var div = document.getElementsByClassName('water-item');

    //取得盒子宽度
    var pageWidth = document.getElementById("waterFall").offsetWidth;
    //数组存储这一列的高度
    //一列几条
    var index = 3;
    var interval = 10; //间隔多少像素
    var offset = (index - 1) * interval;
    var divWidth = (pageWidth / index); //每个盒子应该有的宽度

    $("#waterFall>div").css('width', divWidth);
    var arrHeight = new Array(index) //数组长度
    var arrLeft = new Array(index) //偏移量
    //添加初始高度
    for (var i = 0; i < this.imgData.length; i++) {
      if (i < index) {
        arrHeight[i] = div[i].offsetHeight;
        var left = (divWidth * i) + (interval * i)
        div[i].style.left = left + 'px';
        arrLeft[i] = left;
      } else {
        //取得最小值
        var k = 0; //k 就是对应下标
        for (var j = 1; j < arrHeight.length; j++) {
          if (arrHeight[j] < arrHeight[k]) {
            k = j;
          };
        }

        var leftA = (divWidth * k) + (interval * k)
        div[i].style.left = leftA + 'px';
        div[i].style.top = arrHeight[k] + interval + 'px';
        arrHeight[k] = arrHeight[k] + div[i].offsetHeight + interval;//根新列高度

      }

    };

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
