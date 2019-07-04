<template>
    <div class="mineWrap">
		<header class="myExpertsHeader">
			<span onclick="history.go(-1)" class="iconfont icon-fanhui">&#xe614;</span>
			<span>收益</span>
			<i class="iconfont icon-shuaxin headerRight">&#xe6d1;</i>
		</header>
		<div class="publishedBox">
			<div class="publishedScreen">
				<div class="screenByTime" @click="screenByTime">
					<span>时间</span>
					<i class="iconfont icon-tri-down">&#xe609;</i>
				</div>
				<ul class="timeSort" v-show="timeShow">
					<li>按顺序</li>
					<li>按倒序</li>
				</ul>
				<div class="screenByKid" @click="screenByKid">
					<span>种类</span>
					<i class="iconfont icon-tri-down">&#xe609;</i>
				</div>
				<ul class="kidSort" v-show="kidShow">
					<li>彩票</li>
					<li>数字</li>
					<li>运彩</li>
				</ul>
				<div class="screenByEarn" @click="screenByEarn">
					<span>收益</span>
					<i class="iconfont icon-tri-down">&#xe609;</i>
				</div>
				<ul class="earnSort" v-show="earnShow">
					<li>从高到低</li>
					<li>从低到高</li>
				</ul>
			</div>
			<ul class="publishedList">
				<li class="publishedInfo" v-for="(items,index) in publishedlist" :key="index">
					<div class="infoLeft">
						<img :src="items.documentImg" class="documentImg">
						<img :src="items.payImg" class="payImg">
					</div>
					<div class="infoRight">
						<h2 class="publishedTitle">{{items.title}}</h2>
						<ul class="infoContTop">
							<li class="author">
								<img :src="items.authorPhoto">
								<span>{{items.authorName}}</span>
							</li>
							<li class="dateTime">
								<i class="icon-time"></i>
								<span>{{items.dateTime}}</span>
							</li>
						</ul>
						<ul class="infoContDown">
							<li class="attention">								
								<i class="icon-read"></i>
								<span>{{items.attention}}</span>
							</li>
							<li class="collect">
								<i class="icon-collection"></i>
								<span>{{items.collect}}</span>
							</li>
						</ul>
					</div>
				</li>
			</ul>
		</div>
		<div class="mask" v-show="maskShow" @click="maskClick"></div>
    </div>
</template>

<script>
const publishedList = [
	{
		documentImg:'static/img/publishedImg.jpg',
		payImg:'~@/assets/img/pay.png',
		title:'大乐透201715期前区...',
		authorPhoto:'~@/assets/img/authorPhoto.png',
		authorName:'严格解盘',
		dateTime:'2017-11-08 09:12',
		attention:199,
		collect:199,
	},
	{
		documentImg:'~@/assets/img/documentImg.jpg',
		payImg:'~@/assets/img/pay.png',
		title:'大乐透201715期前区...',
		authorPhoto:'~@/assets/img/authorPhoto.png',
		authorName:'严格解盘',
		dateTime:'2017-11-08 09:12',
		attention:199,
		collect:199,
	},
	{
		documentImg:'static/img/publishedImg.jpg',
		payImg:'~@/assets/img/pay.png',
		title:'大乐透201715期前区...',
		authorPhoto:'~@/assets/img/authorPhoto.png',
		authorName:'严格解盘',
		dateTime:'2017-11-08 09:12',
		attention:199,
		collect:199,
	},
	{
		documentImg:'~@/assets/img/documentImg.jpg',
		payImg:'~@/assets/img/pay.png',
		title:'大乐透201715期前区...',
		authorPhoto:'~@/assets/img/authorPhoto.png',
		authorName:'严格解盘',
		dateTime:'2017-11-08 09:12',
		attention:199,
		collect:199,
	},
	{
		documentImg:'static/img/publishedImg.jpg',
		payImg:'~@/assets/img/pay.png',
		title:'大乐透201715期前区...',
		authorPhoto:'~@/assets/img/authorPhoto.png',
		authorName:'严格解盘',
		dateTime:'2017-11-08 09:12',
		attention:199,
		collect:199,
	},
	{
		documentImg:'~@/assets/img/documentImg.jpg',
		payImg:'~@/assets/img/pay.png',
		title:'大乐透201715期前区...',
		authorPhoto:'~@/assets/img/authorPhoto.png',
		authorName:'严格解盘',
		dateTime:'2017-11-08 09:12',
		attention:199,
		collect:199,
	},
]	
export default {
	name:'earnings',
    data(){
        return {
			maskShow:false,
        	timeShow:false,
        	kidShow:false,
        	earnShow:false,
			publishedlist:publishedList
        }
    },
    created(){
    	//		this.fetchData();
    },
    mounted(){

    },
    methods: {
		screenByTime(){
			this.timeShow = !this.timeShow
			this.maskShow = !this.maskShow
			this.kidShow = false
			this.earnShow = false
		},
		screenByKid(){
			this.kidShow = !this.kidShow
			this.maskShow = !this.maskShow
			this.timeShow = false
			this.earnShow = false
		},
		screenByEarn(){
			this.earnShow = !this.earnShow
			this.maskShow = !this.maskShow
			this.timeShow = false
			this.kidShow = false
		},
		maskClick(){
			this.timeShow = false
			this.kidShow = false
			this.earnShow = false
			this.maskShow = false
		},
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
	.myExpertsHeader{
		.icon-fanhui{			
			font-size:.2rem;
		}
		.icon-shuaxin{
			font-size:.19rem;
		}
	}
	.publishedBox{
		padding-top: .84rem;
		.publishedScreen{
			width:100%;
			background: #fff;
			position: fixed;
			top:.44rem;
			left:0;
			z-index:2;
			font-size:0;
			border-bottom:1px solid #ddd;
			.screenByTime,.screenByKid,.screenByEarn{
				width:33.333%;
				height: .4rem;
				line-height: .4rem;
				text-align: center;
				display: inline-block;
				vertical-align: middle;
				font-size: .15rem;
				color:#666;
				i{
					font-size:.04rem;
				}
			}
			.timeSort,.kidSort,.earnSort{
				width: 100%;
				position: absolute;
				top: .41rem;
				left:0;
				z-index: 2;
				li{
					height: .4rem;
					line-height: .4rem;
					font-size:.15rem;
					color: #666;
					text-indent: .15rem;
					background: #f4f4f4;
					border-bottom: 1px solid #ddd;
				}
				li:nth-child(1){
					background: #fff;
					border-bottom: none;
				}
			}
			.timeSort{

			}
			.kidSort{

			}
		}
	}
	.publishedList{
		width:100%;
		margin-top:.1rem;
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
</style>