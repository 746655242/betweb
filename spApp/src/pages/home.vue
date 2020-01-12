<template>
  <div>

    <header class="head">
      <div class="headertit">
        <h1>福盈中央山订单站</h1>
      </div>
    </header>


    <section class="shop_details" style="">

      <!-- <openapp v-ref:openapp></openapp> -->

      <div class="bgfff shop_detailstop">
        <div class="topcenter">
          <div class="shopimgbox"><img src="~@/assets2/images/stationimg.png" alt="">
            <span class="certbg certokbg" style="">V</span>
          </div>

          <div class="boxflex2 shopimgbox_info">
            <!-- <div class="topcenter"><em class="iconbg icon_people"></em>
					<p class="boxflex gray8b">近30天 <span v-text="data.deal_users"> </span>人成功出票</p></div> -->
            <div class="topcenter"><em class="iconbg icon_pingjia"></em>
              <p class="gray8b" style="display: none;"><span class="fontred">0</span>位客户<span
                  style="display: none;">评价<span>很差</span></span></p>
              <p class="gray8b">暂无评价</p>
            </div>
            <div class="topcenter contactlink"><em class="usericon2 icon_tel_gray"></em>
              <p class="boxflex fontblue">联系本店</p>
            </div>

          </div>

          <a href="javascript:;" class="boxflex"><span class="fr nextarrow_icon"></span></a>
        </div>


      </div>

      <div class="bgfff border_b mb15">
        <!-- <div class="topcenter shop_detail_len">
			<div class="boxflex topcenter border_r"><em class="iconbg icon_weizhi"></em>
				<p class="font12 boxflex" v-text="data.city"></p></div>
			<div class="topcenter shop_detail_lianxi">
				<p class="boxflex flexcenter" @click="emptyFun" id="weixin1" v-show="data.weixin" :data-clipboard-text="data.weixin"><em class="iconbg2 icon_weixin2"></em></p>
				<p class="boxflex flexcenter"><a class="flexcenter tellink" :href="'tel:' + data.mobile"><em class="iconbg2 icon_telblue"></em></a></p>
				<p class="boxflex flexcenter" @click="doshowContact"><em class="flexcenter lianxi_morebtn">+</em></p></div>
			</div> -->

        <div class="border_t topcenter shop_detail_topbtn">
          <div class="downapp_box flexcenter" style="" _v-218db263=""><em class="iconbg2 iconbg_downgray"
              _v-218db263=""></em>
            <p class="prel" _v-218db263="">下载APP
              <!-- <em class="iconhotbg">热</em>-->
            </p>
            <div class="layer_shop_detail_tip" style="display:none" _v-218db263="">
              <!-- v-show="showNew" -->
              <em class="arrow" _v-218db263=""></em>
              <div class="topcenter" _v-218db263="">
                <p class="boxflex" _v-218db263="">店小二提醒：APP在手，通知我有</p>
                <a _v-218db263="">一键下载 &gt;</a>
              </div>
            </div>

          </div>
          <div class="hide" id="__openApp_clipboard" _v-218db263=""
            data-clipboard-text="$店铺口令$长按复制本条消息，打开口袋好店App即可进入，MjE4NTgyNzE="></div>
          <div class="collect_box boxflex flexcenter" style="display:none"><em class="iconbg2 icon_collect"></em>
            <p class="prel">收藏
              <!-- <em class="iconhotbg">新</em> -->
            </p>
            <!-- 弹层 -->
            <div class="layer_shop_detail_tip" style="display:none">
              <!-- v-show="collect.showNew" -->
              <em class="arrow"></em>
              <div class="topcenter">
                <p class="boxflex">店小二提醒：收藏本店 快速直达</p>
                <a>马上收藏 &gt;</a>
              </div>
            </div>
          </div>

          <div class="boxflex flexcenter"><em class="iconbg2 iconbg_magray"></em>
            <p>二维码</p>
          </div>
          <div class="bindw flexcenter" style=""><em class="iconbg icon_bindgray"></em>
            <p>绑店</p>
          </div>
          <div class="boxflex flexcenter"><em class="iconbg icon_sharegray"></em>
            <p>分享</p>
          </div>
        </div>
      </div>

      <!-- <div class="advertbox"><img src="" alt=""></div> -->

      <div class="mb15 border_tbbox" style="display: none;">
        <div class="shop_details_activity flexbox border_b">
          <div style="" class="boxflex shop_details_acitem border_r">
            <p class="icon_shopdetail icon_hemai"></p>
            <p class="mt6 gray3">店内合买</p>
            <p class="fontred font12" style="display: none;">0单</p>
          </div>
          <div class="boxflex shop_details_acitem border_r">
            <p class="icon_shopdetail tuijianbg"></p>
            <p class="mt6 gray3">店内跟单</p>
            <p class="fontred font12" style="display: none;">0单</p>
          </div>
          <div class="boxflex shop_details_acitem">
            <p class="icon_shopdetail activity"></p>
            <p class="mt6 gray3">优惠活动</p>
            <!-- <p v-show="huodong.num > 0 && !huodong.has_rcmd" class="fontred font12">送好礼</p>
				<p v-show="huodong.has_rcmd" class="icon_shopdetail activity_tipbg font12" >赚彩金</p> -->
            <p class="fontred font12" style="">送好礼</p>
          </div>
        </div>
        <!--shop_details_activity over  -->

      </div>

      <index @LstPageMenu='LstPageMenu'></index>

      <div class="indexbtnbox indexbtnbox_shop topcenter">
        <div class="boxflex border_r">
          <router-link :to="navUrl[0].href">
          <a class="flexcenter column"><em class="indexbg icon_myshop"></em><p>{{navUrl[0].name}}</p></a>
          </router-link>
        </div>
        <div class="boxflex border_r">
          <router-link :to="navUrl[1].href">
          <a class="flexcenter column"><em class="indexbg indexbg_balance"></em><p>{{navUrl[1].name}}</p></a>
          </router-link>
        </div>
        <div class="boxflex border_r">
          <router-link :to="navUrl[2].href">
          <a class="flexcenter column"><em class="indexbg icon_bet"></em><p>{{navUrl[2].name}}</p></a>
          </router-link>
        </div>
        <div class="boxflex flexcenter">
          <router-link :to="navUrl[3].href">
          <a class="flexcenter column"><em class="indexbg icon_set"></em><p>{{navUrl[3].name}}</p></a>
          </router-link>
        </div>
      </div>

    </section>

  </div>
