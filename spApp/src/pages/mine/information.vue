<template>
    <div class="mineWrap">
		<header class="informationHeader">
			<span onclick="history.go(-1)" class="iconfont icon-fanhui">&#xe614;</span>
			<span>咨讯</span>
		</header>
		<div class="informationCont">
			<div class="infoCont">
				<p class="infoContTitle">大乐透201715期前区金胆20</p>
				<p class="thisIssueDetails">134期开奖号07 18 19 32 34+02 10，前区：和值110，奇偶比：2:3</p>
				<div class="theNextIssue">
					<p class="predict">135期预测：</p>
					<ul class="numberSections">
						<li>
							<p class="sections">一区：(01-07)：</p>
							<p class="predictCont">上期该区号码开出07，该区近期出号势头转热，本期该区注意奇数出号，关注遗漏03期的02和遗漏05期的03。</p>
						</li>
						<li>
							<p class="sections">二区：(08-14)：</p>
							<p class="predictCont">上期该区号码开出无，近期该区走冷。本期该区回补出号，重点看出偶数开出，关注遗漏03期的11和遗漏13期的12。</p>
						</li>
						<li>
							<p class="sections">三区：(15-21)：</p>
							<p class="predictCont">上期该区号码开出18 19，近期该区转热。本期该区注意回补走势，关注遗漏04期的15和遗漏12期的20</p>
						</li>
					</ul>
				</div>
			</div>
			<div class="relatedToRecommend">
				<p class="recommendedHeader">
					<span class="recommendedTitle">相关推荐</span>
					<span class="recommendedMore">查看更多<i class="iconfont icon-enter">&#xe606;</i></span>
				</p>
				<ul class="recommendedCont">
					<li>大乐透201715期前区金胆20</li>
					<li>大乐透201715期前区金胆20</li>
					<li>大乐透201715期前区金胆20</li>
				</ul>
			</div>
			<div class="newComments">
				<p class="commentsHeader">
					<span class="newCommentsTitle">最新评论</span>
					<span class="sorting"><i class="iconfont icon-paixu">&#xe643;</i>按顺序</span>
				</p>
				<ul class="commentsDetails">
					<li v-for="(item,index) in cpmmentslist" :key="index">
						<div class="reviewersPhoto">
							<img :src="item.reviewersPhoto"/>
						</div>
						<div class="reviewersInfo">
							<p class="reviewersName">{{item.reviewersName}}</p>
							<p class="reviewersTime">{{item.reviewersTime}}</p>
							<p class="commentsCont">{{item.commentsCont}}</p>
						</div>						
					</li>
				</ul>
				<p class="loadMore">
					<span>点击加载更多</span>
					<i class="iconfont icon-fanhui-copy">&#xe600;</i>
				</p>
			</div>
			<div class="publishedComment">
				<input type="text" placeholder="写评论......" class="writeComment"/>
				<input type="submit" value="发送" class="sendComment"/>
			</div>
		</div>

    </div>
</template>

<script>
const cpmmentsList = [
	{
		reviewersPhoto:'~@/assets/img/theFirstPhoto.png',
		reviewersName:'评论者1',
		reviewersTime:'12:00',
		commentsCont:'研究这个，研究那个，终于中了'
	},
	{
		reviewersPhoto:'~@/assets/img/theFirstPhoto.png',
		reviewersName:'评论者2',
		reviewersTime:'12:00',
		commentsCont:'研究这个，研究那个，终于中了'
	},
]
export default {
	name:'information',
    data(){
        return {
			cpmmentslist:cpmmentsList,
        }
    },
    created(){
    	//		this.fetchData();
    },
    mounted(){

    },
    methods: {
    	fetchData(){
    		let me= this;
			this.axios.post(this.host+'/api/GetExportMyAccount',me.base.parameters({
					MemberToken:localStorage.token,
					OperateIp:this.$store.state.user.ip
			}))
			.then((res) => {
				let req = JSON.parse(res.data.ViewModel)
				let ActionCode = req.ActionCode
//					console.log(ActionCode)
															
			})
			.catch((err) => {
				console.log(err)
			});
			
			
		},
	
    },
    computed: {},
    watch: {},
    props: {},
    components: {

    },
    activated:function(){

	},
}
</script>

