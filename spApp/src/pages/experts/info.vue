<template>
    <div class="mineWrap"  v-title data-title="专家详情">
		<div class="expersBanner"  v-if='heuser' >
			<div class="expertBannerBg">
				<img src="~@/assets/img/expertsBannerBg.jpg" alt="" />
			</div>		
			<div onclick="history.go(-1)" class="return">
				<span class="iconfont icon-fanhui">&#xe614;</span>
			</div>
			<div class="expertInfo" >
					
				<picUp  
				:df="{url:'/api/GetSaiLaiPfUserDefPicLst',data:{},get:'LstSaiLaiPfUserPic'}"  
				:dfup="{ url:'/api/UploadMyPfUserPic',data:{PfUserCode:PfUserCode},get:''}"
				:Gpicid="{url:'/api/UploadMyPfUserPic',data:{PfUserCode:PfUserCode},get:'PfUserPicId'}"  
				@callback="picUpcallback" >	
					<div class="expertPhoto"><img :src="heuser.PfUserPic.UrlLink" alt="" /></div>
				</picUp>

				<p class="expertName" @click="openick">
					<span>{{heuser.PfUserName}}</span>
					<i class="modification"></i>
				</p>
				<p class="expertBeGoodAt">
					<span>擅长领域: </span>
					<i v-for="(ite,idx) in heuser.PfUserExpertiseShow.split(',')" :key="idx">{{ite}}</i>
				</p>
				<p class="expertExperience ">
					<span>经验叙述: </span>
					<span>{{heuser.ExpertiseDesc}}</span>
				</p>
			</div>
			<ul class="expertData">
				<li @click="tabsSwitch(0)" >
					 <p class="itemNum">{{AriticleLength}}</p>
					 <p class="itemTxt">文章</p>
				</li>
				<li @click="tabsSwitch(1)">
					 <p class="itemNum">{{heuser.PfUserFans.PfUserFansCount}}</p>
					 <p class="itemTxt">粉丝</p>
				</li>
				<li @click="tabsSwitch(2)">
					 <p class="itemNum">{{heuser.PfUserFocus.PfUserFocusCount}}</p>
					 <p class="itemTxt"> 关注</p>
				</li>
				<li @click="tabsSwitch(3)">
					 <p class="itemNum">{{heuser.PfUserFollow.PfUserFollowCount}}</p>
					 <p class="itemTxt">跟随</p>
				</li>

			</ul>
		</div>

		<div class="expertItems expertArticle" v-if="onindex==0" >    <!--文章列表-->
			<ul class="publishedList">
				<li class="publishedInfo" v-for="(item,index) in Article" :key="index"  @click="readTheArticle">
					<div class="infoLeft">
						<img :src="item.PfDocTitleUrlLink" class="documentImg">
						<span class="triangle"></span>	
						<span class="price" v-if="item.Fee==0">免费</span>
						<span class="price" v-else>付费</span>
						
					</div>
					<div class="infoRight">
						<h2 class="publishedTitle">{{item.PfDocumentMainTitle}}</h2>
						<ul class="infoContTop">
							<li class="author">
								<img :src="PfUserPic">
								<span>{{item.PfUserName}}</span>
							</li>
							<li class="dateTime">
								<i class="icon-time"></i>
								<span>{{item.CreateDate}}</span>
							</li>
						</ul>
						<ul class="infoContDown">
							<li class="attention">								
								<i class="icon-read"></i>
								<span>{{item.attention?item.attention:0}}</span>
							</li>
							<li class="collect" @click="collectionTheArticle">
								<i class="icon-collection"></i>
								<span>{{item.collect?item.collect:0}}</span>
							</li>
						</ul>
					</div>
				</li>
			</ul>
		</div>

		<div class="expertItems expertFans" v-if="onindex==1">  <!--粉丝列表-->
			<ul class="fansList">
				<li v-for="(item,index) in LstFansFromMe" :key="index">
					<div class="fansPhoto">
						<img src="~@/assets/img/userpic.jpg">
					</div>
					<div class="fansInfo">
						<h3 class="fansName">{{item.MemberName}}</h3>
						<p class="attentionDate">
							<span>关注时间:</span>
							<i>{{item.CreateDatte}}</i>
						</p>
					</div>
					<button class="attentionBtn" @click='attention'>关注</button>
				</li>				
			</ul>
		</div>

		<div class="expertItems expertAttention" v-if="onindex==2">  <!--关注列表-->
			<ul class="attentionList">
				<li v-for="(item,index) in Focus" :key="index">
					<div class="attentionPhoto">
						<img src="~@/assets/img/userpic.jpg">
					</div>
					<div class="attentionInfo">
						<h3 class="attentionName">{{item.MemberName}}</h3>
						<p class="attentionDate">
							<span>关注时间:</span>
							<i>{{item.CreateDatte}}</i>
						</p>
					</div>
					<button class="attentionBtn">取消关注</button>
				</li>
			</ul>
		</div>

		<div class="expertItems expertFollow" v-if="onindex==3">   <!--跟随列表-->
			<ul class="followersList">
				<li v-for="(item,index) in Follow" :key="index">
					<div class="attentionPhoto">
						<img src="~@/assets/img/userpic.jpg">
					</div>
					<div class="attentionInfo">
						<h3 class="attentionName">{{item.MemberName}}</h3>
						<p class="attentionDate">
							<span>关注时间:</span>
							<i>{{item.CreateDatte}}</i>
						</p>
					</div>
					<button class="attentionBtn" @click='attention'>跟随</button>
				</li>
			</ul>
		</div>

		<div class="layerout" v-if="isnick">    <!--修改专家昵称-->
			<header class="mineHeader">
				<span @click="openick" class="iconfont icon-fanhui">&#xe614;</span>
				<span>修改昵称</span>
				<span class="headerRight" @click="setnick" >保存</span>
			</header>
			<div class="setnick" v-if='heuser'>
				<input type="text"  placeholder="请输入昵称" v-model="heuser.PfUserName" />
			</div>
		</div>
    </div>
