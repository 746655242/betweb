<template>
	<div class="wrap" id="wrap">	
        <header class="title">      
			<span onclick="history.go(-1)" class="iconfont icon-fanhui">&#xe614;</span>
			<span>胜负彩任选九场</span>
        </header>

        <div class="listbox">
    
            <div class="item" v-for="(item,index) in oddsData" :key="index" >
                <div class="daybar" @click="dshow(index,item)">
                        <p >第{{ item.title}}期</p>
                        <i class="iconfont more ">&#xe600;</i>
                </div>

                <div class="listItembox" v-show='!item.show'>

                    <div class="bs-item" v-for="(ite,ind) in item.list" :key="ind">
                            <div class="bs-name">
                                <div class="xuhao">{{ite.id}}</div>
                                <div class="liansai" v-bind:style="{'background':ite.color}">{{ite.liansai}}</div>
                                <div class="time">{{ite.date}} {{ite.timetxt}}</div>
                            </div>
                            <div class="bs-com">
                                <div class="duizheng">
                                    <span class="fl"><cite>{{ite.zhu.pm}}</cite><em>{{ite.zhu.name}}</em></span>
                                    <span class="fl" v-bind:class="{red:ite.bf!='VS'}">{{ite.bf}}</span>
                                    <span class="fl"><em>{{ite.ke.name}}</em><cite>{{ite.ke.pm}}</cite></span>
                                </div>
                                <div class="listbet">
                                    <table>
                                        <tr>
                                            <td class="bet-btn" 
                                                v-bind:class="{'beton':betlist[ind]&&betlist[ind]['3']}" 
                                                @click="addbet(ite,3)"
                                            ><span>胜</span><span class="odds">{{ite.OddsList['3']}}</span></td>
                                            <td class="bet-btn"
                                                v-bind:class="{'beton':betlist[ind]&&betlist[ind]['1']}"
                                                @click="addbet(ite,1)"
                                                 ><span>平</span><span class="odds">{{ite.OddsList['1']}}</span></td>
                                            <td class="bet-btn" 
                                                v-bind:class="{'beton':betlist[ind]&&betlist[ind]['0']}"  
                                                 @click="addbet(ite,0)"
                                                ><span>负</span><span class="odds">{{ite.OddsList['0']}}</span></td>
                                        </tr>
                                        
                                    </table>
                                </div>
                            </div>
                    </div>

                </div>
            </div>

        </div>

        <div class='bg' v-show="isbetNum"></div>

        <div class="bet-bar">
            
            <div class="top"  v-if="betlistArr.length<totalGame">
                已选择{{betlistArr.length}}场,还差{{totalGame-betlistArr.length}}场 <br>
                <span>竞猜数据仅供参考，请以实票数据为准</span>
            </div>

            <div class="bet-js"  v-else >

                 

                <div class="title">金额 <span class="red">{{bettotalmoney}}</span> 元 </div>
                <div class="com">
                    <span class="btn" >{{betfield}}串{{cuang}}</span>
                    <span class="btn input-btn"><input type="text"  v-model="cancel"></span>倍
                    <span class="gobtn" @click="order">下注</span>
                </div>
            </div>
        </div>
        
        <loginLayer  ref="loginLayer"></loginLayer>
	</div>
</template>

<script>

import { Swiper, SwiperItem, XImg } from 'vux'
import { createMode,createOne,PASS_MODE_MAP2,createList } from '../../store/game'
import qs from 'qs'

