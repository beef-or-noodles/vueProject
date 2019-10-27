
<template>
<div>
  <header class="header-navigation" id="header">
    <nav>
      <div class="logo"></div>
      <h2 id="mnavh"><span class="navicon"></span></h2>
      <ul id="starlist">
        <li>
          <router-link :to="{ path: `/myIndex`}" active-class="active">网站首页</router-link>
        </li>
        <li>
          <router-link :to="{ path: `/photo`}" active-class="active">相册</router-link>
        </li>
        <!--<li>
          &lt;!&ndash;<router-link :to="{ path: `/content?id=2`}">关于我</router-link>&ndash;&gt;
        </li>-->
        <li>
          <router-link :to="{ path: `/login`}" active-class="active" target="_blank">登录</router-link>
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
      userID:this.$route.params.userID,
    }
  },
}
</script>
<style scoped>
.active {
  color: #f65a8a
}
</style>
