<template>
<div>
<header-top></header-top>
  <article>
    <aside class="l_box">
        <div class="about_me">
          <h2>关于我</h2>
          <ul>
            <i><img style="height:100%;" :src="about.imgurl"></i>
            <p v-html="about.abstract"></p>
          </ul>
        </div>
        <!-- <div class="wdxc">
          <h2>我的相册</h2>
          <ul>
            <li><a href="/"><img src="images/7.jpg"></a></li>
          </ul>
        </div> -->
        <!-- <div class="search">
          <form action="/e/search/index.php" method="post" name="searchform" id="searchform">
            <input name="keyboard" id="keyboard" class="input_text" value="请输入关键字词" style="color: rgb(153, 153, 153);" onfocus="if(value=='请输入关键字词'){this.style.color='#000';value=''}" onblur="if(value==''){this.style.color='#999';value='请输入关键字词'}" type="text">
            <input name="show" value="title" type="hidden">
            <input name="tempid" value="1" type="hidden">
            <input name="tbname" value="news" type="hidden">
            <input name="Submit" class="input_submit" value="搜索" type="submit">
          </form>
        </div> -->
        <div class="fenlei">
          <h2>文章分类</h2>
          <!-- 栏目树 -->
          <el-tree :data="treeData" :props="defaultProps" default-expand-all @node-click="treeClick" ref="tree2"></el-tree>
        </div>
        <div class="tuijian">
          <h2>站长推荐</h2>
          <ul>
            <li><a href="/">你是什么人便会遇上什么人</a></li>
            <li><a href="/">帝国cms 列表页调用子栏目，没有则不显示栏目名称</a></li>
            <li><a href="/">第二届 优秀个人博客模板比赛参选活动</a></li>
            <li><a href="/">个人博客模板《绅士》后台管理</a></li>
            <li><a href="/">你是什么人便会遇上什么人</a></li>
            <li><a href="/">帝国cms 列表页调用子栏目，没有则不显示栏目名称</a></li>
            <li><a href="/">第二届 优秀个人博客模板比赛参选活动</a></li>
            <li><a href="/">个人博客模板《绅士》后台管理</a></li>
          </ul>
        </div>
        <!-- <div class="links">
          <h2>友情链接</h2>
          <ul>
            <a href="http://www.yangqq.com">杨青个人博客</a> <a href="http://www.yangqq.com">杨青博客</a>
          </ul>
        </div>
        <div class="guanzhu">
          <h2>关注我 么么哒</h2>
          <ul>
            <img src="images/wx.jpg">
          </ul>
        </div> -->
    </aside>
    <div class="content">
      <router-view></router-view>
    </div>
  </article>
  <footers></footers>
</div>
</template>
<script>
import headerTop from './headerTop.vue'
import footers from './footers.vue'
export default {
  data() {
    return {
      about:'',
      treeData: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
    }
  },
  components:{
    headerTop,
    footers
  },
  created() {

  },
  mounted() {
    //do something after mounting vue instance
    this.getMe();
    this.getTreeList();
  },
  methods: {
    getMe() {
      this.$post(this.$api.articeInfo,{id:18}).then((data)=>{
        this.about = data;
      });
    },
    // 树点击事件
    treeClick(data, index, val) {
      let id = data.id; //当前点击栏目id
      this.$router.push({
        path:'/list/'+id,
      })
    },
    //得到栏目列表
    getTreeList() {
      this.$post(this.$api.queryColumn, {
        type: 2
      }).then((data) => {
        this.treeData = data;
      });
    },

  }
}
</script>
<style scoped>

</style>
