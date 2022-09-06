<template>
    <div class="box">
        <div class="user-box">
            <h3 class="user-name">😘 Hi,
                <a-tooltip color="#87d068" placement="bottom">
                    <template #title>
                        <span>{{$store.state.nickname}}</span>
                    </template>
                    「<span class="modify-nickname" @click="nickname_modify">{{$store.state.nickname}}</span>」
                </a-tooltip>

                您好！
            </h3>
            <img class="user-logo" src="https://img.zhuayuya.com/icon/fish240x240.png" alt="" />
        </div>



        <div style="display: flex; margin: 0 auto;margin-top: 12px; margin-left: 6px;">
            <span @click="tab_click(0)" class="slide-tab-style">
                组件超市
                <span :style="tab_style.tab_1"></span>
            </span>
            <span @click="tab_click(1)" class="slide-tab-style">
                页面设置
                <span :style="tab_style.tab_2"></span>
            </span>
            <span @click="tab_click(2)" class="slide-tab-style">
                抓鱼鸭
                <span :style="tab_style.tab_3"></span>
            </span>
        </div>

        <!-- 组件超市 -->
        <div v-if="tab.tab1" class="tab-box">
            <div class="notice-box">
                组件右击不能删除，试试右击标题～
            </div>
            <div v-for="(cards,index) in card" :key="index" class="element-list-box">
                <div class="element-list-botton">
                    <div style="float: right; margin-right: 16px;">
                        <img :src="cards.icon" class="element-list-logo" alt="">
                        <span @click="element_add(index)" class="element-list-add">{{cards.add_ask}}</span>
                    </div>
                    <span class="element-list-title">{{cards.title}}</span>
                    <span class="element-list-content">{{cards.content}}</span>
                </div>
            </div>
        </div>

        <!-- 页面设置 -->
        <div v-if="tab.tab2" class="tab-box">
            <div class="setting-box">
                <span class="setting-box-title">默认主页</span>
                <el-select v-model="$store.state.slide_pattern_value" style="width: 125px; margin-left: 88px;"
                    placeholder="请选择">
                    <el-option v-for="item in options" :key="item.value" @click.native="switch_click(item.value)"
                        :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </div>
            <div style="margin-top: 10px;" class="setting-box">
                <span class="setting-box-title">弹幕开关</span>
                <a-switch style="margin-left: 162px; margin-top: -3px;" v-model="$store.state.babrrage_show" />
            </div>
            <!-- <div class="Wallpaper">
                <img class="Wallpaper" :src="" alt="">
                <div class="Wallpaper-click">更换壁纸</div>
            </div> -->
        </div>

        <!-- 抓鱼鸭 -->
        <div v-if="tab.tab3" class="tab-box">
            <div class="button-list">
                <div
                    style="width: 300px;height: 278px; background-color: #ECF2FC; border-radius: 15px; margin: 0 auto; margin-top: 12px;">
                    <h3 style="padding: 5px 0px 0px 10px; font-size: 16px; color: #1170FE;">🙏 捐助名单(捐助记得备注 昵称):</h3>
                    <div style="width: 280px;height: 60px; margin: 0 auto;">
                        <a href="https://sspai.com/" target="_blank"><span class="sponsor-name">@少数派</span></a>
                        <span class="sponsor-name">@月落</span>
                        <span class="sponsor-name">@亚洲云</span>
                        <span class="sponsor-name">@木有毛</span>
                        <span class="sponsor-name">@双月</span>
                        <a href="https://docs.qq.com/doc/DY1ZtWndteHRFTFdu" target="_blank"
                            class="sponsor-name">...全部</a>
                    </div>
                    <img class="qcode" src="https://img.zhuayuya.com/icon_/wxpay.jpg" alt="weixin">
                    <img class="qcode" src="https://img.zhuayuya.com/icon_/alipay.jpg" alt="zhifubao">
                    <div
                        style="height: 26px; text-align: center; line-height: 26px; width: 280px; background-color: #ffffff; color: #FF0000; margin: 0 auto; border-radius: 15px; margin-top: 10px;">
                        🙏 给开发者买杯 奶茶 吧～～</div>
                </div>
            </div>
            <div class="button-list">
                <!-- <a href="http://localhost:8080/" target="_blank" class="button-list-span">😸 关于抓鱼鸭
                  <img class="button-list-span-icon" src="../../public/icon_/路径.png" alt="">
                </a> -->
                <a href="https://docs.qq.com/doc/DY0RXeXRCeHhRRHRo" target="_blank" class="button-list-span">📙 使用手册
                    <img class="button-list-span-icon" src="https://img.zhuayuya.com/icon_/路径.png" alt="">
                </a>
                <!-- <a href="http://localhost:8080/" target="_blank" class="button-list-span">📄 隐私协议
                  <img class="button-list-span-icon" src="../../public/icon_/路径.png" alt="">
                </a> -->
                <div style="display: flex;">
                    <a href="https://space.bilibili.com/7318180" target="_blank" class="button-list-span-mini">
                        <img class="button-list-span-letf-icon" src="https://img.zhuayuya.com/icon_/组113.png" alt="">
                        bilibili
                        <img class="button-list-span-icon" src="https://img.zhuayuya.com/icon_/路径.png" alt=""></a>
                    <a href="https://docs.qq.com/doc/DY0ZvdXRaRHppZG9y" target="_blank" class="button-list-span-mini">
                        <img class="button-list-span-letf-icon" src="https://img.zhuayuya.com/icon_/7.png" alt="">
                        QQ群
                        <img class="button-list-span-icon" src="https://img.zhuayuya.com/icon_/路径.png" alt=""></a>
                </div>

                <div class="wx-box">
                    <h3 class="wx-title">微信公众号</h3>
                    <img class="wx-code" src="https://img.zhuayuya.com/icon/WechatIMG338.jpeg" alt="">
                </div>
            </div>
        </div>


    </div>
