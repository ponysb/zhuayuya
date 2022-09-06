<template>
    <div>
        <div style="width: 100%; height: 30px; background-color: rgb(18, 113, 255); border-radius: 15px 15px 0px 0px; display: flex;">
            <div style="display: flex; margin-left: 6px; width: 218px; overflow-y: scroll;">
                <span v-for="(rss_title_lists,index) in rss_title_list" :key="index" :index="index" @click="cs_click(index)" class="rss-title-list">{{rss_title_lists.title}}</span>
            </div>
            <span @click="rss_add_tab" style="display: inline-block; flex: 1; text-align: right; margin-right: 10px; margin-top: 7px; color: #fff;">{{add}}</span>
        </div>
        <div v-show="rss.rsslist" class="rss-box">


            <a v-for="(rss_datas,index) in rss_data" :key="index" :index="index" target="_block" :href="rss_datas.link[0]" class="rss-list">
                <span class="rss-title">{{rss_datas.title[0]}}</span>
                <span class="rss-content">{{dreg(rss_datas.description[0])}}</span>
                <span class="rss-time">{{rss_datas.pubDate[0]}}</span>
                <div class="rss--"></div>
            </a>
            



        </div>
        <div v-show="rss.rssadd" class="add-box">
            <input class="add-title" v-model="rss_title" placeholder="订阅标题" type="text">
            <textarea v-model="rss_src" class="add-edi" placeholder="输入要订阅的RSS链接"></textarea>
            <span style="color: crimson; font-size: 12px; font-weight: 400; margin-left: 15px;">{{woring}}</span>
            <span @click="rss_add_ok" class="add-ok">确定</span>
        </div>
    </div>
</template>
<script>
export default {
    mounted() {
        let that = this
        if(that.$store.state.user_id != ""){
            that.axios.get(that.$store.state.config.port+'/get_rss_list',{
                params: {
                    userid:that.$store.state.user_id
                }
            })
            .then(function (response) {
                // console.log(response)
                if(response.data.list == 0){
                    that.axios.get(that.$store.state.config.port+'/get_rss',{
                        params: {
                        url:"https://sspai.com/feed"
                    }
                    })
                    .then(function (response) {
                        that.rss_data = response.data
                    })
                }else{
                    if(response != "仅支持rss2.0"){
                        if(response != "请求失败"){
                            //rss第一条数据渲染
                            that.rss_data = response.data.one_data

                            //rss 列表
                            for (let index = 0; index < response.data.list.length; index++) {
                                that.rss_title_list.unshift(JSON.parse(response.data.list[index]))
                                
                            }
                        }
                    }
                }
                
            })
        }else{
            that.axios.get(that.$store.state.config.port+'/get_rss',{
                params: {
                    url:"https://sspai.com/feed"
                }
            })
            .then(function (response) {
                    that.rss_data = response.data
            })
        }
    },
    data() {
        return {
            rss:{rsslist:true,rssadd:false},
            add:"添加",
            rss_src:"",
            rss_title:"",
            woring:"",
            rss_title_list:[
                {title:"少数派",src:"https://sspai.com/feed"},
                
            ],
            rss_data:[]
        }
    },
    methods: {
        dreg(e){
            return e.replace(/<\/?.+?\/?>/g,'')
        },
        rss_add_tab(){
            if(this.$store.state.user_id != ""){
                if(this.add == "添加"){
                    this.rss.rsslist = false
                    this.rss.rssadd = true
                    this.add = "返回"
                }else{
                    this.rss.rsslist = true
                    this.rss.rssadd = false
                    this.add = "添加"
                }
            }else{
                this.$message.info('这个功能需要登录后才可以使用哦～～');
            }
            
        },
        rss_add_ok(){
            let that = this
            if(that.$store.state.user_id != ""){

                if(that.rss_title == ""){
                    that.woring = "请输入标题"
                }else{
                    if(that.rss_src == ""){
                        that.woring = "请输入要订阅的RSS链接"
                    }else{
                        that.axios.get(that.$store.state.config.port+'/set_rss',{
                            params: {
                            url:that.rss_src,
                            title:that.rss_title,
                            userid:that.$store.state.user_id
                        }
                        })
                        .then(function (response) {
                            // console.log(response);
                            if(response.data == "仅支持rss2.0"){
                                that.woring = "仅支持rss2.0"
                            }else{
                                if(response.data == "请求失败"){
                                that.woring = "请求失败"
                                }else{
                                    that.rss_data = response.data
                                    that.rss.rsslist = true
                                    that.rss.rssadd = false
                                    that.rss_title_list.unshift({title:that.rss_title,src:that.rss_src})
                                    that.rss_title = ""
                                    that.rss_src = ""
                                    that.add = "添加"
                                }
                            }
                            
                        })
                    }
                }
            }else{
                this.$message.info('这个功能需要登录后才可以使用哦～～');
            }

        },
        cs_click(e){
            let that = this
            that.axios.get(that.$store.state.config.port+'/get_rss',{
                params: {
                  url:that.rss_title_list[e].src
              }
            })
            .then(function (response) {
                // console.log(response.data);
                that.rss_data = response.data
            })
        }
    },
}
</script>
<style scoped>
:hover span{
    cursor: pointer;
}
::-webkit-scrollbar{
    height: 0px;
    width: 0px;
}
.add-title{
    display: block;
    width: 250px;
    height: 50px;
    padding: 10px 15px;
    background-color: aliceblue;
    margin: 0 auto;
    margin-top: 15px;
    border-radius: 10px;
    resize: none;
    outline: none;
    border: none;
}
.add-edi{
    display: block;
    width: 250px;
    height: 100px;
    padding: 10px 15px;
    background-color: aliceblue;
    margin: 0 auto;
    margin-top: 10px;
    border-radius: 10px;
    resize: none;
    outline: none;
    border: none;
}
.add-ok{
    display: block;
    width: 128px;
    height: 50px;
    background-color: rgb(42, 81, 255);
    color: #fff;
    font-size: 16px;
    border-radius: 15px;
    margin: 0 auto;
    margin-top: 5px;
    text-align: center;
    line-height: 50px;
}
.rss-title{
    display: -webkit-box;
    color: rgb(42, 81, 255);
    font-size: 15px;
    font-weight: 500;
    width: 242px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.rss-content{
    display: -webkit-box;
    color: rgb(67, 67, 67);
    font-size: 12px;
    font-weight: 300;
    width: 240px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}
.rss-time{
    display: block;
    color: rgb(26, 26, 26);
    font-size: 12px;
    font-weight: 500;
    width: 260px;
    margin-top: 3px;
}
.rss-list{
    display: block;
    margin-left: 10px;
    margin-top: 5px;
}
.rss--{
    width: 238px;
    height: 1px;
    margin-top: 5px;
    background-color: rgb(239, 239, 239);
}
.rss-title-list{
    display: inline-block;
    white-space:nowrap;
    background-color: rgb(42, 81, 255);
    padding: 1px 8px;
    margin-left: 6px;
    margin-top: 6px;
    border-radius: 10px;
    color: rgb(255, 255, 255);
}
.rss-box{
    width: 100%;
    height: 257px;
    border: 5px solid rgb(18, 113, 255);
    background-color: #fff;
    box-sizing:border-box;
    border-radius: 15px;
    text-align: left;
    overflow-y: scroll;
    overflow-x: hidden;
}
.add-box{
    width: 100%;
    height: 270px;
    border: 5px solid rgb(18, 113, 255);
    background-color: #fff;
    box-sizing:border-box;
    border-radius: 15px;
    text-align: left;
    overflow-y: scroll;
}
</style>