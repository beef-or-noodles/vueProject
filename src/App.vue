<template>
<div id="app">
  <router-view />
</div>
</template>

<script>
import {
  pageRouter,
  menuRouter
} from './router/index.js'
import {
  routerData,
  routerMenuData
} from '@/tool/public/routerData.js' //配置的路由表
export default {
  name: 'app',
  data() {
    return {

    }
  },
  created() {
    this.setPageRouter();
  },
  methods: {
    setPageRouter() {
      pageRouter(routerData);
      menuRouter(routerMenuData); //进入主页创建对应路由表

    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}

::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #d6d6d6;
}

::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #d6d6d6;
}
</style>
