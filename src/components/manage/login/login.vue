<template>
<div class="content">
  <!-- <el-card class="box-card">
    <el-input v-model="userName" placeholder="请输入用户名"></el-input>
    <el-input v-model="password" type="password" placeholder="请输入密码" @keyup.enter.native="loginBtn()"></el-input>
    <el-button type="primary" @click="loginBtn">登录</el-button>
  </el-card> -->
  <div class="card">
      <div class="">

      </div>
      <div class="">
          
      </div>
  </div>
</div>
</template>
<script>
import { mapState, mapActions, mapGetters,mapMutations } from 'vuex'
export default {
  data() {
    return {
      userName: '',
      password: ''
    }
  },
  created() {

  },
  methods: {
    // 将用户信息保存在vuex里面
    ...mapMutations(['setUserInfo']),

    loginBtn() {
      let params = {
        userName: this.userName,
        passWord: this.password
      }
      if (this.userName == "") {
        this.$message({
          message: '请输入用户名',
          type: 'error'
        });
      } else if (this.password == "") {
        this.$message({
          message: '请输入密码',
          type: 'error'
        });
      } else {
        this.$post(this.$api.login, params).then((data) => {
          let user = JSON.stringify(data)
          sessionStorage.setItem('userInfo', user);
          if (data.isLogin) {
            this.$message({
              message: '欢迎回来'+data.data[0].userName,
              type: 'success'
            });
            // 存入Vuex
            this.setUserInfo(data.data[0]);

            this.$router.push({
              path: '/home'
            })

          } else {
            this.$message({
              message: data.msg,
              type: 'error'
            });
          }
        });
      }

    }
  }
}
</script>
<style scoped lang="less">
.content{
  display: flex;
  justify-content:center;
  align-items:Center;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background: url('../../../../static/images/loginBg.jpg');
  background-size: cover;
  position: relative;
}
.content::after{
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: inherit;
    filter: blur(8px);

}

.card{
    background: url('../../../../static/images/loginBg.jpg');
    background-size: cover;
    width: 1000px;
    height: 600px;
    background-color: white;
    box-shadow: 0 0 40px black;
    z-index: 15;
    &>div{
        float: left;
        height: 600px;
    }
    &>div:nth-child(1){
        width: 600px;
    }
    &>div:nth-child(2){
        width: 400px;
        background: rgba(0,0,0,0.5);

    }
}


.box-card{
  width: 300px;
  margin: 0 auto;
  z-index: 9;
}
.box-card .el-input{
  margin-top: 15px;
}
.box-card .el-button{
  margin-top: 15px;
  width: 100%;
}
</style>
