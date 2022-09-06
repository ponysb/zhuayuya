<template>
    <div>
        <!-- 侧边栏头像 -->
        <div v-if="$store.state.sign_button_show" class="user-box">
            <div @click="sign_show_click" class="user-head">登录</div>
        </div>


        <!-- 弹窗登录或者绑定邮箱 -->
        <!-- 绑定 -->
        <div v-if="$store.state.binding">
            <div class="register-sign-style reg-outside-style">
            <div class="sign-style">
                <span style="display: inline-block; margin-bottom: 10px; font-size: 24px; font-weight: 500; color: #030303;">😘 Hi,「 {{$store.state.user_id}} 」您好!</span>
                <span style="display: inline-block; width: 380px; margin-bottom: 10px; font-size: 16px; font-weight: 400; color: #a1a1a1;">用户系统升级，为了账号安全，助记码需要绑定邮箱，但不会向邮箱发送垃圾广告～～</span>
                <input v-model="$store.state.code_content" v-myfocus="true" maxlength="180" class="edi" placeholder="输入邮箱" type="text">
                <div style="display: flex; justify-content: center;">
                    <input v-model="reg_data.code" maxlength="4" class="edi-" placeholder="输入4位验证码" type="text">
                    <span @click="binding_code" class="sign-out-">{{code_time}}</span>
                </div>
                <span @click="binding_click" class="sign-out">绑定</span>
            </div>
            </div>
            <!--这里是半透明背景层-->
            <div class="over"></div>
        </div>





        <!-- 登录注册 -->
        <div class="register-sign-style">
            <div class="animate__animated animate__flipInY reg-outside-style" v-if="$store.state.sign_show">
                <div class="sign-style">
                    <span
                        style="display: inline-block; margin-bottom: 10px; font-size: 24px; font-weight: 500; color: #030303;">😘
                        Hi，欢迎来到抓鱼鸭</span>
                    <span
                        style="display: inline-block; width: 380px; margin-bottom: 10px; font-size: 16px; font-weight: 400; color: #a1a1a1;"><span style="color: rgb(18, 113, 255);">验证码邮件可能会被放入垃圾哦</span>，不建议用第三方邮件系统查看，助记码用户登录点下面文字～～</span>
                    <input :disabled="disabled_" v-model="$store.state.account" maxlength="180" class="edi" placeholder="输入邮箱"
                        type="text">
                    <div style="display: flex; justify-content: center;">
                        <input v-model="code" maxlength="4" class="edi-" placeholder="输入4位验证码" type="text">
                        <span @click="send_out_code" class="sign-out-">{{code_time}}</span>
                    </div>
                    <span :style="login_send.state" @click="sign_click" class="sign-out">{{login_send.msg}}</span>
                    <a target="_blank" style="display: block; margin-top:16px; text-decoration:underline;"
                        href="https://docs.qq.com/doc/DY1hYUk1tZUxBYURV">只有助记码无法用邮箱登录点我</a>
                </div>
            </div>
        </div>
        <!--这里是半透明背景层-->
        <div @click="over_click" v-if="$store.state.sign_show" class="over"></div>
        <!-- 到这里是一个完整的登录注册弹窗 -->

    </div>