</template>

<script>

import picUp from '@/components/picUp'
export default {
	name:'expertsInfo',
    data(){
        return {
			index:0,
			onindex:0,
			heuser:'',
			LstFansFromMe:null,
			Focus:null,
			Follow:null,
			Article:[], 
			AriticleLength:0,   //文章个数 
			PfDocMainId:'',     //文章ID
			PfUserCode:this.$route.query.PfUserCode,
			PfUserId:this.$route.query.PfUserId,
			PfDocType:this.$route.query.PfUserGameTypeCode,
			PfUserPic:this.$route.query.PfUserPic,
			isnick:false,
        }
	},
	components: {
		picUp
	},
	props: {},
    created(){
      	this.fetchData();
    },
    mounted(){

	},
	computed: {},
    methods: {
		tabsSwitch(index){
			this.onindex=index
		},
		
		readTheArticle(){
			this.$router.push({path:'articleDetails'})
		},
		
    	fetchData(){	
			let me= this;
			let PfUserCode=this.PfUserCode

			/* 专家信息 */
			this.base.getData(this,this.host+'/api/GetMyPfUserDetail',{PfUserCode:PfUserCode},function(data){
				me.heuser=data.ActionCode.MyPfUserDetail
//				console.log('专家',me.heuser)
			})


			/* 粉丝 */
			this.base.getData(this,this.host+'/api/GetFansOfMeLst',{PfUserCode:PfUserCode},function(data){
				me.LstFansFromMe=data.ActionCode.LstFansOfMeData
//				console.log('粉丝列表',me.LstFansFromMe)
			})

			/* 关注 */
			this.base.getData(this,this.host+'/api/GetFocusOfMeLst',{PfUserCode:PfUserCode},function(data){
				me.Focus=data.ActionCode.LstFocusOfMeData
//				console.log('关注列表',me.Focus)
			})


			/* 跟随 */
			this.base.getData(this,this.host+'/api/GetFollowOfMeLst',{PfUserCode:PfUserCode},function(data){
				me.Follow=data.ActionCode.LstFollowOfMeData
//				console.log('跟随列表',me.Follow)			
			})	

			
			/* 文章 */
			this.base.getData(this,this.host+'/api/GetPfDocumentOfPfUser',{PfUserCode:PfUserCode,Paging:1,},function(data){
				me.Article = data.ActionCode.LstFocusOfMeData
				me.AriticleLength = me.Article.length  //文章个数
				me.Article.forEach(function(item,i){
					me.PfDocMainId = item.PfDocumentMainId
				})
				
				console.log('文章列表',data)
				
			})
			
			
//			/* 会员新增关注 */
//			this.base.getData(this,this.host+'/api/GenFocusFromMember',{PfUserCode:PfUserCode,},function(data){
//				console.log('新增关注',data)
//			})
//			
//			
//			/* 会员新增成为粉丝 */ 
//			this.base.getData(this,this.host+'/api/GenFansFromMember',{PfUserCode:PfUserCode,},function(data){
//				console.log('新增成为粉丝',data)
//			})
//			
//			
//			/* 会员新增成为跟随 */
//			this.base.getData(this,this.host+'/api/GenFollowFromMember',{PfUserCode:PfUserCode,},function(data){
//				console.log('新增成为跟随',data)
//			})
			
		},
			
		/* 会员收藏专家文章 */
		collectionTheArticle(e){
			e.stopPropagation();
			let me= this;
			let PfDocMainId=this.PfDocMainId
			this.base.getData(this,this.host+'/api/GenPfDocFavourite',{PfDocMainId:PfDocMainId,},function(data){
				console.log('会员收藏专家文章',data)
			})
		},

		/* 上传图片 */
		picUpcallback(data){
			this.heuser.PfUserPic.UrlLink=data.imgsrc
		},

		/* 打修改昵称 */
		openick(){
			this.isnick=!this.isnick
		},
		/* 修改昵称 */
		setnick(){
			let me=this
			let nick=this.heuser.PfUserName
			let PfUserCode=this.PfUserCode
			this.base.getData(this,this.host+'/api/ModifyMyPfUserNickName',{PfUserCode:PfUserCode,PfUserNickName:nick},function(data){
				//console.log('修改',data)
				me.$vux.alert.show({content:data.ErrMsg})
				if(data.ErrCode=='00000000'){
					me.openick()
				}
			})			

		},
		
		/* 点击关注 */
		attention(){
			let me = this
			let PfUserCode=this.PfUserCode
			this.base.getData(this,this.host+'/api/GenFocusFromMember',{PfUserCode:PfUserCode},function(data){
				console.log(data)
			})
		}
			
			
    },
  
	watch: {},
    activated:function(){

	},
}
</script>

