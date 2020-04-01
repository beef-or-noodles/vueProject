<template>
    <div id="app">
        <router-view />
        <wToast></wToast>
    </div>
</template>

<script>
  import wToast from "./components/toast/wToast";
export default {
  components:{wToast},
  name: 'app',
  data() {
    return {

    }
  },
  created() {
  },
  methods: {

  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 6px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 6px;
}

::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  background:#b8b8b8;
}

::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  border-radius: 10px;
  background: white;
}
  div{
    -webkit-overflow-scrolling: touch;
  }
</style>
