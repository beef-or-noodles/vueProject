<template>
    <div class="message">
        <div class="inputbox">
            <div class="icon">
                <img src="" alt="">
            </div>
            <div class="input">
                <div class="input_dom" ref="inputdom" @click="Comment" :style="{height:height+'px'}">
                    <textarea ref="textArea" class="area" placeholder="写下您的评论..."></textarea>
                    <div class="inputBtn">
                        <div v-if="height == 10" class="txt">写下您的评论...</div>
                        <button class="btn" @click.stop="send($refs.textArea.value)">评论</button>
                    </div>
                </div>
            </div>

        </div>
        <div class="messageList">
            <div class="list" v-for="(item,index) in messageData" :key="index">
                <div class="left">
                    <div class="icon">
                        <img :src="item.imgUrl" alt="">
                    </div>
                </div>
                <div class="right">
                    <span class="userName">{{item.userName}}</span><span class="time"  v-text="computedTime(item.creatTime)">几小时</span>
                    <div class="mes" v-text="item.title">这里放标题</div>
                    <div class="answerbox">
                        <div class="userName"><span @click="commentBtn(item,index)">回复</span> ~ <span>{{item.commentTotal}}条回复</span></div>
                        <div class="noice">{{item.like}}赞</div>
                    </div>
                    <div class="comment" :class="'J_input_'+index"></div>
                    <div class="moremessage">
                        <div class="list" v-for="(elem,childIndex) in item.childMessage" :key="childIndex">
                            <div class="left">
                                <div class="icon">
                                    <img :src="elem.imgUrl" alt="">
                                </div>
                            </div>
                            <div class="right">
                                <span class="userName">{{elem.userName}}</span><span class="time" v-text="computedTime(elem.creatTime)">几小时</span>
                                <div class="mes" v-text="elem.title"></div>
                                <div class="answerbox">
                                    <div class="userName"><span @click="commentBtn(elem,index,childIndex)">回复</span></div>
                                    <div class="noice">{{elem.like}}赞</div>
                                </div>
                                <div class="comment" :class="'J_input_'+index+'_'+childIndex"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div @click.self="phoneInput=false" v-show="phoneInput" class="phone" ref="phone"></div>
    </div>
</template>

<script>
    export default {
        name: "wmessage",
        data() {
            return {
              height:10,
              inputdom:null,
              commentItem:"",//评论的选项
              phoneInput:false,
              messageData:[{
                id:1,
                messageId:"",//主消息ID
                userId:1,//用户ID
                articeId:1,//文章id
                userName:"不吃猫的鱼",//用户名
                creatTime:"1576684800000",//创建时间
                imgUrl:"http://p3.pstatp.com/origin/pgc-image/2f6aa96e6ccf4d078b80d376d5f51bad",//头像
                like:100,//赞
                title:"这篇文章很牛逼不吃猫的鱼不吃猫的鱼不吃猫的鱼不吃猫的鱼不吃猫的鱼不吃猫的鱼不吃猫的鱼不吃猫的鱼不吃猫的鱼不吃猫的鱼不吃猫的鱼不吃猫的鱼不吃猫的鱼不吃猫的鱼不吃猫的鱼不吃猫的鱼不吃猫的鱼不吃猫的鱼不吃猫的鱼不吃猫的鱼不吃猫的鱼",//内容
                commentText:"",//评论的评论
                commentUserName:"",//被评论人名字
                commentUserId:"",
                commentTotal:20,//总条数
                childMessage:[{
                  id:2,
                  messageId:2,//主消息ID
                  userId:2,
                  articeId:1,//文章id
                  userName:"一二三",
                  creatTime:"1576339200000",
                  imgUrl:"http://p3.pstatp.com/origin/pgc-image/2f6aa96e6ccf4d078b80d376d5f51bad",
                  like:10,//赞
                  title:"我来评论你！",
                  commentText:"",//评论的评论
                  commentUserName:"",//被评论人名字
                  commentUserId:"",
                },{
                  id:3,
                  messageId:2,//主消息ID
                  userId:2,
                  articeId:1,//文章id
                  userName:"云中君",
                  creatTime:new Date().getTime(),
                  imgUrl:"http://p3.pstatp.com/origin/pgc-image/2f6aa96e6ccf4d078b80d376d5f51bad",
                  like:20,//赞
                  title:"你别乱评论！",//内容
                  commentText:"我来评论你。",//评论的评论
                  commentUserName:"不吃猫的鱼",//被评论人名字
                  commentUserId:1,
                }]
              }]


            }
        },
        created(){

        },
          mounted(){
             this.init();
          },
        methods: {
          computedTime(time){
            return this.$tool.timeago(time)
          },
            //初始化评论框
            init(){
              let inputDom = this.$refs.inputdom
              let cloneDom = inputDom.cloneNode(true);
              let _this = this;
              cloneDom.addEventListener("click",function (e) {
                let _slef = e.target
                let className = _slef.className
                let parent = _slef.offsetParent.offsetParent
                let textarea = parent.firstChild
                if(className == "txt"){ //展开输入框
                  parent.style.height = 140+'px'
                  _slef.style.opacity = 0
                  textarea.focus();
                }else if(className == "btn"){
                  _this.send(textarea.value);
                }
              })
              this.inputdom = cloneDom;
            },
            Comment(){
                this.height = 140;
                this.$refs.textArea.focus()
            },
            // 点击回复文字
            commentBtn(item,index,childIndex){
              let pc = this.$tool.IsPC();
              let inputdom = this.inputdom
              if(pc){ //是pc
                /*将input添加到指定节点*/
                let length = arguments.length;
                let name = length == 2?`J_input_${index}`:`J_input_${index}_${childIndex}`;
                let dom  = document.getElementsByClassName(name)[0];
                inputdom.style.height = 10+'px';
                inputdom.children[1].children[0].style.opacity = 1
                dom.appendChild(inputdom);
              }else{//手机输入框
                this.phoneInput = true
                let dom = this.$refs.phone
                inputdom.style.height = 120+'px';
                inputdom.children[1].children[0].style.opacity = 0
                inputdom.children[0].style.height = 50+'px'
                dom.appendChild(inputdom)
                setTimeout(()=>{
                  inputdom.children[0].focus();
                })
              }
              let arr = this.$tool.copyObj(item);
                arr['index'] = index
                if(childIndex || childIndex == 0){
                  arr['childIndex'] = childIndex
                }
              this.commentItem = arr;
            },
            /*提交数据*/
            send(value=""){
              if(!value){
                return
              }
              let pc = this.$tool.IsPC();
              let inputdom = this.inputdom
              let commentItem = this.commentItem
              if(commentItem){
                if(!pc){
                  let dom = this.$refs.phone
                  dom.removeChild(dom.firstChild)
                  this.phoneInput = false
                }
                  this.commentItem = ""
                  inputdom.firstChild.value = ""
                  inputdom.style.height = 10+'px'
                  inputdom.children[1].firstChild.style.opacity=1
              }else{
                this.$refs.textArea.value = ""
                this.height = 10;
              }


              if (commentItem.hasOwnProperty("index")&&commentItem.hasOwnProperty("childIndex")){//二级回复
                console.log("二级回复");
              }else if(commentItem.hasOwnProperty("index")){
                console.log("一级回复");
              }


              this.messageData.push({
                id:1,
                messageId:"",//主消息ID
                userId:1,//用户ID
                articeId:1,//文章id
                userName:"不吃猫的鱼",//用户名
                creatTime:"1576684800000",//创建时间
                imgUrl:"http://p3.pstatp.com/origin/pgc-image/2f6aa96e6ccf4d078b80d376d5f51bad",//头像
                like:100,//赞
                title:value,
                commentText:"",//评论的评论
                commentUserName:"",//被评论人名字
                commentUserId:"",
                commentTotal:0,//总条数
                childMessage:[]
              })

              console.log(value);
            },
        },
    }
