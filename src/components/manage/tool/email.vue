<template>
  <div class="email">
<!--    <el-input v-model="input" placeholder=""></el-input>-->
<!--    <el-button type="发送邮件" @click="send">发送邮件</el-button>-->
    <div class="emailBox">
      <button class="btn" @click="send">发送<i class="el-icon-d-arrow-right"></i></button>
      <w-input title="收件人" :isActive="false" v-model="form.emailId"></w-input>
      <w-input title="主题" :isActive="false"  v-model="form.subtxt"></w-input>
      <br>
      <div>内容</div>
      <br>
      <wang-edit v-model="form.content" :isClear="isClear" @change="change"></wang-edit>
    </div>
  </div>
</template>
<script>
  import wInput from '../components/wInput'
  import wangEdit from '../publicComponents/wangEditor'
export default {
    components:{
      wInput,
      wangEdit
    },
  data(){
    return{
      form:{
        emailId:"",
        subtxt:"",
        content:"",
      },
      isClear: false,
    }
  },
  methods:{
    send(){
      let form = this.form
      var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
      if(form.emailId == ""){
        this.$message({
          type:"error",
          message:"请输入收件人"
        })
        return false
      }else if(!reg.test(form.emailId)){
        this.$message({
          type:"error",
          message:"请输入正确的邮箱"
        })
        return false
      }else if(form.subtxt == ""){
        this.$message({
          type:"error",
          message:"请输入邮件主题"
        })
        return false
      }else if(form.content == ""){
        this.$message({
          type:"error",
          message:"请输入邮件内容"
        })
        return false
      }
      this.$post(this.$api.sendEmail, this.form).then((data) => {
        this.$message({
          type:"success",
          message:"邮件发送成功"
        })
        this.form={
          emailId:"",
          subtxt:"",
          content:"",
        }
      });
    },
    // 富文本编辑框改变事件
    change(val) {
      this.form.content = val;
    },
  }
}
</script>
<style lang="less">
  .emailBox{
    .text{
      height: 400px;
    }
  }

</style>
<style lang="less" scoped>
.email{
  overflow: auto;
  .emailBox{
    background:white;
    margin: 0 auto;
    padding: 30px 25px 20px 25px;
    box-sizing: border-box;
    border-top-right-radius: 35px;
    border-bottom-left-radius: 35px;
    position: relative;
    width: 800px;
    &::after{
      content: "";
      display: block;
      position: absolute;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      border: 4px solid #409eff;
      top: 15px;
      left: 15px;
    }
    .btn{
      position: absolute;
      top: 15px;
      right: 15px;
      width: 80px;
      line-height: 25px;
      text-align: center;
      background: none;
      border: 1px solid #409eff;
      color: #409eff;
      transition: all .36s ease;
      &:hover{
        cursor: pointer;
        color: red;
        border: 1px solid red;
      }
    }
  }
  .title{
    color: white;
  }
}
</style>
