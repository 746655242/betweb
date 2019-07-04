<template>
	<div class="daohao-wrap">
		
		<swiper dots-class="dots-icon" auto :show-desc-mask="false" :aspect-ratio=".413" dots-position="center">
	      <swiper-item class="swiper-demo-img" v-for="(item, index) in bannerlist" :key="index">
	        	<img style="width:100%;height:100%" :src="item.img" @click="swiperClick(index)">
	      </swiper-item>
    	</swiper>
		
		
		<div class="lottery-wrap">
			<div class="lottery-box" v-for="(item,index) in LstIdxLotteryData" :key="index">
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
						<router-link to="/lotteryBetting" class="bitNow">立即下注</router-link>
					</p>  
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	
import { Swiper,SwiperItem} from 'vux'

export default {
	name: 'lottery',
	data() { //页面数据
		return {
			bannerlist:[],
			LstIdxLotteryData:[],
			bigIndex:''
		}
	},
	created(){
		this.fetchData();
	},
	mounted: function() {
	
	},
	methods: { //无缓存
		fetchData(){
			let me= this;
			this.base.getData(this,this.host+'/api/GetExportPageDetailForIdxLottery',{"SystemCode":"DQExport",},function(data){
				
				me.PageBanner = data.ActionCode.PageBanner     //banner轮播
				me.PageBanner.forEach(function(item,i){
					me.$set(me.bannerlist,i,{
						img:item.BannerSource.UrlLink,
						imgBig:item.BannerTarget.UrlLink
					})
				})
				
				me.LstIdxLotteryData = data.ActionCode.LstIdxLotteryData     //彩票列表	
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
	.daohao-wrap{
		.banner-lottery,.banner-digitalLottery{
			width:100%;
			height:1.56rem;
			display:block;
			img{
				width:100%;
				height:100%;
			}
		}
		.lottery-wrap{
			width:94%;
			margin: .2rem auto 0;
			.lottery-box{
				width:100%;
				margin:0 auto .2rem;
				background:#fff;
				-webkit-border-radius: .1rem;
				-moz-border-radius: .1rem;
				border-radius: .1rem;
				position: relative;
				.lottery-logo{	
					position: absolute;	
					top:.28rem;
					left:.19rem;
					img{
						width:.64rem;
						height:.64rem;						
					}
				}
				.lottery-info{
					padding:.15rem .2rem .2rem .99rem;
					.info-p1,.info-p2,.info-p3{
						display: flex;
						justify-content:space-between;
						height:.24rem;
						line-height: .24rem;
						.lottery-name{
							font-size:.14rem;
							color:#000;
						}
						.lottery-date,.lottery-issue,.lottery-time{
							font-size:.09rem;
							color:#989796;
						}
					}
					.info-p2{
						height:.22rem;
						line-height: .22rem;
						.lottery-issue{
							font-size:.12rem;
						}
						.lottery-time{
							font-size:.11rem;
							i{
								color:#fa4d29;
							}
						}
					}
					.info-p3{
						height: .3rem;
						margin-top:.1rem;
						a{
							border:1px solid #3f95dd;
							-webkit-border-radius: .05rem;
							-moz-border-radius: .05rem;
							border-radius: .05rem;
							height:.21rem;
							line-height:.21rem;
							color:#3f95dd;
							font-size:.11rem;
							text-align: center;
							display: inline-block;
							margin-top: .05rem;
						}
						.playingMethod{
							width:.34rem;
						}
						.trendChart{
							width:.44rem;						
						}
						.miss{
							width:.58rem;
						}
						.bitNow{
							width:.75rem;
							height:.3rem;
							border:none;
							background:#ef1823; 
							color:#fff; 
							line-height:.3rem;
							margin-top: 0;
						}
					}
				}
			}					
		}
	}
	
</style>
