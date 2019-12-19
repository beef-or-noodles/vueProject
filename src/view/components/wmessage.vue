<template>
    <div class="message">
        <div class="inputbox">
            <div class="icon">
                <img src="" alt="">
            </div>
            <div class="input" @click="Comment" :style="{height:height+'px'}">
                <textarea ref="textArea" class="area" @change="inputChange" placeholder="写下您的评论..."></textarea>
                <div class="inputBtn">
                    <div v-if="height == 10" class="txt">写下您的评论...</div>
                    <button class="btn" @click.stop="send">评论</button>
                </div>
            </div>
        </div>
        <div class="messageList">
            <div class="list" v-for="l in 5">
                <div class="left">
                    <div class="icon">
                        <img src="" alt="">
                    </div>
                </div>
                <div class="right">
                    <span class="userName">不吃鱼的猫</span><span class="time">8小时前</span>
                    <div class="mes">这篇文章真牛逼</div>
                    <div class="answerbox">
                        <div class="userName"><span>回复</span> ~ <span>11条回复</span></div>
                        <div class="noice">12赞</div>
                    </div>
                    <div class="moremessage">
                        <div class="list" v-for="i in 2">
                            <div class="left">
                                <div class="icon">
                                    <img src="" alt="">
                                </div>
                            </div>
                            <div class="right">
                                <span class="userName">哇哈哈哈</span><span class="time">3小时前</span>
                                <div class="mes">我来评论你</div>
                                <div class="answerbox">
                                    <div class="userName"><span>回复</span></div>
                                    <div class="noice">12赞</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "wmessage",
        data() {
            return {
                height:10
            }
        },
        created(){

        },
        methods: {
            inputChange(el) {
                console.log(el);
            },
            Comment(){
                this.height = 140;
                this.$refs.textArea.focus()
            },
            send(){

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
            transition: all .36s ease;
            border: 1px solid #3f404c;
            width: calc(100% - 60px);
            padding: 15px;
            overflow: hidden;
            position: relative;
            box-sizing: border-box;
            box-sizing: content-box;
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
                width: 100%;
                background: #f4f5f6;
                .btn{
                    float: right;
                    width: 100px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #3f404c;
                    color: white;
                    font-weight: 500;
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
</style>