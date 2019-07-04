<template>
	<div class="daohao-wrap">	
		<ul class="tabBox">
			<li :class="{active:item.IsDefault==1}" v-for="(item,index) in LstIdxExportSubMenu" :key="index" @click="tabsSwitch(item,index)">
				<span>{{item.SubMenuShow}}</span>
			</li>
		</ul>
		<div class="preContent">
			
			<!--专家-->
			<div class="expert">     
				<div class="expert-title">
					<i></i>
					<b>{{IdxExportRecommendData.GroupMainShow}}</b>
					<span>{{IdxExportRecommendData.GroupSubShow}}</span>
					<router-link to="" class="moreExpert">更多专家<span class="iconfont icon-enter">&#xe606;</span></router-link>				
				</div>
				<div class="expertCont">
					<router-link to="" v-for="(item,index) in LstRecommendedExport" :key="index">
						<img :src="item.PfPicInfo">
						<div class="expertInfo">
							<h3>{{item.PfName}}</h3>
							<p>{{item.PfPublishShow}}</p>
						</div>
					</router-link>
				</div>
			</div>
			<!--榜单-->
			<div class="transcript" v-model="index" v-for="(item,index) in rankList[index]" :key="index">  
				<div class="rectangel-1"></div>
				<div class="rectangel-2">{{item.ExportRankingShow}}</div>
				<router-link to="" class="fullList">完整榜单</router-link>
				<ul class="topThree">
					<li v-for="(ite,idx) in item.LstRankingExport" :key="idx">
						<p class="topThree-photo"><img :src="ite.img"></p>
						<p class="topThree-name">{{ite.name}}</p>
						<p class="topThree-performance">{{ite.txt}}</p>
					</li>	 
				</ul>
			</div>
			<!--文档列表-->
			<ul class="newsList">     
				<li class="newInfo" v-for="(item,index) in exportList[index]" :key="index">
					<div class="info-l">
						<img :src="item.documentImg" class="documentImg">
						<img :src="item.payImg" class="payImg">
					</div>
					<div class="info-r">
						<h2 class="newsTitle">{{item.PfDocumentName}}</h2>
						<ul class="infoCont-top">
							<li class="author">
								<img :src="item.authorPhoto">
								<span>{{item.PfName}}</span>
							</li>
							<li class="dateTime">
								<i class="icon-time"></i>
								<span>{{item.PublishDateTime}}</span>
							</li>
						</ul>
						<ul class="infoCont-down">
							<li class="attention">								
								<i class="icon-read"></i>
								<span>{{item.ViewCount}}</span>
							</li>
							<li class="collect">
								<i class="icon-collection"></i>
								<span>{{item.AddFacorite}}</span>
							</li>
						</ul>
					</div>
				</li>
			</ul>
	
		</div>
		
		
		<div class="preContent">专家预测-运彩</div>
		<div class="preContent">专家预测-数字</div>
		<div class="preContent">专家预测-其他</div>
		
		
	</div>
</template>

<script>
export default {
	name: 'prediction',

	data() { //页面数据
		return {		
			index:0,
			LstIdxExportSubMenu:[],         //导航
			
			IdxExportRecommendData:'',      //专家推荐
			LstRecommendedExport:[],        //专家列表			
//			LstExportRanking:[],         //当红小生榜、胜率榜、发表排行榜、订单榜、跟随榜
			LstRankingExport:[],        //榜单  前三
//			LstIdxExportData:[],       //文章列表
			
			
			recommendList:[],        //专家推荐 
			rankList:[],            //榜单排行
			exportList:[],         //文档列表  
			onindex:0,
			ExportGameType:'',   //彩票类型
			
		}
	},
	created() { //初始化
		this.fetchData();
	},
	mounted: function() {
	
	},
	methods: { //无缓存
		tabsSwitch(e,index){	
			let me= this;
			me.onindex=index
			let type=e.SubMenuValue
			this.base.getData(this,this.host+'/api/GetExportPageDetailForIdxExport',{"SystemCode":"DQExport",
				'ExportGameType':type,'Paging':1,},function(data){
					
//				console.log(data)
	
				me.LstIdxExportSubMenu = data.ActionCode.LstIdxExportSubMenu     //导航
				
				me.recommendList[index] = data.ActionCode.IdxExportRecommendData    //专家推荐				
				me.rankList[index] = data.ActionCode.LstExportRanking    //榜单
				me.exportList[index] = data.ActionCode.LstIdxExportData    //文档列表
			
			})
	
		},
		fetchData(){
			let me= this;
			this.base.getData(this,this.host+'/api/GetExportPageDetailForIdxExport',{"SystemCode":"DQExport",
				'ExportGameType':me.ExportGameType,'Paging':1,},function(data){
					
//				console.log(data)

				me.LstIdxExportSubMenu = data.ActionCode.LstIdxExportSubMenu    //导航
				me.IdxExportRecommendData = data.ActionCode.IdxExportRecommendData    //专家推荐

				me.recommendList[me.onindex] = data.ActionCode.IdxExportRecommendData    //专家推荐
				
				me.LstRecommendedExport = me.recommendList[me.onindex].LstRecommendedExport   //专家列表 
				
				me.rankList[me.onindex] = data.ActionCode.LstExportRanking    //榜单
				
				me.LstRankingExport = me.rankList[me.onindex].LstRankingExport    //榜单排行
				
				me.exportList[me.onindex] = data.ActionCode.LstIdxExportData    //文档列表
				
				
				
//				me.IdxExportRecommendData = data.ActionCode.IdxExportRecommendData;    //专家    最新推荐
//
//				me.LstRecommendedExport = me.IdxExportRecommendData.LstRecommendedExport;  //专家列表 
//				
//				me.LstExportRanking = data.ActionCode.LstExportRanking;     //当红小生榜、胜率榜、发表排行榜、订单榜、跟随榜
//
//				me.LstRankingExport = me.LstExportRanking.LstRankingExport;    //榜单
//				
//				me.LstIdxExportData = data.ActionCode.LstIdxExportData;	   //文章列表	
				
			})
		}
	},
	computed: { //缓存，

	},
	watch: { //数据监听

	},
	components: { //模板

	},
	activated:function(){
		
	},

}
</script>

