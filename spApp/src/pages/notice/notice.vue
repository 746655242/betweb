<template>
	<div class="daohao-wrap">
		<header class="noticeHeader">
			<span onclick="history.go(-1)" class="iconfont icon-fanhui">&#xe614;</span>
			<span>公告</span>
		</header>
		<div class="noticeCont">
			<ul class="tabBox">
				<li v-for="(item,index) in LstTopSelOne" :key="index" @click="tabsSwitch(item,index)">
					<span :class="{active:item.Default==1}">{{item.Show}}</span>
				</li>
			</ul>
			<div class="noticeWrap">
			
				<div class="noticeList">
					<div class="noContent" v-if="list[onindex]==0">
						<div class="noContentImg">
							<img src="~@/assets/img/noAnnouncement.png">
						</div>
						<p>{{temporarilyNoContent}}</p>
					</div>
					<div class="noticeBox" v-for="(item,index) in list[onindex]" :key="index">
						<p class="noticeTop">
							<span class="noticeTitle">{{item.BulletinTitle}}</span>
							<span class="noticeTime">{{item.CreateDate}}</span>
						</p>
						<p class="noticeContent">{{item.BulletinSubject}}</p>
						<router-link :to="{path:'noticeDetail',query:{id:item.BulletinId}}">
							<span>{{checkTheDetails}}</span>
							<span class="iconfont icon-enter">&#xe606;</span>
						</router-link>							
					</div>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'notice',
	data() { //页面数据
		return {
			checkTheDetails:'查看详情',
			temporarilyNoContent:'暂无内容',
			LstTopSelOne:[],     //导航
			onindex:0,
			list:[],
			LstBulletinData:[],     //公告内容
			CurrentDate:'',     //当前日期
			CurrentDateStamp:0,     //当前日期时间戳
			CreateDate:'',     //公告发布日期
			CreateDateStamp:0,     //公告发布日期时间戳
			
			
		}
	},
	created() { //初始化
		this.fetchData();
	},
	mounted: function() {

	},
	methods: {
		tabsSwitch(e,index){			
			let me= this;
			me.onindex=index
			let type=e.Value
			this.base.getData(this,this.host+'/api/GetExportBulletinByDateInterval',{'SystemCode':'DQExport',
					'DateString':type,},function(data){						
	//			console.log(data)
	
				me.LstTopSelOne = data.ActionCode.LstTopSelOne     //导航
				me.list[index]=data.ActionCode.LstBulletinData
				
			})	
		},

		fetchData(){
			let me= this;
			this.base.getData(this,this.host+'/api/GetExportBulletinByDateInterval',{'SystemCode':'DQExport',
					'DateString':'7',},function(data){
//						console.log(data)

				/* 导航 */
				me.LstTopSelOne = data.ActionCode.LstTopSelOne
				me.list[me.onindex]=data.ActionCode.LstBulletinData

				/* 公告列表 */
				me.LstBulletinData = data.ActionCode.LstBulletinData
				if(me.LstBulletinData.length<=0){     //没有公告
					me.oneDayNoContShow = true
					me.threeDayNoContShow = true
					me.sevenDayNoContShow = true
				}
				/* 公告显示/隐藏 */
				let time = new Date();
				let year = time.getFullYear();  //年
				let month = time.getMonth()+1;  //月
				let day = time.getDate();       //日
				
				let CurrentDate = year+'/'+month+'/'+day;    //当前日期	
					me.CurrentDate = CurrentDate;
				let CurrentDateStamp = new Date(CurrentDate).getTime()/1000;    //当前日期转换成时间戳
					me.CurrentDateStamp = CurrentDateStamp
					console.log('当前日期和时间戳',CurrentDate,CurrentDateStamp)
		
				me.LstBulletinData.forEach(function(item,i){						
					let CreateDate = item.CreateDate;    //公告发布日期
						me.CreateDate = CreateDate;
					let CreateDateStamp = new Date(item.CreateDate).getTime()/1000;    //公告发布日期转换成时间戳
						me.CreateDateStamp = CreateDateStamp
						console.log('创建日期和时间戳',CreateDate,CreateDateStamp)

				})			
			})
		},
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

<style lang="less" scoped="scoped">
.daohao-wrap{
	.noticeCont{
		width:100%;
		padding-top:.44rem;
		.tabBox{
			width:100%;
			border-bottom:1px solid #ddd;
			position: fixed;
			top: .44rem;
			left: 0;
			background: #fff;
			z-index: 1;
			li{
				display: inline-block;
				vertical-align: middle;
				width: 33.333%;
				height:.4rem;
				line-height: .4rem;
				text-align: center;
				font-size:.15rem;
				span{
					display: inline-block;
					width: 50%;
					height: 100%;
				}
				.active{
					color: @red;
					border-bottom: .015rem solid @red;
				}
			}			
		}
		.noticeWrap{
			position: absolute;
		    top: .44rem;
		    left: 0;
		    width: 100%;
		    height: 100%;
		    overflow-y: scroll;
		    padding: .5rem 0 .44rem;
			.noticeList{
				/*display: none;*/
				.noticeBox{
					width:94%;
					margin:0 auto .1rem;
					background:#fff;
					-webkit-border-radius: .05rem;
					-moz-border-radius: .05rem;
					border-radius: .05rem;
					padding:.02rem .15rem 0 .1rem;
					.noticeTop{
						width:100%;
						height:.275rem;
						line-height:.275rem;
						display: flex;
						justify-content: space-between;
						.noticeTitle{
							font-size:.13rem;
							color:#333;
							font-weight: bold;
						}
						.noticeTime{
							font-size:.09rem;
							color:#999;
						}
					}
					.noticeContent{
						font-size:.1rem;
						color:#999;
						line-height:.15rem;
						margin-bottom:.07rem;
					}
					a{
						line-height: .33rem;
						border-top: 1px solid #f0f0f0 ;
						display: flex;
						justify-content: space-between;
						span{
							font-size:.1rem;
							color:#999;										
						}
					}
				}
				.noContent{
					margin-top:1.21rem;
					text-align: center;
					.noContentImg{
						width:1.82rem;
						height:1rem;
						margin:0 auto .19rem;
						img{
							width:100%;
							height:100%;
						}
					}
					p{
						line-height: 1;
						font-size:.18rem;
						color:#ccc;
					}
				}
			}
		}
		.noticeWrap::-webkit-scrollbar{
			display: none;
		}
	}
}
</style>