<template>
<div class="input" :class="{inputActive:active&&isActive,isActive:!isActive}">
  <p>{{title}}</p>
  <input :type="type" ref="input" :placeholder="placeholder" @input="changeTxt($event.target.value)" @focus="()=>{active = true}" @blur="()=>{active = false}" />
</div>
</template>
<script>
export default {
  model: {
    prop: 'name',
    event: "change"
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
    }, //标题名字
    name: {
      type: [String, Number],
      default: '',
    }, //值得名字
    placeholder: {
      type: [String],
      default: '',
    }, //提示文字
    type: {
      type: [String],
      default: 'text'
    }, //输入框原生type
    isActive:{ //是否显示选中状态
      type: [Boolean],
      default: true
    }
  },
  mounted() {
    this.$refs["input"].value = this.name;
  },
  watch:{
    name(val){
      this.$refs["input"].value = this.name;
    }
  },
  methods: {
    changeTxt(val) {
      this.$emit('change', val);
    }
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
    &.isActive{
      color: #444444 !important;
      input{
        color: #000 !important;
      }
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
        font-size: 14px;
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
