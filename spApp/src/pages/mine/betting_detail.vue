<template>
  <div>
    <link href="./static/css/user.css" rel="stylesheet">
    <link href="./static/css/jingcai.css" rel="stylesheet">
    <header class="head">
      <div class="back w70">
        <router-link :to="bettingUrl">
          <p class="backlink"></p>
        </router-link>
      </div>
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
                <p class="boxflex">金额：<span class="fontredz font15">{{betinfoData.bet_amount}}</span> 元
                  [{{betinfoData.multiple}}倍]</p>
                <p><span>理论最高奖金：</span><a class="fontredz fontredbtnborder">{{betinfoData.bonus}}</a>元</p>
              </div>
              <div class="topcenter">
                <p class="boxflex">
                  <span class="fontblue">{{betinfoData.game_type_title}}</span>&nbsp;&nbsp;
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
            <ul class="project_betlist bgfff font12" v-if="betinfoData.game_data.length>0">
              <li class="flexbox border_t project_list_item" v-for="(item, index) in betinfoData.game_data" :key="index">
                <div class="liansai gray8b">
                  <p class="font10"><span>{{item.orderid}}</span></p>
                  <p class="font10">{{item.liansai}}</p>
                  <a class="xi font10">&nbsp;&nbsp;</a>
                </div>
                <p class="hasdan"><em class="redball font10" style="display: none;">胆</em></p>
                <!-- 足球开始 -->
                <div class="boxflex" v-if="betinfoData.game_type != balltypeLq">
                  <div class="name topcenter">
                    <p class="boxflex textr"><span>{{item.zhu_name}}</span></p>
                    <!-- <div class="boxflex bifen">
                      <cite class="font10 fontblue">35'&nbsp;&nbsp;</cite>
                      <span class="gray8b fontredz">1:0</span>
                    </div> -->
                    <div class="boxflex bifen"><span class="gray8b">{{item.timetxt}}</span></div>
                    <!-- <div class="boxflex bifen"><span class="gray8b fontredz">2:1</span></div> -->
                    <p class="boxflex textl"><span>{{item.ke_name}}</span></p>
                  </div>
                  <!-- 胜平负 -->
                  <div class="flexbox caidiv caidivspf" v-if="checkOptions(betinfoData.order_data[item.orderid], optionConfig['0']['mix'])">
                    <em class="rang rang0">0</em>
                    <div class="boxflex betwlist topcenter">
                      <div class="betbtn" v-for="(itemOption, indexOption) in optionConfig['0'].cn" :key="indexOption" v-bind:class="{'betbtnsed':checkSelect(optionConfig['0'].mix[indexOption], betinfoData.order_data[item.orderid])}">
                        <p class="gray5 fl">{{itemOption}}</p>
                        <p class="graya6 fr">{{item.odds[optionConfig['0'].mix[indexOption]]}}</p>
                      </div>
                    </div>
                    <div class="caiguo caiguo_jz" style="display: none;">
                      <p class="caiguo_jztit">彩果</p>
                      <p class="caiguo_jzcg"></p>
                      <!-- <p v-text="list.rOdds">胜</p> -->
                    </div>
                  </div>
                  <!-- 让球胜平负 -->
                  <div class="flexbox caidiv caidivspf" v-if="checkOptions(betinfoData.order_data[item.orderid], optionConfig['1']['mix'])">
                    <em class="rang rang0">0</em>
                    <div class="boxflex betwlist topcenter">
                      <div class="betbtn" v-for="(itemOption, indexOption) in optionConfig['1'].cn" :key="indexOption" v-bind:class="{'betbtnsed':checkSelect(optionConfig['1'].mix[indexOption], betinfoData.order_data[item.orderid])}">
                        <p class="gray5 fl">{{itemOption}}</p>
                        <p class="graya6 fr">{{item.odds[optionConfig['1'].mix[indexOption]]}}</p>
                      </div>
                    </div>
                    <div class="caiguo caiguo_jz" style="display: none;">
                      <p class="caiguo_jztit">彩果</p>
                      <p class="caiguo_jzcg"></p>
                      <!-- <p v-text="list.rOdds">胜</p> -->
                    </div>
                  </div>
                  <!-- 比分，总进球，半全场 -->
                  <div class="flexbox caidiv" v-for="(itemConfig, indexConfig) in optionConfig" :key="indexConfig" v-if="(indexConfig=='2' || indexConfig=='3' || indexConfig=='4') && checkOptions(betinfoData.order_data[item.orderid], optionConfig[indexConfig]['mix'])">
                    <div class="boxflex betwlist topcenter">
                      <div class="betbtn betbtnsed" v-for="(itemOption, indexOption) in optionConfig[indexConfig].cn" :key="indexOption" v-if="optionConfig[indexConfig].mix[indexOption] != null && checkSelect(optionConfig[indexConfig].mix[indexOption], betinfoData.order_data[item.orderid])">
                        <p class="gray5">{{itemOption}}</p>
                        <p class="graya6">{{item.odds[optionConfig[indexConfig].mix[indexOption]]}}</p>
                      </div>
                    </div>
                    <div class="caiguo caiguo_jz" style="display: none;">
                      <p class="caiguo_jztit">彩果</p>
                      <p class="caiguo_jzcg"></p>
                      <!-- <p v-text="list.rOdds">胜</p> -->
                    </div>
                  </div>
                </div><!-- 足球结束 -->
                <!-- 篮球开始 -->
                <div class="boxflex" v-else>
                  <div class="name topcenter">
                    <p class="boxflex textr"><span>{{item.zhu_name}}</span></p>
                    <!-- <div class="boxflex bifen">
                      <cite class="font10 fontblue">35'&nbsp;&nbsp;</cite>
                      <span class="gray8b fontredz">1:0</span>
                    </div> -->
                    <div class="boxflex bifen"><span class="gray8b">{{item.timetxt}}</span></div>
                    <p class="boxflex textl"><span>{{item.ke_name}}</span></p>
                  </div>
                  <div class="flexbox caidiv caidivspf">
                    <em class="rang rang0">0</em>
                    <div class="boxflex betwlist topcenter">
                      <div class="betbtn betbtnsed">
                        <p class="gray5 fl">大分</p>
                        <p class="graya6 fr">1.7</p>
                      </div>
                      <div class="betbtn lqbifen fontredz">230.5</div>
                      <div class="betbtn">
                        <p class="gray5 fl">小分</p>
                        <p class="graya6 fr">1.7</p>
                      </div>
                    </div>
                    <div class="caiguo caiguo_jz" style="display: none;">
                      <p class="caiguo_jztit">彩果</p>
                      <p class="caiguo_jzcg"></p>
                      <!-- <p v-text="list.rOdds">胜</p> -->
                    </div>
                  </div>
                </div>
                <!-- 篮球结束 -->
              </li>
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
        SwiperHeight: '',

        balltypeArr: {
          '1': '竞彩足球',
          '2': '竞彩篮球',
          '3': '竞彩14场',
          '4': '任选9场',
          '5': '北京单场',
        },
        balltypeLq: '2',

        //选择配置
        optionConfig: {
          '0': {
            cn: ['胜', '平', '负'],
            wager: ['3', '1', '0'],
            mix: ['16', '15', '14'],
            ltype: 'SportteryNWDL'
          },
          '1': {
            cn: ['胜', '平', '负'],
            wager: ['3', '1', '0'],
            mix: ['13', '11', '10'],
            special: true,
            ltype: 'SportteryWDL',
            specialkey: 'WDL'
          },
          '2': {
            cn: ['1:0', '2:0', '2:1', '3:0', '3:1', '3:2', '4:0', '4:1', '4:2', '5:0', '5:1', '5:2', '胜其他', null, null,
              '0:0', '1:1', '2:2', '3:3', '平其他', '0:1', '0:2', '1:2', '0:3', '1:3', '2:3', '0:4', '1:4', '2:4', '0:5',
              '1:5', '2:5', '负其他'
            ],
            wager: ['1:0', '2:0', '2:1', '3:0', '3:1', '3:2', '4:0', '4:1', '4:2', '5:0', '5:1', '5:2', '胜其他', null,
              null, '0:0', '1:1', '2:2', '3:3', '平其他', '0:1', '0:2', '1:2', '0:3', '1:3', '2:3', '0:4', '1:4', '2:4',
              '0:5', '1:5', '2:5', '负其他'
            ],
            mix: ['30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', null, null, '43', '44',
              '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60'
            ],
            ltype: 'SportteryScore'
          },
          '3': {
            cn: ['0球', '1球', '2球', '3球', '4球', '5球', '6球', '7+'],
            wager: ['0', '1', '2', '3', '4', '5', '6', '7+'],
            mix: ['00', '01', '02', '03', '04', '05', '06', '07'],
            ltype: 'SportteryTotalGoals'
          },
          '4': {
            cn: ['胜/胜', '胜/平', '胜/负', '平/胜', '平/平', '平/负', '负/胜', '负/平', '负/负'],
            wager: ['3-3', '3-1', '3-0', '1-3', '1-1', '1-0', '0-3', '0-1', '0-0'],
            mix: ['20', '21', '22', '23', '24', '25', '26', '27', '28'],
            ltype: 'SportteryHalfFull'
          },
          '5': {
            cn: ['主胜', '客胜', '主胜', '客胜', '大分', '小分', '1-5', '6-10', '11-15', '16-20', '21-25', '26+', '1-5', '6-10',
              '11-15', '16-20', '21-25', '26+'
            ],
            wager: ['3', '0', '3', '0', '3', '0', '1-5', '6-10', '11-15', '16-20', '21-25', '26+', '1-5', '6-10',
              '11-15', '16-20', '21-25', '26+'
            ],
            mix: ['90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100', '101', '102', '103', '104', '105',
              '106', '107'
            ],
            ltype: 'SportteryBasketMix'
          }
        },

        homeUrl: "/home",
        bettingUrl: "/mine/betting",
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
              window.console.log("----betinfoData------");
              window.console.log(this.betinfoData);
              window.console.log("----game_data------");
              window.console.log(this.betinfoData.game_data);
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

      // 查询是否有该类型的投注, options: 投注项, optionArr: 玩法数组
      checkOptions(options, optionArr) {
        let exist = false;
        for (let i in optionArr) {
          for (let j in options) {
            if (optionArr[i] == options[j]) {
              exist = true;
              break;
            }
          }
          if(exist){
            break;
          }
        }
        return exist;
      },

      // 查询是否选中, option: 玩法, options: 已投注项
      checkSelect(option, options) {
        let exist = false;
        for (let i in options) {
          if (options[i] == option) {
            exist = true;
            break;
          }
        }
        return exist;
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