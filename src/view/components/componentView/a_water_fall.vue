<template>
    <div>
        <div class="Afall" id="Afall">
            <div class="fallBox" :key="index" v-for="(item,index) in dataList">

                {{index}}
            </div>
        </div>
        <div class="fb">
            <el-button  type="primary" style="" @click="setData">加载更多</el-button>
            <el-button  type="primary" style="" @click="clear">清空</el-button>
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
      this.init()
    },
    updated(){
        this.loadList()
    },
    methods: {
      clear(){
          this.dataList= []
          this.addList=[]//添加的数据
          this.oldLength=0//原始长度
          this.init()
      },
      setData(){
        this.oldLength = this.dataList.length;
        this.addList = new Array(4).fill(0);
        this.dataList.push(...this.addList)
      },
      init() {
        let col = this.col;
        let box = $("#Afall");
        this.boxDom = box;
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
        let divList = $("#Afall .fallBox");
        let oldLength = this.oldLength-1;//0
        let arrHeight = this.arrHeight;
        let arrLeft = this.arrLeft;
        let width = this.divWidth
        for (let i = 1; i <= this.addList.length; i++) {
          let x = oldLength + i;
          let rand = Math.random()*200 +100
          let min = Math.min(...arrHeight);
          divList[x].style.width = width+"px";
          divList[x].style.height = rand+"px";
          for (let j = 0; j < arrHeight.length; j++) {
            if (arrHeight[j]==min) {
              divList[x].style.top = arrHeight[j]+"px";
              divList[x].style.left = arrLeft[j]+"px";
              arrHeight[j] = arrHeight[j]+divList[x].offsetHeight
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
        background-color: #e8f4ff;
    }
    .fallBox {
        position: absolute;
        transition: all .36s ease;
        background-color: #0e6dad;
        color: white;
        left: 50%;
        bottom: 0;
    }
    .fb{
        position: fixed;
        top: 50%;
    }
</style>
