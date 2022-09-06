<template>
    <div class="novel-box">
        <div class="tabs-box">
            <span v-for="(tabss,index) in tabs" @click="tabs_mou(index)" :index="index" :key="index" :style="tabss.style" class="tabs-item">{{tabss.title}}</span>
        </div>
        <div style="height: 128px; margin-top: 10px; margin-left: 15px; overflow-y: scroll;">
            <a v-for="(urlss,index) in urls" :index="index" :key="index" :href="urlss.url" target="_blank"><span class="title-list">{{urlss.title}}</span></a>
        </div>
    </div>
</template>
<script>
var tabs_would = 0
export default {
    data() {
        return {
            tabs:[],
            urls:[]
            
        }
    },
    mounted() {
        let that = this
        that.axios.get('https://www.xiuqiuread.com/wmcms/action/index.php',{
        params: {
                action:"zhuayuya.novel",
                datatype:"1"
            }
        })
        .then(function (response) {
            for (let index = 0; index < response.data.list.length; index++) {
                if(index == 0){
                    that.tabs.push({...response.data.list[index],...{style:"background-color: rgb(18, 113, 255); color: rgb(255, 255, 255);"}})
                }else{
                    that.tabs.push({...response.data.list[index],...{style:""}})
                }
                
            }

            that.axios.get(response.data.list[0].api_url)
            .then(function (response) {
                that.urls = response.data.list
                
            })
            .catch(function (error) {
                console.log(error);
            })

        })
        .catch(function (error) {
            console.log(error);
        })
    },
    methods: {
        tabs_mou(e){
            this.tabs[tabs_would].style = ""
            this.tabs[e].style = "background-color: rgb(18, 113, 255); color: rgb(255, 255, 255);"
            tabs_would = e

            let that = this
            that.axios.get(this.tabs[e].api_url)
            .then(function (response) {
                that.urls = response.data.list
            })
            .catch(function (error) {
                console.log(error);
            })

        }
    },
}
</script>
<style scoped>
.title-list{
    display: block;
    font-size: 14px;
    font-weight: 400;
    margin-top: 3px;
    
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
}
</style>