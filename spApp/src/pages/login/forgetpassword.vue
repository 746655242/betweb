<template>
	<div class="login-box">
		<header class="title">
			<span onclick="history.go(-1)" class="iconfont icon-fanhui">&#xe614;</span>
			<span>忘记密码</span>
		</header>
		<div class="content">
			<div class="list">
				<span class="iconfont icon-shouji">&#xe60e;</span>
				<input type="text" name="" id="" value="" placeholder="输入手机号" v-model="formData.userphone" />
			</div>
			<div class="list">
				<span class="iconfont icon-yanzhengma">&#xe60f;</span>
				<input type="text" name="" id="" value="" placeholder="输入验证码" v-model="formData.code" />
				<div @click="code" class="code" :disabled="code_click">
					<span v-if="!code_click">发送验证码</span>
					<span v-if="code_click">{{count}}</span>
					<span v-if="code_click">秒之后重新获取</span>
				</div>
			</div>
			<button class="login-button" @click="query">提交</button>
		</div>
	</div>
</template>
<style lang="less" scoped="scoped" >
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
			width: 100%;
			height: 100%;
			background: #fff;
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
		.icon-yanjingguanbi,
		.icon-yanjingdakai {
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
		.other-login a {
			color: #222222;
			font-size: 0.14rem;
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
			font-size: .2rem;
			color: #ccc8c7;
			vertical-align: middle;
			padding-right: 0.11rem;
		}
		.icon-mima,
		.icon-yanzhengma {
			font-size: .24rem;
			color: #ccc8c7;
			padding-right: 0.11rem;
		}
	}
</style>
<script>
	import store from '@/store/';
	let count = 11;
	export default {
		data() {
			return {
				formData: {
					userphone: '',
					code: '',
				},
				code_click: false,
				count: 60
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
		methods: {
			query() {
				let reg = /^1[34578]\d{9}$/;
				if(reg.test(this.formData.userphone)&&this.formData.code) {
					let params = {
						MobileNo : this.formData.userphone,
						SmsCode : this.formData.code,
						OperateCode:this.base.isDevice(),
						OperateIp: store.state.user.ip,
					} 
					let data=this.base.parameters(params)
					this.axios.post(this.host+'/api/ForgotPwLogon', data).then(res => {
						let request = JSON.parse(res.data.ViewModel);						
						if (request.ErrCode === '00000000') {
							localStorage.token = request.ActionCode.MemberToken;
							this.$router.push("resetpassword");
						}else{
							this.$vux.alert.show({
								content: request.ErrMsg
							})
						}					
					})
				} else {
					this.$vux.alert.show({
						content: '请输入正确的信息'
					})
				}
			},
			/* 获取验证码 */
			code() {
				let me=this;
				let tel=this.formData.userphone;

				if(!this.is_tel(tel)){
					me.$vux.alert.show({content:'请输入正确的手机号码'})
					return false;
				}
				
				this.code_click = true;
				let params = {
					SystemCode: "DQExport",
					MobileNo: tel,
					OperateIp: this.$store.state.user.ip
				};
				let data = this.base.parameters(params);
				this.axios.post(this.host+"/Api/GetSmsCodeForFP",data).then(res => {
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
		store
		
	}
</script>