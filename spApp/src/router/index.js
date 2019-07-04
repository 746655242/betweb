import Vue from 'vue'
import Router from 'vue-router'
import home from '@/pages/home'

Vue.use(Router);
import store from "@/store"


let routes=[
    
    	{
            path: '/go',
            name: 'go',
            component: function(resolve) {
                require(['@/pages/guide/gohome'], resolve)
            },
       },  
        
        /* 首页 */
        {
            path: '/home',
            name: 'home',
            component: home,
            alias: '/index',
            children: [ 
                {
	                path:'',
	                component:function(resolve) {
                        require(['@/pages/index/jincai'], resolve)
                    }
                }
            ],
            // meta:{
            //     pagecode:{
                   
            //         '/home/main':'Idx_Main',
            //         '/home/lottery':'Idx_Lottery',
            //         '/home/number':'Idx_Number',
            //         '/home/sports':'Idx_Sports',
            //         '/home/export':'Idx_Export',
            //         '/home/forum':'Idx_Forum',
            //     }
            // }
        },  
        
         /* 投注 */
         {
            path: '/home/jincai',
            name: 'jincai',
            component: function(resolve) {
                require(['@/pages/index/jincai'], resolve)
            }
         
        }, 


        /* 14投注 */
        {
            path: '/home/zucai',
            name: 'zucai',
            component: function(resolve) {
                require(['@/pages/index/zucai'], resolve)
            }
        }, 


         /* 9投注 */
         {
            path: '/home/zucai9',
            name: 'zucai9',
            component: function(resolve) {
                require(['@/pages/index/zucai9'], resolve)
            }
        }, 


         /* 9投注 */
         {
            path: '/home/danchang',
            name: 'danchang',
            component: function(resolve) {
                require(['@/pages/index/danchang'], resolve)
            }
        }, 





        /* 投注记录 */
        {
            path: '/mine/betting',
            name: 'betting',
            component: function(resolve) {
                require(['@/pages/mine/betting'], resolve)
            }
         
        }, 


         




        /* 开奖 */
        {
            path: '/live',
            name: 'score',
            component: function(resolve) {
                require(['@/pages/score/'], resolve)
            },
            meta:{
                pagecode:['Open_Lottery','Open_Number','Open_Sports']
            }
        }, 
        
        
        /* 导航 */
        {
            path: '/guide',
            name: 'guide',
            component: function(resolve) {
                require(['@/pages/guide/'], resolve)
            },
            meta: {
                keepAlive: true
            }
        },
        
                
        /* 服务 */
        {
            path: '/serving',
            name: 'serving',
            component: function(resolve) {
                require(['@/pages/serving/'], resolve)
            },
            meta: {
                keepAlive: true
            }
        }, 
        
        
        /* 服务-->遗漏分析 */
        {
            path: '/missing',
            name: 'missing',
            component: function(resolve) {
                require(['@/pages/missing/missingAnalysis'], resolve)
            },
            meta: {
                keepAlive: true,
                pagecode:'GetLotteryServiceForLoss'
            }
        }, 
        
             
        /* 我的 */
        {
            path: '/mine',
            name: 'mine',
            component: function(resolve) {
                require(['@/pages/mine/'], resolve)
            },
            meta: {
                keepAlive: true,
                requiresAuth:true,
                pagecode:'AppMyAccount'
            }
        }, 
        
        /* 登陆 */
        {
            path: '/login',
            name: 'login',
            component: function(resolve) {
                require(['@/pages/login/index'], resolve)
            }
        }, 
        
        
        /* 注册 */
        {
            path: '/register',
            name: 'register',
            component: function(resolve) {
                require(['@/pages/login/register'], resolve)
            },
            meta:{
                pagecode:'RegExport'
            }
        },
        
        
        /* 忘记密码 */
        {
            path: '/forgetpassword',
            name: 'forgetpassword',
            component: function(resolve) {
                require(['@/pages/login/forgetpassword'], resolve)
            },
			meta:{
                pagecode:'ForgotPw'
            }
        }, 
        
        
        /* 重置密码  */
        {
            path: '/resetpassword',
            name: 'resetpassword',
            component: function(resolve) {
                require(['@/pages/login/resetpassword'], resolve)
            },
            meta:{
                pagecode:'MyAccountForChgPw'
            }
        },
        
        
        /* 公告  */
        {
            path: '/notice',
            name: 'notice',
            component: function(resolve) {
                require(['@/pages/notice/notice'], resolve)
            }
        },
        
        
         /* 公告详情  */
        {
            path: '/noticeDetail',
            name: 'noticeDetail',
            component: function(resolve) {
                require(['@/pages/notice/noticeDetail'], resolve)
            }
        },  
        
        
         /* 彩票开奖资料  */
        {
            path: '/lotteryList',
            name: 'lotteryList',
            component: function(resolve) {
                require(['@/pages/score/lotteryList'], resolve)
            },
            meta:{
                pagecode:['Bet_Gd11X5','Bet_Jx11X5','Bet_SD11X5','Bet_Cqssc','Bet_Tjssc','Bet_Xjssc']
            }

        },    
        
        
         /* 数字彩开奖详情  */
        {
            path: '/numberDetails',
            name: 'numberDetails',
            component: function(resolve) {
                require(['@/pages/score/numberDetails'], resolve)
            }
        },         
        
        
         /* 数字彩开奖资料  */
        {
            path: '/numberList',
            name: 'numberList',
            component: function(resolve) {
                require(['@/pages/score/numberList'], resolve)
            }
        }, 
        
        
         /* 体彩开奖资料  */
        {
            path: '/sportsList',
            name: 'sportsList',
            component: function(resolve) {
                require(['@/pages/score/sportsList'], resolve)
            }
        },        
        
        
        /* 彩票下注  */
        {
            path: '/lotteryBetting',
            name: 'lotteryBetting',
            component: function(resolve) {
                require(['@/pages/lottery/lotteryBetting'], resolve)
            }
        }, 
        
        
        /* 彩票投注列表  */
        {
            path: '/lotteryBettingList',
            name: 'lotteryBettingList',
            component: function(resolve) {
                require(['@/pages/lottery/lotteryBettingList'], resolve)
            }
        },  
        
        
         /* 支付  */
        {
            path: '/pay',
            name: 'pay',
            component: function(resolve) {
                require(['@/pages/lottery/pay'], resolve)
            }
        }, 
    
        
        /* 社区-->数字达人 */
        {
        	path: '/bbsDigitalTalent',
        	name: 'bbsDigitalTalent',
        	component: function(resolve) {
                require(['@/pages/bbs/bbsDigitalTalent'], resolve)
            }
        },
        
        
        /* 社区-->数字达人-->晒单详情 */
        {
        	path: '/bbsSingleDetails',
        	name: 'bbsSingleDetails',
        	component: function(resolve) {
                require(['@/pages/bbs/bbsSingleDetails'], resolve)
            }
        },
        
        
         /* 社区-->数字达人-->主题发表 */
        {
        	path: '/bbsKeynote',
        	name: 'bbsKeynote',
        	component: function(resolve) {
                require(['@/pages/bbs/bbsKeynote'], resolve)
            }
        },
        
        
        /* 我的-->设置 */
        {
        	path: '/mySet',
        	name: 'mySet',
        	component: function(resolve) {
                require(['@/pages/set/mySet'], resolve)
           },
           meta:{
               pagecode:['MyAccountForSetting','MyAccuontForLogout']
           }
        },
        
        
        /* 我的-->设置-->修改手机号码 */
        {
        	path: '/modifiedPhoneNumber',
        	name: 'modifiedPhoneNumber',
        	component: function(resolve) {
                require(['@/pages/set/modifiedPhoneNumber'], resolve)
           },
        },
        
        
         /* 我的-->设置-->修改密码 */
        {
        	path: '/modifiedPassword',
        	name: 'modifiedPassword',
        	component: function(resolve) {
                require(['@/pages/set/modifiedPassword'], resolve)
            },
//          meta:{
//              pagecode:'MyAccountForChgPw'
//          }
        },
        
         /* 我的-->设置-->清除缓存 */
        {
        	path: '/clearCache',
        	name: 'clearCache',
        	component: function(resolve) {
                require(['@/pages/set/clearCache'], resolve)
           },
        },
        
         /* 我的-->设置-->意见反馈 */
        {
        	path: '/feedback',
        	name: 'feedback',
        	component: function(resolve) {
                require(['@/pages/set/feedback'], resolve)
           },
        },
        
    
        /* 我的-->我的申请-->文章发表 */
        {
        	path: '/publishArticle',
        	name: 'publishArticle',
        	component: function(resolve) {
                require(['@/pages/mine/publishArticle'], resolve)
            },
            meta:{
                pagecode:'PublishPfDocument'
            }
        },
        
        
        /* 我的-->我的申请-->发表历史 */
        {
        	path: '/publishedHistory',
        	name: 'publishedHistory',
        	component: function(resolve) {
                require(['@/pages/mine/publishedHistory'], resolve)
            }
        },
        
        
        /* 我的-->我的申请-->战绩 */
        {
        	path: '/record',
        	name: 'record',
        	component: function(resolve) {
                require(['@/pages/mine/record'], resolve)
            }
        },
        
        
        /* 我的-->我的申请-->收益 */
        {
        	path: '/earnings',
        	name: 'earnings',
        	component: function(resolve) {
                require(['@/pages/mine/earnings'], resolve)
            }
        },
           
        
        /* 我的-->我的申请-->咨讯 */
        {
        	path: '/information',
        	name: 'information',
        	component: function(resolve) {
                require(['@/pages/mine/information'], resolve)
            }
        },
        
      
        /* 我的-->我的申请-->专家列表 */
        {
        	path: '/experts/list',
        	name: 'expertsList',
        	component: function(resolve) {
                require(['@/pages/experts/list'], resolve)
            },
            meta:{
                pagecode:['GetMyPfUserLst','ExportWD'] 
            }
        },


        /* 我的-->我的申请-->专家介绍 */
        {
        	path: '/experts/info',
        	name: 'experts/info',
        	component: function(resolve) {
                require(['@/pages/experts/info'], resolve)
            },
            meta:{
                pagecode:'GetMyPfUserDetail'
            }
        },
        
      
         /* 我的-->专家申请 */
         {
        	path: '/experts/apply',
        	name: 'experts/apply',
        	component: function(resolve) {
                require(['@/pages/experts/apply'], resolve)
            },
            meta:{
                pagecode:['MyAccountForApplyPf','ExportApply']
            }
        },
        
        
        /* 我的-->我的申请 */
        {
        	path: '/experts/myApply',
        	name: '/experts/myApply',
        	component: function(resolve) {
                require(['@/pages/experts/myApply'], resolve)
            }
        },

           /* 我的-->我的申请修改 */
        {
        	path: '/experts/myApply/:id',
        	name: 'myApply/id',
        	component: function(resolve) {
                require(['@/pages/experts/myApplyUp'], resolve)
            }
        },

        
		/* 我的-->我的申请-->我的专家 */
        {
        	path: '/myExperts',
        	name: 'myExperts',
        	component: function(resolve) {
                require(['@/pages/mine/myExperts'], resolve)
          }
        },
        
        
        /* 我的-->我的申请-->专家列表-->文章详情 */
        {
        	path: '/articleDetails',
        	name: 'articleDetails',
        	component: function(resolve) {
                require(['@/pages/mine/articleDetails'], resolve)
           }
        },
        
        
        /* 我的-->粉丝 */
        {
        	path: '/myFans',
        	name: 'myFans',
        	component: function(resolve) {
                require(['@/pages/mine/myFans'], resolve)
           },
           meta:{
                pagecode:'GetFansFromMeLst'
            }
        },
        
        
        /* 我的-->关注 */
        {
        	path: '/myFocus',
        	name: 'myFocus',
        	component: function(resolve) {
                require(['@/pages/mine/myFocus'], resolve)
           },
           meta:{
                pagecode:'GetFocusFromMeLst'
            }
        },
        
        
        /* 我的-->跟随 */
        {
        	path: '/myFollow',
        	name: 'myFollow',
        	component: function(resolve) {
                require(['@/pages/mine/myFollow'], resolve)
           },
           meta:{
                pagecode:'GetFollowFromMeLst'
            }
        },
        

         /* 我的-->消息 */
         {
        	path: '/msg',
        	name: 'msg',
        	component: function(resolve) {
                require(['@/pages/msg/'], resolve)
           },
           meta:{
                pagecode:''
            }
        },

        /* 我的-->消息详情 */
        {
        	path: '/msg/:id',
        	name: 'msg/id',
        	component: function(resolve) {
                require(['@/pages/msg/detail'], resolve)
           },
           meta:{
                pagecode:''
            }
        },
		
		 /* banner轮播广告 */
        {
        	path: '/advertisement',
        	name: 'advertisement',
        	component: function(resolve) {
                require(['@/pages/index/advertisement'], resolve)
          	},
        },
    
        /* 默认根路由 */
        {
            path: '/',
            redirect: '/home' //默认打开的路由 
        }
    ]

