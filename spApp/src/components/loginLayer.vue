<template>
   <div class="login-layer"  v-if="isshow" >
        <div class="con">
            <h2>你尚未登录，是否现在登录</h2>
            <div>
                <span class="close" @click="close">取消</span>
                <span class="login"   @click="open" >登录</span></div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'loginLayer',
  components:{
  },
  data () {
    return {
       isshow:false
    }
  },
  created(){
  
  },
  computed:{
    
  },
  mounted:function(){

    
  },
  methods:{
    show(val){
     
      this.isshow=val;
    },
    close(){
      this.isshow=false;
    },

    open(){
     
      this.$router.push('/login');
    }
  }
}
</script>

<style lang="less" scoped="scoped" type="text/css">
.login-layer{
    background: rgba(0, 0,0,.5);
    position:fixed;
    left:0;
    right:0;
    top:0;
    bottom:0;
    z-index: 999;
   
    .con{
        width: 80%;
        border-radius: .1rem;
        background: #fff;
        margin:70% 10% 0;
        text-align: center;
        font-size:0;
        h2{
            line-height: .6rem;
            font-size:.18rem;
            font-weight: normal;
            margin: 0;
            border-bottom:.01rem solid #dbdbdb; 
        }
        span{
            line-height: .5rem;
            font-size:.18rem;
            width:50%;
            border-right:.01rem solid #dbdbdb;
            margin-left:-.01rem; 
            display: inline-block;
        }
        span:nth-child(2){
            margin-left:0; 
            border-right:0;
        }
        .close{
            color:#666;
        }
        .login{
            color:red;
        }
        
    }
}
</style>
