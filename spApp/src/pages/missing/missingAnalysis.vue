<template>
    <div class="serveWrap">
       	<header class="missingAnalysisHeader">
       		<span onclick="history.go(-1)" class="iconfont icon-fanhui">&#xe614;</span>
       		<span>遗漏分析</span>
       	</header>
       	<div class="missingAnalysisContent">
       		<div class="screen">
       			<!--  遗漏  开奖历史    tab切换-->
	       		<ul class="tabBox">
					<li :class="{active:item.isActive}" v-for="(item,index) in tablist" :key="index" @click="tabsSwitch(index)">
						<span>{{item.tabName}}</span>	
					</li>
				</ul>
				<!-- 分类  彩种  期数   筛选-->
				<div class="screenBox">
					<ul class="screenCont">
						<!--<li v-for="(item,index) in screenlist" :key="index">
							<span>{{item.screenName}}</span>
							<i class="iconfont icon-tri-down">&#xe609;</i>
						</li>-->
						<li @click="classificationClick">
							<span>分类</span><i class="iconfont icon-tri-down">&#xe609;</i>
						</li>
						<li @click="speciesClick">
							<span>彩种</span><i class="iconfont icon-tri-down">&#xe609;</i>
						</li>
						<li @click="issueClick">
							<span>期数</span><i class="iconfont icon-tri-down">&#xe609;</i>
						</li>
					</ul>
					<div class="subdivide">
						<ul class="lotteryInfo" v-show="classificationShow">
							<li v-for="(items,index) in lotteryInfolist" :key="index">{{items.classification}}</li>
						</ul>
						<ul class="lotteryInfo" v-show="speciesShow" v-for="(items,index) in lotteryInfolist" :key="index">
							<li v-for="(item,idx) in items.species" :key="idx">{{item}}</li>
						</ul>
						<ul class="lotteryInfo" v-show="issueShow">
							<li v-for="(item,index) in lotteryIssuelist" :key="index">{{item}}</li>
						</ul>
					</div>				
				</div>	
       		</div>
       							
			<!-- 彩票种类名称  -->
			<div class="lotteryTypes">福彩3D</div>
			<div class="informationBox">
				<!-- 遗漏Box -->
				<div class="information" style="display: block;">
					<!-- 福彩3D -->
					<div class="missingWrap">
						<div class="missingBox digitsAndNumber" v-for="(items,index) in fc3dMissinglist" :key="index">
							<div class="digits">
								<span>{{items.digits}}</span>
							</div>
							<ul class="numbers">
								<li :class="item.className" v-for="(item,idx) in items.numlist" :key="idx">
									<p>{{item.pNum}}</p>
									<span>{{item.spNum}}</span>
								</li>
							</ul>
						</div>
					</div>	
					<!-- 重庆时时彩 -->
					<div class="missingWrap">
						<div class="missingBox digitsAndNumber" v-for="(items,index) in cqsscMissinglist" :key="index">
							<div class="digits">
								<span>{{items.digits}}</span>
							</div>
							<ul class="numbers">
								<li :class="item.className" v-for="(item,idx) in items.numlist" :key="idx">
									<p>{{item.pNum}}</p>
									<span>{{item.spNum}}</span>
								</li>
							</ul>
						</div>
					</div>
					<!-- 广东11选5 -->
					<div class="missingWrap">
						<ul class="missingBox chooseFive">				
							<li :class="items.className"  v-for="(items,index) in gd11x5Missinglist" :key="index">
								<p>{{items.pNum}}</p>
								<span>{{items.spNum}}</span>
							</li>
						</ul>
					</div>
					<!-- 双色球 -->
					<div class="missingWrap">
						<div class="missingBox doubleClor"  v-for="(items,index) in ssqMissinglist" :key="index">
							<ul class="redBall">
								<li :class="item.className" v-for="(item,idx) in items.redBall" :key="idx">
									<p>{{item.pNum}}</p>
									<span>{{item.spNum}}</span>
								</li>						
							</ul>
							<ul class="blueBall">
								<li :class="item.className" v-for="(item,idx) in items.blueBall" :key="idx">
									<p>{{item.pNum}}</p>
									<span>{{item.spNum}}</span>
								</li>
							</ul>
						</div>		
					</div>
					<!-- 大乐透 -->
					<div class="missingWrap">
						<div class="missingBox doubleClor"  v-for="(items,index) in dltMissinglist" :key="index">
							<ul class="redBall">
								<li :class="item.className" v-for="(item,idx) in items.redBall" :key="idx">
									<p>{{item.pNum}}</p>
									<span>{{item.spNum}}</span>
								</li>						
							</ul>
							<ul class="blueBall">
								<li :class="item.className" v-for="(item,idx) in items.blueBall" :key="idx">
									<p>{{item.pNum}}</p>
									<span>{{item.spNum}}</span>
								</li>
							</ul>
						</div>		
					</div>
					
					
				</div>
				<!-- 开奖历史Box -->
				<div class="information" style="display: none;">
					<!--福彩3D-->
					<div class="historyWrap">								
						<ul class="historyBox allRed">
							<li v-for="(items,index) in fc3dHistorylist" :key="index">
								<p class="previousIssue">{{items.issue}}</p>
								<div class="previousNum">
									<span v-for="(item,idx) in items.num">{{item}}</span>
								</div>
							</li>
						</ul>
					</div>
					<!--重庆时时彩-->
					<div class="historyWrap">								
						<ul class="historyBox allRed">
							<li v-for="(items,index) in cqsscHistorylist" :key="index">
								<p class="previousIssue">{{items.issue}}</p>
								<div class="previousNum">
									<span v-for="(item,idx) in items.num">{{item}}</span>
								</div>
							</li>
						</ul>
					</div>
					<!--广东11选5-->
					<div class="historyWrap">								
						<ul class="historyBox allRed">
							<li v-for="(items,index) in gd11x5Historylist" :key="index">
								<p class="previousIssue">{{items.issue}}</p>
								<div class="previousNum">
									<span v-for="(item,idx) in items.num">{{item}}</span>
								</div>
							</li>
						</ul>
					</div>
					<!--双色球-->
					<div class="historyWrap">								
						<ul class="historyBox oneBlue">
							<li v-for="(items,index) in ssqHistorylist" :key="index">
								<p class="previousIssue">{{items.issue}}</p>
								<div class="previousNum">
									<span v-for="(item,idx) in items.num">{{item}}</span>
								</div>
							</li>
						</ul>
					</div>
					<!--大乐透-->
					<div class="historyWrap">								
						<ul class="historyBox twoBlue">
							<li v-for="(items,index) in dltHistorylist" :key="index">
								<p class="previousIssue">{{items.issue}}</p>
								<div class="previousNum">
									<span v-for="(item,idx) in items.num">{{item}}</span>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="mask" v-show="maskShow"></div>
		</div>
    </div>
