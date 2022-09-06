<template>
    <div class="rweb-box">
        <div @click="show_(1)" v-if="show.one" class="rweb-class">网站盲盒</div>
        <div @click="show_(2)" v-if="show.tow" class="rweb-class">{{web_data.title}}</div>
        <div @click="rweb_ok" class="rweb-ok">点我点我</div>
    </div>
</template>
<script>
export default {
    mounted() {
        this.web_data = this.web[Math.round(Math.random()*35)]
    },
    data() {
        return {
            show:{one:true,tow:false},
            web_data:{},
            web:[
                {title:"绿茶语录生成器",src:"https://lovelive.tools/?utm_source=shadiao.app",index:0},
                {title:"诺基亚短信图片生成器",src:"https://zzkia.noddl.me:8020/?from=www.shadiao.app",index:1},
                {title:"狗屁不通文章生成器",src:"https://suulnnka.github.io/BullshitGenerator/index.html?from=www.shadiao.app",index:2},
                {title:"网络用语缩写查询",src:"https://lab.magiconch.com/nbnhhsh/?utm_source=shadiao.app",index:3},
                {title:"小霸王在线",src:"https://www.yikm.net/?utm_source=shadiao.app",index:4},
                {title:"网易云段子",src:"http://www.yduanzi.com/?utm_source=shadiao.app",index:5},
                {title:"迷宫生成器",src:"https://www.mazegenerator.net/",index:6},
                {title:"改图鸭",src:"https://www.gaituya.com/manhua/?zhljj220330",index:7},
                {title:"长长的虫子",src:"http://www.staggeringbeauty.com/",index:8},
                {title:"3d小游戏",src:"https://www.crazygames.com/",index:9},
                {title:"纪妖",src:"http://www.cbaigui.com/",index:"10"},
                {title:"查找不懂得emoji",src:"http://emojisandearthporn.com/",index:11},
                {title:"黑客神器",src:"https://geektyper.com/matrix/",index:12},
                {title:"键盘字",src:"http://magickeyboard.io/",index:13},
                {title:"360全景",src:"https://www.airpano.org.cn/",index:14},
                {title:"wikihow",src:"https://zh.wikihow.com/",index:15},
                {title:"全历史",src:"https://www.allhistory.com/",index:16},
                {title:"自动扣图",src:"https://www.remove.bg/zh",index:17},
                {title:"需求图谱",src:"https://www.5118.com/naotu/?t=zhihu",index:18},
                {title:"nazo",src:"https://nazo.one-story.cn/",index:19},
                {title:"找色差",src:"http://www.cuishuai.cc/game/",index:20},
                {title:"俄罗斯方块",src:"http://farter.cn/tetr.js/",index:21},
                {title:"千亿像素看中国",src:"http://pf.bigpixel.cn/zh-CN.html",index:22},
                {title:"在线魔方",src:"https://tools.bqrdh.com/rubiks-cube/",index:23},
                {title:"火箭发射记录",src:"火箭发射记录",index:24},
                {title:"隔离食品手册",src:"https://cook.yunyoujun.cn/",index:25},
                {title:"越吃越大",src:"https://www.polkadotgame.com/",index:26},
                {title:"反向词典",src:"https://wantwords.net/",index:27},
                {title:"孔明灯",src:"https://henxiangsi.com/?show_type=infinite",index:28},
                {title:"球归色条",src:"http://looptap.top/",index:29},
                {title:"粉碎病毒",src:"https://coronavirus-ninja.com/",index:30},
                {title:"架子鼓",src:"http://guozhivip.com/jzg/",index:31},
                {title:"在线贪吃蛇",src:"http://slither.io/",index:32},
                {title:"流星雨",src:"https://www.meteorshowers.org/",index:33},
                {title:"对称绘画",src:"http://weavesilk.com/",index:34},
                {title:"躲避小游戏",src:"http://guiduo.top/",index:35},
            ]
        }
    },
    methods:{
            rweb_ok(){
                window.open(this.web_data.src)
                this.web_data = this.web[Math.round(Math.random()*35)]
            },
            show_(e){
                if(e == 1){
                    this.show.one = false
                    this.show.tow = true
                }else{
                    this.show.one = true
                    this.show.tow = false
                }
            }
        }
}
</script>
<style scoped>
.rweb-box{
    width: 100%;
    height: 100%;
    background-color: #fff;
    box-sizing:border-box;
    border-radius: 15px;
    text-align: left;
    overflow-y: scroll;
}
.rweb-class{
    width: 150px;
    height: 88px;
    background-color: rgb(18, 113, 255, .1);
    margin: 0 auto;
    margin-top: 10px;
    border-radius: 10px;
    font-weight: 800;
    font-size: 28px;
    color: rgb(18, 113, 255);
    line-height: 85px;
    text-align: center;
}
.rweb-ok{
    width: 100px;
    height: 38px;
    background-color: rgb(18, 113, 255);
    box-shadow: 0px 5px 20px rgb(18, 113, 255, .5);
    margin: 0 auto;
    margin-top: 20px;
    border-radius: 50px;
    text-align: center;
    color: #fff;
    line-height: 37px;
}
</style>