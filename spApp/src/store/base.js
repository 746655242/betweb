let base = {
  /* 登录验证 */
  auth: {
    loggedIn: function () {
      let user = localStorage.user
      if (user) {
        return true
      } else {
        return false
      }
    }
  },

  // 图标
  lotteryData: {
    1: {
      IconPic: require('@/assets/img/icon-zq.png'),
      href: '/home/jincai',
      IconName: '竞彩足球'
    },
    2: {
      IconPic: require('@/assets/img/icon-lq.png'),
      href: '/home/jingcailanqiu',
      IconName: '竞彩篮球'
    },
    3: {
      IconPic: require('@/assets/img/icon-zq.png'),
      href: '/home/zq14',
      IconName: '足球14场'
    },
    4: {
      IconPic: require('@/assets/img/icon-zq.png'),
      href: '/home/r9',
      IconName: '任选9场'
    },
    5: {
      IconPic: require('@/assets/img/icon-zq.png'),
      href: '/home/danchang',
      IconName: '北京单场'
    },
    6: {
      IconPic: require('@/assets/img/icon-zq.png'),
      href: '/home/danchangBf',
      IconName: '北京单场比分'
    },
    7: {
      IconPic: require('@/assets/img/icon-zq.png'),
      href: '/home/danchangBq',
      IconName: '北京单场半全场'
    },
    8: {
      IconPic: require('@/assets/img/icon-zq.png'),
      href: '/home/danchangZjq',
      IconName: '北京单场总进球'
    }
  },

  statuss: {
    0: '未开奖',
    1: '赢',
    2: '输'
  },
  /*
  //   判断用户设备
  */
  isDevice: function () {
    if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
      return 'iOS'
    } else if (/(Android)/i.test(navigator.userAgent)) {
      return 'Android'
    } else {
      return 'pc'
    }
  },
  /*
  // json 转 parameters
  */
  parameters: function (e) {
    var s = ''
    for (var i in e) {
      s += i + '=' + e[i] + '&'
    }
    return s.substr(0, s.length - 1)
  },

  /* 判断是否存在数组,并返回下标[true,index] */
  isArrR (a, s) {
    let r = false
    let i
    for (i in a) {
      if (a[i] == s) {
        r = true
        break
      }
    }
    return [r, i]
  },

  /* 删掉最后几位 */
  delend (s, l) {
    return s.substr(0, s.length - l)
  },

  /* 公用POST获取数据 */
  getData: function (me, url, data, callback, errback) {
    let user = me.$store.state.user
    let token = user.info ? user.info.MemberToken : ''
    let d = {
      MemberToken: token,
      OperateIp: user.ip,
      OperateCode: user.Devicename
    }
    let a = Object.assign(d, data)
    a = this.parameters(a)

    me.axios.post(url, a).then(res => {
      let ViewModel = JSON.parse(res.data.ViewModel)
      if (ViewModel.ErrCode == '00000012') {
        localStorage.removeItem('user')
        me.$store.commit('deluser')
        me.$router.push('/login')
      } else {
        callback(ViewModel)
      }
      if (ViewModel.ErrCode != '00000000') {
        me.$vux.alert.show({
          content: ViewModel.ErrMsg
        })
      }
    }).catch(function (err) {
      console.log(err)
      if (errback) {
        errback()
      }
    })
  }
}
export default base
