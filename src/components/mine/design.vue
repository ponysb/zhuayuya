<template>
    <div class="box" style="margin-top: -15px;">
        <div style="margin-left: -16px; display: flex;">
            <div style="width: 25%;" class="box-items box-items-s">
                <h3 style="font-size: 16px; font-weight: 500; padding-top: 10px; margin-left: 16px;">{{morning.title}}</h3>
                <span style="padding: 2px 5px; font-weight: 600; background-color: #ffffff; color: rgb(31, 31, 31); border-radius: 3px; font-size: 12px; float: right; margin-top: -32px; margin-right: 16px;">{{morning.create}}</span>
                <div v-html="morning.content" style="width: 88%; height: 86%; overflow-y: scroll; margin: 0 auto;"></div>
            </div>
            <div style="width: 41%;" class="box-items box-items-s">
                <div style="display: flex; margin: 0 auto;margin-top: 16px;  margin-left: 6px;">
                    <span @click="tab_click_(0)" :style="tab_style.tab_1" class="box-tab-style">
                        UI中国
                    </span>
                    <span @click="tab_click_(1)" :style="tab_style.tab_2" class="box-tab-style">
                        站酷
                    </span>
                    <span @click="tab_click_(2)" :style="tab_style.tab_3" class="box-tab-style">
                        Dribbble
                    </span>
                    <!-- <span @click="tab_click_(3)" :style="tab_style.tab_4" class="box-tab-style">
                        Behance
                    </span> -->
                    <span @click="tab_click_(4)" :style="tab_style.tab_5" class="box-tab-style">
                        优设
                    </span>
                </div>
                <!-- ui中国 -->
                <div v-if="tab_show.chinaui" class="chinaui-box-three-bottom">
                    <a v-for="(chinaui_infos,index) in chinaui_info" :index="index" :key="index" :href="chinaui_infos.url" target="_blank" class="chinaui-list-box">
                        <img class="chinaui-list-img" :src="chinaui_infos.img.url" alt="">
                        <h3 class="chinaui-list-title">{{chinaui_infos.title}}</h3>
                        <div class="chinaui-list-follow">
                            <span style="margin-right: 10px;">赞({{chinaui_infos.likes}})</span>
                            <span>看过({{chinaui_infos.views}})</span>
                        </div>
                    </a>
                </div>
                <!-- 站酷 -->
                <div v-if="tab_show.cool" class="chinaui-box-three-bottom">
                    <a v-for="(cool_infos,index) in cool_info" :index="index" :key="index" :href="cool_infos.url" target="_blank" class="chinaui-list-box">
                        <img class="chinaui-list-img" :src="cool_infos.img[0]" alt="">
                        <h3 class="chinaui-list-title">{{cool_infos.title}}</h3>
                        <div class="chinaui-list-follow">
                            <span style="margin-right: 10px;">赞({{cool_infos.like}})</span>
                            <span>看过({{cool_infos.view}})</span>
                        </div>
                    </a>
                </div>
                <!-- Dribbble -->
                <div v-if="tab_show.Dribbble" class="chinaui-box-three-bottom">
                    <a v-for="(dribbbles,index) in dribbble" :index="index" :key="index" :href="dribbbles.url" target="_blank" class="chinaui-list-box">
                        <img class="chinaui-list-img" :src="dribbbles.img[0]" alt="">
                        <h3 class="chinaui-list-title">{{dribbbles.title}}</h3>
                        <div class="chinaui-list-follow">
                            <span style="margin-right: 10px;">赞({{dribbbles.like}})</span>
                            <span>看过({{dribbbles.view}})</span>
                        </div>
                    </a>
                </div>
                <!-- Behance -->
                <!-- <div v-if="tab_show.Behance" class="chinaui-box-three-bottom">
                    <div v-for="(behances,index) in behance" :index="index" :key="index" style="height: 176px;" class="chinaui-list-box">
                        <img class="chinaui-list-img" :src="behances.img.mini" alt="">
                        <h3 class="chinaui-list-title">{{behances.title}}</h3>
                    </div>
                </div> -->

                <!-- 优设 -->
                <div v-if="tab_show.youshe" style="height: 86%; overflow-y: scroll; margin-top: 16px;">
                    <a v-for="(youshes,index) in youshe" :href="youshes.url" :index="index" :key="index" target="_blank" class="box-tow-list">
                        <h3 class="box-tow-list-title">{{youshes.title}}</h3>
                        <span class="box-tow-list-time">{{timeago(youshes.date.iso)}}</span>
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
                            <h3 class="tools-title">设计软件</h3>
                        </a>
                        <!-- <a href="https://www.fuzuobiao.com/" target="_blank" class="tools-list-box">
                            <img class="tools-img" src="../../public/icon/fuzuobiao.png" alt="">
                            <h3 class="tools-title">原型商店</h3>
                        </a> -->
                        <a href="https://docs.qq.com/doc/DY2JXTE53TEhsanNE" target="_blank" class="tools-list-box">
                            <img class="tools-img" src="http://img.zhuayuya.com/icon/qunliao.png" alt="">
                            <h3 class="tools-title">加群</h3>
                        </a>
                    </div>
                </div>
                <div class="box-three-bottom">
                    <h3 style="font-size: 16px; font-weight: 500; padding-top: 10px; margin-left: 16px;">产品必备</h3>
                    <div style="height: 86%; display: flex; overflow-x:auto; margin-top: -8px; flex-wrap: wrap;">
                        <a v-for="(tools_designs,index) in tools_design" :href="tools_designs.src" :index="index" :key="index" target="_blank" class="tools-list-box-bottom">
                            <img class="tools-img-bottom" :src="tools_designs.img" alt="">
                            <h3 class="tools-title-bottom">{{tools_designs.title}}</h3>
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
        created() {
            this.$store.state.babrrage_show = false
            this.$message.info('🤨 弹幕给你关了，专注吧！打工人～～');
            let that = this
            that.axios({
            method: "POST",
            url: "https://proxy.zyy.soso.pro/jj/resources/ui",
            data: {
                limit: 30,
                offset: 0
            },
            Headers: {
                "Content-Type": "application/json",
            },
            }).then(function (response) {
                // console.log(response.data.data);
                that.chinaui_info = response.data.data
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
                tab_style:{tab_1:"background-color: #1170FE; color:#fff; animation:boxtabstyle .3s;",tab_2:'',tab_3:'',tab_4:'',tab_5:''},
                tab_show:{chinaui:true,cool:false,Dribbble:false,Behance:false,youshe:false},
                morning:{title:'111',content:'111',time:'111'},
                chinaui_info:[],
                cool_info:[],
                dribbble:[],
                behance:[],
                youshe:[],

                tools_design:[
                    {title:'站酷',src:'https://www.zcool.com.cn/',img:'http://img.zhuayuya.com/icon/zk.png'},
                    {title:'Ui中国',src:'https://www.ui.cn/',img:'http://img.zhuayuya.com/icon/uizg.png'},
                    {title:'Dribbble',src:'https://dribbble.com/',img:'http://img.zhuayuya.com/icon/dribbble.png'},
                    {title:'Behance',src:'https://www.behance.net/',img:'http://img.zhuayuya.com/icon/behance.png'},
                    {title:'花瓣',src:'https://huaban.com/',img:'http://img.zhuayuya.com/icon/huaban.png'},
                    {title:'优设',src:'https://www.uisdc.com/',img:'http://img.zhuayuya.com/icon/youshewang.png'},
                    {title:'iconfont',src:'https://www.iconfont.cn/',img:'http://img.zhuayuya.com/icon/iconfont.png'},
                    {title:'iconPark',src:'https://iconpark.oceanengine.com/',img:'http://img.zhuayuya.com/icon/iconpark.png'},
                    {title:'墨刀',src:'https://modao.cc/',img:'http://img.zhuayuya.com/icon/modao.png'},
                    {title:'MasterGo',src:'https://mastergo.com/',img:'http://img.zhuayuya.com/icon/mastergo.png'},
                    {title:'即时设计',src:'https://js.design/',img:'http://img.zhuayuya.com/icon/jishisheji.png'},
                    {title:'Pixso',src:'https://pixso.cn/',img:'http://img.zhuayuya.com/icon/pixso.png'},
                    {title:'码前',src:'https://www.devbefore.com/',img:'http://img.zhuayuya.com/icon/maqian.png'},
                    {title:'包图网',src:'https://ibaotu.com/',img:'http://img.zhuayuya.com/icon/baotuwang.png'},
                    {title:'千图网',src:'https://www.58pic.com/',img:'http://img.zhuayuya.com/icon/qiantuwang.png'},
                    {title:'摄影图网',src:'https://699pic.com/',img:'http://img.zhuayuya.com/icon/sheyingtuwang.png'},
                    {title:'PNG素材库',src:'https://pngimg.com/',img:'http://img.zhuayuya.com/icon/pngsucaitu.png'},
                    {title:'渐变色',src:'https://uigradients.com/#Combi',img:'http://img.zhuayuya.com/icon/jianbianse.png'},
                    {title:'Coolors',src:'https://coolors.co/palettes',img:'http://img.zhuayuya.com/icon/coolors.png'},
                    {title:'色彩猎人',src:'https://www.fxbaogao.com/',img:'http://img.zhuayuya.com/icon/secailieren.png'},
                    {title:'Ant Design',src:'https://ant.design/index-cn',img:'http://img.zhuayuya.com/icon/antd.png'},
                    {title:'TDesign',src:'https://tdesign.tencent.com/',img:'http://img.zhuayuya.com/icon/tDesign.png'},
                    {title:'Semi Design',src:'https://semi.design/zh-CN/',img:'http://img.zhuayuya.com/icon/SemiDesign.png'},
                ],
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
                    this.tab_style.tab_5 = ""
                    this.tab_show.chinaui = true
                    this.tab_show.cool = false
                    this.tab_show.Dribbble = false
                    this.tab_show.Behance = false
                    this.tab_show.youshe = false

                    let that = this
                    that.axios({
                    method: "POST",
                    url: "https://proxy.zyy.soso.pro/jj/resources/ui",
                    data: {
                        limit: 30,
                        offset: 0
                    },
                    Headers: {
                        "Content-Type": "application/json",
                    },
                    }).then(function (response) {
                        // console.log(response.data.data);
                        that.chinaui_info = response.data.data
                    });
                }
                if(e == 1){
                    this.tab_style.tab_2 = "background-color: #1170FE; color:#fff; animation:boxtabstyle .3s;"
                    this.tab_style.tab_1 = ""
                    this.tab_style.tab_3 = ""
                    this.tab_style.tab_4 = ""
                    this.tab_style.tab_5 = ""
                    this.tab_show.chinaui = false
                    this.tab_show.cool = true
                    this.tab_show.Dribbble = false
                    this.tab_show.Behance = false
                    this.tab_show.youshe = false

                    let that = this
                    that.axios({
                    method: "POST",
                    url: "https://proxy.zyy.soso.pro/jj/resources/zcool",
                    data: {
                        limit: 30,
                        offset: 0
                    },
                    Headers: {
                        "Content-Type": "application/json",
                    },
                    }).then(function (response) {
                        // console.log(response);
                        that.cool_info = response.data.data
                    });
                }
                if(e == 2){
                    this.tab_style.tab_3 = "background-color: #1170FE; color:#fff; animation:boxtabstyle .3s;"
                    this.tab_style.tab_2 = ""
                    this.tab_style.tab_1 = ""
                    this.tab_style.tab_4 = ""
                    this.tab_style.tab_5 = ""
                    this.tab_show.chinaui = false
                    this.tab_show.cool = false
                    this.tab_show.Dribbble = true
                    this.tab_show.Behance = false
                    this.tab_show.youshe = false

                    let that = this
                    that.axios({
                    method: "POST",
                    url: "https://proxy.zyy.soso.pro/jj/resources/dribbble",
                    data: {
                        limit: 30,
                        offset: 0
                    },
                    Headers: {
                        "Content-Type": "application/json",
                    },
                    }).then(function (response) {
                        
                        that.dribbble = response.data.data
                        // console.log(that.dribbble);
                    });
                }
                if(e == 3){
                    this.tab_style.tab_4 = "background-color: #1170FE; color:#fff; animation:boxtabstyle .3s;"
                    this.tab_style.tab_2 = ""
                    this.tab_style.tab_3 = ""
                    this.tab_style.tab_1 = ""
                    this.tab_style.tab_5 = ""
                    this.tab_show.chinaui = false
                    this.tab_show.cool = false
                    this.tab_show.Dribbble = false
                    this.tab_show.Behance = true
                    this.tab_show.youshe = false

                    let that = this
                    that.axios({
                    method: "POST",
                    url: "https://proxy.zyy.soso.pro/jj/resources/behance",
                    data: {
                        limit: 30,
                        offset: 0
                    },
                    Headers: {
                        "Content-Type": "application/json",
                    },
                    }).then(function (response) {
                        
                        that.behance = response.data.data
                        // console.log(that.behance);
                    });
                }
                if(e == 4){
                    this.tab_style.tab_5 = "background-color: #1170FE; color:#fff; animation:boxtabstyle .3s;"
                    this.tab_style.tab_2 = ""
                    this.tab_style.tab_3 = ""
                    this.tab_style.tab_1 = ""
                    this.tab_style.tab_4 = ""
                    this.tab_show.chinaui = false
                    this.tab_show.cool = false
                    this.tab_show.Dribbble = false
                    this.tab_show.Behance = false
                    this.tab_show.youshe = true

                    let that = this
                    that.axios({
                    method: "POST",
                    url: "https://proxy.zyy.soso.pro/jj/resources/uisdc",
                    data: {
                        limit: 30,
                        offset: 0
                    },
                    Headers: {
                        "Content-Type": "application/json",
                    },
                    }).then(function (response) {
                        // console.log(response);
                        that.youshe = response.data.data
                    });
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

            formatNumber(num) {
	num = Number(num);
	if (num == 0) {
		return num + '';
	} else
	if (num > 1 && num < 10000) {
		return num + '';
	} else {
		return (num / 10000).toFixed(2) + '万';
	}
}


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
.chinaui-list-follow{
    float: right;
    margin-right: 10px;
    margin-top: 10px;
    font-size: 10px;
    color: #1d1d1d;
}
.chinaui-list-title{
    display: -webkit-box;
    width: 94%;
    height: 38px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    word-break: break-all;
    font-weight: 400;
    font-size: 14px;
    margin-top: 6px;
    margin-left: 6px;
}
.chinaui-list-img{
    width: 100%;
    height: 112px;
    border-radius: 6px 6px 0px 0px;
}
.chinaui-list-box{
    width: 30%;
    height: 196px;
    margin-bottom: 16px;
    border-radius: 6px;
    background-color: #ffffff;
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
.chinaui-box-three-bottom{
    display: flex; 
    justify-content:space-evenly;
    height: 86%;
    margin-top: 10px;
    overflow-x:auto; 
    flex-wrap: wrap;
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