<template>
<div>
<link href="./static/css/user.css" rel="stylesheet">
	<div class="bgfff h100">
	<header class="head">
		<div class="back"><a class="backlink" @click="close"></a></div>
		<div class="headertit">
			<h1>登录</h1>
		</div>
		<div class="headBtnbox"></div>
		</header>
		<section class="pt48 loginbox">

		<div class="loginmenu topcenter">
			<p class="boxflex" v-bind:class="{'sed':isSmsLogin}" @click="showSmsLogin">手机快捷登录</p>
			<p class="boxflex" v-bind:class="{'sed':!isSmsLogin}" @click="showPwdLogin">密码登录</p>
		</div>
		<!-- 密码登录 -->
		<div v-show="!isSmsLogin">
			<div class="loginform">
			<div class="loginformlist border_b topcenter">
				<div class="label">手机号</div>
				<div class="boxflex topcenter">
				<input type="tel" class="input_nobd" v-model="formData.mobile" placeholder="请输入手机号">
				</div>
				<a class="icon_del" style="display: none;"></a>
			</div>
			<div class="loginformlist border_b topcenter">
				<div class="label">密码</div>
				<div class="boxflex topcenter">
				<input class="input_nobd" maxlength="12" type="password" v-model="formData.password" ref="password"  placeholder="请输入6-12位数字或字母" @keyup.enter="query">
				</div>
				<div class="iconbox50 topcenter flexend">
					<a class="icon_del" style="display: none;"></a>
					<a id="toggle" class="icon_eye" @click="see" v-if="is_look"></a>
					<a id="toggle" class="icon_eye icon_eye_sed" @click="see" v-if="is_see"></a>
				</div> <!-- 点击后替换或者增加样式名 icon_eye_sed  -->
			</div>

			<div class="btn_blockbox">
				<input class="btn btn_red btn_block" v-bind:class="{'btn_disabled':disabled}" type="button" value="登 录" @click="query">
				<loading :show="show_loading" :text="text_loading"></loading>
			</div>
			<div class="topcenter font12 line34 mb20">
				<p class="boxflex textl">
					<router-link to="register">立即注册</router-link>
				</p>
				<p class="boxflex textr">
					<router-link to="forgetpassword">忘记密码？</router-link>
				</p>
			</div>

			<!-- <div class="mt10 textc font12">
				<p class="gray8d">登录即代表您已满18岁并同意<a href="javascript:;">《服务协议》</a></p>
				<p class="gray8b">及<a href="javascript:;">《隐私政策》</a></p>
			</div> -->

			</div>
		</div>
		<!-- 手机快捷登录 -->
		<div v-show="isSmsLogin">
			<div class="loginform">

			<div class="loginformlist border_b topcenter">
				<div class="label">手机号</div>
				<div class="boxflex topcenter">
				<input type="tel" class="input_nobd" v-model="formData.mobile" placeholder="请输入手机号">
				</div>
				<a class="icon_del mr10" style="display: none;"></a>
				<p class="font12" v-show="isResend" @click="sendSms">发送验证码</p>
				<p class="font12" v-show="!isResend" ref="smsResendBtn">(60s)后重新发送</p>
			</div>


			<div class="loginformlist border_b topcenter">
				<div class="label">验证码</div>
				<div class="boxflex topcenter">
				<input type="tel" class="input_nobd" maxlength="4" v-model="formData.captcha" placeholder="请输入4位验证码">
				</div>
				<a class="icon_del mr10" style="display: none;"></a>
				<!-- <a class="font12" style="display: none;">未收到？接听语音验证码</a> -->
			</div>

			<div class="btn_blockbox">
				<input class="btn btn_red btn_block" v-bind:class="{'btn_disabled':disabled}" type="button" value="登 录" @click="smsLogin">
				<loading :show="show_loading" :text="text_loading"></loading>
			</div>
			<!-- <div class="topcenter font12 line34">
			<p class="boxflex textl"><a href="/user/setting/password/?act=reg" :backurl="backurl">注册账户</a></p>
			<p class="boxflex textr"><a href="/user/setting/password/?act=forget" :backurl="backurl">忘记密码</a></p>
			</div> -->

			<div class="mt10 textc font12">
				<p class="gray8d">未注册的手机号将自动创建为口袋好店账户</p>
				<p class="gray8d">登录即代表您已满18岁并同意<a href="javascript:;">《服务协议》</a></p>
				<p class="gray8b">及<a href="javascript:;">《隐私政策》</a></p>
			</div>
			</div>

		</div>

		</section>
	</div>