</template>

<script>
import { Tab, TabItem,Swiper,SwiperItem } from 'vux'

//福彩3D 遗漏列表
const fc3dMissingList = [
	{
		digits:'百位',
		numlist:[
			{pNum:'0',spNum:'07',className:''},
			{pNum:'1',spNum:'12',className:'theMiss'},
			{pNum:'2',spNum:'4',className:''},
			{pNum:'3',spNum:'2',className:''},
			{pNum:'4',spNum:'5',className:''},
			{pNum:'5',spNum:'10',className:''},
			{pNum:'6',spNum:'6',className:''},
			{pNum:'7',spNum:'4',className:''},
			{pNum:'8',spNum:'3',className:''},
			{pNum:'9',spNum:'3',className:''},
		]
	},
	{
		digits:'十位',
		numlist:[
			{pNum:'0',spNum:'07',className:'theMiss'},
			{pNum:'1',spNum:'12',className:''},
			{pNum:'2',spNum:'4',className:''},
			{pNum:'3',spNum:'2',className:''},
			{pNum:'4',spNum:'5',className:''},
			{pNum:'5',spNum:'10',className:''},
			{pNum:'6',spNum:'6',className:''},
			{pNum:'7',spNum:'4',className:''},
			{pNum:'8',spNum:'3',className:''},
			{pNum:'9',spNum:'3',className:''},
		]
	},
	{
		digits:'个位',
		numlist:[
			{pNum:'0',spNum:'07',className:''},
			{pNum:'1',spNum:'12',className:'theMiss'},
			{pNum:'2',spNum:'4',className:''},
			{pNum:'3',spNum:'2',className:''},
			{pNum:'4',spNum:'5',className:''},
			{pNum:'5',spNum:'10',className:''},
			{pNum:'6',spNum:'6',className:''},
			{pNum:'7',spNum:'4',className:''},
			{pNum:'8',spNum:'3',className:''},
			{pNum:'9',spNum:'3',className:''},
		]
	},
]
//福彩3D 历史记录列表
const fc3dHistoryList = [
	{ issue:'2017168期',num:['3','5','7'] },
	{ issue:'2017167期',num:['7','8','9'] },
	{ issue:'2017166期',num:['3','5','7'] },
	{ issue:'2017165期',num:['0','2','4'] },
	{ issue:'2017164期',num:['4','6','9'] },
]

