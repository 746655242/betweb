<template>
	<div class="home-content" v-title data-title="首页" >
		<tab :line-width=2 active-color='#ef1823' v-model="index" defaultColor="#7b7979" >
			<tab-item class="vux-center"  v-for="(item, index) in list" :key="index">{{item.nav}}</tab-item>
		</tab>
 
		<div class="home-box" ref="swiperbox" @touchstart='touchstart' @touchmove='touchmove' @touchend='touchend'>
			<div class="swiper-center" ref="swipermain">
				<div class="swiper-item"   :key="0">
					<index @LstPageMenu='LstPageMenu'></index>
				</div>
				
			</div>
		</div>
		
		<slTabbar></slTabbar>
		
	</div>
</template>

<script>
import { Tab, TabItem} from 'vux'
import  index from '@/pages/index/'
// import  sportsLottery  from '@/pages/index/sportsLottery'
// import  Lottery  from '@/pages/lottery/Lottery'
// import  digitalLottery  from '@/pages/index/digitalLottery'
// import  bbs  from '@/pages/bbs/bbs'
// import  prediction  from '@/pages/index/prediction'

const list = () =>[
	{title:'福盈中央投注站',nav:'福盈中央投注站',url:'main'}, 
	// {title:'彩票',nav:'彩票',url:'lottery'},
	// {title:'数字',nav:'数字',url:'number'},
	// {title:'运动彩',nav:'运动彩',url:'sports'},
	// {title:'社区',nav:'社区',url:'forum'},
	// {title: '专家预测',nav:'专家预测',url:'export'}
]
export default {
	name: 'Home',
	data() { //页面数据
		return {
			msg: '时来运转APP',
			list: list(),
			index:0,
			demo2: '导航',
			translate3d:{x:0},
			isone:true,//首次移动判断
			isdirection:'',//方向判断 
			start:{},//触点
			isx:'',
			w:'',
			max:0
		}
	},
	props:['baseDate'],
	components: { //模板
		Tab,
		TabItem,
		index,
		// sportsLottery,
		// Lottery,
		// digitalLottery,
		// bbs,
		// prediction
		
	},
	created: function() { //初始化 在dom加载之前
		//通过url识别index
		let path=this.$route.params.path
		this.pathindex(path)
			
		let is_login = localStorage.is_login; //是否登陆状态 
		let is_visitor = localStorage.is_visitor;
	},
	mounted() {
		let me=this
		this.init()

		window.onload=function(){
			window.onresize=me.init
		}
	},
	methods: {
		/* 加载默认 */
		init(){
			let dom=this.$refs.swiperbox
			let w=dom.clientWidth
			this.w=w
			let item=dom.querySelectorAll('.swiper-item')
			this.max=item.length-1
			for(var i=0;i<item.length;i++){
				let e=item[i];
				let transform='translate3d('+w*i+'px, 0, 0)';
				this.csst(e,transform)
			}
		},
		LstPageMenu:function(data){
			//菜单重新渲染
			let me=this
			data.forEach(function(item,i){
				me.list[i].nav=item.SubMenuShow
				if(item.IsDefault){
					me.index=i	
				}
			})
		},
		fetchData:function(){
			
		},
		//无缓存
		pathindex:function(path){
			//url修改index值
			for(var i=0; i<this.list.length;i++){
				if(this.list[i].url==path){
					this.index=i
					break	
				}
			}
		},
		touchstart:function(e){
			let touch = e.touches[0];
			this.start.x=Number(touch.pageX)
			this.start.y=Number(touch.pageY)
		},
		touchmove:function(e){
			// if(this.base.isDevice()=='Android'){
			// 	//安卓关闭滑动功能 
			// 	return false;
			// }
			let touch = e.touches[0]
			this.isx=Number(touch.pageX)-this.start.x;
			this.isy=Number(touch.pageY)-this.start.y;
		
			//首次滑动判断
			if(this.isone){
				this.isone=false
				if(Math.abs(this.isx)<Math.abs(this.isy)){
					//console.log('上下')
					this.isdirection=false
				}else{
					//console.log('右左')
					this.isdirection=true
					//e.preventDefault()
				}	
			}
			//执行
			if(this.isdirection){
				//左右
				//e.preventDefault() 
				this.$refs.swiperbox.style.overflow='hidden';
				this.moveanimation();
			}else{
				//上下
				this.isx=0;
			}
		},
		touchend:function(e){
			let me=this
			let w=me.w
			let isx=me.isx
			let dom=me.$refs.swipermain
	
			if(Math.abs(isx)>w/2){
				if(isx<0){
					me.index+=1;
				}else{
					me.index-=1;
				}
				if(me.index<0){me.index=0}
				if(me.index>=me.max){me.index=me.max}
			}
			me.endanimation();

		},
		moveanimation(){
			let x=this.isx+this.translate3d.x
			let transform = 'translate3d('+x+'px, 0, 0)'
			let dom=this.$refs.swipermain
			this.csst(dom,transform)
		},
		endanimation(){
			let me =this
			let dom=me.$refs.swipermain
			dom.style.transitionDuration='400ms'
			dom.style.webkitTransitionDuration='400ms'

			me.translate3d.x=me.w*me.index*-1
			let transform = 'translate3d('+me.translate3d.x+'px, 0, 0)'
			me.csst(dom,transform)
			setTimeout(function(){
				me.recovery()
			},0)
		},
		csst(e,transform){
			e.style.webkitTransform = transform;
			e.style.MozTransform = transform;
			e.style.msTransform  = transform;
			e.style.OTransform = transform;
			e.style.transform = transform;
		},
		recovery:function(){
			//恢复默认
			this.$refs.swipermain.style.transitionDuration='0ms'
			this.$refs.swipermain.style.webkitTransitionDuration='0ms'
				
		    this.isone=true
			//this.$refs.swiperbox.style.overflowY='scroll';
			this.start.isx=0;
			this.start.isy=0;
			this.isx=0;
		},
	},
	computed: { //缓存，

	},
	watch: { //数据监听
		index:function(e){
			let url= '#/home/'+this.list[e].url
			document.title=this.list[e].title
			history.pushState({},'',url);
			this.endanimation();
		},
		
	},
	beforeRouteEnter(to, from, next) { //渲染页面前执行
 		next();	
	},
	beforeRouteUpdate(to, from, next) { //页面切换如：在/foo/1和/foo/2之间跳转
		let path=to.params.path
		this.pathindex(path)
		//console.log('组件切换数据');
		next();
	},
	beforeRouteLeave(to, from, next) { //离开时执行
		//console.log('离开组件');
		next();
	}

}
</script>
<style lang="less">

.home-content{
	.vux-tab-selected{
		font-size: .15rem !important;
		color:#282727 !important;
	}
	.vux-tab{
		margin-top: 0;
	}
	.vux-tab .vux-tab-item{
		font-size:.13rem;
	}
}
.home-box{ 
	position: absolute;
	top:44px; 
	bottom:51px; 
	left:0; 
	right:0;
	background: #f0f0f0;
	overflow:hidden;
	-webkit-overflow-scrolling: touch;
	.swiper-center{
		width:100%;
		height:100%;
		.swiper-item{
			position: absolute;
			width:100%;
			left: 0;
			top:0;
			bottom:0;
			right:0;
			overflow-y:scroll;
		}
	}
}
.swiper-item::-webkit-scrollbar {display: none;}
</style>