</template>
<script>
    import card_data_ from '../../assets/card_data.js'
    export default {
        data() {
            return {
                card_data: card_data_.card_data,
                card: card_data_.card,
                tab: { tab1: true, tab2: false, tab3: false },
                tab_style: { tab_1: "display: block; width: 80px;height: 12px;margin-top: -12px;border-radius: 20px;background-color: #1271ff;", tab_2: '', tab_3: '' },
                options: [
                    { value: '1', label: '默认首页' },
                    { value: '2', label: '产品经理' },
                    { value: '3', label: 'UI设计' }
                ],
            }
        },
        methods: {

            //在组件商城添加组件
            element_add(e) {
                let that = this
                if (that.card[e].add_ask == "添加") {
                    if (that.$store.state.user_id != "") {
                        that.$store.state.icon_data.push(that.card_data[e])
                        that.axios.get(that.$store.state.config.port + '/set_card', {
                            params: {
                                type: that.card_data[e].type,
                                index: that.$store.state.icon_data.length + 1,
                                name: that.card_data[e].name,
                                icon: that.card_data[e].icon,
                                userid: that.$store.state.user_id,
                                uid: that.$store.state.user_id,
                                urlid: Date.parse(new Date()).toString(),
                                time: Date.parse(new Date()),
                                groupid: that.$store.state.group_data[0].groupid,
                                equipment: '',
                                browser: '',
                                class: that.card_data[e].class,
                                link: that.card_data[e].link,
                            }
                        })
                            .then(function () {
                                that.card[e].add_ask = "已添加"
                                // console.log(response)
                            })
                            .catch(function (error) {
                                console.log(error);
                                alert('收藏错误')
                            })
                    } else {
                        that.$message.info('登录后才可以操作哦～');
                    }
                } else {
                    that.$message.info('已经添加了哦～');
                }
            },


            //点击昵称
            nickname_modify() {
                if(this.$store.state.user_id != ""){
                    window.location.href = "http://www.zhuayuya.com/user_home/index.html"
                }else{
                    this.$store.state.sign_show = true
                }
            },



            //切换默认模式
            switch_click(e) {
                // console.log(e)
                localStorage.setItem('pattern', JSON.stringify({ state: e }))
            },


            tab_click(e) {
                if (e == 0) {
                    this.tab_style.tab_1 = "display: block; width: 80px;height: 12px;margin-top: -12px;border-radius: 20px;background-color: #1271ff;"
                    this.tab_style.tab_2 = ""
                    this.tab_style.tab_3 = ""
                    this.tab.tab1 = true
                    this.tab.tab2 = false
                    this.tab.tab3 = false
                }
                if (e == 1) {
                    this.tab_style.tab_2 = "display: block; width: 80px;height: 12px;margin-top: -12px;border-radius: 20px;background-color: #1271ff;"
                    this.tab_style.tab_1 = ""
                    this.tab_style.tab_3 = ""
                    this.tab.tab2 = true
                    this.tab.tab1 = false
                    this.tab.tab3 = false
                }
                if (e == 2) {
                    this.tab_style.tab_3 = "display: block; margin: 0 auto; width: 70px;height: 12px;margin-top: -12px;border-radius: 20px;background-color: #1271ff;"
                    this.tab_style.tab_2 = ""
                    this.tab_style.tab_1 = ""
                    this.tab.tab3 = true
                    this.tab.tab2 = false
                    this.tab.tab1 = false
                }
            },
        },
    }
