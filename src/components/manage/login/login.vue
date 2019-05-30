<template>
<div class="content">
  <div class="card">
    <div>

    </div>
    <div>
      <div>
        <h3>Sign Up</h3>
        <div class="input" :class="{inputActive:active}">
            <p>用户名</p>
            <!-- <div class="clear" @click.native="clearA(1)">
                <i class="el-icon-error" v-show="active"></i>
            </div> -->
            <input type="text"  ref="user" @focus="()=>{active = true}" @blur="()=>{active = false}" v-model="userName"/>

        </div>
        <div class="input" :class="{inputActive:active1}">
            <p>密码</p>
            <!-- <div class="clear" @click.native="clearA(2)">
                <i class="el-icon-error" v-show="active1"></i>
            </div> -->
            <input type="password"  ref="pass" @keyup.enter.native="loginBtn()" @focus="()=>{active1 = true}" @blur="()=>{active1 = false}" v-model="password"/>
        </div>
        <div class="btn" @click="loginBtn">
          登 录
        </div>
      </div>

    </div>
  </div>
</div>
</template>
<script>
import {
  mapState,
  mapActions,
  mapGetters,
  mapMutations
} from 'vuex'
export default {
  data() {
    return {
      userName: '',
      password: '',
      active:false,
      active1:false,
    }
  },
  created() {

  },
  methods: {
    // 将用户信息保存在vuex里面
    ...mapMutations(['setUserInfo']),
    clearA(type){
      console.log(type);
      if(type == 1){
        this.userName = "";
        this.$refs.user.focus();
      }else{
        this.password = "";
        this.$refs.pass.focus();
      }
    },
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
              message: '欢迎回来' + data.data[0].userName,
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
.content {
    display: flex;
    justify-content: center;
    align-items: Center;
    flex-direction: column;
    width: 100vw;
    height: 100vh;
    background: url("../../../../static/images/loginBg.jpg");
    background-size: cover;
    position: relative;
}
.content::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: inherit;
    filter: blur(8px);

}

.card {
    background: url("../../../../static/images/loginBg.jpg");
    background-size: cover;
    width: 1000px;
    height: 600px;
    background-color: white;
    box-shadow: 0 0 40px black;
    z-index: 15;
    & > div {
        float: left;
        height: 600px;
    }
    & > div:nth-child(1) {
        width: 600px;
    }
    & > div:nth-child(2) {
        width: 400px;
        background: rgba(0,0,0,0.5);
        & > div {
            margin-top: 150px;
            padding: 0 60px;
            font-family: "Times New Roman";
            h3 {
                color: white;
                font-size: 22px;
            }
        }

    }
}
@inputHeight:25px;
.input{
    &.inputActive{
      color:white !important;
      border-bottom: 1px solid white !important;
    }
    position: relative;
    color: #9a9a9a;
    width:100%;
    margin: 20px 0;
    font-family: "Times New Roman";
    border-bottom: 1px solid #9a9a9a;
    transition: all .36s ease;
    input {
        width: 100%;
        background: none;
        border: none;
        color: #dddddd;
        line-height: @inputHeight;
        height: @inputHeight;
        font-size: 16px;
        margin-top: 5px;
        &:focus{
            outline: none;
        }
    }
    .clear{
      position: absolute;
      z-index: 10;
      right: 0;
    }
    .clear:hover{
      cursor: pointer;
    }
}
.btn{
  font-size: 12px;
    width: 100px;
    line-height: 30px;
    text-align: center;
    color: #9a9a9a;
    border: 1px solid #9a9a9a;
    transition: all .36s ease;
}
.btn:hover{
  color: white;
  border-color: white;
  cursor: pointer;
}
</style>
