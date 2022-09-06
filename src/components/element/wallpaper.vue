<template>
    <div class="popup-box-content">
        <div class="tab-box">
            <div @click="tab_click(1)" class="tab-button" :style="tab_.tab1">动态壁纸</div>
            <div @click="tab_click(2)" class="tab-button" :style="tab_.tab2">图片壁纸</div>
        </div>
        <div class="wallpa-box">
            <div class="wallpa-list" @click="wallpa_click(index)" v-for="(wallpa_datas ,index) in wallpa_data"
                :index="index" :key="index">
                <img v-if="wallpa_datas.type == biaoji" class="wallpa-list-img" v-lazy="wallpa_datas.img" alt="">
                <!-- <img v-if="wallpa_datas.type == biaoji" class="wallpa-list-img" :src="wallpa_datas.img" alt=""> -->
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                tab_: { tab1: "background-color: rgb(25, 137, 241); color:#fff", tab2: '' },
                wallpa_data: [
                    { type: 'img', source: 'https://img.zhuayuya.com/wallpaper/img/wallpa_img_1001.jpg', img: 'https://img.zhuayuya.com/wallpaper/img/wallpa_img_1001_mini.jpg' },
                    { type: 'img', source: 'https://img.zhuayuya.com/wallpaper/img/wallpa_img_1002.jpg', img: 'https://img.zhuayuya.com/wallpaper/img/wallpa_img_1002_mini.jpg' },
                    { type: 'img', source: 'https://img.zhuayuya.com/wallpaper/img/wallpa_img_1003.jpg', img: 'https://img.zhuayuya.com/wallpaper/img/wallpa_img_1003_mini.jpg' },
                    { type: 'img', source: 'https://img.zhuayuya.com/wallpaper/img/wallpa_img_1004.jpg', img: 'https://img.zhuayuya.com/wallpaper/img/wallpa_img_1004_mini.jpg' },
                    { type: 'img', source: 'https://img.zhuayuya.com/wallpaper/img/wallpa_img_1005.jpg', img: 'https://img.zhuayuya.com/wallpaper/img/wallpa_img_1005_mini.jpg' },
                    { type: 'img', source: 'https://img.zhuayuya.com/wallpaper/img/wallpa_img_1006.jpg', img: 'https://img.zhuayuya.com/wallpaper/img/wallpa_img_1006_mini.jpg' },
                    { type: 'img', source: 'https://img.zhuayuya.com/wallpaper/img/wallpa_img_1007.jpg', img: 'https://img.zhuayuya.com/wallpaper/img/wallpa_img_1007_mini.jpg' },
                    { type: 'img', source: 'https://img.zhuayuya.com/wallpaper/img/wallpa_img_1009.jpg', img: 'https://img.zhuayuya.com/wallpaper/img/wallpa_img_1009_mini.jpg' },
                    { type: 'img', source: 'https://img.zhuayuya.com/wallpaper/img/wallpa_img_1010.jpg', img: 'https://img.zhuayuya.com/wallpaper/img/wallpa_img_1010_mini.jpg' },
                    { type: 'img', source: 'https://img.zhuayuya.com/wallpaper/img/wallpa_img_1011.jpg', img: 'https://img.zhuayuya.com/wallpaper/img/wallpa_img_1011_mini.jpg' },
                    { type: 'img', source: 'https://img.zhuayuya.com/wallpaper/img/wallpa_img_1012.jpg', img: 'https://img.zhuayuya.com/wallpaper/img/wallpa_img_1012_mini.jpg' },
                    { type: 'img', source: 'https://img.zhuayuya.com/wallpaper/img/wallpa_img_1013.jpg', img: 'https://img.zhuayuya.com/wallpaper/img/wallpa_img_1013_mini.jpg' },
                    { type: 'img', source: 'https://img.zhuayuya.com/wallpaper/img/wallpa_img_1014.jpg', img: 'https://img.zhuayuya.com/wallpaper/img/wallpa_img_1014_mini.jpg' },
                    { type: 'img', source: 'https://img.zhuayuya.com/wallpaper/img/wallpa_img_1015.jpg', img: 'https://img.zhuayuya.com/wallpaper/img/wallpa_img_1015_mini.jpg' },
                    { type: 'img', source: 'https://img.zhuayuya.com/wallpaper/img/wallpa_img_1016.jpg', img: 'https://img.zhuayuya.com/wallpaper/img/wallpa_img_1016_mini.jpg' },
                    { type: 'img', source: 'https://img.zhuayuya.com/wallpaper/img/wallpa_img_1017.jpg', img: 'https://img.zhuayuya.com/wallpaper/img/wallpa_img_1017_mini.jpg' },
                    { type: 'img', source: 'https://img.zhuayuya.com/wallpaper/img/wallpa_img_1018.jpg', img: 'https://img.zhuayuya.com/wallpaper/img/wallpa_img_1018_mini.jpg' },
                    { type: 'img', source: 'https://img.zhuayuya.com/wallpaper/img/wallpa_img_1019.jpg', img: 'https://img.zhuayuya.com/wallpaper/img/wallpa_img_1019_mini.jpg' },
                    { type: 'img', source: 'https://img.zhuayuya.com/wallpaper/img/wallpa_img_1020.jpg', img: 'https://img.zhuayuya.com/wallpaper/img/wallpa_img_1020_mini.jpg' },
                    { type: 'img', source: 'https://img.zhuayuya.com/wallpaper/img/wallpa_img_1021.jpg', img: 'https://img.zhuayuya.com/wallpaper/img/wallpa_img_1021_mini.jpg' },
                    { type: 'img', source: 'https://img.zhuayuya.com/wallpaper/img/wallpa_img_1022.jpg', img: 'https://img.zhuayuya.com/wallpaper/img/wallpa_img_1022_mini.jpg' },
                    { type: 'img', source: 'https://img.zhuayuya.com/wallpaper/img/wallpa_img_1023.png', img: 'https://img.zhuayuya.com/wallpaper/img/wallpa_img_1023_mini.jpg' },
                    { type: 'img', source: 'https://img.zhuayuya.com/wallpaper/img/wallpa_img_1024.jpeg', img: 'https://img.zhuayuya.com/wallpaper/img/wallpa_img_1024_mini.jpg' },
                    { type: 'video', source: 'https://img.zhuayuya.com/wallpaper/video/wallpa_video_1001.mp4', img: 'https://img.zhuayuya.com/wallpaper/video/wallpa_video_1001.jpg' },
                    { type: 'video', source: 'https://img.zhuayuya.com/wallpaper/video/wallpa_video_1002.mp4', img: 'https://img.zhuayuya.com/wallpaper/video/wallpa_video_1002.jpg' },
                    { type: 'video', source: 'https://img.zhuayuya.com/wallpaper/video/wallpa_video_1003.mp4', img: 'https://img.zhuayuya.com/wallpaper/video/wallpa_video_1003.jpg' },
                    { type: 'video', source: 'https://img.zhuayuya.com/wallpaper/video/wallpa_video_1004.mp4', img: 'https://img.zhuayuya.com/wallpaper/video/wallpa_video_1004.jpg' },
                    { type: 'video', source: 'https://img.zhuayuya.com/wallpaper/video/wallpa_video_1005.mp4', img: 'https://img.zhuayuya.com/wallpaper/video/wallpa_video_1005.jpg' },
                    { type: 'video', source: 'https://img.zhuayuya.com/wallpaper/video/wallpa_video_1006.mp4', img: 'https://img.zhuayuya.com/wallpaper/video/wallpa_video_1006.jpg' },
                    { type: 'video', source: 'https://img.zhuayuya.com/wallpaper/video/wallpa_video_1007.mp4', img: 'https://img.zhuayuya.com/wallpaper/video/wallpa_video_1007.jpg' },
                    { type: 'video', source: 'https://img.zhuayuya.com/wallpaper/video/wallpa_video_1008.mp4', img: 'https://img.zhuayuya.com/wallpaper/video/wallpa_video_1008.jpg' },
                    { type: 'video', source: 'https://img.zhuayuya.com/wallpaper/video/wallpa_video_1009.mp4', img: 'https://img.zhuayuya.com/wallpaper/video/wallpa_video_1009.jpg' },
                    { type: 'video', source: 'https://img.zhuayuya.com/wallpaper/video/wallpa_video_1010.mp4', img: 'https://img.zhuayuya.com/wallpaper/video/wallpa_video_1010.jpg' },
                    { type: 'video', source: 'https://img.zhuayuya.com/wallpaper/video/wallpa_video_1012.mp4', img: 'https://img.zhuayuya.com/wallpaper/video/wallpa_video_1012.jpg' },
                    { type: 'video', source: 'https://img.zhuayuya.com/wallpaper/video/wallpa_video_1015.mp4', img: 'https://img.zhuayuya.com/wallpaper/video/wallpa_video_1015.jpg' },
                    { type: 'video', source: 'https://img.zhuayuya.com/wallpaper/video/wallpa_video_1016.mp4', img: 'https://img.zhuayuya.com/wallpaper/video/wallpa_video_1016.jpg' },
                    { type: 'video', source: 'https://img.zhuayuya.com/wallpaper/video/wallpa_video_1017.mp4', img: 'https://img.zhuayuya.com/wallpaper/video/wallpa_video_1017.jpg' },
                    { type: 'video', source: 'https://img.zhuayuya.com/wallpaper/video/wallpa_video_1018.mp4', img: 'https://img.zhuayuya.com/wallpaper/video/wallpa_video_1018.jpg' },
                    { type: 'video', source: 'https://img.zhuayuya.com/wallpaper/video/wallpa_video_1019.mp4', img: 'https://img.zhuayuya.com/wallpaper/video/wallpa_video_1019.jpg' },
                    { type: 'video', source: 'https://img.zhuayuya.com/wallpaper/video/wallpa_video_1020.mp4', img: 'https://img.zhuayuya.com/wallpaper/video/wallpa_video_1020.jpg' },
                    { type: 'video', source: 'https://img.zhuayuya.com/wallpaper/video/wallpa_video_1022.mp4', img: 'https://img.zhuayuya.com/wallpaper/video/wallpa_video_1022.jpg' }
                ],
                biaoji: 'video'
            };
        },
        methods: {
            wallpa_click(index) {
                // console.log(this.wallpa_data[index].type)
                if (this.wallpa_data[index].type == 'img') {
                    this.$store.state.wallpa_img = this.wallpa_data[index].source
                    this.$store.state.wallpa_video = ''
                    localStorage.setItem('wallpa', JSON.stringify({ src: this.wallpa_data[index].source, type: 'img' }))
                }
                if (this.wallpa_data[index].type == 'video') {
                    this.$store.state.wallpa_video = this.wallpa_data[index].source
                    this.$store.state.wallpa_img = ''
                    localStorage.setItem('wallpa', JSON.stringify({ src: this.wallpa_data[index].source, type: 'video' }))
                }
            },
            tab_click(index) {
                if (index == 1) {
                    this.tab_.tab1 = "background-color: rgb(25, 137, 241); color:#fff"
                    this.tab_.tab2 = ""
                    this.biaoji = 'video'
                }
                if (index == 2) {
                    this.tab_.tab2 = "background-color: rgb(25, 137, 241); color:#fff"
                    this.tab_.tab1 = ""
                    this.biaoji = 'img'
                }
            }
        }
    }
