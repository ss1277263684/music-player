// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = true

import axios from "axios"
axios.defaults.baseURL = "https://autumnfish.cn/";
Vue.prototype.$axios = axios;

import { Header, Button, Lazyload } from 'mint-ui';
Vue.use(Lazyload);
Vue.component(Header.name, Header);
Vue.component(Button.name, Button);
import 'mint-ui/lib/style.css'


import store from './store'


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
