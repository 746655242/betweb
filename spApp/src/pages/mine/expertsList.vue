<template>
    <div class="mineWrap">
		<header class="myApplyHeader">
			<span onclick="history.go(-1)" class="iconfont icon-fanhui">&#xe614;</span>
			<span>专家列表</span>
		</header>
		<div class="expertsList">
			<ul class="expertsListBox" v-if="expertslist">

				<li class="expertsInfo" v-for="(item,index) in expertslist" :key="index">
					{{item}}
					<div class="expertsInfo-left">
						<div class="expertsPhoto">
							<img :src="item.PfUserPic.UrlLink">
						</div>
						<div class="expertsState">
							<span>状态正常</span><i class="normal"><!-- abnormal --></i>
						</div>
					</div>
					<div class="expertsInfo-right">
						<p class="expertsNameAndType">
							<span class="expertsName">{{item.PfUserName}}</span>
							<span class="expertsType">{{item.PfUserGameTypeShow}}</span>
						</p>
						<ul class="expertsData">
							<li>关注:<i>{{item.PfUserFocus.PfUserFocusCount}}</i></li>
							<li>粉丝:<i>{{item.PfUserFans.PfUserFansCount }}</i></li>
							<li>跟随:<i>{{item.PfUserFollow.PfUserFollowCount}}</i></li>
						</ul>
						<div class="articleAndInformation">
							<router-link  :to="$pagecode(item.PublishDocumentUrlLink,{PfUserCode:item.PfUserCode})"  class="expertsArticle">发表文章</router-link>
							<!--<router-link :to="{path:'expertsInfo',query:{PfUserCode:'item.PfUserCode'}}" class="expertsInformation">{{item.PfUserInfo}}</router-link>-->

							<router-link :to="$pagecode(item.PfUserDetialUrlLink,{PfUserCode:item.PfUserCode,PfUserId:item.PfUserId})" class="expertsInformation">专家详情</router-link>


						</div>
					</div>
				</li>



			</ul>
		</div>
    </div>
</template>

<script>

import {mapGetters} from 'vuex'
export default {
	name:'expertsList',
    data(){
        return {
			expertslist:null,					
        }
    },
    created(){
    	this.fetchData();
    },
    mounted(){

    },
    methods: {
		fetchData(){
			let me= this;
			let user=this.user.info
		
			this.base.getData(this,this.host+'/api/GetMyPfUserLst',{},function(data){	
				let ActionCode = data.ActionCode
				if(ActionCode){
					me.expertslist = ActionCode.LstMyPfUserData
				}
				console.log(ActionCode)
			})
    		
		},	
	
	
    },
    computed: {
    	...mapGetters({
				user:'getuser'
		})
    },
    watch: {},
    props: {},
    components: {
    	
    },
    activated:function(){
		
	},
}
</script>

<style lang="less">
.mineWrap{
	.expertsList{
		.expertsListBox{
			padding-top: .44rem;
			.expertsInfo{
				width: 100%;
				background: #fff;
				margin-bottom: .1rem;
				position: relative;
				.expertsInfo-left{
					/*display: inline-block;
					vertical-align: middle;
					padding:.1rem .04rem .195rem .15rem;*/
					position: absolute;
					top: .1rem;
					left: .15rem;
					.expertsPhoto{
						width:.7rem;
						height: .7rem;
						-webkit-border-radius: 50%;
						-moz-border-radius: 50%;
						border-radius: 50%;
						overflow: hidden;
						margin-bottom:.07rem;
						img{
							width: 100%;
							height: 100%;
						}
					}
					.expertsState{						
						font-size: .11rem;
						color:#333;
						text-align: center;
						line-height: 1;
						i.normal,
						i.abnormal{
							display: inline-block;
							width: .1rem;
							height: .1rem;
							margin-left:.02rem;
							-webkit-border-radius: 50%;
							-moz-border-radius: 50%;
							border-radius: 50%;
							background: url("~@/assets/img/normal.png") no-repeat center 0;
							background-size: 100% 100%;
						}
						i.abnormal{
							background: url("~@/assets/img/abnormal.png") no-repeat center 0;
							background-size: 100% 100%;
						}
					}
				}
				.expertsInfo-right{
					/*display: inline-block;
					vertical-align: middle;*/
					padding:.27rem 0 .1rem .98rem;
					.expertsNameAndType{
						color:#333;
						height: .16rem;
						line-height: .16rem;
						padding-left:.1rem;
						.expertsName{
							font-size: .15rem;							
							margin-right: .04rem;
						}
						.expertsType{
							display: inline-block;
							vertical-align:top;
							height: .14rem;
							line-height: .14rem;
							text-align: center;
							font-size: .09rem;
							border:.01rem solid #ccc;
							-webkit-border-radius: .025rem;
							-moz-border-radius: .025rem;
							border-radius: .025rem;
							padding:0 .025rem;
						}
					}
					.expertsData{
						margin:.095rem 0 .145rem;
						font-size: 0;
						li{
							display: inline-block;
							vertical-align: middle;
							padding:0 .09rem;
							height: .11rem;
							line-height: .11rem;
							text-align: center;
							font-size: .09rem;
							color: #333;
							border-right: .015rem solid #333;
						}
						li:nth-last-child(1){
							border-right: none;
						}
					}
					.articleAndInformation{
						font-size: 0;
						a{
							display: inline-block;
							width: .79rem;
							height: .29rem;
							line-height: .29rem;
							text-align: center;
							border:1px solid @red;
							-webkit-border-radius: .05rem;
							-moz-border-radius: .05rem;
							border-radius: .05rem;
							font-size: .14rem;
							color: @red;
						}
						a.expertsArticle{
							margin:0 .15rem 0 .09rem;
						}
					}
				}
			}
		}
	}

}
</style>