<template>
    <div class="container-main">
            <div class='container' id="editor">
                <div class="edit-box">
                    <textarea  class="edittext" @keyup.13="send(1,content);delall()" ref="sinput" @focus="phizhide" type="text" v-model="content"   @paste="paste" placeholder="">               
                    </textarea>
                </div>

                <div class="editpic iconfont">
                    <span >&#xe615;</span>
                    <input type="file"  @change="uppic"   multiple>
                </div>
                
                <div class="editphiz iconfont" @click="clickphiz"><span>&#xe616;</span></div>
                
                <div class="send-btn"  @click="send(1,content);delall()">发送</div>
            </div>
            
            <div class="phiz-box" :class="{'phizhide':isphiz}">

                <div v-if="phizkey=='1'" class="phiz" >  
                     <Swiper dots-position="center" dots-class="dots" height="1.6rem" >
                            <swiper-item   v-for="(item,index) in grouping(phiz[phizkey],23)" :key="index" >
                                <div class="line">
                                    <span @click="addphiz($event,subitem.code)"  v-for="(subitem,key) in item" :key="key"  ><img :src="subitem.icon"></span>
                                    <span @click="delphiz" class="iconfont" >&#xe617;</span>
                                </div>
                            </swiper-item>
                     </Swiper>
                </div>



                <div v-else class="phiz" >  
                     <Swiper dots-position="center" dots-class="dots"  height="1.6rem">
                            <swiper-item   v-for="(item,index) in grouping(phiz[phizkey],8)" :key="index" >
                                <div class="line" >
                                    <span class="w25" @click="send(3,phizkey+'_'+subitem.id,subitem.icon)"  v-for="(subitem,key) in item" :key="key"  >
                                        <img :src="subitem.icon">
                                         {{subitem.code}}
                                    </span>
                                </div>
                            </swiper-item>
                     </Swiper>
                </div>

                <div class="tab">
                    <span class="add">+</span>
                    <ul>
                        <li class="line" v-for="(item,index) in phizlist " :key="index" :class="{'on':phizkey==index}" @click="changePhizkey(index)" ><img :src="item.icon"></li>
                    </ul>
                    <span class="sendphiz" @click="send(1,content);delall()">发送</span>
                </div>
            </div>
    </div>
