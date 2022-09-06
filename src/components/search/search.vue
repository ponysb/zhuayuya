<template>
    <div class="box">

        <!-- tab栏 -->
        <div class="option-box">
            <span @click="tabs_click(0)" :style="tab_style[0]" class="option-item">搜答案</span>
            <span @click="tabs_click(1)" :style="tab_style[1]" class="option-item">搜资讯</span>
            <span @click="tabs_click(2)" :style="tab_style[2]" class="option-item">发弹幕</span>
            <span style="background-color:rgb(63, 138, 252);" class="option-item">
                <a style="text-decoration:none; color:#fff" target="_blank" title="下载抓鱼鸭浏览器插件" href="https://docs.qq.com/doc/DY1FyVEFnUlBqZGF1">
                    ⏬ 点我下载插件
                </a>
            </span>
            <span >
                <a-dropdown>
                    <span class="option-item" @click.prevent>
                        {{$store.state.pattern_value}}
                        
                    </span>
                    <template #overlay>
                        <a-menu>
                        <a-menu-item>
                            <a @click="tab_pattern(0)" href="javascript:;">模式-我的收藏</a>
                        </a-menu-item>
                        <a-menu-item>
                            <a @click="tab_pattern(1)" href="javascript:;">模式-推荐模式</a>
                        </a-menu-item>
                        <a-menu-item>
                            <a @click="tab_pattern(2)" href="javascript:;">模式-产品经理</a>
                        </a-menu-item>
                        <a-menu-item>
                            <a @click="tab_pattern(3)" href="javascript:;">模式-Ui设计</a>
                        </a-menu-item>
                       
                        </a-menu>
                    </template>
                </a-dropdown>    
            </span>

        </div>

        <!-- 搜索入口 -->
        <div class="search-box">
            <div class="search-icon-box" @click="choose_engine">
                <img style="width: 38px;" :src="engine_selected.icon" alt="">
                <img style="width: 8px; margin-left: 8px;" src="http://img.zhuayuya.com/icon_/sanjiao.png" alt="">
            </div>
            
            <input autofocus @input="input" ref="userphone" @keyup.13='send' maxlength="50" v-model="search_data" :placeholder="placeholder" class="search-edi" type="text">
            
            <span @click="search_click" style="width: 95px;height: 52px;background-color: rgb(18, 113, 255);border-radius: 30px 30px 0px 30px;box-shadow: 2px 2px 25px rgba(32, 63, 238, 0.5);text-align: center;color: #fff;font-size: 18px;line-height: 52px;">
                搜搜～
            </span>


            <!-- 选择搜索引擎 -->
            <div ref="main" v-if="choose" class="animate__animated animate__fadeIn drop-down">
                <div @click="engine_selected_click(index)" v-for="(engines,index) in engine" :key="index" :index="index" class="drop-down-list">
                    <img class="drop-down-list-img" :src="engines.icon" alt="">
                    <span class="drop-down-list-title">{{engines.name}}</span>
                </div>
            </div>
        </div>

        
    </div>
