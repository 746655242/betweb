<template>
    <div class="mineWrap">
		<header class="myApplyHeader">
			<span onclick="history.go(-1)" class="iconfont icon-fanhui">&#xe614;</span>
			<span>专家修改</span>
		</header>
		<div class="myApplyCont">
			<div class="warning">
				<p v-if="!validation.expertsName">
					<i class="iconfont icon-jinggao-copy">&#xe621;</i>
					<span>提示:请输入4-8个字!</span>
				</p>
			</div>
			<div class="applyContBox">
				<!--专家名称-->
				<div class="expertsName applyItem">
					<span class="itemName">专家名称</span>

					<div class="input">{{expertsName}}</div>

					<!-- <input class="selectTxt" type="text" maxlength="8" v-model="expertsName" :value="expertsName" placeholder="请输入4-8个字"/>
					<button v-if="!isby"  class="detectionBtn" @click="checkName">检测</button>
					<button v-else class="detectionBtn" >通过</button>  -->

				</div>
				<!--类型-->
				<div class="expertsType applyItem" @click="typeSelect">
					<span class="itemName">类型</span>
					<input class="selectTxt" type="text" placeholder="请选择" :value='takeType[expertsType]' disabled/>
					<i class="iconfont icon-enter">&#xe606;</i>
				</div>	
				<!--专长-->
				<div class="expertsSpecialty applyItem" @click="specialtySelect">
					<span class="itemName">专长</span>
					<input class="selectTxt" type="text" :value="getspecialty()" placeholder="请选择" disabled/>
					<i class="iconfont icon-enter">&#xe606;</i>
				</div>
				<!--经验年限-->
				<div class="expertsExperience applyItem">
					<span class="itemName">经验年限</span>
					<input class="selectTxt" type="text"  v-model="expertsExperience" :value="expertsExperience" placeholder="请输入1-99(年)"/>
					<span class="checkYears" v-show="!validation.Years"><i class="iconfont icon-jinggao-copy">&#xe621;</i>请输入1-99的整数</span>
				</div>
				<!--经验叙述-->
				<div class="experienceNarrative">
					<p class="applyItem">经验叙述</p >
					<textarea class="selectTxt myExperience" placeholder="1000字以内" @click="experience" v-model="experienceContent" ></textarea>
				</div>

				

				<!--提交申请-->
				<div class="submitApply" @click="submitApply">提交申请</div>				
			</div>
						
		</div>
		<!--弹窗遮罩-->
		<div class="applyShadow zIndex" v-show="shadowShow"></div>
		<!--类型弹窗-->
		<div class="typeSelect zIndex" v-show="typeShow">
			<p class="cancle-complete">
				<span @click="typeSelectCancel">取消</span>
				<span @click="typeConfirm">完成</span>
			</p>
			<ul class="typelist">
				<li v-for="(item,index) in typelist" :key="index" :class="{'choose':typeChecked==item.ApplyOptionValue}" @click="typeSwitch(item.ApplyOptionValue)">
					<input type="radio" :value="item.ApplyOptionValue" name="checkType"  class="inpSelect"/>
					<span>{{item.ApplyOptionShow}}</span>
				</li>
			</ul>
		</div>

		<!--专长弹窗-->
		<div class="experience zIndex" v-show="specialtyShow">
			<header class="experienceHeader">
				<i @click="specialtySelect" class="iconfont icon-fanhui">&#xe614;</i>
				<b>我的申请</b>
			</header>

			<div class="specialtySelect zIndex"   >
				<p>请选择你的专长</p>
				<ul>
					<li v-for="(item,index) in takelist[expertsType]" :key="index"  :class="{active:base.isArrR(SpecialityChecked,item.ApplyOptionValue)[0] }" @click="specialtyChoose(item)">	
						<input type="checkbox" name="checkSpecialty" class="inpSelect"/>
						<span class="specialty">{{item.ApplyOptionShow}}</span>
					</li>
				</ul>

				<span class="completeBtn" @click="specialtyEnd">完成</span>
			</div>
		</div>

		<!--经验弹窗-->
		<div class="experience zIndex" v-show="experienceShow">
			
			<header class="experienceHeader">
				<i @click="experience" class="iconfont icon-fanhui">&#xe614;</i>
				<span>经验叙述</span>
				<span @click="experience" class="headerRight">完成</span>
			</header>
			<div class="experienceBox">
				<textarea class="experienceCont" ref="myExperienceCont" maxlength="1000" placeholder="1000字以内" v-model="experienceContent"  autofocus="autofocus"></textarea>
				<p class="experienceTotal">{{validation.total}}</p>	
			</div>
			
		</div>

		
		<!--提交申请弹窗-->
		<div class="confirmSubmit zIndex" v-show="submitShow">
			<div class="submitAlert" >
				<p class="alertTxt">提交通过审核后不能再修改!</p>
				<p class="submitBtn">
					<span @click="submitApply">返回</span>
					<span @click="query">确定</span>
				</p>
			</div>							
		</div>	


	

    </div>
