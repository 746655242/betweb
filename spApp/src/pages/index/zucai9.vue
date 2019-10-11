<template>
<div>
<link href="./static/css/zucai.css" rel="stylesheet">
	<div id="body" class="zucai_ren9">

        <header class="head headfixed">
            <div class="back w40"><a class="backlink" onclick="history.go(-1)"></a></div>
            <div class="headertit topcenter column">
                <a class="boxflex flexcenter tabbtn"><span class="fontwhite font16">足彩任选九 -&nbsp;</span><p class="fontwhite font16">{{oddsData[issueIndex].title}}期</p><em class="icon_arrowgraydown"></em></a>
                <p class="boxflex font12">截止时间： <span>9-25 22:00</span></p>
            </div>
            <div class="headBtnbox w40"><a class="fr"><em class="headiconwhite icon_list"></em></a></div>
            <!-- 期号切换 -->
            <div class="layerbox layerbox_header" style="display:none;">
            <ul class="qibtnlist clearfix">
                <li class="boxflex"><p class="qibtn qibtn_sed">19129</p></li>
                <li class="boxflex"><p class="qibtn">19130</p></li>
                <li class="boxflex"><p class="qibtn">19131</p></li>
                <li class="boxflex"><p class="qibtn">19132</p></li>
                <li class="boxflex"><p class="qibtn">19133</p></li>
            </ul>
            </div>
            <!-- 链接层 -->
            <div class="layerbox layerbox0" style="display:none;">
            <div class="headerbtnlist">
                <em class="headerbtnlist_icon"></em>
                <a href="https://koudai.17itou.com/zucai/prize/" backurl="%2Fzucai%2F%3Fback%3D%252Fuser%252Fshop%252Fdetails%252F%253Fid%253D21858271%26scene%3Dstation_lottery%26station_id%3D21858271">开奖结果</a>
                <div class="headerbtnlist2">
                <a href="https://koudai.17itou.com/zucai/prize/?id=19128" backurl="%2Fzucai%2F%3Fback%3D%252Fuser%252Fshop%252Fdetails%252F%253Fid%253D21858271%26scene%3Dstation_lottery%26station_id%3D21858271">19128&nbsp;&nbsp;&nbsp;&nbsp;已结束0场</a><a href="https://koudai.17itou.com/zucai/prize/?id=19127" backurl="%2Fzucai%2F%3Fback%3D%252Fuser%252Fshop%252Fdetails%252F%253Fid%253D21858271%26scene%3Dstation_lottery%26station_id%3D21858271">19127&nbsp;&nbsp;&nbsp;&nbsp;已结束14场</a><a href="https://koudai.17itou.com/zucai/prize/?id=19126" backurl="%2Fzucai%2F%3Fback%3D%252Fuser%252Fshop%252Fdetails%252F%253Fid%253D21858271%26scene%3Dstation_lottery%26station_id%3D21858271">19126&nbsp;&nbsp;&nbsp;&nbsp;已结束14场</a>
                </div>
                <a href="https://koudai.17itou.com/user/betlist/?type=ZuCai" backurl="%2Fzucai%2F%3Fback%3D%252Fuser%252Fshop%252Fdetails%252F%253Fid%253D21858271%26scene%3Dstation_lottery%26station_id%3D21858271">选号记录</a>
                <a href="https://koudai.17itou.com/livescore/zucai/" backurl="%2Fzucai%2F%3Fback%3D%252Fuser%252Fshop%252Fdetails%252F%253Fid%253D21858271%26scene%3Dstation_lottery%26station_id%3D21858271">即时比分</a>
                <a href="https://koudai.17itou.com/help/gameinfo/zucai/" backurl="%2Fzucai%2F%3Fback%3D%252Fuser%252Fshop%252Fdetails%252F%253Fid%253D21858271%26scene%3Dstation_lottery%26station_id%3D21858271">玩法说明</a>
            </div>
            </div>
        </header>

    <div class="app">
    <div class="scrollbox">
        <section class="zucaimain" drapload-key="ascroll" drapload-initialize="false" drapload-down="" drapload-up="doRefresh()">
            <!--<div class="advertisingbox" @click.stop="look_adv_details()" v-show="advertising_data.show" style="display: none;"><img src="/static/images/luckylotto_zc-f45a147e03.jpg" alt="好彩足球广告"><em class="advertisingbg">广告</em><p @click.stop="close_adv()" class="icondelminbox">×</p></div>-->
            <div class="dropload-up"><div class="dropload-refresh">↓下拉刷新</div></div><div>
                <div class="paijingtop topcenter" style="display:none">
                <div class="boxflex"><a class="topcenter" backurl="%2Fzucai%2F%3Fback%3D%252Fuser%252Fshop%252Fdetails%252F%253Fid%253D21858271%26scene%3Dstation_lottery%26station_id%3D21858271">
                <em class="iconbg2 iconbg2_horn"></em><p class="boxflex gray3"></p></a></div>
                <a class="flexcenter delbox"><em class="iconbg icondelmin"></em></a>
                </div>

                <div class="guncun" style="display:none">滚存奖池：<span class="fontred">0</span>元&nbsp;&nbsp;<em class="guncunicon">?</em></div>
                <div class="matchlist textc" style="">
                    <div class="matchlist_item topcenter border_b" v-for="(ite,ind) in oddsData[issueIndex].list" :key="ind">
                        <p class="xuhao graya6">{{ite.id}}</p>
                        <div class="saishi font12">
                            <p class="fontwhite" v-bind:style="{'background':ite.color}">{{ite.liansai}}</p>
                            <p class="graya6">{{ite.date}} {{ite.timetxt}}</p>
                            <!-- <a>分析</a> -->
                        </div>
                        <div class="boxflex topcenter betbtnbox">
                            <div class="betbtn" v-bind:class="{'betbtnsed':betlist[ind]&&betlist[ind]['3']}" @click="addbet(ite,3)"><p class="gray5">{{ite.zhu.name}}</p><span class="graya6 font12">{{ite.OddsList['3']}}</span></div>
                            <div class="betbtn" v-bind:class="{'betbtnsed':betlist[ind]&&betlist[ind]['1']}" @click="addbet(ite,1)"><p class="gray5">平局</p><span class="graya6 font12">{{ite.OddsList['1']}}</span></div>
                            <div class="betbtn" v-bind:class="{'betbtnsed':betlist[ind]&&betlist[ind]['0']}" @click="addbet(ite,0)"><p class="gray5">{{ite.ke.pm}}</p><span class="graya6 font12">{{ite.OddsList['0']}}</span></div>
                        </div>
                        <div class="danbox">胆</div>
                    </div>


                </div>
                <!-- matchlist over -->
                <div class="nulllotteryno" style="display:none;">
                    <p class="nulllotterynoimg"><img src="~@/assets2/images/nulllotteryno-83be1b1b40.png" alt=""></p>
                    <p class="font14 gray5">官方足彩无可售期</p>
                </div>
            </div>
        </section>
    </div>
    </div>

    <section class="bottombet">
    <!-- 没有选择比赛 默认  -->
    <div class="bottombet_text1 gray5" v-if="betlistArr.length<totalGame">
        <p>已选<span class="fontred">{{betlistArr.length}}</span>场，还需选择<span class="fontred">{{totalGame-betlistArr.length}}</span>场</p>
        <p class="font10"><a>竞猜数据仅供参考，请以实票数据为准</a></p>
    </div>
    <!-- 未开售  -->
    <div class="bottombet_text2 gray5" style="display:none;">
        <p>彩期未开售</p>
        <p>开售时间：<span>9-22 20:00</span></p>
    </div>

    <!-- 购买 -->
    <div style="display:none;">
        <div class="betmoney border_b">
        <p class="textc">金额 <span class="font14 fontred">{{bettotalmoney}}</span> 元</p>
        </div>
        <div class="topcenter bottombetbtn">
        <div class="boxflex">
            <div class="beishu topcenter"><input type="text" readonly="readonly" disabled="disabled"> 倍</div>
        </div>
        <div class="boxflex topcenter">
            <!-- <a class="buybtn_gray">保存</a> -->
            <!-- <p class="boxflex" style=""><a href="javascript:void(0);" class="hemaibtn">合买</a></p> -->
            <p class="boxflex"><a class="buybtn_blue">投注</a></p>
            <!-- <p class="boxflex"><a @click="checkSubmit" class="buybtn_blue">确认选号</a></p> -->
        </div>

        </div>

    </div>

    </section>
    </div>
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
            issueIndex:0,
            
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