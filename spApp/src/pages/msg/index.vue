<template>
    <div v-title data-title="我的消息" class="mineWrap layerout">
     	<header class="mineHeader">
     		<span onclick="history.go(-1)" class="iconfont icon-fanhui">&#xe614;</span>
			<span>我的消息</span>
     	</header>


		<div class="mySetBox">
			<ul class="msg-box" v-if="list">
				<router-link v-for="(item,index) in list" :key="index" :to="'/msg/'+item.AppUserMessageId" >
				<li>
					
						<div class="unread" v-if="!item.FgRead"></div>
						<div class="pic"><img src="~@/assets/img/userpic.jpg"></div>
						<div class="text">{{item.Target}}</div>
						<div class="ellipsis doc">{{item.MsgSubject}}</div>
						<div class="date">{{item.CreateDate}}</div>
				
					
				</li>
				</router-link>
			</ul>
		</div>
    </div>
</template>

<script>
export default {
    data(){
        return {
			list:null
        }
    },
    created(){
		this.fetchData()
    },
    methods: {
    	fetchData(){
				let me=this
				this.base.getData(this,this.host+'/api/GetMyAccountMsgLst',{},function(data){	
					me.list=data.ActionCode.LstMyMsgData
					console.log(data)
				})
		},
    },
   
}
</script>

<style lang="less" scoped="scoped">
.msg-box{
	
	a{ color:#333;display: block;padding-left:.3rem;}
	li{
		padding:.2rem 0 .2rem .6rem;
		position: relative;
		min-height: .9rem;
		border-bottom:1px solid #f2f2f2;
		.pic{
			width:.5rem;
			height:.5rem;
			position: absolute;
			top:.2rem;
			left:0rem;
			border-radius: 50%;
			overflow: hidden;
			img{
				width:100%;
			}
		}
		.text{
			font-size:.16rem;
			line-height: .28rem;
		}
		.doc{
			color:#b5b6b7;
			font-size:.12rem;
		}
		.date{
			position: absolute;
			right: .2rem;
			top:.26rem;
			color:#b5b6b7;
			font-size:.13rem;
		}
		.unread{
			width:.1rem;
			height: .1rem;
			background: #ef1823;
			position: absolute;
			left:-.2rem;
			top:.4rem;
			border-radius: 50%;
		}
	}
	li:after{
		content:'';
		display: block;
		width:100%;
	}
}
</style>