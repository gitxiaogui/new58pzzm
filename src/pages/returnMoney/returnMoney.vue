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
            <p>还款日当天从{{ bankName }}（尾号{{ bankAccount }}）自动扣款</p>
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
	  return {
	    bankList: [],
      bankName: '',
      bankAccount: '',
    }
  },
  methods: {
    goOrder(){
      this.$router.push('/orderDetail')
    },
    // 获取详情
    queryWaitLenderCase(){
      this.httpRequest.queryWaitLenderCase().then((res)=>{
        console.log('获取借款详情',res)
      })
    },
    // TODO 获取银行卡列表
    getBankList(){
      this.httpRequest.getBankList({}).then((res)=>{
        console.log('获取银行卡列表',res)
        if (res.code == '00000000'){
          this.bankList = res.data
          this.bankName = res.data[0].bankName
          this.bankAccount = res.data[0].bankAccount.substr(res.data[0].bankAccount.length-4)
        }
      })
    }
  },
  created(){

  },
  activated(){
    localStorage.setItem('headerTitle','还款')
    //this.queryWaitLenderCase()
    this.getBankList()
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
