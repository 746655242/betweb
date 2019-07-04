<template>
	<div class="daohao-wrap">
		<header class="betListHeader">
			<span onclick="history.go(-1)" class="iconfont icon-fanhui">&#xe614;</span>
			<span>广东11选5投注单</span>
		</header>
		<div class="betListBox">
			<div class="info-time">
				<span>{{issue}}期</span>
				<span>
					<i class="iconfont icon-shizhong">&#xe608;</i>
					<b>{{time}}</b>
				</span>
			</div>
			<div class="betsSingleBox" ref="myBetsSingleBox"> 
				<div class="betsSingle" ref="myBetsSingle" v-for="(item,index) in bettinglist" :key="index" :id="index">
					<i class="iconfont icon-shanchu" @click="deleteBetsSingle($event.currentTarget)">&#xe60b;</i>
					<div class="numListBox">
						<p class="selectedNum">
							<b v-for="num in item.numList">{{num}}</b>
						</p>
						<p class="selectedInfo">
							<span>{{item.play}}</span>
							<span>一注{{item.money}}元</span>
						</p>
					</div>
					<router-link to="/lotteryBetting"><i class="iconfont icon-enter">&#xe606;</i></router-link>
				</div>
				<p class="clearList" @click="clearAllList">
					<i class="iconfont icon-qingchu">&#xe60a;</i>
					<span>清空所有号码</span>
				</p>
			</div>
			<div class="payment">
				<span>共<i>3</i>注<b>6</b>元</span>
				<router-link to="pay" ref="myPay">付款</router-link>
			</div>
		</div>
	</div>                      
</template>

<script>
const bettingList = [
	{
		numList:['01','05','07','09','11'],
		play:'直选',
		money:'2'
	},
	{
		numList:['01','02','05','07','10'],
		play:'直选',
		money:'3'
	},	
	{
		numList:['01','05','06','08','11'],
		play:'直选',
		money:'4'
	},	
]
export default {
	name: 'lotteryBettingList',
	data() { //页面数据
		return {
			issue:'No.1712112169',
			time:'00:09:52',
			bettinglist:bettingList,
		}
	},
	created :function(){

	},

	methods: { //无缓存
		deleteBetsSingle(e){
			this.$refs.myBetsSingle.forEach(function(item,i){
				
			})
		},
		clearAllList(){
//			this.$refs.myBetsSingle.style.display = "none"
			this.$refs.myBetsSingle.forEach(function(item,i){
				item.style.display = "none"
			})
		},

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
		.betListHeader{
			.icon-fanhui{
				padding: 0 .2rem;
			}			
		}
		.betListBox{
			margin-top:.44rem;
			.info-time{
				width:99.6%;
				height:.3rem;
				line-height:.3rem;
				margin:0 auto .1rem;
				background: #fff;
				padding:0 .2rem;
				display: flex;
				justify-content: space-between;	
				span{
					font-size:.13rem;
					color:#212120;
					i{
						margin-right:.1rem;
						font-size:.14rem;
						color:#989796;
					}
					b{
						color:#ef1823;
					}
				}		
			}
			.betsSingleBox{
				width:94%;
				background: #fff;
				-webkit-border-radius: .05rem;
				-moz-border-radius: .05rem;
				border-radius: .05rem;
				margin:0 auto;
				.betsSingle{
					width:100%;
					padding:.075rem 0 .075rem .1rem;
					overflow:hidden;
					border-bottom:1px solid #e7e5e4;
					.icon-shanchu{
						float: left;
						margin-top:.18rem;
						font-size:.22rem;
						color:#c1bbbb;	
					}
					.numListBox{
						float: left;
						margin-left:.2rem;
						.selectedNum{
							line-height:.3rem;
							b{
								margin-right:.125rem;
								color:#ef1823;
								font-size:.15rem;
							}
						}
						.selectedInfo{
							line-height:.28rem;
							span{
								margin-right:.135rem;
								color:#989796;
								font-size:.14rem;								
							}
						}
					}
					a{
						float: right;
						padding:.21rem .1rem;		
						.icon-enter{
							font-size:.15rem;
							color:#b7b1b1;
						}
					}
				}
				.clearList{
					line-height:.33rem;
					background:#f8f8f8;
					text-align: center;
					.icon-qingchu{
						font-size:.15rem;
						color:#999;
						margin-right: .08rem;
					}
					span{
						color:#888;
						font-size:.13rem;
					}
				}
			}
			.payment{
				position: fixed;
				bottom:0;
				left:0;
				width:100%;
				height:.49rem;
				line-height:.49rem;
				padding:.075rem .1rem .075rem .2rem;
				display: flex;
				justify-content: space-between;
				background: #fff;
				span{
					display: block;
					font-size:.16rem;
					color:#666564;
					line-height:.34rem;
					i{
						color:#666564;
						font-size:.13rem;
					}
					b{
						color:#fc5159;
						font-size:.13rem;
					}
				}
				a{
					width:.6rem;
					height:.34rem;
					line-height:.34rem;
					background:#ef1823;
					color:#fff;
					text-align: center;
					-webkit-border-radius: .05rem;
					-moz-border-radius: .05rem;
					border-radius: .05rem;
				}
			}
		}
	}
	

</style>