</template>

<script>

export default {
	name:'myApply',
    data(){
        return {
        	index:0, 
        	PfUserApplyId:'',
			expertsName:'',      		//获取专家名称
			expertsType:'',				//获取类型
			expertsSpeciality:'',		//获取专长
			expertsExperience:'',		//获取经验年限
			experienceContent:'',   	//获取经验叙述内容	
			typeChecked:'',				//选中类型
			SpecialityChecked:[],       //专长选中
			typelist:[],					//类型、专长列表

			isby:false,
			typeShow:false,			  	//类型弹窗	
			specialtyShow:false,        //专长弹窗
			experienceShow:false,		//经验弹窗	
			total:1000,			   		//经验叙述限制总字数
			submitShow:false,			//申请资料提交弹窗
			shadowShow:false,            //弹窗遮罩 
			picshow:false,    			//是否显示默认头像
			piclist:[]                  //默认头像列表
			
			
        }
    },
    created(){
    	this.fetchData();
	},
	computed:{
		validation: function () {
			return {
				expertsName: /^\S{4,8}$/.test(this.expertsName),
				Years:/^([1-9]\d|[1-9])$/.test(this.expertsExperience),
				total:1000-this.experienceContent.length
			}
		},
		isValid: function () {
			var validation = this.validation
			return Object.keys(validation).every(function (key) {
				return validation[key]
			})
		},
		/* 类型列表 */
		takeType:function(){
			let s={}
			let l=this.typelist
			for(let i in l){
				let key=l[i].ApplyOptionValue
				s[key]=l[i].ApplyOptionShow
			}
			return s
		},
		/* 专长列表 */
		takelist:function(){
			let s={}
			let l=this.typelist
			for(let i in l){
				let key=l[i].ApplyOptionValue
				s[key]=l[i].LstSelectOptForExpertise
			}
			return s
		},		
	},
	watch:{
	
	},
    methods: {

		checkName(){ //专家名称检测	
			let me =this			
			if(!this.validation.expertsName){
				return false
			}
			this.base.getData(this,this.host+'/api/ApplyPfUserChkPfUserNameExist',{PfUserName:this.expertsName},function(data){
				me.isby=true
			})
		},
		
		//类型弹出层开关	
		typeSelect(){ 
			this.typeShow = !this.typeShow
			this.shadowShow = !this.shadowShow
		},

		/* 确定类型 */
		typeConfirm(){
			this.expertsType=this.typeChecked
			this.SpecialityChecked=[]
			this.typeSelect()
		},

		/*取消类型选择*/
		typeSelectCancel(){ 
			this.typeSelect();
		},

		//类型选择
		typeSwitch(type){  
			this.typeChecked=type
		},

		/* 专长code转vule */
		getspecialty(){
			let v=this.expertsSpeciality
			let l = this.takelist[this.expertsType]
			let s=''
			for(let i in l ){	
				if(v.indexOf(l[i].ApplyOptionValue)>=0){
					s+=l[i].ApplyOptionShow+';'
				}
			}
			return s
		},

		//专长选择弹窗
		specialtySelect(){ 
			this.specialtyShow = !this.specialtyShow				
		},

		//专长选择
		specialtyChoose(item){ 
			let a=this.SpecialityChecked
			let v=item.ApplyOptionValue

			let isArrR=this.base.isArrR(a,v)
			if(isArrR[0]){
				this.SpecialityChecked.splice(isArrR[1],1)
			}else if(a.length<3){
				this.SpecialityChecked.push(v)
			}else{
				this.$vux.alert.show({content:'最多选三个'})
			}	
		},

		/* 专长选择完成 */
		specialtyEnd(){
			this.expertsSpeciality=this.SpecialityChecked.join(';')
			this.specialtySelect()
		},

		experience(){  //经验叙述弹窗
			this.experienceShow = !this.experienceShow
		},
		

		deleteImg(e){  //删除所选图片
			e.stopPropagation()		
			this.$refs.myAddImg.style.display = "block"
			this.$refs.myUploadImg.style.display = "none"			
		},
		
		submitApply(){  //申请资料弹窗

			if(this.isValid){
				this.submitShow = !this.submitShow
				this.shadowShow = !this.shadowShow
			}else{
				this.$vux.alert.show({
					content:'请完善信息'
				})
			}
		},
		
		
		fetchData(){  //我的申请-->类型+专长
			let me= this;
			this.base.getData(this,this.host+'/api/MemberApplyPfUserInitial',{},function(data){	
				data=data.ActionCode
				me.typelist=data.LstSelectOptForGameType
			})
			

			let id=this.$route.params.id
			if(id){
				this.base.getData(this,this.host+'/api/ApplyPfUserForEditInitialById',{PfUserApplyId:id},function(data){	
					let Data=data.ActionCode.EditInitialData
					me.PfUserApplyId=id
					me.expertsName=Data.PfUserName     		
					me.expertsType=Data.PfGameTypeCode			
					me.expertsSpeciality=Data.PfUserExpertise		
					me.expertsExperience=Data.ExpertiseYear 	
					me.experienceContent=Data.ExpertiseDesc

					me.SpecialityChecked =Data.PfUserExpertise.split(';')
					me.typeChecked=Data.PfGameTypeCode
				})
			}

			

			
		},
		query(){  //确认提交专家申请资料
			
			if(this.isValid){
				let me=this
				let params = {
					"PfUserApplyId":this.PfUserApplyId,
					"PfUserName":this.expertsName,
					"PfGameType":this.expertsType,
					"PfUserExpertiseData":this.expertsSpeciality,
					"ExpertiseYear":this.expertsExperience,				
					"ExpertiseDesc":this.experienceContent
				};			

				this.submitShow=false
				this.shadowShow=false

				this.base.getData(this,this.host+'/api/ApplyPfUserForEditById',params,function(data){
					if(data.ErrCode=='00000000'){
						console.log(data)
						me.SubmittedSuccessfully()
						
					}
					
				})
			}
		},
		
	
		
		SubmittedSuccessfully(){  //申请资料提交成功弹窗
			this.$vux.alert.show({
				content:'提交申请成功!'
			})		
			
			history.go(-1)
			this.expertsName = ''    		
			this.expertsType = ''			
			this.expertsSpeciality = ''	
			this.expertsExperience = ''		
			this.experienceContent = '' 
		},
		
    },  
    props: {},
    components: {},
    activated:function(){
	},
}
</script>

