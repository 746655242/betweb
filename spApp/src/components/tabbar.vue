<template>
    <tabbar class="tabbar">
      <tabbar-item v-for="(item,index) in list"  :href="'#/'+item.url" :key='index'>
        <span slot="icon" class="iconfont  mian-color"  v-if="$route.path.indexOf(item.url)>=0">       	
	      	<span v-html="item.onicon"></span> 
	     	<!-- <img :src="item.onicon" alt="" /> -->
        </span>
        <span slot="icon" class="iconfont "  v-else >       	
            <span v-html="item.icon"></span>   	
            <!-- <img :src="item.icon" alt="" /> -->
        </span>
        <span slot="label" :class="[$route.path.indexOf(item.url)<0?'':'mian-color']">
            {{item.MenuShow}}
        </span>        
      </tabbar-item>
    </tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from 'vux'
let tabbarList=[
  {
    url:'home',
    icon:'&#xe61b;',
    onicon:'&#xe61a;',
    MenuShow:'首页',
  },
  // {
  //   url:'live',
  //   icon:'&#xe619;',
  //   onicon:'&#xe617;',
  //   MenuShow:'开奖',
  // },
  // {
  //   url:'guide',
  //   icon:'&#xe620;',
  //   onicon:'&#xe61e;',
  //   MenuShow:'引导',
  // },
  // {
  //   url:'serving',
  //   icon:'&#xe618;',
  //   onicon:'&#xe61d;',
  //   MenuShow:'服务',
  // },
  {
    url:'mine',
    icon:'&#xe61c;',
    onicon:'&#xe61f;',
    MenuShow:'我的',
  }
]
export default {
  name: 'slTabbar',
  components:{
     Tabbar,
    TabbarItem
  },
  data () {
    return {
      list:tabbarList,
    }
  },
  created(){
    let me=this
    // this.base.getData(this,this.host+'/api/GetExportMenu',{"SystemCode":"DQExport"},function(data){
	// 	me.LstMainMenuInfo = data.ActionCode.LstMainMenuInfo
		
	// 	me.LstMainMenuInfo.forEach(function(item,i){
	// 		me.list[i].MenuShow=item.MenuShow
	// 		me.list[i].icon=item.MenuIconPic.UrlLink
	// 		me.list[i].onicon=item.ClickMenuIconPic.UrlLink
	// 	})
	// })

  },
  computed:{
    
  },
  mounted:function(){

  }
}
</script>

<style lang="less" scoped="scoped" type="text/css">
.tabbar{
  color:#848483;
  position: fixed;
  .iconfont{ font-size:26px;color:#848281}
}
.mian-color{
  color:@red !important;
}
.weui-tabbar__item.weui-bar__item_on .weui-tabbar__label span{
	color:#999;
}
</style>
