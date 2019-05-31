<template>
<div class="input" :class="{inputActive:active}">
  <p>{{title}}</p>
  <input type="text" :placeholder="placeholder" ref="user" @focus="()=>{active = true}" @blur="()=>{active = false}" v-model="name" />
</div>
</template>
<script>
export default {
  model: {
    prop: 'name',
  },
  data() {
    return {
      active: false,
    }
  },
  props: {
    title: {
      type: [String],
      default: '',
    },
    name: {
      type: [String, Number],
      default: '',
    },
    placeholder: {
      type: [String],
      default: '',
    }
  },
  created() {

  },
  methods: {

  }
}
</script>
<style scoped lang="less">
@inputHeight: 25px;
@inputColor: #b1b1b1;
.input {
    &.inputActive {
        color: white !important;
        border-bottom: 1px solid white !important;
    }
    position: relative;
    color: @inputColor;
    width: 100%;
    margin-top: 20px;
    font-family: "Times New Roman";
    border-bottom: 1px solid @inputColor;
    transition: all 0.36s ease;
    input {
        width: 100%;
        background: none;
        border: none;
        color: #dddddd;
        line-height: @inputHeight;
        height: @inputHeight;
        font-size: 16px;
        margin-top: 5px;
        &:focus {
            outline: none;
        }
        &::-webkit-input-placeholder {
            color: @inputColor;
            font-size: 12px;
        }
        &::-moz-placeholder {
            /* Mozilla Firefox 19+ */
            color: @inputColor;
            font-size: 12px;
        }
        &:-moz-placeholder {
            /* Mozilla Firefox 4 to 18 */
            color: @inputColor;
            font-size: 12px;
        }
        &:-ms-input-placeholder {
            /* Internet Explorer 10-11 */
            color: @inputColor;
            font-size: 12px;
        }
    }
}
</style>
