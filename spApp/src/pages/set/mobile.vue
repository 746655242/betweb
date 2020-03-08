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
        <h1>修改手机号</h1>
      </div>
      <div class="headBtnbox"></div>
    </header>

    <div class="pt48">
      <div class="topcenter textinfo"><em class="icon_tips mr10">i</em>
        <p class="gray8d">更换手机后，下次登录可使用新手机号登录。<br>当前手机号:{{mobileShow}}</p>
      </div>
      <section class="settingmobile">
        <ul class="listboxpr0 mb15">
          <li class="list_item topcenter listinput">
            <p class="listtitwid">手机号</p>
            <p class="boxflex"><input class="form-control" type="text" v-model="newMobile" placeholder="请填写手机号码"></p>
            <em class="icon_del" style="display: none;"></em>
          </li>
          <li class="list_item topcenter listinput">
            <p class="listtitwid">验证码</p>
            <p class="boxflex">
              <input class="form-control" type="text" maxlength="4" v-model="captcha" placeholder="请输入4位短信验证码">
            </p>
            <em class="icon_del mr10" style="display: none;"></em>
            <p class="font12 fontblue" style="cursor:pointer" v-show="isResend" @click="sendSms">发送验证码</p>
            <p class="font12 fontblue" v-show="!isResend" ref="smsResendBtn">(60s)后重新发送</p>
          </li>
        </ul>
        <div class="btn_blockbox mt50">
          <input class="btn btn_red btn_block" v-bind:class="{'btn_disabled':disabled}" type="button" value="提交" @click="query">
        </div>
      </section>
    </div><!-- 保存 -->
    <div class="layerbox" id="" style=" display:none;">
      <div class="alertlayer">
        <div class="alertlayercon ">
          <p class="mt10">手机号修改成功！</p>
          <p class="mb10 font12">下次可使用新手机号登录。</p>
        </div> <a class="closebtn">关闭</a>
      </div>
    </div>
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
        newMobile: "",
        captcha: "",
        disabled: false,
        show_loading: false,
        text_loading: "",
        isResend: true,
        countdown: 60,
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
        return telRE.test(this.newMobile);
      },
      isValidSms: function () {
        return telRE.test(this.newMobile) && !!this.captcha.trim();
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
        this.mobileShow = mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
      },
      clearMobile() {
        this.newMobile = "";
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
            mobile: this.newMobile,
            event: "changemobile",
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
      //更新手机号
      query() {
        let me = this
        if (this.isValidSms) {
          let params = {
            mobile: this.newMobile,
            captcha: this.captcha,
          };
          this.disabled = true;
          this.show_loading = true;
          this.text_loading = "请稍等";

          this.axios.post('/api/user/changemobile', qs.stringify(params)).then(res => {
            let data = res.data;
            if (data.errorCode == 1) {
              me.$router.push('/mySet');
              me.setuser({
                info: data.result.userinfo
              });
              me.$emit('storedata');
            } else {
              me.$vux.alert.show({
                content: data.message
              });
              me.disabled = false;
              me.show_loading = false;
            }
          }).catch(function (err) {
            window.console.log(err);
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