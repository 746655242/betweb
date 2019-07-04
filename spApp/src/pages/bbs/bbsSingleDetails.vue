<template>
    <div class="daohao-wrap">
        <header class="singleDetailsHeader">
            <span onclick="history.go(-1)" class="iconfont icon-fanhui">&#xe614;</span>
            <span>晒单详情</span>
        </header>
        <div class="singleDetailsBox">
        	<div class="singleDetails" v-for="(item,index) in singlelist" :key="index">
        		<div class="singleImg"><img :src="item.signleImg"></div>
        		<div class="talent-info">
        			<div class="talent-photo"><img :src="item.talentPhoto"></div>
        			<div class="talent-name">
        				<h2>{{item.talentName}}</h2>
        				<span>{{item.talentTime}}</span>
        			</div>
        		</div>
        		<div class="article-info">
        			<h3>{{item.title}}</h3>
        			<p>{{item.content}}</p>
        		</div>
        	</div>
        	
        	<div class="commentsBox" v-for="(items,index) in commentlist" :key="index">
        		<p class="allComments">
        			<b>{{items.allComments}}</b>
        			<span><i class="iconfont icon-paixu">&#xe643;</i>{{items.sort}}</span>
        		</p>
        		<ul class="commentCont">
        			<li v-for="(item,idx) in items.content" :key="idx">
        				<div class="commentPhoto"><img :src="item.commentPhoto"></div>
        				<div class="commentInfo">
        					<div class="commentName">
        						<h2>{{item.commentName}}</h2>
        						<span>{{item.commentTime}}</span>
        					</div>
        					<p class="commentTxt">{{item.commentContent}}</p>
        				</div>
        			</li>
        		</ul>
        		
        	</div>	
        </div>
        <footer class="writeComment">
        	<input class="writeInput" type="text" placeholder="写评论......"/>
        	<input class="sendBtn" type="submit" value="发送" />
        </footer>

    </div>
</template>

<script>
	const singleList = [
		{
			signleImg:'~@/assets/img/digitalTalentImg.jpg',
			talentPhoto:'~@/assets/img/theFirstPhoto.png',
			talentName:'数字达人1',
			talentTime:'12:00',
			title:'标题标题标题',
			content:'研究这个，研究那个，终于中了......研究这个，研究那个，终于中了......研究这个，研究那个，终于中了......'
		}
	]
	const commentList = [
		{
			allComments:'全部评论',
			sort:'按顺序',
			content:[
				{
					commentPhoto:'~@/assets/img/theFirstPhoto.png',
					commentName:'评论1',
					commentTime:'12:00',
					commentContent:'研究这个，研究那个，终于中了研究这个，研究那个，终于中了'
				},
				{
					commentPhoto:'~@/assets/img/theFirstPhoto.png',
					commentName:'评论2',
					commentTime:'12:00',
					commentContent:'研究这个，研究那个，终于中了研究这个，研究那个，终于中了'
				},
				{
					commentPhoto:'~@/assets/img/theFirstPhoto.png',
					commentName:'评论3',
					commentTime:'12:00',
					commentContent:'研究这个，研究那个，终于中了研究这个，研究那个，终于中了'
				},
			]
		}
		
	]
	export default {
		name: 'bbsSingleDetails',
		data() { //页面数据
			return {
				singlelist:singleList,
				commentlist:commentList,
			}
		},
		created: function() { //初始化
			this.fetchData();
		},
		mounted: function() {

		},
		methods: {
			fetchData(){
				let me= this;
				this.axios.post(this.host+'/api/GetExportBulletinByDateInterval',me.base.parameters({
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
		computed: { //缓存，

		},
		watch: { //数据监听
		},
		components: { //模板

		},
		activated:function(){
			
		},
		beforeRouteEnter(to, from, next) { //渲染页面前执行
//			console.log('进入' + to.name + '组件前');
			next();
		},
		beforeRouteUpdate(to, from, next) { //页面切换如：在/foo/1和/foo/2之间跳转
//			console.log('组件切换数据');
			next();
		},
		beforeRouteLeave(to, from, next) { //离开时执行
//			console.log('离开组件');
			next();
		}

	}
</script>

<style lang="less">
.daohao-wrap{
	.singleDetailsBox{
		padding-top:.44rem;
		.singleDetails{
			background: #fff;
			border-bottom:1px solid #ddd;
			margin-bottom:.1rem;
			.singleImg{
				width:100%;
				height:1.8rem;
				img{
					width:100%;
					height:100%;
				}
			}
			.talent-info{
				position: relative;
				padding:.08rem 0 .11rem .56rem; 
				border-bottom:1px solid #ddd;
				.talent-photo{
					width:.32rem;
					height:.32rem;
					-webkit-border-radius: 50%;
					-moz-border-radius: 50%;
					border-radius: 50%;
					overflow: hidden;
					position: absolute;
					top:.09rem;
					left:.15rem;
					img{
						width:100%;
						height:100%;
					}
				}
				.talent-name{
					font-size:0;
					h2{
						font-size:.14rem;
						color:#555;
						line-height:1;	
						margin-bottom:.075rem;
					}
					span{
						font-size:.12rem;
						color:#999;
						line-height:1;
					}
				}
			}
			.article-info{
				padding: .14rem .23rem .21rem .15rem;
				h3{
					font-size:.15rem;
					color:#555;
					line-height:1; 
					margin-bottom:.15rem;
				}
				p{
					font-size:.15rem;
					color:#666;
					line-height:.18rem;
				}
			}
		}
		.commentsBox{
			background: #fff;
			.allComments{
				height:.4rem;
				line-height:.4rem;
				display:flex;
				justify-content: space-between;	
				padding:0 .15rem;
				border-bottom:1px solid #ddd;
				b{
					font-size:.16rem;
					color:#555;
				}
				span{
					font-size:.14rem;
					color:#bbb;
					.icon-paixu{
						margin-right:.05rem;
					}
				}
			}
			.commentCont{			
				padding-bottom:.4rem;
				li{
					padding:.15rem 0 0 .57rem;
					position:relative;			
					.commentPhoto{ 
						width:.32rem;
						height:.32rem;
						-webkit-border-radius: 50%;
						-moz-border-radius: 50%;
						border-radius: 50%;
						overflow:hidden;
						position: absolute;
						top:.15rem;
						left:.15rem;
						img{
							width:100%;
							height:100%;
						}
					}
					.commentInfo{
						display: inline-block;
						border-bottom:1px solid #ddd;
						padding-bottom:.1rem;
						.commentName{
							margin-bottom:.175rem;
							h2{
								font-size:.14rem;
								color:#555; 
								line-height:1;
								margin-bottom:.075rem;
							}
							span{
								display: block;
								font-size:.12rem;
								color:#999;
								line-height:1;
							}
						}
						.commentTxt{
							line-height: .17rem;
							font-size: .14rem;
							color:#555;
						}
					}
				}
			}
		}
	}
	.writeComment{	
		width:100%;
		background: #fff;
		position: fixed;
		bottom: 0;
		left:0;
		border-top:1px solid #ddd;
		padding:.05rem .075rem;
		font-size:0;
		input{
			display: inline-block;
			height:.35rem;
			line-height:.35rem;
			font-size:.15rem;
			-webkit-border-radius: .05rem;
			-moz-border-radius: .05rem;
			border-radius: .05rem;
		}
		.writeInput{
			width: 78%;
			background: #ddd;
			color:#bbb;
			margin-right:.075rem;
			text-indent: .11rem;
		} 
		.sendBtn{
			padding:0 .13rem; 
			background:#ef1823;
			color:#fff;
			text-align: center;
		}
	}
}
</style>