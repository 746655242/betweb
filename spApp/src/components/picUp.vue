<template>
   <div class="picUp">

        <div @click="openshow">
             <slot ></slot>
       	</div>
        <actionsheet v-model="show" :menus="menus" @on-click-menu="click" show-cancel></actionsheet>

        <div class="uppic-box"><Uppic ref="Uppicinput" @callback="picId" :width="width" :height="height"></Uppic></div>
        <!-- 默认图片 -->
		<div class="default-pic" v-if="picshow">
			<header class="myApplyHeader"><span class="iconfont icon-fanhui" @click="picClose"></span> <span data-v-0084e772="">选择图片</span></header>
			<ul class="default-pic-ul">
				<li v-for="(item,index) in piclist" :key="index" @click="picIdcg(item)">
					<div class="item"><img :src="item[df.PicUrlLink]|| item.PicUrlLink"></div>
				</li>
				
			</ul>
		</div>

   </div>
</template>

<script>
/* 
    callback  回调事件
    //获取默认图片
    df{
        url:'api'
        data:上传数据
        get:回调取值
    }

    //生成图片ID
    Gpicid{
        url:'api'
        data:上传数据
        get:回调取值
    }

*/

import {Actionsheet } from "vux"
import { Uppic } from '@/bear'
export default {
    name: 'picUp',
    components:{
        Actionsheet,Uppic
    },
    props:{
        callback:Function,
        width:{
            type:Number,
            default:200
        },
        height:{
            type:Number,
            default:200
        },
        data:{
            type:Object,
            default:function(){
                return {}
            }
        },
        df:{
            type:Object,
            required: true,
            default:function(){
                return {}
            }
        },
        dfup:{
            type:Object,
            default:function(){
                return null
            }   
        },
        Gpicid:{
            type:Object,
            required: true,
            default:function(){
                return {}
            } 
        },
        menus:{
            type:Object,
            default:function(){
                return { up: '上传图片',df: '经典头像'}
            }
        }
    },
    data(){
        return {
            picshow:false,
            file:'',
            Id:'',
            show:false,
            piclist:[]

        }
    },
    created:function(){
       
    },
    computed:{

    },
    mounted:function(){   
    },
    methods:{
        openshow(){ 
            this.show=true
        },

        click(e){
            if(e=='df'){
                this.dfFn()
            }else if(e=='up'){
                this.$refs.Uppicinput.fileclick()
            }            
        },
        
        /* 默认图操作 */
        dfFn(){
            let me=this
            let df=this.df

			this.base.getData(this,this.host+df.url,df.data,function(data){
                me.piclist=data.ActionCode[df.get]

                console.log(data)
                me.picshow=true
			})
        },
        picClose(){
            this.picshow=false
            this.show=true
        },
        /* 改变picid */
		picIdcg(item){
            
            let me=this
           
            let PicId=item[me.df.PicId]||item.PicId
            let file=item[me.df.PicUrlLink]||item.PicUrlLink
            
            let D=this.data
            D.PicId=PicId
            D.imgsrc=file

            /* 默认图片更新picid */
            let dfup=this.dfup
            if(dfup){
                dfup.data['SelPfUserSysPicId']=PicId
                this.base.getData(this,this.host+dfup.url,dfup.data,function(data){
                        me.picshow=false
                        me.$emit('callback',D)
                })
            }else{
                me.picshow=false
                me.$emit('callback',D)
            }
         
        },
        /* 截图回调 */
		picId(img){

            let me=this
            this.file=img
            let Gpicid=this.Gpicid  

            this.base.getData(this,this.host+Gpicid.url,Gpicid.data,function(data){
                    data=data.ActionCode
                    let picid=data[Gpicid.get]
					me.uppic(picid,img)
            })

        },

		/* 上传图片*/
        uppic(PicId,ImageString){
            let me=this
            let D=this.data
            D.PicId=PicId
            D.imgsrc=me.file
            me.$emit('callback',D)

            ImageString=ImageString.substring(ImageString.indexOf(',')+1)
            this.base.getData(this,this.hostpic+'/api/UploadImg',{PicId:PicId,ImageString:ImageString},function(data){
       
            })
        }
     
		
    }

}
</script>

<style lang="less" scoped="scoped" type="text/css">
.picUp{ color:#333}
.uppic-box{
    width:0;
    height:0;
    position: relative;
}
.default-pic{
	background: #555;
	position: fixed;
	top:0;
	left:0;
	right:0;
	bottom:0;
	z-index:99999;
	padding-top:.44rem;
	overflow-y: scroll;
	.myApplyHeader{
		background: #000;
	}
	.default-pic-ul{
		padding:.05rem;
		li{
			width:33.33%;
			float:left;
			.item{
				margin:.05rem;
				img{
					width:100%;
				}
			}
		}
	}

}
</style>
