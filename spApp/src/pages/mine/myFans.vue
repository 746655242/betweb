<template>
    <div class="mineWrap">
    	<header class="myFansHeader">
			<span onclick="history.go(-1)" class="iconfont icon-fanhui">&#xe614;</span>
			<span>我的粉丝</span>
		</header>
		<div class="myFansCont">
			<ul class="fansList" v-if="fanslist" >
				<li v-for="(item,index) in fanslist" :key="index">
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
					<button class="attentionBtn">关注</button>
					<button class="attentionBtn" @click="removeFans">取消关注</button>
				</li>				
			</ul>
		</div>		
    </div>
</template>

<script>


export default {
	name:'myFans',
    data(){
        return {
			fanslist:null,
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
			this.base.getData(this,this.host+'/api/GetFansFromMeLst',{},function(data){	
				console.log(data)
				me.fanslist=data.ActionCode.LstFansFromMe
				
				me.LstFansFromMe = data.ActionCode.LstFansFromMe
				me.LstFansFromMe.forEach(function(item,i){
					me.PfUserCode = item.PfUserCode
				})
			})			
		},
		
		/* 会员移除偶像 */
		removeFans(){
			let me= this;
			let PfUserCode=this.PfUserCode
			this.base.getData(this,this.host+'/api/RmvFansFromMe',{PfUserCode:PfUserCode,},function(data){
				console.log('移除偶像',data)
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