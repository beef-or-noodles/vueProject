<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import {pageRouter} from './router/index.js'
import {routerData} from '@/tool/public/routerData.js'//配置的路由表
export default {
  name:'app',
  data(){
    return{

    }
  },
  created() {
    this.setPageRouter();
  },
  methods: {
    setPageRouter() {
      pageRouter(routerData);
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
</style>
