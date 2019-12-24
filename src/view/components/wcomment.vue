<template>
    <div>
        <wmessage ref="wmessage"></wmessage>
    </div>
</template>

<script>
    import wmessage from "./wmessage"
    export default {
        name: "wcomment",
        components:{
            wmessage
        },
        data() {
            return {

            }
        },
      methods:{
        pagingData(){
          this.$refs.wmessage.pagingData();
        }
      }
    }
</script>

<style lang="less" scoped>

</style>