//重庆时时彩  遗漏列表
const cqsscMissingList = [
	{
		digits:'万位',
		numlist:[
			{pNum:'0',spNum:'07',className:'theMiss'},
			{pNum:'1',spNum:'12',className:''},
			{pNum:'2',spNum:'4',className:''},
			{pNum:'3',spNum:'2',className:''},
			{pNum:'4',spNum:'5',className:''},
			{pNum:'5',spNum:'10',className:''},
			{pNum:'6',spNum:'6',className:''},
			{pNum:'7',spNum:'4',className:''},
			{pNum:'8',spNum:'3',className:''},
			{pNum:'9',spNum:'3',className:''},
		]
	},
	{
		digits:'千位',
		numlist:[
			{pNum:'0',spNum:'07',className:''},
			{pNum:'1',spNum:'12',className:'theMiss'},
			{pNum:'2',spNum:'4',className:''},
			{pNum:'3',spNum:'2',className:''},
			{pNum:'4',spNum:'5',className:''},
			{pNum:'5',spNum:'10',className:''},
			{pNum:'6',spNum:'6',className:''},
			{pNum:'7',spNum:'4',className:''},
			{pNum:'8',spNum:'3',className:''},
			{pNum:'9',spNum:'3',className:''},
		]
	},
	{
		digits:'百位',
		numlist:[
			{pNum:'0',spNum:'07',className:''},
			{pNum:'1',spNum:'12',className:'theMiss'},
			{pNum:'2',spNum:'4',className:''},
			{pNum:'3',spNum:'2',className:''},
			{pNum:'4',spNum:'5',className:''},
			{pNum:'5',spNum:'10',className:''},
			{pNum:'6',spNum:'6',className:''},
			{pNum:'7',spNum:'4',className:''},
			{pNum:'8',spNum:'3',className:''},
			{pNum:'9',spNum:'3',className:''},
		]
	},
	{
		digits:'十位',
		numlist:[
			{pNum:'0',spNum:'07',className:'theMiss'},
			{pNum:'1',spNum:'12',className:''},
			{pNum:'2',spNum:'4',className:''},
			{pNum:'3',spNum:'2',className:''},
			{pNum:'4',spNum:'5',className:''},
			{pNum:'5',spNum:'10',className:''},
			{pNum:'6',spNum:'6',className:''},
			{pNum:'7',spNum:'4',className:''},
			{pNum:'8',spNum:'3',className:''},
			{pNum:'9',spNum:'3',className:''},
		]
	},
	{
		digits:'个位',
		numlist:[
			{pNum:'0',spNum:'07',className:''},
			{pNum:'1',spNum:'12',className:'theMiss'},
			{pNum:'2',spNum:'4',className:''},
			{pNum:'3',spNum:'2',className:''},
			{pNum:'4',spNum:'5',className:''},
			{pNum:'5',spNum:'10',className:''},
			{pNum:'6',spNum:'6',className:''},
			{pNum:'7',spNum:'4',className:''},
			{pNum:'8',spNum:'3',className:''},
			{pNum:'9',spNum:'3',className:''},
		]
	},
]
//重庆时时彩  历史记录列表
const cqsscHistoryList = [
	{ issue:'2017168期',num:['3','5','7','8','9'] },
	{ issue:'2017167期',num:['7','8','9','3','5'] },
	{ issue:'2017166期',num:['3','5','7','0','2'] },
	{ issue:'2017165期',num:['0','2','4','5','7'] },
	{ issue:'2017164期',num:['4','6','9','7','8'] },
]

