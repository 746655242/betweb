<template>
<div>
<link href="./static/css/user.css" rel="stylesheet">
	<div class="border_tbbox mb15">
        <div class="lotterytit topcenter bgfff">
          <p class="boxflex gray3">{{GroupData[0].PageGroupShow}}</p>
        </div>

        <div class="lotterylist border_t topcenter">
          <div class="lotteryitem border_r boxflex" style="">
			<router-link :to="GroupData[0].LstIconData[0].href">
              <em class="paijiconbg" style="display: none;">派奖</em>
              <p class="lotterybg"><em class="lottery_jczq"></em></p>
              <div>
                <p class="lotteryname">{{GroupData[0].LstIconData[0].IconShowName}}</p>
                <p class="gray8b"></p>
				
              </div>
            </router-link>
		  </div>

          <div class="lotteryitem border_r boxflex" style="">
			<router-link :to="GroupData[0].LstIconData[1].href">
              <em class="paijiconbg" style="display: none;">派奖</em>
              <p class="lotterybg"><em class="lottery_jclq"></em></p>
              <div>
                <p class="lotteryname">{{GroupData[0].LstIconData[1].IconShowName}}</p>
                <p class="gray8b"></p>
              </div>
			</router-link>
		  </div>

          <div class="lotteryitem border_r boxflex" style="">
			<router-link :to="GroupData[0].LstIconData[2].href">
              <em class="paijiconbg" style="display: none;">派奖</em>
              <p class="lotterybg"><em class="lottery_14chang"></em></p>
              <div>
                <p class="lotteryname">{{GroupData[0].LstIconData[2].IconShowName}}</p>
                <p class="gray8b"></p>
              </div>
            </router-link>
		  </div>

          <div class="lotteryitem border_r boxflex" style="">
			<router-link :to="GroupData[0].LstIconData[3].href">
              <em class="paijiconbg" style="display: none;">派奖</em>
              <p class="lotterybg"><em class="lottery_ren9"></em></p>
              <div>
                <p class="lotteryname">{{GroupData[0].LstIconData[3].IconShowName}}</p>
                <p class="gray8b"></p>
              </div>
            </router-link>
		  </div>

        </div>
        <!-- jingcai over -->

        <div class="lotterylist border_t topcenter">
          <div class="lotteryitem border_r boxflex" style="">
			<router-link :to="GroupData[0].LstIconData[4].href">
              <em class="paijiconbg" style="display: none;">派奖</em>
              <p class="lotterybg"><em class="lottery_danc"></em></p>
              <div>
                <p class="lotteryname">{{GroupData[0].LstIconData[4].IconShowName}}</p>
                <p class="gray8b"></p>
              </div>
            </router-link>
		  </div>

          <div class="lotteryitem border_r boxflex2">
			<a class="flexcenter">
              <!-- <div class="lotteryitem border_r boxflex2" v-show="info.lottery.SYY.check"><a class="flexcenter"> -->
              <em class="paijiconbg" style="display: none;">派奖</em>
              <p class="lotterybg"><em class="lottery_11x5"></em></p>
              <div>
                <p class="lotteryname">{{GroupData[0].LstIconData[5].IconShowName}}</p>
                <p class="gray8b textl">敬请期待</p>
                <!-- <p class="gray8b textl">稍后开放</p> -->
              </div>
            </a>
		  </div>

          <div class="lotteryitem  border_r boxflex" style="">
			<a>
              <em class="paijiconbg" style="display: none;">派奖</em>
              <p class="lotterybg"><em class="lottery_sfgg"></em></p>
              <div>
				<router-link :to="GroupData[0].LstIconData[6].href">
                <p class="lotteryname">{{GroupData[0].LstIconData[6].IconShowName}}</p>
                <p class="gray8b"></p>
				</router-link>
              </div>
            </a>
		  </div>
        </div>
        <!-- 北京单场 11x5 胜负 over -->

        <div class="lotterylist border_t topcenter">
          <div class="lotteryitem border_r boxflex" style="">
			<a>
              <em class="paijiconbg" style="display: none;">派奖</em>
              <p class="lotterybg"><em class="lottery_dlt"></em></p>
              <div>
                <p class="lotteryname">{{GroupData[0].LstIconData[7].IconShowName}}</p>
                <p class="gray8b" style="">敬请期待</p>
              </div>
            </a>
		  </div>
          <div class="lotteryitem border_r boxflex" style="">
			<a>
              <em class="paijiconbg" style="display: none;">派奖</em>
              <p class="lotterybg"><em class="lottery_p7"></em></p>
              <div>
                <p class="lotteryname">{{GroupData[0].LstIconData[8].IconShowName}}</p>
                <p class="gray8b" style="">敬请期待</p>
              </div>
            </a>
		  </div>
          <div class="lotteryitem border_r boxflex" style="">
			<a>
              <em class="paijiconbg" style="display: none;">派奖</em>
              <p class="lotterybg"><em class="lottery_p3"></em></p>
              <div>
                <p class="lotteryname">{{GroupData[0].LstIconData[9].IconShowName}}</p>
                <p class="gray8b" style="">敬请期待</p>
              </div>
            </a>
		  </div>
          <div class="lotteryitem border_r boxflex" style="">
			<a>
              <em class="paijiconbg" style="display: none;">派奖</em>
              <p class="lotterybg"><em class="lottery_p5"></em></p>
              <div>
                <p class="lotteryname">{{GroupData[0].LstIconData[10].IconShowName}}</p>
                <p class="gray8b" style="">敬请期待</p>
              </div>
            </a>
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
							Tips:'',
						},
						{
							IconPicInfo:require('@/assets/img/icon-lq.png'),
							href:'/home/jingcailanqiu',
							IconShowName:'竞彩篮球',
							Tips:'',
						},
						{
							IconPicInfo:require('@/assets/img/icon-zq.png'),
							href:'/home/zucai',
							IconShowName:'足球14场',
							Tips:'',
						},
						{
							IconPicInfo:require('@/assets/img/icon-zq.png'),
							href:'/home/zucai9',
							IconShowName:'任选9场',
							Tips:'',
						},
						{
							IconPicInfo:require('@/assets/img/icon-zq.png'),
							href:'/home/danchang',
							IconShowName:'北京单场',
							Tips:'',
						},
						{
							IconPicInfo:require('@/assets/img/icon-zq.png'),
							href:'',
							IconShowName:'广东11选5',
							Tips:'',
						},
						{
							IconPicInfo:require('@/assets/img/icon-zq.png'),
							href:'/home/danchangGg',
							IconShowName:'胜负过关',
							Tips:'',
						},
						{
							IconPicInfo:require('@/assets/img/icon-zq.png'),
							href:'',
							IconShowName:'大乐透',
							Tips:'',
						},
						{
							IconPicInfo:require('@/assets/img/icon-zq.png'),
							href:'',
							IconShowName:'七星彩',
							Tips:'',
						},
						{
							IconPicInfo:require('@/assets/img/icon-zq.png'),
							href:'',
							IconShowName:'排列3',
							Tips:'',
						},
						{
							IconPicInfo:require('@/assets/img/icon-zq.png'),
							href:'',
							IconShowName:'排列5',
							Tips:'',
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