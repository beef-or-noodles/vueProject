<template>
<div>
    <li v-for="item in tableData" :key="item.id">
      <router-link :to="{ path: `/${userID}/content`, query:{id:item.id}}">
        <i class="img"><img :src="item.imgurl"></i>
        <h3>{{item.articeTitle}}</h3>
        <p>{{item.abstract}}</p>
      </router-link>
    </li>
</div>
</template>
<script>
export default {
  data() {
    return {
      paging: {
        pageNo: 1,
        pageSize: 10,
        total: 0,
      },
      tableData: [],
      userID:this.$route.params.userID,
    }
  },
  created() {

  },
  mounted() {
    //do something after mounting vue instance
    let id = this.$route.params.id;
    this.queryArtice(id);
  },
  watch: {
    '$route'(to, from) {
      if (to.name == "list") {
        let id = this.$route.params.id;
        this.queryArtice(id);
      }
    }
  },
  methods: {
    // 根据栏目ID查询文章列表
    queryArtice(id) {
      let params = this.paging;
      params.columnId = id;
      params.type = 1;
      this.$post(this.$api.queryArtice, params).then((data) => {
        this.tableData = data.data;
        this.paging.total = data.total;
        this.tableData = data.data;
      });
    },
  }
}
</script>
<style scoped>
.img{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
