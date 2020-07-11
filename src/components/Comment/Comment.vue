<template>
  	<div id="comment">
  		<head class="comment_header">
  			<span @click="go_back"><img :src="require('../../assets/comment/Larrow.png')"></span>
  			<span> 
  				评论({{hot_comments.length}})
  			</span>
  			<span><img :src="song_pic" @click="to_play"></span>
  		</head>
		<div class="song_info">
			<div class="song_cover">
				<img :src="song_pic">
			</div>
			<div class="singer_info">
				<p class="song_name" @click="to_play">{{song_list[song_index].name}}</p>
				<p class="singer_name">{{song_list[song_index].artists[0].name}}</p>
			</div>
			<div class="right_arrow"><img :src="require('../../assets/comment/Rarrow.png')" @click="to_play"></div>
		</div>
		<h3 class="wonderful_comment">精彩评论</h3>
		<ul class="comment_list">
			<li v-for="(item, index) in hot_comments" :key="index" class="comment">
				<img v-lazy="item.user.avatarUrl" class="user_of_comment">
				<p class="username">{{ item.user.nickname }}</p>
				<p class="comment_content">{{ item.content }}</p>
			</li>
		</ul>
  	</div>
</template>

<script>
	export default {
		name:'Comment',
		data(){
			return {
				hot_comments:[],
				song_name:"",
			}
		},
		computed:{
			song_pic(){
				return this.$store.state.song_pic;
			},
			song_index(){
				return this.$store.state.song_index;
			},
			song_list(){
				return this.$store.state.song_list;
			}
		},
		methods:{
			get_comment_info(){
				var song_id = this.song_list[this.song_index].id;
				console.log(song_id)
                this.$axios.get('https://autumnfish.cn/comment/hot?type=0&id=' + song_id)
                .then(response=>{
                    this.hot_comments = response.data.hotComments;
                    console.log(response.data,this.hot_comments)
                })
			},
			go_back(){
				this.$router.back()
			},
			to_play(){
				this.$router.push({name:'play'})
			}
		},
		watch:{
			$router: function(to, from){
				console.log(to,from)
			}
		},
		activated(){
			console.log("激活comment组件")
			this.get_comment_info();
		}
	}
</script>

<style scoped>
	#comment{
		height: 100%;
		width: 92%;
		overflow: hidden;
		margin: 0 auto;
	}
	.comment_header{
	    height: 8%;
	    width: 100%;
	    display: flex;
	    justify-content: space-between;
	    align-items: center;
	    font-size: 20px;
	}
	.comment_header span img{
		width: 30px;
		height: 30px;
		border-radius: 50%;
	}
	.song_info{
		height: 10%;
	    display: flex;
	    width: 100%;
	    align-items: center;
	}
	.song_cover{
		width: 20%;
	}
	.song_cover img{
		width: 100%;
	    border-radius: 10px;
	}
	.singer_info{
		width: 70%;
		text-align: left;
	    text-indent: 20px;
	}
	.song_name{
		margin-bottom: 5px;
	}
	.singer_name{
		font-size: 12px;
		color: #5a7cab;
	}
	.right_arrow{
		width: 10%;
	}
	.right_arrow img{
		width: 30px;
	}
	.wonderful_comment{
	    font-size: 14px;
	    height: 5%;
	    line-height: 40px;
	    font-weight: normal;
	    text-align: left;
	}
	.comment_list{
		height: 77%;
		overflow: auto;
	}
	.comment{
		position: relative;
	}
	.user_of_comment{
		width: 30px;
		height: 30px;
		border-radius: 50%;
	    position: absolute;
	    left: 0px
	}
	h3,p{
		margin: 0;
	}
	.username{
	    font-size: 14px;
		text-align: justify;
	    padding: 2% 0 2% 10%;
	}
	.comment_content{
	    font-size: 14px;
	    text-align: justify;
	    padding-left: 10%;
        margin-left: 10%;
	    padding-bottom: 8px;
	    border-bottom: 1px solid #e6e6e6;
	    margin-bottom: 8px;
	}

	image[lazy=loading] {
	  width: 40px;
	  height: 300px;
	  margin: auto;
	}
</style>