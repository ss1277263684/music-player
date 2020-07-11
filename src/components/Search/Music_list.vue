<template>
  	<div id="music_list">
		<ul class="song_list">
			<li v-for="(item, index) in music_list" :key="index">
				<span href="javascript:;" @click="play_music(item.id, index)" class="play">{{ (index+1) < 10 ? ("0"+ (index+1)) : (index+1) }}</span>
				<span :title="item.name" class="song_title" @click="play_music(index)">{{ item.name }}</span>
				<span v-if="item.mvid!==0" @click="play_mv(item.mvid)"><i></i></span>
			</li>
		</ul>
  	</div>
</template>

<script>
export default {
  	name: 'Music_list',
  	props:["music_list"],
  	methods:{
  		play_music: function(id){
 			this.$store.dispatch('change_song_list', this.music_list);
 			this.$store.dispatch('change_song_index', id);            
            this.$router.push({name:'play'})
		},
		play_mv: function(mvid){
            this.$axios.get('https://autumnfish.cn/mv/url?id=' + mvid)
            .then(response=>{
                this.$store.dispatch('change_mv_url', response.data.data.url)
                this.$router.push({name:'mv'})
            },err=>{ console.log(err)})
		},
  	}
}
</script>

<style scoped>
	#music_list{
		height: 80%;
		width: 100%;
	    overflow: auto;
	}
	.song_list{
		width: 100%;
		overflow: hidden;
	}
	.song_list li, .song_list span{
		height: 40px;
		line-height: 40px;
		text-decoration:none;
		color: #fff;
	}
	.song_list li{
		display: flex;
	}
	.play{
		width: 15%;
		float: left;
	}
	.song_title{
		width: 70%;
		text-align: left;
		text-overflow: ellipsis;
	    white-space: nowrap;
	    overflow: hidden
	}
	.song_list span i{
		display: inline-block;
		width: 40px;
		height: 40px;
		background: url(../../assets/music_list/mv_play.png) no-repeat 8px 8px;
		background-size: 24px;
	}
</style>