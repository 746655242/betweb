<template>
    <div v-title data-title="投注记录" class="wrapBox">

        <header class="title">      
			<span onclick="history.go(-1)" class="iconfont icon-fanhui">&#xe614;</span>
			<span>投注记录</span>
        </header>

        <tab bar-active-color="#ef1823" v-model="index"  :line-width="3" custom-bar-width="20px" >
            <tab-item selected @on-item-click="onItemClick">全部投注 </tab-item>
            <tab-item @on-item-click="onItemClick">最近中奖</tab-item>
        </tab>


        <div class="ls" ref='ls'>

            <div v-if="index==0" class="ul  tab-swiper vux-center"  >
                <a v-for="(item,index) in listdata"  @click="betinfoSw(item)" :key="index" class="item">  
                    <img class="pic" :src="base.lotteryData[item.game_type].IconPic" >
                    <p class="t1">
                        <span v-if='[1,5].indexOf(item.game_type)>=0'>{{base.lotteryData[item.game_type].IconName}} {{item.bet_con.split(',').length}}串1@{{item.odds}} </span>
                        <span v-else  >{{base.lotteryData[item.game_type].IconName}} 第{{item.issue}}期 </span>

                        <span class="fr">{{base.statuss[item.status]}}</span>
                    </p>
                    <p class="c1"><span>{{item.date}}</span><span class="fr">{{item.bet_amount}}元</span></p> 
                </a>
                <div class="btnmoer" @click="tabindex">查看更多</div>
            </div>

            
        
            <div v-if="index==1" class="ul  tab-swiper vux-center" >
                <a v-for="(item,index) in ylistdata"  @click="betinfoSw(item)" :key="index" class="item">  
                    <img class="pic" :src="base.lotteryData[item.game_type].IconPic" >
                    <p class="t1">
                        
                         <span v-if='[1,5].indexOf(item.game_type)>=0'>{{base.lotteryData[item.game_type].IconName}} {{item.bet_con.split(',').length}}串1@{{item.odds}} </span>
                         <span v-else  >{{base.lotteryData[item.game_type].IconName}} 第{{item.issue}}期 </span>


                        
                        <span class="fr">{{base.statuss[item.status]}}</span>
                    </p>
                    <p class="c1"><span>{{item.date}}</span><span class="fr">{{item.bet_amount}}元</span></p>     
                </a>
                <div class="btnmoer" @click="ytabindex">查看更多</div>
            </div>
                
        


        </div>


        <div class="betinfo" :class="{'betshow':betinfoData.betList}"  >
            <div class="head">
                    <span @click="colsebetinfoSw" class="iconfont icon-fanhui">&#xe614;</span>
                    <span>投注记录</span>
            </div>
            <div class="main">

                <div class="betcom">

                    <div class="bettxt">
                        投注编号：{{betinfoData.bet_id}}<br>
                        投注时间：{{betinfoData.date}}
                    </div>



                    <div v-if='betinfoData.game_type==3||betinfoData.game_type==4'>
                        <table>
                            <tr>
                                
                                <th>项目</th>
                                <th>投注项</th>
                            </tr>
                            <tr>
                              
                                <td>{{base.lotteryData[betinfoData.game_type].IconName}}</td>
                                <td width="70%" class="sfccom">
                                    <div>
                                        <span v-for="(item,key) in  betinfoData.bet_con.split(',') " 
                                        :key="key" >{{item.split('|')[0]}}<br><i>{{item.split('|')[1]}}</i></span>
                                      
                                    </div>
                                </td>
                                
                            </tr>
                            </table>

                             <table>
                            <tr>    
                                <th>期号</th>
                                <th>投注额</th>
                                <th>奖金</th>
                                <th>结果</th>
                            </tr>
                            <tr>
                                <td>{{betinfoData.issue}}</td>
                                <td>{{betinfoData.bet_amount}}</td>
                                <td>{{betinfoData.status==1?betinfoData.bonus:0}}元</td>
                                <td>{{base.statuss[betinfoData.status]}}</td>
                            </tr>
                        </table>
                        <div class="bettxt" v-if="betinfoData.betList[0]" >
                            <p>足彩胜负/任九 {{ betinfoData.betList[0]['issue']}}期</p>
                            
                            <span v-for="(ite,index) in betinfoData.betList[0]['gameres'].split(',')" :key="index"> {{ite}} </span>
                            
    
                        </div>

                        <table v-if="betinfoData.betList[0]" >
                            <tr>
                                <th>玩法</th>
                                <th>奖项</th>
                                <th>注数</th>
                                <th>单注金额(元)</th>
                            </tr>
                            <tr>
                                <td rowspan="2" >胜负</td>
                                <td>一等奖</td>
                                <td>{{ betinfoData.betList[0]['num14']}}</td>
                                <td>{{ betinfoData.betList[0]['bonus14']}}</td> 
                            </tr>
                            <tr>
                                <td>二等奖</td>
                                <td>{{ betinfoData.betList[0]['num13']}}</td>
                                <td>{{ betinfoData.betList[0]['bonus13']}}</td> 
                            </tr>
                            <tr>
                                <td>任9</td>
                                <td>一等奖</td>
                                <td>{{ betinfoData.betList[0]['num9']}}</td>
                                <td>{{ betinfoData.betList[0]['bonus9']}}</td> 
                            </tr>
                        </table>


                    </div>

                    <div v-else>
                        <table>
                            <tr>
                                <th>序号项</th>
                                <th>投注项</th>
                                <th>赛事</th>
                                <th>赔率</th>
                                <th>结果</th>
                            </tr>
                            <tr v-for="(item,index) in betinfoData.betList" :key="index">
                                <td>{{index}}</td>
                                <td>{{item.bet_com}}</td>
                                <td>{{item.game_name}}</td>
                                <td>{{item.odds}}</td>
                                <td>{{base.statuss[item.status]}}</td>
                            </tr>
                        </table>

                        <table>
                            <tr>
                                <th width="25%">投注类型</th>
                                <th width="25%">投注金额</th>
                                <th width="25%">返还</th>
                                <th width="25%">结果</th>
                            </tr>
                            <tr>
                                <td>{{betinfoData.betList&&betinfoData.betList.length}}串1</td>
                                <td>{{betinfoData.bet_amount}}元</td>
                                <td>{{betinfoData.status==1?betinfoData.bonus:0}}元</td>
                                <td>{{base.statuss[betinfoData.status]}}</td>
                            </tr>
                        </table>
                    </div>
                </div>

            </div>
        </div>

    </div>

