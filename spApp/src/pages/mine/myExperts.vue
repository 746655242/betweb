<template>
    <div class="mineWrap">
		<header class="myExpertsHeader">
			<span onclick="history.go(-1)" class="iconfont icon-fanhui">&#xe614;</span>
			<span>我的专家</span>
			<i class="iconfont icon-shuaxin">&#xe6d1;</i>
		</header>
		<div class="myExpertsCont">
			<div class="expertsInfo">
				<div class="InfoTit">
					<div class="expertsName">
						<p>我是专家<span>(数字)</span></p>
						<i class="iconfont icon-fanhui-copy" @click="infoDetails">&#xe600;</i>
					</div>
					<router-link to="/publishArticle">发表文章</router-link>
				</div>
				<div class="infoDetails" v-show="infoShow">
					<router-link to="/publishedHistory" class="publishedHistory">
						<p class="itemName"><span>发表历史</span></p>
						<p class="itemResult">220</p>
					</router-link>
					<router-link to="/record" class="record">
						<p class="itemName"><span>战绩</span></p>
						<p class="itemResult">
							<span>胜<i>12</i></span>
							<span>负<i>6</i></span>
						</p>
					</router-link>
					<router-link to="/earnings" class="earnings">
						<p class="itemName"><span>收益</span></p>
						<p class="itemResult">¥600</p>
					</router-link>
				</div>
			</div>
			
			<div class="expertsInfo">
				<div class="InfoTit">
					<div class="expertsName">
						<p>我是专家<span>(数字)</span></p>
						<i class="iconfont icon-fanhui-copy" @click="infoDetails">&#xe600;</i>
					</div>
					<router-link to="/publishArticle">发表文章</router-link>
				</div>
				<div class="infoDetails" v-show="infoShow">
					<router-link to="/publishedHistory" class="publishedHistory">
						<p class="itemName"><span>发表历史</span></p>
						<p class="itemResult">220</p>
					</router-link>
					<router-link to="/record" class="record">
						<p class="itemName"><span>战绩</span></p>
						<p class="itemResult">
							<span>胜<i>12</i></span>
							<span>负<i>6</i></span>
						</p>
					</router-link>
					<router-link to="/earnings" class="earnings">
						<p class="itemName"><span>收益</span></p>
						<p class="itemResult">¥600</p>
					</router-link>
				</div>
			</div>
		</div>	
    </div>
</template>

<script>
export default {
	name:'myExperts',
    data(){
        return {
			infoShow:false,
        }
    },
    created(){
    	//		this.fetchData();
    },
    mounted(){

    },
    methods: {
		infoDetails(){
			this.infoShow = !this.infoShow
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
			
			
			/* 我的申请-->类型+专长 */
			this.axios.post(this.host+'/api/MemberApplyPfUserInitial',me.base.parameters({
					MemberToken:localStorage.token,
					OperateIp:this.$store.state.user.ip
				}))
			.then((res) => {
				let req = JSON.parse(res.data.ViewModel)
				let ActionCode = req.ActionCode
					console.log(ActionCode)
				let LstSelectOptForGameType = ActionCode.LstSelectOptForGameType
					me.LstSelectOptForGameType = LstSelectOptForGameType


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
		display: flex;
		justify-content: space-between;
		.return,.icon-shuaxin{			
			padding:0 .15rem;
			.icon-fanhui{
				font-size:.2rem;
			}
		}
		.icon-shuaxin{
			font-size:.19rem;
			color:#fff;
		}
	}
	.myExpertsCont{
		padding:.54rem .15rem 0;
		.expertsInfo{
			width:100%;
			height: auto;
			margin-bottom:.1rem;
			-webkit-border-radius: .1rem;
			-moz-border-radius: .1rem;
			border-radius: .1rem;
			overflow: hidden;
			.InfoTit{
				background: #fff;
				height: .6rem;
				padding: 0 .15rem 0 .175rem;
				display: flex;
				justify-content: space-between;
				.expertsName{
					 margin-top:.175rem;
					p{
						font-size:.16rem;
						color: #666;
						line-height: 1;
						span{
							font-size:.13rem;
						}
					}
					.icon-fanhui-copy{
						font-size:.065rem;
						color:#bcbcbc;
						margin-left:.17rem;		
					}
				}
				a{
					display: block;
					width: .68rem;
					height: .21rem;
					line-height: .21rem;
					text-align: center;
					border: 1px solid #ef1823;
					-webkit-border-radius: .105rem;
					-moz-border-radius: .105rem;
					border-radius: .105rem;
					font-size:.12rem;
					color:#ef1823;
					margin-top:.19rem;
				}
			}
			.infoDetails{
				width:100%;
				a{
					display: block;
					width:100%;
					height:.45rem;
					line-height: .45rem;
					color: #555;
					font-size:0;
					p{
						display: inline-block;
						vertical-align: middle;
						text-align: center;
					}
					.itemName{
						width:26%;
						font-size:.14rem;							
						span{
							display: inline-block;
							width:100%;
							height: .19rem;
							line-height:.19rem;
							border-right:1px solid #ddd;
						}					
					}
					.itemResult{
						width:74%;
						font-size:.12rem;
					}
				}
				a.publishedHistory,a.earnings{
					background:#e6e6e6;
				}
				a.record{
					background:#f5f5f5;
					.itemResult{
						span{
							display: inline-block;
							width:49%;
						}					
					}
				}
			}
		}
	}
}
</style>