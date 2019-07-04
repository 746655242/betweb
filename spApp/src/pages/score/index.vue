<template>
  	<div v-title data-title="开奖" class="scoreWrap">
	    <header class="scoreHeader">
	      	<span>开奖</span>
	    </header>
		<div class="scoreBox">
			
			<ul class="tabs">  <!--导航-->				
				<li v-for="(item,index) in LotterGroupType" :key="index" @click="tabsSwitch(item,index)">
					<span :class="{active:item.Default==1}">{{item.Show}}</span>
				</li>				
			</ul>
						
			<div class="scoreCont">		
						
				<div class="swiper-lottery item-lottery">  <!--彩票、运彩、数字-->
					
					<div class="tab-swiper vux-center">

			          	<router-link :to="{path:'lotteryList',query:{code:item.LotteryGroupCode}}" v-for="(item,index) in list[onindex]" :key="index">	
				      		<div class="scoreImg">
				      			<img :src="item.LotteryGameTypeIcon.UrlLink">
				      		</div>

				      		<div class="scoreInfo">
				      			<p class="score-name-date">
				      				<span class="scoreName">{{item.LotteryGroupName}}</span><span class="scoreIssue">{{item.LotteryGameNo}}期</span>
				      			</p>
				      			<div class="scoreResult">
				      				<ul class="redBall">
				      					<li v-for="(ite,idx) in item.LotteryGameOpenDetail.split('+')[0].split(',')" :key="idx">{{ite}}</li>				      					
				      				</ul>
				      				<ul class="blueBall">
				      					<li v-for="(ite,idx) in (item.LotteryGameOpenDetail.split('+')[1])?item.LotteryGameOpenDetail.split('+')[1].split(','):''" :key="idx">{{ite}}</li>
				      				</ul>
				      			</div>
				      		</div>	
				      		
				          	<div class="scoreArrow">
				          		<i class="iconfont icon-enter">&#xe606;</i>
				          	</div>          	
				        </router-link>
    
		            </div>
		          
		            <div class="tab-swiper vux-center" v-if="list[onindex]==0">
		 				<div class="sport-box">
							<img src="~@/assets/img/development.png">
							<p>正在开发中，敬请期待...</p>
						</div>
		          	</div>
		          	          
				</div>				
				
			</div>		
		</div>
	   	<slTabbar></slTabbar>
  	</div> 
</template>

<script>
export default {	
  name: 'score',
  data () {
    return {
    	LotterGroupType:[],
    	list:[], 
    	onindex:0,   	
    	LotteryGroupType:null,
    }
  },
  created(){
  	 //this.fetchData();
  },
  components:{

  },
  methods:{//无缓存
	tabsSwitch(e,index){
		
		let me= this;
		me.onindex=index
		let type=e.Value
		this.base.getData(this,this.host+'/api/LotteryGameOpenByGroupType',{'SystemCode':'DQExport',
				'LotteryGroupType':type,},function(data){						

			me.LotterGroupType = data.ActionCode.LotterGroupType     //导航
			me.list[index]=data.ActionCode.LstSaiLaiLotteryGameOpen
				
		})
	},
	
	fetchData(){
		let me= this;
		this.base.getData(this,this.host+'/api/LotteryGameOpenByGroupType',{'SystemCode':'DQExport',
				'LotteryGroupType':me.LotteryGroupType,},function(data){	
					
			me.LotterGroupType = data.ActionCode.LotterGroupType     //导航
			me.list[me.onindex]=data.ActionCode.LstSaiLaiLotteryGameOpen
								
		})
	}	
  },
  computed:{//缓存

  },
  watch:{//数据监听

  },
  activated:function(){
	
  },

}
</script>

<style lang="less" scoped="scoped">
.scoreWrap{
	.scoreBox{
		margin-top:.94rem;
		.tabs{
			width:100%;
			background: #fff;
			font-size:0;	
			position: fixed;	
			top:.44rem;
			left:0;
			z-index: 999;
			display: flex;
			justify-content: space-around;
			li{
				display: inline-block;
				vertical-align: middle;
				width:25%;
				text-align: center;
				font-size:.15rem;
				color:#666;
				span{
					width:50%;
					display: inline-block;
					height:.385rem;
					line-height:.4rem;
					display: inline-block;									
					text-align: center;
					white-space: nowrap;
				}
				.active{
					color:#ef1823;
					border-bottom:.015rem solid  #ef1823;
				}
			}			
		}
		.scoreCont{
			position: fixed;
			top: .84rem;
			left: 0;
			width: 100%;
			height: 100%;
			padding-bottom: .89rem;
			overflow-y: scroll;
			.swiper-lottery{
				width:94%;
				height:auto;
				margin:.1rem auto .6rem;
				.tab-swiper{
					a{	
						display: block;
						width:100%;
						-webkit-border-radius: .1rem;
						-moz-border-radius: .1rem;
						border-radius: .1rem;
						background: #fff;
						margin:0 auto .1rem;
						position: relative;
						div{
							display: inline-block;
							vertical-align: middle;
						}
						.scoreImg{
							width:.45rem;
							height:.45rem;
							margin:auto .15rem;
							img{
								width:100%;
								height:100%;
							}
						}
						.scoreInfo{
							margin:.15rem 0;
							.score-name-date{
								margin-bottom:.13rem;
								.scoreName{
									font-size:.15rem;
									line-height:1;
									color:#212120;
									margin-right:.08rem;
								}
								.scoreIssue{
									font-size:.12rem;
									color:#989796;
								}
							}
							.scoreResult{	
								overflow:hidden;	
								font-size: 0;
								-webkit-text-size-adjust:none;				
								li{
									width:.3rem;
									height:.33rem;
									text-align: center;
									padding-top:.06rem;
									color:#fff;
									font-size:.15rem;
									margin-right:.02rem;
									display: inline-block;
									vertical-align: middle;
									background: url("~@/assets/img/numberPlate-red.png") no-repeat center 0;
									background-size:100% 100%;
								}
								.blueBall li{	
									margin-top:.04rem;											
									background: url("~@/assets/img/numberPlate-blue.png") no-repeat center 0;
									background-size:100% 100%;
								}
							}
						}
						.scoreArrow{
							position: absolute;
							right:.15rem;
							top:50%;
							width:.07rem;
							height:.11rem;
							margin-top:-.055rem;
							i{
								font-size:.11rem;
								color:#666;						
							}
						}				
					}
					.sport-box{
						width:100%;
						margin-top:.65rem;
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
							margin-top:.04rem;
							text-align: center;
							font-weight: bold;
						}
					}
				}
			}
		}
		.scoreCont::-webkit-scrollbar {
			display: none;
		}
		
	}
}
</style>
