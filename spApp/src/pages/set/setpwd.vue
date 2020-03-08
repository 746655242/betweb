<template>
  <div>
    <link href="./static/css/user.css" rel="stylesheet">
    <header class="head mb15">
      <div class="back">
        <router-link to="/mySet">
          <p class="backlink"></p>
        </router-link>
      </div>
      <div class="headertit">
        <h1>账号验证</h1>
      </div>
      <div class="headBtnbox"></div>
    </header>

    <section class="pt48 password">
      <form v-show="!isSetPwd">
        <div class="findfastext">为保证账户安全，请填写手机验证码进行验证</div>
        <div class="loginform">
          <div class="loginformlist topcenter border_b">
            <div class="label">手机号</div>
            <div class="boxflex">
              <input type="text" class="input_nobd telnum" id="userName" placeholder="请输入手机号" style="display: none;">
              <span style="">{{mobileShow}}</span>
            </div>
            <a class="icon_del mr10" style="display:none"></a>
            <p class="font12 fontblue" style="cursor:pointer" v-show="isResend" @click="sendSms">发送验证码</p>
            <p class="font12 fontblue" v-show="!isResend" ref="smsResendBtn">(60s)后重新发送</p>
          </div>
          <div class="loginformlist topcenter border_b"> <span class="label">验证码</span>
            <p class="boxflex">
              <input class="input_nobd" type="number" v-model="captcha" maxlength="4" placeholder="请输入4位验证码">
            </p>
            <a class="icon_del" style="display: none;"></a>
            <!-- <a class="font12" style="display: none;">-未收到？接听语音验证码</a> -->
          </div>
          <div class="btn_blockbox">
            <input class="btn btn_red btn_block" v-bind:class="{'btn_disabled':disabled}" type="button" value="下一步"  @click="setPwdPage">
          </div>
          <p class="textc font12 mt20">注册即代表您已满18岁并同意<a herf="javascript:;">《服务协议》</a><br>及<a
              herf="javascript:;">《隐私政策》</a>
          </p>
        </div>
      </form> <!-- 设置密码 -->

      <form v-show="isSetPwd">
        <div class="findfastext">为你的账户 <span class="fontred">{{mobileShow}}</span> 设置一个新密码</div>
        <div class="loginform">
          <div class="loginformlist border_b topcenter">
            <div class="label">密码</div>
            <div class="boxflex"> <input class="input_nobd" type="password" v-model="newpassword" maxlength="12" placeholder="请输入6-12位数字或字母">
            </div>
            <div class="iconbox50 topcenter flexend">
              <a class="icon_del" style="display: none;"></a>
              <a id="toggle" class="icon_eye"></a>
            </div> <!-- 点击后替换或者增加样式名 icon_eye_sed  -->
          </div>
          <div class="btn_blockbox">
            <input class="btn btn_red btn_block" v-bind:class="{'btn_disabled':disabled}" type="button" value="保存密码"  @click="query">
          </div>
          <p class="textc font12 mt10" style="display:none">注册即代表您已满18岁并同意<a herf="javascript:;">《服务协议》</a><br>及<a
              herf="javascript:;">《隐私政策》</a>
          </p>
        </div>
      </form>
    </section>
  </div>
</template>

<script>
  import {
    mapGetters,
    mapMutations
  } from 'vuex';
  import {
    Loading
  } from 'vux';
  import qs from 'qs';

  let telRE = /^1[3456789]\d{9}$/;

  export default {
    data() {
      return {
        mobile: "",
        mobileShow: "",
        captcha: "",
        newpassword: "",
        disabled: false,
        show_loading: false,
        text_loading: "",
        isResend: true,
        countdown: 60,
        isSetPwd: false,
      }
    },
    created() {
      this.fetchData();
    },
    computed: {
      ...mapGetters({
        user: 'getuser'
      }),
      ...mapMutations({
        setuser: 'setuser'
      }),
      isValidPhone: function () {
        return telRE.test(this.mobile);
      },
      isValidSms: function () {
        return telRE.test(this.mobile) && !!this.captcha.trim();
      },
    },
    components: {
      Loading
    },
    methods: {
      fetchData() {
        let me = this;
        let user = this.user.info;
        if (user && user.token) {
          this.axios.post('/api/user/getuser').then(res => {
            let data = res.data;
            if (data.errorCode == 1) {
              this.loadMobileShow(data.result.userinfo.mobile);
            } else {
              // me.$vux.alert.show({content: data.message})
              // me.disabled = false;
              // me.show_loading = false;
            }
          }).catch(function (err) {
            window.console.log(err);
          })
        } else {
          // this.$router.push('/login');
        }
      },
      loadMobileShow(mobile) {
        this.mobile = mobile;
        this.mobileShow = mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
      },
      setTime() {
        let me = this;
        if (this.countdown == 0) {
          this.isResend = true;
          this.countdown = 60; //60秒过后button上的文字初始化,计时器初始化;
          this.$refs.smsResendBtn.innerText = "(" + this.countdown + "s)后重新发送";
          return;
        } else {
          this.isResend = false;
          this.$refs.smsResendBtn.innerText = "(" + this.countdown + "s)后重新发送";
          this.countdown--;
        }
        setTimeout(function () {
          me.setTime()
        }, 1000); //每1000毫秒执行一次
      },
      sendSms() {
        let me = this;
        if (this.isValidPhone) {
          let params = {
            mobile: this.mobile,
            event: "resetpwd",
          };
          this.disabled = true;
          this.show_loading = true;
          this.text_loading = "请稍等";

          this.axios.post('/api/sms/send', qs.stringify(params)).then(res => {
            let data = res.data;

            if (data.errorCode == 1) {
              me.$vux.alert.show({
                content: data.message
              })
              me.disabled = false;
              me.show_loading = false;
              this.isResend = false;
              this.setTime();
            } else {
              me.$vux.alert.show({
                content: data.message
              })
              me.disabled = false;
              me.show_loading = false;
            }
          }).catch(function (err) {
            window.console.log(err)
          })
        } else {
          this.$vux.alert.show({
            content: '请输入正确手机号'
          })
          me.disabled = false;
          me.show_loading = false;
        }
      },
      setPwdPage() {
        if (this.isValidSms) {
          this.isSetPwd = true;
        }
      },
      //更新手机号
      query() {
        let me = this
        if (this.isValidSms) {
          let params = {
            type: "mobile",
            mobile: this.mobile,
            newpassword: this.newpassword,
            captcha: this.captcha,
          };
          this.disabled = true;
          this.show_loading = true;
          this.text_loading = "请稍等";

          this.axios.post('/api/user/resetpwd', qs.stringify(params)).then(res => {
            let data = res.data;
            if (data.errorCode == 1) {
              me.$vux.alert.show({
                content: data.message
              });
              me.$router.push('/mySet');
            } else {
              me.$vux.alert.show({
                content: data.message
              })
              me.disabled = false;
              me.show_loading = false;
            }
          }).catch(function (err) {
            window.console.log(err)
          });
        } else {
          this.$vux.alert.show({
            content: '请输入正确的信息'
          });
          me.disabled = false;
          me.show_loading = false;
        }
      },

      close() {
        this.$router.push({
          path: '/mySet',
        });
      },
    },
    activated: function () {

    }
  }
</script>