</div>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex';
import {Loading} from 'vux';
import qs from 'qs';
let telRE = /^1[3456789]\d{9}$/;
export default {
	data() {
		return {
			isSmsLogin: true,
			formData: {
				mobile: '',
				password: '',
				captcha: ''
			},
			ip: "",
			disabled:false,
			show_loading:false,
			text_loading:""	,
			is_look: true,
			is_see:false,
			isResend: true,
			countdown: 60,
		}
	},
	computed:{
		validation: function () {
			return {
				mobile: telRE.test(this.formData.mobile),
				password: !!this.formData.password.trim()
			}
		},
		isValid: function () {
			var validation = this.validation
			return Object.keys(validation).every(function (key) {
				return validation[key]
			})
		},
		isValidPhone: function () {
			return telRE.test(this.formData.mobile);
		},
		isValidSmsLogin: function () {
			return telRE.test(this.formData.mobile) && !!this.formData.captcha.trim();
		},
		
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
		showSmsLogin() {
			this.isSmsLogin = true;
		},
		showPwdLogin() {
			this.isSmsLogin = false;
		},
		setTime() {
			let me=this;
			if (this.countdown == 0) {
				this.isResend = true;
				this.countdown = 60;//60秒过后button上的文字初始化,计时器初始化;
				this.$refs.smsResendBtn.innerText = "("+this.countdown+"s)后重新发送";
				return;
			} else {
				this.isResend = false;
				this.$refs.smsResendBtn.innerText = "("+this.countdown+"s)后重新发送";
				this.countdown--;
			}
			setTimeout(function() { me.setTime() },1000); //每1000毫秒执行一次
		},
		sendSms() {
			let me=this;
			if(this.isValidPhone) {
				let params = {
					mobile: this.formData.mobile,
					event: "mobilelogin",
				};
				this.disabled = true;
				this.show_loading = true;
				this.text_loading = "请稍等";

				this.axios.post('/api/sms/send',qs.stringify(params)).then(res => {  
					let data=res.data;

					if(data.errorCode==1){
						me.$vux.alert.show({content: data.message})
						me.disabled = false;
						me.show_loading = false;
						this.isResend = false;
						this.setTime();
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
					content: '请输入正确手机号'
				})
				me.disabled = false;
				me.show_loading = false;
			}
		},
		smsLogin() {
			let me=this
			if(this.isValidSmsLogin) {
				let params = {
					mobile: this.formData.mobile,
					captcha: this.formData.captcha,
				};
				this.disabled = true;
				this.show_loading = true;
				this.text_loading = "请稍等";

				this.axios.post('/api/user/mobilelogin',qs.stringify(params)).then(res => {  
					let data=res.data;
					if(data.errorCode==1){
						me.setuser({info:data.result.userinfo});
						me.$emit('storedata');
						me.$router.push('/home');
					}else{
						me.$vux.alert.show({content: data.message});
						me.disabled = false;
						me.show_loading = false;
					}
				}).catch(function(err){
					console.log(err)
				}) 
			}else{
				this.$vux.alert.show({
					content: '请输入正确手机号和验证码'
				})
				me.disabled = false;
				me.show_loading = false;
			}
		},
		query() {
			let me=this
			if(this.isValid) {
				let params = {
					account: this.formData.mobile,
					password: this.formData.password,
				};
				this.disabled = true;
				this.show_loading = true;
				this.text_loading = "请稍等";

				this.axios.post('/api/user/login',qs.stringify(params)).then(res => {  
					let data=res.data;
					if(data.errorCode==1){
						me.setuser({info:data.result.userinfo});
						me.$emit('storedata');
						me.$router.push('/home');
					}else{
						me.$vux.alert.show({content: data.message});
						me.disabled = false;
						me.show_loading = false;
					}
				}).catch(function(err){
					console.log(err)
				});
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

</style>