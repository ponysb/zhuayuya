<template>
    <div>
        <!-- 搜索 -->
        <div v-show="$store.state.search.issue" class="searchview-box">
            <div class="searchview-group">
                <div class="searchview-group-biaoqian">百度</div>
                <div class="searchview-list-box">
                    <a v-for="(baidus,index) in $store.state.search_data.issue.baidu" :key="index" :href="'https://www.baidu.com/s?ie=UTF-8&wd='+baidus" target="_block" class="searchview-list">{{decodeURIComponent(baidus)}}</a>
                </div>
            </div>

            <div class="searchview-group">
                <div style="background-color: rgb(36, 207, 101);" class="searchview-group-biaoqian">360</div>
                <div class="searchview-list-box">
                    <a v-for="(sanliulings,index) in $store.state.search_data.issue.sanliuling" :key="index" :href="'https://www.so.com/s?ie=utf-8&fr=none&src=360sou_newhome&q='+sanliulings.word" target="_block" class="searchview-list">{{decodeURIComponent(sanliulings.word)}}</a>
                </div>
            </div>

            <div class="searchview-group">
                <div style="background-color: rgb(36, 187, 207);" class="searchview-group-biaoqian">必应</div>
                <div class="searchview-list-box">
                    <a v-for="(bings,index) in $store.state.search_data.issue.bing" :key="index" :href="'https://cn.bing.com/search?q='+bings.Txt" target="_block" class="searchview-list">{{decodeURIComponent(bings.Txt)}}</a>
                </div>
            </div>
        </div>

        <!-- 资讯 -->
        <div v-show="$store.state.search.inf" class="searchview-box">
            <div class="searchview-group">
                <div class="searchview-group-biaoqian">微信公众号</div>
                <div class="searchview-list-box">
                    <a v-for="(weixins,index) in $store.state.search_data.inf.weixin" :key="index" :href="'https://weixin.sogou.com/weixin?type=2&query='+weixins" target="_block" class="searchview-list">{{decodeURIComponent(weixins)}}</a>
                </div>
            </div>

            <div class="searchview-group">
                <div style="background-color:#f04142;" class="searchview-group-biaoqian">今日头条</div>
                <div class="searchview-list-box">
                    <a v-for="(toutiaos,index) in $store.state.search_data.inf.toutiao" :key="index" :href="'https://so.toutiao.com/search?dvpf=pc&source=input&keyword='+toutiaos.keyword" target="_block" class="searchview-list">{{decodeURIComponent(toutiaos.keyword)}}</a>
                </div>
            </div>

            <div class="searchview-group">
                <div style="background-color:#06f;" class="searchview-group-biaoqian">知乎</div>
                <div class="searchview-list-box">
                    <a v-for="(zhihus,index) in $store.state.search_data.inf.zhihu" :key="index" :href="'https://www.zhihu.com/search?type=content&q='+zhihus.query" target="_block" class="searchview-list">{{decodeURIComponent(zhihus.query)}}</a>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
        }
    },
    methods: {
        
    }
}
</script>
<style scoped>
.searchview-group-biaoqian{
    height: 16px;
    background-color: rgb(47, 130, 255);
    border-radius: 15px 0px 15px 0px;
    font-size: 12px;
    color: #fff;
    padding-left: 12px;
    padding-right: 12px;
    line-height: 16px;
    position: absolute;
}
:hover .searchview-list{
    cursor: pointer;
}
.searchview-list-box{
    margin-top: 10px;
    margin-bottom: 10px;
}
.searchview-list{
    display: block;
    width: 90%;
    height: 36px;
    margin: 0 auto;
    background-color: #f1f1f1;
    margin-top: 10px;
    font-size: 14px;
    text-align: left;
    padding-left: 10px;
    line-height: 36px;
    border-radius: 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.searchview-box{
    margin-top: 10px;
    margin-left: -20px;
    display: flex;
    justify-content: center;
}
.searchview-group{
    flex-direction: row;
    width: 300px;
    height: 360px;
    overflow: auto;
    margin-left: 20px;
    background-color: rgb(255, 255, 255);
    box-shadow: 2px 2px 15px rgba(32, 121, 238, 0.1);
    border-radius: 20px;
}
</style>