export default {
	name: 'index',
	data(){ //页面数据
		return {
            gameid: 4,
            isbetNum:false,//是否切换 
            betNum:0,
            gglist:PASS_MODE_MAP2,
            totalGame: 9, //最少9场
            cancel:1, //倍数
            field:14, //总比赛场数
            cuang:1, //串
            betfield:2, //投注场

            betmoney:2, //投注金额 
            bettotalmoney:2, //投注总金额 
            totalBonus:0, //总奖金
            
            allbetlist:null,
            allid:null,
            allodds:null,

            orderData: "", // 下单数据

            //比赛数据
            oddsData:[],
            oddsDataobj:{},

            betlistArr:[],//选择投注

            oldbetlist:{},//旧数据
            betlist:{}, //选中json投注

            issue:null,
            
            //选择配置
            optionConfig:{
                    '0': {
                        cn: ['胜', '平', '负'],
                        wager: ['3', '1', '0'],
                        mix: ['16', '15', '14'],
                        ltype: 'SportteryNWDL'
                    },
                    '1': {
                        cn: ['胜', '平', '负'],
                        wager: ['3', '1', '0'],
                        mix: ['13', '11', '10'],
                        special: true,
                        ltype: 'SportteryWDL',
                        specialkey: 'WDL'
                    },
                    '2': {
                        cn: ['1:0', '2:0', '2:1', '3:0', '3:1', '3:2', '4:0', '4:1', '4:2', '5:0', '5:1', '5:2', '胜其他',null,null,'0:0', '1:1', '2:2', '3:3', '平其他', '0:1', '0:2', '1:2', '0:3', '1:3', '2:3', '0:4', '1:4', '2:4', '0:5', '1:5', '2:5', '负其他'],
                        wager: ['1:0', '2:0', '2:1', '3:0', '3:1', '3:2', '4:0', '4:1', '4:2', '5:0', '5:1', '5:2', '胜其他',null,null, '0:0', '1:1', '2:2', '3:3', '平其他', '0:1', '0:2', '1:2', '0:3', '1:3', '2:3', '0:4', '1:4', '2:4', '0:5', '1:5', '2:5', '负其他'],
                        mix: ['30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42',null,null, '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60'],
                        ltype: 'SportteryScore'
                    },
                    '3': {
                        cn: ['0球', '1球', '2球', '3球', '4球', '5球', '6球', '7球以上'],
                        wager: ['0', '1', '2', '3', '4', '5', '6', '7+'],
                        mix: ['00', '01', '02', '03', '04', '05', '06', '07'],
                        ltype: 'SportteryTotalGoals'
                    },
                    '4': {
                        cn: ['胜/胜', '胜/平', '胜/负', '平/胜', '平/平', '平/负', '负/胜', '负/平', '负/负'],
                        wager: ['3-3', '3-1', '3-0', '1-3', '1-1', '1-0', '0-3', '0-1', '0-0'],
                        mix: ['20', '21', '22', '23', '24', '25', '26', '27', '28'],
                        ltype: 'SportteryHalfFull'
                    }
            },
        }
    },
    computed:{

      
    },
	created: function() { //初始化
		this.fetchData();
	},
	mounted:function() {

	},
	methods:{
        //加载数据
		fetchData(){
            this.axios.post('/api/ball/GetBall/odds?code=odds14').then(res => {  
                let data=res.data.result;
                if(data.code==0){
                    this.oddsData=data.data;
                    this.loadoddsDataobj(data.data);
                }
            }).catch(function(err){
                console.log(err)
            }) 
        },

        loadoddsDataobj(data){
            this.issue=data[0].title;
            data.forEach((val,index)=>{
                
                for(let i in val.list){
                    this.oddsDataobj[i]=val.list[i];
                }
            });
        },
        
        //是否展示 
        dshow(index,item){
            this.oddsData[index].show=!item.show;
            //防止监听
            this.oddsData.push([]);
            this.oddsData.pop(); 
        },

        showAll(item,ite,id){ 
            ite.date=item.date;
            this.allid=id;
            this.allodds=ite;

            this.oldbetlist=this.betlist;
        },
        closeAll(cancel){
            //取消
            if(cancel){
              this.betlist=this.oldbetlist;
            }
            this.allodds=null;
            this.allid=null;
        },
        clearBetData(){
            this.cancel = 1; // 倍数
            this.field = 14; // 总比赛场数
            this.cuang = 1; //串
            this.betfield = 2; //投注场
            this.betmoney = 2; // 投注金额
            this.bettotalmoney = 2; // 投注总金额
            this.totalBonus = 0; //总奖金

            this.allbetlist = null;
            this.allid = null;
            this.allodds = null;
            this.orderData =  ""; //  下单数据

            this.betlistArr = []; //选择投注
            this.oldbetlist = {}; //旧数据
            this.betlist = {}; //选中json投注
        },

        //增加和删除
        addbet(item,id){
            let orderid=item.orderid;
            let odds=item.OddsList[id];

            //删除和添加 
            if(this.betlist[orderid]){
                if(this.betlist[orderid][id]){
                    delete this.betlist[orderid][id];
                    Object.keys(this.betlist[orderid]).length>0?'':delete this.betlist[orderid];
                 }else{
                    this.betlist[orderid][id]=odds;
                 }
            }else{                
                this.betlist[orderid]={};
                this.betlist[orderid][id]=odds;
            }

            //即时更新
            this.betlist=JSON.parse(JSON.stringify(this.betlist));

            this.betlistArr=[];
            let total=0;
            let orderDataTmp = "";
            for(let i in this.betlist){
                let keys=[];
                let onetoal=2*this.cancel;
                //生成投注明线
                let orderDataIdxTmp = "";
                for(let k in this.betlist[i]){
                    let name=i+'|'+k;
                    onetoal=onetoal*this.betlist[i][k];
                    keys.push(name);

                    if(orderDataIdxTmp != ""){
                        orderDataIdxTmp += ",";
                    }
                    orderDataIdxTmp += i + "_" + k + "_" + this.betlist[i][k];
                }
                if(orderDataTmp != ""){
                    orderDataTmp += ";"
                }
                orderDataTmp += orderDataIdxTmp;

                total+=onetoal;
                this.betlistArr.push(keys);
            }
            this.orderData = orderDataTmp;
            this.betfield=this.betlistArr.length;

            this.rejs();
        },

        //重新计算
        rejs(){
            this.bettotalmoney = 0;
            if(this.betfield < 9){
                return false;
            }

            let reqData={};
            reqData['gameid'] = this.gameid;
            reqData['issue'] = this.issue;
            reqData['pass_type'] = "9_1";
            reqData['order_data'] = this.orderData;
            reqData['multiple'] = this.cancel;
            window.console.log("========reqData========");
            window.console.log(reqData);
            this.axios.post('/api/ball/GetBall/getBonusRange', qs.stringify(reqData)).then(res => {
                let data = res.data;
                window.console.log("========data========");
                window.console.log(data);
                if(data.errorCode==0){
                    this.bettotalmoney = data.result.total_money;
                }else{
                    alert(data.message);
                }
            }).catch(function(err){
                window.console.log(err);
            });
        },

        tabnub(){
            this.isbetNum=!this.isbetNum;
        },

        //改变玩法
        changebetfield(index,cuang){
            this.betfield=index;
            this.cuang=cuang;
            this.rejs(); 
        },

        //下单
        order(){
            let reqData={};
            reqData['gameid'] = this.gameid;
            reqData['issue'] = this.issue;
            reqData['order_data'] = this.orderData;
            reqData['multiple'] = this.cancel;
            window.console.log("========reqData========");
            window.console.log(reqData);
            this.axios.post('/api/ball/GetBall/bet14', qs.stringify(reqData)).then(res => {  
                let data = res.data;
                window.console.log("========data========");
                window.console.log(data);
                if(data.errorCode==0){
                    this.clearBetData();
                    alert(data.message);
                }else if(data.errorCode==1){
                    this.$refs.loginLayer.show(true);
                }else{
                    alert(data.message);
                }
                if(this.isbetNum){
                    this.tabnub();
                }
            }).catch(function(err){
                if(this.isbetNum){
                    this.tabnub();
                }
                window.console.log(err);
            });
        }
	},

    watch: { //数据监听
        cancel(e){
            //this.cancel= e==0?1:e
            this.rejs();
        }
	},
	components: { //模板
		Swiper,
		SwiperItem,
		XImg
	},
	activated:function(){
		
	},
	beforeRouteEnter(to, from, next) { //渲染页面前执行
//			console.log('进入' + to.name + '组件前');
		next();
	},
	beforeRouteUpdate(to, from, next) { //页面切换如：在/foo/1和/foo/2之间跳转
//			console.log('组件切换数据');
		next();
	},
	beforeRouteLeave(to, from, next) { //离开时执行
//			console.log('离开组件');
		next();
	}

}
</script>


