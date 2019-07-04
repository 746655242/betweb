<template>
    <div class="mineWrap" v-title data-title="文章发表">
		<header class="myExpertsHeader">
			<span onclick="history.go(-1)" class="iconfont icon-fanhui">&#xe614;</span>
			<span>文章发表</span>
			<span class="complete headerRight" @click="next">下一步</span>
		</header>
		


		<div class="articleBox">
			<p class="theArticleTitle center">
				<input type="text" placeholder="请输入标题"  v-model="data.PfDocumentSubject" autofocus="autofocus" />
			</p>

			<div class="notes">点击图片添加图片/点击文字编辑文字</div>
			<div class="addCoverBox center">				
				<div class="module" v-for="(item,index) in Detail" :key="index" >
					<div class="control">
						<span class="iconfont up" @click="upsort(index)" >&#xe786;</span><span class="iconfont down" @click="downsort(index)">&#xe609;</span>
						<span class="iconfont del" @click="delM(index)">&#xe613;</span>
					</div>
	
					<div class="module-box" v-if="item.TemplateId==1">						
						<div class="module-l w100" @click="openEditText(index)">
							<textarea  class="textarea" :style="'font-size:'+item.FrontSizeId+'px'" placeholder="添加文本" v-model="item.Detail" ></textarea>	
						</div>
					</div>

					<div class="module-box" v-else-if="item.TemplateId==2">
						<div class="module-l w30">


								<picUp  
								:menus="{up: '上传图片',df: '系统图片'}"
								:df="{url:'/api/GetPfDocDetailPicLst',data:{PfUserCode:PfUserCode},get:'LstPfDocDetailPic',PicId:'PicInfoId',PicUrlLink:'DownloadUrl'}"  
								:Gpicid="{url:'/api/UploadPfDocDetailPic',data:{PfUserCode:PfUserCode},get:'PfDocDetailPicId'}"   
								:data="{index:index}"
								@callback="picId"
								 >
									<img v-if="item.PicPath" :src="item.PicPath">
									<div v-else class="module-pic">+</div>
								</picUp>
							
						</div>
						<div class="module-r w70" @click="openEditText(index)">
							<textarea class="textarea"  :style="'font-size:'+Detail[editIndex].FrontSizeId/100+'rem'" placeholder="添加文本" v-model="item.Detail"></textarea>	
						</div>
					</div>	


					<div class="module-box" v-else-if="item.TemplateId==3">
						<div class="module-l w50">
								<picUp  
								:menus="{up: '上传图片',df: '系统图片'}"
								:df="{url:'/api/GetPfDocDetailPicLst',data:{PfUserCode:PfUserCode},get:'LstPfDocDetailPic',PicId:'PicInfoId',PicUrlLink:'DownloadUrl'}"  
								:Gpicid="{url:'/api/UploadPfDocDetailPic',data:{PfUserCode:PfUserCode},get:'PfDocDetailPicId'}"   
								:data="{index:index}"
								@callback="picId"
								 >
									<img v-if="item.PicPath" :src="item.PicPath">
									<div v-else class="module-pic">+</div>
								</picUp>

						</div>
						<div class="module-r w50" @click="openEditText(index)">
							<textarea class="textarea"  :style="'font-size:'+Detail[editIndex].FrontSizeId/100+'rem'" placeholder="添加文本" v-model="item.Detail" ></textarea>	
						</div>
					</div>			

					<div class="module-box" v-else-if="item.TemplateId==4">
						<div class="module-l w50" @click="openEditText(index)">
							 <textarea  class="textarea" :style="'font-size:'+Detail[editIndex].FrontSizeId/100+'rem'" placeholder="添加文本"  v-model="item.Detail"></textarea>	
						</div>
						<div class="module-r w50">
							<picUp  
								:menus="{up: '上传图片',df: '系统图片'}"
								:df="{url:'/api/GetPfDocDetailPicLst',data:{PfUserCode:PfUserCode},get:'LstPfDocDetailPic',PicId:'PicInfoId',PicUrlLink:'DownloadUrl'}"  
								:Gpicid="{url:'/api/UploadPfDocDetailPic',data:{PfUserCode:PfUserCode},get:'PfDocDetailPicId'}"   
								:data="{index:index}"
								@callback="picId"
								 >
									<img v-if="item.PicPath" :src="item.PicPath">
									<div v-else class="module-pic">+</div>
								</picUp>
							
						</div>
					</div>			

					<div class="module-box" v-else-if="item.TemplateId==5">
						<div class="module-l w70">
							<picUp  
								:menus="{up: '上传图片',df: '系统图片'}"
								:df="{url:'/api/GetPfDocDetailPicLst',data:{PfUserCode:PfUserCode},get:'LstPfDocDetailPic',PicId:'PicInfoId',PicUrlLink:'DownloadUrl'}"  
								:Gpicid="{url:'/api/UploadPfDocDetailPic',data:{PfUserCode:PfUserCode},get:'PfDocDetailPicId'}"   
								:data="{index:index}"
								@callback="picId"
								 >
									<img v-if="item.PicPath" :src="item.PicPath">
									<div v-else class="module-pic">+</div>
								</picUp>
						</div>
						<div class="module-r w30" @click="openEditText(index)">
							<textarea class="textarea"  :style="'font-size:'+Detail[editIndex].FrontSizeId/100+'rem'" placeholder="添加文本" v-model="item.Detail" ></textarea>	
						</div>
					</div>		

					<div class="module-box" v-else-if="item.TemplateId==6">
						<div class="module-l w100">
							<picUp  
								:menus="{up: '上传图片',df: '系统图片'}"
								:df="{url:'/api/GetPfDocDetailPicLst',data:{PfUserCode:PfUserCode},get:'LstPfDocDetailPic',PicId:'PicInfoId',PicUrlLink:'DownloadUrl'}"  
								:Gpicid="{url:'/api/UploadPfDocDetailPic',data:{PfUserCode:PfUserCode},get:'PfDocDetailPicId'}"   
								:data="{index:index}"
								@callback="picId"
								 >
									<img v-if="item.PicPath" :src="item.PicPath">
									<div v-else class="module-pic">+</div>
								</picUp>
						</div>
					</div>

				</div>

				<div class="addCover" @click="openMlist">
					<span>十</span><span>添加版块</span>
				</div>
			</div>
			
		</div>

		<!-- 文本编辑 -->
		<div class="layerout edit" v-if="isedit">
			<header class="myExpertsHeader">
				<span  class="iconfont icon-fanhui" @click="closeEditText">&#xe614;</span>
				<span>编辑</span>
				<span class="complete headerRight" @click="closeEditText">完成</span>
			</header>
			<div class="editText">
				<textarea ref="editText"   v-model="editText" placeholder="添加文本" :style="'font-size:'+Detail[editIndex].FrontSizeId/100+'rem'">{{editText}}</textarea>
				<div class="wordl">{{editText?editText.length:0}}/1000</div>
			</div>

			<div  class="toolBar font"><span @click="openfont">T</span></div>

			<div class="fontsize-box" v-if="isfontbox">
				<div class="picker">
					<div class="title"><span @click="closefont">取消</span><span @click="closefont" class="fr">完成</span></div>
					<picker :data='fontsize' v-model="csize"  @on-change="changesize"></picker>
				</div>
			</div>
		</div>

		<!-- 模块列表 -->
		<div class="layerout module-list" v-if="isMlist">
			<header class="myExpertsHeader">
				<span  class="iconfont icon-fanhui" @click="closeMlist">&#xe614;</span>
				<span>选择模块</span>
			</header>
			<ul>
				<li v-for="(item,index) in TemplateList" :key="index" @click="addM(item.Value)"><div class="line"><img :src="require('@/assets/img/m_0'+item.Value+'.png')"></div></li>
			</ul>
		</div>

		<!-- 第二步 -->
		<div class="layerout" v-if="istwo">
			<header class="myExpertsHeader">
				<span  class="iconfont icon-fanhui" @click="upnext" >&#xe614;</span>
				<span>文章信息</span>
				<span class="complete headerRight" @click="submit">完成</span>
			</header>

			<div class="mainbox">
				<div class="banner">
					
					<picUp  
						:menus="{up: '上传图片',df: '系统图片'}"
						:df="{url:'/api/GetPfDocTitlePicLst',data:{PfUserCode:PfUserCode},get:'LstPfDocTitlePic',PicId:'PicInfoId',PicUrlLink:'DownloadUrl'}"  
						:Gpicid="{url:'/api/UploadPfDocTitlePic',data:{PfUserCode:PfUserCode},get:'PfDocTitlePicId'}"   
						@callback="bannerpic"
						>
						<img :src="bannerpath">
						<p>添加封面</p>

					</picUp>

				</div>
				
			
				<div class="list">
					 <div class="group"> 
						<div class="cell" @click="openmenu('选择目录','PfDocumnetType',dtype)" >
							<div class="title">文章目录</div>
							<div class="text" ><span>{{data.PfDocumnetType |getTypeName(dtype)}}</span><span class="iconfont">&#xe606;</span></div>
						</div>
						<div class="cell"  @click="openmenu('选择收费','DocumentFee',LstFee)">
							<div  class="title">阅读收费</div>
							<div class="text" ><span>{{data.DocumentFee |getTypeName(LstFee)}}</span><span class="iconfont">&#xe606;</span></div>
						</div>
					</div>
				</div>

			</div>
		</div>

		<!-- 选择弹出层 -->
		<div class="layerout" v-if='menu.title'>
			<header class="myExpertsHeader">
				<span  class="iconfont icon-fanhui" @click="upnext" >&#xe614;</span>
				<span>{{menu.title}}</span>
			</header>

			<div class="mainbox">
				<ul class="menu-li">
					<li v-for="(item,index) in menu.list" @click="onSelect(item,menu.name)">
						{{item.Show}}
					</li>
				</ul>
			</div>
			

		</div>

    </div>
