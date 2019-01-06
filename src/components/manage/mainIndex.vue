<template>
<div class="home">
  <div class="allContent">
    <el-container>
      <el-aside width="200px" class="leftNav" :class="{active:isCollapse}">
        <div class="leftHead">
          {{setTitle[1]}}
        </div>
        <el-menu active-text-color="#f9b15d" router text-color="#808281">
          <el-submenu v-for="(item,index) in menuData" :index="(index+1) + ''" :key="index">
            <template slot="title">
              <i :class="item.rooutMainIcon"></i>
              <span slot="title">{{item.rootMainName}}</span>
            </template>
            <el-menu-item v-for="(chird,ind) in item.rootMainList" @click="getTitle([item.rootMainName,chird.rootChildName])" :index="`${index+1}-${ind+1}`" :key="chird.rootChildName" :route="chird.path">
              {{chird.rootChildName}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main class="right">
          <div>
            <div>
              <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item v-for="elem in setTitle" :key="elem">{{elem}}</el-breadcrumb-item>
              </el-breadcrumb>
            </div>
            <div class="content">
              <!-- 路由出口 -->
              <router-view></router-view>
            </div>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</div>
</template>
<script>
import {
  menuRouter
} from '@/router/index.js'
import {
  routerMenuData
} from '@/tool/public/routerData.js' //配置的路由表
export default {
  data() {
    return {
      isCollapse: true,
      menuData: '', //菜单数据
      setTitle: [],
    }
  },
  mounted() {
    //do something after mounting vue instance
    this.setRouter();
  },
  methods: {
    //设置导航标题
    getTitle(data) {
      this.setTitle = data
    },
    setRouter() {

      this.menuData = routerMenuData
    }
  }
}
</script>
<style>
.allContent .el-menu{
  background:inherit !important;
}
.allContent .el-menu-item.is-active{
  border-right: 3px solid rgb(249, 177, 93);
}
.el-menu-item:focus, .el-menu-item:hover{
    background:inherit !important;
}
.el-submenu .el-menu-item{
  line-height: 40px;
  height: 40px;
}
</style>
<style scoped>
.home .el-menu{
  background: none;
  color: #808281 !important;
}
.home {
  position: fixed;
  width: 100vw;
  height: 100%;
  background: url('../../../static/images/mainBg.jpg');
  background-size: 100% 100%;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: Center;
}

.allContent {
  width: 1300px;
  height: 800px;
  background:rgba(255, 255, 255, 0.4);
}
.leftNav{
  height: 800px;
}
.right{
  background:rgba(255, 255, 255, 0.4);
}
.leftHead{
  width: 200px;
  line-height: 60px;
  text-align: center;
}
</style>
