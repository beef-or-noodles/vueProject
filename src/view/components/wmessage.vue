<template>
    <div class="message">
        <div class="inputbox">
            <div class="icon">
                <img :src="getUserInfo.image" v-if="getUserInfo.image" alt="">
                <i class="icon_txt el-icon-user" v-else></i>
            </div>
            <div class="input">
                <div class="input_dom" ref="inputdom" @click="Comment" :style="{height:height+'px'}">
                    <textarea ref="textArea" class="area" placeholder="写下您的评论..."></textarea>
                    <div class="inputBtn">
                        <div v-if="height == 10" class="txt">写下您的评论...</div>
                        <div class="btn" @click.stop="send($refs.textArea.value)">评论</div>
                    </div>
                </div>
            </div>

        </div>
        <div class="messageList">
            <div class="list" v-for="(item,index) in messageData" :key="index">
                <div class="left">
                    <div class="icon">
                        <img :src="item.image" alt="">
                    </div>
                </div>
                <div class="right">
                    <span class="userName" @click="go_info(item.userId)">{{item.userName}}</span><span class="time"  v-text="computedTime(item.creatTime)">几小时</span>
                    <div class="mes" v-text="item.title">这里放标题</div>
                    <div class="answerbox">
                        <div class="userName">
                            <span v-if="userId != item.userId" @click="commentBtn(item,index)">回复 ~ </span>
                            <span @click="queryCommentChild(item,index)">{{item.commentTotal}}条回复<template v-if="item.commentTotal">{{item.open?'收起':'展开'}}</template></span>
                        </div>
                        <div class="noice" @click="zanClick(item)">
                            <div :class="{active:item.likeActive}" class="liketxt">{{item.likes}}</div>
                            <wstart :active="item.likeActive" :scale=".7"></wstart>
                        </div>
                    </div>
                    <div class="comment" :class="'J_input_'+index"></div>
                    <div class="moremessage">
                        <div class="list" v-for="(elem,childIndex) in item.childMessage" :key="childIndex">
                            <div class="left">
                                <div class="icon">
                                    <img :src="elem.image" alt="">
                                </div>
                            </div>
                            <div class="right">
                                <span class="userName" @click="go_info(elem.userId)">{{elem.userName}}</span><span class="time" v-text="computedTime(elem.creatTime)">几小时</span>
                                <div class="mes">{{elem.title}}
                                    <template v-if="elem.commentUserId">
                                        <span class="userName" @click="go_info(elem.commentUserId)">@{{elem.commentUserName}}：</span><span v-text="elem.commentText"></span>
                                    </template>
                                </div>
                                <div class="answerbox">
                                    <div class="userName"><span v-if="userId != elem.userId" @click="commentBtn(elem,index,childIndex)">回复</span></div>
                                    <div class="noice" @click="zanClick(elem)">
                                        <div :class="{active:elem.likeActive}" class="liketxt">{{elem.likes}}</div>
                                        <wstart :active="elem.likeActive" :scale=".7"></wstart>
                                    </div>
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
    import {mapGetters,mapMutations} from "vuex"
    import wstart from "./componentView/wstart";
    export default {
        name: "wmessage",
        data() {
            return {
              height:10,
              inputdom:null,
              commentItem:"",//评论的选项
              phoneInput:false,
              userId:1,
              messageData:[],
              likesId:[],
                paging: {
                    pageNo: 1,
                    pageSize: 10,
                    total: 0,
                },
            }
        },
      components:{
        wstart
      },
        created(){
            this.paging.pageNo = 1;
            this.userId = this.getUserInfo.id
            this.getList();
        },
        props: {
            articeId: {
                type: Number,
                default: 0
            },
        },
          mounted(){
             this.init();
          },
          activated(){
            console.log("缓存");
          },
        computed:{
            ...mapGetters(["getUserInfo"]),
        },
        watch: {
            articeId(val) {
                this.paging.pageNo = 1;
                this.messageData = []
                this.commentItem = ""
                this.paging={
                    pageNo: 1,
                    pageSize: 5,
                    total: 0,
                }
                this.getList();
            }
        },
        methods: {
          ...mapMutations(["setToast"]),
            go_info(id){
                this.$router.push({
                    path:"/userInfo/"+id
                })
            },
          computedTime(time){
              let d = time;
            if (typeof time === "string") {
                d = new Date(time).getTime()
            }
            return this.$tool.timeago(d)
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
                if(!this.getUserInfo.hasOwnProperty("id")){
                  this.setToast({show:true,icon:"warning",title:"请先登录"})
                  setTimeout(()=>{
                     this.$router.push({
                        name:"login",
                        params:{isview:true}
                    })
                  },2000);

                }
              if(!value){
                return
              }
              let message = {
                messageId:0,//主消息ID
                userId:this.getUserInfo.id,//用户ID
                articeId:this.articeId,//文章id
                userName:this.getUserInfo.userName,//用户名
                image:this.getUserInfo.image,//头像
                creatTime:new Date().getTime(),
                likes:0,//赞
                title:value,
                commentText:"",//评论的评论
                commentUserName:"",//被评论人名字
                commentUserId:"",
                commentTotal:0,//总条数
                childMessage:[]
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
                let name = "";
                  message.commentText = commentItem.title;
                  message.commentUserName = commentItem.userName;
                if (commentItem.hasOwnProperty("index")&&commentItem.hasOwnProperty("childIndex")){//二级回复

                  console.log("二级回复");
                  message.messageId = commentItem.messageId;
                  message.commentUserId = commentItem.userId
                  name = `J_input_${commentItem.index}_${commentItem.childIndex}`;
                    this.addComment(message,()=>{
                        this.messageData[commentItem.index].commentTotal ++
                        this.messageData[commentItem.index].childMessage.splice(commentItem.childIndex+1,0,message);
                        let dom = document.getElementsByClassName(name)[0]
                        dom.removeChild(dom.firstChild)
                    })
                }else if(commentItem.hasOwnProperty("index")){
                  console.log("一级回复");
                  message.messageId = commentItem.id;
                  message.commentUserId = null
                  name = `J_input_${commentItem.index}_${commentItem.childIndex}`;
                  this.addComment(message,()=>{
                      this.messageData[commentItem.index].commentTotal ++
                      this.messageData[commentItem.index].childMessage.push(message)
                      /*let dom = document.getElementsByClassName(name)[0]*/
                      /*dom.removeChild(dom.firstChild)*/
                  })
                }
              }else{
                  this.addComment(message,()=>{
                      this.messageData.unshift(message)
                      this.$refs.textArea.value = ""
                      this.height = 10;
                  })

              }
            },
            addComment(params,f){
                this.$post(this.$api.addComment, params).then((data) => {
                    f()
                });
            },

            getList(){
                this.paging['articeId'] = this.articeId;
                this.$post(this.$api.queryComment, this.paging).then((data) => {
                    data.data.forEach(itme=>{
                        itme["childMessage"] = [];
                        itme["open"] = false;
                        itme["likeActive"] = false;
                    })
                    this.messageData.push(...data.data)
                    this.paging.total = data.total
                });
            },
            pagingData(){
                if(this.paging.pageNo*this.paging.pageSize < this.paging.total){
                    this.paging.pageNo++;
                    this.getList()
                }else{
                    console.log("没有更多了");
                }
            },

            //查询子回复
            queryCommentChild(item,index){
                if(item.commentTotal == 0) return

                if(!item.open){
                    let params = {
                        pageNo: 1,
                        pageSize: 5,
                        messageId:item.id
                    }
                    this.$post(this.$api.queryCommentChild, params).then((data) => {
                        this.messageData[index].childMessage.push(...data.data)
                        item.open = true;
                    });
                }else{
                    this.messageData[index].childMessage = []
                    item.open = false;
                }

            },
            zanClick(item){
              if(this.likesId.indexOf(item.id)!=-1){
                this.setToast({show:true,icon:"warning",title:"已经赞过啦"})
                return
              }
                this.$post(this.$api.clickLikes, {id:item.id}).then((data) => {
                    this.likesId.push(item.id)
                    item["likeActive"] = true;
                    item.likes++
                });
            }
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
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            .icon_txt{
                color: #ffffff;
                font-size: 25px;
            }
            img{
                width: 100%;
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
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    right: -35px;
                    top: -40px;
                    .liketxt{
                        margin-right: -35px;
                        &.active{
                            color: #e64f2a;
                        }
                    }
                    &:hover{
                        cursor: pointer;
                    }
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
        background: white;
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
