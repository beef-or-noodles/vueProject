<template>
<div class="home">

  <div class="allContent">
    <el-container>
      <el-aside width="200px" class="leftNav" :class="{active:isCollapse}">
        <div class="leftHead">
          {{textName}}
        </div>
        <el-menu active-text-color="#f56c6c" router unique-opened text-color="#808281">
          <el-submenu v-for="(item,index) in menuData" :index="(index+1) + ''" :key="index" v-if="item.power">
            <template slot="title">
              <i :class="item.rooutMainIcon"></i>
              <span slot="title">{{item.rootMainName}}</span>
            </template>
            <el-menu-item v-for="(chird,ind) in item.rootMainList" v-if="chird.rootPower" @click="textName = chird.rootChildName" :index="`${index+1}-${ind+1}`" :key="ind" :route="chird.path">
              {{chird.rootChildName}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
        <div class="exit" @click="exitBtn">
          <i class="el-icon-back"></i>退出
        </div>
      </el-aside>
      <el-container>
        <el-main class="right">
          <div>
            <div class="contentTop">
              <div class="icon">
                <img :src="getUserInfo.data[0].image" alt="">
              </div>
              <div class="message">
                <el-badge :value="200" :max="99">
                  <i class="el-icon-bell"></i>
                </el-badge>
              </div>
              <div class="setting">
                <i class="el-icon-setting"></i>
              </div>
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
import {mapMutations,mapGetters} from 'vuex'
export default {
  data() {
    return {
      isCollapse: true,
      menuData: '', //菜单数据
      textName: "C_CMS",
    }
  },
  created() {
    this.getUserEoot();
  },

  computed:{
    ...mapGetters(["getUserInfo","getRootMenu"])
  },
  methods: {
    ...mapMutations(['setUserInfo',"setRootMenu"]),
    exitBtn() {
      this.setUserInfo();//清空用户信息
      this.setRootMenu();
      this.$router.push('/login');
    },
    getUserEoot(){
      //取得用户权限
      this.menuData = this.getRootMenu;
    },
  }
}
</script>
<style>
.el-input.is-active .el-input__inner,
.el-input__inner:focus {
  border-color: rgb(249, 177, 93);
}

.allContent .el-menu {
  background: inherit !important;
  border: none;
}

.allContent .el-menu-item.is-active {
  border-right: 3px solid #f56c6c;
}

.el-menu-item:focus,
.el-menu-item:hover {
  background: inherit !important;
}

.el-submenu .el-menu-item {
  line-height: 40px;
  height: 40px;
}
</style>
<style scoped>
.home .el-menu {
  background: none;
  color: #808281 !important;
}

.home {
  position: absolute;
  width: 100%;
  height: 100vh;
  background: radial-gradient(ellipse at top left, rgba(181, 197, 216, 1) 0%, rgba(105, 155, 200, 1) 57%);
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  align-items: Center;
  overflow: auto;
}

.allContent {
  width: 1300px;
  height: 800px;
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 0px 0px 4px white;
  overflow: hidden;

}

.leftNav {
  height: 800px;
  position: relative;
  padding-bottom: 20px
}

.right {
  background: rgba(255, 255, 255, 0.1);
  padding: 0;
}

.leftHead {
  text-align: center;
  line-height: 60px;
  font-size: 24px;
  text-shadow: #FF0000 0 0 10px;
  color: white;
}

.contentTop {
  height: 60px;
  border-bottom: 2px dashed #eeeae9;
}

.contentTop div {
  float: right;
  margin-right: 20px;
}

.icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid rgba(255, 255, 255, 0.3);
  margin-top: 3px;
}

.content {
  padding: 20px;
  max-height: 800px;
  overflow: auto;
}

.icon img {
  width: 100%;
}

.message,
.setting {
  font-size: 22px;
  margin-top: 20px;
}

.exit {
  position: absolute;
  bottom: 20px;
  left: 50px;
  color: #808281;
}

.exit:hover {
  cursor: pointer;
}
</style>
