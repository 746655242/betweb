<template>
    <div v-title data-title="我的" class="mineWrap">
     	<header class="mineHeader">
     		<span onclick="history.go(-1)" class="iconfont icon-fanhui">&#xe614;</span>
			<span>设置密码</span>
			<span class="headerRight" @click="submit">保存</span>
     	</header>
		<div class="modifiedPhoneNumberBox">
			<ul>
				<li>
					<input type="password" v-model="pw"  placeholder="确认新密码" />
				</li>
			</ul>
		</div>
    </div>
</template>

<script>
export default {
	name:'modifiedPassword',
    data(){
        return {
			pw:''
        }
    },
    methods: {
		submit(){
			let pw =this.pw
			let me=this
			this.base.getData(this,this.host+'/api/MemberChangePw',{NewPw:pw},function(data){					
				if(data.ErrCode="00000000"){
					me.$vux.alert.show({content:'修改成功'})
					me.$router.go(-1)	
				}
			})
    		
		}

    },
}
</script>
	
<style lang="less">
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
</style>