<template>
<div>
<link href="./static/css/user.css" rel="stylesheet">
  <header class="head mb15">
    <div class="back"><router-link to="/mySet"><p class="backlink"></p></router-link></div>
    <div class="headertit">
      <h1>昵称</h1>
    </div>
    <div class="headBtnbox"></div>
  </header>

  <section class="pt48 settingnickname">
    <ul class="listboxplr0 mb15">
      <li class="list_item topcenter listinput">
        <p class="boxflex"><input class="form-control font16" type="text" v-model="nickname"></p><em class="icon_del" @click="clearNickname"></em>
      </li>
    </ul>
    <div class="btn_blockbox mt50">
		<input class="btn btn_red btn_block" v-bind:class="{'btn_disabled':disabled}" type="button" value="保存" @click="updateNickname">
		<loading :show="show_loading" :text="text_loading"></loading>
	</div>
  </section>
</div>
</template>

<script>
import {mapGetters,mapMutations} from 'vuex';
import {Loading} from 'vux';
import qs from 'qs';
export default {
    data(){
        return {
			nickname: "",
			disabled:false,
			show_loading:false,
			text_loading:""	,
        }
    },
    created(){
 		this.fetchData();
    },
	computed:{
		...mapGetters({
			user:'getuser'
		}),
		...mapMutations({
			setuser:'setuser'
		}),
	},
	components:{

	},
    methods: {
		fetchData(){
			let me= this;
			let user=this.user.info;
			if(user&&user.token){
				this.axios.post('/api/user/getuser').then(res => {  
					let data=res.data;
					if(data.errorCode==1){
						this.loadNickname(data.result.userinfo.nickname);
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
		loadNickname(nickname){
			this.nickname = nickname;
		},
		clearNickname(){
			this.nickname = "";
		},
		//更新昵称
		updateNickname() {
			let me=this;
			let params = {
				nickname: this.nickname,
			};
			this.disabled = true;
			this.show_loading = true;
			this.text_loading = "请稍等";

			this.axios.post('/api/user/updateNickname',qs.stringify(params)).then(res => {  
				let data=res.data;
				if(data.errorCode==1){
					me.$vux.alert.show({content: data.message});
					me.$router.push('/mySet');
					me.setuser({info:data.result.userinfo});
					me.$emit('storedata');
				}else{
					me.$vux.alert.show({content: data.message});
					me.disabled = false;
					me.show_loading = false;
				}
			}).catch(function(err){
				window.console.log(err);
			});
			
		},
		
    },
    activated:function(){	
    	
	}
}
</script>
