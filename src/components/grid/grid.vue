<template>
    <div class="box">
        
        <div class="group-box">
            <div v-for="(group_datas,index) in $store.state.group_data" @click="group_click(index)" :index="index"
                :key="index" class="group-box-item">
                <span class="group-box-item-icon">{{group_datas.icon}}</span>
                <span class="group-box-item-title">{{group_datas.name}}</span>
            </div>
            <div style="width:130px;">
                <div @click="group_click_show" class="group-box-item">
                    <span class="group-box-item-icon-add">➕</span>
                    <span class="group-box-item-title">新建分组</span>
                </div>
                <div v-if="group_add_show" class="animate__animated animate__fadeIn group-create-box">
                    <div class="emoji-box">
                        <span class="emoji-list" @click="emoji_click(index)" :style="emoji_datas.color"
                            v-for="(emoji_datas,index) in emoji_data" :key="index">{{ emoji_datas.emoji }}</span>
                    </div>
                    <div class="edi-box">
                        <input placeholder="输入8字内分组名称" v-model="group_add_input" maxlength="8" class="edi-input"
                            type="text">
                        <span @click="create_click" class="create-button">创建</span>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="group_show" class="animate__animated animate__fadeInUp">
            <draggable force-fallback="true" filter=".forbid" :fallbackTolerance="3" class="grid-box" v-model="$store.state.icon_data" forceFallback="true"
            :touchStartThreshold="5" animation="280" @start="onStart" @end="onEnd">
                <div v-for="(icon_datas,index) in $store.state.icon_data" @contextmenu.prevent="right_click(index)" :class="icon_datas.class" :index="index"
                    :key="index">
                    <!-- 链接 -->
                    <div v-if="icon_datas.type == 'link'">
                        <a-dropdown :trigger="['contextmenu']">
                            <span>
                                <a style="width: 62px; height: 62px; line-height: -100px; background-color: #fff;" @click="statistical(icon_datas.link)" :href="icon_datas.link" target="_blank">
                                    <!-- <img :class="icon_datas.class" :src="icon_datas.icon" :onerror="defaultImg" /> -->
                                    <img :class="icon_datas.class" :src="icon_datas.icon" />
                                </a>

                                <h3 class="grid-box-items-title">{{icon_datas.name}}</h3>
                            </span>
                            <template #overlay>
                                <a-menu>
                                    <a-menu-item @click="delete_icon(index)" key="1">🗑️ 删掉它</a-menu-item>
                                
                                    <a-sub-menu key="test" title="📁 移动到组">
                                        <a-menu-item v-for="(group_datas,index) in $store.state.group_data" :key="index" @click="grou_ping(index)">{{group_datas.icon}} {{group_datas.name}}</a-menu-item>
                                    </a-sub-menu>
                                
                                    
                                </a-menu>
                            </template>
                        </a-dropdown>
                    </div>

                    <!-- 壁纸 -->
                    <div @click="popup_show" v-if="icon_datas.type == 'wallpaper'">
                        <span :title="icon_datas.name">
                            <img :class="icon_datas.class" :src="icon_datas.icon" alt="">
                        </span>
                        <h3 class="grid-box-items-title">{{icon_datas.name}}</h3>
                    </div>

                    <!-- 抓鱼分享 -->
                    <div @click="showDrawer" v-if="icon_datas.type == 'share'">
                        <span :title="icon_datas.name">
                            <img :class="icon_datas.class" :src="icon_datas.icon" alt="">
                        </span>
                        <h3 class="grid-box-items-title">{{icon_datas.name}}</h3>
                    </div>

                    <!-- 好物推荐 -->
                    <div v-if="icon_datas.type == 'Shop'" :class="icon_datas.class">
                        <a-dropdown :trigger="['contextmenu']">
                            <span :title="icon_datas.name">
                                <Shop />
                                <h3 class="grid-box-items-title">{{icon_datas.name}}</h3>
                            </span>

                            <a-menu slot="overlay">
                                <a-menu-item @click="delete_icon(index)" key="1">
                                    🗑️ 删掉它
                                </a-menu-item>
                            </a-menu>
                        </a-dropdown>
                    </div>

                    <!-- rss订阅 -->
                    <div v-if="icon_datas.type == 'Rss'" :class="icon_datas.class">
                        <a-dropdown :trigger="['contextmenu']">
                            <span :title="icon_datas.name">
                                <Rss />
                                <h3 class="grid-box-items-title">{{icon_datas.name}}</h3>
                            </span>

                            <a-menu slot="overlay">
                                <a-menu-item @click="delete_icon(index)" key="1">
                                    🗑️ 删掉它
                                </a-menu-item>
                            </a-menu>
                        </a-dropdown>
                    </div>

                    <!-- 摸鱼日历 -->
                    <div v-if="icon_datas.type == 'Mcalendar'" :class="icon_datas.class">
                        <a-dropdown :trigger="['contextmenu']">
                            <span :title="icon_datas.name">
                                <Mcalendar />
                                <h3 class="grid-box-items-title">{{icon_datas.name}}</h3>
                            </span>

                            <a-menu slot="overlay">
                                <a-menu-item @click="delete_icon(index)" key="1">
                                    🗑️ 删掉它
                                </a-menu-item>
                            </a-menu>
                        </a-dropdown>
                    </div>

                    <!-- 随机进入网站 -->
                    <div v-if="icon_datas.type == 'RandomWeb'" :class="icon_datas.class">
                        <a-dropdown :trigger="['contextmenu']">
                            <span :title="icon_datas.name">
                                <RandomWeb />
                                <h3 class="grid-box-items-title">{{icon_datas.name}}</h3>
                            </span>

                            <a-menu slot="overlay">
                                <a-menu-item @click="delete_icon(index)" key="1">
                                    🗑️ 删掉它
                                </a-menu-item>
                            </a-menu>
                        </a-dropdown>
                    </div>

                    <!-- 弹幕聊天室 -->
                    <div v-if="icon_datas.type == 'Dchat'" :class="icon_datas.class">
                        <a-dropdown :trigger="['contextmenu']">
                            <span :title="icon_datas.name">
                                <Dchat />
                                <h3 class="grid-box-items-title">{{icon_datas.name}}</h3>
                            </span>

                            <a-menu slot="overlay">
                                <a-menu-item @click="delete_icon(index)" key="1">
                                    🗑️ 删掉它
                                </a-menu-item>
                            </a-menu>
                        </a-dropdown>
                    </div>

                    <!-- 扫雷 -->
                    <div v-if="icon_datas.type == 'MineClearance'" :class="icon_datas.class">
                        <a-dropdown :trigger="['contextmenu']">
                            <span :title="icon_datas.name">
                                <MineClearance />
                                <h3 class="grid-box-items-title">{{icon_datas.name}}</h3>
                            </span>

                            <a-menu slot="overlay">
                                <a-menu-item @click="delete_icon(index)" key="1">
                                    🗑️ 删掉它
                                </a-menu-item>
                            </a-menu>
                        </a-dropdown>


                    </div>

                    
                    <!-- 小记鸭 -->
                    <div v-if="icon_datas.type == 'Notes'" :class="icon_datas.class">
                        <a-dropdown :trigger="['contextmenu']">
                            <span :title="icon_datas.name">
                                <Notes />
                                <h3 class="grid-box-items-title">{{icon_datas.name}}</h3>
                            </span>

                            <a-menu slot="overlay">
                                <a-menu-item @click="delete_icon(index)" key="1">
                                    🗑️ 删掉它
                                </a-menu-item>
                            </a-menu>
                        </a-dropdown>
                    </div>


                    <!-- 中午吃什么 -->
                    <div v-if="icon_datas.type == 'Ele'" :class="icon_datas.class">
                        <a-dropdown :trigger="['contextmenu']">
                            <span :title="icon_datas.name">
                                <Ele />
                                <h3 class="grid-box-items-title">{{icon_datas.name}}</h3>
                            </span>

                            <a-menu slot="overlay">
                                <a-menu-item @click="delete_icon(index)" key="1">
                                    🗑️ 删掉它
                                </a-menu-item>
                            </a-menu>
                        </a-dropdown>

                    </div>


                    <!-- 芦笋录屏 -->
                    <div v-if="icon_datas.type == 'lusun'" :class="icon_datas.class">
                        <a-dropdown :trigger="['contextmenu']">
                            <span :title="icon_datas.name">
                                <Lusun />
                                <h3 class="grid-box-items-title">{{icon_datas.name}}</h3>
                            </span>

                            <a-menu slot="overlay">
                                <a-menu-item @click="delete_icon(index)" key="1">
                                    🗑️ 删掉它
                                </a-menu-item>
                            </a-menu>
                        </a-dropdown>

                    </div>


                    <!-- 小说推荐 -->
                    <div v-if="icon_datas.type == 'Anovel'" :class="icon_datas.class">
                        <a-dropdown :trigger="['contextmenu']">
                        <span :title="icon_datas.name">
                            <Anovel />
                            <h3 class="grid-box-items-title">{{icon_datas.name}}</h3>
                        </span>
                        <a-menu slot="overlay">
                            <a-menu-item @click="delete_icon(index)" key="1">
                                🗑️ 删掉它
                            </a-menu-item>
                        </a-menu>
                        </a-dropdown>
                    </div>
                </div>

            </draggable>

        </div>

    </div>
