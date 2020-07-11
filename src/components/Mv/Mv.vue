<template>
  	<div id="mv">
  		<img :src="require('../../assets/comment/Larrow.png')" class="go_back" @click="$router.back()">
		<video autoplay controls :src="mv_url"></video>
  	</div>
</template>

<script>
	export default {
		name: 'Mv',
		computed:{
			mv_url(){
				return this.$store.state.mv_url;
			}
		}	
	}
</script>

<style scoped>
	#mv{
		width:100%;
		height: 100%;
		background: url(../../assets/mv/mv_bg.jpg) no-repeat;
		background-size: cover;
		display: flex;
	}
	video{
		width:100%;
	}
	.go_back{
		position: absolute;
	    width: 40px;
	    z-index: 9999;
	}
</style>