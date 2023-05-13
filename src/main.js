import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/global.css'
import './assets/map/china'
import './assets/map/world_fix'
import request from "./utils/request";
import store from './store';
import './assets/icon/iconfont.css'
import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';

axios.defaults.adapter = jsonpAdapter;

Vue.config.productionTip = false

Vue.use(ElementUI,{size: "small"});


Vue.prototype.request = request

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
