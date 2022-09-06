<template>
    <div class="novel-box">
        <div class="tabs-box">
            <span v-for="(tabss,index) in tabs" @click="tabs_click(index)" :index="index" :key="index" :style="tabss.style" class="tabs-item">{{tabss.name}}</span>
        </div>
        <div style="height: 128px; margin-top: 6px; margin-left: 15px; overflow: hidden; overflow-y: scroll;">
            <a v-for="(tabs_datas,index) in tabs_data" :index="index" :key="index" class="title-list" target="_block" :href="tabs_datas.link[0]">{{tabs_datas.title[0]}}</a>
        </div>
    </div>
</template>
<script>
var tabs_would = 0
export default {
    mounted() {
        let that = this
        that.axios.get(that.$store.state.config.port+"/get_one_rss",{
            params: {
              id: 0
          }
        })
		.then(function (response) {
			// console.log(response.data)
            that.tabs_data = response.data
			
		})
		.catch(function (error) {
			console.log(error)
			that.showMsg(false,"网络异常");
		})
    },
    data() {
        return {
            tabs_data:[],
            tabs:[
                {name:"优惠精选",style:"background-color: rgb(18, 113, 255); color: rgb(255, 255, 255);"},
                {name:"海淘专区",style:""},
                {name:"社区文章",style:""},
                {name:"发现频道",style:""},
                {name:"资讯专区",style:""}
            ]
            
        }
    },
    methods: {
        tabs_click(e){
            let that = this
            that.tabs[tabs_would].style = ""
            that.tabs[e].style = "background-color: rgb(18, 113, 255); color: rgb(255, 255, 255);"
            tabs_would = e
            
            that.axios.get(that.$store.state.config.port+"/get_one_rss",{
                params: {
                id: e
            }
            })
            .then(function (response) {
                // console.log(response.data)
                that.tabs_data = response.data
                
                
            })
            .catch(function (error) {
                console.log(error)
                that.showMsg(false,"网络异常");
            })
        }
    },
}
</script>
<style scoped>
.title-list{
    display: block;
    width: 330px;
    word-break:keep-all;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis; 
    font-size: 14px;
    font-weight: 350;
    margin-top: 5px;
    color: rgb(85, 85, 85);
}
.novel-box{
    width: 100%;
    height: 100%;
    background-color: rgb(255, 255, 255);
    border-radius: 15px;
    text-align: left;
}
.tabs-box{
    display: inline-block;
    margin-top: 12px;
    margin-left: 6px;
}
.tabs-item{
    padding: 3px 5px;
    margin-left: 8px;
    border-radius: 5px;
    font-size: 12px;
    font-weight: 500;
    color: rgb(18, 113, 255);
}
.title-list:hover{
    color: rgb(18, 113, 255);
    text-decoration:underline;
}
</style>