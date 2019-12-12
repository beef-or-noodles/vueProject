<template>
    <div class="content">
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%">
            <el-table-column type="selection">
            </el-table-column>
            <el-table-column prop="id" label="ID" width="80px">
            </el-table-column>
            <el-table-column prop="userId" label="用户ID" width="100px">
            </el-table-column>
            <el-table-column prop="ip" label="IP" width="180px">
            </el-table-column>
            <el-table-column prop="api" label="api" width="180px">
            </el-table-column>
            <el-table-column prop="system" label="系统类型"  width="180px">
            </el-table-column>
            <el-table-column prop="params" label="请求参数" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="creatTime" label="创建时间" width="250">
                <template slot-scope="scope">
                    {{setTime(scope.row.creatTime)}}
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
                this.$post(this.$api.queryLog, params).then((data) => {
                    this.paging.total = data.total;
                    this.tableData = data.data;
                });
            },
        }
    }
</script>
<style scoped>

</style>
