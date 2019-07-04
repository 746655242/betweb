<template>
	<div class="scoreWrap">
		<header class="listHeader">
			<span onclick="history.go(-1)" class="iconfont icon-fanhui">&#xe614;</span>
			<span>大乐透开奖详情</span>
			<router-link class="headerRight" to="/numberList">更多期次</router-link>
		</header>
		<div class="numberDetailsBox">
			<div class="info-top" v-for="(item,index) in winningInfolist" :key="index">
				<p class="issue">
					<b>第{{item.issue}}期</b>
					<span>{{item.date}} {{item.time}} ({{item.week}})</span>
				</p>
				<ul class="result">
					<li v-for="(ite,idx) in item.numList" :key="idx">{{ite}}</li>
				</ul>
				<div class="theMoney">
					<p class="salesVolume money">
						<i></i>
						<b>本期销量(元)</b>
						<span>{{item.sales}}</span>				
					</p>
					<p class="jackpotBonuses money">
						<i></i>
						<b>奖池奖金(元)</b>
						<span>{{item.bonus}}</span>				
					</p>
				</div>
			</div>
			<div class="info-down">
				<p class="info-title">
					<span>奖项</span>
					<span>中奖注数(注)</span>
					<span>每注奖金(元)</span>
				</p>
				<ul class="winningThat">
					<li  v-for="(item,index) in numberDetailslist" :key="index">
						<p class="winningLevel">
							<span>{{item.award}}</span>
							<span>{{item.num}}</span>
							<span>{{item.money}}</span>							
						</p>
						<p class="add">
							<span>{{item.add}}</span>
							<span>{{item.addNum}}</span>
							<span>{{item.addMoney}}</span>							
						</p>
					</li>						
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
const winningInfoList = [
	{
		issue:'20170133',
		date:'2017-11-10',
		time:'23:02:36',
		week:'周五',
		numList:['01','03','04','05','06','05','06'],
		sales:'210,287,622',
		bonus:'4,219,678,733',
	}
]
const numberDetailsList = [
	{
		award:'一等奖',
		num:3,
		money:10000000,
		add:'追加',
		addNum:2,
		addMoney:6000000,
	},
	{
		award:'二等奖',
		num:51,
		money:185752,
		add:'追加',
		addNum:25,
		addMoney:111451,
	},
	{
		award:'三等奖',
		num:717,
		money:5083,
		add:'追加',
		addNum:368,
		addMoney:3049,
	},
	{
		award:'四等奖',
		num:22185,
		money:200,
		add:'追加',
		addNum:8018,
		addMoney:100,
	},
	{
		award:'五等奖',
		num:478380,
		money:10,
		add:'追加',
		addNum:165704,
		addMoney:5,
	},

]
export default {

	name: 'numberDetails',
	data () {
	  	return{
	  		winningInfolist:winningInfoList,
			numberDetailslist:numberDetailsList,
	  	}
	
	 },
	components:{
	
	},
	methods:{//无缓存
		
	},
	computed:{//缓存

	},
	watch:{//数据监听
	
	},
	beforeRouteEnter (to, from, next) {
	//  console.log('离开'+from.name+'进入'+to.name)
	    next();
	},
	beforeRouteUpdate (to, from, next) {
	      
	   next();
	},
	beforeRouteLeave (to, from, next) {
	// console.log('离开'+from.name+'进入'+to.name)
	   next();
	}

}
</script>

<style lang="less">

.scoreWrap{
	.listHeader{
		.icon-fanhui{
			padding:0 .1rem;
		}
		.headerRight{
			font-size:.13rem;
			padding:0 .1rem;
		}
	}
	.numberDetailsBox{
	    position: absolute;
	    top: .44rem;
	    left: 0;
	    width: 100%;
	    height: 100%;
	    overflow-y: scroll;
	    padding: .1rem .15rem .44rem;
		.info-top{
			background: #fff;
			-webkit-border-radius: .05rem;
			-moz-border-radius: .05rem;
			border-radius: .05rem;
			padding-top:.15rem;
			.issue{	
				margin-bottom:.14rem;	
				padding-left:.14rem;		
				b{
					font-size:.15rem;
					color:#212120;
					margin-right:.07rem;
					line-height:1;
				}
				span{
					font-size:.12rem;
					color:#989796;
				}
			}
			.result{
				overflow: hidden;
				padding-left:.14rem;
				margin-bottom:.1rem;
				li{
					width:.28rem;
					height:.32rem;
					background: url("~@/assets/img/numberPlate-red.png") no-repeat center 0;
					background-size:100% 100%;
					text-align: center;
					padding-top:.06rem;
					color:#fff;
					float: left;
					margin-right:.06rem;
				}
				li:nth-child(6),
				li:last-child{
					background: url("~@/assets/img/numberPlate-blue.png") no-repeat center 0;
					background-size:100% 100%;
				}
			}
			.theMoney{
				padding:.14rem;
				border-top:1px solid #f0f0f0;
				.money{
					i{
						display: inline-block;
						vertical-align: middle;
						width:.05rem;
						height:.05rem;
						background:#999;		
						margin-right:.05rem;				
					}
					b{
						font-size:.13rem;
						color:#212120;
						margin-right:.21rem;
						line-height:1;
					}
					span{
						font-size:.13rem;
						color:#ef1823;
					}
				}
			}
		}
		.info-down{
			background:#fff;
			margin:.1rem 0;
			-webkit-border-radius: .05rem;
			-moz-border-radius: .05rem;
			border-radius: .05rem;	
			.info-title{
				background:#f0f0f0;
				text-align: center;
				overflow:hidden;
				span{
					width:33.333%;
					height:.4rem;
					line-height:.4rem;
					color:#989796;
					font-size:.15rem;
					float: left;
				}
			}
			.winningThat{
				li{
					p{
						height:.35rem;
						line-height:.35rem;
						overflow: hidden;
						font-size:.13rem;
						color:#212120;
						span{
							float: left;
							width:33.33%;
							text-align: center;
						}
					}
					.winningLevel{
						background:#fff;
					}
					.add{
						background:#f9f9f9;
					}
				}
			}
		}
	}	
	.numberDetailsBox::-webkit-scrollbar{
		display: none;
	}	
}
</style>
