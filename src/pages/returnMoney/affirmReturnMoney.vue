<template>
<div id="affirmReturnMoney">
  <ShowCheckBank v-if="closeCheckBank"></ShowCheckBank>
  <div class="affirmReturnMoney">
    <ul class="orderDetail">
      <li><span>还款本金</span><span>{{ returnMessage.lenderAmount | returnNumber }}元</span></li>
      <li><span>利息</span><span>0 元</span></li>
      <li><span>逾期滞纳金</span><span>{{ returnMessage.cost | returnNumber }}元/天</span></li>
      <li><span>逾期天数</span><span>{{ returnMessage.overdueDay }}天</span></li>
      <li><span>总罚息</span><span>{{ returnMessage.overdueDay * returnMessage.cost }} 元</span></li>
      <li class="lastLi"><span style="color:#333;">总还款金额</span><span>{{ returnMessage.returnMoney | returnNumber }}元</span></li>
    </ul>
    <div class="hint"></div>
    <div class="checkBnak" @click="showCheckBank">
      <span>还款银行卡</span>
      <p v-if="!bankIndex"><span>{{ returnMessage.bankName }}{{ returnMessage.bankCard }}</span><i class="iconfont icon-youjiantou"></i></p>
      <p v-if="bankIndex"><span>{{ bankName }}{{ bankAccount }}</span><i class="iconfont icon-youjiantou"></i></p>
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
	    closeCheckBank: false,
      returnMessage: {},
      bankList: [],
      bankIndex: '',
      bankName: '',
      bankAccount: ''
    }
  },
  methods: {
	  // 选择银行卡
	  showCheckBank(){
	    this.closeCheckBank = true
    },
    // 确认还款
    submitData(){
	    let that = this
      this.httpRequest.returnMoney({
        bankCardId: this.bankList[0].id,
        lenderCaseId: this.returnMessage.id
      }).then((res)=>{
        console.log('还款成功',res)
        if(res.code == '00000000'){
          this.Toast({
            message: '还款申请已提交，因银行通道返回结果有一定延时，请留意还款成功短信通知。',
            position: 'top',
            duration: 3000
          })
          setTimeout(function(){
            that.$router.push('/main')
          },3000)
        }
      })
    },
    // TODO 获取银行卡列表
    getBankList(){
      this.httpRequest.getBankList({}).then((res)=>{
        console.log('获取银行卡列表',res)
        if (res.code == '00000000'){
          this.bankList = res.data
        }
      })
    },
  },
  filters:{
    returnNumber(num){
      return num ? Number(num).toFixed(2) : ''
    }
  },
  activated(){
    BUS.$on('closeCheckBank',()=>{
      this.closeCheckBank = false
    })

     BUS.$on('closeCheckBank',(index)=>{
      this.closeCheckBank = false
      if(index>0){
        sessionStorage.setItem('bank',index)
        this.bankIndex = index
        let bankAccount = this.bankList[this.bankIndex-1].bankAccount
        this.bankName = this.bankList[this.bankIndex-1].bankName
        this.bankAccount =bankAccount.substr(0,3)+ '****' + bankAccount.substr(bankAccount.length-4)
      }
    })
    localStorage.setItem('headerTitle','还款')
    this.returnMessage = JSON.parse(sessionStorage.getItem('returnMessage'))
    this.getBankList()


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
            padding:.5rem .3rem 1rem 0;
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
