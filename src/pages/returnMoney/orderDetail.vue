<template>
<div id="orderDetail">
  <div class="orderDetail">
    <ul class="orderDetail">
      <li><span>订单状态</span><span class="red">已逾期</span></li>
      <li><span>订单号</span><span>CO156302147952452</span></li>
      <li><span>姓名</span><span>马冬梅</span></li>
      <li><span>收款银行卡</span><span>招商银行622****6875</span></li>
      <li><span>借款金额</span><span>1000 元</span></li>
      <li><span>借款期限</span><span>7 天</span></li>
      <li><span>应还款日期</span><span>2018-07-10</span></li>
      <li><span>逾期滞纳金</span><span>40 元/天</span></li>
      <li><span>逾期天数</span><span class="red">7 天</span></li>
      <li class="lastLi"><span>总还款金额</span><span>1120 元</span></li>
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
	  return {}
  },
  methods: {},
  created(){

  },
  activated(){

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
