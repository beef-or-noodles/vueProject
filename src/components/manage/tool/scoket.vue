<template>
    <div class="scoketBox">
        <div class="left">
            <div class="listBox" v-for="(item,index) in dataList" @click="activeUser(index)" :key="index" :class="{activeClass:item.active}">
                <div class="icon">
                    <img src="" alt="">
                </div>
                <div class="title">
                    <h5>{{item.name}}</h5>
                </div>
            </div>
        </div>
        <div class="right">
            <div class="top"></div>
            <div class="content" ref="box">
                <div class="item" v-for="elem in messageList">
                    <div class="itembox" :class="{rightItem:elem.userID == userID}">
                        <div class="icon">
                            <img :src="elem.imgUrl" alt="">
                        </div>
                        <div class="message">
                            {{elem.message}}
                        </div>
                        <div class="ic"></div>
                    </div>
                </div>
            </div>
            <div class="input">
                <el-input
                        type="textarea"
                        :autosize="{ minRows: 4, maxRows: 4}"
                        v-model="input"
                        v-on:keyup.enter.native="send">
                    </el-input>
                <div class="bottom">
                    <el-button size="small">清空</el-button>
                    <el-button size="small" type="primary" plain @click="send">发送</el-button>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import Vue from "vue"
    import VueSocketIO from 'vue-socket.io';//socket
    export default {
        name: "scoket",
        data() {
            return {
                input:"",
                userID:1,
                dataList:[{
                    imgUrl:"",
                    name:"迷路的猪猪侠",
                    active:false,
                }],
                messageList:[],

                id: '',

            }
        },
        created(){
            let httpUrl = 'http://localhost:8889';
            if (process.env.NODE_ENV === 'production') { //生产环境使用
                httpUrl = location.host
            }
            Vue.use(new VueSocketIO({
                debug: true,
                connection:httpUrl,  //location.host;http://localhost:8889
            }))
        },
        sockets:{
            connect() {
                this.id = this.$socket.id;
                this.$socket.emit('login', "我登录了");      //监听connect事件
            },
            message(data) {
                 //监听message事件，方法是后台定义和提供的
                let messag = JSON.parse(data);
                this.messageList.push({
                    imgUrl:"http://img4.imgtn.bdimg.com/it/u=4228113134,2313429504&fm=26&gp=0.jpg",
                    userID:2,
                    message:messag.message
                })
                setTimeout(()=>{
                    let box =  this.$refs.box
                    box.scrollTop = box.scrollHeight;
                },20)
            }
        },
        methods: {
            activeUser(index) {
                this.dataList.forEach(item=>{
                    item.active = false;
                });
                this.dataList[index].active = true;
            },
            send(){
                if (this.input == ""){
                    this.$message({
                        type:'error',
                        message:"请输入消息",
                    })
                    return false;
                }
                let message={
                    name:'小明',
                    message:this.input
                }
                this.$socket.emit('sendX', JSON.stringify(message),(data)=>{
                    console.log("接收后台数据",data);
                });
                this.messageList.push({
                    imgUrl:"http://img4.imgtn.bdimg.com/it/u=4228113134,2313429504&fm=26&gp=0.jpg",
                    userID:1,
                    message:this.input
                })
                this.input = "";
                setTimeout(()=>{
                    let box =  this.$refs.box
                    box.scrollTop = box.scrollHeight;
                },20)

            }
        },
    }
</script>

<style lang="less" scoped>
.scoketBox{
    overflow: auto;
    background: #fafafa;
    &>div{
        float: left;
    }
    .left{
        overflow: auto;
    }
    .listBox{
        width: 100%;
        height: 60px;
        border-bottom: 2px solid white;
        display: flex;
        align-items: center;
        justify-items: center;
        &.activeClass{
            border-color: #409EFF;
            background: #e7f5fa;
        }
        &:hover{
            cursor: pointer;
        }
        .icon{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            overflow: hidden;
            margin-left: 10px;
            img{
                width: 100%;
                height: 100%;
            }
        }
        .title{
            margin-left: 15px;
        }
    }
    .right{
        width: 800px;
        height: 700px;
        .top{
            height: 60px;
            width: 100%;
        }
        .content{
            height: 450px;
            width: 100%;
            overflow: auto;
            .item{
                width: 100%;
                overflow: hidden;

                .itembox{
                    &.rightItem{
                        &>div{
                            float: right;
                        }
                        .message{
                            margin-right: 10px;
                            margin-left: 0px;
                        }
                        .ic{
                            transform: rotateY(0deg);   /* 水平镜像翻转 */
                        }
                    }
                    &>div{
                        float: left;
                    }
                    .message{

                        background-size: 100% 100%;
                        margin-bottom: 15px;
                        color: #4e4e4e;
                        padding: 5px;
                        margin-left: 10px;
                        margin-top: 5px;
                        max-width: 70%;
                        border-radius: 5px;
                    }
                    .ic{

                        width: 35px;
                        height: 35px;
                        background-size: 100% 100%;
                        transform: rotateY(180deg);   /* 水平镜像翻转 */
                    }
                    .icon{
                        width: 35px;
                        height: 35px;
                        border-radius: 50%;
                        overflow: hidden;
                        img{
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
            }
        }
        .input{
            height: 140px;
            width: 100%;
            margin-top: 15px;
            .bottom{
                text-align: right;
                padding-top: 10px;
            }
        }
    }
}
</style>
