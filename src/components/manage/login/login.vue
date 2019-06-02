<template>
<div class="content">
  <div class="card">
    <div>

    </div>
    <div class="rightBox">
      <div class="loginBox" :class="{left:activeMove}">
        <h3>Sign Up</h3>
        <w-input title="用户名" v-model="userName"></w-input>
        <w-input type="password" title="密码" v-model="password"></w-input>
        <div style="margin-top:20px;">
            <div class="zc" @click="activeMove = true">
                没有账号？立即注册
            </div>
            <div class="btn" @click="loginBtn">
              登 录
            </div>
        </div>
      </div>
      <div class="zcBox" :class="{right:activeMove}">
          <h3>Sign Up</h3>
          <w-input title="用户名" v-model="userName1"></w-input>
          <w-input type="password" title="密码" v-model="password1"></w-input>
          <w-input type="password" title="确认密码" v-model="password2"></w-input>
          <w-input title="QQ邮箱" v-model="password2"></w-input>
          <div>
            <div class="btn codebtn">
              邮箱验证码
            </div>
            <div class="code" >
              <w-input v-model="code" placeholder="验证码"></w-input>
            </div>
          </div>

          <div style="margin-top:20px;">
              <div class="zc" @click="activeMove = false">
                  去登录
              </div>
              <div class="btn" @click="loginBtn">
                立即注册
              </div>
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
import wInput from '../components/wInput'
export default {
  components: {
    wInput
  },
  data() {
    return {
      userName: '',
      password: '',

      userName1: '',
      password1: '',
      password2: '',

      code:'',

      active:false,
      active1:false,
      active2:false,
      zc:false,
      login:false,
      activeMove:false,
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
    background-color: white;
    box-shadow: 0 0 40px black;
    z-index: 15;
    & > div {
        float: left;
        height: 600px;
    }
    & > div:nth-child(1) {
        width: 600px;
        transition: all .36s ease;
    }
    & > div:nth-child(2) {
        width: 370px;
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
@media screen and (max-width: 1005px) {
    .card > div:nth-child(1){
        width: 0;
    }
}

@inputColor:#b1b1b1;

.zc{
    float: right;
    font-size: 12px;
    color: @inputColor;
    &:hover{
        cursor: pointer;
        color: white;
    }
}
.btn{
  font-size: 12px;
    width: 100px;
    line-height: 30px;
    text-align: center;
    color: @inputColor;
    border: 1px solid @inputColor;
    transition: all .46s ease;
}
.btn:hover{
  color: white;
  border-color: white;
  cursor: pointer;
}

.code{
  width: 140px;
}
.codebtn{
  float:right;
  line-height: 25px;
  width: 80px;
  margin-top: 5px;
}
.rightBox{
    position: relative;
    overflow: hidden;
    .loginBox{
        position: absolute;
        width: 250px;
        left: 0;
        transition: all .36s ease;
        &.left{
            left: -370px;
        }
    }
    .zcBox{
        position: absolute;
        width: 250px;
        left: 370px;
        top:-80px;
        transition: all .46s ease;
        &.right{
            left: 0px;
        }
    }
}


</style>
