<template>
    <div class="heart" :class="{'is-active':active}" :style="['transform:scale('+scale+')']"></div>
</template>

<script>
  export default {
    name: "wstart",
    props: {
      active: {
        type: Boolean,
        default: false
      },
      scale:{ //缩放比例
        type:Number,
        default: .7
      }
    },
  }
</script>

<style scoped>
    .heart {
        width: 100px;
        height: 100px;
        background: url("../../../../static/images/heart.png") no-repeat;
        background-position: 0 0;
        cursor: pointer;
        -webkit-transition: background-position 1s steps(28);
        transition: background-position 1s steps(28);
        -webkit-transition-duration: 0s;
        transition-duration: 0s;
        transform: scale(.7);
    }
    .heart.is-active {
        -webkit-transition-duration: 1s;
        transition-duration: 1s;
        background-position: -2800px 0;
    }
</style>
