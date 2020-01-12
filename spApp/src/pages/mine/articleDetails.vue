<template>
    <div class="mineWrap">
		<header class="myApplyHeader">
			<span onclick="history.go(-1)" class="iconfont icon-fanhui">&#xe614;</span>
			<span>文章详情</span>
		</header>
		<div class="articleInfo">
			<div class="articleTitle">
				<h2>双色球201715期前区真的是一个“定胆”小窍门禁 止转载</h2>
				<p class="articleDateTime">
					<span class="articleDate">2017-12-21</span><span class="articleTime">18:21</span>
				</p>
			</div>
			<div class="articleAuthor">
				<div class="authorPhoto">
					<img src="~@/assets/img/experts1.png" alt="" />
				</div>
				<div class="author">
					<h3>小马哥</h3>
					<span>擅长双色球,盘口分析</span>
				</div>
				<button class="attentionBtn">关注</button>
			</div>
			<div class="articleCont">
				<p class="articleParagraph">
					在备选号码中选择少于单式订单号码个数的号码作为每注都有的号码，称胆码，再选取除胆码以外的号码作为拖码，由胆码和拖码组合进行订单
					在备选号码中选择少于单式订单号码个数的号码作为每注都有的号码，称胆码，再选取除胆码以外的号码作为拖码，由胆码和拖码组合进行订单
					在备选号码中选择少于单式订单号码个数的号码作为每注都有的号码，称胆码，再选取除胆码以外的号码作为拖码，由胆码和拖码组合进行订单
				</p>
				<div class="articlePic">
					<img src="~@/assets/img/lotteryCharts.jpg" alt="" />
				</div>
				<p class="articleParagraph">
					在备选号码中选择少于单式订单号码个数的号码作为每注都有的号码，称胆码，再选取除胆码以外的号码作为拖码，由胆码和拖码组合进行订单
					在备选号码中选择少于单式订单号码个数的号码作为每注都有的号码，称胆码，再选取除胆码以外的号码作为拖码，由胆码和拖码组合进行订单
					在备选号码中选择少于单式订单号码个数的号码作为每注都有的号码，称胆码，再选取除胆码以外的号码作为拖码，由胆码和拖码组合进行订单
					在备选号码中选择少于单式订单号码个数的号码作为每注都有的号码，称胆码，再选取除胆码以外的号码作为拖码，由胆码和拖码组合进行订单
				</p>
			</div>
		</div>
    </div>
</template>

<script>

export default {
	name:'articleDetails',
    data(){
        return {
        	
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
			this.axios.post(this.host+'/api/MemberApplyPfUserInitial',me.base.parameters({
					MemberToken:localStorage.token,
					OperateIp:this.$store.state.user.ip
				}))
			.then((res) => {
				let req = JSON.parse(res.data.ViewModel)
				let ActionCode = req.ActionCode
				/*彩票类型*/
				let LstSelectOptForGameType = ActionCode.LstSelectOptForGameType
				
				LstSelectOptForGameType.forEach(function(item,i){
					me.typelist[i].typeName = LstSelectOptForGameType[i].ApplyOptionShow	
					me.typelist[i].specialty = LstSelectOptForGameType[i].LstSelectOptForExpertise
					me.typelist[i].specialty.forEach(function(ite,j){
						me.typelist[i].specialty[j].text = LstSelectOptForGameType[i].LstSelectOptForExpertise[j].ApplyOptionShow
					})					
				})
				
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

<style lang="less" scoped>
.mineWrap{
	.articleInfo{
		width: 100%;
		height: 100%;
		position: absolute;
		top: .44rem;
		left: 0;
		overflow-y: auto;
		padding-bottom: .4rem;
		.articleTitle,.articleAuthor,.articleCont{
			background:#fff;
			margin-bottom: .025rem;
		}
		.articleTitle{
			padding:.18rem .15rem .115rem;
			h2{
				line-height: .29rem;
				font-size: .16rem;
				color:#333;
			}
			.articleDateTime{
				line-height: .19rem;
				font-size: .14rem;
				color:#999;
				.articleDate{
					margin-right: .09rem;
				}
			}
		}
		.articleAuthor{
			padding:.1rem .15rem;
			overflow: hidden;
			.authorPhoto{
				width: .4rem;
				height: .4rem;
				-webkit-border-radius: 50%;
				-moz-border-radius: 50%;
				border-radius: 50%;
				overflow: hidden;
				float:left;
				margin-right:.105rem;
				img{
					width: 100%;
					height: 100%;
				}
			}
			.author{
				float:left;
				margin:.03rem 0 .04rem;
				h3{
					font-size: .14rem;
					color: #171717;
					line-height: .18rem;
				}
				span{
					font-size: .11rem;
					color: #999;
					line-height: .15rem;
				}
			}
			.attentionBtn{
				float:right;
				width: .64rem;
				height: .29rem;
				line-height: .29rem;
				text-align: center;
				border:1px solid @red;
				-webkit-border-radius: .05rem;
				-moz-border-radius: .05rem;
				border-radius: .05rem;
				font-size: .11rem;
				color:@red;
				background: #fff;
				margin-top:.05rem;
			}
		}
		.articleCont{
			padding: .1rem .15rem;
			.articleParagraph{
				font-size: .15rem;
				color:#555;
				line-height: .26rem;
				text-indent: .3rem;
			}
			.articlePic{
				width: 100%;
				height: 2.345rem;
				margin: .09rem 0 .075rem;
				img{
					width: 100%;
					height: 100%;
				}
			}
			
		}
	}
	.articleInfo::-webkit-scrollbar{
		display: none;
	}
}
</style>