<template>
<div class="home">
  <el-container>
    <el-aside width="200px" class="leftNav" :class="{active:isCollapse}">
      <div class="headIcon">
        <div class="iconImg">
          <img src="../../../static/images/icon.jpg" />
        </div>
        <div class="username">
          <el-dropdown>
            <span class="el-dropdown-link">
              吴先生<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>系统设置</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
      <el-menu active-text-color="#ffd04b" router background-color="#545c64" text-color="white">
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
    <el-container class="conMain">
      <el-main>
        <div class="main">
          <div class="main-heade">
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
      <el-footer style="height:6vh;">
        <div class="footer">
          版权
        </div>
      </el-footer>
    </el-container>
  </el-container>
  <!-- 菜单显示按钮 -->
  <div class="showLetNav">
    <el-button icon="el-icon-menu" @click="showLetNav" circle></el-button>
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
    showLetNav() {
      this.isCollapse = !this.isCollapse;
    },
    //设置导航标题
    getTitle(data) {
      this.setTitle = data
    },
    setRouter() {
      menuRouter(routerMenuData); //进入主页创建对应路由表
      this.menuData = routerMenuData
    }
  }
}
</script>
<style scoped>
.main {}

.showLetNav {
  visibility: hidden;
  margin-top: 5px;
  position: fixed;
  z-index: 999;
  bottom: 25vw;
  right: 5vw;
}

.conMain {
  margin-left: 200px;
  transition: all .36s ease;
}

.home .el-main,
.el-footer {
  padding: 0;
  
}

.leftNav {
  position: absolute;
  left: 0px;
  background: radial-gradient(ellipse at top left, rgba(105,155,200,1) 0%,rgba(181,197,216,1) 57%);
  overflow: auto;
  transition: all .36s ease;
  min-height: 100vh;
}

.home .el-menu {
  border: none;
}

.footer {
  text-align: center;
  font-size: 16px;
  color: #9e9e9e;
  line-height: 6vh;
  border-top: 1px solid #545c64;
}

.home .el-header {
  background-color: #545c64;
}

.main {
  height: 100%;
  overflow: auto;
}

.header {
  color: white;
}

.iconPic {
  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 50%;
  margin-top: 3px;
}

.iconPic img {
  width: 100%;
}

.main-heade {
  padding: 15px;
  border-bottom: 1px solid #545c64;
}

.content {
  padding: 15px;
  overflow: auto;
  min-height: 82vh;
}

.headIcon {
  width: 200px;
  padding: 10px;
  overflow: hidden;
}

.iconImg {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  overflow: hidden;
  float: left;
}

.iconImg img {
  width: 100%;
}
.username{
  margin-top: 15px;
  padding-left: 75px;
}
.username .el-dropdown{
  color: white;
}
@media screen and (max-width:768px) {
  .leftNav.active {
    left: -200px;
  }

  .showLetNav {
    visibility: visible;
  }

  .conMain {
    margin-left: 0px;
  }
}
</style>
