<template>
    <div v-title data-title="消息" class="mineWrap layerout">
     	<header class="mineHeader">
     		<span onclick="history.go(-1)" class="iconfont icon-fanhui">&#xe614;</span>
			<span>消息</span>
     	</header>


		<div class="mySetBox">
			<ul class="msg-box" v-if="inof">
				<li>
					
					<div class="pic"><img src="~@/assets/img/userpic.jpg"></div>
					<div class="text">{{inof.Target}}</div>
					<div class="ellipsis doc">{{inof.MsgSubject}}</div>
					<div class="date">{{inof.CreateDate}}</div>
					
				</li>
			</ul>
            <div class="detail">
                {{inof.MsgDetail}}
            </div>
		</div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            inof:{},
            id:this.$route.params.id
        }
    },
    created(){
		this.fetchData()
    },
	computed:{
		
	},
	components:{

	},
    methods: {
    	fetchData(){
            let me=this
            this.base.getData(this,this.host+'/api/GetMyAccountMsgDetail',{AppUserMessageId:this.id},function(data){	
                me.inof=data.ActionCode
                console.log(data)
			})
		},
    },
   
}
</script>

<style lang="less" scoped="scoped">
.msg-box{
	li{
		padding:.2rem 0 .2rem .8rem;
		position: relative;
		min-height: .9rem;
		border-bottom:1px solid #f2f2f2;
		.pic{
			width:.5rem;
			height:.5rem;
			position: absolute;
			top:.2rem;
			left:.2rem;
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
.detail{
    padding:.2rem;
}
</style>