</template>

<script>
  import {
    Tab,
    TabItem
  } from 'vux'
  import index from '@/pages/index/'
  // import  sportsLottery  from '@/pages/index/sportsLottery'
  // import  Lottery  from '@/pages/lottery/Lottery'
  // import  digitalLottery  from '@/pages/index/digitalLottery'

  const list = () => [{
      title: '福盈中央订单站',
      nav: '福盈中央订单站',
      url: 'main'
    },
    // {title:'彩票',nav:'彩票',url:'lottery'},
    // {title:'数字',nav:'数字',url:'number'},
    // {title:'运动彩',nav:'运动彩',url:'sports'},
    // {title:'社区',nav:'社区',url:'forum'},
    // {title: '专家预测',nav:'专家预测',url:'export'}
  ]
  export default {
    name: 'Home',
    data() { //页面数据
      return {
        msg: '时来运转APP',
        list: list(),
        index: 0,
        demo2: '导航',
        translate3d: {
          x: 0
        },
        isone: true, //首次移动判断
        isdirection: '', //方向判断 
        start: {}, //触点
        isx: '',
        w: '',
        max: 0,
        navUrl: [
          {
            href:'/home',
            name:'首页',
          },
          {
            href:'/pay',
            name:'店内账本',
          },
          {
            href:'/mine/betting',
            name:'选号记录',
          },
          {
            href:'/mine',
            name:'我的账户',
          }
        ],
      }
    },
    props: ['baseDate'],
    components: { //模板
      Tab,
      TabItem,
      index,
      // sportsLottery,
      // Lottery,
      // digitalLottery,
      // bbs,
      // prediction

    },
    created: function () { //初始化 在dom加载之前
      //通过url识别index
      let path = this.$route.params.path
      this.pathindex(path)

      let is_login = localStorage.is_login; //是否登陆状态 
      let is_visitor = localStorage.is_visitor;
    },
    mounted() {
      let me = this
      this.init()

      window.onload = function () {
        window.onresize = me.init
      }
    },
    methods: {
      /* 加载默认 */
      init() {
        let dom = this.$refs.swiperbox;
        if (dom) {
          let w = dom.clientWidth;
          this.w = w
          let item = dom.querySelectorAll('.swiper-item')
          this.max = item.length - 1
          for (var i = 0; i < item.length; i++) {
            let e = item[i];
            let transform = 'translate3d(' + w * i + 'px, 0, 0)';
            this.csst(e, transform)
          }
        }
      },
      LstPageMenu: function (data) {
        //菜单重新渲染
        let me = this
        data.forEach(function (item, i) {
          me.list[i].nav = item.SubMenuShow
          if (item.IsDefault) {
            me.index = i
          }
        })
      },
      fetchData: function () {

      },
      //无缓存
      pathindex: function (path) {
        //url修改index值
        for (var i = 0; i < this.list.length; i++) {
          if (this.list[i].url == path) {
            this.index = i
            break
          }
        }
      },
      touchstart: function (e) {
        let touch = e.touches[0];
        this.start.x = Number(touch.pageX)
        this.start.y = Number(touch.pageY)
      },
      touchmove: function (e) {
        // if(this.base.isDevice()=='Android'){
        // 	//安卓关闭滑动功能 
        // 	return false;
        // }
        let touch = e.touches[0]
        this.isx = Number(touch.pageX) - this.start.x;
        this.isy = Number(touch.pageY) - this.start.y;

        //首次滑动判断
        if (this.isone) {
          this.isone = false
          if (Math.abs(this.isx) < Math.abs(this.isy)) {
            //console.log('上下')
            this.isdirection = false
          } else {
            //console.log('右左')
            this.isdirection = true
            //e.preventDefault()
          }
        }
        //执行
        if (this.isdirection) {
          //左右
          //e.preventDefault() 
          this.$refs.swiperbox.style.overflow = 'hidden';
          this.moveanimation();
        } else {
          //上下
          this.isx = 0;
        }
      },
      touchend: function (e) {
        let me = this
        let w = me.w
        let isx = me.isx
        let dom = me.$refs.swipermain

        if (Math.abs(isx) > w / 2) {
          if (isx < 0) {
            me.index += 1;
          } else {
            me.index -= 1;
          }
          if (me.index < 0) {
            me.index = 0
          }
          if (me.index >= me.max) {
            me.index = me.max
          }
        }
        me.endanimation();

      },
      moveanimation() {
        let x = this.isx + this.translate3d.x
        let transform = 'translate3d(' + x + 'px, 0, 0)'
        let dom = this.$refs.swipermain
        this.csst(dom, transform)
      },
      endanimation() {
        let me = this
        let dom = me.$refs.swipermain
        dom.style.transitionDuration = '400ms'
        dom.style.webkitTransitionDuration = '400ms'

        me.translate3d.x = me.w * me.index * -1
        let transform = 'translate3d(' + me.translate3d.x + 'px, 0, 0)'
        me.csst(dom, transform)
        setTimeout(function () {
          me.recovery()
        }, 0)
      },
      csst(e, transform) {
        e.style.webkitTransform = transform;
        e.style.MozTransform = transform;
        e.style.msTransform = transform;
        e.style.OTransform = transform;
        e.style.transform = transform;
      },
      recovery: function () {
        //恢复默认
        this.$refs.swipermain.style.transitionDuration = '0ms'
        this.$refs.swipermain.style.webkitTransitionDuration = '0ms'

        this.isone = true
        //this.$refs.swiperbox.style.overflowY='scroll';
        this.start.isx = 0;
        this.start.isy = 0;
        this.isx = 0;
      },

      gotoBet(url) {

      }
    },
    computed: { //缓存，

    },
    watch: { //数据监听
      index: function (e) {
        let url = '#/home/' + this.list[e].url
        document.title = this.list[e].title
        history.pushState({}, '', url);
        this.endanimation();
      },

    },
    beforeRouteEnter(to, from, next) { //渲染页面前执行
      next();
    },
    beforeRouteUpdate(to, from, next) { //页面切换如：在/foo/1和/foo/2之间跳转
      let path = to.params.path
      this.pathindex(path)
      //console.log('组件切换数据');
      next();
    },
    beforeRouteLeave(to, from, next) { //离开时执行
      //console.log('离开组件');
      next();
    }

  }
