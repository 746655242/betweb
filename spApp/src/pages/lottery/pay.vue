<template>
<div>
<link href="./static/css/user.css" rel="stylesheet">
<header class="head">
    <div class="back"><a class="backlink" @click="home"></a></div>
    <div class="headertit topcenter column">
      <h2>我的店内账本</h2>
      <h3>福盈中央山订单站</h3>
    </div>
    <div class="headBtnbox"><a class="fr"><em class="headicon icon_tel"></em></a></div>
  </header>

  <section class="pt48 balance" v-show="!isShowCharge">
    <div class="pad30px mb15 border_b bgfff balance_top">
      <div class="topcenter mt10 font16">
        <p class="topcenter boxflex gray6">店内账本数额&nbsp;&nbsp;<a href="javascript:;"><span class="iconbg iconbg_helpgray"></span></a>
        </p>
        <router-link to="/account/detail">账本明细</router-link>
      </div>
      <div>
        <span class="gray3 moneynum">{{money}}</span>
        <span class="gray6 bounsnum" style="display: none;">[含礼金:0.00]</span>
      </div>

      <div class="topcenter showYufu">
        <p class="boxflex" style="width: 49%"><a class="btn btn_orange" @click="showCharge">立即充值</a></p>
		<p style="width: 2%"></p>
        <p class="boxflex" style="width: 49%"><a class="btn borderbtn"  @click="withdraw">申请清账</a></p>
      </div>

    </div>

    <div>
      <div class="bgfff border_tb mb15">
        <div class="listtit border_b">店内账本说明</div>
        <div class="pad230 line18 font12 gray8b">
          <p class="mb10">
            本店是实体店，利润微薄，概不赊账。由于本店店员是一对多服务，店内需要出票的顾客较多，每个顾客在柜台付款时店员收款找零、店员出票后顾客核对选号会占用大量时间。因此，店内服务高峰期及销售临场前，您在柜台排队付款时，可能会错过销售时间，导致无法为您成功出票。
          </p>
          <p class="mb10">
            为了让本店能够更有效率的为您和其他顾客服务，若您到本店店内需要长时间、多次出票，建议您到本店柜台前提前付款，让店员为您记账。记账后，您每次需要出票时，本店可省去收款找零的时间立即为您出票，可极大提高为您成功出票的概率。本店出票后将会为您及时记账，您可点击账本明细对账。
          </p>
          <p>在您准备离店时，若您提前付的款未花完，可在离店前到柜台清账。</p>
        </div>
      </div>

      <div class="bgfff border_tb">
        <div class="listtit border_b">礼金说明</div>
        <div class="pad230 line18 font12 gray8b">
          <p>礼金是本店赠送的礼品，当本店举办活动时将有机会获得。礼金仅可在本店店内使用，不可作为现金找零清账使用。</p>
        </div>
      </div>
    </div>
  </section>

  <section class="pt48 loginbox" v-show="isShowCharge">
    <div class="loginmenu topcenter">
		<p class="boxflex sed">充值</p>
	</div>
	<div class="loginform" v-show="!isShowQrcode">
		<div class="loginformlist border_b topcenter">
			<div class="label">金额</div>
			<div class="boxflex topcenter">
			<input type="tel" class="input_nobd" v-model="formData.amount" placeholder="请输入充值金额">
			</div>
		</div>
		<div class="loginformlist border_b topcenter">
			<div class="label">充值方式</div>
			<div class="boxflex topcenter">
				<ul>
					<li>
						<div @click="payTypeSwitch('weixin')">
							<input type="radio" value="weixin" name="payType"/>
							<span>微信支付</span>
						</div>
						<div @click="payTypeSwitch('alipay')">
							<input type="radio" value="alipay" name="payType"/>
							<span>支付宝</span>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class="btn_blockbox">
			<input class="btn btn_red btn_block" type="button" value="充 值" @click="createOrder">
			<loading :show="show_loading" :text="text_loading"></loading>
		</div>
	</div>

	<div class="loginform" v-show="isShowQrcode">
		
		<div class="bgfff payma mb10 textc">
			<div class="paymatit">
			<!-- <p class="pad305 fontgreen4D font16 fontbold">付款码上传成功</p> -->
			<p class="gray3 font16" v-show="formData.payTypeChecked=='weixin'"><img src="~@/assets2/images/wx_pay_pub_scan.png" alt="微信支付"></p>
			<p class="gray3 font16" v-show="formData.payTypeChecked=='alipay'"><img src="~@/assets2/images/ali_direct_pay_pc.png" alt="支付宝"></p>
			<!-- <p>请确认付款对象，付款码仅限店内客户使用。</p> -->
			</div>
			<div class="paymaimg mb10">
				<div class="shadow" style="height: 240px;">
					<div class="qr-image" ref="qrcode"><img :src="QrcodeUrl" alt="二维码" ></div>
				</div>
				<h2>距离该订单过期还有</h2>
				<div class="time-item">
					<strong ref="minute_show"><s></s>05分</strong>
					<strong ref="second_show"><s></s>00秒</strong>
				</div>
			</div>

			<!-- <div class="font12 gray8b">
			<p style="display:none" v-show="!isAPP">微信支付可长按上方二维码识别付款</p>
			</div> -->
        </div>

	</div>
  </section>
  