<style lang="less" scoped>
.setnick{
	padding: 0 .2rem;
	input{
		display: block;
		width:100%;
		padding:.2rem 0;
		border-bottom:1px solid #f2f2f2;
	}
}
.mineWrap{
	.expersBanner{
		width: 100%;
		position:relative;
		.expertBannerBg{
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left:0;
			z-index: -1;
			img{
				width: 100%;
				height: 100%;
			}
		}
		.return{
			position: absolute;
			top: .1rem;
			left:.15rem;
			width: .23rem;
			height: .23rem;
			line-height: .23rem;
			-webkit-border-radius: 50%;
			-moz-border-radius: 50%;
			border-radius: 50%;
			background: rgba(0,0,0,.3);
			text-align: left;			
			.icon-fanhui{
				font-size: .2rem;
				color:#fff;
				font-weight: bolder;
			}
		}
		.expertInfo{
			 width: 100%;
			 padding: .35rem 0 .7rem;
			 color: #fff;
			 text-align: center;
			 .expertPhoto{
			 	width: .8rem;
			 	height: .8rem;
			 	border:1px solid #acacac;
			 	-webkit-border-radius: 50%;
			 	-moz-border-radius: 50%;
			 	border-radius: 50%;
			 	overflow:hidden;
			 	padding:.025rem;
			 	margin:0 auto .05rem;
			 	img{
			 		width: 100%;
			 		height: 100%;
			 		-webkit-border-radius: 50%;
			 		-moz-border-radius: 50%;
			 		border-radius: 50%;
			 	}
			 }
			 .expertName{
			 	font-size: .15rem;
			 	line-height: 1;
			 	.modification{
			 		display: inline-block;
			 		width: .1rem;
			 		height: .1rem;
			 		background: url("~@/assets/img/modification.png") no-repeat center 0;
			 		background-size: 100% 100%;
			 	}
			 }
			 .expertBeGoodAt,
			 .expertExperience{
			 	font-size: .11rem;
			 }
			 .expertExperience{
			 	line-height: 1;
			 }
			 .expertBeGoodAt{
			 	height: .16rem;
			 	line-height: .16rem;
			 	overflow: hidden;
				white-space: nowrap;
				margin: .1rem auto;
			 	i{
			 		display: inline-block;
			 		height: .14rem;
			 		line-height: .14rem;
			 		border:.01rem solid #d1dce1;
			 		-webkit-border-radius: .02rem;
			 		-moz-border-radius: .02rem;
			 		border-radius: .02rem;
			 		padding: 0 .02rem;
			 		margin:0 .025rem;
			 	}
			 }
		}
		.expertData{
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: .45rem;
			background: rgba(0,0,0,.2);
			font-size: 0;
			li{
				display: inline-block;
				vertical-align: middle;
				width: 25%;
				height: 100%;
				color: #fff;
				text-align: center;
				background: url("~@/assets/img/border2.png") no-repeat right center;
				background-size:1px .25rem;
				padding:.06rem 0;
				.itemNum{
					font-size: .14rem;
					line-height: .17rem;
				}
				.itemTxt{
					font-size: .11rem;
					line-height: .16rem;
				}
			}
		}
	}
	.expertItems{
	    width: 100%;
	    height: 100%;
	    position: fixed;
	    overflow-y: scroll;
	    padding-bottom: 2.53rem;
	}
	.expertItems::-webkit-scrollbar{
		display: none;
	}
	.expertArticle{     /* 文章 */
		.publishedList{
			width:100%;
			padding-top: .1rem;
			.publishedInfo{
				overflow: hidden;
				margin-bottom:.1rem;
				background: #fff;
				position:relative;
				padding-left:1.37rem;
				height:.9rem;
				.infoLeft{
					width:1.1rem;
					height:.9rem;
					overflow: hidden;
					position: absolute;
					top:0;
					left:0;
					.documentImg{
						width: 100%;
						height:100%;							
					}
					.triangle{
						width:0;
						height:0;
						overflow:hidden;
						font-size:0;
						border-right:.3rem solid #e22f29;
						border-top:.3rem dashed transparent;
						position: absolute;
						bottom: 0;
						right: 0;
					}
					.price{
						position: absolute;
						bottom: .04rem;
						right: .02rem;
						font-size: .08rem;
						color: #fff;
						z-index: 2;
					}
				}
				.infoRight{
					.publishedTitle{
						width:1.8rem;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
						font-size:.15rem;
						line-height:.4rem;
						margin-bottom:.04rem; 
					}
					.infoContTop{
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
					.infoContDown{
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
	.expertFans,.expertAttention,.expertFollow{     /* 粉丝&关注&跟随 */   
		padding-top: .1rem;
		.fansList,.attentionList,.followersList{
			li{
				width: 100%;
				height: .75rem;
				background: #fff;
				padding: .075rem .15rem;
				overflow: hidden;
				margin-bottom: .01rem;
				.fansPhoto,.attentionPhoto,.followersPhoto{
					float: left;
					width: .6rem;
					height: .6rem;
					-webkit-border-radius: 50%;
					-moz-border-radius: 50%;
					border-radius: 50%;
					overflow: hidden;
					img{
						width: 100%;
						height: 100%;
					}
				}
				.fansInfo,.attentionInfo,.followersInfo{
					float: left;
					margin:.085rem 0 .085rem .075rem;
					.fansName,.attentionName,.followersName{
						font-size: .14rem;
						color: #333;
						line-height: .23rem;
					}
					.attentionDate{
						font-size: .11rem;
						color: #999;
						line-height: .2rem;
						span{
							margin-right: .04rem;
						}
					}
				}
				.attentionBtn,.cancelTheAttentionBtn{
					float: right;
					height: .23rem;
					line-height: .23rem;
					text-align: center;
					border: .01rem solid @red;
					-webkit-border-radius: .03rem;
					-moz-border-radius: .03rem;
					border-radius: .03rem;
					background: #fff;
					font-size: .11rem;
					color: @red;
					margin-top: .175rem;
					padding: 0 .13rem;
				}
				.cancelTheAttentionBtn{
					padding: 0 .025rem;
				}
			}
		}
	}

}
</style>