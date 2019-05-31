<template>
<div class="content">
  <div class="card">
    <div>

    </div>
    <div class="rightBox">
      <div class="loginBox" :class="{left:activeMove}">
        <h3>Sign Up</h3>
        <div class="input" :class="{inputActive:active}">
            <p>用户名</p>
            <input type="text"  ref="user" @focus="()=>{active = true}" @blur="()=>{active = false}" v-model="userName"/>
        </div>
        <div class="input" :class="{inputActive:active1}">
            <p>密码</p>
            <input type="password"  ref="pass" @keyup.enter.stop="loginBtn()" @focus="()=>{active1 = true}" @blur="()=>{active1 = false}" v-model="password"/>
        </div>
        <div>
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
          <div class="input" :class="{inputActive:active}">
              <p>用户名</p>
              <input type="text"  ref="user" @focus="()=>{active = true}" @blur="()=>{active = false}" v-model="userName"/>

          </div>
          <div class="input" :class="{inputActive:active1}">
              <p>密码</p>
              <input type="password"  ref="pass" @keyup.enter.stop="loginBtn()" @focus="()=>{active1 = true}" @blur="()=>{active1 = false}" v-model="password"/>
          </div>
          <div class="input" :class="{inputActive:active2}">
              <p>确认密码</p>
              <input type="password"  ref="pass" @keyup.enter.stop="loginBtn()" @focus="()=>{active2 = true}" @blur="()=>{active2 = false}" v-model="password"/>
          </div>
          <div>
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
export default {
  data() {
    return {
      userName: '',
      password: '',
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

@inputHeight:25px;@inputColor:#b1b1b1;
.input{
    &.inputActive{
      color:white !important;
      border-bottom: 1px solid white !important;
    }
    position: relative;
    color: @inputColor;
    width:100%;
    margin: 20px 0;
    font-family: "Times New Roman";
    border-bottom: 1px solid @inputColor;
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
}
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
        transition: all .46s ease;
        &.right{
            left: 0px;
        }
    }
}


</style>
