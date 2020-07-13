export default {
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