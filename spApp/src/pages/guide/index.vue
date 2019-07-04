<template>
    <div v-title data-title="导页" class="guideWrap">
       	<header class="guideHeader">
       		<span>引导</span>
       	</header>
       	<div class="guideBox">
	       	<div class="guideCont">
	       		<router-link :to="$pagecode(item.LinkPageCode)" v-for="(item,index) in LstExportHelpInfo" :key="index">
	       			<img :src="item.HelpBgPic.UrlLink" class="bgImg">
	       			<div class="guideInfo">
	       				<h2>{{item.AppHelpName}}</h2>
	       				<p>{{item.AppHelpDesc}}</p>
	       			</div>	       				
	       		</router-link>
	       	</div>       		
       	</div>

        <slTabbar></slTabbar>  
    </div>
</template>
<script>

export default {	
    data(){
        return {
            LstExportHelpInfo:[]
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
			this.base.getData(this,this.host+'/api/GetExportHelp',{"SystemCode":"DQExport",},function(data){

				me.LstExportHelpInfo = data.ActionCode.LstExportHelpInfo
			})
		}    
    },
    computed: {
    	
    },
    watch: {
    	
    },
    props: {
    	
    },
    components: {
       
    },
    activated:function(){
		
 	},
}
</script>

<style lang="less">
	.guideWrap{
		.guideBox{
			width: 100%;	
			height: 100%;
			position: absolute;
			top: .44rem;
			left: 0;
			padding: .1rem .1rem 1rem;
			overflow-y: auto;		
			.guideCont{
				width:100%;
				a{
					display: block;
					width:100%;	
					height: .85rem;			
					-webkit-border-radius: .05rem;
					-moz-border-radius: .05rem;
					border-radius: .05rem;
					margin-bottom:.1rem;
					position: relative;
					.bgImg{
						width: 100%;
						height: 100%;
					}
					.guideInfo{
						width:1.75rem;
						color:#fff;
						text-align: center;
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
						position: absolute;
						top: .25rem;
						right:0;
						h2{
							font-size:.16rem;
							line-height:.24rem;
						}
						p{
							font-size:.1rem;
							line-height:.18rem;
						}
					}
				}
			}	
		}
		.guideBox::-webkit-scrollbar{
			display: none;
		}
	}
</style>
