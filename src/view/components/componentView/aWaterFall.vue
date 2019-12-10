<template>
    <div>
        <div class="Afall" id="Afall">
            <div ref="fallBox" class="fallBox" :key="index" v-for="(item,index) in dataList">
                <slot :row="item"></slot>
            </div>
        </div>
    </div>

</template>

<script>
  export default {
    name: "a_water_fall",
    data() {
      return {
        dataList: [],
        addList:[],//添加的数据
        oldLength:0,//原始长度
        arrHeight: [],//每列高度
        arrLeft: [],//每列偏移量
        divWidth:0,//盒子宽度
        col: 3,//显示几行
        boxDom:null
      }
    },
    mounted() {
        this.init();
    },
    methods: {
      setData(data){
        this.oldLength = this.dataList.length;
        this.addList = data
        this.dataList.push(...this.addList)
          setTimeout(()=>{
              this.loadList()
          },100)
      },
      init() {
        let col = this.col;
        let box = $("#Afall");
        this.boxDom = box;
        console.log(box.width());
        if (box.width()<600){
            col = 2
        }
        let width = box.width() / col;
        this.divWidth = width;
        let arrHeight = new Array(col).fill(0) //每列的高度
        let arrLeft = new Array(col).fill(0) //每列偏移量
        for (let l=0;l<arrLeft.length;l++) {
          arrLeft[l] = l*width
        }
        this.arrHeight = arrHeight
        this.arrLeft = arrLeft
      },
      loadList(){
        let box = this.boxDom
        let divList = this.$refs.fallBox;
        let oldLength = this.oldLength-1;//0
        let arrHeight = this.arrHeight;
        let arrLeft = this.arrLeft;
        let width = this.divWidth
        for (let i = 1; i <= this.addList.length; i++) {
          let x = oldLength + i;
          let min = Math.min(...arrHeight);
          divList[x].style.width = width+"px";
          let divHeight = divList[x].offsetHeight
            divList[x].style.height = divHeight+"px";
          for (let j = 0; j < arrHeight.length; j++) {
            if (arrHeight[j]==min) {
              divList[x].style.top = arrHeight[j]+"px";
              divList[x].style.left = arrLeft[j]+"px";
              divList[x].style.opacity = 1
              arrHeight[j] = arrHeight[j]+divHeight
              break;
            }
          }
          if(x == divList.length-1){
            let max = Math.max(...arrHeight);
            box[0].style.height = max+"px"
            this.arrHeight = arrHeight
          }
        }
      }

    },
  }
</script>

<style lang="less" scoped>
    .Afall {
        position: relative;
        width: 100%;
    }
    .fallBox {
        position: absolute;
        transition: all .5s ease;
        left: 10%;
        padding: 5px;
        box-sizing: border-box;
        opacity: 0;
    }
    .fb{
        position: fixed;
        top: 50%;
    }
</style>