</script>

<style lang="less" scoped>
    .inputbox{
        margin-top: 40px;
        display: flex;
        .icon{
            border-radius: 50%;
            background: #c0ccda;
            margin-right: 15px;
            width: 40px;
            height: 40px;
            img{
            }
        }
        .input{
            width: calc(100% - 60px);
        }
    }
.messageList{
    margin-top: 20px;
    padding: 20px 0;
    border-top: 1px solid #d7e4f2;
    .list{
        display: flex;
        margin-bottom: 15px;
        .left{
            width: 40px;
            height: 40px;
            margin-right: 15px;
            background: #d6e2f0;
            border-radius: 50%;
            overflow: hidden;
            img{
                width: 100%;
            }
        }
        .right{
            font-size: 14px;
            width: calc(100% - 60px);
            .comment{
                margin-top: 15px;
            }
            .userName{
                color: #406599;
                &:hover{
                    cursor: pointer;
                }
            }
            .time{
                margin-left: 10px;
                color: #777;
            }
            .mes{
                line-height: 22px;
                color: #222;
                margin-top: 5px;
            }
            .answerbox{
                display: flex;
                margin-top: 5px;
                position: relative;
                .noice{
                   position: absolute;
                   right: 0;
                }
            }
            .moremessage{
                margin-top: 10px;
                .list{
                    margin-top: 10px;
                }
            }
        }
    }
}
    .input_dom{
        transition: all .36s ease;
        padding: 15px;
        overflow: hidden;
        position: relative;
        box-sizing: border-box;
        box-sizing: content-box;
        border: 1px solid #3f404c;
        .area{
            width: calc(100% - 30px);
            font-size: 16px;
            font-family: inherit;
            border: none;
            position: absolute;
            height: 100px;
        }
        .inputBtn{
            position: absolute;
            bottom: 0;
            height: 40px;
            left: 0;
            background: #f4f5f6;
            width: 100%;
            .btn{
                width: 90px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #3f404c;
                color: white;
                font-weight: 500;
                position: absolute;
                top: 0;
                right: 0;
            }
            .txt{
                float: left;
                font-size: 16px;
                font-family: inherit;
                line-height: 40px;
                padding-left: 15px;
            }
        }
    }
    .phone{
        position: fixed;
        bottom: 0;
        top: 0;
        right: 0;
        left: 0;
        z-index: 999;
        &>div{
            position: absolute;
            bottom: 0;
            width: 100%;
            box-sizing: content-box;
            box-sizing: border-box;
            background-color: white;
        }
    }
</style>
