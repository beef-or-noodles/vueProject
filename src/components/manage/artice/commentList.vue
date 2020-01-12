<template>
    <div class="content">
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
            <el-table-column prop="id" label="ID" width="80px">
            </el-table-column>
            <el-table-column prop="userName" label="用户名" width="100px">
            </el-table-column>
            <el-table-column prop="articeId" label="文章id" width="100px">
            </el-table-column>
            <el-table-column prop="title" label="评论内容" width="180px">
                <template slot-scope="scop">
                    <div v-html="scop.row.title"></div>
                </template>
            </el-table-column>
            <el-table-column prop="commentUserName" label="被评论人昵称" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="commentText" label="被评论内容" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="likes" label="点赞次数" width="100px">
            </el-table-column>
            <el-table-column prop="creatTime" label="创建时间" width="250">
                <template slot-scope="scope">
                    {{setTime(scope.row.creatTime)}}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="80px">
                <template slot-scope="scope">
                   <el-button type="danger" @click='delect(scope.row.id,scope.$index)' size="mini">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagesize">
            <wPage @pageSize="pageSize" :size="paging.pageSize" @pageNo="pageNo" :total="paging.total"></wPage>
        </div>
    </div>
</template>
<script>
    export default {
        name:"logList",
        data() {
            return {
                tableData: [],
                paging: {
                    pageNo: 1,
                    pageSize: 20,
                    total: 0,
                },
            }
        },
        mounted() {
            this.queryRecycle();
        },
        methods: {
            setTime: function(val) {
                let date = new Date(val);
                let time = date.getTime();
                let settime = this.$tool.formatTime(time / 1000, true);
                return settime
            },
            pageSize(val){
                this.paging.pageSize = val;
                this.queryRecycle();
            },
            pageNo(val){
                this.paging.pageNo = val;
                this.queryRecycle();
            },

            //查询列表
            queryRecycle() {
                let params = this.paging;
                this.$post(this.$api.queryAllComment, params).then((data) => {
                    this.paging.total = data.total;
                    this.tableData = data.data;
                });
            },
            /*删除评论*/
            delect(id,index){
                this.$confirm('此操作将永久删除该评论, 是否继续?', '提示', {
                    confirmButtonText: '确认',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$post(this.$api.delectComment, {id:id}).then((data) => {
                        this.tableData.splice(index,1)
                    });
                }).catch(() => {});
            }
        }
    }
</script>
<style scoped>

</style>
