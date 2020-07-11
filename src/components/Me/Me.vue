<template>
  	<div id="my">
		<div class="my_container">
			<div class="my_header">
				<p>我喜欢的音乐</p>
				<img :src="song_pic" v-show="song_pic" @click="to_play">
			</div>
			<div class="my_love_music">
				<ul>
					<li v-for="(item, index) in love_music" :key="index">
						<span class="play" @click="play_music(index)">{{ (index+1) < 10 ? ("0"+ (index+1)) : (index+1) }}</span>
						<span :title="item.name" class="song_title" @click="play_music(index)">{{ item.name }}</span>
						<span v-if="item.mvid!==0" @click="play_mv(item.mvid)"><i></i></span>
					</li>
				</ul>
			</div>
		</div>
  		<div class="nav_bar">
			<router-link :to="{name:'search'}" class="nav_item">
				<div>
					<img :src="require('../../assets/search/discover.png')">
				</div>
				<p>发现</p>
			</router-link>
			<router-link :to="{name:'me'}" class="nav_item">
				<div>
					<img :src="require('../../assets/search/me.png')">
				</div>
				<p>我的</p>
			</router-link>
			<router-link :to="{name:'account'}" class="nav_item">
				<div>
					<img :src="require('../../assets/search/account.png')">	
				</div>
				<p>账户</p>
			</router-link>
		</div>
  	</div>
</template>

<script>
	export default {
		name: 'My',
		computed:{
			song_pic(){
				return this.$store.state.song_pic;
			},
			love_music(){
				return this.$store.state.love_music;
			},
			song_index(){
				return this.$store.state.song_index;
			}
		},
		methods:{
			play_music: function(id){
	 			this.$store.dispatch('change_song_list', this.love_music);
	 			this.$store.dispatch('change_song_index', id);            
	            this.$router.push({name:'play'});
	        },
			to_play(){
				this.$router.push({name:'play'});
			},
			play_mv: function(mvid){
	            this.$axios.get('https://autumnfish.cn/mv/url?id=' + mvid)
	            .then(response=>{
	                this.$store.dispatch('change_mv_url', response.data.data.url);
	                this.$router.push({name:'mv'});
	            },err=>{ console.log(err)})
			}
		},
		activated(){
			console.log("激活Me组件")
			if(!this.love_music.length){
				var data = JSON.parse(localStorage.getItem("love_music"));
				this.$store.dispatch("change_love_music", data)
			}
		}
	}
</script>

<style scoped>
	#my{
		height: 100%;
		background: url(../../assets/me/me_bg.jpg) no-repeat;
	    background-size: cover;
	}
	.my_container{
		width: 100%;
		height: 90%;
	}
	.my_header{
	    width: 95%;
	    height: 6%;
	    padding-top: 4%;
	    display: flex;
	}
	.my_header p{
	    font-size: 20px;
	    width: 90%;
	    color: #fff;
	    margin: 0;
	}
	.my_header img{
		width: 30px;
		height: 30px;
		border-radius: 50%;
	}
	.my_love_music{
		height: 92%;
		width: 100%;
		border-top-left-radius: 21px;
	    border-top-right-radius: 21px;
	    overflow: hidden;
	}
	.my_love_music ul{
		height: 100%;
		overflow: auto;
	    color: #fff;
	}
	.my_love_music li{
		display: flex;
		height: 8%;
		line-height: 40px;
		align-items: center;
	}
	.play{
		width: 15%;
	}
	.song_title{
		width: 70%;
		text-align: left;
		text-overflow: ellipsis;
	    white-space: nowrap;
	    overflow: hidden
	}
	.my_love_music span i{
		display: inline-block;
		width: 40px;
		height: 40px;
		background: url(../../assets/music_list/mv_play.png) no-repeat 8px 8px;
		background-size: 24px;
	}
</style>