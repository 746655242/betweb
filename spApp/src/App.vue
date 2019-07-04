<template>
  <div id="app">
      <!--<router-link :to="pagecode('Idx_Main',{id:'BulletinId'})">bbb</router-link>-->
      <!--{{pagecode('Idx_Main',{id:'BulletinId'})}}-->
    <!--  {{$route.query.id}}-->

	<keep-alive v-if="$route.meta.keepAlive" >
            <router-view  @storedata="storedata" @init="init" />
    </keep-alive>
	<router-view  v-if="!$route.meta.keepAlive"  @storedata="storedata"  />


  </div>
</template>
<script>
import {mapGetters,mapMutations} from "vuex"
import {Loading } from "vux"

export default {
	name: 'app',
  	data(){
      	return{
    	}
  	},
	components:{
		Loading 
  	},
  	computed:{
     	...mapGetters({
			user:'getuser'
		})
	},
	beforeCreate:function(){
		//rem适配
		function size(){
		var j=100;
		var f=320;
		var i=document.documentElement.clientWidth||window.innerWidth;
		var g=Math.max(Math.min(i,480),320);
		var h=100;
		//if(g>362&&g<=375){h=Math.floor(g/f*j*0.9)}
		if(g>414){h=Math.floor(g/f*j*0.84)}
		window.__baseREM=h;
		document.querySelector("html").style.fontSize=h+"px"
		}(function(){size()}());window.onload=function(){window.onresize=function(){size()}};
	},
	created:function(){ 
		
		this.fetchData()
		this.init()  
	},
	methods:{
		...mapMutations({
			setuser:'setuser',
			deluser:'deluser'
		}),
		/* 加载配置 */
		init(){
			let user=localStorage.user;
			if(user){
				user=JSON.parse(user);
				let time=user.time;
				let currentTime=Date.parse(new Date()) 
				if(currentTime<=time+1000*60*60*24*7){
					this.setuser(user)
					this.tokenV()
				}else{
					localStorage.removeItem('user')
					this.deluser()
					this.$router.push('/login')
				}
			}
		},

		/* 验证token */
		tokenV(){
			let me=this
			// this.base.getData(this,this.host+'/api/ChkMemberToken',{},function(data){			
			// 	data=data.ActionCode
			// 	if(data!='Success'){
			// 		localStorage.removeItem('user')
			// 		me.$router.push('/login')
			// 	}					
			// })
		},

		/* 储存数据 */
		storedata(){
			let user=this.user
			user.time=Date.parse(new Date())
			localStorage['user']=JSON.stringify(user)
		},
		fetchData(){
			// let me=this;
			// // //获取IP
			// me.axios.get("/api/ip").then(res => {
			// 	let ip = res.data.result.ip;
			// 	console.log(ip)
			// 	me.setuser({ip:ip})
			// })
			
		}
	}
}
</script>

<style lang="less" scoped="" type="text/css">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

</style>
