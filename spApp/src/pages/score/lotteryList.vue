<template>
	<div class="scoreWrap">
		<header class="listHeader">
			<span onclick="history.go(-1)" class="iconfont icon-fanhui">&#xe614;</span>
			<span>{{LotteryGroupName}} 开奖资料</span>
			<i class="iconfont icon-screen headerRight" @click="dateList">&#xe602;</i>
			<div class="screenTime" v-show="dateShow">
				<p v-for="(item,index) in LstDateSelect" :key="index" @click="selectTheDate(item,index)">{{item.Show}}</p>
			</div>
		</header>
		<div class="lotteryListBox">
			<div class="lotteryInfo" v-for="(item,index) in LstSaiLaiLotteryGameOpen" :key="index">
				<p class="issue">
					<b>{{item.LotteryGameNo}}</b>
					<span>{{item.LastUpdDate}}</span>
				</p>
				<ul class="result">
					<li v-for="(ite,idx) in item.LotteryGameOpenDetail.split('+')[0].split(',')" :key="idx">{{ite}}</li>
					<li class="lastLi" v-for="(ite,idx) in (item.LotteryGameOpenDetail.split('+')[1])?item.LotteryGameOpenDetail.split('+')[1].split(','):''" :key="idx">{{ite}}</li>
				</ul>	
			</div>
		</div>
		<div class="mask" v-show="maskShow" @click="toggle"></div>
	</div>
</template>

<script>	
import {mapGetters} from 'vuex'
export default {

	name: 'lotteryList',
	data () {
	  	return{
	  		LotteryGroupName:'',  //头部彩票名称
	  		dateShow:false,  //日期弹出层
	  		maskShow:false,  //遮罩
	  		LstSaiLaiLotteryGameOpen:[],  //彩票开奖资料列表
	  		LstDateSelect:[],  //日期
	  	}
	
	 },
	 created(){
	 	this.fetchData()
	 },
	 computed:{//缓存

	},
	watch:{//数据监听
	
	},
	components:{
	
	},
	methods:{//无缓存	
		fetchData(){
			let me = this
			this.base.getData(this,this.host+'/api/LotteryGameOpenByGroupCode',{"SystemCode":"DQExport",
				"GroupCode":this.$route.query.code,"Paging":1,},function(data){	
//					console.log(data)
				me.LstSaiLaiLotteryGameOpen = data.ActionCode.LstSaiLaiLotteryGameOpen     //彩票列表
				
				me.LstSaiLaiLotteryGameOpen.forEach(function(item,i){
					me.LotteryGroupName = item.LotteryGroupName    //头部彩票名称
				})
			
			})
			this.base.getData(this,this.host+'/api/LotteryGameOpenByGroupCodeInitial',{"SystemCode":"DQExport",
				"GroupCode":this.$route.query.code,},function(data){	
//				console.log(data)
				me.LstDateSelect = data.ActionCode.LstDateSelect     //日期	
			})
		},
		
		/* 选择日期显示相应日期的开奖资料*/
		selectTheDate(item,index){  			
			let me = this		
			this.base.getData(this,this.host+'/api/LotteryGameOpenByGroupCodeAndDateCode',{"SystemCode":"DQExport",
				"GroupCode":this.$route.query.code,"DateCode":item.Value},function(data){	
//					console.log(data)
					me.LstSaiLaiLotteryGameOpen = data.ActionCode.LstSaiLaiLotteryGameOpen     //彩票列表
			})
			
			me.toggle()			
		},
		
		/* 日期列表隐藏 */
		toggle(){
			this.dateShow = false
			this.maskShow = false
		},
		
		/* 日期列表显示/隐藏 */
		dateList(){
			this.dateShow = !this.dateShow
			this.maskShow = !this.maskShow
		},
		
		
	},
	
	
	
}
</script>

<style lang="less" scoped="scoped">
.scoreWrap{
	.listHeader{
		.icon-screen{
			font-size:.18rem;
		}
		.screenTime{
			width:100%;
			background:#fff;
			position: absolute;
			top:.44rem;
			left:0;
			z-index: 1;
			p{
				height:.4rem;
				line-height:.4rem;
				color:#212121;
				font-size:.14rem;
				border-bottom:1px solid #e0e0e0;
			}
		}
	}
	.lotteryListBox{
		width:100%;
		height: 100%;
		padding: .1rem .15rem .45rem;
		position: absolute;
		top: .44rem;
		left: 0;
		overflow-y: scroll;	
		.lotteryInfo{
			width:100%;
			height:.9rem;
			margin-bottom:.1rem;
			padding:.15rem 0 .14rem .14rem;
			-webkit-border-radius: .05rem;
			-moz-border-radius: .05rem;
			border-radius: .05rem;
			background: #fff;
			.issue{	
				margin-bottom:.14rem;			
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
				li.lastLi{
					background: url("~@/assets/img/numberPlate-blue.png") no-repeat center 0;
					background-size:100% 100%;
				}
			}
		}
	}
	.lotteryListBox::-webkit-scrollbar{
		display: none;
	}
}
</style>
