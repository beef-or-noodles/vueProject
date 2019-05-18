<template>
  <div>
    主页开发中
    <el-input v-model="input" placeholder=""></el-input>
    <el-button type="发送邮件" @click="send">发送邮件</el-button>
  </div>
</template>
<script>
export default {
  name: "",
  data(){
    return{
      input:'1948074943@qq.com',
    }
  },
  methods: {
    send() {
      this.$post(this.$api.sendEmail, {input:this.input}).then((data) => {

      });
    }
  }

}
</script>
<style scoped>
</style>
