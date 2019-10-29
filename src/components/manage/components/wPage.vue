<template>
    <div>
        <el-pagination
                @size-change="changePagesize"
                @current-change="currentChange"
                @prev-click="prevClick"
                @next-click='nextClick'
                :page-sizes="[10, 20, 30, 40]"
                :page-size="size"
                layout="sizes, prev, pager, next"
                :total="total">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "wPage",
        data() {
            return {

            }
        },
        props: {
            size: {
                type: Number,
                default: 10
            },
            total:{
                type: Number,
                default: 0
            }
        },
        methods: {
            // 改变每页条数
            changePagesize(value) {
                this.$emit("pageSize",value);
            },
            // 当前页改变
            currentChange(val) {
                this.$emit("pageNo",val);
            },
            // 上一页
            prevClick(val) {
                this.$emit("pageNo",val);
            },
            // 下一页
            nextClick(val) {
                this.$emit("pageNo",val);
            },


        },
    }
</script>

<style scoped>

</style>