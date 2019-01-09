<template>
<div class="content">
  <el-card class="box-card">
    <el-input v-model="userName" placeholder="请输入用户名"></el-input>
    <el-input v-model="password" type="password" placeholder="请输入密码" @keyup.enter.native="loginBtn()"></el-input>
    <el-button type="primary" @click="loginBtn">登录</el-button>
  </el-card>
</div>
</template>
<script>
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
          sessionStorage.setItem('isLogin', data.isLogin);
          if (data.isLogin) {
            this.$message({
              message: '登录成功',
              type: 'success'
            });
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
<style scoped>
.content{
  display: flex;
  justify-content:center;
  align-items:Center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: fixed;
  background: url('../../../../static/images/loginBg.jpg');
  background-size: cover;
}
.box-card{
  width: 300px;
  margin: 0 auto;
}
.box-card .el-input{
  margin-top: 15px;
}
.box-card .el-button{
  margin-top: 15px;
  width: 100%;
}
</style>
