<template>
<div>
<link href="./static/css/jingcai.css" rel="stylesheet">
	<div>
        <header class="head prel">
            <div class="back"><a class="backlink" onclick="history.go(-1)"></a></div>
            <div class="headertit">
            <h1>竞彩足球</h1>
            </div>
            <div class="headBtnbox topcenter">
                <!-- <a><em class="headicon icon_screen"></em></a> -->
                <!-- <a><em class="headicon icon_list"></em></a> -->
            </div>
        </header>

        <div id="dropload-body">
            <section id="scrollBody" class="match bgf2">

            <div class="paijingtop topcenter" style="display:none">
                <div class="boxflex">
                    <a class="topcenter" onclick="history.go(-1)"><em class="iconbg2 iconbg2_horn"></em><p class="boxflex gray3"></p></a>
                </div>
                <a class="flexcenter delbox"><em class="iconbg icondelmin"></em></a>
            </div>


            <div class="padmainbtm">
                <div v-for="(item,index) in oddsData" :key="index">
                    <div class="topcenter matchtit" @click="dshow(index,item)">
                        <p class="boxflex gray8b" v-html="item.title"></p>
                        <em id="downupBtn" class="icon_arrowgraydown icon_arrowgrayup"></em>
                    </div>
                    <!-- matchtit over -->
                    <div class="matchlist matchlist_jingcai" v-show='!item.show'>
                        <div class="border_b flexbox matchitem" v-for="(ite,ind) in item.list" :key="ind">
                            <div class="matchitem_tit">
                                <p class="gray8b font12">{{ite.id}}</p>
                                <p class="saishi" v-bind:style="{'background':ite.color}"><span class="font12">{{ite.liansai}}</span></p>
                                <p class="font12">{{ite.timetxt}}</p>
                                <!-- <div class="fontblue font12">分析</div> -->
                            </div>
                            <div class="boxflex matchitem_cont">
                                <div class="topcenter team">
                                    <p class="boxflex topcenter flexend"><cite class="team_host"><span>{{ite.zhu.pm}}</span><span
                                            style="display: none;"></span></cite>
                                        <span>{{ite.zhu.name}}</span>
                                    </p>
                                    <p class="teambf"><span>VS</span></p>
                                    <p class="boxflex topcenter textl">
                                        <span>{{ite.ke.name}}</span>
                                        <cite class="team_guest"><span>{{ite.ke.pm}}</span><span style="display: none;"></span></cite>
                                    </p>
                                </div>
                                <div class="topcenter">
                                <div class="boxflex">
                                    <div class="topcenter dan"><cite class="rang rang0">0</cite>
                                    <p class="boxflex betbtn" v-bind:class="{'beton':betlist[ind]&&betlist[ind]['16']}" @click="addbet(ite,16)"><span>胜</span><span>{{ite.OddsList['16']}}</span></p>
                                    <p class="boxflex betbtn" v-bind:class="{'beton':betlist[ind]&&betlist[ind]['15']}" @click="addbet(ite,15)"><span>平</span><span>{{ite.OddsList['15']}}</span></p>
                                    <p class="boxflex betbtn" v-bind:class="{'beton':betlist[ind]&&betlist[ind]['14']}" @click="addbet(ite,14)"><span>负</span><span>{{ite.OddsList['14']}}</span></p>
                                    </div>
                                    <div class="topcenter"><cite class="rang rangred" v-if="ite.Boundary<0">{{ite.Boundary}}</cite><cite class="rang ranggreen" v-else>{{ite.Boundary}}</cite>
                                    <p class="boxflex betbtn" v-bind:class="{'beton':betlist[ind]&&betlist[ind]['13']}" @click="addbet(ite,13)"><span>胜</span><span>{{ite.OddsList['13']}}</span></p>
                                    <p class="boxflex betbtn" v-bind:class="{'beton':betlist[ind]&&betlist[ind]['11']}" @click="addbet(ite,11)"><span>平</span><span>{{ite.OddsList['11']}}</span></p>
                                    <p class="boxflex betbtn" v-bind:class="{'beton':betlist[ind]&&betlist[ind]['10']}" @click="addbet(ite,10)"><span>负</span><span>{{ite.OddsList['10']}}</span></p>
                                    </div>
                                </div>
                                <div class="morebtn topcenter">
                                    <p>更多玩法</p>
                                    <!-- <p v-text="item.info.selectNum"></p> -->
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- matchlist over -->
                </div>
                
                <!-- 无赛程 -->
                <div class="nulllotteryno" style="display:none;">
                    <p class="nulllotterynoimg"><img src="~@/assets2/images/nulllotteryno-83be1b1b40.png" alt=""></p>
                    <p class="font14 gray5">暂无比赛</p>
                </div>
                <!-- matchlist over -->
            </div>
            </section>
        </div>

        <section class="bottombet" style="">
            <!-- 没有选择比赛 默认  -->
            <div class="bottombetno textc" v-if="betlistArr.length<2">
                <p>至少选择一场比赛（竞猜全场90分钟的比赛结果）</p>
                <p class="font10 gray9"><span>竞猜数据仅供参考，请以实票数据为准</span>
                </p>
            </div>
            <!-- 有选择比赛 -->
            <div v-else>
                <div class="betmoney border_b topcenter">
                    <p class="boxflex textc">
                    <span class="mr10">金额 <cite class="fontred">{{bettotalmoney}}</cite> 元</span>
                    <span class="mr20">最高奖&nbsp;<cite class="fontred jiangjin">{{totalBonus}}</cite>&nbsp;元</span>
                    </p>
                    <a class="fontblue" style="display: none;">奖金优化</a>
                </div>
                <div class="topcenter bottombetbtn">
                    <p class="guoguanbtn "><span>选择过关</span>
                    <cite class="icon_reddot">0</cite>
                    </p>
                    <p class="beishu"><input type="text" readonly="readonly" disabled="disabled"></p>
                    <span class="mr05rem">倍</span>
                    <!-- <a class="buybtn_gray">保存</a> -->
                    <!-- <p class="boxflex" style=""><a href="javascript:void(0);" class="hemaibtn">合买</a></p> -->
                    <p class="boxflex"><a class="buybtn_blue" @click="order">投注</a></p>
                    <!-- <p class="boxflex"><a @click="checkSubmit" class="buybtn_blue">确认选号</a></p> -->

                </div>
            </div>
        </section>

	</div>