<style lang="less" scoped="scoped" >
.default-pic{
	background: #555;
	position: absolute;
	top:0;
	left:0;
	right:0;
	bottom:0;
	z-index:9999;
	padding-top:.44rem;
	overflow-y: scroll;
	.myApplyHeader{
		background: #000;
	}
	.default-pic-ul{
		padding:.05rem;
		li{
			width:33.33%;
			float:left;
			.item{
				margin:.05rem;
				img{
					width:100%;
				}
			}
		}
	}

}
.zIndex{ z-index:99;}
.mineWrap{
	input::-webkit-input-placeholder, textarea::-webkit-input-placeholder { 
	    color:#ddd;
	    border:none;
		resize: none;
	}
	input:-moz-placeholder, textarea:-moz-placeholder { 
	    color:#ddd;
	    border:none;
		resize: none;
	}
	input::-moz-placeholder, textarea::-moz-placeholder { 
	    color:#ddd;
	    border:none;
		resize: none;
	}
	input:-ms-input-placeholder, textarea:-ms-input-placeholder { 
	    color:#ddd;
	    border:none;
		resize: none;
	}
	.myApplyCont{		
		padding:0 0 .8rem;
		position: absolute;
		top:.44rem;
		left:0;
		width:100%;
		height:100%;
		background: #fff;
		overflow: auto;
		
		.warning{
			width: 100%;
			padding:.05rem;
			background:#f0f0f0;
			p{
				line-height: .35rem;
				text-align: center;
				color:@red;
				font-size:.15rem;
			}		
		}
		.applyContBox{
			padding:0 .15rem;
			.applyItem{
				height:.44rem;
				line-height:.44rem;
				border-bottom: 1px solid #ddd;
				position:relative;
				padding-left:.85rem;
				padding-right:.6rem;
				.itemName{
					display: inline-block;
					width: .85rem;
					font-size: .15rem;
					color: #555;
					font-weight: bold;
					line-height:.44rem;
					left:0;
					position: absolute;
				}
				.icon-enter,.detectionBtn,.checkYears{
					position: absolute;
					top:0;
					right: 0;
				}
				.icon-enter{
					font-size:.1rem;
					color:#bbb;			
				}
				.detectionBtn{
					width: .42rem;
					height: .2rem;
					line-height: .2rem;
					text-align: center;
					font-size: .15rem;
					color: #555;
					background: #fff;
					-webkit-border-radius: .05rem;
					-moz-border-radius: .05rem;
					border-radius: .05rem;
					border:1px solid #999;
					margin-top:.12rem;
				}	
				.checkYears{
					font-size: .15rem;
					color: #ef1823;
					i{
						margin-right: .05rem;
					}
				}		
			}
			.selectTxt,.input{
				font-size:.15rem;
				color:#666;
				line-height: .19rem;
				padding:.12rem;
				display: block;
				width:100%;
				background: #fff;
			}
			.experienceNarrative{
				p.applyItem{
					border-bottom: none;
					font-weight: bold;
					font-size: .15rem;
					color: #555;
					padding-left:0;
				}
				.myExperience{
					display: block;
					width:100%;
					height:.8rem;
					border:1px solid #ddd;
					text-indent: .07rem;
					padding:.05rem 0;
					overflow: hidden;
					text-overflow:ellipsis;
					color:#666;
					resize: none;
					overflow: auto;
				}
			}
			.addImgBox{
				margin:.1rem 0 .2rem;
				position: relative;
				overflow: hidden;
				min-height: 1rem;
				padding-left:1.2rem;
				.pic{
					width:1rem;
					min-height:1rem;
					position: absolute;
					left: 0;
					background: #ddd;
					img{
						width:100%;
					}
				}
				.btn {
					border: 1px solid #ddd;
					width:1rem;
					text-align:center;
					font-size:.14rem;
					padding:.07rem;
					margin:.1rem 0;
					cursor: pointer;
					color:#999;
				}

				ul{
					overflow: hidden;
					
					li{
						width:25%;
						min-height: 1rem;
						float:left;
						text-align: center;
						.img{
							margin:.05rem;
							border: 1px solid #ddd;
						}
						img{width:100%;}
						span{
							padding:0 .04rem;
							font-size:.16rem;
							color:#ddd;
							
						}
					}
					.addImg{
						width:48%;
						margin-right:4%;
						height:.4rem;
						min-height:.4rem;
						line-height:.4rem;
						border:1px dashed #ddd;
					}
					.addImg:last-child{
						margin-right:0;
					}
				}
			
				.uploadImg{
					display: none;
					width:100%;
					height: 100%;
					position:absolute;
					top:0;
					left:0;
					.uploadImgShadow{
						width:100%;
						height:100%;
						background: rgba(0,0,0,.2);
						position: absolute;
						top:0;
						left:0;
					}
					img{
						width:100%;
						height: 100%;
					}
					.deleteImg{
						width: .135rem;
						height: .135rem;
						position: absolute;
						top:.05rem;
						right:.05rem;
						z-index: 2;
						background: url("~@/assets/img/delete.png") no-repeat center 0;
						background-size: 100% 100%;
					}
				}	
			}
			.submitApply{
				margin-top:.2rem;
				width: 100%;
				height: .45rem;
				line-height: .45rem;
				background: #ef1823;
				text-align: center;
				color: #fff;
				font-size: .17rem;
				-webkit-border-radius: .05rem;
				-moz-border-radius: .05rem;
				border-radius: .05rem;
			}	
		}
	}
	.myApplyCont::-webkit-scrollbar {/*隐藏滚轮*/
			display: none;
	}	
	.applyShadow{
		width:100%;
		height:100%;
		position: absolute;
		top:0;
		left:0;
		background: rgba(0,0,0,.5);
	}
	
	.typeSelect{
		position: fixed;
		bottom: 0;
		left:0;
		width:100%;
		height:1.74rem;
		background: #fff;
		.cancle-complete{
			height: .44rem;
			line-height: .44rem;
			background: #ddd;
			display: flex;
			justify-content: space-between;
			span{
				 padding:0 .15rem;
				 font-size:.15rem;
				 color: #00baff;
			}
		}
		.typelist{
			padding:.485rem 0;
			display: flex;
			justify-content: space-around;
			li{
				width:1.03rem;
				height:.32rem;
				line-height:.32rem;;
				text-align: center;
				border:1px solid #ddd;
				font-size:.13rem;
				color: #555;
				-webkit-border-radius: .16rem;
				-moz-border-radius: .16rem;
				border-radius: .16rem;
				position: relative;
				.inpSelect{
					width:100%;
					height:100%;
					position:absolute;
					top:0;
					left:0;
					opacity:0;
				}
			}			
			.choose{
				border-color:@red;
				color:@red;
			}
		}
	}
	.specialtySelect{
		position: absolute;
		top:.44rem;
		left:0;
		z-index: 2;
		width: 100%;
		height: 100%;
		background: #fff;
		padding:.4rem .075rem 0;
		p{
			font-size: .16rem;
			color: #555;
			line-height: 1;
			text-align: center;
			font-weight: bold;
		}
		ul{
			margin-top:.5rem;
			font-size:0;
			text-align: center;
			li{
				width: 1.03rem;
				height: .32rem;
				line-height: .32rem;
				text-align: center;
				border: 1px solid #ddd;
				-webkit-border-radius: .16rem;
				-moz-border-radius: .16rem;
				border-radius: .16rem;
				margin:.075rem;
				font-size:.12rem;
				color: #555;
				display: inline-block;
				vertical-align: middle;
				position: relative;
				.inpSelect{
					width:100%;
					height:100%;
					position:absolute;
					top:0;
					left:0;
					opacity:0;
				}
			}
			li.active{
				color:@red;
				border-color: @red;
			}
		}
		.completeBtn{
			display: block;
			margin:.825rem auto 0;
			width: 1.3rem;
			height: .37rem;
			line-height: .37rem;
			text-align: center;
			-webkit-border-radius: .185rem;
			-moz-border-radius: .185rem;
			border-radius: .185rem;
			background: #ef1823;
			color:#fff;
			font-size: .15rem;
		}
	}
	.experience{
		position: fixed;
		top:0;
		left:0;
		z-index: 1000;
		width: 100%;
		height: 100%;
		background: #f0f0f0;
		.experienceBox{
			position: absolute;
			top: .44rem;
			left: 0;	
			width:100%;
			height:100%;
			.experienceCont{
				display: block;
				width: 100%;
				height: 2.45rem;
				padding: .05rem .15rem;
				margin:	.1rem auto 0;	
			    border:none;
				resize: none;
			}
			.experienceTotal{
				width: 100%;
				height: .3rem;
				line-height: .3rem;
				text-align: right;
				font-size: .13rem;
				color:#ddd;
				background: #fff;
				padding:0 .15rem;
			}
		}
	}

	.confirmSubmit{
		width:2.5rem;
		height:1.35rem; 
		position: absolute;
		top:50%;
		left:50%;
		margin-top:-.675rem;
		margin-left:-1.25rem;
		background: #fff;
		-webkit-border-radius: .1rem;
		-moz-border-radius: .1rem;
		border-radius: .1rem;
		.submitAlert{
			.alertTxt{
				text-align: center;
				font-size:.16rem;
				color:#666;	
				line-height:1;
				margin:.35rem 0 .32rem;
			}
			.submitBtn{
				display: flex;
				justify-content: space-around;
				span{
					width:.68rem;
					height: .27rem;
					line-height: .27rem;
					border:1px solid #666;
					font-size:.15rem;
					color:#666;
					text-align: center;
					-webkit-border-radius: .135rem;
					-moz-border-radius: .135rem;
					border-radius: .135rem;
				}
			}
		}	
		.submitSuccessfully{
			display: none;
			text-align: center;
			font-size:.16rem;
			color: #666;
			line-height:1.35rem; 
		}	
	}
}
</style>


<!--

MemberApplyPfUserLst            专家申请-列表

ApplyPfUserChkPfUserNameExist   检查专家名称是否已存在

MemberApplyPfUserInitial        专家申请-初始化

MemberApplyPfUser               专家申请-数据提交    

ApplyPfUserForEditInitialById   专家申请-编辑数据初始化

ApplyPfUserForEditById          专家申请-编辑数据完成后产生回到申请列表

ApplyPfUserForEditUpdImg        专家申请-编辑申请数据 (更新图片)

RemoveApplyPfUser               专家申请-移除申请数据

-->