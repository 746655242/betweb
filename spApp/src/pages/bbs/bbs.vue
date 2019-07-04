<template>
	<div class="daohao-wrap">
		<swiper dots-class="dots-icon" auto :show-desc-mask="false" :aspect-ratio=".413" dots-position="center">
	      <swiper-item class="swiper-demo-img" v-for="(item, index) in bannerlist" :key="index">
	        	<img style="width:100%;height:100%" :src="item.img" @click="swiperClick(index)">
	      </swiper-item>
    	</swiper>
		
		
		<div class="bbs-wrap">
			<router-link to="/bbsDigitalTalent" class="bbs-box" v-for="(item,index) in LstIdxForumData" :key="index">
				<img :src="item.ForumBg.UrlLink">
			</router-link>
		</div>
	</div>
</template>

<script>

import { Swiper,SwiperItem} from 'vux'
  
export default {
	name: 'bbs',

	data() { //页面数据
		return {
			bannerlist:[],
			LstIdxForumData:[],
			bigIndex:''
		}
	},
	 created(){ //初始化
		this.fetchData();
	 },
	mounted: function() {
	
	},
	methods: { //无缓存
		fetchData(){
			let me= this;
			this.base.getData(this,this.host+'/api/GetExportPageDetailForIdxForum',{"SystemCode":"DQExport",},function(data){
				me.PageBanner = data.ActionCode.PageBanner  //banner轮播
				me.PageBanner.forEach(function(item,i){    
					me.$set(me.bannerlist,i,{
						img:item.BannerSource.UrlLink,
						imgBig:item.BannerTarget.UrlLink
					})
				})
				me.LstIdxForumData = data.ActionCode.LstIdxForumData  //论坛列表
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
		console.log('进入' + to.name + '组件前');
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
		.bbs-wrap{
			width:94%;
			margin:.1rem auto 0;
			.bbs-box{
				display: block;
				margin:0 auto .1rem;
				width:100%;
				height:.85rem;
				-webkit-border-radius: .05rem;
				-moz-border-radius: .05rem;
				border-radius: .05rem;
				img{
					width:100%;
					height:100%;
				}
			}
		}
	}
</style>
