<template>
  <div>
    <link href="./static/css/user.css" rel="stylesheet">
    <link href="./static/css/jingcai.css" rel="stylesheet">
    <header class="head">
      <div class="back w70"><a class="backlink"></a></div>
      <div class="headertit topcenter column">
        <h2><span>福盈中央山订单站</span> - <span>333405738</span></h2>
        <h3>预计 xx-xx xx:xx 开奖</h3>
      </div>
      <div class="headBtnbox topcenter w70">
        <a style="display:none" class="head_btnborder">发跟单</a>
        <a class="fr"><em class="headicon icon_share"></em></a>
      </div>
    </header>
    <div id="dropload-body">
      <section class="project padheader pb48">
        <!-- 已提交彩店 -->
        <div class="mb10 border_tbbox bgfff pad305">
          <a class="list_itema topcenter nextarrow">
            <!-- <div class="projecsignsed mr20"><em class="shopicon icon_signwhite"></em></div> -->
            <p class="font14 gray0 mr10 line30">{{betinfoData.status_title}}</p>
            <div class="boxflex">
              <p class="gray8b font12 mr10">{{betinfoData.status_title}}{{betinfoData.bet_amount}}元，请仔细核对并妥善保管您的票。</p>
              <p class="txtbg_redbd font12" style="display: none;"><span></span>截止</p>
            </div>
            <!-- 未接单 -->
            <p class="borderbtn_gray" style="display: none;">取消</p>
            <!--已经接单  -->
            <!-- <p class="textr gray8b font10" style="display:none;">更多状态</p> -->
          </a>
        </div>

        <div class="border_tbbox">
          <div class="pad305 border_b bgfff topcenter">
            <div class="boxflex line30">
              <span class="gray3 padr05">方案详情</span>
              <a class="borderbtn font12" style="display: none;">同号续投</a>
            </div>
            <div class="gameadv_sm">
              <div></div>
            </div>
          </div>

          <!-- <div class="listtit topcenter"><p class="boxflex">选号详情</p><span class="font12 gray8b">奖金以实际出票为准，本页面数据仅供参考</span></div> -->
          <div>
            <div class="pad305 bgfff line34 gray8b">
              <div class="topcenter">
                <p class="boxflex">金额：<span class="fontredz font15">{{betinfoData.bet_amount}}</span> 元 [{{betinfoData.multiple}}倍]</p>
                <p><span>理论最高奖金：</span><a class="fontredz fontredbtnborder">{{betinfoData.bonus}}</a>元</p>
              </div>
              <div class="topcenter">
                <p class="boxflex">
                  <span class="fontblue">竞足混合过关</span>&nbsp;&nbsp;
                  选<span class="fontredz">{{betinfoData.game_total}}</span>场&nbsp;&nbsp;
                  <span class="fontredz">{{betinfoData.pass_type_title}}</span>
                </p>
                <span style="display: none;">第<span>2020-xx-xx</span>期</span>
              </div>
            </div>
            <div style="display: none;" class="bgfff border_tb projecthide">
              <p class="projecthide_icon"></p>
              <div class="projecthide_txt gray5">
                <p>跟单内容保密中</p>
                <p><span class="fontred">停售</span>后公开</p>
              </div>
            </div>
            <ul style="" class="project_betlist bgfff font12">
              <li class="flexbox border_t project_list_item">
                <div class="liansai gray8b">
                  <p class="font10"><span>周六002</span></p>
                  <p class="font10">澳超</p>
                  <a class="xi font10">分析</a>
                </div>
                <p class="hasdan"><em class="redball font10" style="display: none;">胆</em></p>
                <div class="boxflex">
                  <div class="name topcenter">
                    <p class="boxflex textr"><span>墨尔本城</span></p>
                    <div class="boxflex bifen">
                      <cite class="font10 fontblue">35'&nbsp;&nbsp;</cite>
                      <span class="gray8b fontredz">1:0</span>
                    </div>
                    <!-- <p v-text="item.intro.time">8/10  17:00</p> -->
                    <p class="boxflex textl"><span>纽喷气机</span></p>
                  </div>
                  <div class="flexbox caidiv caidivspf">
                    <em class="rang rang0">0</em>
                    <div class="boxflex betwlist topcenter">
                      <div class="betbtn betbtnsed">
                        <p class="gray5 fl">胜</p>
                        <p class="graya6 fr">1.37</p>
                      </div>
                      <div class="betbtn">
                        <p class="gray5 fl">平</p>
                        <p class="graya6 fr">4.35</p>
                      </div>
                      <div class="betbtn">
                        <p class="gray5 fl">负</p>
                        <p class="graya6 fr">5.45</p>
                      </div>
                    </div>
                    <!--
                  list.rOdds: 北京单场（和胜负过关）中奖选项的最终赔率
                  逻辑：当list.rOdds存在时，视为已开奖。
                        当list.rOdds存在时，未中奖的选项赔率为空，中奖的显示最终赔率
                        当list.rOdds不存在时，所有选项显示自身赔率
                -->

                    <div class="caiguo caiguo_jz" style="display: none;">
                      <p class="caiguo_jztit">彩果</p>
                      <p class="caiguo_jzcg"></p>
                      <!-- <p v-text="list.rOdds">胜</p> -->
                    </div>
                  </div>
                </div>
                <!-- project_betlist over -->
              </li>
              <li class="flexbox border_t project_list_item">
                <div class="liansai gray8b">
                  <p class="font10"><span>周六038</span></p>
                  <p class="font10">亚青23</p>
                  <a class="xi font10">分析</a>
                </div>
                <p class="hasdan"><em class="redball font10" style="display: none;">胆</em></p>
                <div class="boxflex">
                  <div class="name topcenter">
                    <p class="boxflex textr"><span>泰国23</span></p>
                    <div class="boxflex bifen"><span class="gray8b">1/18 18:15</span></div>
                    <!-- <p v-text="item.intro.time">8/10  17:00</p> -->
                    <p class="boxflex textl"><span>沙特23</span></p>
                  </div>
                  <div class="flexbox caidiv caidivspf">
                    <em class="rang rang0 ranggreen">+1</em>
                    <div class="boxflex betwlist topcenter">
                      <div class="betbtn betbtnsed">
                        <p class="gray5 fl">胜</p>
                        <p class="graya6 fr">1.57</p>
                      </div>
                      <div class="betbtn">
                        <p class="gray5 fl">平</p>
                        <p class="graya6 fr">3.45</p>
                      </div>
                      <div class="betbtn">
                        <p class="gray5 fl">负</p>
                        <p class="graya6 fr">4.5</p>
                      </div>
                    </div>
                    <!--
                  list.rOdds: 北京单场（和胜负过关）中奖选项的最终赔率
                  逻辑：当list.rOdds存在时，视为已开奖。
                        当list.rOdds存在时，未中奖的选项赔率为空，中奖的显示最终赔率
                        当list.rOdds不存在时，所有选项显示自身赔率
                -->

                    <div class="caiguo caiguo_jz" style="display: none;">
                      <p class="caiguo_jztit">彩果</p>
                      <p class="caiguo_jzcg"></p>
                      <!-- <p v-text="list.rOdds">胜</p> -->
                    </div>
                  </div>
                </div>
                <!-- project_betlist over -->
              </li>

            </ul>
            <!--选号详情 结束  -->

          </div>

        </div>

        <div class="risk_notice flexbox">
          <em class="iconbg icon_remindwblack"></em>
          <div class="boxflex font12">
            <p>足球竞猜的是90分钟+伤停补时的赛果，不含加时和点球。</p>
            <a href="javascript:;"><span class="gray3">投注数据、奖金仅供参考，请以实票数据为准</span></a>
          </div>
        </div>

        <div class="c51itou"><a class="flexcenter">
            <!-- <p class="itoulogo"> </p> -->
            <p class="gray8b">itou提供技术支持</p>
            <em class="nextarrow_icon"></em>
          </a>
        </div>

        <!-- <gameadv v-ref:gameadv></gameadv> -->

      </section>
      <div class="project_activity" style="display: none;"></div>
      <!-- 未提交彩店 -->
      <div class="navbottom project_navbottom" style="display: none;">
        <div class="btn_blockbox mb10"><a class="btn btn_block btn_blue ">已保存成功，继续&gt;&gt;</a></div>
      </div>
      <!--
      <div class="navbottom project_navbottom" v-show="!info.isEnd && info.submit_status == '0'" >
          <div class="bgbtnblock_red">保存方案仅供方法验证</div>
      </div>
      -->

      <!-- 已经提交彩店 -->
      <div class="navbottom project_navbottom" style="">
        <div class="topcenter flexstretch pbtnbox">
          <div class="boxflex border_r iconbtn flexcenter column"><em class="iconbg icon_dianpu"></em>
            <p>店铺</p>
          </div>
          <div class="boxflex border_r iconbtn flexcenter column"><em class="iconbg icon_pj"></em>
            <p>投诉/评价</p>
          </div>
          <div class="boxflex2 flexcenter column paybtn"><em class="iconbg2 icon_telwhite"></em>
            <p class="font12">联系本店</p>
          </div>
          <div class="border_l boxflex5 flexcenter paybtn2 " style="display:none">付款</div>
          <!-- paybtn_gray2 -->
          <div class="border_l boxflex5 flexcenter paybtn3" style="">再来一单</div>
          <!-- <div class="boxflex flexcenter column paybtn" style="display:none" v-show="info.pay_method != 'none' && browser != 'mobile' && canPayScan" @click="gotoMa"><p v-text="gotoPayText">获取付款码</p><p class="font12" v-show="info.status.orderStatus == 0 && payscan.project.last != '0秒'">剩<span v-text="payscan.project.last"></span></p></div> -->
          <!-- <div class="boxflex flexcenter column paybtn2" style="display:none" v-show="info.pay_method != 'none' && (browser == 'mobile' || !canPayScan)" @click="gotoPay">付款给店铺</div> -->

        </div>
      </div>

    </div>

  </div>
