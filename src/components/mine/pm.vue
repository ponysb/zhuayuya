<template>
    <div class="box" style="margin-top: -15px;">
        <div style="margin-left: -16px; display: flex;">
            <div style="width: 25%;" class="box-items box-items-s">
                <h3 style="font-size: 16px; font-weight: 500; padding-top: 10px; margin-left: 16px;">{{morning.title}}</h3>
                <span style="padding: 2px 5px; font-weight: 600; background-color: #ffffff; color: rgb(31, 31, 31); border-radius: 3px; font-size: 12px; float: right; margin-top: -32px; margin-right: 16px;">{{morning.create}}</span>
                <div v-html="morning.content" style="width: 88%; height: 90%; overflow-y: scroll; margin: 0 auto;">
                </div>
            </div>
            <div style="width: 41%;" class="box-items box-items-s">
                <div style="display: flex; margin: 0 auto;margin-top: 16px; margin-left: 6px;">
                    <span @click="tab_click_(0)" :style="tab_style.tab_1" class="box-tab-style">
                        人人都是产品经理
                    </span>
                    <span @click="tab_click_(1)" :style="tab_style.tab_2" class="box-tab-style">
                        PMCAFF
                    </span>
                    <span @click="tab_click_(2)" :style="tab_style.tab_3" class="box-tab-style">
                        Product Hunt
                    </span>
                    <span @click="tab_click_(3)" :style="tab_style.tab_4" class="box-tab-style">
                        绝对实用
                    </span>
                </div>
                <div style="height: 86%; overflow-y: scroll; margin-top: 16px;">
                    <a v-for="(Journalisms,index) in Journalism" :href="Journalisms.url" :index="index" :key="index" target="_blank" class="box-tow-list">
                        <h3 class="box-tow-list-title">{{Journalisms.title}}</h3>
                        <span class="box-tow-list-time">{{timeago(Journalisms.date.iso)}}</span>
                    </a>
                </div>
            </div>
            <div class="box-items">
                <div class="box-three-top">
                    <h3 style="font-size: 16px; font-weight: 500; padding-top: 10px; margin-left: 16px;">常用工具</h3>
                    <div style="display: flex;">
                        <span class="tools-list-box">
                            <img class="tools-img" src="http://img.zhuayuya.com/icon/danmu.png" alt="">
                            <a-switch class="tools-title" @click="checked8" v-model="$store.state.babrrage_show" />
                        </span>
                        <a href="https://sspai.com/" target="_blank" class="tools-list-box">
                            <img class="tools-img" src="http://img.zhuayuya.com/icon/sspai.jpg" alt="">
                            <h3 class="tools-title">少数派</h3>
                        </a>
                        <a href="http://www.qijishow.com/down/index.html" target="_blank" class="tools-list-box">
                            <img class="tools-img" src="http://img.zhuayuya.com/icon/qijixiu.png" alt="">
                            <h3 class="tools-title">产品软件</h3>
                        </a>
                        <a href="https://www.fuzuobiao.com/" target="_blank" class="tools-list-box">
                            <img class="tools-img" src="http://img.zhuayuya.com/icon/fuzuobiao.png" alt="">
                            <h3 class="tools-title">原型商店</h3>
                        </a>
                        <a href="https://docs.qq.com/doc/DY2JXTE53TEhsanNE" target="_blank" class="tools-list-box">
                            <img class="tools-img" src="http://img.zhuayuya.com/icon/qunliao.png" alt="">
                            <h3 class="tools-title">加产品群</h3>
                        </a>
                    </div>
                </div>
                <div class="box-three-bottom">
                    <h3 style="font-size: 16px; font-weight: 500; padding-top: 10px; margin-left: 16px;">产品必备</h3>
                    <div style="height: 86%; display: flex; overflow-x:auto; margin-top: -8px; flex-wrap: wrap;">
                        <a v-for="(tools_pms,index) in tools_pm" :href="tools_pms.src" :index="index" :key="index" target="_blank" class="tools-list-box-bottom">
                            <img class="tools-img-bottom" :src="tools_pms.img" alt="">
                            <h3 class="tools-title-bottom">{{tools_pms.title}}</h3>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Base64 from 'base-64';
    export default {
        mounted() {
            this.$store.state.babrrage_show = false
            this.$message.info('🤨 弹幕给你关了，专注吧！打工人～～');
            let that = this
            that.axios({
            method: "POST",
            url: "https://proxy.zyy.soso.pro/jj/resources/woshipm",
            data: {
                limit: 30,
                offset: 0
            },
            Headers: {
                "Content-Type": "application/json",
            },
            }).then(function (response) {
                // console.log(response.data.data);
                that.Journalism = response.data.data
            });


            that.axios.get('https://zyy-api.soso.pro/daily_info/last')
            .then(function (response) {
                // console.log(response);
                that.morning = response.data.data
                that.morning.content = decodeURIComponent(Base64.decode(that.morning.content))
            })
        },
        data() {
            return {
                tab_style:{tab_1:"background-color: #1170FE; color:#fff; animation:boxtabstyle .3s;",tab_2:'',tab_3:'',tab_4:''},
                tools_pm:[
                    {title:'人人都是产品经理',src:'http://www.woshipm.com/',img:'http://img.zhuayuya.com/icon/rrdscpjl.png'},
                    {title:'PMCAFF',src:'https://www.pmcaff.com/',img:'http://img.zhuayuya.com/icon/pmcaff.png'},
                    {title:'36kr',src:'https://36kr.com/',img:'http://img.zhuayuya.com/icon/36kr.png'},
                    {title:'虎嗅',src:'https://www.huxiu.com/',img:'http://img.zhuayuya.com/icon/huxiu.png'},
                    {title:'axhub',src:'https://axhub.im/',img:'http://img.zhuayuya.com/icon/axhub.png'},
                    {title:'产品大牛',src:'https://www.pmdaniu.com/',img:'http://img.zhuayuya.com/icon/chanpindaniu.png'},
                    {title:'蓝湖',src:'https://lanhuapp.com/',img:'http://img.zhuayuya.com/icon/lanhu.png'},
                    {title:'墨刀',src:'https://modao.cc/',img:'http://img.zhuayuya.com/icon/modao.png'},
                    {title:'MasterGo',src:'https://mastergo.com/',img:'http://img.zhuayuya.com/icon/mastergo.png'},
                    {title:'即时设计',src:'https://js.design/',img:'http://img.zhuayuya.com/icon/jishisheji.png'},
                    {title:'每日报告',src:'https://www.mrbaogao.com/',img:'http://img.zhuayuya.com/icon/meiribaogao.png'},
                    {title:'Product Hunt',src:'https://www.producthunt.com/',img:'http://img.zhuayuya.com/icon/producthunt.png'},
                    {title:'AxureUX',src:'https://www.axureux.com/',img:'http://img.zhuayuya.com/icon/axureux.png'},
                    {title:'鸟哥笔记',src:'https://www.niaogebiji.com/',img:'http://img.zhuayuya.com/icon/niaogebiji.png'},
                    {title:'元宇宙内参',src:'https://www.yuanyuzhouneican.com/',img:'http://img.zhuayuya.com/icon/yuanyuzhouneican.png'},
                    {title:'i黑马',src:'http://www.iheima.com/',img:'http://img.zhuayuya.com/icon/aiheima.png'},
                    {title:'发现报告',src:'https://www.fxbaogao.com/',img:'http://img.zhuayuya.com/icon/faxianbaogao.png'},
                    {title:'极客公园',src:'http://www.geekpark.net/',img:'http://img.zhuayuya.com/icon/jikegongyuan.png'},
                    {title:'爱范儿',src:'https://www.ifanr.com/',img:'http://img.zhuayuya.com/icon/aifaner.png'},
                    {title:'雷锋网',src:'https://www.leiphone.com/',img:'http://img.zhuayuya.com/icon/leifengwang.png'},
                ],
                Journalism:[],
                morning:{title:'111',content:'111',time:'111'}
            }
        },
        methods: {
            checked8(){
                if(this.$store.state.babrrage_show == false){
                    this.$message.info('😔 弹幕关闭了，快乐消失了～～');
                }
                if(this.$store.state.babrrage_show == true){
                    this.$message.success('🤩 弹幕已启动，冲鸭～～');
                }
            },
            tab_click_(e){
                if(e == 0){
                    this.tab_style.tab_1 = "background-color: #1170FE; color:#fff; animation:boxtabstyle .3s;"
                    this.tab_style.tab_2 = ""
                    this.tab_style.tab_3 = ""
                    this.tab_style.tab_4 = ""
                    
                    let that = this
                    that.axios({
                    method: "POST",
                    url: "https://proxy.zyy.soso.pro/jj/resources/woshipm",
                    data: {
                        limit: 30,
                        offset: 0
                    },
                    Headers: {
                        "Content-Type": "application/json",
                    },
                    }).then(function (response) {
                        // console.log(response.data.data);
                        that.Journalism = response.data.data
                    });
                }
                if(e == 1){
                    this.tab_style.tab_2 = "background-color: #1170FE; color:#fff; animation:boxtabstyle .3s;"
                    this.tab_style.tab_1 = ""
                    this.tab_style.tab_3 = ""
                    this.tab_style.tab_4 = ""

                    let that = this
                    that.axios({
                    method: "POST",
                    url: "https://proxy.zyy.soso.pro/jj/resources/pmcaff",
                    data: {
                        limit: 30,
                        offset: 0
                    },
                    Headers: {
                        "Content-Type": "application/json",
                    },
                    }).then(function (response) {
                        // console.log(response.data.data);
                        that.Journalism = response.data.data
                    });
                }
                if(e == 2){
                    this.tab_style.tab_3 = "background-color: #1170FE; color:#fff; animation:boxtabstyle .3s;"
                    this.tab_style.tab_2 = ""
                    this.tab_style.tab_1 = ""
                    this.tab_style.tab_4 = ""

                    let that = this
                    that.axios({
                    method: "POST",
                    url: "https://proxy.zyy.soso.pro/jj/resources/producthunt",
                    data: {
                        limit: 30,
                        offset: 0
                    },
                    Headers: {
                        "Content-Type": "application/json",
                    },
                    }).then(function (response) {
                        // console.log(response.data.data);
                        that.Journalism = response.data.data
                    });
                }
                if(e == 3){
                    this.tab_style.tab_4 = "background-color: #1170FE; color:#fff; animation:boxtabstyle .3s;"
                    this.tab_style.tab_2 = ""
                    this.tab_style.tab_3 = ""
                    this.tab_style.tab_1 = ""

                    this.Journalism = [
                        {title:'PRD自查手册',date:{iso:'2022-05-07 20:02:56'},url:'https://www.xiaopiu.com/h5/byId?type=project&id=5ce262e596541012dae2aec4&isprd=true'},
                        // {title:'PRD完整模版案例Axure版',date:{iso:'11'},url:''},
                        // {title:'竞品分析模版',date:{iso:'11'},url:''},
                        // {title:'非常实用的Axure元件库合集',date:{iso:'11'},url:''},
                        {title:'竞品分析数据查询必备网站',date:{iso:'2022-05-07 20:02:56'},url:'https://www.similarweb.com/zh/'},
                        {title:'精品软件推荐，找小众软件找灵感必逛',date:{iso:'2022-05-07 20:02:56'},url:'https://sspai.com/'},
                        {title:'B端系统原型灵感',date:{iso:'2022-05-07 20:02:56'},url:'https://www.axureux.com/home/default.html'},
                        {title:'高质量原型灵感',date:{iso:'2022-05-07 20:02:56'},url:'http://www.omini.top/'},
                        {title:'「b站免费课程」产品经理入门',date:{iso:'2022-05-07 20:02:56'},url:'https://www.bilibili.com/video/BV13z4y1m7UQ?spm_id_from=333.337.search-card.all.click'},
                        {title:'「b站免费课程」掌握产品经理必备7大文档',date:{iso:'2022-05-07 20:02:56'},url:'https://www.bilibili.com/video/BV1ZZ4y1N774?spm_id_from=333.337.search-card.all.click'},
                        {title:'前滴滴阿里产品经理 刘飞 电台',date:{iso:'2022-05-07 20:02:56'},url:'https://music.163.com/radio/?id=794373398&userid=86342619'},
                    ]
                }
            },
            timeago(times_){
                var dddd = new Date(times_);
                var dateTimeStamp = dddd.getTime()
                var minute = 1000 * 60;      //把分，时，天，周，半个月，一个月用毫秒表示
                var hour = minute * 60;
                var day = hour * 24;
                var week = day * 7;
                var month = day * 30;
                var year = month * 12;
                var now = new Date().getTime();   //获取当前时间毫秒
                var diffValue = now - dateTimeStamp;//时间差
            
                var result = "";
                if(diffValue < 0){
                    result = "" + "未来";
                }
                var minC = diffValue/minute;  //计算时间差的分，时，天，周，月
                var hourC = diffValue/hour;
                var dayC = diffValue/day;
                var weekC = diffValue/week;
                var monthC = diffValue/month;
                var yearC = diffValue/year;
                
                if(yearC >= 1){
                    result = " " + parseInt(yearC) + "年前"
                }else if(monthC >= 1 && monthC < 12){
                    result = " " + parseInt(monthC) + "月前"
                }else if(weekC >= 1 && weekC < 5 && dayC > 6 && monthC < 1){
                    result = " " + parseInt(weekC) + "周前"
                }else if(dayC >= 1 && dayC <= 6){
                    result = " " + parseInt(dayC) + "天前"
                }else if(hourC >= 1 && hourC <= 23){
                    result = " " + parseInt(hourC) + "小时前"
                }else if(minC >= 1 && minC <= 59){
                    result =" " + parseInt(minC) + "分钟前"
                }else if(diffValue >= 0 && diffValue <= minute){
                    result = "刚刚"
                }
               
                return result
            },

        }
    }
