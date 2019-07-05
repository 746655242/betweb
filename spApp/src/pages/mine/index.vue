<template>
    <div v-title data-title="我的" class="mineWrap">
     
     	<!-- <div class="mineHeader">
     		<span></span>
     		<router-link to="/msg" class="mineRemind">
     			<i class="iconfont icon-lingdang">&#xe652;</i>
     		</router-link>
     		<router-link to="/mySet" class="mineSet">
     			<i class="iconfont icon-shezhi">&#xe64e;</i>
     		</router-link>
     	</div> -->

		<div class="main">
	
			<!--用户名  头像-->
			<div class="userInfo">
				<div class="userPhoto">

					<picUp  
					:df="{url:'/api/GetSaiLaiMemberPicLst',data:{},get:'LstSaiLaiMemberPic'}"  
					:dfup="{ url:'/api/UploadMyPfUserPic',data:{},get:''}"
					:Gpicid="{url:'/api/ChgMemberPic',data:{},get:'UploadPicId'}"   
					@callback="callback" >
						<!-- <img v-if="user.info.avatar" :src="user.info.avatar"> -->
						<img  src="~@/assets/img/userpic.jpg">
					</picUp>
					
				</div>

				<div class="user">
					<p class="userName">
						<span>{{user.info.mobile}}</span>
					</p>
					<!-- <p class="userId">修改个人资料</p> -->
				</div>

				<div class="amountBar">
					<div class="amountNum">
						<span class="t">金币:</span>
						<span>{{user.info.credit_balance}}</span>
					</div>
					<div class="addmoney" @click="msg">充值</div>
				</div>	
			</div>
			

		
			<div class="classifyCont">
				<!--个人  申请  报表-->
				<div  class="classifyBox">
					<p class="classifyTitle">投注服务</p>
					<ul>
						<li >
							<router-link to="/mine/betting" >
								<p class="subitemImg">
									<img src="~@/assets/img/icon-1.png">
								</p>
								<p class="subitemTitle">投注记录</p>
							</router-link>
						</li>

						<li  @click="msg" >
							<router-link to="" >
								<p class="subitemImg">
									<img src="~@/assets/img/icon-4.png">
								</p>
								<p class="subitemTitle">账户明细</p>
							</router-link>
						</li>			
						

						<li  @click="msg">
							<router-link to=""  >
								<p class="subitemImg">
									<img src="~@/assets/img/icon-2.png">
								</p>
								<p class="subitemTitle">优惠券</p>
							</router-link>
						</li>

						<li  @click="msg" >
							<router-link to="" >
								<p class="subitemImg">
									<img src="~@/assets/img/icon-3.png">
								</p>
								<p class="subitemTitle">我的奖品</p>
							</router-link>
						</li>
						
									
					</ul>
				</div>

				<div class="menu">

					<!-- <router-link class="line" to="">
						<img src="~@/assets/img/icon-5.png">
						<span>我的钱包</span><i class="iconfont">&#xe606;</i>
					</router-link> -->

<!-- 
					<a class="line" href="#">
						<img src="~@/assets/img/icon-8.png">
						<span>客服中心</span><i class="iconfont">&#xe606;</i>
					</a> -->
					
					<router-link  class="line" to="/mySet" >
						<img src="~@/assets/img/icon-8.png">
						<span>系统设置</span><i class="iconfont">&#xe606;</i>
					</router-link> 
				</div>

			</div>


			
			<div class="layerout" v-if="isnick">    <!--修改会员昵称-->
				<header>
					<span @click="openNickName" class="iconfont icon-fanhui">&#xe614;</span>
					<span>修改昵称</span>
					<span class="headerRight" @click="modifyNickName">保存</span>
				</header>
				<div class="setnick">
					<input type="text"  placeholder="请输入昵称" v-model="userName"/>
				</div>
			</div>
			
		</div>
		
    <slTabbar></slTabbar>
    </div>
</template>

<script>

	import picUp from '@/components/picUp'

	import {mapGetters,mapMutations} from 'vuex'
    export default {
        data(){
            return {
            	photoImg:'',
            	userName:'',
            	userId:'',
			
			
				isnick:false,
			
            }
        },
        created(){
        	this.fetchData();
        },
		computed:{
			...mapGetters({
				user:'getuser'
			}),
			...mapMutations({
				setuser:'setuser'
			}),
		},
		components:{
			
			picUp
		},
        methods: {

        	fetchData(){
				let me= this;
				let user=this.user.info

				if(user&&user.token){
					 this.axios.post('/api/user/getuser').then(res => {  
                        let data=res.data;
						if(data.errorCode==1){
							me.setuser({info:data.result.userinfo})
							me.$emit('storedata')
							
						}else{
							// me.$vux.alert.show({content: data.message})
							// me.disabled = false;
					 		// me.show_loading = false;
						}

                    }).catch(function(err){
                        console.log(err)
                        
					})

        		}else{
					//this.$router.push('/login')
				}
			},


			msg(){
				alert('功能暂未开放');
			},

			/* 图片上传 */
			callback(data){
				this.photoImg=data.imgsrc
			},
			
			/*点击修改昵称*/
			openNickName(){
				this.isnick=!this.isnick
			},
			
			/* 修改昵称 */
			modifyNickName(){
				let me = this
				this.base.getData(this,this.host+'/api/MemberModifyNickName',{'NewNickName':me.userName,},function(data){						
//					console.log(data)	
					me.$vux.alert.show({content:data.ErrMsg})
					if(data.ErrCode=='00000000'){
						me.openNickName()
					}
				})
			}
			
        },
        activated:function(){
        	
		}
    }
