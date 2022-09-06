let card = [
    //组件商城渲染数据
    {title:"好物鸭",icon:"https://img.zhuayuya.com/element_icon/smzdm.png",content:"推送优质的网购优惠线报信息",add_ask:"添加"},
    {title:"中午吃什么",icon:"https://img.zhuayuya.com/element_icon/zwcsm.png",content:"世界上最难的问题是今晚吃什么，第二难就是中午吃什么",add_ask:"添加"},
    {title:"小记鸭",icon:"https://img.zhuayuya.com/element_icon/xiaojiya.png",content:"像flomo ·浮墨一样的信息流笔记小应用",add_ask:"添加"},
    {title:"在线录屏",icon:"https://img.zhuayuya.com/icon_/lusunluzhi.png",content:"添加组件，点击图标可以在抓鱼鸭主页直接录屏哦～",add_ask:"添加"},
    {title:"绣球小说",icon:"http://img.zhuayuya.com/icon/xiuqiu.png",content:"绣球小说分类书单组件～",add_ask:"添加"},
    {title:"扫雷",icon:"https://img.zhuayuya.com/element_icon/saolei.png",content:"在小卡片上玩扫雷，摸鱼一下午",add_ask:"添加"},
    {title:"随机网站",icon:"https://img.zhuayuya.com/element_icon/suijiwangzhan.png",content:"网站盲盒，想知道下次会进入什么网站吗？",add_ask:"添加"},
    {title:"摸鱼日历",icon:"https://img.zhuayuya.com/element_icon/rili.png",content:"距离节假日还有多久？距离周末还有多久？",add_ask:"添加"},
    {title:"Rss订阅",icon:"https://img.zhuayuya.com/element_icon/rss.png",content:"可以实时更新rss订阅的信息流，目前支持rss2.0",add_ask:"添加"},
    {title:"摸鱼聊天室",icon:"https://img.zhuayuya.com/element_icon/danmu.png",content:"弹幕可以回溯了，弹幕聊天列表",add_ask:"添加"},

]
let card_data = [
    //添加组件后渲染到页面上的组件数据
    { type: 'Shop', index:1,name:'好物鸭',  icon:"", userid:'',urlid:'100038',time:'',groupid:'01',equipment:'',browser:'', class: "grid-box-items-x8",uid:"" ,link: '' },
    { type: 'Ele', index:1,name:'中午吃什么',  icon:"", userid:'',urlid:'100038',time:'',groupid:'01',equipment:'',browser:'',uid:"", class: "grid-box-items-x4", link: '' },
    { type: 'Notes', index:1,name:'小记鸭',  icon:"", userid:'',urlid:'100037',time:'',groupid:'01',equipment:'',browser:'',uid:"", class: "grid-box-items-x8", link: '' },
    { type: 'lusun', index:1,name:'在线录屏',  icon:"", userid:'',urlid:'100037',time:'',groupid:'01',equipment:'',browser:'',uid:"", class: "grid-box-items", link: '' },
    { type: 'Anovel', index:1,name:'绣球小说',  icon:'', userid:'',urlid:'100038',time:'',groupid:'01',equipment:'',browser:'', class: "grid-box-items-x8",uid:"", link: '' },
    { type: 'MineClearance', index:1,name:'扫雷',  icon:"", userid:'',urlid:'100036',time:'',groupid:'01',equipment:'',browser:'',uid:"", class: "grid-box-items-x4", link: '' },
    { type: 'RandomWeb', index:1,name:'随机网站',  icon:"", userid:'',urlid:'100035',time:'',groupid:'01',equipment:'',browser:'',uid:"", class: "grid-box-items-x4", link: '' },
    { type: 'Mcalendar', index:1,name:'摸鱼日历',  icon:"", userid:'',urlid:'100034',time:'',groupid:'01',equipment:'',browser:'',uid:"", class: "grid-box-items-x4", link: '' },
    { type: 'Rss', index:1,name:'Rss订阅',  icon:"", userid:'',urlid:'100033',time:'',groupid:'01',equipment:'',browser:'',uid:"", class: "grid-box-items-x9", link: '' },
    { type: 'Dchat', index:1,name:'摸鱼聊天室',  icon:"", userid:'',urlid:'100032',time:'',groupid:'01',equipment:'',browser:'',uid:"", class: "grid-box-items-x9", link: '' },
]
export default {card_data,card};