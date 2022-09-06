# zhuayuya v1.4
```
抓鱼鸭是一个组件化的导航网站/新标签页,也是一个
最佳的摸鱼网站

它可以添加很多好玩的组件到桌面,不用进入网站就

可以在线玩魔方、数独、扫雷、看blibili等等

他还有非常强大的聚合搜索、实时弹幕、rss订阅、
笔记等

还提供了浏览器插件可以在谷歌、edge等浏览器安装
把自己想收藏的网站统统一键收藏

www.zhuayuya.com    &   摸鱼.cn
```



## 下载依赖
```
yarn install
npm install
```

## 启动项目
```
yarn serve
npm run serve
```

## 编译方式
```
yarn build
npm run build
```
## 项目设置
```
如果不想在调试模式下使用https可以在
vue.config.js文件下设置'https: false'

module.exports = {
    devServer: {
      // 此处开启 https
      https: false
    }
}
```

```
想要配置后端接口链接在 store → state.js下配置,可全局统一替换

config:{
    port:'https://xxx.xxx.xxx:xxx'   //线上模式
    // port:'https://127.0.0.1:8081'   //本地模式
}
```

## 项目目录

```

|-- babel.config.js
|-- package-lock.json
|-- package.json
|-- README.md
|-- vue.config.js
|-- yarn.lock
|-- public                        //公共静态文件目录图标和index入口文件
|-- src
|   |-- App.vue
|   |-- main.js
|   |-- assets
|   |   |-- card_data.js          //组件商城的组件数据文件
|   |   |-- emoji.js              //创建组的emoji数据文件
|   |   |-- icon_data.js          //推荐和默认组的数据文件
|   |   |-- logo.png
|   |-- components
|       |-- index.vue              //项目首页入口文件
|       |-- babrrage        
|       |   |-- babrrage.vue       //弹幕组件
|       |-- element                //所有文件夹,根据不同组件类型渲染就是引入的这里边的代码
|       |   |-- anovel.vue         //小说组件
|       |   |-- dchat.vue          //摸鱼聊天室组件
|       |   |-- ele.vue            //中午吃什么组件
|       |   |-- lusun.vue          //在线录屏组件
|       |   |-- mcalendar.vue      //摸鱼日历组件
|       |   |-- mineclearance.vue  //扫雷组件
|       |   |-- notes.vue          //小记鸭组件
|       |   |-- randomweb.vue      //随机网站组件
|       |   |-- rss.vue            //rss订阅组件
|       |   |-- shop.vue           //购物组件
|       |   |-- wallpaper.vue      //切换壁纸组件
|       |-- grid
|       |   |-- grid.vue           //图标组件的入口文件,图标组件的渲染部分
|       |-- login
|       |   |-- login.vue          //用户登录模块
|       |-- mine                   //专业版文件夹
|       |   |-- design.vue         //UI设计模式
|       |   |-- pm.vue             //产品经理模式
|       |-- search                 //搜索模块文件夹
|       |   |-- search.vue         //搜索输入框部分,搜索框、发弹幕、切换模式、聚合搜索、资讯搜索都在这个文件
|       |   |-- searchview.vue     //搜索内容区域,主要显示搜索出来的结果联想词
|       |-- slide
|       |   |-- slide.vue          //鼠标下滑抽屉主体文件,组件商城和登录信息部分在里边
|       |-- time
|           |-- time.vue           //时钟组件
|-- store                          //vuex状态管理
    |-- mutations.js               //vuex公共事件
    |-- state.js                   //vuex状态数据文件
    |-- store.js                   //vuex入口文件

```

## 组件渲染数据结构

```
以下是核心数据结构,图标以及组件全部为下列数据结构渲染
{
    type: 'Shop',                  //组件类型例如link就是普通链接、wallpaper就是壁纸
    index:1,                       //组件的位置,在储存数据和调整位置的时候可以用到
    name:'好物鸭',                 //组件的名字,图标下方展示标题就是这个
    icon:'',                       //组件的图标,可以为空,有的组件是没有图标的
    userid:'',                     //用户id
    urlid:'',                      //这个组件的id
    time:'',                       //添加时间
    groupid:'',                    //分组的id
    equipment:'',                  //添加组件时用的电脑设备（预留字段,目前没有使用）
    browser:'',                    //添加组件时用的浏览器（预留字段,目前没有使用）
    class: "",                     //组件占用的格子,目前grid-box-items就是1个,grid-box-items-x8就是8个,可以在grid的style里找到有多少中规格
    uid:"" ,                       //这个是个历史遗留问题后来废弃了userid改为了uid重新赋值的,这俩可以去掉
    link: ''                       //组件的链接,可以为空很多组件点击是事件并不是链接
},
```

## 依赖介绍
```
"@lusun-sdk/recorder": "^0.0.13",           //芦笋的sdk,在线录屏使用的芦笋
"@wangeditor/editor": "^5.1.9",             //小记使用的富文本编辑器,目前最新版本已经改为了自制富文本编辑器
"@wangeditor/editor-for-vue": "^1.0.2",
"animate.css": "^4.1.1",                    //css动画库
"ant-design-vue": "^1.7.8",                 //右击下拉和切换模式,弹幕开关用的antd
"axios": "^0.25.0",                         
"base-64": "^1.0.0",
"core-js": "^3.6.5",
"element-ui": "^2.15.6",                    //我有想过只用antd,可是下滑抽屉的选择模式,下拉antd改不了样式
"vue": "^2.6.11",
"vue-axios": "^3.4.0",
"vue-baberrage": "^3.2.4",                  //弹幕框架,目前最新版本已经改为了自制
"vue-jsonp": "^2.0.0",                      //jsonp,百度、360等搜索引擎需要jsonp接口
"vue-lazyload": "^1.3.3",                   //vue图片懒加载
"vue-socket.io": "^3.0.10",                 //socketio,弹幕即时通讯使用依赖,目前新版本已经改成更加稳定的mqtt
"vuedraggable": "^2.24.3",                  //组件拖拽依赖
"vuex": "^3.6.2"

```