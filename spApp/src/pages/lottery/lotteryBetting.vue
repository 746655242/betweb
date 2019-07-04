<template>
	<div class="daohao-wrap">
		<header class="betHeader">
			<span @click="goback" class="iconfont icon-fanhui">&#xe614;</span>		
			<span class="playName">广东11选5</span>
			<span class="playNames" @click="switcher">前二直选 <b class="icon-riangle"></b></span>
			<span class="iconfont icon-help" @click="togglee">&#xe607;</span>
			<div class="helpBox" v-show="helpShow">
				<router-link to="" v-for="(help,index) in helpList" :key="index">{{help}}</router-link>
			</div>
			<ul class="playBox" v-show="playShow">
				<li v-for="(play,index) in playList" :key="index" @click="selected(play,index)" :class="{'active':play.active,'unactive':!play.active}">					
					{{play.select}}
					<span class="icon-hook" v-show="play.active"></span>
					<span class="iconfont icon-duigou" v-show="play.active">&#xe626;</span>
				</li>
			</ul>
		</header>
		<div class="shadow" v-show="shadowShow"></div>
		<div class="betBox">
			<div class="info-time">
				<p class="issueInfo">
					<span>No.1712112169期</span>
					<span>
						<i class="iconfont icon-shizhong">&#xe608;</i>
						<b>00:09:52</b>
					</span>
				</p>
				<p class="oldIssueInfo" v-for="(item,index) in issuelist" :key="index" v-show="oldIssueShow">
					<span class="issue">{{item.issue}}期</span>
					<span class="oldNum">{{item.num}}</span>
					<span></span>
				</p>	
				<div class="arrowDown" @click="oldeIssue">
					<b></b>
					<i class="iconfont icon-fanhui-copy">&#xe600;</i>
				</div>
			</div>

			<div class="chooseNum">
				<div class="digits">
					<p>
						<b>选号</b>
						<i>（至少选一个号码）</i>
					</p>		
					<span class="machineSelection">机选一注</span>
				</div>
				<ul class="number">
					<li v-for="(num,index) in numberlist" :key="index" :class="{unchecked:isUnchecked,'checked':isChecked}">
						<p @click="checked">{{num.pNumber}}</p>
						<span>{{num.spanNumber}}</span>
					</li>
				</ul>
			</div>
			
			<div class="footerInfo">
				<span class="clear">
					<i class="iconfont icon-qingchu">&#xe60a;</i>
				</span>
				<span class="chooseResult">
					共<i>1</i>注<b>2</b>元
				</span>
				<span class="btn" @click="btnToggle">{{btnText}}</span>
				<div class="selectedResult" v-show="selectedShow">
					<p>机选一注</p>
					<p>机选5注</p>			
				</div>
			</div>
		</div>
	</div>                      
</template>

