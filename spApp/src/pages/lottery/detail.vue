<template>
  <div>
    <link href="./static/css/user.css" rel="stylesheet">
    <header class="head headfixed">
      <div class="back"><a class="backlink" @click="home"></a></div>
      <div class="headertit">
        <h2>账本明细</h2>
        <h3>福盈中央山订单站</h3>
      </div>
      <div class="headBtnbox topcenter">
        <!-- <a><em class="headicon icon_tel"></em></a> -->
        <!-- <a><em class="headicon icon_time"></em></a> -->
      </div>
      <div class="layerbox screendatelayer" style="display: none;">
        <div class=" screendate">
          <div class="flexbox dateselect">
            <p class="boxflex">
              <input class="form-control mbsc-comp mbsc-comp" id="sdate" type="date" readonly="readonly">
              <span class="line34 gray8d">开始</span>
            </p>
            <p style="width:2rem;margin-top:10px;">
              <em class="icon_linearrowleft"></em>
            </p>
            <p class="boxflex">
              <input class="form-control mbsc-comp mbsc-comp" id="edate" type="date" readonly="readonly">
              <span class="line34 gray8d">结束</span>
            </p>
          </div>
          <div class="btn_blockbox mt10"><a class="btn btn_red btn_block">确认</a></div>
        </div>
      </div>
    </header>
    <section class="screenbox headmenu" style="display:none;">
      <div class="flex4">
        <div class="flex4link"><span>全部类型</span><em class="icon_arrowgraydown"></em></div>
        <div class="flex4link"><span>全部订单</span><em class="icon_arrowgraydown"></em></div>
      </div> <!-- 全部类型 -->
      <div class="layerbox screendata" style="display:none;">
        <ul class="screenmenu"> <em class="icon_boxarrow_top"></em>
          <li class="space_between sed"><span>全部类型</span><em class="icon_selectsed "></em></li>
          <li class="space_between"><span>加</span><em class="icon_selectsed "></em></li>
          <li class="space_between"><span>减</span><em class="icon_selectsed "></em></li>
          <!--<li class="space_between"><span>收入类型</span><em class="icon_selectsed"></em></li>                  <li class="space_between"><span>支出类型</span><em class="icon_selectsed"></em></li>-->
        </ul>
      </div> <!-- 全部订单 -->
      <div class="layerbox layer_page screendatelayer" style="display:none;">
        <div class="layer_page_main">
          <ul class="screenmenu"> <em class="icon_boxarrow_top"></em>
            <li class="space_between sed"><span>全部订单</span><em class="icon_selectsed"></em></li>
            <li class="space_between"><span>店内扫码-加</span><em class="icon_selectsed"></em></li>
            <li class="space_between"><span>手工添加-加</span><em class="icon_selectsed"></em></li>
            <li class="space_between"><span>奖金添加-加</span><em class="icon_selectsed"></em></li>
            <li class="space_between"><span>店内奖励-加</span><em class="icon_selectsed"></em></li>
            <li class="space_between"><span>撤单返还-加</span><em class="icon_selectsed"></em></li>
            <li class="space_between"><span>店内补偿-加</span><em class="icon_selectsed"></em></li>
            <li class="space_between"><span>清账返还-加</span><em class="icon_selectsed"></em></li>
            <li class="space_between"><span>手工扣减-减</span><em class="icon_selectsed"></em></li>
            <li class="space_between"><span>出票扣减-减</span><em class="icon_selectsed"></em></li>
            <li class="space_between"><span>清账扣减-减</span><em class="icon_selectsed"></em></li>
          </ul>
        </div>
      </div>
    </section>
    <section class="balance_orderlist">
      <div class="listtit gray8d textc">
        <p>{{start}}~{{end}}</p>
        <p>加：{{charge_total}}笔，{{charge_amount}}，减：{{cash_total}}笔，{{cash_amount}}</p>
      </div>
      <div>
        <div class="listboxplr0 mb15" v-for="(item,index) in listdata" :key="index">
          <div class="list_item gray8b">
            <!-- <a class="list_itema disblcok gray8b" :class="{'nextarrow': item.project !== '0' && item.source_id != '3'}" @click="gotoProject(item)"> -->
            <div class="topcenter mb6">
              <p class="boxflex">{{item.remarks}}</p>
              <p class="textr">{{item.date}}</p>
            </div>
            <div class="topcenter mb6">
              <p class="boxflex font16 fontgreen" v-if="item.money<0">{{item.money}}</p>
              <p class="boxflex font16 fontred" v-else>+{{item.money}}</p>
              <p class="textr">剩：{{item.balance}}</p>
            </div>
            <div class="flexbox balordertxt" style="display: none;">
              <em class="usericon2 icon_remarks"></em>
              <p class="boxflex gray8d">{{item.date}}</p>
            </div> <!-- </a> -->
          </div>
        </div>
      </div>

      <!-- 无查询结果 -->
      <div class="bottomtext2 gray8d" style="display: none;">
        <p class="textc">已选条件无查询结果，您可以重新设定查询条件后尝试</p>
      </div>

      <div class="dropload-down"></div>
    </section>

  </div>
</template>

<script>
  import {
    mapGetters,
    mapMutations
  } from 'vuex'
  import {
    Loading
  } from 'vux'
  import qs from 'qs'

  export default {
    name: 'pay',
    data() { //页面数据
      return {
        listdata: [],
        total: 0,
        page: 0,
        start: '',
        end: '',
        charge_total: 0,
        charge_amount: 0,
        cash_total: 0,
        cash_amount: 0,
      }
    },
    created: function () {
      this.fetchData();
    },
    computed: { //缓存，
      ...mapGetters({
        user: 'getuser'
      }),
    },
    watch: { //数据监听

    },
    components: { //模板

    },
    methods: { //无缓存
      ...mapMutations({
        setuser: 'setuser'
    }),
    home() {
			this.$router.push({path: '/home'});
    },
	  fetchData() {
        let me = this;
        let user = this.user.info;
        if (user && user.token) {
          let id = this.$route.params.id;
          let reqData = {
            ids: id,
          }
          this.axios.post('/api/account/detail/list', qs.stringify(reqData)).then(res => {
            let data = res.data;
            if (data.code == 0) {
              this.start = data.start;
              this.end = data.end;
              this.listdata = data.list;
              this.total = data.total;
              this.page = data.page;
              this.charge_total = data.charge_total;
              this.charge_amount = data.charge_amount;
              this.cash_total = data.cash_total;
              this.cash_amount = data.cash_amount;
            } else {
              me.$vux.alert.show({content: data.message});
            }
          }).catch(function (err) {
            window.console.log(err);
          })
        } else {
          this.$router.push('/login');
        }
      },
    },
    activated: function () {
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
  .shadow {
    -webkit-box-shadow: #666 0px 0px 10px;
    -moz-box-shadow: #666 0px 0px 10px;
    box-shadow: #666 0px 0px 10px;
    padding-top: 10px;
    padding-right: 5px;
    padding-bottom: 1px;
    padding-left: 5px;
    background: #FFFFFF;
    width: 240px;
    height: 240px;
  }

  .time-item strong {
    line-height: 30px;
    font-size: 20px;
    font-family: Arial;
    padding: 0 10px;
    margin-right: 10px;
    border-radius: 5px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  }

  .qr-image {}

  .qr-image img {
    width: 230px;
    height: 230px
  }
</style>