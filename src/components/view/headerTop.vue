
<template>
<div>
  <header class="header-navigation" id="header">
    <nav>
      <div class="logo"><router-link to="/">吴某某的个人博客</router-link></div>
      <h2 id="mnavh"><span class="navicon"></span></h2>
      <ul id="starlist">
        <li>
          <router-link to="/list" :class="{active:path == '/list'}">网站首页</router-link>
        </li>
        <!-- <li><a href="share.html" :class="{active:path == '/list'}">我的相册</a></li> -->
        <li>
          <router-link to="/list" :class="{active:path == '/picuter'}">相册</router-link>
        </li>
        <li>
          <router-link to="/list" :class="{active:path == '/about'}">关于我</router-link>
        </li>
        <li>
          <router-link to="/login" :class="{active:path == '/login'}">登录</router-link>
        </li>
      </ul>
    </nav>
  </header>
</div>
</template>
<script>
export default {
  data() {
    return {
      path: '/list',
    }
  },
  created() {

  },
  watch: {
    $route(to, from) {
      this.path = to.path;
      console.log(to.path);
    }
  },
}
</script>
<style scoped>
.active {
  color: #f65a8a
}
</style>
