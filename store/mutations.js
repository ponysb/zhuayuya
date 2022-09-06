import state from "./state";
import axios from 'axios';
let mutations = {

//注册账号和写入数据库url和分组
set_user_data(){
    for(var i=0;i<state.icon_data.length;i++){
        state.icon_data[i].userid = state.account
        state.icon_data[i].uid = state.account
        state.icon_data[i].groupid = state.start_group_id
        state.icon_data[i].urlid = 'UR'+Date.parse(new Date()).toString()+Math.ceil(Math.random()*100000).toString()
        state.icon_data[i].time = Date.parse(new Date())
    }
    axios({
        method: 'POST',
        url: state.config.port+'/set_group_url',
        data: state.icon_data,
        Headers:{
            'Content-Type':'application/json'
        }
        })
        .then(function () {
        //写入用户
        axios.get(state.config.port+'/set_user',{
            params: {
                    email:state.account
                }
            })
            .then(function () {
                // console.log(response)
            })
        });
},




//登录取分组和url   code_content是用户账号
inquiry_bubble_ok(){
    axios.get(state.config.port+'/get_user?', {
        params: {
            userid: state.account
        }
    })
    .then(function (response) {

        //本地储存一下uid和昵称（name），不是userid是uid
        localStorage.setItem('user',JSON.stringify({state:2, name:JSON.parse(response.data.body.data[0]).name, id:JSON.parse(response.data.body.data[0]).uid}))
        state.user_id = JSON.parse(response.data.body.data[0]).uid
        state.nickname = JSON.parse(response.data.body.data[0]).name


            //获取用户的全部组
        axios.get(state.config.port+'/get_group',{
            params: {
                    userid:JSON.parse(response.data.body.data[0]).uid
                }
            })
            .then(function (response) {
                // handle success
                //state.group_data = [{ name: '垃圾给我',groupid:'recycle',userid:'', icon:'🗑️', id: "icon-x8", time:Number }]
                state.group_data = []
                for(var i4=0;i4<response.data.body.data.length;i4++){
                    state.group_data.push(JSON.parse(response.data.body.data[i4]))
                }
                localStorage.setItem('group',JSON.stringify(state.group_data))

                //获取组1的url
                axios.get(state.config.port+'/get_group_url',{
                    params: {
                        userid: JSON.parse(response.data.body.data[0]).uid,
                        groupid:state.group_data[0].groupid
                    }
                })
                .then(function (response) {
                    // handle success
                    // console.log(response.data.body.data)
                    state.icon_data = []
                    for(var i2=0;i2<response.data.body.data.length;i2++){
                        state.icon_data.push(JSON.parse(response.data.body.data[i2]))
                    }
                    state.Sign_in = false
                    // console.log(state.icon_data)
                })
                .catch(function () {
                    // handle error
                    // console.log(error);
                })
            })
    //   console.log(response.data.body.data)
        
    })
    .catch(function () {
        // handle error
        // console.log(error);
    })

    //   console.log(state.account)

},




//取组和icon
start_get(){
    //获取用户的全部组
    axios.get(state.config.port+'/get_group',{
    params: {
            userid:state.user_id
        }
    })
    .then(function (response) {
        console.log(response)
        state.group_data = []
        for(var i4=0;i4<response.data.body.data.length;i4++){
            state.group_data.push(JSON.parse(response.data.body.data[i4]))
        }
        localStorage.setItem('group',JSON.stringify(state.group_data))

        //获取组1的url
        axios.get(state.config.port+'/get_group_url',{
            params: {
                userid: JSON.parse(response.data.body.data[0]).uid,
                groupid:state.group_data[0].groupid
            }
        })
        .then(function (response) {
            // handle success
            // console.log(response.data.body.data)
            state.icon_data = []
            for(var i2=0;i2<response.data.body.data.length;i2++){
                state.icon_data.push(JSON.parse(response.data.body.data[i2]))
            }
            state.sign_show = false
            state.sign_button_show = false
        })
        .catch(function () {
            // handle error
            // console.log(error);
        })
    })

}


};
export default mutations;
