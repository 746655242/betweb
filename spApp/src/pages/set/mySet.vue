<template>
    <div v-title data-title="我的" class="mineWrap">
     	<header class="mineHeader">
     		<span onclick="history.go(-1)" class="iconfont icon-fanhui">&#xe614;</span>
			<span>设置</span>
     	</header>
		<div class="mySetBox">
			<div class="mySetCont">
				<router-link :to="item.path" v-for="(item,index) in mySetList" :key="index" @click.native="clearCache">
					<span>{{item.text}}</span>
					<i class="iconfont icon-enter">&#xe606;</i>
				</router-link>
			</div>
			<div class="exitAccount" @click="exitAccount">
				<input type="button" value="退出当前账号"/>
			</div>
			<div class="mask" v-show="maskShow"></div>
			<div class="clearCache" v-show="clearShow">
				<h3>确定要清除缓存?</h3>
				<p>
					<span @click="cancelClearCache">取消</span>
					<span class="clearNow" @click="clearNow">立即清除</span>
				</p>
			</div>
		</div>
    </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
    data(){
        return {
			mySetList:[
				// {text:'修改手机号码',path:'/modifiedPhoneNumber'},
				// {text:'修改密码',path:'/resetpassword'},
				{text:'清除缓存',path:''},
				// {text:'意见反馈',path:'/feedback'},
			],
			maskShow:false,
			clearShow:false,
        }
    },
    created(){
//  	this.fetchData();
    },
	computed:{
		
	},
	components:{

	},
    methods: {
		...mapMutations(['deluser']),
		clearCache(){
			this.maskShow = !this.maskShow
			this.clearShow = !this.clearShow
		},
		cancelClearCache(){
			this.maskShow = false
			this.clearShow = false
		},
		clearNow(){			
			this.maskShow = false
			this.clearShow = false
			alert("缓存已清除")
		},
		exitAccount(){
			
			localStorage.removeItem('user')
			this.deluser()
			this.$router.push('/login')
		},
    	fetchData(){
			let me= this;
			let user=this.user.inof
			if(user&&user.MemberToken){
				
				this.base.getData(this,this.host+'/api/GetExportMyAccount',{},function(data){	
					
					console.log(data)
				
				})
    		}else{
				this.$router.push('/login')
			}
		},
    },
    activated:function(){	
    	
	}
}
</script>

<style lang="less" scoped="scoped">
.mineWrap{
	.mySetBox{
		padding-top:.44rem;
		.mySetCont{
			background: #fff;
			width: 100%;
			padding:0 .15rem;
			margin:.1rem 0;
			a{
				display: block;
				height: .49rem;
				line-height: .49rem;
				border-bottom: .01rem solid #eaeaea;
				padding-right: .05rem;
				overflow: hidden;
				span{
					float: left;
					font-size: .15rem;					
					color: #555;
					font-weight: 600;
				}
				i{
					float: right;
					font-size: .14rem;
					color: #999;
				}
			}
			a:last-child{
				border-bottom:none;
			}
		}
		.exitAccount{
			padding: 0 .15rem;
			input{
				width: 100%;
				height: .45rem;
				line-height: .45rem;
				background: @red;
				-webkit-border-radius: .1rem;
				-moz-border-radius: .1rem;
				border-radius: .1rem;
				font-size: .15rem;
				color: #fff;
				letter-spacing: .025rem;
			}
		}
	}
	.mask{
		position: fixed;
		top:0;
		left:0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.3);
	}
	.clearCache{
		width: 60%;
		background: #fff;		
		position: fixed;
		z-index:2;
		top: 50%;
		left: 50%;
		margin-top:-25% ;
		margin-left:-30%;
		h3{
			height: .9rem;
			line-height: .9rem;
			font-size: .15rem;
			text-align: center;
			border-bottom: 1px solid #ddd;
		}
		p{
			text-align: center;
			font-size: 0;
			span{
				display: inline-block;			
				width: 50%;
				height: .45rem;
				line-height: .45rem;
				font-size: .14rem;
			}
			.clearNow{
				border-left: 1px solid #ddd;
			}
		}
	}
}
</style>