<style lang="less" scoped="scoped">
.red{
    color: #F76665 !important;
}
.wrap{
    padding-bottom:1rem;
}
.listbox{
    .item{
        background: #f4f4f4;
        .daybar{
            background: #fff;
            border-bottom:1px solid #ddd;
            font-size:.12rem;
            padding:.05rem;
            color:#666;
            p{ display:inline-block;}
            .more{ 
                float: right;
            }
        }
        .listItembox{
            .bs-item{
                position: relative;
                padding:.1rem .1rem .1rem .8rem;
                text-align:center;
                font-size:.1rem;
                color:#999;
                border-bottom:1px solid #d1d1d1;
                .bs-name{
                    position: absolute;
                    top:.1rem;
                    left:.1rem;
                    width: .6rem;
                    line-height: .16rem;
                    .liansai{
                        background: #6F00DD;
                        color:#fff;
                    }

                }
                .bs-com{
                    .duizheng{
                        font-size:.13rem;
                        color:#333;
                        font-style: normal;
                        overflow: hidden;
                        span{
                            padding: .05rem .1rem;
                            display: inline-block;
                        }
                        em,cite{
                            vertical-align: middle;
                        }
                    }
                    .listbet{
                       
                        table{
                            width:100%;
                            td{
                                border:1px solid #d1d1d1;
                                background: #fff;
                                line-height: .38rem; 
                            }
                            .bet-btn{
                                span{
                                    font-size:.16rem;
                                    color:#333;
                                    font-weight: bold;
                                }
                                .odds{
                                    font-size:.12rem;
                                    padding-left:.05rem;
                                    font-weight: normal;
                                }
                            }
                            .betbtn-rang{
                                width: .2rem;
                                background: #c9c9c9;
                                color:#fff;
                            }
                            .btn-red{
                                background: #F42023;
                            }
                            .btn-red1{
                                background: #F76665;
                            }
                            .btn-green{
                                background: #68D268;
                            }
                            .more-btn{ 
                                line-height: .16rem;
                                color:#666;
                            }
                        }
                    }
                }


            }
        }
        
    }
    
}

