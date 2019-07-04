<template>
    <div v-title data-title="服务" class="serveWrap">
       	<header class="serveHeader">
       		<span>服务</span>
       	</header>
       	<div class="serveContent">
	       	<!--看大神分析-->
	       	<div class="analyze">
	       		<router-link :to="$pagecode(item.LinkPageCode)" v-for="(item,index) in analyzeList" :key="index">
	       			<div class="analyze-info">
	   					<p class="info-title">{{item.AppServiceName}}</p>
	   					<p class="info-describe">{{item.AppServiceDesc}}</p>
	   				</div>
	   				<div class="analyze-img">
	   					<img :src="item.ServiceIconPic.UrlLink">
	   				</div>
	       		</router-link>  		
	       	</div> 
	       	<!--轮播图-->
	       	<!--<Swiper class="server-lunbo" dots-class="dots-icon" auto :show-desc-mask="false" :list="shufflinglist" :aspect-ratio=".24" dots-position="center"></Swiper>-->
	       	<swiper dots-class="dots-icon" auto :show-desc-mask="false" :aspect-ratio=".24" dots-position="center" class="server-lunbo">
		      <swiper-item class="swiper-demo-img" v-for="(item, index) in shufflinglist" :key="index">
		        	<img style="width:100%;height:100%" :src="item.img" @click="swiperClick(index)">
		      </swiper-item>
    		</swiper>
	       	<!--盘口赔率  联盟资料  赛事中心  大神推单-->
	       	<div class="information">
	       		<router-link to="" v-for="(item,index) in informationlist" :key="index">
	       			<div class="information-img"><img :src="item.img"></div>
	       			<p class="information-name">{{item.name}}</p>
	       		</router-link>
	       	</div>
	       	<!--系统  专家-->
	       	<div class="footer">
	       	    <tab :line-width=4 defaultColor='#333' active-color='#333' bar-active-color='#3cb0c3' v-model="index">
	        		<tab-item class="tab-vux-center" v-for="(item,index) in tablist" :key="index">{{item}}</tab-item>
	      		</tab>
	       		<swiper class="swiperBox" :show-dots="false" v-model="index" height="0.85rem">
	       			<swiper-item class="system-expert">
	       				<div class="tab-swiper vux-center">
	       					<router-link to="" v-for="(item,index) in systemList" :key="index">
	       						<div class="infoImg">	       							
	       							<img :src="item.ServiceIconPic.UrlLink">	
	       						</div>
	       						<p class="infoName">{{item.AppServiceName}}</p>
	       					</router-link>
	       				</div>
	       			</swiper-item>
	   				<swiper-item class="system-expert">
	       				<div class="tab-swiper vux-center">
	       					<router-link to="" v-for="(item,index) in expertlist" :key="index">
	       						<div class="infoImg"><img :src="item.img"></div>
	       						<p class="infoName">{{item.txt}}</p>
	       					</router-link>
	       				</div>
	       			</swiper-item>
	       		</swiper>
	       	</div>
       	</div>
        <slTabbar></slTabbar>
    </div>
</template>

<script>
	import { Tab, TabItem,Swiper,SwiperItem } from 'vux'
	const informationList = [
		{ 
			img:'~@/assets/img/serving-pkpl.png',
			name:'盘口赔率'
		}, 
		{
			img:'~@/assets/img/serving-lmzl.png',
			name:'联盟资料'
		}, 
		{
			img:'~@/assets/img/serving-sszx.png',
			name:'赛事中心'
		},
		{
			img:'~@/assets/img/serving-dstd.png',
			name:'大神推单'
		}
	]
	const tabList = ["系统","专家"]
	const expertList = [
			{
				img:'~@/assets/img/serving-expert-zjzw.png',
				txt:'专家撰文'	
			},
			{
				img:'~@/assets/img/serving-expert-wzcx.png',
				txt:'文章查询'	
			},
			{
				img:'~@/assets/img/serving-expert-ydcx.png',
				txt:'阅读查询'	
			}
		]

    export default {
        data(){
            return {
            	index:0,
            	analyzeList:[],  //分析
            	shufflinglist:[],     //轮播图
            	informationlist:informationList,    //盘口赔率、联盟资料、赛事中心、大神推单      	
            	tablist:tabList,     //tab
            	expertlist:expertList,    //tab-专家
            	systemList:[],   //tab-系统     
            	bigIndex:''
            }
        },
        created(){
        	this.fetchData();
        },
        mounted(){

        },
        methods: {
        	fetchData(){
				let me= this;
				this.base.getData(this,this.host+'/api/GetExportService',{"SystemCode":"DQExport",},function(data){				
//					console.log(data)
					let LstServiceGroupp = data.ActionCode.LstServiceGroupp
					me.analyzeList = LstServiceGroupp[0].LstExportServiceInfo     //分析
					me.systemList = LstServiceGroupp[1].LstExportServiceInfo     //tab-系统
									
					me.LstExportServiceBanner = data.ActionCode.LstExportServiceBanner    //轮播图
					me.LstExportServiceBanner.forEach(function(item,i){
						me.$set(me.shufflinglist,i,{
							img:item.BannerSource.UrlLink,
							imgBig:item.BannerTarget.UrlLink
						})
					})

				})

			},
			swiperClick(index){
			this.bigIndex = this.shufflinglist[index].imgBig
			this.$router.push({path: '/advertisement', query: {id: this.bigIndex}});
		},
        },
        computed: {

        },
        watch: {},
        props: {},
        components: {
        	Tab,
		    TabItem,
		    Swiper,
		    SwiperItem
        },
        activated:function(){
			
		},
    }