//广东11选5   遗漏列表
const gd11x5MissingList = [
		{pNum:'01',spNum:'1',className:''},
		{pNum:'02',spNum:'07',className:''},
		{pNum:'03',spNum:'12',className:'theMiss'},
		{pNum:'04',spNum:'4',className:''},
		{pNum:'05',spNum:'2',className:''},
		{pNum:'06',spNum:'5',className:''},
		{pNum:'07',spNum:'10',className:''},
		{pNum:'08',spNum:'5',className:''},
		{pNum:'09',spNum:'6',className:''},
		{pNum:'10',spNum:'4',className:''},
		{pNum:'11',spNum:'3',className:''},
]
//广东11选5   历史记录列表
const gd11x5HistoryList = [
	{ issue:'2017168期',num:['3','5','7','8','9'] },
	{ issue:'2017167期',num:['7','8','9','3','5'] },
	{ issue:'2017166期',num:['3','5','7','0','2'] },
	{ issue:'2017165期',num:['0','2','4','5','7'] },
	{ issue:'2017164期',num:['4','6','9','7','8'] },
]

//双色球  遗漏列表
const ssqMissingList = [
	{
		redBall:[
			{pNum:'01',spNum:'1',className:''},
			{pNum:'02',spNum:'07',className:''},
			{pNum:'03',spNum:'12',className:''},
			{pNum:'04',spNum:'4',className:''},
			{pNum:'05',spNum:'2',className:''},
			{pNum:'06',spNum:'5',className:''},
			{pNum:'07',spNum:'10',className:''},
			{pNum:'08',spNum:'5',className:''},
			{pNum:'09',spNum:'6',className:''},
			{pNum:'10',spNum:'4',className:''},
			{pNum:'11',spNum:'3',className:''},
			{pNum:'12',spNum:'1',className:''},
			{pNum:'13',spNum:'07',className:''},
			{pNum:'14',spNum:'12',className:''},
			{pNum:'15',spNum:'4',className:''},
			{pNum:'16',spNum:'2',className:''},
			{pNum:'17',spNum:'5',className:''},
			{pNum:'18',spNum:'10',className:'theMiss'},
			{pNum:'19',spNum:'5',className:''},
			{pNum:'20',spNum:'6',className:''},
			{pNum:'21',spNum:'4',className:''},
			{pNum:'22',spNum:'3',className:''},
			{pNum:'23',spNum:'6',className:''},
			{pNum:'24',spNum:'4',className:''},
			{pNum:'25',spNum:'3',className:''},
			{pNum:'26',spNum:'6',className:''},
			{pNum:'27',spNum:'4',className:''},
			{pNum:'28',spNum:'3',className:''},
			{pNum:'29',spNum:'6',className:''},
			{pNum:'30',spNum:'4',className:''},
			{pNum:'31',spNum:'3',className:''},
			{pNum:'32',spNum:'6',className:''},
			{pNum:'33',spNum:'4',className:''},
		],
		blueBall:[
			{pNum:'01',spNum:'1',className:''},
			{pNum:'02',spNum:'07',className:''},
			{pNum:'03',spNum:'12',className:''},
			{pNum:'04',spNum:'4',className:''},
			{pNum:'05',spNum:'2',className:''},
			{pNum:'06',spNum:'5',className:''},
			{pNum:'07',spNum:'10',className:''},
			{pNum:'08',spNum:'5',className:''},
			{pNum:'09',spNum:'6',className:''},
			{pNum:'10',spNum:'4',className:''},
			{pNum:'11',spNum:'3',className:''},
			{pNum:'12',spNum:'1',className:''},
			{pNum:'13',spNum:'07',className:''},
			{pNum:'14',spNum:'12',className:''},
			{pNum:'15',spNum:'4',className:''},
			{pNum:'16',spNum:'2',className:'theMiss'},
		]
	}
]
//双色球  历史记录列表
const ssqHistoryList = [
	{ issue:'2017168期',num:['3','5','7','8','9','26','12'] },
	{ issue:'2017167期',num:['7','8','9','3','5','26','12'] },
	{ issue:'2017166期',num:['3','5','7','0','2','26','12'] },
	{ issue:'2017165期',num:['0','2','4','5','7','26','12'] },
	{ issue:'2017164期',num:['4','6','9','7','8','26','12'] },
]
//大乐透  遗漏列表
const dltMissingList = [
	{
		redBall:[
			{pNum:'01',spNum:'1',className:''},
			{pNum:'02',spNum:'07',className:''},
			{pNum:'03',spNum:'12',className:''},
			{pNum:'04',spNum:'4',className:''},
			{pNum:'05',spNum:'2',className:''},
			{pNum:'06',spNum:'5',className:''},
			{pNum:'07',spNum:'10',className:''},
			{pNum:'08',spNum:'5',className:''},
			{pNum:'09',spNum:'6',className:''},
			{pNum:'10',spNum:'4',className:''},
			{pNum:'11',spNum:'3',className:''},
			{pNum:'12',spNum:'1',className:''},
			{pNum:'13',spNum:'07',className:''},
			{pNum:'14',spNum:'12',className:''},
			{pNum:'15',spNum:'4',className:'theMiss'},
			{pNum:'16',spNum:'2',className:''},
			{pNum:'17',spNum:'5',className:''},
			{pNum:'18',spNum:'10',className:''},
			{pNum:'19',spNum:'5',className:''},
			{pNum:'20',spNum:'6',className:''},
			{pNum:'21',spNum:'4',className:''},
			{pNum:'22',spNum:'3',className:''},
			{pNum:'23',spNum:'6',className:''},
			{pNum:'24',spNum:'4',className:''},
			{pNum:'25',spNum:'3',className:''},
			{pNum:'26',spNum:'6',className:''},
			{pNum:'27',spNum:'4',className:''},
			{pNum:'28',spNum:'3',className:''},
			{pNum:'29',spNum:'6',className:''},
			{pNum:'30',spNum:'4',className:''},
			{pNum:'31',spNum:'3',className:''},
			{pNum:'32',spNum:'6',className:''},
			{pNum:'33',spNum:'4',className:''},
			{pNum:'34',spNum:'07',className:''},
			{pNum:'35',spNum:'12',className:''},
		],
		blueBall:[
			{pNum:'01',spNum:'1',className:''},
			{pNum:'02',spNum:'07',className:''},
			{pNum:'03',spNum:'12',className:''},
			{pNum:'04',spNum:'4',className:'theMiss'},
			{pNum:'05',spNum:'2',className:''},
			{pNum:'06',spNum:'5',className:''},
			{pNum:'07',spNum:'10',className:''},
			{pNum:'08',spNum:'5',className:''},
			{pNum:'09',spNum:'6',className:''},
			{pNum:'10',spNum:'4',className:''},
			{pNum:'11',spNum:'3',className:''},
			{pNum:'12',spNum:'1',className:''},
		]
	}
]
//大乐透  历史记录列表
const dltHistoryList = [
	{ issue:'2017168期',num:['3','5','7','8','9','26','10'] },
	{ issue:'2017167期',num:['7','8','9','3','5','26','10'] },
	{ issue:'2017166期',num:['3','5','7','0','2','26','10'] },
	{ issue:'2017165期',num:['0','2','4','5','7','26','10'] },
	{ issue:'2017164期',num:['4','6','9','7','8','26','10'] },
]
export default {
    data(){
        return {
			tablist:[
				{
					tabName:"遗漏",
					isActive:true
				},
				{
					tabName:"开奖历史",
					isActive:false
				},
			],
			screenlist:[
				{screenName:'分类',},
				{screenName:'彩种',},
				{screenName:'期数',},
			],

			lotteryInfolist:[
				{
					classification:'彩票',
					species:['重庆时时彩','广东十一选五']
				},
				{
					classification:'数字',
					species:['双色球','大乐透','福彩3D']
				},
				{
					classification:'运彩',
					species:[]
				},
			],
			lotteryIssuelist:['最近5期','最近10期','最近20期'],
			
			maskShow:false,
			classificationShow:false,
			speciesShow:false,
			issueShow:false,
			
			fc3dMissinglist:fc3dMissingList,
			fc3dHistorylist:fc3dHistoryList,
			
			cqsscMissinglist:cqsscMissingList,
			cqsscHistorylist:cqsscHistoryList,
			
			gd11x5Missinglist:gd11x5MissingList,
			gd11x5Historylist:gd11x5HistoryList,
			
			ssqMissinglist:ssqMissingList,
			ssqHistorylist:ssqHistoryList,
			
			dltMissinglist:dltMissingList,
			dltHistorylist:dltHistoryList,
        	
        }
    },
    created(){
    	//		this.fetchData();
    },
    mounted(){

    },
    methods: {
		classificationClick(){
			this.classificationShow = !this.classificationShow
			this.maskShow = !this.maskShow
			this.speciesShow = false
			this.issueShow = false
		},
		speciesClick(){
			this.speciesShow = !this.speciesShow
			this.maskShow = !this.maskShow
			this.classificationShow = false
			this.issueShow = false
		},
		issueClick(){
			this.issueShow = !this.issueShow
			this.maskShow = !this.maskShow
			this.classificationShow = false
			this.speciesShow = false
		},
		tabsSwitch(tabIndex){
			var information = document.querySelectorAll(".information")
			for(var i=0;i<information.length;i++){
				information[i].style.display = "none"
				this.tablist[i].isActive = false
			}
			this.tablist[tabIndex].isActive = true
			information[tabIndex].style.display = "block"
	},
    	fetchData(){
			let me= this;
			this.axios.post(this.host+'/api/GetExportService',me.base.parameters({
					SystemCode:'DQExport',
					OperateIp:this.$store.state.user.ip
				}))
			.then((res) => {
				
				let req = JSON.parse(res.data.ViewModel);	
				let ActionCode = req.ActionCode
					
			})
			.catch((err) => {
				console.log(err)
			})
		}
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
	.missingAnalysisContent{
		padding-top:.44rem;
		.screen{
			position: relative;
			z-index: 2;
			.tabBox,.screenBox{
				width: 100%;
				background:#f7f7f7;
				border-bottom: 1px solid #d6d5d5;
				font-size:0;
				li{
					display: inline-block;
					vertical-align: middle;
					width: 50%;
					height: .4rem;
					line-height: .4rem;
					text-align: center;
					font-size:.15rem;
					color:#666;
				}
			}
			/*遗漏--开奖历史    tab切换*/
			.tabBox{
				li:nth-child(1){				
					background:url("~@/assets/img/border.png") no-repeat  right center;
					background-size: 1px .275rem;
				}
				.active{
					span{
						display: inline-block;
						width: .64rem;
						height:100%;
						border-bottom: 3px solid @red;
					}
				}
			}
			/*分类--彩种--期数     筛选*/
			.screenBox{
				height: .4rem;
				position: relative;
				.screenCont{
					background:#fff;
					height:100%;
					li{
						width: 33.333%;
						line-height: .4rem;
					}
				}
				.lotteryInfo{
					width: 100%;
					position: absolute;
					top: .4rem;
					left: 0;
					z-index: 1;
					li{
						width: 100%;
						height:.39rem;
						line-height:.39rem;
						font-size: .15rem;
						color:#666;
						background: #fff;
						border-bottom: 1px solid #eee;
						padding-left:.15rem;
						text-align: left;
					}
				}
			}
		}
		
		
		
		/*彩种名称*/
		.lotteryTypes{
			width: 100%;
			height: .32rem;
			line-height: .32rem;
			background: #fa891b;
			font-size:.14rem;
			color:#fff;
			padding-left:.15rem;
			margin-top:.05rem;
		}
		/*遗漏--开奖历史    内容切换 */
		.informationBox{
			position: fixed;
			width: 100%;
			height: 100%;
			overflow-y: scroll;
			padding-bottom:1.62rem;
			.information{
			/*遗漏*/
				.missingWrap{
					/*位数+号码*/
					.digitsAndNumber{
						width: 100%;
						background: #fff;
						padding:.1rem .045rem .06rem;
						font-size: 0;
						margin-bottom: .05rem;
						.digits{
							display: inline-block;
							vertical-align: top;
							width: 14%;
							padding:.06rem 0 0 .11rem;
							span{
								display: inline-block;
								width: .355rem;
								height: .2rem;
								line-height: .2rem;
								background: url("~@/assets/img/digitsBg.png") no-repeat center 0;
								background-size: 100% 100%;
								text-indent: .045rem;
								font-size:.12rem;
								color:@red;		
							}							
						}
						.numbers{
							display: inline-block;
							width: 86%;
							li{
								display: inline-block;
								vertical-align: middle;
								width: .31rem;
								height: .49rem;
								text-align: center;
								margin:0 .105rem;
								p{
									width: .3rem;
									height: .3rem;
									line-height: .3rem;
									border: 1px solid @red;
									-webkit-border-radius: 50%;
									-moz-border-radius: 50%;
									border-radius: 50%;
									font-size: .15rem;
									color: @red;
								}
								span{
									display: inline-block;
									width: .15rem;
									height: .15rem;
									line-height: .15rem;
									margin-top:.03rem;
									font-size: .12rem;
									color:#aaa;
								}						
							}
							.theMiss span{
								background: @red;
								-webkit-border-radius: 50%;
								-moz-border-radius: 50%;
								border-radius: 50%;
								color:#fff;
								font-size: .1rem;
							}
						}
					}
					/*十一选五*/
					.chooseFive{
						width: 100%;
						background: #fff;
						padding:.1rem .045rem .06rem;
						margin-bottom: .05rem;
						li{
							display: inline-block;
							vertical-align: middle;
							width: .31rem;
							height: .49rem;
							text-align: center;
							margin:0 .105rem;
							p{
								width: .3rem;
								height: .3rem;
								line-height: .3rem;
								border: 1px solid @red;
								-webkit-border-radius: 50%;
								-moz-border-radius: 50%;
								border-radius: 50%;
								font-size: .15rem;
								color: @red;
							}
							span{
								display: inline-block;
								width: .15rem;
								height: .15rem;
								line-height: .15rem;
								margin-top:.03rem;
								font-size: .12rem;
								color:#aaa;
							}						
						}
						.theMiss span{
							background: @red;
							-webkit-border-radius: 50%;
							-moz-border-radius: 50%;
							border-radius: 50%;
							color:#fff;
							font-size: .1rem;
						}
					}
					/* 红蓝球 */
					.doubleClor{					
						.redBall,.blueBall{
							width: 100%;
							background: #fff;
							padding:.1rem .045rem .06rem;
							margin-bottom:.05rem;
							li{
								display: inline-block;
								vertical-align: middle;
								width: .31rem;
								height: .49rem;
								text-align: center;
								margin:0 .105rem;
								p{
									width: .3rem;
									height: .3rem;
									line-height: .3rem;
									border: 1px solid @red;
									-webkit-border-radius: 50%;
									-moz-border-radius: 50%;
									border-radius: 50%;
									font-size: .15rem;
									color: @red;
								}
								span{
									display: inline-block;
									width: .15rem;
									height: .15rem;
									line-height: .15rem;
									margin-top:.03rem;
									font-size: .12rem;
									color:#aaa;
								}						
							}
							.theMiss span{
								background: @red;
								-webkit-border-radius: 50%;
								-moz-border-radius: 50%;
								border-radius: 50%;
								color:#fff;
								font-size: .1rem;
							}
						}
						.blueBall li p{
							border-color:#4e9bf5;
							color:#4e9bf5;
						}
					}
				}	
				/*开奖历史*/
				.historyWrap{
					/*全是红球*/
					.historyBox{
						margin-bottom:.05rem;
						li{
							width:100%;
							line-height:.51rem;
							background: #fff;
							padding-left:.15rem;
							font-size: 0;
							margin-bottom:.05rem;
							.previousIssue{
								display: inline-block;
								vertical-align: middle;
								width: .775rem;
								font-size: .13rem;
								color:#333;
							}
							.previousNum{							
								display: inline-block;		
								vertical-align: middle;					
								span{
									display: inline-block;
									width: .31rem;
									height: .31rem;
									line-height: .31rem;
									background: #ff4541;
									-webkit-border-radius: 50%;
									-moz-border-radius: 50%;
									border-radius: 50%;
									margin:.1rem .04rem;
									font-size:.15rem;
									color:#fff;
									text-align: center;
								}
							}
						}
					}
					/*双色球  6红1蓝     大乐透 5红2蓝*/			
					.oneBlue li .previousNum span:nth-last-child(1),
					.twoBlue li .previousNum span:nth-last-child(1),
					.twoBlue li .previousNum span:nth-last-child(2){
						background: #4f9cf5;
					}	
				}
			}
		}
		.informationBox::-webkit-scrollbar{
			display: none;
		}	
		.mask{
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,.3);
		}	
	}	
}
</style>