</template>

<script>

import { Actionsheet,Picker} from 'vux'

import picUp from '@/components/picUp'

export default {
	name:'publishArticle',
    data(){
        return {
			isMlist:false,
			isedit:false,
			isfontbox:false,
			istwo:false,
			editText:'',
			editIndex:0,
			bannerpath:null,
			data:{
				PfDocumentSubject:'',
				PfDocumentTitlePic:0,
				PfDocumnetType:null,
				DocumentFee:null,
				DocumentCount:null,
				DocumentDetail:null
			},			
			Detail:[
				{
					TemplateId:1,
					PicId:0,
					PicPath:null,
					FrontSizeId:16,
					Detail:''
				},
			],
			fontsize:[],
			csize:[],
			menu:{
				title:null,
				list:null,
				name:null
			},
			PfUserCode:this.$route.query.PfUserCode,
			TemplateList:[
			],
			dtype:null,
			LstFee:null,
			LstTextSize:null
        }
	},
	created(){
		this.fetchData()
	},
    mounted(){

	},
	filters:{
		getTypeName:function(value,data){
			let l=data
			let s=''
			for(let i in l){
				if(l[i].Value==value){
					s=l[i].Show
					break;
				}
			}
			return s
		}
	},
    methods: {

		fetchData(){ 
			let me= this
			/* 初始化 */
			this.base.getData(this,this.host+'/api/PublishDocumentInitial',{PfUserCode:me.PfUserCode},function(data){	
				data=data.ActionCode
				me.LstFee=data.LstFee
				me.dtype=data.LstDocumentType
				me.TemplateList=data.LstTextTemplate		
				
				me.setdefault(data.LstDocumentType,'PfDocumnetType')
				me.setdefault(data.LstFee,'DocumentFee')
				
				/* 字体格式转化 */
				let font=data.LstTextSize
				let fontlist=[]
				for(let i in  font){
					fontlist.push({name:font[i].Show,value:font[i].Value})
				}
				me.fontsize.push(fontlist)
			})
		},

		setdefault(l,name){
			for(let i in l){
				if(l[i].Default==1){
					this.data[name]=l[i].Value
					break;
				}
			}
		},	

		/* 下一步 */
		next(){
			
			let title=this.data.PfDocumentSubject.trim()
			let Detail=this.Detail
			if(!title){
				this.$vux.alert.show({content:'请输入标题（限字 250字）'})
				return false
			}
			if(Detail.length==0||(Detail.length==1&&Detail[0].Detail==''&&Detail[0].PfDocumentTitlePic==null)){
				this.$vux.alert.show({content:'请添加版块（填写信息）'})
				return false
			}
			this.istwo=true
		},
		openmenu(title,name,item){
			this.menu={
				title:title,
				list:item,
				name:name
			}
		},
		onSelect(item,name){
			this.data[name]=item.Value
			this.menu={}
		},
		/* 上一步 */
		upnext(){
			this.istwo=false
		},
		/* 提交 */
		submit(){
			

			let me=this
			let data=this.data
			let bpic=data.PfDocumentTitlePic
			let DocumentDetail=''
			let Detail=this.Detail
			
			if(!bpic){
				this.$vux.alert.show({content:'请添加封面图片'})
				return false
			}

			for(let i=0;i<Detail.length;i++){
				let item=Detail[i]				
				let text=item.Detail.replace(/(\||\@)/g,'')
				let s=i+'|'+item.TemplateId+'|'+item.PicId+'|'+item.FrontSizeId+'|'+text+'@'
				DocumentDetail+=s
			}
			data.DocumentCount=this.Detail.length
			data.DocumentDetail=this.base.delend(DocumentDetail,1)
			data.PfUserCode=this.PfUserCode

			this.base.getData(this,this.host+'/api/PublishDocument',data,function(data){	
					me.$vux.alert.show({content:'发布成功'})
					me.$router.go(-1)
					
			})
		},

		/* 模块选择 */
		openMlist(){
			this.isMlist=true;
		},
		closeMlist(){
			this.isMlist=false
		},
		/* 增加模块 */
		addM(TemplateId){
			let M={
					TemplateId:TemplateId,
					PicId:0,
					PicPath:null,
					FrontSizeId:14,
					Detail:''
			}
			this.Detail.push(M)
			this.closeMlist()
		},
		/* 上移 */
		upsort(index){
			let arr=this.Detail
			if(index==0){return false}
			arr[index] = arr.splice(index-1,1,arr[index])[0]
		},
		/* 下移 */
		downsort(index){
			let arr=this.Detail
			if(index==arr.length-1){return false}
			arr[index] = arr.splice(index+1,1,arr[index])[0]
		},
		/* 删除模块 */
		delM(index){
			this.Detail.splice(index,1)
		},
		/* 打开编辑 */
		openEditText(index){
			let me=this
			this.editIndex=index
			this.editText=this.Detail[index].Detail
			this.isedit=true
			this.csize.push(this.Detail[index].FrontSizeId)
			setTimeout(function(){
					me.$refs.editText.focus()
			},0)
		},
		/* 关闭编辑 */
		closeEditText(){
			let index=this.editIndex
			this.Detail[index].Detail=this.editText
			this.isedit=false
		},
		/* 打开字体 */
		openfont(){
			this.isfontbox=true
		},

		closefont(){
			this.isfontbox=false
		},

		/* 切换字体 */
		changesize(e){
			let index=this.editIndex
			this.Detail[index].FrontSizeId=e[0]
		},
		
		
		/* 上传图片 */
		picId(data){
			let index=data.index
			this.Detail[index].PicPath=data.imgsrc
			this.Detail[index].PicId=data.PicId
		},


		/* 上传封面图片 */
		bannerpic(data){
			this.bannerpath=data.imgsrc
			this.data.PfDocumentTitlePic=data.PicId
			
		},



    },
    computed: {},
    watch: {},
    props: {},
    components: {
		Actionsheet,
		picUp,
		Picker
    },
    activated:function(){

	},
}
</script>