</template>
<script>
import icon_data_ from '../../assets/icon_data';
export default {
    mounted() {
        document.addEventListener("click",this.bodyCloseMenus);
    },
    data() {
        return {
            tabs:0,
            tab_style:["background-color: #fff; color:rgb(86, 86, 86)","",""],
            search_data:"",
            placeholder:"输入要搜索的关键词～",
            choose:false,
            choose_:false,
            engine_selected:{name:"百度",icon:"http://img.zhuayuya.com/icon_/sousuo/baidu.png",src_:"https://www.baidu.com/",src:"https://www.baidu.com/s?wd=",selected:true},
            engine:[
                {name:"百度",icon:"http://img.zhuayuya.com/icon_/sousuo/baidu.png",src_:"https://www.baidu.com/",src:"https://www.baidu.com/s?wd=",selected:true},
                {name:"必应",icon:"http://img.zhuayuya.com/icon_/sousuo/bing.png",src_:"https://cn.bing.com/",src:"https://cn.bing.com/search?q=",selected:false},
                {name:"谷歌",icon:"http://img.zhuayuya.com/icon_/sousuo/guge.png",src_:"https://www.google.com.hk/",src:"https://www.google.com.hk/search?q=",selected:false},
                {name:"360",icon:"http://img.zhuayuya.com/icon_/sousuo/360.png",src_:"https://www.so.com/",src:"https://www.so.com/s?q=",selected:false},
                {name:"搜狗",icon:"http://img.zhuayuya.com/icon_/sousuo/sougou.png",src_:"https://www.sogou.com/",src:"https://www.sogou.com/web?query=",selected:false},
                {name:"DuckDucGo",icon:"http://img.zhuayuya.com/icon_/sousuo/duckduckgo.png",src_:"https://duckduckgo.com/",src:"https://duckduckgo.com/?q=",selected:false},
                {name:"F搜",icon:"http://img.zhuayuya.com/icon_/sousuo/fsou.png",src_:"https://fsoufsou.com/",src:"https://fsoufsou.com/search?q=",selected:false}
            ]
        }
    },
    methods: {
        //点击空白取消弹窗
        bodyCloseMenus(e) {
            let self = this;
            if (this.$refs.main && !this.$refs.main.contains(e.target)) {
                if (this.choose_ == false){
                    self.choose = true;
                    this.choose_ = true
                }else{
                    if (this.choose_ == true){
                        self.choose = false;
                        this.choose_ = false
                    }
                }
            }
        },


        //弹幕发送
        addBabrrage(msg){
            // let time_min = this.getSecondByDateSub("2020-07-21 17:36:16",this.time(new Date()))
            // console.log(time_min)
            if(localStorage.getItem("babrrage") == null||this.getSecondByDateSub(localStorage.getItem("babrrage"),this.time(new Date()))>3){
                var message = {
                    messageContent: msg,
                    time: Math.floor(Math.random() * (75 - 5)) + 7,
                    userVo: null
                };
                this.$store.state.barrageList.push(message);
                this.$store.state.dchatList.unshift(
                    JSON.stringify({"_id":"17e3426e621e19aa115c2e1853a3bd6a","msg":message.messageContent,"time":"","userid":""})
                );
                localStorage.setItem("babrrage",this.time(new Date()))
            }else{
                this.$message.info('3秒内只可以发一条弹幕哦～～');
                // console.log(this.getSecondByDateSub(localStorage.getItem("babrrage"),this.time(new Date())))
            }
            // console.log(this.$store.state.barrageList)
        },
        getSecondByDateSub(begin,end) {
            var beginDate  = new Date(begin);
            var endDate = new Date(end);
            var diff = endDate.getTime() - beginDate.getTime();
            var sec = diff /1000;
            return  sec ;
        },
        time(date) {
            var y = date.getFullYear()
            var m = date.getMonth() + 1
            m = m < 10 ? '0' + m : m
            var d = date.getDate()
            d = d < 10 ? '0' + d : d
            var h = date.getHours()
            h = h < 10 ? '0' + h : h
            var minute = date.getMinutes()
            minute = minute < 10 ? '0' + minute : minute
            var second = date.getSeconds()
            second = second < 10 ? '0' + second : second
            return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
        },


        //输入框回车或者点击搜索事件
        send(){
            if(this.tabs == 2){
                if(this.search_data != ""){
                    if(this.$store.state.user_id != ''){
                        this.$socket.emit('login',{
                            msg: this.search_data,
                            userid: this.$store.state.user_id,
                            time: Date.parse(new Date())
                        });
                        this.addBabrrage(this.search_data)
                        if(this.search_data == '蹦迪'){
                            window.open('http://www.zhuayuya.com/disco/index.html')
                        }
                        this.search_data = "";
                    }else{
                        this.$message.info('还没有登录不可发送弹幕哦～');
                    }
                }else{
                    this.$message.info('还没有输入弹幕内容哦～');
                }
            }else{
                this.search_click()
            }
        },
        search_click(){
            if (this.search_data == '') {
                window.open(this.engine_selected.src_)
            }else{
                // console.log(this.search_data)
                window.open(this.engine_selected.src+this.search_data)
            }
        },


        //切换模式
        tab_pattern(e){
            if(e == 0){
                if(this.$store.state.user_id != ""){
                    this.$store.state.home.grid = true
                    this.$store.state.home.pm = false
                    this.$store.state.home.design = false
                    this.$store.commit("start_get");
                    this.$store.state.pattern_value = "我的收藏"
                }else{
                    this.$message.info('登录后才可以操作哦～～');
                }
                
                
            }
            if(e == 1){
                this.$store.state.group_data = [
                    { name: '摸认组', groupid: '01', userid: '', icon: '🐟', id: "icon-x8", time: Number },
                ],
                this.$store.state.home.grid = true
                this.$store.state.home.pm = false
                this.$store.state.home.design = false
                this.$store.state.icon_data = icon_data_
                this.$store.state.pattern_value = "推荐模式"
                
            }
            if(e == 2){
                if(this.$store.state.user_id != ""){
                    this.$store.state.home.pm = true
                    this.$store.state.home.design = false
                    this.$store.state.home.grid = false
                    this.$store.state.pattern_value = "产品经理"
                }else{
                    this.$message.info('登录后才可以操作哦～～');
                }
                
            }
            if(e == 3){
                if(this.$store.state.user_id != ""){
                    this.$store.state.home.design = true
                    this.$store.state.home.grid = false
                    this.$store.state.home.pm = false
                    this.$store.state.pattern_value = "Ui设计"
                }else{
                    this.$message.info('登录后才可以操作哦～～');
                }
            }
        },



        //切换搜索问题或者搜索咨询，或者发送弹幕
        tabs_click(e){
            this.tab_style[this.tabs] = ""
            this.tab_style[e] = "background-color: #fff; color:rgb(86, 86, 86)"
            this.tabs = e
            this.$forceUpdate();
            if(e == 2){
                this.placeholder = "输入要发送的弹幕「Enter」键发送"
                this.$store.state.home.view = true
                this.$store.state.search.inf = false
                this.$store.state.search.issue = false
            }else{
                this.placeholder = "输入要搜索的关键词～"
            }
            this.input()
        },
        engine_selected_click(e){
            this.choose = false
            this.choose_ = false
            this.engine_selected = this.engine[e]
        },
        choose_engine(){
            this.choose = true
        },


        //输入框输入时事件
        input(){
            if(this.search_data != "" && this.tabs != 2){
                if(this.tabs == 0){
                    this.$store.state.home.view = false
                    this.$store.state.search.inf = false
                    this.$store.state.search.issue = true
                    this.jsonp_issue()
                }
                if(this.tabs == 1){
                    this.$store.state.home.view = false
                    this.$store.state.search.issue = false
                    this.$store.state.search.inf = true
                    this.jsonp_inf()
                }
                
            }
            if(this.search_data == ""){
                this.$store.state.home.view = true
                this.$store.state.search.issue = false
                this.$store.state.search.inf = false
            }
        },

        //搜索问题
        jsonp_issue(){
            let that = this
            window.baidu = {
                sug:function (baidujson){
                    that.$store.state.search_data.issue.baidu = baidujson.s
                }
            }
            window.bing = {
                sug:function (biyingjson){
                    // console.log(biyingjson)
                    if(biyingjson.AS.Results.length == 1){
                        that.$store.state.search_data.issue.bing = biyingjson.AS.Results[0].Suggests
                    }else{
                        that.$store.state.search_data.issue.bing = biyingjson.AS.Results[0].Suggests.concat(that.$store.state.bing_list_data = biyingjson.AS.Results[1].Suggests)
                    }
                }
            }
            window.so = {
                sug:function (sanliulingjson){
                    // console.log(that.$store.state.search_data)
                    that.$store.state.search_data.issue.sanliuling = sanliulingjson.result
                }
            }
            that.$jsonp('https://suggestion.baidu.com/su?wd='+that.search_data+'&cb=window.baidu.sug')
            .then(() => {
                // console.log(baidujson)
            })
            .catch((err) => {
                console.log(err)
            })

            that.$jsonp('https://api.bing.com/qsonhs.aspx?type=cb&q='+that.search_data+'&cb=window.bing.sug')
            .then(() => {
                // console.log(biyingjson)
            })
            .catch((err) => {
                console.log(err)
            })

            that.$jsonp('https://sug.so.360.cn/suggest?encodein=utf-8&encodeout=utf-8&format=json&word='+that.search_data+'&callback=window.so.sug')
            .then(() => {
                // console.log(sanliulingjson)
            })
            .catch((err) => {
                console.log(err)
            })
        },

        //搜索资讯
        jsonp_inf(){
            let that = this
            window.sogou = {
                sug:function (json){
                    // console.log(json[1])
                    that.$store.state.search_data.inf.weixin = json[1]
                }
            },

        

            that.axios.get('https://www.toutiao.com/2/article/search_sug/?keyword='+that.search_data+'&ps_type=sug&aid=4916&_signature=_02B4Z6wo00101sEGrHwAAIDBVdD3ciRGNa7BIqjAANJwavt9aT9A0UwXqYMlb042rO-wXNfMqT5.LJQgxTB0NIettEyETuKk5l23f44wONStLGEcYu8Hh0.sSHmMt1.VegpW75K1qo6B5YTx07')
            .then(function (response) {
                // console.log(response.data.data)
                that.$store.state.search_data.inf.toutiao = response.data.data
            })
            .catch(function (error) {
                console.log(error);
            })


            that.axios.get('https://www.zhihu.com/api/v4/search/suggest?q='+that.search_data)
            .then(function (response) {
                // console.log(response.data.suggest)
                that.$store.state.search_data.inf.zhihu = response.data.suggest
            })
            .catch(function (error) {
                console.log(error);
            })


            this.$jsonp('https://weixin.sogou.com/sugg/ajaj_json.jsp?key='+that.search_data+'&type=wxart&pr=web&t=1646395231374')
            .then(() => {
                // console.log(json)
            })
            .catch((err) => {
                console.log(err)
            })
        }

    }
}
</script>
<style scoped>
.animate__animated.animate__fadeIn{
    --animate-duration: 0.3s;
}
.box{
    height: 20vh;
    margin-top: 6px;
}
.search-box{
    width: 580px;
    height: 52px;
    background-color:rgb(255, 255, 255);
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    border-radius: 30px;
    margin: 0 auto;
    margin-top: 10px;
    display: flex;
}
.search-edi{
    width: 388px;
    height: 30px;
    margin: 0 auto;
    margin-left: 10px;
    margin-top: 10px;
    background-color: #fff;
    box-shadow:none;
    border: none;
    outline:none;
    color: #000;
    font-size: 20px;
}
.option-box{
    display: flex;
    width: 568px;
    margin: 0 auto;
}
.option-item{
    display: block;
    padding: 0 12px 0 12px;
    height: 30px;
    border-radius: 30px;
    margin-left: 12px;
    background-color: #fff;
    text-align: center;
    line-height: 31px;
    font-size: 14px;
    color: #fff;
    background: rgba(51, 50, 50, 0.3);
    box-shadow: 3px 3px 6px 3px rgba(0, 0, 0, .1);
    backdrop-filter:saturate(200%) blur(5px);
}
.option-item:hover{
    cursor: pointer;
    background: rgba(114, 114, 114, 0.3);
    transition: all 0.3s; /* 过度 */
    -moz-transition: all 0.3s; /* Firefox */
    -webkit-transition: all 0.3s; /* Safari 和 Chrome */
    background-color: rgba(223, 223, 223, 0.3);
}
.search-icon-box{
    margin-top: 8px;
    margin-left: 10px;
}
.search-icon-box:hover{
    cursor: pointer;
}
.drop-down-list:hover{
    cursor:pointer;
}
.drop-down-list{
    width: auto;
    height: 40px;
    padding-right: 16px;
    margin-top: 10px;
    margin-left: 12px;
    border-radius: 30px;
    background-color: #ffffff;
    display: flex;
}
.drop-down-list:hover{
    background-color: #f1f1f1;
}
.drop-down-list-title{
    display: block;
    font-size: 14px;
    font-weight: 400;
    margin-left: 2px;
    margin-top: 9px;
}
.drop-down-list-img{
    transform:scale(0.8);
    margin-left: 2px;
    margin-top: 2px;
}
.drop-down{
    position:absolute;
    z-index: 99;
    display: flex;
    flex-wrap: wrap;
    width: 580px;
    margin-top: 68px;
    background: rgba(121, 121, 121, 0.3);
    box-shadow: 3px 5px 10px 5px rgba(82, 82, 82, 0.1);
    backdrop-filter: saturate(200%) blur(5px);
    border-radius: 15px;
    padding-bottom: 12px;
}
</style>