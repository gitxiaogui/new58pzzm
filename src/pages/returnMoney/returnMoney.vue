<template>
<div id="returnMoney">
  <div class="returnMoney">
    <div class="topTitle">
      <span class="title">应还总金额（元）</span>
      <span v-if="!returnMoneyStatus" class="noOrder" >0.00</span>
      <p  v-if="returnMoneyStatus">{{ returnData.returnMoney | returnNumber }}</p>
      <span v-if="returnMoneyStatus" @click="returnMoney" class="btn">还款</span>
    </div>
    <div class="hint"></div>
    <div class="order">
      <div class="orderTitle">待还订单</div>
      <ul class="orderList">
        <li v-if="!returnMoneyStatus" style="text-align: center;color:#ccc;padding-top:.6rem;">暂无待还订单</li>
        <li v-if="returnMoneyStatus" @click="goOrder()">
          <div class="top liInner">
            <span>还款日期{{ returnData.expireDate }}</span>
            <span v-if="returnData.overdueDay<=0" class="blue">还剩{{ returnData.expireDay }}天还款</span>
            <span v-else class="red">已逾期{{ returnData.overdueDay }}天</span>
          </div>
          <div class="center liInner">
            <span>{{ returnData.returnMoney | returnNumber }}</span>
            <i class="iconfont icon-youjiantou"></i>
          </div>
          <div class="bottom liInner">
            <p>还款日当天从{{ returnData.bankName }}（尾号{{ returnData.fourBankCard }}）自动扣款</p>
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
	    returnData:{},
	    bankList: [],
      bankName: '',
      bankAccount: '',
      returnMoneyStatus: false,
    }
  },
  methods: {
    returnMoney(){
      sessionStorage.setItem('returnMessage',JSON.stringify(this.returnData))
      this.$router.push('/affirmReturnMoney')
    },
    goOrder(){
      sessionStorage.setItem('returnMessage',JSON.stringify(this.returnData))
      this.$router.push('/orderDetail')
    },
    // 获取详情
    queryWaitLenderCase(){
      this.httpRequest.queryWaitLenderCase().then((res)=>{
        console.log('获取借款详情',res)
        if(res.code == '00000000'){
          if(res.data){
            this.returnData = res.data
            if(this.returnData.returnMoney){
              this.returnMoneyStatus = true
            }
          }
        }
      })
    },
    // TODO 获取银行卡列表
    getBankList(){
      this.httpRequest.getBankList({}).then((res)=>{
        console.log('获取银行卡列表',res)
        if (res.code == '00000000'){
          if(res.data.length>0){
            this.bankList = res.data
            this.bankName = res.data[0].bankName
            this.bankAccount = res.data[0].bankAccount.substr(res.data[0].bankAccount.length-4)
          }
        }
      })
    }
  },
  filters:{
    returnNumber(num){
      return num ? Number(num).toFixed(2) : ''
    }
  },
  created(){

  },
  activated(){
    localStorage.setItem('headerTitle','还款')
    this.queryWaitLenderCase()
    //this.getBankList()
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/mixin';
#returnMoney{
  padding:1rem 0;
  @include wh(100%,100%);
  .returnMoney{
    @include wh(100%,100%);
    overflow-y: auto;
    .topTitle{
      .noOrder{
        padding-top:.2rem;
        font-size:.6rem;
        font-weight:bold;
      }
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
              .red{
                color:#FF252D;
              }
              .blue{
                color:#0E88EB;
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