<style lang="less" scoped>

.layerout{ 
	
	.toolBar{
		background: #f4f4f4;
		border-top:1px solid #e2e2e2;
		border-bottom:1px solid #e2e2e2;
		span{
			padding:.1rem;
			margin: 0 .1rem;
			display:inline-block;
			color:#666;
		}
	}
}
.menu-li{
	margin:0 .2rem; 
	li{
		padding:.2rem 0;
		font-size:.16rem;
		border-bottom:1px solid #e6e6eb;
		color:#333;
	}
}
.mainbox{
	margin-top:.44rem;
	.banner{
		width:100%;
		height: 2.4rem;
		position: relative;
		overflow: hidden;
		img{ width: 100%;}
		p{
			position: absolute;
			bottom:0;
			left:0;
			right: 0;
			color:#fff;
			text-align: center;
			padding:.08rem 0;
			background: rgba(0,0,0,.2);
		}
	}
}

.group{
	padding:0 .2rem;
	.cell{
		padding:.25rem 0;
		border-bottom:1px solid #e6e6eb;
		position: relative;
		line-height:.2rem;
		.title{
			color:#b5b6b7;
		}
		.text{
			position:absolute;
			right: 0rem;
			top:.25rem;
			line-height:.2rem;
			color:#282828;
			.iconfont{ color:#b5b6b7; display:inline-block;margin-left:.15rem}
		}
	}
}

.fontsize-box{
	background: rgba(0,0,0,.4);
	position: absolute;
	top:0;
	left: 0;
	right: 0;
	bottom:0;
	z-index: 1000;
	.picker{
		background: #fff;
		bottom:0;
		position: absolute;
		left: 0;
		right:0;
		.title{
			background: #fbf9fe;
			span{
				padding:.1rem;
				display:inline-block;
			}
			.fr{
				float:right;
			}
		}
	}
}
.editText{
	padding:.05rem .05rem;
	background: #fff;
	
	position: relative;
	textarea{
		width:100%;
		height: 2.45rem;
		border:none;
		resize:none
	}
	.wordl{
		position: absolute;
		right: .1rem;
		bottom:.05rem;
		color:#999;
		
	}
}
.module-list{
	background: #fff;
	ul{
		padding:.8rem .075rem 0;
		li{
			float: left;
			width:50%;
			margin-bottom:.3rem;
			.line{
				margin:0 .075rem;
				height: 100%;
				background:#fff;
				border:1px solid #eaeaea;
				border-radius: 5px;
				box-shadow: 0 3px 5px rgba(0,0,0,.05);
				padding:.2rem;
				img{width:100%;}
			}
		}
	}
}
.module{
	width:100%;
	padding:.2rem;
	min-height:1.3rem;
	border:1px solid #dfdfdf;
	position: relative;
	margin:.2rem 0;
	img {
		width:100%;
	}
	.control{
		position: absolute;
		right:.02rem;
		top:.02rem;
		span{
			display:inline-block;
			width:.16rem;
			height: .16rem;
			background: #f2f2f2;
			margin:.01rem
		}
	}
	.module-box{ width:100%; position:relative; height:100%;overflow: hidden;}
	.module-l{
		float:left;	
		.textarea{
			padding-left:0;
			padding-right:.2rem;
		}
	}
	.module-r{
		.textarea{
			padding-left:.2rem;
		}
	}
	.w100 .addCover
	{
		padding-right:0;
	}
	.module-r{
		position: absolute;
		right:0;
		top:0;
		float:right;
	}
	.module-pic,textarea{width:100%; border:none;resize:none; height:100%; height:.9rem;}
	.module-pic{
		background: #f2f2f2;
		width:100%;
		height: .9rem;
		font-size:.3rem;
		color:#a8a8a8;
		text-align:center;
		line-height:.9rem;
	}
	.w30{
		width:30%;
	}
	.w50{
		width:50%;
	}
	.w70{
		width:70%;
	}
	.w100{
		width:100%;
	}	
	.textarea{
		border:0;
		height:.9rem;
		color:#333;
		padding-left:.2rem;
		font-size:.16rem;
		padding-top:.05rem;
		line-height: .21rem;
		resize:none;
		display: -webkit-box;
    	-webkit-line-clamp: 4;
		-webkit-box-orient: vertical;
		overflow: hidden;
		word-break: break-all;
		text-overflow: ellipsis;
	}
}

.mineWrap{
	.myExpertsHeader{
		.complete{
			font-size:.15rem;
		}
	}

	.center{
		padding:0 .2rem;
	}
	.notes{
		background: #f2f2f2;
		font-size:.12rem;
		color:#b5b6b7;
		padding:.15rem .2rem;
	}
	.articleBox{	
		height:100%;
		position: absolute;
		top: .44rem;
		left:0;
		right:0;
		background:#fff;
		padding-bottom:.45rem;
		overflow: auto;
		.theArticleTitle{
			input{
				width:100%;
				padding: .2rem 0;
			}
		}
		.addCoverBox{
			width:100%;
			.addCover{
				width: 100%;
				height:.6rem;
				line-height:.6rem;
				text-align: center;
				border:1px dashed #ddd;
				font-size:.16rem;
				color:#ddd;
				position:relative;
				margin:.1rem auto 0;
				/*display:none;*/
				span{
					padding: 0 .04rem;
				}
				input{
					width:100%;
					height: 100%;
					position: absolute;
					top:0;
					left:0;
					opacity: 0;
				}
			}
		}
	}
	.articleBox::-webkit-scrollbar {/*隐藏滚轮*/
		display: none;
	}
}
</style>