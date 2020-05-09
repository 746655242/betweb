<template>
<div>
<link href="./static/css/user.css" rel="stylesheet">
  <header class="head mb15">
    <div class="back"><router-link to="/mine"><p class="backlink"></p></router-link></div>
    <div class="headertit">
      <h1>个人信息</h1>
    </div>
    <div class="headBtnbox"></div>
  </header>

  <section class="pt48 setting">
    <ul class="listboxpr0 mb15">

      <li class="list_item">
		<router-link to="/nickname">
			<label class="list_itema topcenter nextarrow" style="cursor:pointer">
				<p class="boxflex font16 gray0">昵称</p>
				<p class="gray8d">{{nickname}}</p>
			</label>
		</router-link>
	  </li>
      <li class="list_item">
		<router-link to="/mobile">
			<label class="list_itema topcenter nextarrow" style="cursor:pointer">
				<p class="boxflex font16 gray0">修改绑定手机号</p>
				<p class="gray8d">{{mobile}}</p>
			</label>
		</router-link>
	  </li>

      <li class="list_item">
		<router-link to="/setpwd">
			<a class="list_itema topcenter nextarrow" style="cursor:pointer">
				<p class="boxflex font16 gray0">密码</p>
				<p class="fontred">设置</p>
			</a>
		</router-link>
	  </li>

      <li class="list_item">
		  <router-link to="/contact">
			<label class="list_itema topcenter nextarrow" style="cursor:pointer">
			<p class="boxflex font16 gray0">联系方式设置</p>
			</label>
		  </router-link>
	  </li>

    </ul>

    <div class="border_tb"><a class="settingout font15" @click="exitAccount">退出登录</a></div>

  </section>
</div>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex'
export default {
    data(){
        return {
			mySetList:[
				// {text:'修改手机号码',path:'/modifiedPhoneNumber'},
				// {text:'修改密码',path:'/resetpassword'},
				{text:'清除缓存',path:''},
				// {text:'意见反馈',path:'/feedback'},
			],
			maskShow:false,
			clearShow:false,
			mobile:'',
			nickname:'',
        }
    },
    created(){
 		this.fetchData();
    },
	computed:{
		...mapGetters({
			user:'getuser'
		}),
	},
	components:{

	},
    methods: {
		...mapMutations({
			setuser:'setuser'
		}),
		...mapMutations({
			deluser:'deluser'
		}),
		fetchData(){
			let me= this;
			let user=this.user.info;
			if(user&&user.token){
				this.axios.post('/api/user/getuser').then(res => {  
					let data=res.data;
					window.console.log('=====myset data:', data);
					if(data.errorCode==1){
						this.loadInfo(data.result.userinfo.mobile, data.result.userinfo.nickname)
						me.setuser({info:data.result.userinfo});
						me.$emit('storedata');
					}else{
						// me.$vux.alert.show({content: data.message})
						// me.disabled = false;
						// me.show_loading = false;
					}
				}).catch(function(err){
					window.console.log(err);
				})
			}else{
				// this.$router.push('/login');
			}
		},
		loadInfo(mobile, nickname){
			this.mobile = mobile;
			this.nickname = nickname;
		},
		clearCache(){
			this.maskShow = !this.maskShow
			this.clearShow = !this.clearShow
		},
		cancelClearCache(){
			this.maskShow = false
			this.clearShow = false
		},
		clearNow(){			
			this.maskShow = false
			this.clearShow = false
			alert("缓存已清除")
		},
		exitAccount(){
			window.console.log('=====myset exitAccount start');
			localStorage.removeItem('user');
			this.deluser();
			this.$router.push('/home');
		},
    },
    activated:function(){	
    	
	}
}
</script>

<style lang="less" scoped="scoped">

</style>