const router = new Router({
    routes: routes
})


/*页面码映射路由 */
let pagecode={};
let routercode={};

for(let i=0;i<routes.length;i++){
    if(routes[i].meta){
        let code=routes[i].meta.pagecode;
        let path=routes[i].path;
        if(code instanceof Array){
            for(let a=0;a<code.length;a++){
                pagecode[code[a]]=routes[i]
            }
            routercode[path]=code
        }else if(typeof code =='object'){
            let codes=[];
            for(let a in code){
                let obj=Object.assign({},routes[i])
                obj['path']=a
                pagecode[code[a]]=obj
                codes.push(code[a])
                routercode[a]=codes
            }
        }else if(typeof code=='string'){
            pagecode[code]=routes[i];
            routercode[path]=[code]
        }
    }
}
/* code取路径  */
Vue.prototype.$pagecode=function(code,data){
    if(pagecode[code]){
        let path=pagecode[code].path;
        return  data?{ path: path, query: data}:path
    }
    return '/404'
}


/* 路径取code */
Vue.prototype.$routercode=function(path){
    return  routercode[path]
}



//等待处理
router.beforeEach(function(to, from, next) {
    //store.commit('updateLoadingStatus', { isloading: true })
    next()
})
router.afterEach(function(to) {
    //store.commit('updateLoadingStatus', { isloading: false })
})
export default router