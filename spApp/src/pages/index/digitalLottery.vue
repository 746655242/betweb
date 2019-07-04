<template>
	<div class="daohao-wrap">
		<swiper dots-class="dots-icon" auto :show-desc-mask="false" :aspect-ratio=".413" dots-position="center">
	      <swiper-item class="swiper-demo-img" v-for="(item, index) in bannerlist" :key="index">
	        	<img style="width:100%;height:100%" :src="item.img" @click="swiperClick(index)">
	      </swiper-item>
    	</swiper>
		
		
		<div class="lottery-wrap">
			<div class="lottery-box" v-for="(item,index) in LstIdxNumberData" :key="index">
				<div class='lottery-logo'>
					<img :src="item.LotteryIcon.UrlLink">
				</div>	
				<div class="lottery-info">
					<p class="info-p1">
						<span class="lottery-name">{{item.LotteryGameGroupName}}</span>
						<span class="lottery-date">{{item.LotteryOpenDate}}</span>
					</p>
					<p class="info-p2">
						<span class="lottery-issue">{{item.LotteryGameNo}}</span>
						<span class="lottery-time"><i>{{item.LotteryOpenTime}}</i>&nbsp;开奖</span>
					</p>
					<p class="info-p3">
						<router-link to="" class="playingMethod">玩法</router-link>
						<router-link to="" class="trendChart">走势图</router-link>
						<router-link to="" class="miss">当前遗漏</router-link>
						<router-link to="" class="bitNow">立即下注</router-link>
					</p>  
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import { Swiper,SwiperItem} from 'vux'
  
export default {
	name: 'digitalLottery',

	data() { //页面数据
		return {
			bannerlist:[],
			LstIdxNumberData:[],
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
			this.base.getData(this,this.host+'/api/GetExportPageDetailForIdxNumber',{"SystemCode":"DQExport",},function(data){
				
				me.PageBanner = data.ActionCode.PageBanner     //banner轮播
				me.PageBanner.forEach(function(item,i){
					me.$set(me.bannerlist,i,{
						img:item.BannerSource.UrlLink,
						imgBig:item.BannerTarget.UrlLink
					})
				})
				
				me.LstIdxNumberData = data.ActionCode.LstIdxNumberData     //数字彩列表	
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
	
</style>