</script>

<style lang="less">
	.serveWrap{
		.serveContent{
			width: 100%;
			height: 100%;
			position: absolute;
			top: .44rem;
			left: 0;
			padding-bottom: 1rem;
			overflow-y: auto;
			.analyze{
				border:1px solid #ddd;
				background: #fff;
				padding:0 .095rem;
				a{
					width:50%;
					display: inline-block;
					font-size: 0;
    				-webkit-text-size-adjust:none;	
    				text-align: center;
					.analyze-info{
						display: inline-block;
						vertical-align: middle;
						margin:.14rem 0;
						text-align:left;
						.info-describe,.info-title{
							width:.72rem;
							overflow: hidden;
							text-overflow:ellipsis;
							white-space: nowrap;
							font-size:.1rem;
							color:#999;
							line-height:.13rem;
						}
						.info-title{
							font-size:.14rem;
							color:#333;
							margin:.08rem 0 .045rem;
							font-weight: bold;
							line-height:.18rem;
						}
					}
					.analyze-img{
						display: inline-block;
						vertical-align: middle;
						width:.7rem;
						height:.4rem;
						img{
							width:100%;
							height:100%;
						}
					}
				}	
				a:nth-child(-n+2){
					border-bottom:1px solid #ddd;
				}			
			}	
			.server-lunbo{
				margin-top:.05rem;
				.vux-icon-dot {
					background-color: #ccc !important;
					transition: all .3s ease-in-out;
					-ms-transition: all .3s ease-in-out;
					-moz-transition: all .3s ease-in-out;
					-webkit-transition: all .3s ease-in-out;
					-o-transition: all .3s ease-in-out;
				}
				.dots-icon{
					position:absolute;
					bottom:0;	
					i{
						width:.04rem !important;
						height:.04rem !important;
						background:#ccc;
					}
				}				
				.active{			
					background:#4897f1 !important;
				}
			}
			.information{
				border:1px solid #ddd;
				margin-top:.05rem;
				padding:.16rem 0 .19rem;
				background: #fff;
				display: flex;
				justify-content: space-around;
				a{
					text-align:center;
					.information-img{
						width:.33rem;
						height:.33rem;
						margin:0 auto .14rem;
						img{
							width:100%;
							height:100%;
						}
					}
					.information-name{
						font-size:.14rem;
						color:#333;
						line-height:1;
					}
				}
			}
			.footer{
				margin-top:.05rem;
				.vux-tab{
					border: 1px solid #ddd;
					border-bottom:none;
				}
				.tab-vux-center{
					font-size:.14rem;
				}
				.swiperBox{
					height:.85rem !important;				
					.system-expert{
						.tab-swiper{
							width:100%;
							height:.85rem;
							padding:.175rem 0 .12rem;
							background: #fff;
							border: 1px solid #ddd;
							border-top:none;
							a{
								width:33.333%;
								display: inline-block;
								vertical-align: middle;
								text-align: center;		
								.infoImg{
									width:.33rem;
									height:.33rem;
									margin:0 auto .11rem;
									img{
										width:100%;
										height:100%;
									}
								}
								.infoName{
									font-size:.11rem;
									color: #333;
									line-height:1;
								}	
							}
						}		
					}
				}
			}			
		}
		.serveContent::-webkit-scrollbar{
			display: none;
		}
	}
</style>