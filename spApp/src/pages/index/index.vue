<template>
	<div class="daohao-wrap" id="daohao-wrap">	

		<swiper dots-class="dots-icon" auto :show-desc-mask="false" :aspect-ratio=".413" dots-position="center">
	      <swiper-item class="swiper-demo-img" v-for="(item, index) in bannerlist" :key="index">
	        	<img style="width:100%;height:100%" :src="item.img" @touchstart="swiperStart($event)" @touchmove="swiperMove(index, $event)" @touchend="swiperEnd(index)">
	      </swiper-item>
    	</swiper>
		<router-link to="/notice" class="broadcast">  <!--公告入口轮播-->
			<span class="iconfont icon-sound">&#xe605;</span>
			<swiper auto height="30px" direction="vertical" :interval=2000 class="text-scroll" :show-dots="false">
				<swiper-item v-for="(item,index) in LstBulletinData" :key="index">
					<p>{{item.IdxBulletinSubject}}</p>
				</swiper-item>
			</swiper>
			<span class="iconfont icon-enter">&#xe606;</span>
		</router-link>
			
		<div class="columns-wrap">  <!--彩票分类列表-->

			<div class="columns-box" v-for="(item,index) in GroupData" :key="index">			
				<div class="columns-title">
					<span class="columns-dot"></span>
					<span class="columns-name">{{item.PageGroupShow}}</span>
				</div>		
				
				<div class="columns-center">
									
					<router-link :to="ite.href" v-for="(ite,idx) in item.LstIconData" :key="idx">
					<!--<router-link :to="{path:'lotteryList',query:{code:ite.LinkPageCode}}" v-for="(ite,idx) in item.LstIconData" :key="idx">-->	
						
						<span>
							<x-img :src="ite.IconPicInfo" :default-src="require('@/assets/img/icon-cqssc.png')"  class="ximg-demo"  :offset="100" container=".swiper-item"></x-img>
						</span>				
						<p>{{ite.IconShowName}}</p>
					</router-link>	
				</div>		
			</div>


		</div>

	</div>
</template>

<script>

import { Swiper, SwiperItem, XImg } from 'vux'

export default {
	name: 'index',
	data() { //页面数据
		return {
			bannerlist: [

				{
					img:require('@/assets/img/banner-home.jpg'),

				}
			],  //banner轮播
			LstBulletinData:[],  //公告入口轮播
			GroupData:[
				{
					PageGroupShow:'彩种',
					LstIconData:[
						{
							IconPicInfo:require('@/assets/img/icon-zq.png'),
							href:'/home/jincai',
							IconShowName:'竞彩足球',
						},
						// {
						// 	IconPicInfo:require('@/assets/img/icon-lq.png'),
						// 	href:'/home/jingcailanqiu',
						// 	IconShowName:'竞彩篮球',
						// },
						{
							IconPicInfo:require('@/assets/img/icon-zq.png'),
							href:'/home/zucai',
							IconShowName:'足球14场',
						},
						{
							IconPicInfo:require('@/assets/img/icon-zq.png'),
							href:'/home/zucai9',
							IconShowName:'任选9场',
						},
						{
							IconPicInfo:require('@/assets/img/icon-zq.png'),
							href:'/home/danchang',
							IconShowName:'北京单场',
						},
						{
							IconPicInfo:require('@/assets/img/icon-zq.png'),
							href:'/home/danchangBf',
							IconShowName:'北京单场比分',
						},
						{
							IconPicInfo:require('@/assets/img/icon-zq.png'),
							href:'/home/danchangBq',
							IconShowName:'北京单场半全场',
						},
						{
							IconPicInfo:require('@/assets/img/icon-zq.png'),
							href:'/home/danchangZjq',
							IconShowName:'北京单场总进球',
						}
					]
				}	

			],  //彩票分类列表
			bigIndex:'',
			start:{},//触点
			isTap:true,
		}
	},
	created: function() { //初始化
		//this.fetchData();
	},
	mounted: function() {
	
	},
	methods: {
		fetchData(){
			// let me= this;
			// this.base.getData(this,this.host+'/api/GetExportPageDetailForIdxMain',{'SystemCode':'DQExport',},function(data){	
			// 	me.PageBanner = data.ActionCode.PageBanner     //banner轮播
			// 	me.PageBanner.forEach(function(item,i){
			// 		me.$set(me.bannerlist,i,{
			// 			img:item.BannerSource.UrlLink,
			// 			imgBig:item.BannerTarget.UrlLink
			// 		})				
			// 	})
			// 	me.LstBulletinData = data.ActionCode.PageBullet.LstBulletinData     //公告入口轮播
				
			// 	me.GroupData = data.ActionCode.GroupData     //彩票分类列表
			// })	
		},
		swiperStart(e){
			this.isTap = true;
			let touch = e.touches[0];
			this.start.x=Number(touch.pageX)
			this.start.y=Number(touch.pageY)
		},
		swiperMove(index, e){
			let touch = e.touches[0];
			this.isTap = !(Math.abs(this.start.x - Number(touch.pageX)) > 5 | Math.abs(this.start.y - Number(touch.pageY)) > 5);
		},
		swiperEnd(index){
			if(this.isTap){
				this.bigIndex = this.bannerlist[index].imgBig
				this.$router.push({path: '/advertisement', query: {id: this.bigIndex}});
			}
			
		}
	},
	computed: { //缓存，

	},
	watch: { //数据监听
	},
	components: { //模板
		Swiper,
		SwiperItem,
		XImg
	},
	activated:function(){
		
	},
	beforeRouteEnter(to, from, next) { //渲染页面前执行
//			console.log('进入' + to.name + '组件前');
		next();
	},
	beforeRouteUpdate(to, from, next) { //页面切换如：在/foo/1和/foo/2之间跳转
//			console.log('组件切换数据');
		next();
	},
	beforeRouteLeave(to, from, next) { //离开时执行
//			console.log('离开组件');
		next();
	}

}
</script>


