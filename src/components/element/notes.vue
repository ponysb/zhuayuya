<template>
    <div style="text-align: left; height: 175px;">
        <div style="display: inline-block; margin-top: 12px; margin-left: 6px;">
            <Editor
                class="edi-Input"
                v-model="html"
                :defaultConfig="editorConfig"
                :mode="mode"
                @onCreated="onCreated"
            />
            <span @click="send" class="send-box">记一下</span>
            <!-- <div @input="input_($event)"  contenteditable="true" placeholder='请输入文字'></div> -->
            <div @click="note_click" v-html="based(note.content)" class="content-box">
            </div>
        </div>
    </div>
</template>
<script>
import { Editor } from '@wangeditor/editor-for-vue'
import Base64 from 'base-64';
export default {
    components: {
        Editor
    },
    beforeDestroy() {
        const editor = this.editor
        if (editor == null) return
        editor.destroy() // 组件销毁时，及时销毁编辑器
    },
    mounted() {
        let that = this
        if(that.$store.state.user_id != ""){
            that.axios({
                method: "POST",
                url: "https://note.zhuayuya.com/apis/user/",
                data: JSON.stringify({
                    "ac": "note_get",
                    "uid": that.$store.state.user_id, 
                }),
            Headers: {
                "Content-Type": "application/json",
            },
            }).then(function (response) {
                that.note = response.data.data.data[0]
            }).catch(function (err) {
                console.log(err);
            })
        }
    },
    data() {
        return {
            html:"",
            note:{content:Base64.encode(encodeURIComponent("小记鸭卡片式笔记，随手记一下吧！"))},
            editor: null,
            toolbarConfig: { },
            mode: 'simple', // or 'simple
            editorConfig: {
                maxLength: 300,
                placeholder: '要记录一些什么事...',
                // autoFocus: false,
                // 所有的菜单配置，都要在 MENU_CONF 属性下
                MENU_CONF: {}
            }
        }
    },
    methods: {
        based(e){
            // console.log(Base64.decode(decodeURIComponent(e)))
            return decodeURIComponent(Base64.decode(e))
        },
        note_click(){
            if(this.$store.state.user_id != ""){
                window.open("https://www.zhuayuya.com/notes/index.html")
            }else{
                this.$message.info('还没有登录哦～～');
            }
        },
        onCreated(editor) {
            this.editor = Object.seal(editor) // 【注意】一定要用 Object.seal() 否则会报错
        },
        onChange(editor) {
            console.log('onChange', editor.getHtml()) // onChange 时获取编辑器最新内容
        },
        send(){
            // console.log(this.html)
            let that = this
            if(that.$store.state.user_id != ""){
                if(that.html != "<p><br></p>"){
                    that.axios({
                        method: "POST",
                        url: "http://note.zhuayuya.com/apis/user/",
                        data: JSON.stringify({
                            "ac": "note_add", 
                            "uid": that.$store.state.user_id, 
                            "title": "版本1.0没有title", 
                            "content": Base64.encode(encodeURIComponent(that.html)), 
                            "label": []
                        }),
                    Headers: {
                        "Content-Type": "application/json",
                    },
                    }).then(function (response) {
                        that.note = response.data.data
                        that.html = "<p><br></p>"
                    }).catch(function (err) {
                        console.log(err);
                    })
                }else{
                    this.$message.info('🤔没有内容鸭～～');
                }
            }else{
                this.$message.info('还没有登录哦～～');
            }
        }
    },
}
</script>
<style scoped>
    .edi-Input{
        display:inline-block;
        width: 290px;
        height: 70px;
        line-height: 0px;
        border: none;
        outline: none;
        resize:none;
    }
    .content-box{
        width: 334px;
        height: 75px;
        padding-top: 5px;
        padding-left: 10px;
        padding-right: 10px;
        padding-bottom: 5px;
        overflow-y: auto;
        word-wrap:break-word;
        margin-left:6px;
        border-radius: 10px;
        background-color: rgb(246, 246, 246);
    }
    .send-box{
        text-align: center;
        display: block;
        float: right;
        width: 50px;
        height: 50px;
        line-height: 50px;
        border-radius: 100px;
        color: #fff;
        background-color: rgb(18, 113, 255);
    }
</style>
<style src="@wangeditor/editor/dist/css/style.css"></style>