<template>
	<div class="login-box">
		<header class="title">
			<span>登陆</span>
			<router-link to="home" class="close"><span @click="close" class="iconfont icon-guanbi">&#xe613;</span></router-link>
		</header>
		<div class="content">
			<div class="list">
				<span class="iconfont icon-shouji">&#xe60e;</span>
				<input type="text"  placeholder="请在这里输入手机号" v-model="formData.username" />
			</div>

			<div class="list">
				<span class="iconfont icon-mima">&#xe615;</span>
				<input type="password" placeholder="请输入密码" v-model="formData.password" ref="password" @keyup.enter="query" />
				<span class="iconfont icon-yanjingguanbi" @click="see" v-if="is_look">&#xe610;</span>
				<span class="iconfont icon-yanjingguanbi" @click="see" v-if="is_see">&#xe612;</span>
			</div>

			<button class="login-button" @click="query" :disabled="disabled">登录</button>
			<loading :show="show_loading" :text="text_loading"></loading>
			<div class="other-login">
				<router-link to="register">立即注册</router-link>
				<router-link to="forgetpassword">忘记密码？</router-link>
			</div>
		</div>
	</div>
</template>

<script>

	import {mapGetters,mapMutations} from 'vuex'
	import {Loading} from 'vux'
	import qs from 'qs'
	let telRE = /^1[3456789]\d{9}$/;
	export default {
		data() {
			return {
				formData: {
					username: '',
					password: ''
				},
				ip: "",
				disabled:false,
				show_loading:false,
				text_loading:""	,
				is_look: true,
				is_see:false,
			}
		},
		computed:{
			validation: function () {
				return {
					username: telRE.test(this.formData.username),
					password: !!this.formData.password.trim()
				}
			},
			isValid: function () {
				var validation = this.validation
				return Object.keys(validation).every(function (key) {
					return validation[key]
				})
			}
		},
		components: {
			Loading
		},
		props:['storedata'],
		beforeRouteEnter(to, from, next){
			if(localStorage.user){
				let token=JSON.parse(localStorage.user)
				token&&token.info?next('/home'):next()
			}else{
				next()
			}
		},
		methods: {
			...mapMutations({
				setuser:'setuser'
			}),
			query() {
				let me=this
				if(this.isValid) {
					
					let params = {
						account: this.formData.username,
						password: this.formData.password,
					};
					this.disabled = true;
					this.show_loading = true;
					this.text_loading = "请稍等";


					this.axios.post('/api/user/login',qs.stringify(params)).then(res => {  
						let data=res.data;

						if(data.errorCode==1){
							me.setuser({info:data.result.userinfo})
							me.$emit('storedata')
							me.$router.push('/home')
						}else{
							me.$vux.alert.show({content: data.message})
							me.disabled = false;
					 		me.show_loading = false;
						}



					}).catch(function(err){
						console.log(err)
					
					}) 
		

		
				}else{
					this.$vux.alert.show({
						content: '请输入正确手机号和密码'
					})
					me.disabled = false;
					me.show_loading = false;
				}
			},
			see() {
				let type = this.$refs.password.type;
				if(type === "password") {
					this.$refs.password.type = "text";
					this.is_look = false;
					this.is_see = true
				} else {
					this.$refs.password.type = "password";
					this.is_look = true;
					this.is_see = false
				}
			},
			close() {
				this.$router.push({
					path: 'home',
					query: {
						status: '游客状态'
					}
				});
			}

		}
	}
</script>

<style lang="less" scoped="scoped">
	html,
	body {
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
			height: .44rem;
			position: absolute;
			right: 0rem;
			padding:0 .15rem;
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
		.icon-yanjingguanbi {
			font-size: .24rem;
			color: #CCC8C7;
			float: right;
			position: absolute;
			right: .1rem;
		}
		.icon-yanjingdakai {
			position: absolute;
			right: .1rem;
		}
		.login-button {
			width: 100%;
			margin: 0 auto;
			height: 0.4rem;
			background: @red;
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
			color: rgb(34, 34, 34);
			font-size: 0.14rem;
		}
		.icon-shouji {
			font-size: .24rem;
			color: #ccc8c7;
			vertical-align: middle;
			left:0
		}
		.icon-mima {
			font-size: .24rem;
			color: #ccc8c7;
			left:0;
		}
	}
</style>