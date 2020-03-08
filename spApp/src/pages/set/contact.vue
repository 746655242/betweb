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
        <h1>联系方式设置</h1>
      </div>
      <div class="headBtnbox"></div>
    </header>

    <div class="pt48">
      <div class="topcenter textinfo">
        <p class="gray8d">设置联系方式后，可方便店铺与您联系。</p>
      </div>
      <section class="settingpayment">
        <div class="listboxplr0 balancedrawlist mb20">
          <div class="list_item flexbox"> <em class="usericon2 icon_weixin mt5"></em>
            <div class="boxflex">
              <div class="topcenter">
                <p class="boxflex font16">微信</p>
                <a class="borderbtn" v-if="weixin==''" @click="editWeixin()" v-show="!weixinEdit">设置</a>
                <a class="borderbtn" v-else @click="editWeixin()" v-show="!weixinEdit">修改</a>
              </div>
              <div class="topcenter">
                <p class="boxflex gray8d">微信账号：
                  <span v-if="weixin==''" v-show="!weixinEdit">未设置</span>
                  <span v-else v-show="!weixinEdit">{{weixin}}</span>
                  <input type="text" class="inputborder" v-model="weixin" v-show="weixinEdit">
                </p>
                <a class="btn btn_red" v-show="weixinEdit" @click="updateWeixin()">保存</a>
              </div>
            </div>
          </div>
          <div class="list_item flexbox"> <em class="usericon2 icon_alipay mt5"></em>
            <div class="boxflex">
              <div class="topcenter">
                <p class="boxflex font16">支付宝</p>
                <a class="borderbtn" v-if="alipay==''" @click="editAlipay()" v-show="!alipayEdit">设置</a>
                <a class="borderbtn" v-else @click="editAlipay()" v-show="!alipayEdit">修改</a>
              </div>
              <div class="topcenter">
                <p class="boxflex gray8d">支付宝账号：
                  <span v-if="alipay==''" v-show="!alipayEdit">未设置</span>
                  <span v-else v-show="!alipayEdit">{{alipay}}</span>
                  <input type="text" class="inputborder" v-model="alipay" v-show="alipayEdit">
                </p>
                <a class="btn btn_red" v-show="alipayEdit" @click="updateAlipay()">保存</a>
              </div>
            </div>
          </div>
          <!-- <div class="list_item flexbox">            <em class="usericon2 icon_qq mt5"></em>            <div class="boxflex">                <div class="topcenter"><p class="boxflex font16">QQ钱包</p><a class="borderbtn" v-text="page.editBtn.qq" v-show="!page.show.qq" @click="startEdit('qq')">设置</a></div>                <div class="topcenter"><p class="boxflex gray8d">QQ账号：<span v-text="page.payment.qq" v-show="!page.show.qq"></span><input type="text" class="inputborder" style="display:none;" v-model="edit.qq" value="" v-show="page.show.qq"></p><a class="btn btn_red" style="display:none;" v-show="page.show.qq" @click="doEdit">保存</a></div>            </div>        </div> -->
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex';
  import {Loading} from 'vux';
  import qs from 'qs';

  export default {
    data() {
      return {
        weixin: "",
        alipay: "",
        weixinEdit: false,
        alipayEdit: false,

        disabled: false,
        show_loading: false,
        text_loading: "",
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
    },
    components: {

    },
    methods: {
      fetchData() {
        let me = this;
        let user = this.user.info;
        if (user && user.token) {
          this.axios.post('/api/user/getuser').then(res => {
            let data = res.data;
            if (data.errorCode == 1) {
              this.loadContact(data.result.userinfo.weixin, data.result.userinfo.alipay);
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
      loadContact(weixin, alipay) {
        this.weixin = weixin;
        this.alipay = alipay;
      },
      editWeixin(){
        this.weixinEdit = true;
      },
      editAlipay(){
        this.alipayEdit = true;
      },

      //更新微信
      updateWeixin() {
        let me = this;
        let params = {
          weixin: this.weixin,
        };
        this.disabled = true;
        this.show_loading = true;
        this.text_loading = "请稍等";

        this.axios.post('/api/user/updateContact', qs.stringify(params)).then(res => {
          let data = res.data;
          if (data.errorCode == 1) {
            me.$vux.alert.show({
              content: data.message
            });
            me.$router.push('/mySet');
            me.setuser({info: data.result.userinfo});
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
      },

      //更新支付宝
      updateAlipay() {
        let me = this;
        let params = {
          alipay: this.alipay,
        };
        this.disabled = true;
        this.show_loading = true;
        this.text_loading = "请稍等";

        this.axios.post('/api/user/updateContact', qs.stringify(params)).then(res => {
          let data = res.data;
          if (data.errorCode == 1) {
            me.$vux.alert.show({
              content: data.message
            });
            me.$router.push('/mySet');
            me.setuser({info: data.result.userinfo});
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
      },

    },
    activated: function () {

    }
  }
</script>