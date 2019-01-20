<template>
  <div class="yuqiHome">
      <div class="content">
        <div class="title">溫馨公共</div>
        <p>您好，您的订单<span v-if="days>0">已逾期{{ days }}天</span><span v-else>今日即将到期</span>，为避免逾期对您的征信信用产生影响，请于24点前按时还款。
如有疑问请微信搜索“cashant11”并添加“58掌柜客服”留言咨询。</p>
        <div class="btn" @click="closeYuqiHome">知道了</div>
      </div>
  </div>
</template>

<script>
import BUS from '../vueBus/index'
export default {
  props: ['days'],
  components: {},
  data(){
	  return {}
  },
  methods: {
    closeYuqiHome(){
      BUS.$emit('closeYuqiHome')
      sessionStorage.setItem('closeYuqiHome','closeYuqiHome')
    }
  },
  created(){

  },
  activated(){

  }
}
</script>

<style lang="scss" scoped>
  @import "../assets/style/mixin";
  .yuqiHome{
    @include wh(100%,100%);
    position: relative;
    left:0;
    top:0;
    z-index: 9;
    background: rgba(0,0,0,.5);
    .content{
      @include wh(5.6rem,5.5rem);

      @include borderRadius(.3rem);

      background: #fff;
      position: absolute;
      left:50%;
      top:50%;
      @include tf(translateX(-50%));
      margin-top:-2.8rem;
      .title{
        -webkit-border-radius: .3rem .3rem 0 0;
      -moz-border-radius: .3rem .3rem 0 0;
      border-radius: .3rem .3rem 0 0;
        line-height: 1.2rem;
        text-align: center;
        background:#F89625;
        color:#fff;
        font-size:.36rem;
        font-weight: bold;
        height:1.2rem;
      }
      p{
        font-size:.3rem;
        padding:.47rem .35rem;
        line-height: .46rem;
        span{
          color:red;
        }
      }
      .btn{
        border-top:1px solid #ccc;
        line-height: 1rem;
        text-align: center;
        font-size:.32rem;
        color:$orange;
      }
    }
  }
</style>