</script>
<style scoped>
::-webkit-scrollbar{
    height: 8px;
    width: 0px;
    border-radius: 8px;
    background-color: #dadada;
}

.box{
    width: 88%;
    min-width: 1200px;
    height:66vh;
    margin: 0 auto;
}
.box-items{
    width: 33%;
    height: 66vh;
    border-radius: 10px;
    margin-left: 16px;
}
.box-items-s{
    background: rgba(255, 255, 255, 0.5);
    -webkit-backdrop-filter: saturate(300%) blur(50px);
    backdrop-filter: saturate(200%) blur(30px);
}
.box-tab-style{
    font-size: 14px;
    font-weight: 400;
    margin-left: 12px;
    display: block;
    padding: 5px 10px;
    color: rgb(22, 22, 22);
    background: #ffffff;
    border-radius: 3px;
}
.box-tow-list{
    display: block;
    padding-top: 10px;
    width: 100%;
    height: auto;
    padding-top: 10px;
    padding-bottom: 10px;
}
.box-tow-list-title{
    font-size: 15px;
    font-weight: 400;
    margin-left: 20px;
    color: black;
}
.box-tow-list-time{
    padding: 2px 3px;
    text-align: center;
    border-radius: 2px;
    font-size: 12px;
    font-weight: 400;
    margin-left: 20px;
    color: rgb(255, 255, 255);
    background-color: #1170FE;
}
.box-tow-list:hover{
    background-color:rgb(245, 245, 245);
    animation:boxtowlist .6s;
}
.box-three-top{
    width: 100%;
    height: 150px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.5);
    -webkit-backdrop-filter: saturate(300%) blur(50px);
    backdrop-filter: saturate(200%) blur(30px);
}
.box-three-bottom{
    width: 100%;
    height: 42vh;
    margin-top: 14px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.5);
    -webkit-backdrop-filter: saturate(300%) blur(50px);
    backdrop-filter: saturate(200%) blur(30px);
}
.tools-img{
    width: 58px;
    height: 58px;
    display: block;
    border-radius: 15px;
    background-color: rgb(255, 255, 255);
    /* border: 1px solid #eeeeee; */
}
.tools-list-box{
    margin-top: 4px;
}
.tools-list-box{
    width: 58px;
    text-align: center;
    margin-left: 20px;
    text-shadow: 2px 2px 25px rgba(17, 172, 255, 0.6);
}
.tools-title{
    font-size: 12px;
    font-weight: 400;
    margin-top: 5px;
}
.tools-title-bottom{
    font-size: 12px;
    font-weight: 400;
    margin-top: 5px;
}
.tools-img-bottom{
    width: 50px;
    height: 50px;
    display: block;
    border-radius: 15px;
    background-color: #fff;
    /* border: 1px solid #eeeeee; */
}
.tools-list-box-bottom{
    width: 50px;
    text-align: center;
    margin-left: 16px;
    margin-top: 12px;
    text-shadow: 2px 2px 25px rgba(17, 172, 255, 0.6);
}
@keyframes boxtowlist
	{
	from {background-color:rgb(255, 255, 255);}
	to {background-color:rgb(245, 245, 245);}
}
span:hover{
    cursor: pointer;
}
a:hover{
    cursor: pointer;
}
.box-tab-style:hover{
    background-color: #1170FE;
    color: #fff;
    animation:boxtabstyle .3s;
}
@keyframes boxtabstyle
	{
	from {background-color:#f7f7f7;}
	to {background-color:#1170FE;}
}
</style>