</template>

<script>
  import {
    Tab,
    TabItem,
    Swiper,
    SwiperItem
  } from 'vux'
  import {
    mapGetters
  } from 'vuex'
  import qs from 'qs'

  export default {
    data() {
      return {
        listdata: [],
        index: 0,
        page: 0,

        betinfoData: {},
        betinfoShow: false,
        SwiperHeight: ''
      }
    },
    created() {
      this.fetchData();
    },
    computed: {
      ...mapGetters({
        user: 'getuser'
      })
    },
    components: {
      Tab,
      TabItem,
      Swiper,
      SwiperItem
    },
    mounted: function () {
      this.SwiperHeight = this.$refs.ls.clientHeight + 'px';

    },
    methods: {
      fetchData() {
        let me = this;
        let user = this.user.info;
        if (user && user.token) {
          let id = this.$route.params.id;
          let reqData = {
            ids: id,
          }
          this.axios.post('/api/ball/GetBall/betinfo', qs.stringify(reqData)).then(res => {
            let data = res.data;
            if (data.code == 0) {
              this.listdata = data.list;
              this.betinfoData = this.listdata[0];
            }
          }).catch(function (err) {
            console.log(err);
          })
        } else {
          this.$router.push('/login');
        }
      },
      onItemClick(index) {
        this.index = index;
      },
    }
  }
</script>

<style lang="less" scoped="scoped">
  .red {
    color: #F76665 !important;
  }

  .bgHeader {
    position: fixed;
    bottom: 0;
    left: 0;
    top: 0;
    right: 0;
    background: rgba(0, 0, 0, .5);
    z-index: 60;
  }

  .bg {
    position: fixed;
    bottom: 0;
    left: 0;
    top: 0;
    right: 0;
    background: rgba(0, 0, 0, .5);
    z-index: 69;
  }

  .beton {
    background: #ef1823 !important;
    color: #fff !important;

    span {
      color: #fff !important;
    }
  }
</style>