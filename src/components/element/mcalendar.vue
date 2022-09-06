<template>
    <div style="text-align: left; width: 100%; height: 100%; border-radius: 14px; background-color: rgb(18, 113, 255);">
        <div class="box-left-top"></div>
        <div class="box-left-bottom">
            <span style="font-size: 12px; font-weight: 500; color: black; margin-left: 6px;">距离放假:</span>
            <span class="box-left-bottom-content">中秋  {{mid_autumn}}天</span>
            <span class="box-left-bottom-content">国庆  {{National}}天</span>
            <span class="box-left-bottom-content">元旦  {{Years}}天</span>
        </div>
        <div class="box-right">
            <span style="display: block; font-size: 12px; color: rgb(78, 78, 78); font-weight: 400; margin-top: 6px;">今天</span>
            <span style="display: block; font-size: 15px; font-weight: 800;">{{week}}</span>
            <span style="display: block; font-size: 12px; color: rgb(78, 78, 78);  font-weight: 400; margin-top: 6px;">在坚持</span>
            <span style="display: block; font-size: 15px; font-weight: 800;">{{insist}}</span>
            <div @click="insist_click" class="insist-button">
                单休的点这里
            </div>
        </div>
    </div>
</template>
<script>
export default {
    mounted() {
        this.insists()
    },
    data() {
        return {
            National:this.calculate("2022/10/1"),
            mid_autumn:this.calculate("2022/9/10"),
            Years:this.calculate("2023/1/1"),
            week:"周"+"天一二三四五六".charAt(new Date().getDay()),
            insist:"",
            single:false
        }
    },
    methods: {
        insist_click(){
            if(this.single == true){
                this.single = false
                this.insists()
            }else{
                this.single = true
                this.insists()
            }
            
        },
        calculate(e){
            var today=new Date();
            var endDay=new Date(e);
            var result=(endDay.getTime()-today.getTime())/1000;//不写getTime(),则调用valueOf
            // var result=(endDay-today)/1000;
            var day=parseInt(result/(24*60*60));
            //var hour=parseInt((result-day*24*60*60)/(60*60));
            //var minite=parseInt((result-day*24*60*60-hour*60*60)/60);
            //var sec=parseInt(result-day*24*60*60-hour*60*60-minite*60);
            // console.log("距离国庆放假还有："+day+"天"+hour+"小时"+minite+"分钟"+sec+"秒")
            return day
        },
        insists(){
            if(this.week == '周一'){
                if(this.single == false){
                    this.insist = "五天"
                }else{
                    this.insist = "六天"
                }
            }
            if(this.week == '周二'){
                if(this.single == false){
                    this.insist = "四天"
                }else{
                    this.insist = "五天"
                }
            }
            if(this.week == '周三'){
                if(this.single == false){
                    this.insist = "三天"
                }else{
                    this.insist = "四天"
                }
            }
            if(this.week == '周四'){
                if(this.single == false){
                    this.insist = "二天"
                }else{
                    this.insist = "三天"
                }
            }
            if(this.week == '周五'){
                if(this.single == false){
                    this.insist = "一天"
                }else{
                    this.insist = "两天"
                }
            }
            if(this.week == '周六'){
                if(this.single == false){
                    this.insist = "迷糊了？"
                }else{
                    this.insist = "一天"
                }
            }
            if(this.week == '周天'){
                this.insist = "迷糊没？"
            }
        }
    },
}
</script>
<style scoped>
.insist-button{
    font-size: 12px;
    padding: 2px 6px;
    font-weight: 400;
    color: #fff;
    width: 56px;
    height: 40px;
    margin: 0 auto;
    margin-top: 18px;
    border-radius: 10px;
    background-color: rgb(18, 113, 255);
}
.insist-button:hover{
    background-color: rgb(8, 94, 223)
}
.box-left-bottom-content{
    display: inline-block;
    font-size: 12px;
    font-weight: 400;
    color: rgb(67, 67, 67);
    margin-top: 2px;
    margin-left: 6px;
}
.box-left-top{
    display: inline-block;
    width: 76px;
    height: 50px;
    margin-top: 10px;
    margin-left: 10px;
    border-radius: 8px;
    background: url('http://img.zhuayuya.com/icon_/WX20220601-213545@2x.png');
    -moz-background-size:100% 100%; 
    background-size:100% 100%;
}
.box-left-bottom{
    width: 76px;
    height: 98px;
    background-color: rgb(255, 255, 255);
    margin-top: 2px;
    margin-left: 10px;
    border-radius: 8px;
}
.box-right{
    text-align: center;
    width: 66px;
    height: 156px;
    background-color: rgb(255, 255, 255);
    float: right;
    margin-top: -156px;
    margin-right: 10px;
    border-radius: 8px;
}
</style>