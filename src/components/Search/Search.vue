<template>
  	<div id="search">
		<div class="search_bar">
			<span class="mai"><img src="../../assets/search/mai.png"></span>
			<input type="text" v-model="query" @keyup.enter="search_music">
			<span><img v-show="song_pic" :src="song_pic" class="music_pic" @click="to_play"></span>
		</div>
		<Music_list :music_list="music_list" />
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
	import Music_list from "@/components/Search/Music_list"
	  	name: 'Search',
		data(){
			return {
				query: "",			// 搜索的内容
				music_list:[],		// 音乐列表
			}
		},
		components: { Music_list },
		methods:{
			search_music(){
				this.$axios.get('search?keywords='+ this.query)
		    	.then(response=>{
		        	this.music_list = response.data.result.songs;
		    	},err=>{ console.log(err)})
			},
			to_play(){
				console.log(this.song_index)
				this.$router.push({name:'play'})
			}
		},
		computed: {
			song_pic(){
				return this.$store.state.song_pic;
			},
			song_index(){
				return this.$store.state.song_index;
			}
		},
		activated(){
			console.log("激活search组件")
		}
	}
</script>

<style scoped>
	#search{
		height: 100%;
		display: flex;
		flex-direction: column;
		background: url(../../assets/search/search_bg.jpeg) no-repeat ;
		background-size: cover;
	}				    
	.search_bar{
		width: 100%;
		height: 10%;
   		display: flex;
   		justify-content: space-around;
   		align-items: center;
  		background: url(../../assets/search/zoom.png) no-repeat 83%;
		background-size: 18px;
	}
	.search_bar input{
		height: 30px;
		width: 74%;
		border-radius: 16px;
		background-color: #dddddd54;
		border-width: 0;
		text-indent: 20px;
		color: #fff;
		font-size: 16px;
	}
	.search_bar span{
		display: inline-block;
		width: 13%;
		height: 32px;
		border-radius: 50%;
	}
	.mai img{
		width: 40px; 
		height: 32px;
	}
	.music_pic{
		width: 30px;
		height: 30px;
		border-radius: 50%;
	}
</style>