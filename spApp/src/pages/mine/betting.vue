<template>
  <div>
    <link href="./static/css/user.css" rel="stylesheet">
    <link href="./static/css/dropload.css" rel="stylesheet">
    <header class="head headfixed">
      <div class="back w60"><a class="backlink"></a></div>
      <div class="headertit">
        <nav class="flexbox headermenu">
          <p class="boxflex border_r" @click="onItemClick(0)"><a v-bind:class="{'sed':index==0}">全部订单</a></p>
          <p class="boxflex border_r" @click="onItemClick(1)"><a v-bind:class="{'sed':index==1}">最近中奖</a></p>
        </nav>
      </div>
      <div class="headBtnbox topcenter w60"><a><em class="headicon icon_screen"></em></a></div>
    </header>
    <div class="pt48" id="dropload_body">
      <div class="betlisttit gray8d textc bgf5">
        <!-- <p>日期</p> -->
      </div>

      <section class="betlist font12">
        <div class="nulllotteryno" v-if="listdata.length<1">
          <p class="nulllotterynoimg"><img src="~@/assets2/images/nulllotteryno-83be1b1b40.png" alt=""></p>
          <p class="font14 gray5">当前无记录</p>
        </div>
        <ul class="listboxplr0" v-if="listdata.length>0">
          <li class="list_item_dashed relative" v-for="(item,index) in listdata" :key="index">
            <router-link :to="item.href">
            <div class="topcenter gray8b">
              <!-- <em class="identifier_gendan" style="display: none;"> </em> -->
              <div class="listdata mb1">
                <p class="day">{{item.day}}</p>
                <p class="month">{{item.month}}月</p>
              </div>
              <div class="boxflex"><span class="mb10 doingbg">{{item.status_title}}</span></div>
              <div class="icon_activity activityicon" style="display: none;"></div>
              <div class="textr gray8d ">
                <p><span class="font10 caitype">{{item.game_type_title}}</span></p>
                <!-- <p class="plannum"><span class="font10">9920</span></p> -->
                <p class="moneytext">{{item.bet_amount}}</p>
              </div>
            </div>
            </router-link>
          </li>
        </ul>

      </section>
      <div class="dropload-down"></div>
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
        totalpage: 1,

        ylistdata: [],
        ypage: 0,
        ytotalpage: 1,

        betinfoData: {},
        betinfoShow: false,
        SwiperHeight: ''
      }
    },
    created() {
      this.fetchData();
      // this.ygetdata();
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
        let user = this.user.info
        let data = {
          page: this.page
        };
        if (user && user.token) {
          this.axios.post('/api/ball/GetBall/betlist', qs.stringify(data)).then(res => {
            let data = res.data;
            if (data.code == 0) {
              this.listdata = this.listdata.concat(data.list);
              for(let i in this.listdata){
                  this.listdata[i]['href'] = '/mine/betting_detail?orderid='+this.listdata[i]['id'];
              }
              this.totalpage = Math.floor(data.total / 20);
            }
          }).catch(function (err) {
            console.log(err)
          })
        } else {
          this.$router.push('/login')
        }
      },
      onItemClick(index) {
        this.index = index;
      },
      tabindex() {
        if (this.page + 1 <= this.totalpage) {
          this.page++;
          this.fetchData();
        } else {
          alert('已经到最后一页');
        }
      },

      ygetdata() {
        let me = this;
        let user = this.user.info
        let data = {
          page: this.page,
          status: 1
        };
        if (user && user.token) {
          this.axios.post('/api/ball/GetBall/betlist', qs.stringify(data)).then(res => {
            let data = res.data;
            if (data.code == 0) {
              this.ylistdata = this.listdata.concat(data.list);
              this.ytotalpage = Math.floor(data.total / 20);
            }
          }).catch(function (err) {
            console.log(err)
          })
        } else {
          this.$router.push('/login')
        }
      },

      ytabindex() {
        if (this.ypage + 1 <= this.ytotalpage) {
          this.ypage++;
          this.ygetdata();
        } else {
          alert('已经到最后一页');
        }
      },

      //显示详情
      betinfoSw(item) {
        if ([3, 4].indexOf(item['game_type']) >= 0) {
          var ids = item.issue;
        } else if ([1, 5].indexOf(item['game_type']) >= 0) {
          let betCom = item.bet_con.split(',');
          var ids = [];
          for (let i in betCom) {
            ids.push(betCom[i].split('|')[1]);
          }
          ids = ids.join(',');

        } else {
          alert('暂时查看详情');
          return;
        }

        // console.log(ids);

        let data = {
          ids: ids,
          type: item['game_type']
        }

        this.axios.post('/api/ball/GetBall/betinfo', qs.stringify(data)).then(res => {
          let data = res.data;
          if (data.code == 0) {
            item['betList'] = data.list;
            this.betinfoData = item;
            // console.log(this.betinfoData);
          }
        }).catch(function (err) {
          console.log(err)
        })
      },

      colsebetinfoSw() {
        this.betinfoData = {};
      }
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