.bg{
    position: fixed;
    bottom:0;
    left:0;
    top:0;
    right:0;
    background: rgba(0,0,0,.5);
    z-index: 99;
}

.bet-bar{
    background: #fff;
    border-top:1px solid #dfdfdf;
    position: fixed;
    bottom:0;
    left:0;
    width: 100%;
    min-height: .5rem;
    line-height: .5rem;
    z-index: 99;
    .guoguang{
        .til{
            background: #ececec;
            text-align: center;
            border-top:1px solid #c1c1c1;
            border-bottom:1px solid #c1c1c1;
            i{ 
             margin-right:.1rem;
             color:#999;   
             float: right;
             font-size:.2rem;}
        }
        p{
            text-align: center;
            color:#999;
            font-size:.12rem;
            line-height: .12rem;
        }
        ul{
            overflow: hidden;
            padding:.05rem;
            li{
                width: 25%;
                float: left;
                span{
                    text-align: center;
                    margin:.05rem .1rem;
                    border-radius: .05rem;
                    line-height: .36rem;
                    display: block;
                    border:1px solid #dcdcdc;
                }
            }
            .on{
                background: #ef1823;
                border:1px solid #ef1823;
                color:#fff;
            }
        }
    }
    .top{
        font-size:.12rem;
        text-align: center;
        line-height: .18rem;
        padding-top:.1rem;
        span{ 
            font-size:.1rem;
            color:#999;
        }
    }
    .bet-js{
       .title{
           text-align: center;
           border-bottom:1px solid #efefef;
           .red{ 
               color:red;
           }
       } 
       .com{
           .btn{ 
               border:1px solid #d4d4d4;
               display: inline-block;
               line-height: .3rem;
               margin: 0 .1rem;
               font-size:.13rem;
               padding:0 .15rem;
               color:crimson;
               position: relative;
               i{
                   position: absolute;
                   top:-.1rem;
                    right:-.1rem;
                    color:#fff;
                    display: block;
                    width: .2rem;
                    height: .2rem;
                    line-height: .2rem;
                    text-align: center;
                    border-radius: 50%;
                    background:#ef1823;

               }
            }
            .input-btn{
                width: .5rem;
                input{
                    width: 100%;
                }   
            }
           .gobtn{
               float: right;
               background:#0875db;
               color:#fff; 
               text-align: center;
               padding:0 .1rem;
               min-width:.8rem;
           }
       }
    }
}

