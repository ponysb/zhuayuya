<template lang="">
    <div>
        <div class="lusun-box" id="recordButton" type="button">
      
            <img class="lusun-start" src="http://img.zhuayuya.com/icon_/lusunstart.png" alt="">
        </div>
    </div>
</template>
<script>
    import { setup,isSupported } from '@lusun-sdk/recorder';
    // import { oembed } from '@lusun-sdk/recorder';
   export default {
    async mounted() {
        const { supported, error } = isSupported();
            if (!supported) {
                console.warn(`当前浏览器不支持芦笋 SDK: ${error}`);
            } else {
                const { configureButton } = await setup({
                    appId: 'a31b3f49-76df-654e-1c88-3d50a8f1c220', // 通过邮箱申请 app_id，否则影响记录
                });
                const recordButton = configureButton({
                    element: document.getElementById("recordButton"),
                    label: '保存视频', // 自定义预览窗口的按钮文本，默认为“插入视频”
                });
                recordButton.on('insert-click', video => {
                    window.open(video.sharedUrl, '_blank');
                });
                // console.log(configureButton)
                // console.log(this.$refs.recordButton)
            }
    },
   }
</script>
<style>
    .lusun-box{
        width: 62px;
        height: 62px;
        border-radius: 15px;
        background:#F2F2F2;
    }
    .lusun-start{
        display: inline-block;
        width: 50px;
        height: 50px;
        border-radius: 30px;
        margin: 0 auto;
        margin-top: 7px;
        transition: all 0.3s;
        /* 过度 */
        -moz-transition: all 0.3s;
        /* Firefox */
        -webkit-transition: all 0.3s;
    }
    .lusun-start:hover{
        transition: all 0.3s;
        /* 过度 */
        -moz-transition: all 0.3s;
        /* Firefox */
        -webkit-transition: all 0.3s;
        /* Safari 和 Chrome */
        transform: scale(.9);
    }
</style>