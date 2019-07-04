<template>
	<div class="daohao-wrap">
		<header class="payHeader">
			<span onclick="history.go(-1)" class="iconfont icon-fanhui">&#xe614;</span>
			<span>立即支付</span>
		</header>
		<div class="payCont">
			<div class="developing">
				<img src="~@/assets/img/development.png">
				<p>正在开发中，敬请期待...</p>
			</div>
		</div>
	</div>                      
</template>

<script>

export default {
	name: 'pay',
	data() { //页面数据
		return {

		}
	},
	created :function(){

	},

	methods: { //无缓存

	},
	computed: { //缓存，

	},
	watch: { //数据监听

	},
	components: { //模板

	},
	activated:function(){
//		console.log('Lottery激活事件')
	},

	beforeRouteEnter(to, from, next) { //渲染页面前执行
//		console.log('进入' + to.name + '组件前');
		next();
	},
	beforeRouteUpdate(to, from, next) { //页面切换如：在/foo/1和/foo/2之间跳转
//		console.log('组件切换数据');
		next();
	},
	beforeRouteLeave(to, from, next) { //离开时执行
//		console.log('离开组件');
		next();
	}

}
</script>

<style lang="less">
	.daohao-wrap{
		.payHeader{
			.icon-fanhui{
				padding: 0 .2rem;
			}
		}
		.payCont{
			margin-top:.44rem;
			.developing{
				margin-top:1.46rem;
				img{
					display: block;
					width:1.65rem;
					height:1.65rem;
					margin:0 auto;
				}
				p{
					font-size:.14rem;
					color:#f74c2f;	
					line-height: 1;
					margin-top:.16rem;
					text-align: center;
					font-weight: bold;
				}
			}
		}
	}

</style>