</script>
<style scoped>
    .box {
        width: 362px;
        height: 680px;
        text-align: center;
        border-radius: 25px 25px 0 0;
        background-color: rgb(181, 210, 250);
        /* background: rgba(30, 124, 255, 0.5);
    -webkit-backdrop-filter: saturate(200%) blur(50px);
    backdrop-filter: saturate(200%) blur(30px); */
        box-shadow: 2px 2px 30px rgba(18, 113, 255, 0.2);
        z-index: 100;
        position: absolute;
        top: 100vh;
        right: 20px;
    }
    .wx-box{
        width: 290px;
        height: 320px;
        margin: 0 auto;
        margin-top: 12px;
        margin-bottom: 12px;
        border-radius: 15px;
        background-color: #f1f1f1;
        text-align: center;
    }
    .wx-title{
        display: inline-block;
        font-size: 18px;
        font-weight: 400;
        margin-top: 12px;
    }
    .wx-code{
        width: 260px;
        margin: 0 auto;
        border-radius: 15px;
    }
    .element-list-box {
        width: 290px;
        margin: 0 auto;
        margin-top: 36px;
        text-align: left;
    }

    .element-list-logo {
        width: 68px;
        height: 68px;
        margin-top: -20px;
        border-radius: 10px;
        border: 1px solid #f1f1f1;
        box-shadow: 2px 2px 25px rgba(134, 134, 134, 0.2);
    }

    .element-list-botton {
        width: 290px;
        height: 100px;
        border-radius: 12px;
        background-color: #ffffff;
        box-shadow: 3px 2px 8px rgba(8, 8, 8, 0.1);
        border: 1px solid #f8f8f8;
    }

    .element-list-add {
        display: block;
        width: 68px;
        height: 28px;
        margin-top: 10px;
        border-radius: 16px;
        background-color: rgb(18, 113, 255);
        box-shadow: 2px 5px 10px rgba(18, 113, 255, 0.2);
        text-align: center;
        color: #fff;
        line-height: 27px;
    }

    .element-list-title {
        display: inline-block;
        font-size: 18px;
        font-weight: 800;
        margin-top: 10px;
        margin-left: 12px;
        color: #000;
    }

    .element-list-content {
        display: block;
        font-weight: 400px;
        font-size: 13px;
        margin-top: 2px;
        margin-left: 12px;
    }

    .notice-box {
        width: 300px;
        height: 30px;
        margin: 0 auto;
        margin-top: 10px;
        border-radius: 8px;
        line-height: 29px;
        background-color: #1170FE;
        font-size: 14px;
        font-weight: 400;
        color: #fff;
    }

    .user-box {
        width: 322px;
        height: 72px;
        background-color: #fff;
        margin: 0 auto;
        margin-top: 20px;
        border-radius: 15px;
        background-image: linear-gradient(rgb(219, 233, 255), #ffffff);
        box-shadow: 2px 15px 25px rgba(1, 26, 255, 0.2);
    }

    .user-name {
        font-size: 16px;
        font-family: 300;
        margin-top: 24px;
        margin-left: 20px;
        color: black;
        float: left;
    }

    .modify-nickname {
        color: #1170FE;
        display: inline-block;
        max-width: 120px;
        height: 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .user-logo {
        width: 30px;
        height: 30px;
        margin-top: 22px;
        margin-right: 14px;
        border-radius: 10px;
        float: right;
    }

    .slide-tab-style {
        width: 80px;
        font-size: 18px;
        font-weight: 500;
        color: #fff;
        margin-left: 30px;
        display: block;
        text-shadow: 0px 4px 19px rgba(5, 99, 228, 0.5);
    }

    .slide-tab-style:hover {
        cursor: pointer;
    }

    .tab-box {
        background-color: #fff;
        width: 322px;
        height: 537px;
        margin: 0 auto;
        border-radius: 15px 15px 0px 0px;
        margin-top: 12px;
        overflow: auto;
    }

    .setting-box-title {
        font-size: 16px;
        font-weight: 500;
        line-height: 43px;
        margin-left: 16px;
    }

    .setting-box {
        width: 300px;
        height: 45px;
        background-color: #f4f4f4;
        margin: 0 auto;
        margin-top: 12px;
        border-radius: 12px;
        text-align: left;
    }

    .Wallpaper {
        width: 300px;
        margin: 0 auto;
        margin-top: 5px;
        border-radius: 10px;
    }

    .Wallpaper:hover {
        cursor: pointer;
    }

    .Wallpaper-click:hover {
        cursor: pointer;
    }

    .Wallpaper-click {
        margin-top: -96px;
        font-size: 18px;
        color: #fff;
        font-weight: 500;
    }

    .button-list {
        text-align: left;
    }

    .button-list-span {
        display: block;
        width: 300px;
        height: 46px;
        margin: 0 auto;
        margin-top: 12px;
        border-radius: 12px;
        background-color: #1170FE;
        color: #fff;
        font-size: 14px;
        font-weight: 500;
        text-align: left;
        line-height: 45px;
        padding-left: 12px;
    }

    .button-list-span-mini {
        display: block;
        width: 140px;
        height: 46px;
        margin: 0 auto;
        margin-top: 12px;
        border-radius: 12px;
        background-color: #1170FE;
        color: #fff;
        font-size: 14px;
        font-weight: 500;
        text-align: left;
        line-height: 45px;
        padding-left: 12px;
    }

    .button-list-span-icon {
        width: 6px;
        float: right;
        margin-right: 16px;
        margin-top: 16px;
    }

    .button-list-span-letf-icon {
        width: 16px;
        margin-right: 6px;
        margin-top: -3px;
    }

    .qcode {
        width: 130px;
        height: 130px;
        border-radius: 18px;
        margin-left: 14px;
    }

    .sponsor-name {
        font-size: 12px;
        color: #1170FE;
        margin-right: 12px;
    }
</style>