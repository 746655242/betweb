<template>
    <div class="mineWrap">
		<header class="myExpertsHeader">
			<span onclick="history.go(-1)" class="iconfont icon-fanhui">&#xe614;</span>
			<span>战绩</span>
			<i class="iconfont icon-shuaxin headerRight">&#xe6d1;</i>
		</header>
		<div class="recordBox">
			<div class="recordInfo" v-for="(items,index) in recordlist" :key="index">
				<div class="recordDate">
					<span>{{items.recordDate}}</span>
				</div>
				<ul class="recordDetails">
					<li class="recordTotal" v-for="(item,idx) in items.recordDetails">
						<p>{{item.text}}</p>
						<span>{{item.num}}</span>
					</li>
				</ul>
			</div>
		</div>
    </div>
</template>

<script>
const recordList = [
	{
		recordDate:'12月份',
		recordDetails:[
			{
				text:'总',
				num:66
			},
			{
				text:'胜',
				num:48
			},
			{
				text:'负',
				num:18
			},
		]
	},
	{
		recordDate:'11月份',
		recordDetails:[
			{
				text:'总',
				num:66
			},
			{
				text:'胜',
				num:48
			},
			{
				text:'负',
				num:18
			},
		]
	},
	{
		recordDate:'10月份',
		recordDetails:[
			{
				text:'总',
				num:66
			},
			{
				text:'胜',
				num:48
			},
			{
				text:'负',
				num:18
			},
		]
	},
	{
		recordDate:'9月份',
		recordDetails:[
			{
				text:'总',
				num:66
			},
			{
				text:'胜',
				num:48
			},
			{
				text:'负',
				num:18
			},
		]
	},
	{
		recordDate:'8月份',
		recordDetails:[
			{
				text:'总',
				num:66
			},
			{
				text:'胜',
				num:48
			},
			{
				text:'负',
				num:18
			},
		]
	},
	{
		recordDate:'7月份',
		recordDetails:[
			{
				text:'总',
				num:66
			},
			{
				text:'胜',
				num:48
			},
			{
				text:'负',
				num:18
			},
		]
	},
	{
		recordDate:'6月份',
		recordDetails:[
			{
				text:'总',
				num:66
			},
			{
				text:'胜',
				num:48
			},
			{
				text:'负',
				num:18
			},
		]
	},
	{
		recordDate:'5月份',
		recordDetails:[
			{
				text:'总',
				num:66
			},
			{
				text:'胜',
				num:48
			},
			{
				text:'负',
				num:18
			},
		]
	},
	{
		recordDate:'4月份',
		recordDetails:[
			{
				text:'总',
				num:66
			},
			{
				text:'胜',
				num:48
			},
			{
				text:'负',
				num:18
			},
		]
	},
	{
		recordDate:'3月份',
		recordDetails:[
			{
				text:'总',
				num:66
			},
			{
				text:'胜',
				num:48
			},
			{
				text:'负',
				num:18
			},
		]
	},
	{
		recordDate:'2月份',
		recordDetails:[
			{
				text:'总',
				num:66
			},
			{
				text:'胜',
				num:48
			},
			{
				text:'负',
				num:18
			},
		]
	},
	{
		recordDate:'1月份',
		recordDetails:[
			{
				text:'总',
				num:66
			},
			{
				text:'胜',
				num:48
			},
			{
				text:'负',
				num:18
			},
		]
	},
]
export default {
	name:'record',
    data(){
        return {
			recordlist:recordList,
        }
    },
    created(){
    	//		this.fetchData();
    },
    mounted(){

    },
    methods: {
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
	
	.recordBox{  
	    position: absolute;
	    top: .44rem;
	    left: 0;
	    width: 100%;
	    height: 100%;
	    overflow-y: scroll;
	    padding: .1rem .15rem .45rem;
		.recordInfo{
			width:100%;
			height: .88rem;
			-webkit-border-radius: .05rem;
			-moz-border-radius: .05rem;
			border-radius: .05rem;
			background: #fff;
			margin-bottom:.1rem;
			font-size:0;
			padding:.14rem 0;
			font-weight:bold;
			overflow:hidden;
			.recordDate{
				width:24%;
				float: left;
				text-align: center;		
				span{
					display: inline-block;
					width:100%;
					height: .6rem;
					line-height: .6rem;
					border-right: 1px solid #ddd;
					font-size:.16rem;
					color:#666;
				}
			}
			.recordDetails{
				float: right;
				width:76%;
				display: flex;
				justify-content: space-around;
				
				li{
					display: inline-block;
					vertical-align: middle;
					font-size:.15rem;
					color:#666;
					p{
						line-height: .32rem;
					}
					span{
						line-height: .28rem;
					}
				}
				li:nth-child(2){
					color:#ef1823;
				}
			}
		}
	}
	.recordBox::-webkit-scrollbar{
		display: none;
	}
}
</style>