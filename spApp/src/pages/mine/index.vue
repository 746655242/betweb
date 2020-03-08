<template>
  <div>
    <link href="./static/css/user.css" rel="stylesheet">
    <header class="head">
      <div class="back">
        <router-link to="/home"><a class="backlink"></a></router-link>
      </div>
      <div class="headertit">
        <h1>我的账户</h1>
      </div>
      <div class="headBtnbox"></div>
    </header>

    <section class="pt48 userindex">
      <div class="listboxplr0 mb15">
        <div class="list_item">
          <router-link to="/mySet">
            <span class="list_itema nextarrow topcenter">
              <p class="boxflex font16 gray0">{{user.info.nickname}}</p>
            </span>
          </router-link>
        </div>
      </div>

      <ul class="listboxpr0 mb15">
        <li class="list_item">
          <router-link to="/mine/betting">
            <span class="list_itema nextarrow topcenter">
              <em class="usericon2 icon_betlist"></em>
              <p class="boxflex font16 gray0">订单记录</p>
            </span>
          </router-link>
        </li>
        <!-- <li class="list_item"><a href="" class="list_itema nextarrow topcenter">
        <em class="usericon2 icon_savelist"></em>
        <p class="boxflex font16 gray0">保存记录</p>
      </a></li> -->
        <!-- <li class="list_item"><a href="" class="list_itema nextarrow topcenter">
        <em class="usericon2 icon_feedback2"></em>
        <p class="boxflex font16 gray0">我的投诉</p>
      </a></li> -->
      </ul>

      <ul class="listboxpr0 mb15">
        <!-- <li class="list_item"><a href="/help/" :backurl="backurl" class="list_itema nextarrow topcenter">
        <em class="usericon2 icon_instruction"></em><p class="boxflex font16 gray0">使用手册</p>
    </a></li> -->
        <li class="list_item" style="display:none"><a href="javascript:;" class="list_itema nextarrow topcenter">
            <em class="indexbg icon_about mr15"></em>
            <p class="boxflex font16 gray0">关于店铺</p>
          </a></li>
      </ul>
    </section>
  </div>
</template>

<script>
  import picUp from '@/components/picUp'

  import {
    mapGetters,
    mapMutations
  } from 'vuex'
  export default {
    data() {
      return {
        photoImg: '',
        userName: '',
        userId: '',
        isnick: false,
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
      picUp
    },
    methods: {
      fetchData() {
        let me = this;
        let user = this.user.info;

        if (user && user.token) {
          this.axios.post('/api/user/getuser').then(res => {
            let data = res.data;
            window.console.log(data);
            if (data.errorCode == 1) {
              me.setuser({
                info: data.result.userinfo
              })
              me.$emit('storedata')
            } else {
              // me.$vux.alert.show({content: data.message})
              // me.disabled = false;
              // me.show_loading = false;
            }
          }).catch(function (err) {
            window.console.log(err)
          })

        } else {
          //this.$router.push('/login')
        }
      },

      /* 图片上传 */
      callback(data) {
        this.photoImg = data.imgsrc
      },
    },
    activated: function () {

    }
  }
</script>