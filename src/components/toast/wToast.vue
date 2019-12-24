<template>
    <transition name="slide-fade">
        <div v-show="toast.show">
            <div class="shade" id="shade">
                <div class="loading">
                    <div id="loading-center-absolute" v-if="toast.icon == 'loading'">
                        <div id="object"></div>
                    </div>
                    <div class="font" v-else>
                        <i class="iconfont" :class="iconType"></i>
                    </div>
                    <div class="loadingText" v-text="toast.title"></div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
  import {mapMutations,mapState} from "vuex";
  export default {
    name: "wToast",
    data() {
      return {

      }
    },
    watch: {
      toast(value) {
        if(value.show && value.icon != "loading"){
          setTimeout(()=>{
            this.setToast({icon:value.icon,title:value.title});
          },value.time)
        }
      }
    },
    computed: {
      ...mapState({
        toast:(state)=>state.userData.toast
      }),
      iconType(){
        let toast = this.toast
        if(toast.icon==="error"){
          return "icon-cuowu"
        }else if(toast.icon==="success"){
          return "icon-zhengquetishi"
        }else if(toast.icon==="warning"){
          return "icon-jinggao"
        }
      }
    },
    methods: {
        ...mapMutations(["setToast"])
    },
  }
</script>

<style lang="less" scoped>
    /* 可以设置不同的进入和离开动画 */
    /* 设置持续时间和动画函数 */
    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to{
        opacity: 0;
    }
    #shade {
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 9999;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    #shade .loading {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 110px;
        height: 110px;
        background: rgba(0, 0, 0, .4);
        border-radius: 10px;
        font-size: 14px;
        color: white;
        flex-direction: column;
        .font{
            .iconfont{
                font-size: 40px;
            }
        }
    }

    .loadingText {
        margin-top: 5px;
    }

    #object {
        width: 50px;
        height: 50px;
        background: linear-gradient(to right, #4568DC, #B06AB3);
        background: #4568DC;
        background: -webkit-gradient(linear, left top, right top, from(#B06AB3), to(#4568DC));
        -webkit-animation: animate 1s infinite ease-in-out;
        animation: animate 1s infinite ease-in-out;
    }

    @-webkit-keyframes animate {
        0% {
            -webkit-transform: perspective(160px);
        }
        50% {
            -webkit-transform: perspective(160px) rotateY(-180deg);
        }
        100% {
            -webkit-transform: perspective(160px) rotateY(-180deg) rotateX(-180deg);
        }
    }

    @keyframes animate {
        0% {
            transform: perspective(160px) rotateX(0deg) rotateY(0deg);
            -webkit-transform: perspective(160px) rotateX(0deg) rotateY(0deg);
        }
        50% {
            transform: perspective(160px) rotateX(-180deg) rotateY(0deg);
            -webkit-transform: perspective(160px) rotateX(-180deg) rotateY(0deg);
        }
        100% {
            transform: perspective(160px) rotateX(-180deg) rotateY(-180deg);
            -webkit-transform: perspective(160px) rotateX(-180deg) rotateY(-180deg);
        }
    }
</style>