.beton{
    background: #ef1823!important;
    color:#fff !important;
    span{color:#fff !important;}
}

.add-more-layer{
    position: fixed;
    left:0;
    top:0;
    bottom:0;
    right:0;
    background: #f4f4f4;
    z-index: 100;
    overflow: auto;
    padding:.45rem 0  .5rem 0;
    .header{
        i{ font-size:.1rem;}
    }
    .btnbox{
        position: fixed;
        background: #fff;
        border-top:1px solid #dfdfdf;
        position: fixed;
        bottom:0;
        left:0;
        width: 100%;
        text-align: center;
         padding:.1rem 0 ;
        .btn{
            line-height: .3rem;
            display:inline-block;
            padding: .02rem .4rem;
            margin: 0 .2rem;
            border:1px solid #e6e6e6;
            border-radius: .05rem;
            background: #eeeeee;
        }
        .confirm{
            background: #019bff;
            color:#fff;
            border:1px solid #019bff;
        }
    }
    .line{
        background: #fff;
        margin-bottom:.1rem;
        border-bottom:1px solid #d1d1d1;
        .title{
            padding:.1rem;
            color:#666;
            font-size:.12rem;
            border-bottom:1px solid #d1d1d1;
        }
        
        .comleft{
            padding-left:.3rem !important; 
        }
        .com{
            padding: .1rem;
            position: relative;

            .left{
                position: absolute;
                left:.1rem;
                top:.2rem;
                width: .22rem;
                bottom:.1rem;
                color:#fff;
                text-align: center;
                .zhuone{
                    width: 100%;
                    height: 1.44rem;
                    padding-top:.3rem;
                }
                .pingone{height: .48rem;}
            }
            table{
                width: 100%;
                td{
                    text-align: center;
                    border:.01rem solid #ef1823;
                    line-height: .18rem;
                    padding:.05rem 0;
                    .zhu{
                        min-width:.5rem;
                        line-height:.22rem;
                        display:inline-block;
                    }
                    .chi{
                        font-size:.1rem;
                        color:#999;
                    }
                }
                .one{
                    border: none;
                    width:.2rem;
                    background: #cdcdcd;
                    div{
    
                        color:#fff;
                        width: 100%;
                        height: 100%;
                        display: block;
                    }
                    
                }
            }
        }
    }
    

}


.table{
     overflow: hidden;
     border-top: 1px solid #ef1823;
     border-left: 1px solid #ef1823;
     padding: 0 !important;
     margin:.1rem;
    .betBtn{
        text-align: center;
        border-bottom: 1px solid #ef1823;
        border-right: 1px solid #ef1823;
        line-height: .18rem;
        height: .48rem;
        padding: .05rem 0;
        float: left;
        width: 25%;
        display:block;
        .zhu{
            min-width:.5rem;
            display:inline-block;
        }
        .chi{
            font-size:.1rem;
            color:#999;
        }
    }
    .w3{
        width: 33.33% !important;;
    }
    .w5{
        width: 20% !important;;
    }
}


</style>