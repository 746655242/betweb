<template>
    <div v-title data-title="我的" class="mineWrap">
     	<header class="mineHeader">
     		<span onclick="history.go(-1)" class="iconfont icon-fanhui">&#xe614;</span>
			<span>修改手机号码</span>
			<span class="headerRight">保存</span>
     	</header>
		<div class="modifiedPhoneNumberBox">
			<input type="text" />
		</div>
    </div> 
</template>

<script>
export default {
	name:'modifiedPhoneNumber',
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

<style lang="less">
.mineWrap{
	.modifiedPhoneNumberBox{
		position: fixed;
		top: .44rem;
		left: 0;
		width: 100%;
		height:100%;
		background: #fff;
		padding:0 .15rem;
		input{
			width: 100%;
			padding:.15rem 0;
			border-bottom: 1px solid #ddd;
			font-size: .15rem;
		}
	}
}
</style>