</div>                
</template>

<script>
import {mapGetters,mapMutations} from 'vuex'
import {Loading} from 'vux'
import qs from 'qs'

export default {
	name: 'pay',
	data() { //页面数据
		return {
			money: 0.00,
			isShowCharge: false,
			show_loading: false,
			text_loading: "",
			formData: {
				amount: '',
				payTypeChecked: 'weixin',
			},
			isShowQrcode: false,
			QrcodeUrl: '',
			id: 0,
			overtime: false,
			orderlst: null,
			countdown: 1000,
		}
	},
	created :function(){
		this.fetchData();
	},
	computed: { //缓存，
		...mapGetters({
			user:'getuser'
		}),
	},
	watch: { //数据监听

	},
	components: { //模板

	},
	methods: { //无缓存
		...mapMutations({
			setuser:'setuser'
		}),
		home() {
			this.$router.push({path: '/home'});
		},
		fetchData(){
			let me= this;
			let user=this.user.info;
			if(user&&user.token){
				this.axios.post('/api/user/getuser').then(res => {  
					let data=res.data;
					if(data.errorCode==1){
						me.setuser({info:data.result.userinfo});
						me.$emit('storedata');
					}else{
						me.$vux.alert.show({content: data.message})
						this.$router.push('/login');
					}
				}).catch(function(err){
					window.console.log(err);
				})
			}else{
				// this.$router.push('/login');
			}

			this.axios.post('/api/ball/GetBall/getbalance').then(res => {  
				let data=res.data;
				if(data.errorCode==0){
					this.money = data.result.data;
				}
			}).catch(function(err){
				window.console.log(err);
			})

		},
		// 充值页面
		showCharge(){
			this.isShowCharge = true;
		},
		// 充值二维码
		showQrcode(){
			this.isShowQrcode = true;
		},
		//类型选择
		payTypeSwitch(type){  
			this.formData.payTypeChecked=type;
		},
		timer(intDiff) {
			let me = this;
			window.setInterval(function() {
				if (me.overtime) return;
				let day = 0, hour = 0, minute = 0, second = 0; //时间默认值       
				if (intDiff > 0) {
					day = Math.floor(intDiff / (60 * 60 * 24));
					hour = Math.floor(intDiff / (60 * 60)) - (day * 24);
					minute = Math.floor(intDiff / 60) - (day * 24 * 60) - (hour * 60);
					second = Math.floor(intDiff) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
				}
				if (minute <= 0 && second <= 0) {
					me.overtime = true;
					me.$refs.qrcode.innerHTML = '<br/><br/><br/><br/><br/><h2>二维码超时 请重新发起交易</h2><br/><br/><br/>';
				}
				if (minute <= 9) minute = '0' + minute;
				if (second <= 9) second = '0' + second;
				me.$refs.minute_show.innerHTML = '<s></s>' + minute + '分';
				me.$refs.second_show.innerHTML = '<s></s>' + second + '秒';
				intDiff--;
			},
			1000);
		},
		createOrder() {
			let amountRE = /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/;
			let me=this;
			window.console.log(me.formData.amount);
			window.console.log(me.formData.amount >= 0);
			window.console.log(amountRE.test(me.formData.amount));
			if(me.formData.amount >= 0 && amountRE.test(me.formData.amount)) {
				let params = {
					amount: me.formData.amount,
					type: me.formData.payTypeChecked,
				};
				this.show_loading = true;
				this.text_loading = "请稍等";

				this.axios.post('/api/pay/charge/add',qs.stringify(params)).then(res => {  
					let data=res.data;
					if(data.errorCode==0){
						me.show_loading = false;
						me.isShowQrcode = true;
						me.QrcodeUrl = data.result.data.qrcode;
						me.id = data.result.data.id;
						me.timer(parseInt(data.result.data.left - 1));
						this.orderlst = setTimeout(function() { me.monitorOrder() },3000);
					}else{
						me.$vux.alert.show({content: data.message});
						me.show_loading = false;
					}
				}).catch(function(err){
					console.log(err);
				})
			}else{
				this.$vux.alert.show({
					content: '请输入正确的金额'
				});
				me.show_loading = false;
				me.isShowQrcode = false;
			}
		},
		monitorOrder() {
			let me=this;
			if (this.countdown == 0) {
				this.countdown = 1000;
				return false;
			} else {
				this.countdown--;
				let params = {
					id: me.id,
				};
				this.axios.post('/api/pay/charge/query',qs.stringify(params)).then(res => {  
					let data=res.data;
					if(data.errorCode==0){
						if(data.result.code == 0 && data.result.data.status == 1){
							this.countdown = 1000;
							clearTimeout(this.orderlst);
							me.$vux.alert.show({content: "充值成功"});
							setTimeout(function() { window.location.reload(); },3000);
							return false;
						}
					}
				}).catch(function(err){
					window.console.log(err);
				});
			}
			this.orderlst = setTimeout(function() { me.monitorOrder() },3000); //每3000毫秒执行一次
		},
		withdraw() {
			let me=this;
			let params = {};
			this.show_loading = true;
			this.text_loading = "请稍等";

			this.axios.post('/api/account/withdraw/do',qs.stringify(params)).then(res => {  
				let data=res.data;
				if(data.errorCode==0){
					this.money = 0.00;
					me.$vux.alert.show({content: data.message});
					me.show_loading = false;
				}else{
					me.$vux.alert.show({content: data.message});
					me.show_loading = false;
				}
			}).catch(function(err){
				console.log(err);
			})
		},
	},
	activated:function(){
//		console.log('Lottery激活事件')
	},

	beforeRouteEnter(to, from, next) { //渲染页面前执行
//		console.log('进入' + to.name + '组件前');
		next();
	},
	beforeRouteUpdate(to, from, next) { //页面切换如：在/foo/1和/foo/2之间跳转
//		console.log('组件切换数据');
		next();
	},
	beforeRouteLeave(to, from, next) { //离开时执行
//		console.log('离开组件');
		next();
	}

}
</script>

<style lang="less">
.shadow{  
   -webkit-box-shadow: #666 0px 0px 10px;  
   -moz-box-shadow: #666 0px 0px 10px;  
   box-shadow: #666 0px 0px 10px;  
    padding-top: 10px;
    padding-right: 5px;
    padding-bottom: 1px;
    padding-left: 5px;
   background: #FFFFFF; 
   width:240px;
  height:240px;
}
.time-item strong {
    line-height:30px;
    font-size:20px;
    font-family:Arial;
    padding:0 10px;
    margin-right:10px;
    border-radius:5px;
    box-shadow:1px 1px 3px rgba(0,0,0,0.2);
}
.qr-image {
}
.qr-image img {
	width: 230px;
	height: 230px
}
</style>
