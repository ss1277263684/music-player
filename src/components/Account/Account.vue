<template>
  	<div id="account">
		<div class="account_content"></div>
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
		name: 'Account'
	}
</script>

<style scoped> 
	#account{
		height: 100%;
		background-color: #ddd;
		background: url(../../assets/account/account_bg.jpg) no-repeat;
		background-size: cover;
	}
	.account_content{
		height: 90%;
		width: 100%;
	}
</style>