</div>
</template>

<script>

import { Swiper, SwiperItem, XImg } from 'vux'
import { createMode, createOne, PASS_MODE_MAP, PASS_MODE_MAP2, createList } from '../../store/game'
import qs from 'qs'

export default {
	name: 'index',
	data(){ //页面数据
		return {
            isbetNum:false,//是否切换 
            betNum:0,
            passModeMap:PASS_MODE_MAP,
            gglist:PASS_MODE_MAP2,
            totalGame:8,//最多8场
            cancel:1, //倍数
            field:2, //总比赛场数
            cuang:1,//串
            betfield:2,//投注场

            betmoney:2, //投注金额
            bettotalmoney:2, //投注总金额 
            totalBonus:0,//总奖金
            
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
                        cn: ['0球', '1球', '2球', '3球', '4球', '5球', '6球', '7+'],
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
            this.axios.post('/api/ball/GetBall/odds?code=jcodds').then(res => {  
                let data=res.data.result;
                if(data.code==0){
                    this.oddsData=data.data;
                    this.loadoddsDataobj(data.data);
                }
            }).catch(function(err){
                window.console.log(err)
            }) 
        },

        loadoddsDataobj(data){

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

            $("#downupBtn").hasClass()
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
            this.field = 2; // 总比赛场数
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
            //最多选8场
            if( this.field >= this.totalGame){
                alert('最多选'+this.totalGame+'场');
                return ;
            }

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
                    let name= this.oddsDataobj[i].date+'|'+i+'|'+k+'|'+this.betlist[i][k]+'|'+this.oddsDataobj[i].Boundary;
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
            // this.totalBonus=total.toFixed(2);//总奖金
            this.field=this.betlistArr.length;
            this.betfield=this.betlistArr.length;
            
            if(this.betlistArr.length <= 2){
                this.cuang = 1;
            }else{
                let cgroup = this.passModeMap[this.betlistArr.length-3];
                let exist = false;
                for(let i=0, len=cgroup.length; i<len; i++){
                    if(cgroup[i][0] === this.cuang){
                        exist = true;
                        break;
                    }
                }
                if(exist == false){
                    this.cuang = 1;
                }
            }

            //this.allbetlist=createOne(this.betlistArr,this.betfield);
            this.reBonus();
        },

/* 
    -1 [
    3+3,     16 - 13   16 '15', '14'   '13', '11', '10'
    3+1,     16 - 11
    1+0,     15 - 10
    0+0      14 - 10 
    ]

    +1 [
    3+3,  16 -13
    1+3,  15 -13
    0+0,  14 -10  
    0+1   14 -11
    ]
*/
        //标盘和平盘比较去重
        jscompare(arr){
            let rang=arr[0].split('|')[4];
            
            let model= rang*1<0?
            [ 
                [16,13],   
                [16,11],
                [15,10],
                [14,10],
            ]: [ 
                [16,13],   
                [15,13],
                [14,10],
                [14,11],
            ];
            let arrs=[];//取值数组
            let lsobjval={}; //转数组
            let lsobj={};   //转对象

           
            //转化相应数组
            arr.forEach(function(value,index){
                    let id= value.split('|')[2];
                    lsobjval[id]=value.split('|');
                    lsobj[id]=value;
            })

            //求和 
            model.forEach(function(value,index){
                let one = lsobjval[value[0]] ?lsobjval[value[0]][3]*1 :0;
                let two = lsobjval[value[1]] ?lsobjval[value[1]][3]*1 :0;
                let s=one+two;
                arrs.push(s);
            });
            
           
            //取最大值
            let  maxval=0;
            let  key =0;
            arrs.forEach(function(val,i){
                if(val>maxval){
                    maxval=val;
                    key = i;
                }
            })

           // window.console.log(model,model[key]);

            let res=[];
            lsobj[model[key][0]]?res.push(lsobj[model[key][0]]):'';
            lsobj[model[key][1]]?res.push(lsobj[model[key][1]]):'';
            return res;
        },

        //计算最高中奖金
        jsTotalBonus(arr,bet,c){

            let total=0;//最高奖金
            let ls=[];
           
            //去重
            for(let i in arr){
                let s=[0,0,0,0,0];
                let odds=[0,0,0,0,0];

                let before=this.jscompare(arr[i]);

                for(let k in arr[i]){
                    //5组单独去重
                    let line=arr[i][k].split('|');

                    for(let index in this.optionConfig){
                        if(index>1){
                            //标盘
                            if(this.optionConfig[index].mix.indexOf(line[2])>=0){
                                if(line[3]>odds[index]){
                                    s[index]=arr[i][k];
                                    odds[index]=line[3];
                                }
                            }
                        }


                    }
                }

                let st=before;
                for(let key in s){
                    if(s[key]!=0){
                        st.push(s[key]);
                    }
                }
                ls.push(st);
            }

           
            let allbetlist=createList(ls,bet,c);
            for(let i in allbetlist){
                let onetoal=2*this.cancel;
                for(let k in allbetlist[i]){
                    let odds= allbetlist[i][k].split('|')[3];
                    onetoal=onetoal*odds;
                }
                total+=onetoal;
            }
          
            return  total.toFixed(2);
        },

        //重新计算
        reBonus(){
            this.totalBonus = 0;
            this.bettotalmoney = 0;
            if(this.betfield <= 1){
                return false;
            }

            let reqData={};
            reqData['gameid'] = 1;
            reqData['pass_type'] = this.betfield + "_" + this.cuang;
            reqData['order_data'] = this.orderData;
            reqData['multiple'] = this.cancel;
            window.console.log("========reqData========");
            window.console.log(reqData);
            this.axios.post('/api/ball/GetBall/getBonusRange', qs.stringify(reqData)).then(res => {
                let data = res.data;
                window.console.log("========data========");
                window.console.log(data);
                if(data.errorCode==0){
                    this.totalBonus = data.result.bonus_max;
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
            this.betfield = index;
            this.cuang = cuang;
            this.reBonus(); 
        },

        //下单
        order(){
            let reqData={};
            reqData['gameid'] = 1;
            reqData['pass_type'] = this.betfield + "_" + this.cuang;
            reqData['order_data'] = this.orderData;
            reqData['multiple'] = this.cancel;
            window.console.log("========reqData========");
            window.console.log(reqData);
            this.axios.post('/api/ball/GetBall/betNew', qs.stringify(reqData)).then(res => {  
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
            this.reBonus();
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
//			window.console.log('进入' + to.name + '组件前');
		next();
	},
	beforeRouteUpdate(to, from, next) { //页面切换如：在/foo/1和/foo/2之间跳转
//			window.console.log('组件切换数据');
		next();
	},
	beforeRouteLeave(to, from, next) { //离开时执行
//			window.console.log('离开组件');
		next();
	}

}
</script>


<style lang="less" scoped="scoped">
.red{
    color: #F76665 !important;
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
.beton{
    background: #ef1823!important;
    color:#fff !important;
    span{color:#fff !important;}
}
</style>