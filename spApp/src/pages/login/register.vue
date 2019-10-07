<template>
<div>
<link href="./static/css/user.css" rel="stylesheet">
<div class="bgfff h100">
    <header class="head">
      <div class="back w40"><a class="backlink" @click="close"></a></div>
      <div class="headertit">
        <h1>账号注册</h1>
      </div>
      <div class="headBtnbox w40">&nbsp;</div>
    </header>

    <section class="pt48 password">
        <div class="findfastext">请填写你的手机号和验证码</div>

        <div class="loginform">
          <div class="loginformlist topcenter border_b">
            <div class="label">手机号</div>
            <div class="boxflex">
              <input type="text" class="input_nobd telnum" v-model="formData.mobile" placeholder="请输入手机号" >
              <span style="display: none;"></span>
            </div>
            <a class="icon_del mr10" style="display:none"></a>
			<p class="font12" v-show="isResend" @click="sendSms">发送验证码</p>
			<p class="font12" v-show="!isResend" ref="smsResendBtn">(60s)后重新发送</p>
          </div>
          <div class="loginformlist topcenter border_b">
            <span class="label">验证码</span>
            <p class="boxflex"><input class="input_nobd" type="number" maxlength="4" v-model="formData.captcha" placeholder="请输入4位验证码">
            </p>
            <a class="icon_del" style="display: none;"></a>
          </div>
		  <div class="loginformlist border_b topcenter">
            <div class="label">新密码</div>
            <div class="boxflex">
              <input class="input_nobd" type="password" maxlength="12" v-model="formData.password" ref="password" placeholder="请输入6-12位数字或字母">
            </div>
            <div class="iconbox50 topcenter flexend">
				<a class="icon_del" style="display: none;"></a>
				<a id="toggle" class="icon_eye" @click="see" v-if="is_look"></a>
				<a id="toggle" class="icon_eye icon_eye_sed" @click="see" v-if="is_see"></a>
			</div>
          </div>
          <div class="btn_blockbox">
			  <input class="btn btn_red btn_block" v-bind:class="{'btn_disabled':disabled}" type="button" value="立即注册" @click="query">
		  </div>

          <p class="textc font12 mt20">注册即代表您已满18岁并同意<a href="javascript:;">《服务协议》</a><br>及<a href="javascript:;">《隐私政策》</a></p>

        </div>

    </section>
  </div>

</div>
</template>

<script>
import store from '@/store/';
import qs from 'qs'
import {Loading} from 'vux'
let telRE = /^1[3456789]\d{9}$/;
export default {
	data() {
		return {
			formData: {
				mobile: '',
				password: '',
				captcha: ''
			},
			is_look: true,
			is_see:false,
			disabled:false,
			show_loading:false,
			text_loading:""	,
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
					event: "register",
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
		query() {
			let me=this
			if(this.isValid) {
				let params = {
					mobile: this.formData.mobile,
					password: this.formData.password,
					captcha: this.formData.captcha,
				};
				this.disabled = true;
				this.show_loading = true;
				this.text_loading = "请稍等";

				this.axios.post('/api/user/register',qs.stringify(params)).then(res => {  
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
				});
			}else{
				this.$vux.alert.show({
					content: '请输入正确的信息'
				});
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
		},
		
	},
	store
}
</script>