<style lang="less">
.mineWrap{
	.informationHeader{		
		.icon-fanhui{
			font-size:.2rem;
		}	
	}
	.informationCont{
		/*咨讯详情*/
		position: absolute;
	    top: .44rem;
	    left: 0;
	    width: 100%;
	    height: 100%;
	    overflow-y: scroll;
	    padding-bottom: 0.9rem;
		.infoCont{
			font-size:.15rem;
			color:#666;
			padding:0 .15rem .315rem;
			.infoContTitle{
				line-height: 1;
				font-size:.16rem;
				color:#555;
				font-weight: 600;
				margin:.25rem 0 .19rem;
			}
			.thisIssueDetails{
				line-height: .26rem;
				margin-bottom: .095rem;
			}
			.theNextIssue{
				.predict{
					line-height: .34rem;
				}
				.numberSections{
					li{
						margin-bottom:.095rem;
						.sections{
							line-height: .35rem;
						}
						.predictCont{
							line-height: .26rem;
						}
					}
				}
			}
		}
		/*更多推荐    最新评论*/
		.relatedToRecommend,.newComments{
			background: #fff;
			margin-bottom: .105rem;
			.recommendedHeader,.commentsHeader{
				height: .395rem;
				line-height: .395rem;
				border-bottom: 1px solid #ddd;
				padding: 0 .15rem;
				display: flex;
				justify-content: space-between;
				.recommendedTitle,.newCommentsTitle{
					display: inline-block;					
					width: .71rem;
					height:.14rem;
					line-height: .14rem;
					font-size: .15rem;
					color:#666;
					text-align: center;
					border-left:.02rem solid @red;
					margin-top:.13rem;
				}
				.recommendedMore{
					font-size: .13rem;
					color:#999;
					.icon-enter{
						font-size:.1rem;
						margin-left:.08rem;
					}
				}
				.sorting{
					font-size: .15rem;
					color:#bbb;
					.icon-paixu{
						margin-right:.05rem;
					}
				}
			}
			.recommendedCont{
				padding:0 .15rem;
				li{
					height: .395rem;
					line-height: .395rem;
					border-bottom:1px solid #ddd;
					font-size: .14rem;
					color:#666;
					text-indent: .07rem;
				}
				li:nth-last-child(1){
					border-bottom: none;
				}
			}
		}
		.newComments{
			margin-bottom:0;
			.commentsDetails{
				li{
					padding:.15rem 0 .1rem .57rem;
					border-bottom: 1px solid #ddd;
					position: relative;
					.reviewersPhoto{
						position: absolute;
						top:.15rem;
						left:.15rem;
						width:.32rem;
						height:.32rem;
						-webkit-border-radius: 50%;
						-moz-border-radius: 50%;
						border-radius: 50%;
						overflow:hidden;					
						img{
							width: 100%;
							height: 100%;
						}
					}
					.reviewersInfo{					
						.reviewersName{
							font-size: .14rem;
							color:#555;
							line-height: 1;
							font-weight: bold;
						}
						.reviewersTime{
							font-size: .12rem;
							color:#999;
							margin:.075rem 0 .175rem;
						}
						.commentsCont{
							font-size: .14rem;
							color:#c8c8c8;
							line-height: .17rem;
						}
					}				
				}
			}
			.loadMore{
				padding:.135rem 0 .375rem 0;
				text-align: center;
				font-size:.13rem;
				color:#999;
				.icon-fanhui-copy{
					vertical-align:text-top;
				}
			}
		}
		
		.publishedComment{
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			padding: .05rem .15rem;
			background: #fff;
			border-top: 1px solid #ddd;
			font-size:0;
			input{
				height: .35rem;
				line-height: .35rem;
				-webkit-border-radius: .05rem;
				-moz-border-radius: .05rem;
				border-radius: .05rem;
				vertical-align: middle;
				font-size: .15rem;
			}
			.writeComment{
				width: 79%;				
				text-indent: .11rem;
				background: #ddd;			
			}
			.sendComment{
				width: 15%;
				background: @red;
				text-align: center;
				color: #fff;
				margin-left: .15rem;
			}
		}		
	}
	.informationCont::-webkit-scrollbar{
		display: none;
	}
}
</style>