</template>
<script>
import  "../../res/js/exif.js"
import {Swiper,SwiperItem} from "vux"
export default {
    name:'edit',
    mounted(){
         // 阻止浏览器默认的拖拽时事件，测试阻止这几个就够了，不放心就全阻止一遍吧
        ['dragleave', 'drop', 'dragenter', 'dragover'].forEach(e => {
            this.preventDefaultEvent(e);
        })
        this.addDropSupport()
        this.getFaceType()
    },
    props:{
        send:Function,
    },
    components:{
        Swiper,
        SwiperItem
    },
    data(){
        return{  
            isphiz:true,
            content:'',
            files:'',
            phiz:{},
            phizlist:{},
            phizkey:1
        }
    },
    methods:{ 

        /* 表情分类 */
        grouping(obj,lg){
            let a={};
            for(var i in obj){
                let index=Math.floor(i/lg)
                if(!a[index]){
                    a[index]=[];
                }
                a[index].push(obj[i])
            }
            return a;
        },

        getFaceType(){
            let me=this; 
            let data={
                data:{
                    method:'Clientbase.getFaceType', 
                    version:'',
                }
            }
            this.base.getdata(this,data,function(e){
                let data=e.data;
                if(data.result>0){ 
                    me.phizlist=data.list
                    for(var i in data.list){
                        me.getFace(data.list[i])
                    }
                }
            }) 
        },

        /*获取表情*/
        getFace(item){
            let me=this; 
            let data={
                data:{
                    method:'Clientbase.getFace', 
                    version:'',
                    type:item.id
                }
            }
            this.base.getdata(this,data,function(e){
                let data=e.data;
                if(data.result>0){ 
                    me.phiz[item.id]=data.list
                }
               
            }) 
        },

        /* 切换表情 */
        changePhizkey(index){
            this.phizkey=index
        },

        /* 打开表情 */
        clickphiz(){
            if(this.isphiz){
                this.isphiz=false;                 
            }else{
                this.isphiz=true;
                this.$refs.sinput.focus()
            }
        },

        /*表情打开  */
        phizhide(){
            this.isphiz=true;
        },

          /* 输入表情 */
        addphiz(e,index){
            this.content+='['+index+']';
        },

        /* 删除表情 */
        delphiz(){
            let t=this.content;
            var start=t.lastIndexOf('[');
            var End=t.lastIndexOf(']');
            if(start>=0){
                var d_t=t.slice(0,start);
                var e_t=t.slice(End+1);
                this.content=d_t+e_t;
            }
        },

        /* @他 */
        at(item){   
            this.content+='@'+item.mnick+' ';
        },

        /* 阻止冒泡 */
        preventDefaultEvent(eventName){
            document.addEventListener(eventName, function (e) {
                 e.preventDefault();
            }, false)
        },

        /* 清除文本 */
        delall(){
            this.content=''
            this.files=''
            this.isphiz=true
        },

        addDropSupport(){
            let BOX = document;
            BOX.addEventListener('drop', (e) => {
                e.preventDefault();
                this.errText = '';
                // 上面给的MDN文档里有讲到dataTransfer承载拖拽数据
                let fileList = e.dataTransfer.files; // 其实这就是文件对象列表了
                // 总得拖一个文件吧
                if (fileList.length === 0) {
                    return false
                }
                // 格式限制
                if (fileList[0].type.indexOf('image') === -1) {
                    this.errText = '请选择图片文件';
                    return false;
                }
                // 这次限制下只能拖一个文件这次限制下只能拖一个文件
                if (fileList.length > 1) {
                    this.errText = '暂不支持多文件';
                    return false
                }
                this.handleFileChange(null, fileList[0]);
            })

        },

        handleFileChange (e, FILE) { 
            // 数据赋值改动，这样就兼容两种选择方式了
            // this.file = FILE || inputDOM.files[0];
            this.imgReader(FILE || inputDOM.files[0])
        },
         /* 截屏后粘贴事件 */
        paste(e){
            let clipboardData = e.clipboardData,
            i = 0,items, item, types;
            
            if(clipboardData){
                items = clipboardData.items;
                if( !items ){ return;}
                item = items[0];
                types = clipboardData.types || [];
                for( ; i < types.length; i++ ){
                    if( types[i] === 'Files' ){
                        item = items[i];
                        break;
                    }
                }
                if( item && item.kind === 'file' && item.type.match(/^image\//i) ){
                    this.imgReader( item.getAsFile() );
                }
            }
         },
         /* 生成图片 */
         imgReader(item){
            let me=this;
            let reader = new FileReader();
            reader.onload = function( e ){
                me.send(2,e.target.result)
                me.delall()
            };
            reader.readAsDataURL(item);
         },
        
        /* 图片处理压缩 */
        minimg(img,image){
            let me=this; 
            let Orientation;
            EXIF.getData(image,function(){
                Orientation=EXIF.getTag(this,'Orientation');  
                if(Orientation>1){
                    me.base.drawPhoto(img,Orientation,function(d,s,w,h){
                            var img=d;
                            me.send(2,img);
                    });				
                }else{
                    me.send(2,img);
                }
            }); 
        },
        /* 发送图片 */
        uppic(e){
            let me=this;
            let files=e.target.files;
            for(let i=0;i<files.length;i++){
                if (files[i].type.indexOf('image') === -1){
                    this.errText = '请选择图片文件';
                    return false;
                }
                let reader = new FileReader();
                reader.onload = function(e){

                    me.minimg(e.target.result,files[i])  
                };
                reader.readAsDataURL(files[i]);
            }
        }
    },
    watch:{
        
    }
}
</script>
<style lang="less" scoped>

.container-main{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 9;
    
    .container{
        position:relative;
        background: #eeeeee;
        padding:.1rem 1.1rem .1rem .48rem;
        min-height:.3rem;
        .edit-box{
            position: relative;   
            min-height: .3rem;
        }
        .edittext{
            position:absolute;
            top:0;
            left:0;
            right:0;
            bottom:0;
            width:100%;
            overflow:hidden; resize:none;
            -webkit-appearance: none;
        }
        .editor{  
            background: #fff;
            display: block;
            width: 100%;
            height: 100%;        
        } 
        .edittext,.editor{
            border-radius: .04rem;
            box-sizing: border-box;        
            font-size: .16rem;
            line-height: .2rem;
            word-wrap:break-word;
            padding:.02rem .06rem;
            min-height: .28rem;
            line-height:.28rem;
            letter-spacing:0px;
            font-weight: 300;
        }
        .editpic,.editphiz{
            position:absolute;
            width:.28rem;
            height:.28rem;
            left:.1rem;
            bottom:.1rem;
            font-size:.24rem;
            line-height: .28rem;
            color:#212120;
            overflow:hidden;
            input{
                width:100%;
                height: 100%;
                display:block;
                position: absolute;
                top:0;
                left:0;
                opacity: 0;
            }
        }
        .editphiz{
        left:initial;
        right: .7rem !important;
        } 
        .send-btn{
            position:absolute;
            width:.5rem;
            height: .3rem;
            text-align: center;
            color:#fff;
            line-height: .3rem;
            right: 0.1rem;
            font-size:.16rem;
            bottom:.09rem;
            display: block;
            border-radius: .03rem;
            background: #ebc341;
        }       
    }
}

.phiz-box{
     transition: height .2s;
    -moz-transition: height .2s;	
    -webkit-transition: height .2s;
    -o-transition: height .2s;
     height:2.29rem;
    .phiz{
        background: #f5f4f6;
        border-top: 1px solid #d7d7d8;
        overflow: hidden;
        padding:.2rem .2rem 0;
        height:1.65rem;       
        span{ 
            width:12.5%;
            height:auto;
            padding:.1rem 0;
            text-align:center;
            display:block;
            float:left;
            img{
                width:.25rem;
                height:.25rem;
                display:block;
                margin:0 auto;
            }
        }
        .w25{
            width:25%;
            color:#999;
            line-height:.3rem;
            margin-bottom:.05rem;
            padding:0;
            img{
                width: .4rem;
                height:.4rem;
               
            }
        }
    }
    .tab{
        border-top:1px solid #d2d2d4;
        background: #fff;
        height:.44rem;
        position: relative;
        padding:0 .5rem 0 .45rem;
        overflow: hidden;
        .add{
            position: absolute;
            left: 0;
            top:0;
            text-align:center;
            color:#74777e;
            width:.45rem;
            height: .44rem;
            font-size:.3rem;
            line-height: .42rem;
        }
        .sendphiz{
            position: absolute;
            top:0;
            right:0;
            width:.5rem;
            height: 0.44rem;
            font-size:.15rem;
            line-height: .44rem;
            text-align:center;
            border-left:1px solid #dadada;
            box-shadow: -3px 0px 5px rgba(0,0,0,.05) 
        }
        ul{
            overflow-y: hidden;
            .line{
                width:.44rem;
                float:left;
                position: relative;
                img{
                    width:.22rem;
                    height: .22rem;
                    margin:.11rem;
                }
            }
            .line:after{
                content:'';
                position: absolute;
                width:1px;
                right:0;
                top:.07rem;
                background: #eee;
                height: .3rem;

            }
            .on{
                background: #f6f6f8;
            }
        }
       
    }
}
.phizhide{
    height:0;
    padding:0;
    border-top:0;
}
.sysinfo{
    text-align: center;
    margin-top:.1rem;
    span{
        background: #f4f4f4;
        display:inline-block;
        padding:.05rem .2rem;
        border-radius:.3rem;
        font-size:.12rem;
    }          
}
</style>

