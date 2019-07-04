<template>
	<div class="daohao-wrap">
		<header class="noticeHeader">
			<span onclick="history.go(-1)" class="iconfont icon-fanhui">&#xe614;</span>
			<span>公告</span>			
		</header>	
		<div class="noticeDetailBox">
			<div class="noticeDetailTop">
				<h2>{{BulletinTitle}}</h2>
				<p class="topInfo">
					<span>{{goodLuck}}</span>
					<span>{{CreateDateTime}}</span>
				</p>
			</div>
			<div class="noticeTxt">
				<p class="txtKeynote">{{BulletinSubject}}</p>
				<p class="txtContent">{{BulletinDetail}}</p>	
				<p class="txtSign">{{BulletinSignature}}</p>
				<p class="txtDate">{{CreateDate}}</p>
			</div>
		</div>
	</div>
</template>

<script>
	
export default {
	name: 'noticeDetail',
	data() { //页面数据
		return {
			goodLuck:'时来运转',
			BulletinTitle:'',    //公告标题
			BulletinSubject:'',    //公告主旨
			BulletinDetail:'',    //公告细节内容
			BulletinSignature:'',    //时来运转团队
			CreateDateTime:'',    //公告日期时间
			CreateDate:'',    //公告日期
		}
	},
	created() { //初始化
		this.fetchData();
	},
	mounted: function() {

	},
	methods: {
		fetchData(){
			let me= this;
			this.base.getData(this,this.host+'/api/GetExportBulletinDetailByBulletinId',{'SystemCode':'DQExport',
				'BulletinId':this.$route.query.id,},function(data){	
							
				me.BulletinTitle = data.ActionCode.BulletinTitle  //公告标题
				me.BulletinSubject = data.ActionCode.BulletinSubject  //公告主旨
				me.BulletinDetail = data.ActionCode.BulletinDetail  //公告细节内容
				me.BulletinSignature = data.ActionCode.BulletinSignature  //时来运转团队
				me.CreateDateTime = data.ActionCode.CreateDateTime.split('/').join('-')  //公告日期时间
				me.CreateDate = me.CreateDateTime.split(' ')[0]  //公告日期
			
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
		.noticeDetailBox{
			width:100%;
			height:100%;
			background: #fff;
			position:absolute;
			top:.44rem;
			left:0;
			overflow-y:scroll;
			padding-bottom:.55rem;			
			.noticeDetailTop{
				width:100%;
				height:.5rem;
				border-bottom:1px solid #ddd;
				text-align: center;
				padding-top:.05rem;
				h2{
					line-height:.24rem;
					font-size:.15rem;
					color:#333; 
				}
				.topInfo{
					line-height:.22rem;
					font-size:.12rem;
					color:#999; 
					span{
						padding:0 .05rem;					
					}  
				}
			}
			.noticeTxt{
				padding:.04rem .17rem 0 .18rem;	
				p{
					line-height:.23rem;
					font-size:.13rem;
					color:#333;
					margin-bottom:1px;
				}
				.txtContent{
					text-indent: .24rem;
				}
				.txtSign,.txtDate{
					text-align: right;
				}
			}
		}
		.noticeDetailBox::-webkit-scrollbar{
			display: none;
		}
	}
</style>