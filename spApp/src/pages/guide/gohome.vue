<template>
    <div v-title data-title="时间来运转引导页">
          <swiper class="guide-box" dots-class="guide-dots" dots-position="center"  :list="demo01_list" :show-desc-mask='false' ></swiper>
    </div>
</template>
<script>


import { Swiper } from 'vux'

const baseList = [{
  url: 'javascript:',
  img: '~@/assets/img/guide-1.jpg',
  
}, {
  url: 'javascript:',
  img: '~@/assets/img/guide-1.jpg',
  
}, {
  url: '/login',
  img: '~@/assets/img/guide-1.jpg',
  fallbackImg: 'https://static.vux.li/demo/3.jpg'
}]

export default {
    data(){
        return {
            demo01_list: baseList,
        }
    },
    mounted(){

    },
    methods: {
    
    },
    computed: {},
    watch: {},
    props: {},
    components: {
        Swiper
    },
}
</script>

<style lang="less">
.guide-box{
    position:fixed !important;
    top:0;
    bottom: 0;
    left: 0;
    right:0;
    .vux-swiper{
        height:100% !important;
    }
    .guide-dots{
        .active{
            background-color: #ef1823 !important;
        }   
    }
}
</style>

