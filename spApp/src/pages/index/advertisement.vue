<template>
	<div class="daohao-wrap" id="daohao-wrap">
		<header>
			<span onclick="history.go(-1)" class="iconfont icon-fanhui">&#xe614;</span>
			<span>广告详情</span>
		</header>
		<div class="bigImg">
			<img :src="bigUrl" alt="" />
		</div>
	</div>
</template>

<script>
	export default {
		name: 'advertisement',
		data() { //页面数据
			return {
				bigUrl:''
			}
		},
		created() { //初始化
			this.bigUrl = this.$route.query.id
		},
		mounted: function() {
		
		},
		methods: {
				query(){
					console.log(this.bigUrl)
				}
		},
		computed: { //缓存，
	
		},
		watch: { //数据监听
			
		},
		components: { //模板

		},
		activated:function(){
			
		},

	}
</script>

<style lang="less" scoped="scoped">
	.bigImg{
		position: fixed;
		left: 0;
		top: 0.44rem;
		 width: 100%;
		 height: 100%;
	}
	.bigImg img{
		width: 100%;
		height: 100%;
	}
</style>