<template>
<div>
<link href="./static/css/jingcai.css" rel="stylesheet">
	<div>
        <header class="head prel">
            <div class="back"><router-link :to="homeUrl"><p class="backlink"></p></router-link></div>
            <div class="headertit">
            <h1>竞彩篮球</h1>
            </div>
            <div class="headBtnbox topcenter">
                <!-- <a><em class="headicon icon_screen"></em></a> -->
                <!-- <a><em class="headicon icon_list"></em></a> -->
            </div>
        </header>

        <div class="app">
            <div class="scrollbox">
                <section id="scrollBody" class="bgf2" style="margin: 0px;">
                <div style="padding-bottom:95px;">
                    <div class="paijingtop topcenter" style="display:none">
                        <div class="boxflex">
                            <a class="topcenter" onclick="history.go(-1)"><em class="iconbg2 iconbg2_horn"></em><p class="boxflex gray3"></p></a>
                        </div>
                        <a class="flexcenter delbox"><em class="iconbg icondelmin"></em></a>
                    </div>

                    <div>
                        <div v-for="(item,index) in oddsData" :key="index">
                            <div class="topcenter matchtit" @click="dshow(index,item)">
                                <p class="boxflex gray8b">
                                    <span class="mr10">{{item.title}}</span>
                                    <!-- <span>共x场比赛</span> -->
                                    <!-- <span class="font12">（红色选项可投单关）</span> -->
                                </p>
                                <em class="icon_arrowgraydown icon_arrowgrayup"></em>
                            </div>
                            <!-- matchtit over -->
                            <div class="matchlist" v-show='!item.show'>
                                <div class="border_b flexbox matchitem" v-for="(ite,ind) in item.list" :key="ind">
                                    <div class="matchitem_tit">
                                        <!-- <div class="matchitem_tit"> -->
                                        <p class="gray8b mb6 font10">{{ite.id}}</p>
                                        <p style="background-color:#00CCFF;color:#fff"><span class="font10">{{ite.liansai}}</span></p>
                                        <p class="font10">{{ite.timetxt}}</p>
                                        <!-- <div class="fontblue font10">分析</div> -->
                                    </div>
                                    <div class="boxflex matchitem_cont">
                                        <div class="flexbox team">
                                            <p class="textr boxflex">
                                                <cite class="font12 gray8b mr10">客</cite>
                                                <cite class="font10">{{ite.ke.pm}}</cite>
                                                <span>{{ite.ke.name}}</span>
                                            </p>
                                            <div class="lqbifen"><cite>VS</cite></div>
                                            <p class="textl boxflex">
                                                <span>{{ite.zhu.name}}</span>
                                                <cite class="font10">{{ite.zhu.pm}}</cite>
                                                <cite class="font12 gray8b ml10">主</cite>
                                            </p>
                                        </div>
                                        <div class="topcenter matchitem_contlist">
                                            <div class="boxflex">
                                                <div class="topcenter dan" v-if="ite.oddsRqAllowBet == '1'">
                                                    <p class="boxflex betbtn" v-bind:class="{'betbtn_sed':betlist[ind]&&betlist[ind]['93']}" @click="addbet(ite,93)"><span>客胜</span><span>{{ite.OddsList['93']}}</span></p>
                                                    <div class="betbtn lqbifen">
                                                        <cite class="fontgreen" v-if="ite.oddsRqRf > 0">主+{{ite.oddsRqRf}}</cite>
                                                        <cite class="fontredz" v-else>主{{ite.oddsRqRf}}</cite>
                                                    </div>
                                                    <p class="boxflex betbtn" v-bind:class="{'betbtn_sed':betlist[ind]&&betlist[ind]['92']}" @click="addbet(ite,92)"><span>主胜</span><span>{{ite.OddsList['92']}}</span></p>
                                                </div>
                                                <div class="topcenter dan" v-else>
                                                    <p class="boxflex betbtn betbtn_gray"><span>客胜</span><span>- -</span></p>
                                                    <div class="betbtn lqbifen"><cite class="fontgreen" style="display: none;">0</cite></div>
                                                    <p class="boxflex betbtn betbtn_gray"><span>主胜</span><span>- -</span></p>
                                                </div>
                                                <div class="topcenter" v-if="ite.oddsDxfAllowBet == '1'">
                                                    <p class="boxflex betbtn" v-bind:class="{'betbtn_sed':betlist[ind]&&betlist[ind]['94']}" @click="addbet(ite,94)"><span>大分</span><span>{{ite.OddsList['94']}}</span></p>
                                                    <div class="betbtn lqbifen"><cite class="fontredz">{{ite.oddsDxfRf}}</cite></div>
                                                    <p class="boxflex betbtn" v-bind:class="{'betbtn_sed':betlist[ind]&&betlist[ind]['95']}" @click="addbet(ite,95)"><span>小分</span><span>{{ite.OddsList['95']}}</span></p>
                                                </div>
                                                <div class="topcenter" v-else>
                                                    <p class="boxflex betbtn betbtn_gray"><span>大分</span><span>- -</span></p>
                                                    <div class="betbtn lqbifen"><cite class="fontredz" style="display: none;">0</cite></div>
                                                    <p class="boxflex betbtn betbtn_gray"><span>小分</span><span>- -</span></p>
                                                </div>
                                            </div>
                                            <div class="topcenter morebtn">
                                                <p @click="showAll(item,ite,ind)">更多选项</p>
                                                <!-- <div class="morebtn" :class="{'morebtn_sed': item.info.selectNum}" v-text="item.info.selectNum" @click="item.loadMore()"><p></p> -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!--matchitem over  -->
                            </div>
                            <!-- matchlist over -->
                        </div>
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

        <!-- 更多彩种 -->
        <div class="layerbox" v-if="allodds">
            <div class="morediv">
            <header class="head">
              <a class="closeball2"></a>
              <div class="headertit"><h1>
                <span class="font10">{{allodds['ke']['pm']}}</span>
                <span class="font10" style="display: none;"></span>
                <span>{{allodds['ke']['name']}}</span>&nbsp;VS&nbsp;<span>{{allodds['zhu']['name']}}</span>
                <span class="font10" style="display: none;"></span>
                <span class="font10">{{allodds['zhu']['pm']}}</span>
              </h1></div>
              <div class="headBtnbox w40 topcenter"><a><em class="headicon icon_chart"></em></a></div>
            </header>

            <div class="moremain">
              <div class="moremain_tit border_b">让球胜负/大小球</div>
              <div class="morebet_rqsf border_b">
                <div class="topcenter dan" v-if="allodds['oddsRqAllowBet'] == '1'">
                  <p class="boxflex betbtn" v-bind:class="{'betbtn_sed':betlist[allid]&&betlist[allid]['93']}" @click="addbet(allodds,93)">
                    <span>客胜</span>
                    <span>{{allodds['OddsList']['93']}}</span>
                  </p>
                  <div class="betbtn lqbifen">
                    <cite class="fontgreen" v-if="allodds['oddsRqRf'] > 0">主+{{allodds['oddsRqRf']}}</cite>
                    <cite class="fontred" v-else>主{{allodds['oddsRqRf']}}</cite>
                  </div>
                  <p class="boxflex betbtn" v-bind:class="{'betbtn_sed':betlist[allid]&&betlist[allid]['92']}" @click="addbet(allodds,92)">
                    <span>主胜</span>
                    <span>{{allodds['OddsList']['92']}}</span>
                  </p>
                </div>
                <div class="topcenter dan" v-else>
                  <p class="boxflex betbtn betbtn_gray"><span>客胜</span><span>未受注</span></p>
                  <div class="betbtn lqbifen"><cite class="fontred" style="display: none;">0</cite></div>
                  <p class="boxflex betbtn betbtn_gray"><span>主胜</span><span>未受注</span></p>
                </div>

                <div class="topcenter" v-if="allodds['oddsDxfAllowBet'] == '1'">
                  <p class="boxflex betbtn" v-bind:class="{'betbtn_sed':betlist[allid]&&betlist[allid]['94']}" @click="addbet(allodds,94)">
                    <span>大分</span>
                    <span>{{allodds['OddsList']['94']}}</span>
                  </p>
                  <div class="betbtn lqbifen">
                    <cite class="fontred" style="">{{allodds['oddsDxfRf']}}</cite>
                  </div>
                  <p class="boxflex betbtn" v-bind:class="{'betbtn_sed':betlist[allid]&&betlist[allid]['95']}" @click="addbet(allodds,95)">
                    <span>小分</span>
                    <span>{{allodds['OddsList']['95']}}</span>
                  </p>
                </div>
                <div class="topcenter" v-else>
                  <p class="boxflex betbtn betbtn_gray"><span>大分</span><span>未受注</span></p>
                  <div class="betbtn lqbifen"><cite class="fontred" style="display: none;">0</cite></div>
                  <p class="boxflex betbtn betbtn_gray"><span>小分</span><span>未受注</span></p>
                </div>
                <!--<div class="topcenter">
                  <p class="boxflex betbtn betbtn_sed"><span>大分</span><span>4.55</span></p>
                  <div class="lqbifen"><span class="fontred">200.5</span></div>
                  <p class="boxflex betbtn"><span>小分</span><span>1.53</span></p>
                </div>-->
              </div>
              <!-- rqsf over -->
              <div class="moremain_tit border_b">胜负</div>
              <div class="morebet_sf border_b">
                <div class="topcenter dan" v-if="allodds['oddsSfAllowBet'] == '1'">
                  <p class="boxflex betbtn" v-bind:class="{'betbtn_sed':betlist[allid]&&betlist[allid]['91']}" @click="addbet(allodds,91)">
                    <span>客胜</span>
                    <span>{{allodds['OddsList']['91']}}</span>
                  </p>
                  <p class="boxflex betbtn" v-bind:class="{'betbtn_sed':betlist[allid]&&betlist[allid]['90']}" @click="addbet(allodds,90)">
                    <span>主胜</span>
                    <span>{{allodds['OddsList']['90']}}</span>
                  </p>
                </div>
                <div class="topcenter dan" v-else>
                  <p class="boxflex betbtn betbtn_gray"><span>客胜</span><span>未受注</span></p>
                  <p class="boxflex betbtn betbtn_gray"><span>主胜</span><span>未受注</span></p>
                </div>
              </div>
              <!-- spf over -->

              <div class="moremain_tit border_b">胜分差
                <!-- <span class="fontblue" v-show="currItem.item.game.SportteryWS.danguan">（可投单关）</span> --></div>
              <div class="border_b m_bif">
                <div class="topcenter m_bif_f">
                  <div class="bif_tit topcenter"><p class="boxflex">客胜</p></div>
                  <div class="boxflex flexbox" v-if="allodds['oddsSfcAllowBet'] == '1'">
                    <p class="boxflex betbtn betbtn_dan" v-bind:class="{'betbtn_sed':betlist[allid]&&betlist[allid]['102']}" @click="addbet(allodds,102)">
                      <span>1-5</span>
                      <span>{{allodds['OddsList']['102']}}</span>
                    </p>
                    <p class="boxflex betbtn betbtn_dan" v-bind:class="{'betbtn_sed':betlist[allid]&&betlist[allid]['103']}" @click="addbet(allodds,103)">
                      <span>6-10</span>
                      <span>{{allodds['OddsList']['103']}}</span>
                    </p>
                    <p class="boxflex betbtn betbtn_dan" v-bind:class="{'betbtn_sed':betlist[allid]&&betlist[allid]['104']}" @click="addbet(allodds,104)">
                      <span>11-15</span>
                      <span>{{allodds['OddsList']['104']}}</span>
                    </p>
                    <p class="boxflex betbtn betbtn_dan" v-bind:class="{'betbtn_sed':betlist[allid]&&betlist[allid]['105']}" @click="addbet(allodds,105)">
                      <span>16-20</span>
                      <span>{{allodds['OddsList']['105']}}</span>
                    </p>
                    <p class="boxflex betbtn betbtn_dan" v-bind:class="{'betbtn_sed':betlist[allid]&&betlist[allid]['106']}" @click="addbet(allodds,106)">
                      <span>21-25</span>
                      <span>{{allodds['OddsList']['106']}}</span>
                    </p>
                    <p class="boxflex betbtn betbtn_dan" v-bind:class="{'betbtn_sed':betlist[allid]&&betlist[allid]['107']}" @click="addbet(allodds,107)">
                      <span>26+</span>
                      <span>{{allodds['OddsList']['107']}}</span>
                    </p>
                  </div>
                  <div class="boxflex flexbox" v-else>
                    <p class="boxflex betbtn betbtn_gray">
                      <span>1-5</span>
                      <span>未受注</span>
                    </p><p class="boxflex betbtn betbtn_gray">
                      <span>6-10</span>
                      <span>未受注</span>
                    </p><p class="boxflex betbtn betbtn_gray">
                      <span>11-15</span>
                      <span>未受注</span>
                    </p><p class="boxflex betbtn betbtn_gray">
                      <span>16-20</span>
                      <span>未受注</span>
                    </p><p class="boxflex betbtn betbtn_gray">
                      <span>21-25</span>
                      <span>未受注</span>
                    </p><p class="boxflex betbtn betbtn_gray">
                      <span>26+</span>
                      <span>未受注</span>
                    </p>
                  </div>
                </div>


                <div class="topcenter m_bif_s">
                  <div class="bif_tit topcenter"><p class="boxflex">主胜</p></div>
                  <div class="boxflex flexbox" v-if="allodds['oddsSfcAllowBet'] == '1'">
                    <p class="boxflex betbtn betbtn_dan" v-bind:class="{'betbtn_sed':betlist[allid]&&betlist[allid]['96']}" @click="addbet(allodds,96)">
                      <span>1-5</span>
                      <span>{{allodds['OddsList']['96']}}</span>
                    </p>
                    <p class="boxflex betbtn betbtn_dan" v-bind:class="{'betbtn_sed':betlist[allid]&&betlist[allid]['97']}" @click="addbet(allodds,97)">
                      <span>6-10</span>
                      <span>{{allodds['OddsList']['97']}}</span>
                    </p>
                    <p class="boxflex betbtn betbtn_dan" v-bind:class="{'betbtn_sed':betlist[allid]&&betlist[allid]['98']}" @click="addbet(allodds,98)">
                      <span>11-15</span>
                      <span>{{allodds['OddsList']['98']}}</span>
                    </p>
                    <p class="boxflex betbtn betbtn_dan" v-bind:class="{'betbtn_sed':betlist[allid]&&betlist[allid]['99']}" @click="addbet(allodds,99)">
                      <span>16-20</span>
                      <span>{{allodds['OddsList']['99']}}</span>
                    </p>
                    <p class="boxflex betbtn betbtn_dan" v-bind:class="{'betbtn_sed':betlist[allid]&&betlist[allid]['100']}" @click="addbet(allodds,100)">
                      <span>21-25</span>
                      <span>{{allodds['OddsList']['100']}}</span>
                    </p>
                    <p class="boxflex betbtn betbtn_dan" v-bind:class="{'betbtn_sed':betlist[allid]&&betlist[allid]['101']}" @click="addbet(allodds,101)">
                      <span>26+</span>
                      <span>{{allodds['OddsList']['101']}}</span>
                    </p>
                  </div>
                  <div class="boxflex flexbox" v-else>
                    <p class="boxflex betbtn betbtn_gray">
                      <span>1-5</span>
                      <span>未受注</span>
                    </p><p class="boxflex betbtn betbtn_gray">
                      <span>6-10</span>
                      <span>未受注</span>
                    </p><p class="boxflex betbtn betbtn_gray">
                      <span>11-15</span>
                      <span>未受注</span>
                    </p><p class="boxflex betbtn betbtn_gray">
                      <span>16-20</span>
                      <span>未受注</span>
                    </p><p class="boxflex betbtn betbtn_gray">
                      <span>21-25</span>
                      <span>未受注</span>
                    </p><p class="boxflex betbtn betbtn_gray">
                      <span>26+</span>
                      <span>未受注</span>
                    </p>
                  </div>
                </div>

              </div>
              <!-- sfc over -->
          </div>
            <!-- moremain over -->

            <div class="topcenter morediv_bottom">
                <p class="boxflex mr15"><a class="btn btn_gray" @click="closeAll(true)">取消</a></p>
                <p class="boxflex"><a class="btn btn_blue" @click="closeAll(false)">确定</a></p>
            </div>
            </div>
        </div>
        
        <div class='bg' v-show="isbetNum"></div>
        
        <section class="bottombet">
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
                </div>
                <div class="topcenter bottombetbtn">
                    <p class="guoguanbtn" @click="tabnub">
                        <span>{{betfield}}串{{cuang}}</span>
                        <cite class="icon_reddot">{{betlistArr.length}}</cite>
                    </p>
                    <p class="beishu"><input type="text" v-model="cancel"></p>
                    <span class="mr05rem">倍</span>
                    <p class="boxflex"><a class="buybtn_blue" @click="order">订单</a></p>
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
                        <li class="betbtn" v-for="(item,key) in  betlistArr.length" :key="key"
                        v-if="item>1" @click="changebetfield(item,1)"
                        v-bind:class="{'betbtn_sed':betfield==item&&cuang==1}">{{item}}串1</li>
                    </ul>
                    <p class="mb6 gray8b font12" v-if="field>=3">更多过关</p>
                    <ul class="clearfix">
                        <li class="betbtn" v-for="(item,index) in gglist" :key="index" 
                        v-if="item[0] <= field" @click="changebetfield(item[0],item[1])" 
                        v-bind:class="{'betbtn_sed':cuang==item[1]&&betfield==item[0]}">{{item[0]}}串{{item[1]}}</li>
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
            betfield:2,//订单场

            betmoney:2, //订单金额
            bettotalmoney:2, //订单总金额 
            totalBonus:0,//总奖金
            
            allbetlist:null,
            allid:null,
            allodds:null,

            orderData: "", // 下单数据

            //比赛数据
            oddsData:[],
            oddsDataobj:{},
            
            betlistArr:[],//选择订单

            oldbetlist:{},//旧数据
            betlist:{}, //选中json订单
            
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
                    },
                    '5': {
                        cn: ['主胜', '客胜', '主胜', '客胜', '大分', '小分', '1-5', '6-10', '11-15', '16-20', '21-25', '26+', '1-5', '6-10', '11-15', '16-20', '21-25', '26+'],
                        wager: ['3', '0', '3', '0', '3', '0', '1-5', '6-10', '11-15', '16-20', '21-25', '26+', '1-5', '6-10', '11-15', '16-20', '21-25', '26+'],
                        mix: ['90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100', '101', '102', '103', '104', '105', '106', '107'],
                        ltype: 'SportteryBasketMix'
                    }
            },
            homeUrl: "/home",
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
            this.axios.post('/api/ball/GetBall/odds?code=oddsJclq').then(res => {  
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
            window.console.log('---------');
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
            this.betfield = 2; //订单场
            this.betmoney = 2; // 订单金额
            this.bettotalmoney = 2; // 订单总金额 
            this.totalBonus = 0; //总奖金

            this.allbetlist = null;
            this.allid = null;
            this.allodds = null;
            this.orderData =  ""; //  下单数据

            this.betlistArr = []; //选择订单
            this.oldbetlist = {}; //旧数据
            this.betlist = {}; //选中json订单
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
                //生成订单明线
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
            reqData['gameid'] = 2;
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
            reqData['gameid'] = 2;
            reqData['pass_type'] = this.betfield + "_" + this.cuang;
            reqData['order_data'] = this.orderData;
            reqData['multiple'] = this.cancel;
            window.console.log("========reqData========");
            window.console.log(reqData);
            this.axios.post('/api/ball/GetBall/betJclq', qs.stringify(reqData)).then(res => {  
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
    z-index: 69;
}
.beton{
    background: #ef1823!important;
    color:#fff !important;
    span{color:#fff !important;}
}
</style>