<style lang="less"  scoped>
.daohao-wrap{
	.tabBox{
		margin-top:.04rem;
		font-size:0;
		background:#fff;
		display:flex;
		li{
			display: inline-block;
			vertical-align: middle;
			width:33.33%;			
			height:.45rem;
			line-height: .35rem;
			font-size:.13rem;
			text-align: center;	
			padding:.05rem 0;
			span{
				width:100%;
				height:100%;					
				display: inline-block;
				border-right:1px solid #ececec;
			}				
		}
		li.active{
			background: #e22f29;
			color:#fff;	
			span{
				border-color: #e22f29 !important;
			}	
		}
		li:last-child span{
			border-right:none;
		}
	}

	.preContent{
		width:94%;
		margin: 0 auto;
		.expert{
			width:100%;
			margin-top:.1rem;
			background: #fff;
			-webkit-border-radius: .05rem;
			-moz-border-radius: .05rem;
			border-radius: .05rem;
			padding:.15rem .1rem .27rem;
			.expert-title{
				overflow: hidden;
				line-height:.15rem;
				i{
					width:.04rem;
					height:.15rem;
					background:#ef1823;
					display: inline-block;
					vertical-align: middle;
				}	
				b{
					font-size:.14rem;
					color:#000;
					font-weight: normal;
					margin:.08rem 0 .06rem;
				}
				span{
					font-size:.12rem;
					color:#c9c9c9;						
				}	
				.moreExpert{
					float: right;
					font-size:.12rem;
					color:#4fabf0;
					.icon-enter{
						color:#4fabf0;
						font-size:.11rem;
					}
				}				
			}
			.expertCont{
				margin-top:.26rem;
				overflow: hidden;
				a{
					width:50%;
					float: left;
					font-size: 0;
					-webkit-text-size-adjust:none;
					position: relative;
					padding-left:.53rem;
					img{
						width:.35rem;
						height: .35rem;
						-webkit-border-radius: 50%;
						-moz-border-radius: 50%;
						border-radius: 50%;
						position: absolute;
						top:0;
						left:.12rem;
					}
					.expertInfo{
						h3,p{
							line-height:.19rem;
							font-size:.13rem;
							color:#000;
							font-weight: normal;
							overflow: hidden;
							text-overflow:ellipsis;
							white-space: nowrap;
						}
						p{
							line-height:.16rem;
							font-size:.1rem;
							color:#a7a7a7;
						}
					}
				}
				a:nth-child(1){
					border-right:1px solid #ddd;
				}
			}
		}
				
		.transcript{
			width:100%;
			background: #fff;
			-webkit-border-radius: .05rem;
			-moz-border-radius: .05rem;
			-webkit-border-radius: .05rem;
			-moz-border-radius: .05rem;
			border-radius: .05rem;
			margin-top:.1rem;
			padding:.1rem 0 .12rem;
			-webkit-box-shadow: -5px 0 5px #efd8d3,0 -5px 5px #efd8d3,5px 0 5px #efd8d3,0 5px 5px #efd8d3;
			-moz-box-shadow: -5px 0 5px #efd8d3,0 -5px 5px #efd8d3,5px 0 5px #efd8d3,0 5px 5px #efd8d3;
			box-shadow: - 5px 0 5px #efd8d3,0 -5px 5px #efd8d3,5px 0 5px #efd8d3,0 5px 5px #efd8d3;
			position: relative;
			.rectangel-1,.rectangel-2{
				width:.07rem;
				height:.23rem;
				position:absolute;
				top:.09rem;
				left:-.07rem;
				background: url("~@/assets/img/rectangel-1.png") no-repeat center 0;
				background-size: 100% 100%;
			}
			.rectangel-2{
				width:.8rem;
				height:.2rem;
				line-height:.2rem;
				background: url("~@/assets/img/rectangel-2.png") no-repeat center 0;
				background-size: 100% 100%;
				text-indent: .13rem;
				color:#fff;
				font-size:.1rem;				
			}
			.fullList{
				display: block;
				text-align: right;
				margin-right:.15rem;
				font-size:.12rem;
			}
			.topThree{
				display: flex;
				justify-content: space-around;
				li{
					width:33.333%;
					.topThree-photo{
						width:100%;
						height:.76rem;
						overflow:hidden;
						img{
							width:.43rem;
							height:.43rem;
							-webkit-border-radius: 50%;
							-moz-border-radius: 50%;
							border-radius: 50%;
							display:block;
							margin:.32rem auto 0;
						}	
					}
					.topThree-name{
						text-align: center;
						line-height:1;
						margin-top:.1rem;
						font-size:.12rem;
					}
					.topThree-performance{
						text-align: center;
						line-height:.24rem;
						font-size:.14rem;
						color:#ef1823;
					}
				}
				li:nth-child(1) .topThree-photo{
					background:url("~@/assets/img/theSecond.png") no-repeat center bottom;
					background-size: .45rem .58rem;												
				}
				li:nth-child(2) .topThree-photo{
					background:url("~@/assets/img/theFirst.png") no-repeat center bottom;	
					background-size: .6rem .76rem;				
					img{
						width:.58rem;
						height:.58rem;
						margin:.17rem auto 0;
					}					
				}
				li:nth-child(3) .topThree-photo{
					background:url("~@/assets/img/theThird.png") no-repeat center bottom;	
					background-size: .45rem .58rem;							
				}							
			}
		}
		
		.newsList{
			width:100%;
			margin-top:.14rem;
			.newInfo{
				overflow: hidden;
				-webkit-border-radius: .05rem;
				-moz-border-radius: .05rem;
				border-radius: .05rem;
				margin-bottom:.1rem;
				background: #fff;
				position:relative;
				padding-left:1.16rem;
				height:.9rem;
				.info-l{
					width:1rem;
					height:.9rem;
					overflow: hidden;
					position: absolute;
					top:0;
					left:0;
					.documentImg{
						height:100%;							
					}
					.payImg{
						width:.3rem;
						height:.3rem;
						position: absolute;
						bottom:0;
						right:0;
					}
				}
				.info-r{
					.newsTitle{
						width:1.8rem;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
						font-size:.15rem;
						line-height:.4rem;
						margin-bottom:.04rem; 
					}
					.infoCont-top{
						font-size: 0;
						-webkit-text-size-adjust:none;
						white-space: nowrap;
						.author{
							width:.94rem;
							font-size: 0;
							-webkit-text-size-adjust:none;
							display: inline-block;
							vertical-align: middle;
							img{
								width:.17rem;
								height:.17rem;
								-webkit-border-radius: 50%;
								-moz-border-radius: 50%;
								border-radius: 50%;
								margin-right:.05rem;
								display: inline-block;
								vertical-align: middle;
							}
							span{
								width:.6rem;
								font-size:.12rem;
								color:#666;
								line-height:.175rem;
								overflow: hidden;
								text-overflow:ellipsis;
								white-space: nowrap;
								display: inline-block;
								vertical-align: middle;
							}
						}
						.dateTime{
							color:#ccc;
							display: inline-block;
							vertical-align: middle;
							.icon-time{
								display: inline-block;
								vertical-align: middle;
								width:.1rem;
								height:.1rem;								
								margin-right:.04rem;
								background: url("~@/assets/img/icon-time.png") no-repeat center 0;
								background-size:100% 100%; 
							}
							span{
								font-size:.09rem;
								vertical-align: middle;
							}							
						}
					}
					.infoCont-down{
						height:.28rem;
							line-height: .28rem;
						font-size: 0;
						-webkit-text-size-adjust:none;
						.attention,.collect{							
							display: inline-block;
							vertical-align: middle;
							color:#ccc;
							.icon-read,.icon-collection{
								display: inline-block;
								vertical-align: middle;
								width:.1rem;
								height:.1rem;
								margin-right:.05rem;
							}
							.icon-read{
								background: url("~@/assets/img/icon-read.png") no-repeat center 0;
								background-size:100% 100%;
							}
							.icon-collection{
								background: url("~@/assets/img/icon-collection.png") no-repeat center 0;
								background-size:100% 100%;
							}
							span{
								font-size:.09rem;
								vertical-align: middle;
							}
						}
						.attention{
							width:.94rem;
						}
					}
				}
			}				
		}
	}
}
</style>
