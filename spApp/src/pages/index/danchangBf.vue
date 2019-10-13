<template>
<div>
<link href="./static/css/jingcai.css" rel="stylesheet">
<link href="./static/css/danchang.css" rel="stylesheet">
	<div id="body" class="danchang_spf">
        <header class="head headfixed">
            <div class="back"><router-link :to="homeUrl"><p class="backlink"></p></router-link></div>
            <div class="headertit topcenter column" @click="betChange">
                <a class="boxflex flexcenter tabbtn"><span class="fontwhite font16">单场比分</span><em class="icon_arrowgraydown"></em></a>
            </div>
            <div class="headBtnbox topcenter">
                <a><em class="headicon icon_screen"></em></a>
                <a><em class="headicon icon_list"></em></a>
            </div>
            <!-- 玩法切换 -->
            <div class="layerbox layerbox_header" v-show="isbetChange">
                <ul class="qibtnlist clearfix">
                <li class="boxflex">
                    <router-link :to="danchangTypeUrl[0].href">
                    <p class="qibtn">{{danchangTypeUrl[0].name}}</p>
                    </router-link>
                </li>
                <li class="boxflex">
                    <router-link :to="danchangTypeUrl[1].href">
                    <p class="qibtn qibtn_sed">{{danchangTypeUrl[1].name}}</p>
                    </router-link>
                </li>
                <li class="boxflex">
                    <router-link :to="danchangTypeUrl[2].href">
                    <p class="qibtn">{{danchangTypeUrl[2].name}}</p>
                    </router-link>
                </li>
                <li class="boxflex">
                    <router-link :to="danchangTypeUrl[3].href">
                    <p class="qibtn">{{danchangTypeUrl[3].name}}</p>
                    </router-link>
                </li>
                </ul>
            </div>
        </header>

        <div class="loadtips" style="z-index: 1; display: none;">
            <p>下拉刷新比赛清空已选投注</p>
            <em class="iconbg icon_remind"></em>
        </div>


        <div class="app">
            <div class="scrollbox">
                <section id="scrollBody" class="bgf2" drapload-key="ascroll" drapload-initialize="false" drapload-down="" drapload-up="doRefresh()" style="">

                <div class="dropload-up">
                    <div class="dropload-refresh">↓下拉刷新</div>
                </div>
                <div class="padmainbtm">
                    <div class="paijingtop topcenter" style="display:none">
                        <div class="boxflex">
                            <a class="topcenter" onclick="history.go(-1)"><em class="iconbg2 iconbg2_horn"></em><p class="boxflex gray3"></p></a>
                        </div>
                        <a class="flexcenter delbox"><em class="iconbg icondelmin"></em></a>
                    </div>

                    <div v-for="(item,index) in oddsData" :key="index" v-if="item.list">
                        <div class="topcenter matchtit" @click="dshow(index,item)">
                            <p class="boxflex gray8b" v-html="item.title"></p>
                            <em id="downupBtn" class="icon_arrowgraydown"></em>
                        </div>
                        <!-- matchtit over -->
                        <div class="matchlist" v-show='!item.show'>
                            <div class="border_b topcenter matchitem" v-for="(ite,ind) in item.list" :key="ind">
                                <div class="matchitem_tit">
                                    <p class="gray8b font10">{{ite.id}}</p>
                                    <p class="saishi" v-bind:style="{'background':ite.color}"><span class="font10">{{ite.liansai}}</span></p>
                                    <p class="font10">{{ite.timetxt}}</p>
                                    <!-- <div class="fontblue font10">分析</div> -->
                                </div>
                                <div class="boxflex matchitem_cont">
                                    <div class="topcenter team">
                                        <p class="boxflex textr">
                                            <cite class="team_host" v-if="ite.zhu.pm">
                                                [<span>{{ite.zhu.pm}}</span>]
                                                <span style="display: none;"></span>
                                            </cite>
                                            <span>{{ite.zhu.name}}</span>
                                        </p>
                                        <p class="teambf"><span>VS</span></p>
                                        <p class="boxflex textl">
                                            <span>{{ite.ke.name}}</span>
                                            <cite class="team_guest" v-if="ite.ke.pm">
                                                <span style="display: none;"></span>
                                                [<span>{{ite.ke.pm}}</span>]
                                            </cite>
                                        </p>
                                    </div>
                                    <div class="dc_bifenbtn" v-bind:class="{'dc_bifenbtn_sed':betlist[ite.orderid]}" @click="showAll(item,ite,ind)">
                                        <span class="gray8b" v-if="!betlist[ite.orderid]">点击展开投注</span>
                                        <p class="dc_banqbtn_sedbox" v-if="betlist[ite.orderid]">
                                            <span class="fontred" v-for="(item,index) in optionConfig[2].cn" :key="index" v-if="betlist[ite.orderid][optionConfig[2].mix[index]]">{{item}}</span>
                                        </p>
                                        <em class="icon_reddot" v-if="betlist[ite.orderid]">{{betlist[ite.orderid].length}}</em>
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
                </div>
                </section>
            </div>
        </div>

        <!-- 比分选项 -->
        <div class="layerbox" v-if="allodds">
            <div class="jincaibtmcon layer_btnlist">
                <div class="layer_btnlist_tit">
                <span class="font10" v-if="allodds['zhu']['pm']">[<span>{{allodds['zhu']['pm']}}</span>]</span>
                <span class="font10" style="display: none;"></span>
                <span>{{allodds['zhu']['name']}}</span>
                &nbsp;&nbsp;VS&nbsp;&nbsp;
                <span>{{allodds['ke']['name']}}</span>
                <span class="font10" style="display: none;"></span>
                <span class="font10" v-if="allodds['ke']['pm']">[<span>{{allodds['ke']['pm']}}</span>]</span>
                </div>
                <div class="border_b m_bif">
                    <div class="topcenter m_bif_s">
                        <div class="bif_tit topcenter">
                        <p class="boxflex">主胜比分</p>
                        </div>
                        <div class="boxflex flexbox">
                            <p class="boxflex betbtn" v-for="(item,index) in optionConfig[2].cn" v-if="index<=8 || index==12" :key="index"
                            v-bind:class="{'betbtn_sed':betlist[allid]&&betlist[allid][optionConfig[2].mix[index]]}"
                            @click="addbet(allodds,optionConfig[2].mix[index])">
                                <span>{{item}}</span>
                                <span>{{allodds['OddsList'][optionConfig[2].mix[index]]}}</span>
                            </p>
                        </div>
                    </div>
                    <div class="topcenter m_bif_p">
                        <div class="bif_tit topcenter">
                        <p class="boxflex">平局</p>
                        </div>
                        <div class="boxflex flexbox">
                            <p class="boxflex betbtn" v-for="(item,index) in optionConfig[2].cn" v-if="index>=15 && index<=19" :key="index"
                            v-bind:class="{'betbtn_sed':betlist[allid]&&betlist[allid][optionConfig[2].mix[index]]}"
                            @click="addbet(allodds,optionConfig[2].mix[index])">
                                <span>{{item}}</span>
                                <span>{{allodds['OddsList'][optionConfig[2].mix[index]]}}</span>
                            </p>
                        </div>
                    </div>
                    <div class="topcenter m_bif_f">
                        <div class="bif_tit topcenter">
                        <p class="boxflex">主负比分</p>
                        </div>
                        <div class="boxflex flexbox">
                            <p class="boxflex betbtn" v-for="(item,index) in optionConfig[2].cn" v-if="(index>=20 && index<=28) || index==32" :key="index"
                            v-bind:class="{'betbtn_sed':betlist[allid]&&betlist[allid][optionConfig[2].mix[index]]}"
                            @click="addbet(allodds,optionConfig[2].mix[index])">
                                <span>{{item}}</span>
                                <span>{{allodds['OddsList'][optionConfig[2].mix[index]]}}</span>
                            </p>
                        </div>
                    </div>

                </div>
                <div class="topcenter layer_btnlist_btn">
                <p class="boxflex mr15"><a class="btn btn_gray"  @click="closeAll(true)">取消</a></p>
                <p class="boxflex"><a class="btn btn_blue"  @click="closeAll(false)">确定</a></p>
                </div>
            </div>
        </div>

        <div class='bgHeader' v-show="isbetChange" @click="betChange"></div>
        <div class='bg' v-show="isbetNum"></div>

        <section class="bottombet">
            <!-- 没有选择比赛 默认  -->
            <div class="bottombetno textc" v-if="betlistArr.length<1">
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
                </div>
                <div class="topcenter bottombetbtn">
                    <p class="guoguanbtn" @click="tabnub">
                        <span v-if="betfield == 1">单关</span>
                        <span v-else>{{betfield}}串{{cuang}}</span>
                        <cite class="icon_reddot">{{betlistArr.length}}</cite>
                    </p>
                    <p class="beishu"><input type="text" v-model="cancel"></p>
                    <span class="mr05rem">倍</span>
                    <p class="boxflex"><a class="buybtn_blue" @click="order">投注</a></p>
                </div>
            </div>
        </section>
        <!-- 过关方式 -->
        <div class="layerbox layerbox_jincaibtm" v-show="isbetNum">
            <div class="jincaibtmcon">
                <a class="closeball" @click="tabnub"></a>
                <div class="layermenu ">
                    <nav class="flexbox headermenu unheadermenu">
                    <p class="boxflex"><a>过关方式</a></p>
                    <!-- <p class="boxflex" style="display: none"><a>设胆<cite class="icon_reddot" style="display: none;">0</cite></a></p> -->
                    </nav>
                </div>
                <div class="guoguan_list_wrap">
                    <div class="jincaibtmcon_main">
                    <ul class="clearfix" >
                        <li class="betbtn" v-for="(item,key) in betlistArr.length" :key="key"
                        v-if="item==1" @click="changebetfield(item,1)"
                        v-bind:class="{'betbtn_sed':betfield==item&&cuang==1}">单关</li>
                        <li class="betbtn" v-for="(item,key) in betlistArr.length" :key="key"
                        v-if="item>=2 && item<=3" @click="changebetfield(item,1)"
                        v-bind:class="{'betbtn_sed':betfield==item&&cuang==1}">{{item}}串1</li>
                    </ul>
                    </div>
                    <p class="font12 gray8b text">&nbsp;</p>
                </div>

                <div class="dingdan_list_wrap" style="display:none;">
                    <div class="dingdan_list">

                    <!-- dingdan_list_item -->

                    </div>
                    <!-- dingdan_list over -->
                </div>
                <!-- dingdan_list_wrap over-->

            </div>
        </div>

        <loginLayer ref="loginLayer"></loginLayer>

    </div>