</script>
<style lang="less">
  .no-padding {
    padding: 0px;
    min-height: 1.6rem;
  }

  .layer_showcontact {
    z-index: 110;
  }

  .showcontact {
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    background-color: #fff;
    z-index: 110;
  }

  .showcontact .layermenu {
    border-bottom: 1px solid #e4e4e4;
    color: #333;
    font-size: 14px;
    line-height: 28px;
  }

  .showcontacth {
    padding: 10px .4rem;
    border-bottom: 1px solid #E4E4E4;
    text-align: left;
    line-height: 18px;
  }

  .showcontact_ul li {
    padding: 0 .4rem;
  }

  .showcontact_ult {
    height: 1.28rem;
  }

  .showcontact_ult .copyopen {
    line-height: 1.28rem;
  }

  .showcontact_ult .contact_tit {
    width: 2.93rem;
    line-height: .64rem;
  }

  .showcontact_ult .borderbtn {
    width: 1.71rem;
    height: .64rem;
    line-height: .64rem;
    font-size: 12px;
    padding: 0;
  }

  .showcontact_ult .aw_downgray {
    margin-left: 4px;
    opacity: .9;
  }

  .showcontact_div {
    height: 4.83rem;
    text-align: center;
  }

  .showcontactimg {
    margin: 0 auto;
    width: 2.93rem;
    height: 2.93rem;
    border: 1px solid #DDDDDD;
    overflow: hidden;
    background: #fff;
  }

  .showcontactimg img {
    width: 2.93rem;
    height: 2.93rem;
  }

  .showcontactimg .imgdef {
    height: 100%;
    background: #F4F4F4;
    color: #aaa;
    font-size: 12px;
    line-height: 18px;
    text-align: center
  }

  .showcontact_div .imgtxt {
    line-height: .84rem;
  }

  .showcontact_div .btn_red {
    width: 2.24rem;
    padding: 0;
    height: .64rem;
    line-height: .64rem;
    font-size: 12px;
  }
</style>