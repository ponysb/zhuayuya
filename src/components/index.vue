<template>
    <div>
        <div id="app2">
            <Login />
            <!-- 壁纸弹窗 -->
            <div v-if="$store.state.popup" style="position:absolute; z-index: 9999;" class="animate__animated animate__fadeIn">
                <Wallpaper />
                <!--这里是半透明背景层-->
                <div @click="closepopup" class="over"></div>
            </div>


            <div class="babrrage-box" v-show="$store.state.babrrage_show">
                <Babrrage />
            </div>
            <div class="box">
                <Time_ />
                <Search />
                <div v-show="$store.state.home.view">
                    <div v-if="$store.state.home.pm">
                        <Pm />
                    </div>
                    <div v-if="$store.state.home.design">
                        <Design />
                    </div>
                    <div v-if="$store.state.home.grid">
                        <Grid />
                    </div>
                </div>
                <SearchView />
                
            </div>
        </div>
        <Slide />
        <!-- <video class="wallpa" src="http://182.61.15.77:86/wallpaper/video/wallpa_video_1001.mp4" autoplay muted loop></video> -->
        <video v-if="$store.state.wallpa_video != ''" class="wallpa" :src="$store.state.wallpa_video" autoplay muted loop></video>
        <img v-if="$store.state.wallpa_img != ''" class="wallpa" :src="$store.state.wallpa_img" alt="">  
    </div>
</template>
<script>
    import { notification } from 'ant-design-vue';
    import Grid from './grid/grid.vue'
    import Search from './search/search.vue'
    import Time_ from './time/time.vue'
    import Slide from './slide/slide.vue'
    import Login from './login/login.vue'
    import SearchView from './search/searchview.vue'
    import Design from './mine/design.vue'
    import Pm from './mine/pm.vue'
    import Babrrage from './babrrage/babrrage.vue';
    import Wallpaper from './element/wallpaper.vue'
    export default {
        components: {
            Grid,
            Search,
            Time_,
            Slide,
            Login,
            SearchView,
            Design,
            Pm,
            Babrrage,
            Wallpaper
        },
        mounted() {
            this.axios.get(this.$store.state.config.port+'/csget')
            .then(function (response) {
                console.log(response)
            })




            //公告判断notice
            if(localStorage.getItem("notice") == null){
                setTimeout(function(){
                    notification.open({
                    message: '抓鱼鸭公众号开通了～～',
                    duration: 0,
                    description:<div><h4>微信扫码关注，看点新奇好玩的东西</h4><img class="coder" src="http://img.zhuayuya.com/icon/WechatIMG338.jpeg"></img></div>,
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                });
                localStorage.setItem("notice",1)
                },2000)
            }

        },
        created() {
            //储存key解释：
            //user(state:1代表进来过未登录0代表第一次进来2代表已经登录)      是用户储存
            //pattern   是进入之后默认模式
            //wallpa    壁纸判断进入是否有设置壁纸
            let user = JSON.parse(localStorage.getItem('user'))
            let pattern = JSON.parse(localStorage.getItem('pattern'))
            let wallpa = JSON.parse(localStorage.getItem('wallpa'));


            //判断用户是否设置了壁纸
            if(wallpa != null){
                if(wallpa.type == 'img'){
                    this.$store.state.wallpa_img = wallpa.src
                    this.$store.state.wallpa_video = ''
                }
                if(wallpa.type == 'video'){
                    this.$store.state.wallpa_video = wallpa.src
                    this.$store.state.wallpa_img = ''
                }
            }
            // console.log(user)
            // console.log(pattern)
            // console.log(wallpa)


            //判断用户是否进入过或者是否登录了
            if(user == null){
                // console.log(1)
                this.$store.state.home.grid = true
                localStorage.setItem('user',JSON.stringify({state:1,id:''}))
            }else{
                if(user.state == 1){
                    this.$store.state.home.grid = true
                    if(JSON.parse(localStorage.getItem('defaultuser')) != null){
                        this.$store.state.icon_data = JSON.parse(localStorage.getItem('defaultuser'))
                    }
                }
                if(user.state == 2){
                    this.$store.state.user_id = user.id
                    this.$store.state.nickname = user.name
                    this.$store.commit("start_get");
                    this.$store.state.pattern_value = "我的收藏"
                    if(this.isChinese(this.$store.state.user_id) == true){
                        this.$store.state.binding = true
                    }

                    //判断用户进入默认模式是否已经设置
                    if(pattern != null){
                        if(pattern.state == '1'){
                            this.$store.state.home.grid = true
                            this.$store.state.pattern_value = "我的收藏"
                        }
                        if(pattern.state == '2'){
                            this.$store.state.home.pm = true
                            this.$store.state.pattern_value = "产品经理"
                        }
                        if(pattern.state == '3'){
                            this.$store.state.home.design = true
                            this.$store.state.pattern_value = "Ui设计"
                        }
                        
                    }else{
                        this.$store.state.home.grid = true
                        this.$store.state.user_id = user.id
                        this.$store.state.nickname = user.name
                    }
                }
            }
        },
        methods: {
            closepopup(){
                this.$store.state.popup = false
            },
            isChinese(str) {
                var re = /[^\u4e00-\u9fa5]/;
                if (re.test(str)) return false;
                return true;
            },
        },
    }
</script>
<style scoped>
#app2{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100vh;
    position:fixed;
}
.animate__animated.animate__fadeIn{
    --animate-duration: 0.5s;
}
.wallpa{
    position: fixed;
    right:0;
    bottom: 0;
    min-width: 100%;
    min-height: 100%;
    width: 100%;
    height: 100%;
    z-index: -9999;
    object-fit: cover;
}
.babrrage-box{
    position: relative;
    z-index: 999999;
}
.over {
    position: fixed;
    width: 100%;
    height: 100%;
    opacity: 0.3;
    filter: alpha(opacity=70);
    top: 0;
    left: 0;
    z-index: 99;
    background-color: #030303;
}
.coder{
    width: 120px;
    height: 120px;
}
</style>