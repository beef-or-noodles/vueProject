<template>
<div>
  <header-top></header-top>
  <article>
    <aside class="l_box">
      <div class="about_me">
        <h2>关于我</h2>
        <ul>
          <!-- <i><img style="height:100%;" :src="about.imgurl"></i> -->
          <!-- <p v-html="about.abstract"></p> -->
        </ul>
      </div>

      <div class="fenlei">
        <h2>文章分类</h2>
        <!-- 栏目树 -->
        <el-tree :data="treeData" :props="defaultProps" default-expand-all @node-click="treeClick" ref="tree2"></el-tree>
      </div>
      <div class="tuijian">
        <h2>站长推荐</h2>
        <ul>
          <li v-for="item in recommendData" :key="item.id">
            <router-link :to="{ path: `/${userID}/content`, query: { id: item.id}}">{{item.articeTitle}}</router-link>
          </li>
        </ul>
        <div v-if="recommendData == ''" style="padding-left:15px;padding-bottom:15px;">
          这里空空如也^-^
        </div>
      </div>
    </aside>
    <div class="content">
      <main class="r_box">
        <router-view></router-view>
      </main>
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
      about: '',
      treeData: [],
      recommendData: [],
      userID:this.$route.params.userID,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
    }
  },
  components: {
    headerTop,
    footers
  },
  created() {

  },
  mounted() {
    //do something after mounting vue instance
    this.getMe();
    this.getTreeList();
    this.queryRecommend();
  },
  methods: {
    getMe() {
      this.$post(this.$api.articeInfo, {
        id: 2,
        userID:this.userID,
      }).then((data) => {
        this.about = data;
      });
    },
    // 树点击事件
    treeClick(data, index, val) {
      var id = data.id; //当前点击栏目id
      var obj = data.hasOwnProperty('children');
      if (obj) {
        if (data.children.length == 0) {
          this.$router.push({
            path: `/${this.userID}/list/${id}`,
          })
        }
      } else {
        this.$router.push({
          path: `/${this.userID}/list/${id}`,
        })
      }


    },
    //得到栏目列表
    getTreeList() {
      this.$post(this.$api.queryColumn, {
        type: 2,
        userID:this.userID,
      }).then((data) => {
        this.treeData = data;
      });
    },
    //查询推荐文章
    queryRecommend() {
      this.$post(this.$api.queryRecommend).then((data) => {
        this.recommendData = data;
      });
    },
  }
}
</script>
<style scoped>

</style>
