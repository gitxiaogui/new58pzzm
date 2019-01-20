<template>
<div id="affirmReturnMoney">
  <ShowCheckBank v-if="closeCheckBank"></ShowCheckBank>
  <div class="affirmReturnMoney">
    <ul class="orderDetail">
      <li><span>还款本金</span><span>1000 元</span></li>
      <li><span>利息</span><span>0 元</span></li>
      <li><span>逾期滞纳金</span><span>40元/天</span></li>
      <li><span>逾期天数</span><span>3 天</span></li>
      <li><span>总罚息</span><span>120 元</span></li>
      <li class="lastLi"><span>总还款金额</span><span>1120 元</span></li>
    </ul>
    <div class="hint"></div>
    <div class="checkBnak" @click="showCheckBank">
      <span>还款银行卡</span>
      <p><span>招商银⾏622****6875</span><i class="iconfont icon-youjiantou"></i></p>
    </div>
    <div class="btn">
      <mt-button type="primary" @click="submitData">确认还款</mt-button>
    </div>
  </div>
</div>
</template>

<script>
import ShowCheckBank from '../../components/showCheckBank'
import BUS from '../../vueBus/index'
export default {
  props: {},
  components: {
	  ShowCheckBank
  },
  data(){
	  return {
	    closeCheckBank:false
    }
  },
  methods: {
	  // 选择银行卡
	  showCheckBank(){
	    this.closeCheckBank = true
    },
    // 确认还款
    submitData(){

    }
  },
  created(){

  },
  activated(){
    BUS.$on('closeCheckBank',()=>{
      this.closeCheckBank = false
    })
    localStorage.setItem('headerTitle','还款')
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/mixin';
  #affirmReturnMoney{
    @include wh(100%,100%);
    position: relative;
    padding-top:1rem;
    .affirmReturnMoney{
      @include wh(100%,100%);
      position: absolute;
      .orderDetail{
        padding-left:.3rem;
        li{
          padding-right:.3rem;
          border-bottom:1px solid #ddd;
          height: 1rem;
          @include df;
          @include ac(center);
          @include jc(space-between);
          span:nth-of-type(1){
              color:#999;
          }
          &.lastLi{
            color:#333;
            padding:.46rem .3rem .66rem 0;
            border:none;
          }
        }
      }
      .checkBnak{
        @include df;
        padding:0 .3rem;
        height:1rem;
        border-bottom:1px solid #ddd;
        @include ac(center);
        @include jc(space-between);
        color:#999;
        p{
          font-size:.3rem;
          i{
            margin-left:.1rem;
          }
        }
      }
      .btn{
        padding:1rem .8rem 0;
        .mint-button{
          background: $orange;
          @include wh(100%,.8rem);
        }
      }
      .hint{
        @include wh(100%,.2rem);
        background: #F1F1F1;
      }
    }
  }
</style>