</template>

<script>
    import { Tab, TabItem,Swiper, SwiperItem  } from 'vux'
    import {mapGetters} from 'vuex'
    import qs from 'qs'

    export default {
        data(){
            return {
                listdata:[],
                index:0,
                page:0,
                totalpage:1,

                ylistdata:[],
                ypage:0,
                ytotalpage:1,
            
                betinfoData:{},
                betinfoShow:false,
                SwiperHeight:''
            }
        },
        created(){
            this.fetchData();
            this.ygetdata();

           
        },
		computed:{
			...mapGetters({
				user:'getuser'
			})
		},
		components:{
			Tab,
            TabItem,
            Swiper, 
            SwiperItem
        },
        mounted:function(){
            this.SwiperHeight=this.$refs.ls.clientHeight+'px';
            
        },
        methods: {
            
        	fetchData(){
				let me= this;
                let user=this.user.info
                let data={
                    page:this.page
                };
                if(user&&user.token){
                    this.axios.post('/api/ball/GetBall/betlist',qs.stringify(data)).then(res => {  
                        let data=res.data;
                        if(data.code==0){
                            this.listdata=this.listdata.concat(data.list);
                            this.totalpage=Math.floor(data.total/20);
                        }
                    }).catch(function(err){
                        console.log(err)
                        
                    })
        		}else{
					this.$router.push('/login')
				}
            },
            onItemClick(index){
                this.index=index;
               
            },
            tabindex(){
                if(this.page+1<=this.totalpage){
                    this.page++;
                    this.fetchData();
                }else{
                    alert('已经到最后一页');
                }
            },

            ygetdata(){
				let me= this;
                let user=this.user.info
                let data={
                    page:this.page,
                    status:1
                };
                if(user&&user.token){
                    this.axios.post('/api/ball/GetBall/betlist',qs.stringify(data)).then(res => {  
                        let data=res.data;
                        if(data.code==0){
                            this.ylistdata=this.listdata.concat(data.list);
                            this.ytotalpage=Math.floor(data.total/20);
                        }
                    }).catch(function(err){
                        console.log(err)
                        
                    })
        		}else{
					this.$router.push('/login')
				}
            },

            ytabindex(){
                if(this.ypage+1<=this.ytotalpage){
                    this.ypage++;
                    this.ygetdata();
                }else{
                    alert('已经到最后一页');
                }
            },
            

            //显示详情
            betinfoSw(item){
               
                
                if([3,4].indexOf(item['game_type']) >= 0){
                    var  ids=item.issue;
                }else if([1,5].indexOf(item['game_type']) >= 0 ){
                    let betCom=item.bet_con.split(',');
                    var  ids=[];
                    for(let i in betCom){
                        ids.push(betCom[i].split('|')[1]);
                    }
                    ids=ids.join(',');

                }else{
                      alert('暂时查看详情');
                      return;
                }

               // console.log(ids);

                let data={
                    ids:ids,
                    type:item['game_type']
                }
                
                 this.axios.post('/api/ball/GetBall/betinfo',qs.stringify(data)).then(res => {  
                        let data=res.data;
                        if(data.code==0){
                            item['betList']=data.list;
                            this.betinfoData= item;
                           // console.log(this.betinfoData);
                        }
                }).catch(function(err){
                    console.log(err)
                })
            },


            colsebetinfoSw(){
                this.betinfoData={};
            }
            

        }
       
    }
