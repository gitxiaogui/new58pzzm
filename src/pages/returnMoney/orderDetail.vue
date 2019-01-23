<template>
<div id="orderDetail">
  <div class="orderDetail">
    <ul class="orderDetail">
      <li><span>订单状态</span><span class="red">{{ returnMessage.statusStr }}</span></li>
      <li><span>订单号</span><span>0g534as65gasd53a4gha</span></li>
      <li><span>姓名</span><span>{{ returnMessage.userName }}</span></li>
      <li><span>收款银行卡</span><span>{{ returnMessage.bankName }}{{ returnMessage.bankCard }}</span></li>
      <li><span>借款金额</span><span>{{ returnMessage.lenderAmount | returnNumber }}</span></li>
      <li><span>借款期限</span><span>{{ returnMessage.termDay }} 天</span></li>
      <li><span>应还款日期</span><span>{{ returnMessage.returnDate }}</span></li>
      <li><span>逾期滞纳金</span><span>{{ returnMessage.cost | returnNumber }}/天</span></li>
      <li><span>逾期天数</span><span class="red">{{ returnMessage.overdueDay }}天</span></li>
      <li class="lastLi"><span>总还款金额</span><span>{{ returnMessage.returnMoney | returnNumber }} 元</span></li>
    </ul>
    <div class="hint"></div>
  </div>
</div>
</template>

<script>
export default {
  props: {},
  components: {},
  data(){
	  return {
	    returnMessage: {}
    }
  },
  methods: {
  },
  filters:{
    returnNumber(num){
      return num ? Number(num).toFixed(0) : ''
    }
  },
  created(){

  },
  activated(){
    this.returnMessage = JSON.parse(sessionStorage.getItem('returnMessage'))
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/style/mixin";
  #orderDetail{
    @include wh(100%,auto);
    padding-top:1rem;
    .orderDetail{
      @include wh(100%,auto);
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
          .red{
            color:#FF0000
          }
          &.lastLi{
            color:#333;
            padding:.46rem .3rem .66rem 0;
            border:none;
          }
        }
      }
    }
  }
</style>
