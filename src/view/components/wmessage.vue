<template>
    <div class="message">
        <div class="inputbox">
            <div class="icon">
                <img :src="getUserInfo.image" v-if="getUserInfo.image" alt="">
                <i class="icon_txt el-icon-user" v-else></i>
            </div>
            <div class="input">
                <div class="input_dom" ref="inputdom" @click="Comment" :style="{height:height+'px'}">
                    <div contenteditable="true" ref="textArea" class="area" placeholder="写下您的评论...">
                      </div>
                    <div class="inputBtn">
                        <div v-if="height == 10" class="txt">写下您的评论...</div>
                        <div v-show="height != 10" class="bq" @click="showGif($event,1)"><img src="http://39.99.193.63:8889/gif/jiyan.gif" alt=""></div>
                        <div class="btn" @click.stop="send($refs.textArea.innerHTML)">评论</div>
                    </div>
                </div>
            </div>
            <div class="gifDom" ref="gifDom" @click.stop="closeGif($event)">
                <div class="gifList" ref="gifList">
                    <ul>
                        <li title="微笑"><img data-src="http://39.99.193.63:8889/gif/weixiao.gif" src="http://39.99.193.63:8889/gif/weixiao.gif"></li>
                        <li title="嘻嘻"><img data-src="http://39.99.193.63:8889/gif/xixi.gif" src="http://39.99.193.63:8889/gif/xixi.gif"></li>
                        <li title="哈哈"><img data-src="http://39.99.193.63:8889/gif/haha.gif" src="http://39.99.193.63:8889/gif/haha.gif"></li>
                        <li title="可爱"><img data-src="http://39.99.193.63:8889/gif/keai.gif" src="http://39.99.193.63:8889/gif/keai.gif"></li>
                        <li title="可怜"><img data-src="http://39.99.193.63:8889/gif/kelian.gif" src="http://39.99.193.63:8889/gif/kelian.gif"></li>
                        <li title="挖鼻"><img data-src="http://39.99.193.63:8889/gif/wabi.gif" src="http://39.99.193.63:8889/gif/wabi.gif"></li>
                        <li title="吃惊"><img data-src="http://39.99.193.63:8889/gif/chijing.gif" src="http://39.99.193.63:8889/gif/chijing.gif"></li>
                        <li title="害羞"><img data-src="http://39.99.193.63:8889/gif/haixiu.gif" src="http://39.99.193.63:8889/gif/haixiu.gif"></li>
                        <li title="挤眼"><img data-src="http://39.99.193.63:8889/gif/jiyan.gif" src="http://39.99.193.63:8889/gif/jiyan.gif"></li>
                        <li title="闭嘴"><img data-src="http://39.99.193.63:8889/gif/bizui.gif" src="http://39.99.193.63:8889/gif/bizui.gif"></li>
                        <li title="鄙视"><img data-src="http://39.99.193.63:8889/gif/bishi.gif" src="http://39.99.193.63:8889/gif/bishi.gif"></li>
                        <li title="爱你"><img data-src="http://39.99.193.63:8889/gif/aini.gif" src="http://39.99.193.63:8889/gif/aini.gif"></li>
                        <li title="泪"><img data-src="http://39.99.193.63:8889/gif/lei.gif" src="http://39.99.193.63:8889/gif/lei.gif"></li>
                        <li title="偷笑"><img data-src="http://39.99.193.63:8889/gif/touxiao.gif" src="http://39.99.193.63:8889/gif/touxiao.gif"></li>
                        <li title="亲亲"><img data-src="http://39.99.193.63:8889/gif/qinqin.gif" src="http://39.99.193.63:8889/gif/qinqin.gif"></li>
                        <li title="生病"><img data-src="http://39.99.193.63:8889/gif/shengbing.gif" src="http://39.99.193.63:8889/gif/shengbing.gif"></li>
                        <li title="太开心"><img data-src="http://39.99.193.63:8889/gif/taikaixin.gif" src="http://39.99.193.63:8889/gif/taikaixin.gif"></li>
                        <li title="白眼"><img data-src="http://39.99.193.63:8889/gif/baiyan.gif" src="http://39.99.193.63:8889/gif/baiyan.gif"></li>
                        <li title="右哼哼"><img data-src="http://39.99.193.63:8889/gif/youhengheng.gif" src="http://39.99.193.63:8889/gif/youhengheng.gif"></li>
                        <li title="左哼哼"><img data-src="http://39.99.193.63:8889/gif/zuohengheng.gif" src="http://39.99.193.63:8889/gif/zuohengheng.gif"></li>
                        <li title="嘘"><img data-src="http://39.99.193.63:8889/gif/xu.gif" src="http://39.99.193.63:8889/gif/xu.gif"></li>
                        <li title="衰"><img data-src="http://39.99.193.63:8889/gif/shuai.gif" src="http://39.99.193.63:8889/gif/shuai.gif"></li>
                        <li title="吐"><img data-src="http://39.99.193.63:8889/gif/tu.gif" src="http://39.99.193.63:8889/gif/tu.gif"></li>
                        <li title="哈欠"><img data-src="http://39.99.193.63:8889/gif/haqian.gif" src="http://39.99.193.63:8889/gif/haqian.gif"></li>
                        <li title="抱抱"><img data-src="http://39.99.193.63:8889/gif/baobao.gif" src="http://39.99.193.63:8889/gif/baobao.gif"></li>
                        <li title="怒"><img data-src="http://39.99.193.63:8889/gif/nu.gif" src="http://39.99.193.63:8889/gif/nu.gif"></li>
                        <li title="疑问"><img data-src="http://39.99.193.63:8889/gif/yiwen.gif" src="http://39.99.193.63:8889/gif/yiwen.gif"></li>
                        <li title="馋嘴"><img data-src="http://39.99.193.63:8889/gif/chanzui.gif" src="http://39.99.193.63:8889/gif/chanzui.gif"></li>
                        <li title="拜拜"><img data-src="http://39.99.193.63:8889/gif/baibai.gif" src="http://39.99.193.63:8889/gif/baibai.gif"></li>
                        <li title="思考"><img data-src="http://39.99.193.63:8889/gif/sikao.gif" src="http://39.99.193.63:8889/gif/sikao.gif"></li>
                        <li title="汗"><img data-src="http://39.99.193.63:8889/gif/han.gif" src="http://39.99.193.63:8889/gif/han.gif"></li>
                        <li title="困"><img data-src="http://39.99.193.63:8889/gif/kun.gif" src="http://39.99.193.63:8889/gif/kun.gif"></li>
                        <li title="睡"><img data-src="http://39.99.193.63:8889/gif/shui.gif" src="http://39.99.193.63:8889/gif/shui.gif"></li>
                        <li title="钱"><img data-src="http://39.99.193.63:8889/gif/qian.gif" src="http://39.99.193.63:8889/gif/qian.gif"></li>
                        <li title="失望"><img data-src="http://39.99.193.63:8889/gif/shiwang.gif" src="http://39.99.193.63:8889/gif/shiwang.gif"></li>
                        <li title="酷"><img data-src="http://39.99.193.63:8889/gif/ku.gif" src="http://39.99.193.63:8889/gif/ku.gif"></li>
                        <li title="色"><img data-src="http://39.99.193.63:8889/gif/se.gif" src="http://39.99.193.63:8889/gif/se.gif"></li>
                        <li title="哼"><img data-src="http://39.99.193.63:8889/gif/heng.gif" src="http://39.99.193.63:8889/gif/heng.gif"></li>
                        <li title="鼓掌"><img data-src="http://39.99.193.63:8889/gif/guzhang.gif" src="http://39.99.193.63:8889/gif/guzhang.gif"></li>
                        <li title="晕"><img data-src="http://39.99.193.63:8889/gif/yun.gif" src="http://39.99.193.63:8889/gif/yun.gif"></li>
                        <li title="悲伤"><img data-src="http://39.99.193.63:8889/gif/beishang.gif" src="http://39.99.193.63:8889/gif/beishang.gif"></li>
                        <li title="抓狂"><img data-src="http://39.99.193.63:8889/gif/zhuakuang.gif" src="http://39.99.193.63:8889/gif/zhuakuang.gif"></li>
                        <li title="黑线"><img data-src="http://39.99.193.63:8889/gif/heixian.gif" src="http://39.99.193.63:8889/gif/heixian.gif"></li>
                        <li title="阴险"><img data-src="http://39.99.193.63:8889/gif/yinxian.gif" src="http://39.99.193.63:8889/gif/yinxian.gif"></li>
                        <li title="怒骂"><img data-src="http://39.99.193.63:8889/gif/numa.gif" src="http://39.99.193.63:8889/gif/numa.gif"></li>
                        <li title="互粉"><img data-src="http://39.99.193.63:8889/gif/hufen.gif" src="http://39.99.193.63:8889/gif/hufen.gif"></li>
                        <li title="书呆子"><img data-src="http://39.99.193.63:8889/gif/shudaizi.gif" src="http://39.99.193.63:8889/gif/shudaizi.gif"></li>
                        <li title="愤怒"><img data-src="http://39.99.193.63:8889/gif/fennu.gif" src="http://39.99.193.63:8889/gif/fennu.gif"></li>
                        <li title="感冒"><img data-src="http://39.99.193.63:8889/gif/ganmao.gif" src="http://39.99.193.63:8889/gif/ganmao.gif"></li>
                        <li title="心"><img data-src="http://39.99.193.63:8889/gif/xin.gif" src="http://39.99.193.63:8889/gif/xin.gif"></li>
                        <li title="伤心"><img data-src="http://39.99.193.63:8889/gif/shangxin.gif" src="http://39.99.193.63:8889/gif/shangxin.gif"></li>
                        <li title="猪"><img data-src="http://39.99.193.63:8889/gif/zhu.gif" src="http://39.99.193.63:8889/gif/zhu.gif"></li>
                        <li title="熊猫"><img data-src="http://39.99.193.63:8889/gif/xiongmao.gif" src="http://39.99.193.63:8889/gif/xiongmao.gif"></li>
                        <li title="兔子"><img data-src="http://39.99.193.63:8889/gif/tuzi.gif" src="http://39.99.193.63:8889/gif/tuzi.gif"></li>
                        <li title="OK"><img data-src="http://39.99.193.63:8889/gif/ok.gif" src="http://39.99.193.63:8889/gif/ok.gif"></li>
                        <li title="耶"><img data-src="http://39.99.193.63:8889/gif/ye.gif" src="http://39.99.193.63:8889/gif/ye.gif"></li>
                        <li title="GOOD"><img data-src="http://39.99.193.63:8889/gif/good.gif" src="http://39.99.193.63:8889/gif/good.gif"></li>
                        <li title="NO"><img data-src="http://39.99.193.63:8889/gif/no.gif" src="http://39.99.193.63:8889/gif/no.gif"></li>
                        <li title="赞"><img data-src="http://39.99.193.63:8889/gif/zan.gif" src="http://39.99.193.63:8889/gif/zan.gif"></li>
                        <li title="来"><img data-src="http://39.99.193.63:8889/gif/lai.gif" src="http://39.99.193.63:8889/gif/lai.gif"></li>
                        <li title="弱"><img data-src="http://39.99.193.63:8889/gif/ruo.gif" src="http://39.99.193.63:8889/gif/ruo.gif"></li>
                        <li title="草泥马"><img data-src="http://39.99.193.63:8889/gif/caonima.gif" src="http://39.99.193.63:8889/gif/caonima.gif"></li>
                        <li title="神马"><img data-src="http://39.99.193.63:8889/gif/shenma.gif" src="http://39.99.193.63:8889/gif/shenma.gif"></li>
                        <li title="囧"><img data-src="http://39.99.193.63:8889/gif/jiong.gif" src="http://39.99.193.63:8889/gif/jiong.gif"></li>
                        <li title="浮云"><img data-src="http://39.99.193.63:8889/gif/fuyun.gif" src="http://39.99.193.63:8889/gif/fuyun.gif"></li>
                        <li title="给力"><img data-src="http://39.99.193.63:8889/gif/geili.gif" src="http://39.99.193.63:8889/gif/geili.gif"></li>
                        <li title="围观"><img data-src="http://39.99.193.63:8889/gif/weiguan.gif" src="http://39.99.193.63:8889/gif/weiguan.gif"></li>
                        <li title="威武"><img data-src="http://39.99.193.63:8889/gif/weiwu.gif" src="http://39.99.193.63:8889/gif/weiwu.gif"></li>
                        <li title="话筒"><img data-src="http://39.99.193.63:8889/gif/huatong.gif" src="http://39.99.193.63:8889/gif/huatong.gif"></li>
                        <li title="蜡烛"><img data-src="http://39.99.193.63:8889/gif/lazhu.gif" src="http://39.99.193.63:8889/gif/lazhu.gif"></li>
                        <li title="蛋糕"><img data-src="http://39.99.193.63:8889/gif/dangao.gif" src="http://39.99.193.63:8889/gif/dangao.gif"></li>
                        <li title="发红包"><img data-src="http://39.99.193.63:8889/gif/fahongbao.gif" src="http://39.99.193.63:8889/gif/fahongbao.gif"></li>
                    </ul>
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
                    <div class="mes" v-html="item.title">这里放标题</div>
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
                                <div class="mes">
                                    <span v-html="elem.title"></span>
                                    <template v-if="elem.commentUserId">
                                        <span class="userName" @click="go_info(elem.commentUserId)">@{{elem.commentUserName}}：</span><span v-html="elem.commentText"></span>
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
              gifType:1,//表情状态 1 评论 2回复
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
              cloneDom.setAttribute("id","cloneDom")
              cloneDom.addEventListener("click",function (e) {
                let _slef = e.target
                let className = _slef.className
                let parent = _slef.offsetParent.offsetParent
                let textarea = parent.firstChild

                if(_slef.tagName == "IMG"){
                    _this.showGif(_slef,2)
                }
                if(className == "txt"){ //展开输入框
                  parent.style.height = 140+'px'
                  _slef.style.opacity = 0
                  _slef.offsetParent.children[1].style.display = ""
                  textarea.focus();
                }else if(className == "btn"){
                  _this.send(textarea.innerHTML);
                }
              })
              this.inputdom = cloneDom;
              let gifList = this.$refs.gifList
                let textArea = this.$refs.textArea
                gifList.addEventListener("click",function(e){
                    let cloneDom = document.getElementById("cloneDom")
                    let _slef = e.target
                    if(_slef.tagName == "IMG"){
                       let cloneImg = _slef.cloneNode(true);
                        if(_this.gifType == 2){
                            cloneDom.children[0].appendChild(cloneImg)
                        }else{
                            textArea.appendChild(cloneImg)
                        }
                    }
                })
            },
            //显示表情
            showGif(e,type=1){
              this.gifType = type
                let x = event.clientX;
                let y = event.clientY;
                let dom = this.$refs.gifList;
                let gifDom = this.$refs.gifDom;
                let pc = this.$tool.IsPC();
                if(pc){
                   /* let x = e.clientX;
                    let y = e.clientY+15;*/
                    dom.style.top = y+'px';
                    dom.style.left = x+'px';
                }else{
                    dom.style.bottom = '120px';
                    dom.style.width="100%"
                }
                gifDom.style.display = 'block'
            },
            closeGif(e){
                let gifDom = this.$refs.gifDom;
                gifDom.style.display = 'none'
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
                inputdom.children[1].children[1].style.display = ""
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
                 this.setToast({show:true,icon:"warning",title:"请输入评论内容",time:1000})
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
                childMessage:[],
                toCommentId:0,
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
                  let cloneDom = document.getElementById("cloneDom")
                if (commentItem.hasOwnProperty("index")&&commentItem.hasOwnProperty("childIndex")){//二级回复

                  console.log("二级回复");
                  message.messageId = commentItem.messageId;
                  message.commentUserId = commentItem.userId;
                  message.toCommentId = commentItem.id
                  name = `J_input_${commentItem.index}_${commentItem.childIndex}`;
                    this.addComment(message,()=>{
                        this.messageData[commentItem.index].commentTotal ++
                        this.messageData[commentItem.index].childMessage.splice(commentItem.childIndex+1,0,message);
                        let dom = document.getElementsByClassName(name)[0]
                        dom.removeChild(dom.firstChild)
                        cloneDom.children[0].innerHTML = ""
                    })
                }else if(commentItem.hasOwnProperty("index")){
                  console.log("一级回复");
                  message.messageId = commentItem.id;
                  message.commentUserId = null
                  name = `J_input_${commentItem.index}_${commentItem.childIndex}`;
                  this.addComment(message,()=>{
                      this.messageData[commentItem.index].commentTotal ++
                      this.messageData[commentItem.index].childMessage.push(message)
                      cloneDom.children[0].innerHTML = ""
                  })
                }
              }else{
                  this.addComment(message,()=>{
                      this.messageData.unshift(message)
                      this.$refs.textArea.innerHTML = ""
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
                        pageSize: 500,
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
.gifDom{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    display: none;
    .gifList{
        background: white;
        z-index: 88;
        position: fixed;
        ul {
            width: 350px;
            overflow: hidden;
            li{
                float: left;
                padding: 5px;
                &:hover{
                    cursor: pointer;
                    background: #c0ccda;
                }
            }
        }
    }
}

    .input_dom{
        transition: all .36s ease;
        padding: 15px;
        position: relative;
        box-sizing: border-box;
        box-sizing: content-box;
        border: 1px solid #3f404c;
        background: white;
        overflow: hidden;
        .area{
            width: calc(100% - 30px);
            font-size: 16px;
            font-family: inherit;
            border: none;
            position: absolute;
            height: 100px;
            overflow: auto;
        }
        .bq{
            position: absolute;
            left: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 40px;
            height: 40px;
            float: left;
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
        z-index: 99;
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