</script>

<style lang="less" scoped="scoped">

    .wrapBox{
        padding-top:.44rem;
    }
    header{
        background: #fff !important;
        color:#333;
    }

    .ls{
        overflow: auto;
        position: absolute;
        left: 0;
        right: 0;
        bottom:0;
        top:1rem;
       
        .item{
            background: #fff;
            display: block;
        
            padding:.15rem .2rem .15rem .6rem;
            position: relative;
            border-bottom:1px solid #efeff4;
            .pic{
                position:absolute;
                left:.1rem;
                top:.15rem;
                width: .36rem;
            }
            .t1{
                font-size:.14rem;
                color:#333;
            }
            .c1{
                margin-top:.05rem;
                font-size:.1rem;
                color:#999;
            }
            .fr{
                float: right;
            }
        }
        .btnmoer{
            background: #fff;
            text-align: center;
            padding:.15rem 0;
            color:#999;
        }
    }

    .betinfo{
        position: fixed;
        top:0;
        bottom:0;
        left:100%;
        width: 100%;
        right:0;
        background: #f3f3f3;
        z-index: 999;
        transition: all .5s;  
        .head{
            background: #ef1823 !important;
            height: .5rem;
            color:#fff;
            font-size:.2rem;
            line-height: .5rem;
            text-align: center;
            .icon-fanhui{
                font-size:.3rem;
                position: absolute;
                left:0;
                padding: 0 .05rem;
            }
        }
        .main{
            top:.5rem;
            bottom: 0;
            overflow: auto;
            .betcom{
                margin: .1rem;
                background: #fff;
                padding:.1rem;
                color:#333;
                font-size:.14rem;
                border-radius: .05rem;
                box-shadow: 0 3px 5px rgba(0,0,0,.05);
                .bettxt{
                    line-height: 1.6;
                    span{
                        display: inline-block;
                        background: #093;
                        color:#fff;
                        font-size:.16rem;
                        padding:0 .02rem;
                        margin:0 .01rem;
                    }
                    p{
                        margin-bottom:.05rem;
                    }
                }
                
                table{
                    width:100% ;
                    margin:.1rem 0;
                    td,th{
                         border:1px solid #e0e0e0;
                         background: #fff;
                         text-align: center;
                         line-height: .4rem;
                    }
                    .sfccom{
                        div{
                            font-size:0;
                            padding-top:.1rem;
                            span{
                                line-height: .2rem;
                                font-size:.1rem;
                               
                                margin:0 1px;
                                display:inline-block;
                                i{
                                    background: #093;
                                    color:#fff;
                                    padding:0 .02rem;
                                    font-size:16px;
                                }
                            }
                        }
                    }
                    th{
                        background: #f3f3f3;
                    }
                   
                }

            }
        }
    }
    .betshow{
        left:0;
    }

</style>