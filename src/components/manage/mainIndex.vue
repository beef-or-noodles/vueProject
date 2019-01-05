<template>
<div class="home">
  <el-container>
    <el-aside width="200px" class="leftNav" :class="{active:isCollapse}">
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
    <el-container>
      <el-header style="height:60px;">
        <div class="header">
          <el-row>
            <el-col :span="5">
              <el-button type="primary" class="showLetNav" @click="showLetNav" icon="el-icon-menu" circle></el-button>
            </el-col>
            <el-col :span="16">
              &nbsp;
            </el-col>
            <el-col :span="3">
              <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link" style="color:white;">
                  <div class="iconPic">
                    <img src="../../../static/images/icon.jpg" alt="">
                  </div>
                  <span>admin</span>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="a">编辑用户信息</el-dropdown-item>
                  <el-dropdown-item command="b">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </div>
      </el-header>
      <el-main>
        <div class="main">
          <div class="main-heade">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item v-for="elem in setTitle" :key="elem">{{elem}}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <!-- 路由出口 -->
          <router-view></router-view>
        </div>
      </el-main>
      <el-footer style="height:60px;">
        <div class="footer">
          版权
        </div>
      </el-footer>
    </el-container>
  </el-container>
  <!-- 菜单显示按钮 -->

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
    handleCommand(command) {
      this.$message('click on item ' + command);
    },
    setRouter() {
      menuRouter(routerMenuData); //进入主页创建对应路由表
      this.menuData = routerMenuData
    }
  }
}
</script>
<style scoped>
.showLetNav {
  visibility: hidden;
  margin-top: 5px;
}

@media screen and (max-width:768px) {
  .leftNav.active {
    margin-left: -200px;
  }

  .showLetNav {
    visibility: visible;
  }
}

.main {
  overflow: auto;
  min-height: calc(100vh - 130px);
}

.leftNav {
  background-color: #9e9e9e;
  overflow: auto;
  transition: all .36s ease;
}

.home .el-menu {
  border: none;
}

.footer {
  text-align: center;
  font-size: 16px;
  color: #9e9e9e;
  line-height: 7vh;
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
</style>
