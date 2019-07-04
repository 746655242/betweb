<template>
    <div class="mineWrap">
		<header class="myExpertsHeader">
			<span onclick="history.go(-1)" class="iconfont icon-fanhui">&#xe614;</span>
			<span>文章发表</span>
			<span class="complete headerRight">完成</span>
		</header>
		
		<div class="articleBox">	
			
			<div class="addCoverBox">
				<div class="addCover">
					<span>十</span><span>添加封面</span>
					<input type="file"/>
				</div>
				
				<div class="articleCover">
					<img src="~@/assets/img/digitalTalentImg.jpg"/>
					<div class="coverMask"></div>
					<i class="delCover"></i>
					<div class="replaceCover">
						<span>更换封面</span>
						<input type="file" />
					</div>
				</div>
			</div>
			
			<p class="theArticleTitle">
				<input type="text" value="标题"/>
			</p>
			
			<div class="articleCont">
				<p class="textPart">
					<span>正文</span>
					<span class="file">					
						<i class="iconfont icon-pic">&#xe603;</i>
						<input type="file"/>
					</span>
				</p>
				
				<textarea></textarea>
				
				<div class="pay-free">
					<div class="pay">
						<div class="payMoney">
							<span class="radio active"></span>
							<span>付费</span>
						</div>
						<div class="money">
							<i>10</i>
							<label for="">元</label>
						</div>
						
					</div>
					<div class="free">
						<span class="radio"></span>
						<span>免费</span>
					</div>	
				</div>
				
			</div>
			
		</div>

    </div>
</template>

<script>
import { Actionsheet  } from 'vux'
export default {
	name:'publishArticle',
    data(){
        return {
			infoShow:false,
        }
    },
    mounted(){

    },
    methods: {
    	
    },
    computed: {},
    watch: {},
    props: {},
    components: {
		Actionsheet
    },
    activated:function(){

	},
}
</script>

<style lang="less">
.mineWrap{
	.myExpertsHeader{
		.complete{
			font-size:.15rem;
		}
	}
	.articleBox{
		width:100%;
		height:100%;
		position: fixed;
		top: .44rem;
		left:0;
		background:#fff;
		padding-bottom:.45rem;
		overflow: auto;
		.addCoverBox{
			width:100%;
			.addCover{
				width: 92%;
				height:.79rem;
				line-height:.79rem;
				text-align: center;
				border:1px dashed #ddd;
				font-size:.16rem;
				color:#ddd;
				position:relative;
				margin:.1rem auto 0;
				/*display:none;*/
				span{
					padding: 0 .04rem;
				}
				input{
					width:100%;
					height: 100%;
					position: absolute;
					top:0;
					left:0;
					opacity: 0;
				}
			}
			.articleCover{
				width:100%;
				height: 1.8rem;
				position: relative;
				display: none;
				img{
					width:100%;
					height:100%
				}
				.coverMask{
					width:100%;
					height: 100%;
					background: rgba(0,0,0,.3);
					position: absolute;
					top:0;
					left:0;
				}
				.delCover{
					position: absolute;
					top:.15rem;
					right: .15rem;
					width: .245rem;
					height: .245rem;
					background: url("~@/assets/img/delete.png") no-repeat center 0;
					background-size: 100% 100%;
				}
				.replaceCover{
					width: 1.15rem;
					height: .34rem;
					line-height: .34rem;
					-webkit-border-radius: .05rem;
					-moz-border-radius: .05rem;
					border-radius: .05rem;
					background: rgba(0,0,0,.4);
					position: absolute;
					top:50%;
					left:50%;
					margin-top:-.17rem;
					margin-left:-.575rem;
					text-align: center;
					color:#fff;
					font-size:.15rem;
					input{
						width:100%;
						height: 100%;
						position: absolute;
						top:0;
						left:0;
						opacity: 0;
					}
				}
			}
		}
		.theArticleTitle{
			width:92%;
			height: .445rem;
			line-height: .445rem;
			font-size:.16rem;
			color:#555;
			font-weight: 600;
			border-bottom: 1px solid #ddd;
			margin:0 auto;
		}
		.articleCont{
			width:92%;
			margin:0 auto;
			.textPart{
				height:.45rem;
				line-height: .45rem;
				font-size: .16rem;
				font-weight: 600;
				color:#555;
				overflow:hidden;
				span{
					vertical-align:middle;
				}
				.file{
					display: inline-block;
					width: .175rem;
					height: .15rem;
					line-height: .15rem;
					background: rgba(255,255,255,0);
					overflow: hidden;
					position: relative;
					i{
						position: absolute;
						top:0;
						left:0;
						font-size:.15rem;
					}
					input{
						width:100%;
						height:100%;
						opacity: 0;
					}
				}
			}
			textarea{
				width: 100%;
				height: 3.77rem;
				resize:none;
				border-color: #ddd;
				-webkit-border-radius: .05rem;
				-moz-border-radius: .05rem;
				border-radius: .05rem;
				padding:0 .08rem;
			}
			.pay-free{
				font-size:0;
				height: .45rem;
				line-height: .45rem;
				.pay,.free{
					width: 50%;
					display: inline-block;
					vertical-align:middle;
					span{
						font-size: .15rem;
						color:#666;
						vertical-align: middle;
					}
					.radio,.active{
						display: inline-block;
						vertical-align:middle;
						width: .14rem;
						height: .14rem;						
						background: url("~@/assets/img/radio-free.png") no-repeat center 0;
						background-size:100% 100%;
						margin-right: .075rem;
					}
					.active{
						background: url("~@/assets/img/radio-pay.png") no-repeat center 0;
						background-size:100% 100%;
					}	
					.payMoney{
						display:inline-block;										
					}
					.money{
						display: inline-block;
						vertical-align:top;
						margin-left:.25rem;
						i{
							display: inline-block;
							vertical-align: middle;
							width: .34rem;
							height: .18rem;
							line-height: .18rem;
							text-align: center;
							color:#666;
							font-size:.12rem;
							border: 1px solid #ddd;
							-webkit-border-radius: .05rem;
							-moz-border-radius: .05rem;
							border-radius: .05rem;
							background: #f0f0f0;
						}
						label{
							display: inline-block;
							vertical-align: middle;
							font-size: .14rem;
							margin-left:.04rem;
						}
					}					
				}			
			}
		}
	}
	.articleBox::-webkit-scrollbar {/*隐藏滚轮*/
		display: none;
	}
}
</style>