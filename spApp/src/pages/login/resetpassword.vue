<template>
	<div class="login-box">
		<header class="title">
			<span onclick="history.go(-1)" class="iconfont icon-fanhui">&#xe614;</span>
			<span>重置密码</span>
		</header>
		<div class="content">
			<div class="list">
				<span class="iconfont icon-mima1">&#xe615;</span>
				<input type="password" name="" id="" value="" placeholder="请输入密码" v-model="formData.password" />
			</div>
			<div class="list">
				<span class="iconfont icon-querenmima">&#xe616;</span>
				<input type="password" name="" id="" value="" placeholder="请再次确认密码" v-model="formData.surepassword" />
			</div>
			<button class="login-button" @click="query" :disabled="disabled">提交</button>
		</div>
		<loading :show="show_loading" :text="text_loading"></loading>
	</div>
</template>
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
			width: 100%;
			height: 100%;
			background: #fff;
		}
		.list {
			display: flex;
			align-items: center;
			border-bottom: 1px solid #cccccc;
			padding-bottom: 0.12rem;
			margin-top: 0.2rem;
			position: relative;
		}
		.list input {
			width: 80%;
			height: 0.5rem;
			border: none;
			outline: none;
			margin-bottom: 0;
			font-size: 0.16rem;
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
			padding-right: .05rem;
		}
		.icon-mima1,
		.icon-querenmima {
			font-size: .18rem;
			color: #ccc8c7;
			padding-right: 0.11rem;
		}
	}
</style>
<script>
	import store from '@/store/';
	import {Loading} from 'vux'
	let count = 11;
	export default {
		data() {
			return {
				formData: {
					password: '',
					surepassword: '',
				},
				disabled: false,
				show_loading: false,
				text_loading: ''
			}
		},
		beforeRouteEnter(to, from, next) { //渲染页面前执
			if(localStorage.token) {
				next()
			} else {
				next('/forgetpassword');
			}
		},
		mounted() {
		},
		methods: {
			query() {									
				if (this.formData.password === this.formData.surepassword) { //这里判断两次密码是否相同 如果相同才能发送请求 
					let ref = /^[a-zA-Z\d_]{6,16}$/
					if (!(ref.test(this.formData.password) && ref.test(this.formData.surepassword))) {
						this.$vux.alert.show({
							content: "请输入6-16位密码"
							})
					}else{						
						let params = {
							MemberToken : localStorage.token,
							NewPw:this.formData.surepassword,
							OperateIp: store.state.user.ip
						}
											
						let data = this.base.parameters(params);
						
						this.show_loading = true;
						this.text_loading = '请稍等';
						this.disabled = true;
						this.axios.post(this.host+'/api/MemberChangePw',data).then(res => {
							let request = JSON.parse(res.data.ViewModel);
							if(request.ErrCode === "00000000") {
								this.disabled = false;
								this.show_loading = false;
								this.$router.push("login");
							} else{
								this.$vux.alert.show({
									content: request.ErrMsg
								})
								this.disabled = false;
							}	this.show_loading = false;
						})
						
					} 
				} else {
					this.$vux.alert.show({
						content: "两次密码输入不同"
					})
				}

			},
			cancel() {},
		},
		computed: {},
		store,
		watch: {},
		props: {},
		components: {
			Loading
		},
	}
</script>