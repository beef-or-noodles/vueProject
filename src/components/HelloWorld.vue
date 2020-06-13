<template>
  <div class="hello">
    <h1>{{getBookList}}</h1>
    <h2>{{bookList}}</h2>
    <h2>{{$api.baseURL}}</h2>
    <el-button type="primary" @click="addBook('javaScript')">mutations</el-button>
    <el-button type="warning" @click="add_boos('java')">actions</el-button>
    <el-button type="danger" @click="bottom">post</el-button>
    <el-button type="danger" @click="bottomCode">得到验证码</el-button>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters,mapMutations } from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  //vuex的使用
  computed:{
    ...mapState(['bookList']),
    ...mapGetters(['getBookList'])
  },//访问state
  mounted() {
    //do something after mounting vue instance

  },
  methods:{
      ...mapMutations(['addBook']),
      ...mapActions(['add_boos']),
      bottom(){
        let params = {
          userName:'wwq1',
          passWord:'12345'
        }
        this.$post(this.$api.addUser,params).then((data)=>{

        });
      },
      bottomCode(){
        this.$router.push('/login')
      }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
