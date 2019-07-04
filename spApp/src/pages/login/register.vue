<template>
	<div class="login-box">
		<header class="title">
			<span onclick="history.go(-1)" class="iconfont icon-fanhui">&#xe614;</span>
			<span>立即注册</span>
		</header>
		<div class="content">
			
			
			<div class="list">
				<span class="iconfont icon-shouji">&#xe60e;</span>
				<input type="text" id="phoneNumer" value="" placeholder="输入邮箱" v-model="formData.email" />
			</div>
			
			
			
			<div class="list">
				<span class="iconfont icon-shouji">&#xe61c;</span>
				<input type="text" id="phoneNumer" value="" placeholder="输入用户名" v-model="formData.username" />
			</div>
	
			
			<div class="list">
				<span class="iconfont icon-shouji">&#xe60e;</span>
				<input type="text" id="phoneNumer" value="" placeholder="输入手机号" v-model="formData.mobile" />
			</div>

			<!-- <div class="list">
				<span class="iconfont icon-yanzhengma">&#xe60f;</span>
				<input type="text" id="phoneCode" value="" placeholder="输入验证码" v-model="formData.code" />
				<button @click="code" class="code" :disabled="code_click">
					<span v-if="!code_click">发送验证码</span>
					<span v-if="code_click">{{count}}</span>
					<span v-if="code_click">秒之后重新获取</span>
				</button>
			</div> -->


			<div class="list">
				<span class="iconfont icon-mima">&#xe615;</span>
				<input type="password" placeholder="输入密码" v-model="formData.password" ref="pw" />
				<span class="iconfont icon-yanjingguanbi" @click="see" v-if="is_look">&#xe610;</span>
				<span class="iconfont icon-yanjingguanbi" @click="see" v-if="is_see">&#xe612;</span>
			</div>

			<button class="login-button" @click="query" :disabled="disabled">提交</button>
			
		
		</div>
	</div>
</template>

<script>

import {mapGetters,mapMutations} from 'vuex'
import {Loading} from 'vux'
import store from '@/store/';
import qs from 'qs'
export default {
	data() {
		return {
			formData: {
				username: '',
				email:'',
				mobile:'',
				password: ''
			},

			count: 60,
			code_click: false, //是否显示时间倒计时 
			is_look: true,
			is_see:false,
			ip:this.$store.state.user.ip,
			disabled: false,
			show_loading: false,
			text_loading: ''
		}
	},
	beforeRouteEnter(to, from, next) { //渲染页面前执行
		if (localStorage.token) {
			next('/home')	
		}else{
			next();
		}
	},
	mounted() {
		
	},
	props:['storedata'],
	methods: {
		...mapMutations({
			setuser:'setuser'
		}),

		query() {
			let reg = /^1[34578]\d{9}$/; //声明一个正则表达式	
			this.axios.post('/api/user/register',qs.stringify(this.formData)).then(res => {  
				let data=res.data;
				if(data.errorCode==1){
					console.log(data);
					this.setuser({info:data.result.userinfo})
					this.$emit('storedata')
					this.$router.push('/home')
				}else{
					alert(data.message);
				}

			}).catch(function(err){
				console.log(err)
			
			}) 										
			
		},
		see() {
			let type = this.$refs.pw.type;
			if(type === "password") {
				this.$refs.pw.type = "text";
				this.is_look = false;
				this.is_see = true;

			} else {
				this.$refs.pw.type = "password";
				this.is_look = true;
				this.is_see =  false;
			}

		},

		/* 获取验证码 */
		code() {
			let me=this;
			let tel=this.formData.username;

			if(!this.is_tel(tel)){
				me.$vux.alert.show({content:'请输入正确的手机号码'})
				return false;
			}

			this.code_click = true;
			let params = {
				SystemCode: "DQExport",
				MobileNo: tel,
				OperateIp: this.ip
			};
			let data = this.base.parameters(params);
			this.axios.post(this.host+"/api/GetSmsCodeForRM",data).then(res => {
				let ViewModel=JSON.parse(res.data.ViewModel)
				if(ViewModel.ErrCode=='00000000'){	
					let timer = setInterval(() => {
						this.count--;
						if(this.count <= 0) {
							clearInterval(timer);
							this.code_click = false;
							this.count = 120;
						}
					}, 1000);
				}else{
					me.$vux.alert.show({
						content: ViewModel.ErrMsg
					})
					me.code_click=false;
				}
			});
		},
		/* 电话检查 */
		is_tel(phone){
			if(!(/^1[34578]\d{9}$/.test(phone))){   
				return false; 
			}else{
				return true;
			}
		}
	},
	computed:{     		
	},
	store,
	watch: {},
	props: {},
	components: {
	
	},
}
</script>


<style lang="less" scoped="scoped">
	body,
	html {
		width: 100%;
		height: 100%;
		background: white;
	}
	
	.login-box {
		width: 100%;
		height: 100%;
		background: white;
	}
	
	.login-box {
		.close span {
			display: inline-block;
			height: 0.3rem;
			position: absolute;
			right: 0.21rem;
			overflow: hidden;
		}
		.icon-guanbi {
			color: white;
			font-size: .3rem;
		}
		.content {
			padding: 0.3rem 0.225rem 0;
			position: absolute;
			top: .44rem;
			left: 0;
			background: #fff;
			width: 100%;
			height: 100%;	
		}
		.list {
			display: flex;
			align-items: center;
			border-bottom: 1px solid #cccccc;
			margin-top: 0.15rem;
			position: relative;
			input {
				width: 100%;
				padding:.1rem .3rem;
				font-size: .16rem;
				line-height:.3rem;
			}
			.iconfont{
				position: absolute;
			}
			
		}
		
		.icon-yanjingguanbi{
			font-size: .25rem;
			color: #CCC8C7;
			float: right;
			position: absolute;
			right: 0;
		}
		.login-button {
			width: 100%;
			margin: 0 auto;
			height: 0.4rem;
			background: #ef1823;
			color: white;
			line-height: 0.4rem;
			text-align: center;
			margin-top: 0.4rem;
			border-radius: 10px;
		}
		.other-login {
			padding: 0.2rem 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		.return {
			display: block;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			padding:0rem .1rem;
			display: flex;
			align-items: center;
		}
		.code {
			background: #efefef;
			font-size: 0.12rem;
			color: rgb(102, 102, 102);
			display: flex;
			align-items: center;
			justify-content: center;
			vertical-align: middle;
			padding: 0.07rem 0.1rem;
			border: 1px solid #a9a9a9;
		}
		.code span {
			color: rgb(102, 102, 102);
			white-space: nowrap;
		}
		.other-login {
			padding: 0.2rem 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		.other-login a {
			color: rgb(34, 34, 34);
			font-size: 0.14rem;
		}
		.icon-shouji {
			font-size: .24rem;
			color: #ccc8c7;
			vertical-align: middle;
			left: 0;
		}
		.icon-mima,
		.icon-yanzhengma {
			font-size: .24rem;
			color: #ccc8c7;
			left:0;
		}
	}
</style>