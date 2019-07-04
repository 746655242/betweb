<template>
	<div class="daohao-wrap">
		<swiper dots-class="dots-icon" auto :show-desc-mask="false" :aspect-ratio=".413" dots-position="center">
	      <swiper-item class="swiper-demo-img" v-for="(item, index) in bannerlist" :key="index">
	        	<img style="width:100%;height:100%" :src="item.img" @click="swiperClick(index)">
	      </swiper-item>
    	</swiper>
		
		<div class="sport-wrap">
			<div class="sport-box">
				<img src="~@/assets/img/development.png">
				<p>正在开发中，敬请期待...</p>
			</div>
		</div>
	</div>
</template>

<script>
 import { Swiper,SwiperItem} from 'vux'
export default {
	name: 'sportsLottery',

	data() { //页面数据
		return {
			bannerlist:[],
//			sportslotterylist:[]
			LstIdxSportsData:[],
			bigIndex:''
		}
	},
	 created() { //初始化
		this.fetchData();
	 },
	mounted: function() {
	
	},
	methods: { //无缓存
		fetchData(){
			let me= this;
			this.base.getData(this,this.host+'/api/GetExportPageDetailForIdxSports',{"SystemCode":"DQExport",},function(data){
				
				me.PageBanner = data.ActionCode.PageBanner     //banner轮播
				me.PageBanner.forEach(function(item,i){
					me.$set(me.bannerlist,i,{
						img:item.BannerSource.UrlLink,
						imgBig:item.BannerTarget.UrlLink
					})
				})
				
				me.LstIdxSportsData = data.ActionCode.LstIdxSportsData     //运动彩列表	
			})
		},
		swiperClick(index){
			this.bigIndex = this.bannerlist[index].imgBig
			this.$router.push({path: '/advertisement', query: {id: this.bigIndex}});

		},
	},
	computed: { //缓存，

	},
	watch: { //数据监听

	},
	components: { //模板
		Swiper,
		SwiperItem
	},
	activated:function(){
		
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
	.sport-wrap{
		.sport-box{
			width:100%;
			margin-top:.375rem;
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
</style>
