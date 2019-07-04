import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//vuex里面保存的数据
const state = {
   
}

//操作vuex里面的数据
const mutations = { 
    // setuser(state, arr) {
    //     state.user[arr[0]] = arr[1];
    // },
}

//外部发送一个指令
const actions = { 
  
}

//外部获取vuex里面的数据
const getters = { 
   
}

/* 用户信息 */
const user={
    state:{
       info:null,
       ip:null,
       Devicename:null
    },
    getters:{
        getuser:state =>state
    },
    mutations:{
        setuser(state,data){
            for(let i in data){
                state[i]=data[i]
            }
        },
        deluser(state){
            state.info=null
        }
    },
    actions:{

    }    
}

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
    modules:{
        user
    }
})