</template>
<script>
    import draggable from 'vuedraggable'
    import Shop from '../element/shop.vue'
    import Rss from '../element/rss.vue'
    import Mcalendar from '../element/mcalendar.vue'
    import RandomWeb from '../element/randomweb.vue'
    import Dchat from '../element/dchat.vue'
    import Ele from '../element/ele.vue'
    import MineClearance from '../element/mineclearance.vue'
    import emojidata from '../../assets/emoji'
    import Notes from '../element/notes.vue'
    import Lusun from '../element/lusun.vue'
    import Anovel from '../element/anovel'
    export default {
        components: {
            draggable,
            Shop,
            Rss,
            Mcalendar,
            RandomWeb,
            Dchat,
            Ele,
            MineClearance,
            Notes,
            Lusun,
            Anovel
        },
        data() {
            return {
                defaultImg:'this.src="' + "http://img.zhuayuya.com/icon/err.png"+ '"',
                group_show: true,
                drag: false,
                icon_arr: 0,
                emoji_data: emojidata,
                group_add_input: '',
                group_add_show: false,
                emoji_data_record: {
                    index: 0
                },
            }
        },
        methods: {

            //删除图标或者组件
            delete_icon(e){
                let that = this
                if(that.$store.state.pattern_value != "推荐模式"){
                    that.axios.get(that.$store.state.config.port+'/update_group_url_group',{
                    params: {
                            groupid: '0911',
                            urlid:that.$store.state.icon_data[e].urlid,
                            userid:that.$store.state.user_id
                        }
                    })
                    .then(function () {
                        // handle success
                        // console.log(response);
                        that.$store.state.icon_data.splice(e,1)
                    })
                    .catch(function () {
                        // handle error
                        // console.log(error);
                        alert("分组失败，可能是网络问题，重新试一下")
                        location.reload();
                    })
                }else{
                    that.$store.state.icon_data.splice(e,1)
                    localStorage.setItem('defaultuser', JSON.stringify(that.$store.state.icon_data));
                }
            },

            //组件拖拽事件目前没用
            onStart() {
                this.drag = true;
                // console.log('拖拽开始')
            },


            //点击新建分组展开下拉
            group_click_show() {
                if (this.group_add_show == true) {
                    this.group_add_show = false
                } else {
                    this.group_add_show = true
                }

            },



            //新建分组emoji点击事件
            emoji_click(e) {
                this.emoji_data[this.emoji_data_record.index].color = "border:solid 2px #fff;"
                this.emoji_data_record.index = e
                this.emoji_data[e].color = "border:solid 2px rgb(31, 255, 31);"
            },



            //点击新建分组按钮
            create_click() {
                let that = this;

                if (that.$store.state.user_id != '') {
                    if (that.$store.state.group_data.length == 10) {
                        that.$message.info('最多支持10个收藏夹哦～');
                    } else {
                        if (that.group_add_input != "") {
                            let group_id = 'GRID' + Date.parse(new Date()).toString() + Math.ceil(Math.random() * 100000).toString()
                            that.axios({
                                method: "POST",
                                url: that.$store.state.config.port + "/set_group",
                                data: {
                                    userid: that.$store.state.user_id,
                                    groupid: group_id,
                                    uid: that.$store.state.user_id,
                                    index: that.$store.state.group_data.length + 1,
                                    name: that.group_add_input,
                                    icon: that.emoji_data[that.emoji_data_record.index].emoji,
                                    id: "icon-x8",
                                    time: Date.parse(new Date()),
                                },
                                Headers: {
                                    "Content-Type": "application/json",
                                },
                            }).then(function () {
                                // console.log(response);
                                that.$store.state.group_data.push({
                                    userid: that.$store.state.user_id,
                                    groupid: group_id,
                                    index: that.$store.state.group_data.length + 1,
                                    name: that.group_add_input,
                                    icon: that.emoji_data[that.emoji_data_record.index].emoji,
                                    id: "icon-x8",
                                    time: Date.parse(new Date()),
                                });
                                that.group_add_show = false;
                                that.group_add_input = "";
                                that.group_add_input_class = "group-list-add-input";
                            });
                        } else {
                            that.$message.info('没有输入分组名哦～');
                        }
                    }
                } else {
                    that.$message.info('未登录不可以创建分组哦～～');
                }
            },



            //图标或组件拖拽完毕
            onEnd() {
                this.drag = false;
                let that = this
                // console.log("add执行完毕")
                for (var i3 = 0; i3 < that.$store.state.icon_data.length; i3++) {
                    that.$store.state.icon_data[i3].index = i3
                }
                if(that.$store.state.pattern_value == "推荐模式"){
                    localStorage.setItem('defaultuser', JSON.stringify(that.$store.state.icon_data));
                }else{
                    if (that.$store.state.user_id != '') {
                        that.axios({
                            method: 'POST',
                            url: that.$store.state.config.port + '/update_group_url_index',
                            data: that.$store.state.icon_data,
                            Headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                            .then(function () {
                                // console.log(response)
                            });
                    } else {
                        localStorage.setItem('defaultuser', JSON.stringify(that.$store.state.icon_data));
                        // console.log(that.$store.state.icon_data)
                    }
                }
            },




            //鼠标对图标或组件发生右击事件的时候记录这个组件的id,方便后续操作
            right_click(e){
                this.icon_arr = e
            },


            //移动到分组点击事件
            grou_ping(e){
                let that = this
                if(that.$store.state.user_id != ''){
                    that.axios.get(that.$store.state.config.port+'/update_group_url_group',{
                    params: {
                            groupid: that.$store.state.group_data[e].groupid,
                            urlid:that.$store.state.icon_data[that.icon_arr].urlid,
                            userid:that.$store.state.user_id
                        }
                    })
                    .then(function () {
                        // handle success
                        // console.log(response);
                        that.$store.state.icon_data.splice(that.icon_arr,1)
                    })
                    .catch(function () {
                        // handle error
                        // console.log(error);
                        alert("分组失败，可能是网络问题，重新试一下")
                        location.reload();
                    })
                }else{
                    that.$message.info('现在就是当前组');
                }
            },


            //抓鱼分享组件事件
            showDrawer() {
                this.$message.info('😭 抓鱼分享维护中...');
            },
            onClose() {

            },
            onChange() {

            },


            //弹窗关闭
            popup_show() {
                this.$store.state.popup = true
            },


            //点击分组
            group_click(e) {
                // this.$message.info('现在就是当前组');
                this.group_show = false
                
                
                let that = this
                if(that.$store.state.user_id != ''){
                    that.axios.get(that.$store.state.config.port+'/get_group_url',{
                    params: {
                            groupid:that.$store.state.group_data[e].groupid,
                            userid:that.$store.state.user_id
                        }
                    })
                    .then(function (response) {
                        that.group_show = true
                        if (response.data.body.data.length > 0) {
                            that.$store.state.icon_data = []
                            for(var i5=0;i5<response.data.body.data.length;i5++){
                                that.$store.state.icon_data.push(JSON.parse(response.data.body.data[i5]))
                            }
                            that.$store.state.pattern_data = '我的收藏'
                        }else{
                            that.$message.info('这个分组空空如也~~  可以右击图标分组');
                        }
                        
                    })
                    .catch(function (error) {
                        // handle error
                        that.$message.info('请求失败，检查下是不是网络问题呐？');
                        console.log(error);

                    })
                }else{
                    that.$message.info('现在就是当前组');
                }
            }
        }
    }
</script>
<style scoped>
    .animate__animated.animate__fadeInUp {
        --animate-duration: 0.2s;
    }

    .animate__animated.animate__fadeIn {
        --animate-duration: 0.3s;
    }

    .box {
        width: 100%;
        height: 60vh;
        margin-top: -18px;
    }

    .grid-box {
        height: 66vh;
        display: grid;
        padding-bottom: 88px;
        grid-template-columns: repeat(13, 76px);
        grid-auto-rows: 80px;
        grid-gap: 18px;
        grid-row-gap: 32px;
        grid-auto-flow: dense;
        box-sizing: border-box;
        justify-content: center;
        overflow-y: scroll;
    }

    .grid-box-items-title {
        margin-top: 6px;
        text-align: center;
        font-size: 12px;
        font-weight: 400;
        color: #fff;
        text-shadow: 0px 2px 6px rgba(8, 8, 8, 0.8);
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .grid-box-items {
        width: 62px;
        height: 62px;
        grid-row: span 1;
        grid-column: span 1;
        background-color: #fff;
        box-shadow: 2px 2px 10px rgba(91, 91, 91, 0.1);
        border-radius: 15px;
        color: #000;
        text-align: center;
        margin: 0 auto;
    }

    .grid-box-items-x4 {
        width: 100%;
        height: 175px;
        grid-row: span 2;
        grid-column: span 2;
        background-color: #fff;
        box-shadow: 2px 2px 10px rgba(91, 91, 91, 0.1);
        border-radius: 15px;
        color: #000;
        text-align: center;
        margin: 0 auto;
    }

    .grid-box-items-x9 {
        width: 100%;
        height: 175px;
        grid-row: span 3;
        grid-column: span 3;
        background-color: rgb(18, 113, 255);
        box-shadow: 2px 2px 10px rgba(8, 8, 8, 0.1);
        border-radius: 15px;
        color: #000;
        text-align: center;
        margin: 0 auto;
    }

    .grid-box-items-x8 {
        width: 100%;
        height: 175px;
        grid-row: span 2;
        grid-column: span 4;
        background-color: #fff;
        box-shadow: 2px 2px 10px rgba(8, 8, 8, 0.1);
        border-radius: 15px;
        color: #000;
        text-align: center;
        margin: 0 auto;
    }

    .grid-box-items:hover {
        cursor: pointer;
        box-shadow: 2px 3px 12px rgba(31, 31, 31, 0.1);

    }

    .grid-box-items:active {
        cursor: pointer;
        transition: all 0.3s;
        /* 过度 */
        -moz-transition: all 0.3s;
        /* Firefox */
        -webkit-transition: all 0.3s;
        /* Safari 和 Chrome */
        transform: scale(.95);
    }

    .group-box {
        width: 1210px;
        margin: 0 auto;
        display: flex;
    }

    .group-box-item {
        padding: 0 15px 0 15px;
        height: 36px;
        border-radius: 50px;
        background: rgba(205, 205, 205, 0.3);
        box-shadow: 3px 5px 10px 5px rgba(0, 0, 0, .1);
        backdrop-filter: saturate(200%) blur(5px);
        margin-left: 12px;
        margin-bottom: 20px;
        display: flex;
    }

    .group-box-item:hover {
        cursor: pointer;
        transition: all 0.3s;
        /* 过度 */
        -moz-transition: all 0.3s;
        /* Firefox */
        -webkit-transition: all 0.3s;
        /* Safari 和 Chrome */
        background-color: rgba(223, 223, 223, 0.5);
    }

    .group-box-item-icon {
        display: block;
        font-size: 26px;
        margin-left: -12px;
        margin-top: -2px;

    }

    .group-box-item-icon-add {
        width: 24px;
        height: 24px;
        background-color: #fff;
        border-radius: 15px;
        margin-top: 6px;
        margin-left: -8px;
        font-size: 14px;
        text-align: center;
        line-height: 25px;

    }

    .group-box-item-title {
        display: block;
        font-size: 16px;
        color: #fff;
        margin-top: 6px;
        margin-left: 6px;
        text-shadow: 0px 2px 5px rgba(80, 80, 80, 0.2);
    }

    .group-create-box {
        border-radius: 20px;
        position: absolute;
        z-index: 9999;
        width: 300px;
        height: 296px;
        background-color: rgb(18, 113, 255);
    }

    .emoji-box {
        border-radius: 20px;
        height: 220px;
        overflow-y: scroll;
        margin-top: 8px;
    }

    .emoji-list {
        display: inline-flex;
        height: 38px;
        width: 38px;
        font-size: 34px;
        margin-left: 10px;
        margin-top: 10px;
        border-radius: 30px;
        text-align: center;
        line-height: 35px;
    }

    .edi-box {
        margin-top: 12px;
        margin-left: 10px;
    }

    .edi-input {
        border: none;
        width: 200px;
        height: 42px;
        background-color: #fff;
        border-radius: 30px;
        padding: 10px 15px;
    }

    .create-button {
        display: block;
        float: right;
        margin-right: 10px;
        border-radius: 30px;
        width: 68px;
        height: 42px;
        background-color: #fff;
        font-size: 16px;
        text-align: center;
        line-height: 40px;
        color: #000;
        box-shadow: 2px 2px 25px rgba(3, 3, 3, 0.3);
    }
</style>