<template>
    <div class="fileBox">
        <div class="left">
            <div class="crud">
<!--                <el-button type="text" @click="creatDir">创建文件夹</el-button>-->
            </div>
            <div class="box">
                <el-tree
                        :props="props"
                        :load="loadNode"
                        @node-click="clickNode"
                        lazy>
                    <div class="custom-tree-node" slot-scope="{ node, data }">
                        <span>{{data.name}}</span>
                    </div>
                </el-tree>
            </div>

        </div>
        <div class="right">
            <div class="crud">
                <!--<el-button type="text">上传文件</el-button>-->
            </div>
            <div class="box">
                <el-table ref="multipleTable" :data="fileData" tooltip-effect="dark" style="width: 100%">
                    <el-table-column prop="name" label="文件名">
                    </el-table-column>
                    <el-table-column prop="path" label="文件路径">
                    </el-table-column>
                    <el-table-column label="操作" width="150px">
                        <template slot-scope="scope">
                            <el-button type="success" @click='preview(scope.row.name)' size="mini">预览</el-button>
                            <el-button type="danger" @click='delectFile(scope.row.path,scope.$index)' size="mini">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "fileManager",
        data() {
            return {
                props: {
                    label: 'name'
                },
                fileData:[],
            }
        },
        mounted(){

        },
        methods: {
            loadNode(node, resolve) {
                let pathData = node.data
                let path = './upload'
                if(pathData){
                    path = pathData.path
                }
                if (node.level === 0) {
                    return resolve([{ name: 'upload',path:"./upload"}]);
                }

                this.$post(this.$api.queryFileList,{path:path}).then(data=>{
                    if(data.length>0){
                        let list = []
                        data.forEach(item=>{
                            let arr = item.path.split("/")
                            let name = arr[arr.length-1]
                            item["name"] = name;
                            if(item.isDirectory){
                                list.push(item)
                            }
                        })
                        resolve(list);
                    }else{
                        resolve([])
                    }
                });
            },
            clickNode(data){
                this.fileData = []
                let path = data.path
                this.$post(this.$api.queryFileList,{path:path}).then(data=>{
                    if(data.length>0){
                        let file = []
                        data.forEach(item=>{
                            let arr = item.path.split("/")
                            let name = arr[arr.length-1]
                            item["name"] = name;
                            if(!item.isDirectory){
                                file.push(item)
                            }
                        })
                        this.fileData.push(...file)
                    }else{
                        this.fileData = []
                    }
                });
            },
            creatDir(){
                this.$post(this.$api.creatDir,{path:'./upload/newDir'}).then(data=>{
                    console.log(data);
                });
            },
            delectFile(path,index){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$post(this.$api.delectFile,{path:path}).then(data=>{
                        this.fileData.splice(index,1)
                    });
                }).catch(() => {});

            },
            //文件预览
            preview(path){
                var url = window.location.origin;
                let newpath = path.substring(0,path.length)
                window.open(url+"/"+newpath,"_blank")
            }
        },
    }
</script>

<style lang="less" scoped>
.fileBox{
    height: 100%;
    display: flex;
    .left{
        width: 300px;
        .box{
            height: calc(100% - 50px);
            overflow: auto;
            .custom-tree-node{
                height: 20px;
                width: 100%;
                .delete{
                    float: right;
                    margin-top: -10px;
                }
            }
        }
        .dirList{
            padding: 5px;
            border-bottom: 1px solid white;
        }
    }
    .right{
        height: 100%;
        overflow: auto;
        width: calc(100% - 300px);
        border-left: 2px solid white;
        .box{
            height: calc(100% - 50px);
            overflow: auto;
        }
    }
    .crud{
        background: white;
    }
}
</style>