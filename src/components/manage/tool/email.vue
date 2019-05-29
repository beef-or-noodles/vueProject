<template>
  <div>
    <el-input v-model="input" placeholder=""></el-input>
    <el-button type="发送邮件" @click="send">发送邮件</el-button>
  </div>
</template>
<script>
export default {
  data(){
    return{
      input:'1948074943@qq.com',
    }
  },
  methods:{
    send(){
      this.$post(this.$api.sendEmail, {emailId:this.input}).then((data) => {});
    },
  }
}
</script>
<style scoped>

</style>