<script>
const issueList = [
	{issue:'No.1712112168',num:'5 9 8 2 8'},
	{issue:'No.1712112167',num:'5 9 8 2 8'},
	{issue:'No.1712112166',num:'5 9 8 2 8'},
	{issue:'No.1712112165',num:'5 9 8 2 8'},
]
export default {

	name: 'lotteryBetting',
	data() { //页面数据
		return {
			isUnchecked:true,
			isChecked:false,
			helpList:['走势图','购买策略','玩法说明'],
			playList:[
				{select:'大小单双',active:true},
				{select:'前一',active:false},
				{select:'前二直选',active:false},
				{select:'大小单双',active:false},
				{select:'前一',active:false},
				{select:'前二直选',active:false}
			],
			helpShow:false,
			playShow:false,
			oldIssueShow:false,
			issuelist:issueList,
			numberlist:[
				{pNumber:1,spanNumber:0},
				{pNumber:2,spanNumber:1},
				{pNumber:3,spanNumber:2},
				{pNumber:4,spanNumber:3},
				{pNumber:5,spanNumber:4},
				{pNumber:6,spanNumber:5},
				{pNumber:7,spanNumber:6},
				{pNumber:8,spanNumber:7},
				{pNumber:9,spanNumber:8},
				{pNumber:10,spanNumber:9},
				{pNumber:11,spanNumber:10},
			],
			btnText:"下注",
			selectedShow:false,
			shadowShow:false,
		}
	},
	created :function(){

	},
	mounted:function(){

	},
	methods: { //无缓存
		goback(){
			this.$router.go(-1)
		},
		checked(){
			this.isUnchecked = false
			this.isChecked = true
		},
		togglee(){
			this.helpShow = !this.helpShow
			this.playShow = false
			this.oldIssueShow = false
			this.shadowShow = !this.shadowShow
		},
		switcher(){
			this.playShow = !this.playShow
			this.helpShow = false
			this.oldIssueShow = false
			this.shadowShow = !this.shadowShow
		},
		selected(play,index){
			let me = this
			this.$nextTick(function(){
				this.playList.forEach(function(item){
					me.$set(item,'active',false)
				})
				me.$set(play,'active',true)
			})
			this.playShow = false
			this.shadowShow = !this.shadowShow
		},
		oldeIssue(){
			this.oldIssueShow = !this.oldIssueShow
			this.playShow = false
			this.helpShow = false
			this.shadowShow = !this.shadowShow
		},
		btnToggle(){
			if(this.btnText='下注'){
				this.btnText = "确定"
				this.$router.push('lotteryBettingList')
			}
			this.selectedShow =true
			
		}
	},
	computed: { //缓存，

	},
	watch: { //数据监听

	},
	components: { //模板

	},
	activated:function(){
//		console.log('Lottery激活事件')
	},

	beforeRouteEnter(to, from, next) { //渲染页面前执行
//		console.log('进入' + to.name + '组件前');
		next();
	},
	beforeRouteUpdate(to, from, next) { //页面切换如：在/foo/1和/foo/2之间跳转
//		console.log('组件切换数据');
		next();
	},
	beforeRouteLeave(to, from, next) { //离开时执行
//		console.log('离开组件');
		next();
	}

}
</script>

