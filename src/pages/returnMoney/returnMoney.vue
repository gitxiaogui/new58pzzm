<template>
<div id="returnMoney">
  <div class="returnMoney">
    <div class="topTitle">
      <span class="title">应还总金额（元）</span>
      <p>2000.00</p>
      <span class="btn">还款</span>
    </div>
    <div class="hint"></div>
    <div class="order">
      <div class="orderTitle">待还订单</div>
      <ul class="orderList">
        <li v-for="(item,index) in 3" :key="index" @click="goOrder(item)">
          <div class="top liInner">
            <span>11月07日待还</span>
            <span>还剩6天还款</span>
          </div>
          <div class="center liInner">
            <span>2000.00</span>
            <i class="iconfont icon-youjiantou"></i>
          </div>
          <div class="bottom liInner">
            <p>还款日当天从招商银行（尾号0298）自动扣款</p>
          </div>
          <div class="hint"></div>
        </li>
      </ul>
    </div>
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
  methods: {
    goOrder(){
      this.$router.push('/orderDetail')
    }
  },
  created(){

  },
  activated(){
    localStorage.setItem('headerTitle','还款')
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/mixin';
#returnMoney{
  padding:1rem 0;
  @include wh(100%,auto);
  .returnMoney{
    @include wh(100%,auto);
    .topTitle{
      @include df;
      @include fd(column);
      @include ac(center);
      padding:.8rem 0 .5rem 0;
      .title{
        font-size:.28rem;
      }
      p{
        font-size:.6rem;
        padding:.2rem 0 .4rem 0;
        font-weight: bold;
      }
      .btn{
        color:$orange;
        font-size:.32rem;
        border:1px solid $orange;
        padding:.1rem .5rem;
        @include borderRadius(.1rem);
      }
    }
    .order{
      .orderTitle{
        @include wh(100%,1.1rem);
        text-align: center;
        line-height: 1.1rem;
        border-bottom:1px solid #999;
      }
      .orderList{
        li{
          padding-top:.3rem;
          font-size:.32rem;
          .liInner{
            padding: 0 .3rem;
            @include df;
            @include jc(space-between);
            &.center{
              padding: .45rem .3rem;
              font-size:.36rem;
              font-weight:bold;
            }
            &.top{
              span:nth-of-type(2){
                color:#FF252D;
              }
            }
            &.bottom{
              font-size:.3rem;
              color:#999;
              padding-bottom:.3rem;
            }
          }
        }
      }
    }
    .hint{
      @include wh(100%,.2rem);
      background: #F1F1F1;
    }
  }

}
</style>
