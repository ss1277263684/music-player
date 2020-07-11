// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = true

// 导入axios，挂载到vue原型
import axios from "axios"
axios.defaults.baseURL = "https://autumnfish.cn/";
Vue.prototype.$axios = axios;


// 导入mint-ui插件
import { Header, Button, Lazyload } from 'mint-ui';

Vue.use(Lazyload);
Vue.component(Header.name, Header);
Vue.component(Button.name, Button);
import 'mint-ui/lib/style.css'

// 导入vuex
import Vuex from 'vuex'
Vue.use(Vuex);

const store = new Vuex.Store({
	state:{
		song_list:[],		// 音乐列表
		song_index:"",		// 播放音乐的index
		song_pic:"",		// 音乐封面
		love_music:[],		// 收藏喜欢的音乐
		mv_url:""			// MV 链接
	},
	mutations:{
		change_song_list(state, payload){
			state.song_list = payload;
		},
		change_song_index(state, payload){
			state.song_index = payload;
		},
		change_song_pic(state, payload){
			state.song_pic = payload;
		},
		add_love_song(state, payload){
			state.love_music.push(payload)
			console.log(state.love_music)
		},
		change_love_music(state, payload){
			state.love_music = payload;
		},
		change_mv_url(state, payload){
			state.mv_url = payload;
		}
	},
	actions:{
		change_song_list({commit}, new_list){
			commit('change_song_list', new_list)
		},
		change_song_index({commit}, new_index){
			commit('change_song_index', new_index)
		},
		change_song_pic({commit}, new_pic){
			commit('change_song_pic', new_pic)
		},
		add_love_song({commit}, new_song){
			commit('add_love_song', new_song)
		},
		change_love_music({commit}, new_song){
			commit('change_love_music', new_song)
		},
		change_mv_url({commit}, new_url){
			commit('change_mv_url', new_url)
		}
	}
}) 


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
