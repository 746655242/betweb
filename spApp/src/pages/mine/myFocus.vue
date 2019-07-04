<template>
    <div class="mineWrap">
    	<header class="myFansHeader">
			<span onclick="history.go(-1)" class="iconfont icon-fanhui">&#xe614;</span>
			<span>我的关注</span>
		</header>
		<div class="myFansCont">
			<ul class="fansList">
				<li v-for="(item,index) in list" :key="index">
					<div class="fansPhoto">
						<img :src="item.PfUserPic.UrlLink">
					</div>
					<div class="fansInfo">
						<h3 class="fansName">{{item.PfUserName}}</h3>
						<p class="attentionDate">
							<span>关注时间:</span>
							<i>{{item.CreateDate.split(' ')[0]}}</i>
						</p>
					</div>
					<button class="attentionBtn" @click="removeFocus">取消关注</button>
				</li>	
			</ul>
		</div>		
    </div>
</template>

<script>



export default {
	name:'myFocus',
    data(){
        return {
			list:null,
			PfUserCode:'',
        }
    },
    created(){
      	this.fetchData();
    },
    mounted(){

    },
    methods: {
    	fetchData(){

			let me=this
			/* 获取当前页面数据 */
			this.base.getData(this,this.host+'/api/GetFocusFromMeLst',{},function(data){	
				console.log(data)
				me.list=data.ActionCode.LstFocusFromMe
				me.LstFocusFromMe = data.ActionCode.LstFocusFromMe
				me.LstFocusFromMe.forEach(function(item,i){
					me.PfUserCode = item.PfUserCode
				})

			})			
		},
		
		/* 会员移除关注 */
		removeFocus(){
			let me= this;
			let PfUserCode=this.PfUserCode
			this.base.getData(this,this.host+'/api/RmvFocusFromMe',{PfUserCode:PfUserCode,},function(data){
				console.log('移除关注',PfUserCode)
			})
		},
	
    },
    computed: {},
    watch: {},
    props: {},
    components: {

    },
    activated:function(){

	},
}
</script>

<style lang="less" scoped="scoped">
</style>