<style lang="less" scoped="scoped">
	.dots-icon {
		.vux-icon-dot {
			background-color: #fff !important;
			transition: all .3s ease-in-out;
			-ms-transition: all .3s ease-in-out;
			-moz-transition: all .3s ease-in-out;
			-webkit-transition: all .3s ease-in-out;
			-o-transition: all .3s ease-in-out;
		}
		.active {
			width: 15px !important;
		}
	}	
	.text-scroll {
		padding: 5px 50px;
		background-color: #fff;
		font-size: 12px;
		white-space: nowrap;
		line-height: 32px;
	}	
	.broadcast {
		display: block;
		position: relative;
		color: #666564;
		margin-bottom:.15rem;
		.iconfont {
			position: absolute;
			top: 12px;
			z-index: 999;
		}
		.icon-sound {
			left: 20px;
			color: #ef1823;
			font-size: 16px
		}
		.icon-enter {
			right: 20px;
			top: 14px;
			color: #8c8a8a;
			font-size: 12px
		}
	}
	.columns-box {
		width:94%;
		margin:0 auto .15rem;
		background-color: #Fff;
		-webkit-border-radius: .1rem;
		-moz-border-radius: .1rem ;
		border-radius: .1rem;
		.columns-title {
			padding: .1rem;
			border-bottom: 1px solid #e1e0df;
			font-size: .16rem;
			span {
				height: .25rem;
				line-height: .25rem;
				vertical-align: middle;
			}
			.columns-name{
				color: #ef1823;
			}
			.columns-dot {
				width: 5px;
				display: inline-block;
				background: #ef1823;
				margin-right: .05rem;
				height: .16rem;
				-webkit-border-radius: 2px;
				-moz-border-radius: 2px;
				border-radius: 2px;
			}
		}
		.columns-center {
			overflow: hidden;
			a {
				width: 25%;
				display: block;
				float: left;
				text-align: center;
				margin: .18rem 0 .15rem;
				font-size: .13rem;
				color: #282828;
				span {
					display: block;
					margin-bottom: .05rem;
				}
				img {
					width: .5rem;
					height: .5rem;
				}
			}
		}
	}
	.columns-wrap .columns-box:nth-child(2) .columns-dot{
		background: #e47317;
	}
	.columns-wrap .columns-box:nth-child(2) .columns-name{
		color: #e47317
	}
	.columns-wrap .columns-box:nth-child(3) .columns-dot{
		background: #1e83d0;
	}
	.columns-wrap .columns-box:nth-child(3) .columns-name{
		color: #1e83d0
	}
	.columns-wrap .columns-box:nth-child(4) .columns-dot{
		background: #0d9758;
	}
	.columns-wrap .columns-box:nth-child(4) .columns-name{
		color: #0d9758
	}
</style>