</script>

<style lang="less" scoped="scoped">
	.main{
		top:0;
	}
	.mineWrap{
		background: #fff;
		height: 100%;
		.layerout{
			padding-top: 0;
		}
		.setnick{
			padding: 0 .2rem;
			input{
				display: block;
				width:100%;
				padding:.2rem 0;
				border-bottom:1px solid #f2f2f2;
			}
		}
		.mineHeader{
			font-size:0;
			-webkit-text-size-adjust:none;
			background:@red;
			width:100%;
			height:.44rem;
			position:relative;
			a{
				width:.2rem;
				height:.2rem;
				color: #fff;
				position:absolute;
				top:.12rem;
				line-height:1;
				i{
					font-size: .2rem;
				}
			}
			.mineSet{
				right:.2rem;
			}
			.mineRemind{			
				right:.54rem;
			}
		}
		.userInfo{
			width:100%;
			height:1.9rem;
			padding:.25rem 0 .15rem .15rem;
			background: #ef1823;
			border-bottom-right-radius: 350px 30px;
			border-bottom-left-radius: 350px 30px;
			.userPhoto{
				width:.5rem;
				height:.5rem;
				-webkit-border-radius: 50%;
				-moz-border-radius: 50%;
				border-radius: 50%;
				overflow:hidden;
				position:absolute;
				top:.25rem;
				left:.3rem;
				img{
					width:100%;
					height:100%;	
				}
			}
			.user{
				padding-left:.8rem;
				color:#fff;
				font-weight: bold;
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
				.userName{
					line-height: .3rem;
					font-size:.15rem;
					padding-top:.15rem;
					span{
						line-height: .3rem;
						font-size:.18rem;
						color: #fff;
					}
					.modification{
				 		display: inline-block;
				 		width: .12rem;
				 		height: .12rem;
				 		background: url("~@/assets/img/modification.png") no-repeat center 0;
				 		background-size: 100% 100%;
				 	}
				}
				.userId{
					line-height: .14rem;
					font-size:.1rem;
				}			
			}

			.amountBar{
				overflow: hidden;
				padding-top:.15rem;
				.amountNum{
					float:left;
					color:#fff;
					line-height:.4rem;
					.t{
					margin-left:.2rem;}
				}
				.addmoney{
					float: right;
					background: #fff;
					padding:.05rem .15rem;
					border-radius: .2rem;
					margin-right:.25rem;
				}
			}
		}

		.fans{
			overflow: hidden;
			box-shadow:2px 0 10px rgba(0,0,0,.1);
			a{
				background: #ffffff;
				width:33.33%;
				display:block;
				float:left;
				text-align:center;
				font-size:.14rem;
				line-height: .18rem;
				padding:.05rem 0;
				color:#333;
				.small{
					font-size:.11rem
				}
			}

		}
		.classifyCont{
			position: fixed;
			width: 100%;
			height: 100%;
			margin-top:-.6rem;
			overflow-y: scroll;
			padding:.1rem .15rem 2.2rem;
			.classifyBox{
				width:100%;
				background: #fff;
				border-radius: .08rem;
				margin-bottom:.1rem;
				box-shadow: 0 2px 5px rgba(0,0,0,.1);
				
				.classifyTitle{
					width:100%;
					height:.5rem;
					line-height:.5rem;
					text-indent: .2rem;;
					font-size:.15rem;
					color: #000;	
					position: relative;
					&::before{
						content: "";
						width: 4px;	
						height: .12rem;
						border-radius: .02rem;
						background: #ef1823;
						display: block;
						position:absolute;
						left:.1rem;
						top:.18rem;
					}
				}
				ul{
					padding:0 .1rem;
					font-size:0;
					-webkit-text-size-adjust:none;
					li{
						display: inline-block;
						vertical-align: middle;
						width:25%;
						a{
							display: block;
							width:100%;
							text-align: center;
							padding:0  0 .15rem;
							.subitemImg{
								width:.4rem;
								height:.4rem;
								margin:0 auto .1rem;
								img{
									width:100%;
									height:100%;
								}
							}
							.subitemTitle{
								font-size:.11rem;
								color:#282828;
								line-height:1;
							}
						}
					}
				}
			}
		}
		.classifyCont::-webkit-scrollbar{
			display: none;
		}
	}

	.menu{
		

		.line{
			line-height: .3rem;
			padding:.1rem 0;
			display: block;
			border-bottom:1px solid #e8e8e8;
			img{
				width: .24rem;
				vertical-align: middle;
				margin-right: .05rem;
				margin-left:.05rem;
			}
			span{
				vertical-align: middle;
				color:#333;
			}
			i{
				float:right;
				color:#cbcbcb;
			}
		}

	}
	
</style>