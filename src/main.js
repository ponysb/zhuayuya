import Vue from 'vue'
import App from './App.vue'
import { vueBaberrage } from 'vue-baberrage';
import VueSocketIO from 'vue-socket.io';
import VueAxios from 'vue-axios'
import { VueJsonp } from 'vue-jsonp'
import Lazyload from 'vue-lazyload'
import Antd from 'ant-design-vue';
import axios from 'axios'
import Vuex from 'vuex'
import Store from "../store/store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'ant-design-vue/dist/antd.css';
import 'animate.css';

Vue.config.productionTip = false
Vue.use(Vuex)
Vue.use(ElementUI);
Vue.use(Antd);
Vue.use(vueBaberrage)
Vue.use(VueAxios, axios)
Vue.use(VueJsonp)

Vue.use(new VueSocketIO({
  debug: false,
  // 服务器端地址
  connection: 'https://root.zhuayuya.com:8090',
  vuex: {
  }
}))


Vue.use(Lazyload, {
  preLoad: 1,
  loading: require('../public/icon/loading-spin.svg'),
  attempt: 2,
})




Vue.directive('myfocus', {
  inserted: (el, binding) => {
      if (binding.value == true || binding.value == undefined) {
          el.focus()
      }
  }
});

new Vue({
  render: h => h(App),
  components: { App },
  template: '<App/>',
  store: Store,
}).$mount('#app')