<style lang="less">
	.daohao-wrap{
		.betHeader{
			padding-right:.2rem;
			text-align: left;
			.playName{
				margin-left:.36rem;
			}
			.playName,.playNames{
				font-weight: normal;
				.icon-riangle{
					display: inline-block;
					width:0;
					height:0;
					overflow:hidden;
					font-size:0;
					border-right:.06rem solid #fff;
					border-top:.06rem dashed transparent;
				}
			}
			.icon-help{
				position: absolute;
				top: 0;
				right: 0;
				font-size:.2rem;
				font-weight: normal;
				padding:0 .2rem;
			}
			.helpBox,.playBox{
				width:100%;
				background:#fff;
				position: absolute;
				top:.44rem;
				left:0;
				text-align: center;
				font-size:0;
				z-index: 98;
				a{
					display:block;
					width:100%;
					height:.4rem;
					line-height:.4rem;
					color:#212121;
					font-size:.14rem;
					border-bottom:1px solid #e0e0e0;
				}
			}
			.playBox li.unactive,
			.playBox li.active{
				width:33.3333%;
				height:.44rem;	
				line-height:.44rem;
				font-size:.14rem;
				color:#212121;
				display: inline-block;
				vertical-align: middle;
				margin:.01rem 0;	 
			}
			.playBox li.active{
				border:1px solid #fc5159;
				color:red;
				position: relative;
				.icon-hook{
					position: absolute;
					bottom:0;
					right:0;
					width:0;
					height:0;
					overflow:hidden;
					font-size:0;
					border-right:.22rem solid #fc5159;
					border-top:.22rem dashed transparent;				
				}
				.icon-duigou{					
					font-size:.08rem;
					position: absolute;
					bottom:0;
					right:0;
					color:#fff;	
					line-height:1;
				}
			}			
		}
		.shadow{
			width:100%;
			height:100%;
			background:rgba(0,0,0,0.5);
			position: absolute;
			top:0;
			left:0;
			z-index: 98;
		}
		.betBox{
			margin-top:.86rem;
			.info-time{
				width:100%;
				position:fixed;
				top:.44rem;
				left:0;
				z-index:98;
				.issueInfo{
					width:99.6%;
					height:.3rem;
					line-height:.3rem;
					background: #fff;
					padding:0 .2rem;
					display: flex;
					justify-content: space-between;	
					border-bottom:1px solid #e6e4e5;
					span{
						font-size:.13rem;
						color:#212120;
						i{
							margin-right:.1rem;
							font-size:.14rem;
							color:#989796;
						}
						b{
							color:#ef1823;
							font-weight: normal;
						}
					}					
				}
				.oldIssueInfo{
					width:100%;
					border:none;
					height:.3rem;
					line-height:.3rem;
					background: #fff;
					padding:0 .2rem;
					display: flex;
					justify-content: space-between;
					span{
						font-size:.13rem;
						color:#979694;
					}
					.oldNum{
						color:#3f95de;
						font-size:.1rem;
					}
				}
				.oldIssueInfo:nth-child(even){
					background:#f9f9f9;
				}	
				.arrowDown{
					position: relative;
					height:.12rem;
					b{
						display:block;
						width:0;
						height:0;
						overflow:hidden;
						font-size:0;
						border-width:.08rem;
						border-color:#fff transparent transparent transparent;
						border-style:solid dashed dashed dashed;
						margin:0 auto;
					}
					.icon-fanhui-copy{
						position: absolute;					
						top:-0.06rem;
						left:50%;
						margin-left:-.08rem;
						color:#a8a8a8;	
					}
				}	
			}
			.chooseNum{
				width:94%;
				margin:0 auto .1rem;
				padding:.15rem .1rem .08rem .1rem;
				background:#fff;
				-webkit-border-radius: .05rem;
				-moz-border-radius: .05rem;
				border-radius: .05rem;
				.digits{
					display:flex;
					justify-content: space-between;
					margin-bottom:.14rem;
					p{
						b{
							font-size:.17rem;
							color:#212120;
							font-weight: normal;
						}
						i{
							font-size:.13rem;
							color:#666;
						}
					}
					.machineSelection{
						height:.22rem;
						line-height:.22rem;
						background: #cdcccc;
						color:#fff;
						font-size:.12rem;
						text-align: center;
						-webkit-border-radius: .03rem;
						-moz-border-radius: .03rem;
						border-radius: .03rem;	
						padding:0 .04rem;
					}			
				}
				.number{
					font-size: 0;
					-webkit-text-size-adjust:none;
					li{
						display:inline-block;
						vertical-align: middle;
						width:.37rem;
						height:.56rem;
						margin:0 .1rem .14rem 0;
						p{
							width:.37rem;
							height:.37rem;
							line-height:.37rem;
							-webkit-border-radius: 50%;
							-moz-border-radius: 50%;
							border-radius: 50%;
							background: url("~@/assets/img/numberPlate-default.png") no-repeat center 0;
							background-size:100% 100%;
							text-align: center;	
							color:#ef1823;	
							font-size:.17rem;				
						}
						span{
							display: block;
							text-align: center;
							line-height:1;
							margin-top:.09rem;
							font-size:.13rem;
							color:#989796;
						}
					}
					.checked p{
						color:#fff;
						background: url("~@/assets/img/numberPlate-selected.png") no-repeat center 0;
						background-size:100% 100%;
					}
				}
			}
			.footerInfo{
				position: fixed;
				bottom:0;
				left:0;
				width:100%;
				height:.49rem;
				line-height:.49rem;
				background: #fff;
				display: flex;
				justify-content: space-between;
				z-index: 99999;
				.clear{
					display: inline-block;
					height:100%;
					.icon-qingchu{
						padding:0 .15rem;
						font-size:.22rem;
						border-right:1px solid #d9d9d9;
					}					
				}
				.chooseResult{
					font-size:.16rem;
					color:#666564;
					text-align: center;
					i{
						font-size:.13rem;
						color:#ef1823;
					}
					b{
						font-size:.13rem;
						color:#fc5159;
						font-weight: normal;
					}
				}
				.btn{
					width:.6rem;
					height:.34rem;
					line-height:.34rem;
					background:#ef1823;
					color:#fff;
					font-size:.16rem;
					text-align: center;
					-webkit-border-radius: .05rem;
					-moz-border-radius: .05rem;
					border-radius: .05rem;
					margin:.075rem .1rem;
				}
			}
			.selectedResult{
				position: absolute;
				bottom:.49rem;
				left:0;
				width:100%;
				text-align: center;
				background: #fff;
				p{				
					border-bottom:1px solid #e1e1e1;
					
				}
			}
		}		
	}
</style>
