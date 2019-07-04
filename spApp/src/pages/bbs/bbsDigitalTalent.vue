<template>
    <div class="daohao-wrap">
        <header class="digitalTalentHeader">
            <span onclick="history.go(-1)" class="iconfont icon-fanhui">&#xe614;</span>
            <span>数字达人</span>
          <router-link to="/bbsKeynote" class="headerRight"><span class="iconfont icon-tianjia">&#xe60c;</span></router-link>
        </header>
        <div class="digitalTalentBox">
            <ul class="screening">
                <li class="screeningByTime"><span>时间</span><i class="iconfont icon-tri-down">&#xe609;</i></li>
                <li class="screeningByHot"><span>热度</span><i class="iconfont icon-tri-up">&#xe786;</i></li>
            </ul>
            <ul class="digitalTalentCont">
                <li :class="item.className" v-for="(item,index) in singleList" :key="index">
                    <div class="digitalTalentInfo">
                        <div class="talentPhoto"><img :src="item.photo"></div>
                        <div class="talentName">
                            <h2>{{item.name}}</h2>
                            <span>{{item.time}}</span>
                        </div>
                        <div class="comment" @click="gotoDetails">
                            <i class="iconfont icon-pinglun">&#xe655;</i>
                            <span>{{item.comment}}</span>
                        </div>
                    </div>
                    <p class="articleContent" @click="gotoDetails">{{item.articleCont}}</p>
                    <div class="articleImg" @click="gotoDetails">
                        <img :src="item.articleImg">
                        <p class="articleTitle">{{item.articleTitle}}</p>
                        <div class="mask"></div>
                    </div>
                </li>
            </ul>
        </div>

    </div>
</template>

<script>

	export default {
		name: 'bbsDigitalTalent',
		data() { //页面数据
			return {
				singleList:[
					{
						className:'active',
						photo:'~@/assets/img/theFirstPhoto.png',
						name:'我自己',
						time:'12:00',
						comment:1,
						articleCont:'研究这个，研究那个，终于中了；研究这个，研究那个，终于中了',
						articleImg:'~@/assets/img/digitalTalentImg.jpg',
						articleTitle:'标题标题文字'
					},
					{
						className:'',
						photo:'~@/assets/img/theFirstPhoto.png',
						name:'我自己',
						time:'12:00',
						comment:1,
						articleCont:'研究这个，研究那个，终于中了；研究这个，研究那个，终于中了',
						articleImg:'~@/assets/img/digitalTalentImg.jpg',
						articleTitle:'标题标题文字'
					},
				]
			}
		},
		created: function() { //初始化
			this.fetchData();
		},
		mounted: function() {

		},
		methods: {
			gotoDetails(){
				this.$router.push({path:'bbsSingleDetails'})
			},
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
	.digitalTalentHeader{
		.icon-tianjia{
			font-size:.18rem;
		}
	}
	.digitalTalentBox{
		position: absolute;
	    top: .44rem;
	    left: 0;
	    width: 100%;
	    height: 100%;
	    overflow-y: scroll;
	    padding: .5rem 0 .4rem;
		.screening{
			width:100%;
			background: #fff;
			border-bottom:1px solid #ddd;
			font-size:0;
			position:fixed;
			top:.44rem;
			left:0;
			.screeningByTime,.screeningByHot{
				display: inline-block;
				vertical-align: middle;
				width:50%;
				height:.4rem;
				line-height:.4rem;
				text-align: center;
				span{
					font-size:.15rem;
					color:#666;
				}
				.icon-tri-down,.icon-tri-up{
					padding:.05rem;
					font-size:.04rem;
					color: #555;
				}
			}				
		}
		.digitalTalentCont{
			li{
				width:100%;
				background: #fff;
				margin-bottom:.1rem;
				padding:0 .15rem .175rem;
				.digitalTalentInfo{
					overflow:hidden;
					font-size:0;
					div{
						display: inline-block;
						float: left;
					} 
					.talentPhoto{
						width:.32rem;
						height:.32rem;
						-webkit-border-radius: 50%;
						-moz-border-radius: 50%;
						border-radius: 50%;
						overflow: hidden;
						margin:.15rem .1rem 0 0;
						img{
							width:100%;
							height:100%;
						}
					}
					.talentName{
						h2{
							font-size:.13rem;
							color:#555; 
							line-height:1;
							margin:.15rem 0 .06rem 0;
						}
						span{
							font-size:.1rem;
							color:#999;
							line-height:1;
						}
					}
					.comment{
						float: right;
						padding:.18rem 0 0 .18rem;
						color:#bbb;
						.icon-pinglun{
							font-size:.16rem;
							margin-right:.05rem;			
						}
						span{
							font-size:.08rem;
						}
					}
				}
				.articleContent{
					line-height:.18rem;
					font-size:.15rem;
					color:#666;
					margin:.135rem 0 .1rem;
				}
				.articleImg{
					overflow: hidden;
					width:100%;
					height:1.8rem;
					position: relative;
					img{
						width:100%;
						height:100%;
					}
					.articleTitle{
						position: absolute;
						left:.1rem;
						bottom:.1rem;
						z-index: 2;
						font-size:.14rem;
						color:#fff;
					}
				}
			}
			.active{
				-webkit-box-shadow: 0 .05rem .1rem #f7a08f,0 -.05rem .1rem #f7a08f;
				-moz-box-shadow: 0 .05rem .1rem #f7a08f,0 -.05rem .1rem #f7a08f;
				box-shadow: 0 .05rem .1rem #f7a08f,0 -.05rem .1rem #f7a08f;
			}
		}		
	}
	.digitalTalentBox::-webkit-scrollbar{
		display: none;
	}
}
</style>
