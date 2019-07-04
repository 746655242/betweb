<template>
    <div class="daohao-wrap">
        <header class="keynoteHeader">
            <span onclick="history.go(-1)" class="iconfont icon-fanhui">&#xe614;</span>
            <span>主题发表</span>
        	<span class="complete headerRight">完成</span>
        </header>
  		<div class="keynoteBox">
  			<div class="keynoteImg">
  				<div class="addImgBox">
  					<div class="addImg">
  						<input type="file" />
  						<span>十</span><span>添加图片</span>
  					</div> 				
	  			</div>
	  			<div style="display: none;">
	  				<img src="" alt="" />
	  				<div></div>
	  				<div>
	  					<input type="file" />
	  					<span>更换图片</span>
	  				</div>
	  				<i></i>	
	  			</div>
  			</div>
  			<div class="keynoteTitle">
  				<input type="text" value="标题"/>
  			</div>
  			<div class="keynoteCont">
  				<textarea placeholder="正文"></textarea>
  			</div>
  		
  		</div>

    </div>
</template>

<script>


	export default {
		name: 'bbsKeynote',
		data() { //页面数据
			return {
				
			}
		
		},
		created: function() { //初始化
//			this.fetchData();
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
	.keynoteHeader{
		.complete{
			font-size: .15rem;
		}
	}
	.keynoteBox{
		position: fixed;
		top: .44rem;
		left:0;
		width: 100%;
		height: 100%;
		background: #fff;
		.keynoteImg{
			width: 100%;
			height: auto;
			.addImgBox{
				padding: .1rem .15rem 0;
				.addImg{
					border:1px dashed #ddd;
					width: 100%;
					height: .79rem;
					line-height: .79rem;
					text-align: center;
					position:relative;
					span{
						margin:0 .04rem;
					}
					input{
						width: 100%;
						height: 100%;
						position: absolute;
						top:0;
						left:0;
						opacity: 0;
					}
				}				
			} 
		}
		.keynoteTitle{
			padding: 0 .15rem;			
			height: .45rem;
			line-height: .45rem;
			color: #555555;
			font-size: .15rem; 
			text-indent: .03rem;
			input{
				width: 100%;
				height: 100%;
				border-bottom: 1px solid #ddd;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
		.keynoteCont{
			padding:.13rem .15rem;
			height: 100%;
			textarea{
				width: 100%;
				height: 3.75rem;
				font-size: .15rem;
				color: #666;
				line-height: .18rem;
				resize: none;
				border: none;
							
			}
		}
		
	}
}
</style>