</div>
</template>

<script>

import { Swiper, SwiperItem, XImg } from 'vux'
import { createMode, createOne, PASS_MODE_TYPE_BD, PASS_MODE_TYPE2_BD, createList } from '../../store/game'
import qs from 'qs'

export default {
	name: 'index',
	data(){ //页面数据
		return {
            isbetChange: false, // 头部切换
            isbetNum:false,//是否切换 
            betNum:0,
            passModeBdMap:PASS_MODE_TYPE_BD,
            gglist:PASS_MODE_TYPE2_BD,
            totalGame: 15,//最多15场
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
            lotterNo:0,
            homeUrl: "/home",
            danchangTypeUrl: [
                {
                    href:'/home/danchang',
					name:'单场胜平负',
                },
                {
                    href:'/home/danchangBf',
					name:'单场比分',
                },
                {
                    href:'/home/danchangBq',
					name:'单场半全场',
                },
                {
                    href:'/home/danchangZjq',
					name:'单场总进球',
                }
            ],
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
            this.axios.post('/api/ball/GetBall/odds?code=oddsdanchangBf').then(res => {
                let data=res.data.result;
                window.console.log(data);
                if(data.code==0){
                    this.oddsData=data.data;
                    this.loadoddsDataobj(data.data);
                }
            }).catch(function(err){
                window.console.log(err)
            }) 
        },

        loadoddsDataobj(data){

            this.lotterNo=data[0].lotterNo;

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
        betChange(){
            this.isbetChange=!this.isbetChange;
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
                    // 旧代码 待删除
                    let name= this.oddsDataobj[i].date+'|'+i+'|'+k+'|'+this.betlist[i][k]+'|'+this.oddsDataobj[i].Boundary;
                    onetoal=onetoal*this.betlist[i][k];
                    keys.push(name);
                    // 旧代码 待删除 end

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
            if(this.betfield > 3){
                this.betfield = 3;
            }
            
            if(this.betlistArr.length <= 1 || this.betlistArr.length >= 7){
                this.cuang = 1;
            }else{
                let cgroup = this.passModeBdMap[this.betlistArr.length-2];
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
                let s=[0];
                let odds=0;   

                let before=this.jscompare(arr[i]);

                for(let k in arr[i]){
                    //5组单独去重
                    let line=arr[i][k].split('|');
                    if(line[3]>odds){
                        s[0]=arr[i][k];
                        odds=line[3];
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
            if(this.betfield < 1){
                return false;
            }
            if(this.betfield > 3){
                this.betfield = 3;
            }

            let reqData={};
            reqData['gameid'] = 5;
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
                }else if(data.errorCode==1){
                    this.$refs.loginLayer.show(true);
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
            reqData['gameid'] = 5;
            reqData['bet_type'] = 5;
            if(this.betfield > 3){
                this.betfield = 3;
            }
            reqData['pass_type'] = this.betfield + "_" + this.cuang;
            reqData['order_data'] = this.orderData;
            reqData['multiple'] = this.cancel;
            window.console.log("========reqData========");
            window.console.log(reqData);
            this.axios.post('/api/ball/GetBall/betBd', qs.stringify(reqData)).then(res => {  
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
.bgHeader{
    position: fixed;
    bottom:0;
    left:0;
    top:0;
    right:0;
    background: rgba(0,0,0,.5);
    z-index: 60;
}
.bg{
    position: fixed;
    bottom:0;
    left:0;
    top:0;
    right:0;
    background: rgba(0,0,0,.5);
    z-index: 69;
}
.beton{
    background: #ef1823!important;
    color:#fff !important;
    span{color:#fff !important;}
}
</style>