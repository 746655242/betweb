<template>
    <div class="mineWrap">
		<header class="expertsApplyHeader">
			<span onclick="history.go(-1)" class="iconfont icon-fanhui">&#xe614;</span>
			<span>我的申请</span>
			<router-link to="/experts/myApply" class="iconfont icon-tianjia headerRight">&#xe60c;</router-link>
		</header>
		
		
		<div class="expertsApplyCont">
			<div class="noApplyBox" v-if="!applylist">
				<div class="addApply">
					<p>添加申请</p>
				</div>
				<div class="noApplyImg">
					<img src="~@/assets/img/noAnnouncement.png">
				</div>
				<p class="noApply">暂无申请</p>
				<div class="shadow"></div>
			</div>
	
			<div class="applyList" v-else>
				
				<swipeout>
					<div class="applyBox"  v-for="(item,index) in applylist" :key="index">
					
					 <swipeout-item  transition-mode="follow">
						<div slot="right-menu">
							 <swipeout-button class="delBtn" @click.native="delApply(item,index)">删除</swipeout-button>
						</div>
						<div slot="content" class="demo-content vux-1px-t">
							<router-link class="expertsInfoBox" :to="'/experts/myApply/'+item.ApplyPfUserId"  >
								<div class="experts">
									<p class="expertsName"><b>{{item.ApplyPfUserName}}</b></p>
									<p :class="item.ApplyPfUserStatusId==8?'applyNotPass':'applyInTheReview'">{{item.ApplyPfUserStatusShow}}</p>
								</div>
								<div class="applyDate">{{item.LastUpdateDate}}</div>
								<div class="applyEditor"><span>点击编辑</span><i class="iconfont icon-enter">&#xe606;</i></div>
							</router-link>
						</div>
					</swipeout-item>


				</div>
				</swipeout>				
			</div>
		</div>
    </div>
</template>

<script>
import {  Swipeout, SwipeoutItem,SwipeoutButton } from 'vux'
export default {
	name:'expertsApply',
    data(){
        return {
			applylist:[],
        }
    },
	created(){
		this.fetchData();
	},
	components:{
		Swipeout, SwipeoutItem,SwipeoutButton	
	},
    methods: {

		/* 移动 */
		panleft(e,el){
			console.log(el)
		},

		//我的申请列表
    	fetchData(){     	
			let me= this;
			this.base.getData(this,this.host+'/api/MemberApplyPfUserLst',{},function(data){	
				me.applylist=data.ActionCode
				console.log(data)
			})
		},
		/* 删除申请 */
		delApply(item,index){     
			
			let me = this
			let params = {
				PfUserApplyId:item.ApplyPfUserId,
			}
			this.base.getData(this,this.host+'/api/RemoveApplyPfUser',params,function(data){
				me.applylist.splice(index,1)
				//me.applylist=data.ActionCode.LstApplyPfUserData
			})
    	}
    },
    activated:function(){
	}
}
</script>

<style lang="less" scoped="scoped">
.mineWrap{
	.expertsApplyHeader{
		.icon-tianjia{
			font-size:.2rem;
		}
	}
	.expertsApplyCont{		
		.noApplyBox{
			padding-top:2.46rem;
			.addApply{
				width:1.59rem;
				height:1.005rem;
				position:fixed;
				top: .35rem;
				right:.19rem;
				background:url("~@/assets/img/addApply.png") no-repeat center 0;
				background-size:100% 100%;
				z-index:999999;
				padding:.72rem 0 0 .24rem;
				p{
					font-size: .16rem;
					color:#fff;
				}
			}
			.noApplyImg{
				width:1.82rem;
				height:1rem;
				margin:0 auto .19rem;			
				img{
					width:100%;
					height:100%;			
				}
			}
			.noApply{
				font-size:.16rem;
				color:#ccc;
				text-align: center;
				line-height:1;
			}
			.shadow{
				width:100%;
				height:100%;
				position: absolute;
				top:0;
				left:0;
				background: rgba(0,0,0,.5);
			}
		}
		.applyList{
			width:100%;
			height: 100%;
			background: #f0f0f0;
			position: absolute;
			top:.44rem;
			left:0;
			padding: .1rem 0 .44rem;
			overflow-y: auto;
			.applyBox{
				width:92%;
				height:.62rem;
				margin:0 auto .1rem;
				-webkit-border-radius: .05rem;
				-moz-border-radius: .05rem;
				border-radius: .05rem;
				position: relative;
				overflow: hidden;
				.expertsInfoBox{
					display: flex;
					justify-content: space-between;
					width:100%;
					height:100%;				
					padding:0 .125rem 0 .17rem; 
					z-index: 1;
					position: relative;
					background: #fff;
					.experts{
						.expertsName{
							margin:.135rem 0  .065rem 0;
							line-height: 1;
							color:#666;
							b{
								font-size:.16rem;
							}
							span{
								margin-left:.05rem;
								font-size:.13rem;
							}
						}
						.applyInTheReview,.applyNotPass{
							font-size:.13rem;
							color:#999;
							line-height: 1;
						}
						.applyNotPass{
							color:@red;
						}
						.applyStatus{
							font-size:.13rem;
							color:#ef1823;
							line-height: 1;
						}		
					}
					.applyDate{
						font-size:.13rem;
						color:#666;
						line-height: 1;
						margin-top:.185rem;
					}
					.applyEditor{
						font-size:.12rem;
						color:#999;
						line-height: .62rem;
						.icon-enter{
							font-size:.1rem;
						}
					}
				}
				.delBtn{
					width:.65rem;
					height:.62rem;
					
					background: @red;
					color: #fff;
					font-size: .16rem;
					text-align: center;
					position: absolute;
					top: 0;
					right: 0;
				
					z-index: 0;
					-webkit-border-radius: .05rem;
					-moz-border-radius: .05rem;
					border-radius: .05rem;
				}
			}			
		}
		.applyList::-webkit-scrollbar {/*隐藏滚轮*/
			display: none;
		}
	}
}
</style>