</script>
<style scoped>
    :hover .tab-button {
        cursor: pointer;
    }

    :hover .wallpa-list {
        cursor: pointer;
    }
    .popup-box-content {
        position: fixed;
        font-size: 24px;
        width: 880px;
        height: 560px;
        background-color: #fff;
        border-radius: 15px;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        z-index: 1000;
    }

    .tab-box {
        display: flex;
        margin-left: 10px;
        margin-top: 26px;
    }

    .tab-button {
        height: 40px;
        padding: 0px 20px 0px 20px;
        margin-left: 20px;
        background-color: rgb(255, 255, 255);
        border-radius: 30px;
        font-size: 16px;
        line-height: 38px;
        text-align: center;
        box-shadow: 2px 5px 15px rgba(6, 60, 110, 0.1);
    }

    .wallpa-box {
        margin-top: 8px;
        margin-left: 16px;
        height: 460px;
        display: flex;
        justify-content: left;
        flex-wrap: wrap;
        overflow-y: scroll;
    }

    .wallpa-list-img {
        margin-left: 12px;
        margin-top: 12px;
        width: 266px;
        height: 160px;
        border-radius: 16px;
    }

    /* .wallpa-list{
            background-color: black;
        } */

    .wallpa-list-img[lazy="loading"] {
        background: #000;
    }
</style>