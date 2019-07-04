<template>
    <div v-title data-title="我的" class="mineWrap">
     	<header class="mineHeader">
     		<span onclick="history.go(-1)" class="iconfont icon-fanhui">&#xe614;</span>
			<span>清除缓存</span>
     	</header>

    </div>
</template>

<script>
export default {
	name:'clearCache',
    data(){
        return {

        }
    },
    created(){
//  	this.fetchData();
    },
	computed:{

	},
	components:{

	},
    methods: {
    	fetchData(){
			let me= this;
			let user=this.user.inof
			if(user&&user.MemberToken){
				
				this.base.getData(this,this.host+'/api/GetExportMyAccount',{},function(data){	
					
					console.log(data)
			
				})
    		}else{
				this.$router.push('/login')
			}
		},
    },
    activated:function(){	
    	
	}
}
</script>

<style>
</style>