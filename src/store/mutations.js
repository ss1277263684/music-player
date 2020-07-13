export default {
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
}