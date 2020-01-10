<template>
    <div>
        <div class="chart">
            <div class="canvas-wrapper">
                <canvas id="canvas4"></canvas>
            </div>
            <div class="canvas-wrapper">
                <canvas id="canvas3"></canvas>
            </div>
        </div>
        <div class="canvas-wrapper1">
            <canvas id="canvas2"></canvas>
        </div>
    </div>


</template>

<script>
    import Schart from 'schart.js';
    export default {
        name: "chart",
        data() {
            return {
                options:{
                    type: 'line',
                    title: {
                        text: '最近一周接口访问情况',
                    },
                    bgColor: '#fbfbfb',
                    labels: ['星期一', '星期二', '星期三', '星期四', '星期五','星期六','星期天'],
                    datasets: [{
                        label: '访问次数',
                        data: [234, 278, 270, 190, 230,120,548]
                    }]
                },
                options2:{
                    type: 'pie',
                    title: {
                        text: "数据表类型统计"
                    },
                    legend: {
                        position: 'left'
                    },
                    bgColor: '#fbfbfb',
                    labels: ['文章', '相册', '音乐', '用户', '栏目', '留言'],
                    datasets: [{
                        data: [334, 278, 190, 235, 260, 200]
                    }]
                },
                options3: {
                    type: 'ring',
                    title: {
                        text: '访问设备统计'
                    },
                    showValue: false,
                    legend: {
                        position: 'bottom',
                        bottom: 40
                    },
                    bgColor: '#fbfbfb',
                    labels: ['pc','移动设备','其他'],
                    datasets: [{
                        data: [20, 50, 50]
                    }]
                }
            }
        },
        created(){

        },
        mounted(){
          this.init()
        },
        methods: {
            init() {
                this.queryTimeData();
                this.$post(this.$api.queryChart).then(data=>{
                    let systemMun = data.systemMun
                    let contentNum = data.contentNum
                    this.options3.datasets[0].data=[systemMun.pc,systemMun.mobile,systemMun.other]
                    this.options2.datasets[0].data=[contentNum.artice,contentNum.photo,contentNum.music,contentNum.user,contentNum.column,contentNum.comments]
                    new Schart("canvas3", this.options2);
                    new Schart("canvas4", this.options3);
                });
            },
            queryTimeData(day = 7){
                let dateList = []
                for (let i=0 ;i<day;i++) {
                    dateList.push(this.$tool.getDateStr(-i));
                }
                this.options.labels = dateList.reverse()
                let params = {
                    beginTime:`${dateList[0]} 00:00:00`,
                    endTime:`${dateList[dateList.length-1]} 23:59:59`,
                }
                let numberList = new Array(day).fill(0);
                this.$post(this.$api.queryTimeLog,params).then(data=>{
                    dateList.forEach((item,index)=>{
                        for (let key of data) {
                            if(item == key.DAY){
                                numberList[index] = key.count
                            }
                        }
                    })
                    this.options.datasets[0].data = numberList
                    new Schart("canvas2", this.options);
                })
            }

        },
    }
</script>

<style scoped>
    .chart{
        display: flex;
    }
    .canvas-wrapper1{
        width: 100%;
        height: 360px;
    }
    .canvas-wrapper{
        width: 50%;
        height: 400px;
    }
</style>