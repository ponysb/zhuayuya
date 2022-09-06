
import icon_data_ from '../src/assets/icon_data';
let state = {
      config:{
        port:'https://xxx.xxx.xxx:xxx'
        // port:'https://127.0.0.1:8081'
      },
      "web_socket":{},
      user_id:"",
      nickname:"点我登录",
      account:"",  //用户输入
      start_group_id:'GRID_00000000001',   //初始分组id
      sign_show: false,
      sign_button_show:true,
      popup:false,
      binding:false,
      pattern_value:"推荐模式",
      slide_pattern_value:"默认首页",
      babrrage_show:true,
      home: { view:true, grid: false, pm: false, design: false },  //view是所有模式的大层，默认开启就行，主要是用来隔离搜索
      search:{inf:false,issue:false},
      search_data:{inf:{zhihu:[],toutiao:[],weixin:[]},issue:{bing:[],baidu:[],sanliuling:[]}},
      dchatList:[],
      barrageList:[],
      group_data: [
        { name: '摸认组', groupid: '01', userid: '', icon: '🐟', id: "icon-x8", time: Number },
      ],
      wallpa_img:'https://img.zhuayuya.com/wallpaper/img/wallpa_img_1001.jpg',
      wallpa_video:'',
      icon_data: icon_data_
};
export default state;
