<template>
    <div>
        <div style="width: 100%; height: 30px; background-color: rgb(18, 113, 255); border-radius: 15px 15px 0px 0px; display: flex;">
            <span @click="tabs_(1)" class="tab-title">摸鱼聊天室
                <span :class="tab_data.tab1"></span>
            </span>
            <!-- <span @click="tabs_(2)" class="tab-title">小鸡辞典
                <span :class="tab_data.tab2"></span>
            </span> -->
        </div>
        <div class="dchat-box">
            <div v-for="(lists,index) in $store.state.dchatList" :key="index" :index="index" >
                <span class="dchat-list">{{JSON.parse(lists).msg}}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    created() {
        // let that = this
        // that.axios.get(that.$store.state.config.port+'/get_barrage')
        //   .then(function (response) {
        //       // handle success
        //     //   console.log(response.data);
        //       that.$store.state.dchatList = response.data
              
        //   })
        //   .catch(function () {
        //       // handle error
        //     //   console.log(error);
        //   })
    },
    data() {
        return {
            tab_data:{tab1:"tab-underline",tab2:""}
        }
    },
    methods: {
        tabs_(e){
            if(e == 1){
                this.tab_data.tab1 = "tab-underline"
                this.tab_data.tab2 = ""
            }
            if(e == 2){
                this.tab_data.tab2 = "tab-underline"
                this.tab_data.tab1 = ""
            }
        },
    },
}
</script>
<style scoped>
.tab-title{
    display: block;
    color: #fff;
    text-align: left;
    margin-top: 6px;
    margin-left: 20px;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
}
.tab-underline{
    display: block;
    width: 110%;
    height: 10px;
    background-color: rgb(34, 60, 255);
    border-radius: 10px;
    margin-top: -10px;
    margin-left: -2px;
}
.dchat-box{
    width: 100%;
    height: 257px;
    border: 5px solid rgb(18, 113, 255);
    background-color: #fff;
    box-sizing:border-box;
    border-radius: 15px;
    text-align: left;
    overflow: hidden;
    overflow-y: scroll;
}
.dchat-list{
    display:inline-block;
    max-width: 235px;
    word-wrap:break-all;
    word-wrap:break-word;
    margin-top: 10px;
    font-size: 14px;
    font-weight: 400;
    color: #000;
    background-color: #f1f3fd;
    padding: 5px 10px;
    margin-left: 10px;
    border-radius: 5px;
}
</style>