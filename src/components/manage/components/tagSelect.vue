<template>
    <div class="tagBox">
        <el-dialog
                title="标签选择"
                :visible.sync="visible"
                width="600px"
                @close="close"
                :close-on-click-modal="false"
                :append-to-body="true">
            <div class="tagBox">
                <div class="tag">
                    <div class="title">选择标签</div>
                    <div class="box">
                        <el-tag
                                :key="index"
                                v-for="(tag,index) in dynamicTags"
                                closable
                                :disable-transitions="false"
                                @click.stop="addTag(tag)"
                                @close="handleClose(tag,index)">
                            {{tag.tag_name}}  <el-button style="margin-left: 15px" @click.stop="showInput(tag)" type="text" size="mini" icon="el-icon-edit" circle></el-button>
                        </el-tag>
                        <el-input
                                class="input-new-tag"
                                v-if="inputVisible"
                                v-model="inputValue"
                                ref="saveTagInput"
                                size="small"
                                @keyup.enter.native="handleInputConfirm"
                                @blur="handleInputConfirm"
                        >
                        </el-input>
                        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
                    </div>
                </div>
                <div class="tag">
                    <div class="title">已选标签</div>
                    <div class="box">
                        <el-tag
                                :key="index"
                                v-for="(tag,index) in tagArr"
                                closable
                                :disable-transitions="false"
                                @close="tagClose(index)">
                            {{tag.tag_name}}
                        </el-tag>
                    </div>
                </div>
                <div class="btnBox">
                    <el-button size="small" @click="visible = false">取消</el-button>
                    <el-button size="small" type="primary" @click="save">保存</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "tagSelect",
        data() {
            return {
                visible: false,
                dynamicTags: [],
                inputVisible: false,
                inputValue: '',
                tag:{},
                tagArr:[]
            }
        },
        model:{
            prop: 'show',
            event: 'close'
        },
        props:{
            show:false,
            list:{
                type: Array,
                default:()=>{
                    return []
                }
            }
        },
        watch:{
            show:{
                handler:function(val){
                    this.visible = val
                    if(val){
                        this.gettagAll()
                    }
                },
                immediate:true
            },
            list:{
                handler:function(val){
                    this.tagArr = JSON.parse(JSON.stringify(val))
                },
                immediate:true
            }
        },
        create(){
            this.gettagAll()
        },
        methods:{
            close(){
                this.$emit('close',false)
            },
            gettagAll(){
              this.$post(this.$api.queryAllTag).then(data=>{
                  this.dynamicTags = data
              })
            },
            handleClose(tag,index) {
                this.$confirm('即将删除标签【'+tag+'】, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$post(this.$api.delectTag,{id:tag.id}).then(data=>{
                        this.dynamicTags.splice(index, 1);
                    })
                }).catch(() => {});
            },
            showInput(tag={}) {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    if(tag.hasOwnProperty('id')){
                        this.inputValue = tag.tag_name
                    }
                    this.tag = tag
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    if(this.tag.hasOwnProperty('id')){
                        this.$post(this.$api.updateTag,{tag_name:inputValue,id:this.tag.id}).then(data=>{
                            this.gettagAll()
                        })
                    }else{
                        this.$post(this.$api.addTag,{tag_name:inputValue}).then(data=>{
                            this.gettagAll()
                        })
                    }

                }
                this.inputVisible = false;
                this.inputValue = '';
            },
            addTag(tag){
                let exist = this.tagArr.some(ls=>{
                    return ls.id == tag.id
                })
                if(!exist) {
                    this.tagArr.push(tag)
                }
            },
            tagClose(index){
               this.tagArr.splice(index,1)
            },
            save(){
                this.$emit('save',this.tagArr)
            }
        }
    }
</script>

<style scoped lang="less">
.tagBox{
    .el-tag{
        margin-right: 10px;
        &:hover{
            cursor: pointer;
        }
    }
    .input-new-tag{
        width: 100px;
    }
    .box{
        border-bottom: 1px solid #e3e5e6;
        padding: 15px 0;
        margin-bottom: 15px;
    }
    .btnBox{
        text-align: center;
    }
}
</style>