</template>
<script>
    const emailRegExp = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    export default {
        data() {
            return {
                code: "",
                disabled_: false,
                code_time: "发送验证码",
                login_send:{state:"",msg:"登录/注册"},
                reg_data:{user:"",code:""},
            }
        },
        methods: {
            sign_show_click() {
                this.$store.state.sign_show = true
            },
            over_click() {
                this.$store.state.sign_show = false
            },


            //登录发送验证码
            send_out_code() {
                let that = this
                if (that.code_time == "发送验证码") {

                    //倒计时
                    if (emailRegExp.test(that.$store.state.account) != false) {
                        this.$message.success('已发送注意查收');
                        let codetime = 60
                        this.code_time = (codetime--).toString() + "s后重发"

                        let codetime_ = setInterval(function () {
                            that.code_time = (codetime--).toString() + "s后重发"
                            // console.log(11)
                            if (codetime == 0) {
                                that.code_time = "发送验证码"
                                clearInterval(codetime_)
                            }

                        }, 1000);
                    }


                    //发送验证码
                    that.axios({
                        method: "POST",
                        url: "https://code.zhuayuya.com",
                        data: JSON.stringify({ "ac": "email_code_login", "user": that.$store.state.account }),
                        Headers: {
                            "Content-Type": "application/json",
                        },
                    }).then(function (response) {
                        // console.log(response.data);
                        if (response.data.code == 200) {
                            //校验邮箱是否存在
                            that.axios.get(that.$store.state.config.port + '/get_email', {
                                params: {
                                    email: that.$store.state.account
                                }
                            })
                                .then(function (response) {
                                    // console.log(response.data)
                                    //判断如果没注册就默认注册,判断点不准确记得修改
                                    if (response.data.Total == 0) {

                                        that.axios({
                                            method: "POST", url: that.$store.state.config.port + "/set_group",
                                            data: {
                                                userid: that.$store.state.account,
                                                groupid: that.$store.state.start_group_id,
                                                uid: that.$store.state.account,
                                                index: 1,
                                                name: "摸认组",
                                                icon: "🐟",
                                                id: "icon-x8",
                                                time: Date.parse(new Date()),
                                            },
                                            Headers: {
                                                "Content-Type": "application/json",
                                            },
                                        }).then(function () {
                                            // console.log(response);
                                            that.$store.commit("set_user_data");
                                        })
                                    }
                                })
                                .catch(function () {
                                    // handle error
                                    // console.log(error);
                                })
                            that.disabled_ = true



                        } else {
                            that.$message.error(response.data.msg);
                        }
                    });
                } else {
                    this.$message.error("60秒内只能发一次");
                }
            },

            //登录/注册
            sign_click() {

                let that = this
                if(that.login_send.msg == "登录/注册"){
                    if (emailRegExp.test(that.$store.state.account) != false && that.code != "") {
                        that.axios({
                            method: "POST",
                            url: "https://code.zhuayuya.com",
                            data: JSON.stringify({ "ac": "email_code_login_verify", "user": that.$store.state.account, "code": that.code }),
                            Headers: {
                                "Content-Type": "application/json",
                            },
                        }).then(function (response) {
                            // console.log(response)
                            if (response.data.code == 200) {

                                that.login_send = {state:"background-color: rgb(126, 126, 126);",msg:"登录中..."}
                                that.axios.get(that.$store.state.config.port + '/get_user', {
                                    params: {
                                        userid: that.$store.state.account
                                    }
                                })
                                    .then(function (response) {
                                        // console.log(response)
                                        //本地储存一下uid和昵称（name），不是userid是uid
                                        // console.log(response)
                                        that.$store.state.user_id = JSON.parse(response.data.body.data[0]).uid
                                        that.$store.commit("start_get");
                                        that.$store.state.nickname = JSON.parse(response.data.body.data[0]).name
                                        that.$store.state.pattern_value = "我的收藏"
                                        localStorage.setItem('user', JSON.stringify({ state: 2, name: JSON.parse(response.data.body.data[0]).name, id: JSON.parse(response.data.body.data[0]).uid }))

                                    })
                            } else {
                                that.$message.error(response.data.msg);
                            }
                        });
                    } else {
                        that.$message.error("确定输的没错？");
                    }
                }else{
                    that.$message.error("登录中请勿重复点击");
                }
            },



            //绑定邮箱确定按钮
            binding_click(){
            let that = this
            if(emailRegExp.test(that.$store.state.code_content) != false&&that.reg_data.code != ""){
                that.axios({
                method: "POST",
                url: "https://code.zhuayuya.com",
                data: JSON.stringify({"ac": "email_code_login_verify","user": that.$store.state.code_content,"code": that.reg_data.code}),
                Headers: {
                    "Content-Type": "application/json",
                },
                }).then(function (response) {
                if(response.data.code == 200){
                    if(emailRegExp.test(that.$store.state.code_content) != false&&that.reg_data.code != ""){
                    that.axios({
                        method: "POST",
                        url: "https://code.zhuayuya.com",
                        data: JSON.stringify({"ac": "email_code_login_verify","user": that.$store.state.code_content,"code": that.reg_data.code}),
                        Headers: {
                        "Content-Type": "application/json",
                        },
                    }).then(function (response) {
                        if(response.data.code == 200){
                        that.axios.get(that.$store.state.config.port+'/binding_email',{
                        params: {
                                email:that.$store.state.code_content,
                                name:that.$store.state.user_id
                            }
                        })
                        .then(function () {
                    
                            //用邮箱请求uid
                            that.axios.get(that.$store.state.config.port+'/get_email_',{
                            params: {
                                    email:that.$store.state.code_content,
                                }
                            })
                            .then(function (response) {
                            localStorage.setItem('user',JSON.stringify({state:2, name:that.$store.state.user_id, id:JSON.parse(response.data.data[0]).uid}))
                            that.$store.state.user_id = JSON.parse(response.data.data[0]).uid
                            that.$store.state.binding = false
                            that.$store.commit("inquiry_bubble_ok");

                            })

                        })
                        }else{
                        that.$message.error(response.data.msg);
                        }
                    });
                    }else{
                    
                    that.$message.error("确定输的没错？");
                    }
                    
                }else{
                    that.$message.error(response.data.msg);
                }
                });
            }else{
                
                that.$message.error("确定输的没错？");
            }
            },


            //邮箱发送验证码绑定验证
            binding_code(){
            let that = this
            if(that.code_time == "发送验证码"){

                //判断下是不是邮箱格式
                if(emailRegExp.test(that.$store.state.code_content) != false){
                    //校验邮箱是否存在
                    that.axios.get(that.$store.state.config.port+'/get_email',{
                    params: {
                            email:that.$store.state.code_content
                        }
                    })
                    .then(function (response) {
                    // console.log(response)
                    if(response.data.Total == 0){
                        that.axios({
                        method: "POST",
                        url: "https://code.zhuayuya.com",
                        data: JSON.stringify({"ac": "email_code_login","user": that.$store.state.code_content}),
                        Headers: {
                        "Content-Type": "application/json",
                        },
                    }).then(function (response) {
                        // console.log(response.data);
                        if(response.data.code == 200){
                        //倒计时
                        that.disabled_ = true
                        that.$message.success('已发送注意查收');
                        let codetime = 60
                        that.code_time = (codetime--).toString()+"s后重发" 
                        let codetime_ = setInterval (function () {
                            that.code_time = (codetime--).toString()+"s后重发" 
                            if (codetime == 0) {
                                that.code_time = "发送验证码"
                                clearInterval(codetime_)
                            }
                            
                        }, 1000); 
                        }else{
                        that.$message.error(response.data.msg);
                        }
                    });
                    }else{
                        that.$message.error("邮箱已经被使用了，换一个吧～～");
                    }
                    })
                }else{
                that.$message.error("确定输的没错？");
                }
            }else{
                that.$message.error("60秒内只能发一次");
            }
            },
            
        }
    }
</script>
<style scoped>
    .user-box {
        width: 60px;
        height: 50px;
        position: absolute;
        right: 0;
        border-radius: 50px 0 0 50px;
        background: rgba(187, 187, 187, 0.5);
        -webkit-backdrop-filter: saturate(300%) blur(50px);
        backdrop-filter: saturate(200%) blur(30px);
        margin-top: 70px;
    }

    .user-box:hover {
        cursor: pointer;
    }

    .user-head {
        width: 38px;
        height: 38px;
        margin-left: 6px;
        margin-top: 6px;
        border-radius: 30px;
        background-color: rgb(255, 255, 255);
        color: rgb(42, 127, 255);
        line-height: 37px;
        text-align: center;
        font-weight: 600;
    }




    input {
        font-size: 16px;
    }

    .sign-style {
        display: inline-block;
        margin-top: 32px;
    }

    .register-sign-style {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 9999;
    }

    .reg-outside-style {
        width: 460px;
        height: 380px;
        text-align: center;
        background-color: #fff;
        border-radius: 15px;
    }

    .sign-out- {
        display: block;
        width: 100px;
        height: 42px;
        background-color: rgb(18, 113, 255);
        text-align: center;
        margin-top: 13px;
        border-radius: 8px;
        color: #fff;
        font-weight: 400;
        font-size: 15px;
        line-height: 44px;
        margin-left: 10px;
    }

    .sign-out-:hover {
        cursor: pointer;
        background-color: rgb(18, 113, 255, .9);
    }

    .sign-out-:active {
        background-color: rgb(18, 113, 255);
    }

    .sign-out {
        display: block;
        width: 294px;
        height: 50px;
        background-color: rgb(18, 113, 255);
        margin: 0 auto;
        text-align: center;
        margin-top: 20px;
        border-radius: 8px;
        color: #fff;
        font-weight: 400;
        font-size: 15px;
        line-height: 48px;
    }

    .sign-out:hover {
        cursor: pointer;
        background-color: rgb(18, 113, 255, .9);
    }

    .sign-out:active {
        background-color: rgb(18, 113, 255);
    }

    .edi- {
        width: 210px;
        height: 44px;
        background-color: #f4f5f5;
        border-radius: 8px;
        border: none;
        outline: none;
        padding-right: 18px;
        padding-left: 18px;
        margin-top: 12px;
    }

    .edi {
        display: block;
        width: 320px;
        height: 44px;
        background-color: #f4f5f5;
        margin: 0 auto;
        border-radius: 8px;
        border: none;
        outline: none;
        padding-right: 18px;
        padding-left: 18px;
        margin-top: 12px;
    }

    .over {
        position: fixed;
        width: 100%;
        height: 100%;
        opacity: 0.3;
        filter: alpha(opacity=70);
        top: 0;
        left: 0;
        z-index: 999;
        background-color: #030303;
    }

    .over:hover {
        cursor: pointer;
    }
</style>