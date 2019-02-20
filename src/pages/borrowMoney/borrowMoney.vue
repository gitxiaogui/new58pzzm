<template>
<div id="borrowMoney">
  <ShowCheckBank v-if="closeCheckBank"></ShowCheckBank>
  <div class="borrowMoney">
    <div class="titleHeader">
      <div class="titleCotent">
        <span>申请金额（元）</span>
        <p>{{ productData.basicAmount | returnNumber }}</p>
      </div>
    </div>
    <div class="hint"></div>
    <div class="detailList">
      <p><span>申请期限</span><span>{{ productData.period }}{{ periodSpanOptions[productData.periodSpan] }}</span></p>
      <p v-for="(item,index) in costList" :key="index" v-if="item.finaceItemCode==1009"><span>服务费</span><span>{{ item.cost | returnNumber }}元</span></p>
      <p><span>申请用途</span><span>{{ productData.prodName }}</span></p>
      <p v-for="(item,index) in costList"  :key="index" v-if="item.finaceItemCode==1002"><span>利息费用</span><span>{{ item.cost }}元</span></p>
      <p v-for="(item,index) in costList"  :key="index" v-if="item.finaceItemCode==1003"><span>逾期罚息(每天)</span><span>{{ item.cost | returnNumber }}元</span></p>
      <p><span>收款银行卡</span><span  @click="checkBank" class="blue" v-if="!bankName">添加银行卡<i class="iconfont icon-youjiantou"></i></span><span @click="checkBank" v-if="bankName"><i>{{ bankName }}({{ bankAccount }})</i><i class="iconfont icon-youjiantou"></i></span></p>
    </div>
    <div class="btn">
      <mt-button type="primary" @click="submitData" :disabled="loading">
        <mt-spinner v-if="loading" type="triple-bounce" :size="24"></mt-spinner>
        <span v-if="!loading">确认</span>
      </mt-button>
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
      loading: false,
      closeCheckBank: false,
      productData:{},
      costList: [],
      periodSpanOptions: {'0': '无','1':'天','2':'周','3':'月','4':'年'},
      bankList: [],
      lenderId: '',
      bankName:'',
      bankAccount:'',
      bankIndex:''
    }
  },
  methods: {
    submitData(){
      if(!this.bankList.length){
        this.toast('请先添加银行卡')
        return
      }
      this.httpRequest.sureLenderCase({
        bankCardId: this.bankIndex ? this.bankList[this.bankIndex-1].id : this.bankList[0].id,
        lenderCaseId: this.lenderId
      }).then((res)=>{
        console.log('')
        if(res.code == '00000000'){
          this.toast('借款成功')
          this.$router.push('/main')
        }
      })
    },
    getProductDetail(){
      this.httpRequest.getProductDetail().then((res)=>{
        console.log('获取借钱详情',res)
        if (res.code == '00000000'){
          this.productData = res.data.prodBasicInfo
          this.costList = res.data.costList
          this.lenderId = res.data.lenderId
        }
      })
    },
    checkBank(){
      this.closeCheckBank = true
    },
    // TODO 获取银行卡列表
    getBankList(){
      this.httpRequest.getBankList({}).then((res)=>{
        console.log('获取银行卡列表',res)
        if (res.code == '00000000'){
          this.bankList = res.data
          if(res.data.length>0){
            if(this.bankIndex){
              this.bankName = res.data[this.bankIndex-1].bankName
              this.bankAccount = res.data[this.bankIndex-1].bankAccount.substr(res.data[this.bankIndex-1].bankAccount.length-4)
            }else{
              this.bankName = res.data[0].bankName
              this.bankAccount = res.data[0].bankAccount.substr(res.data[0].bankAccount.length-4)
            }
          }
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
    BUS.$on('closeCheckBank',(index)=>{
      this.closeCheckBank = false
      if(index>0){
        sessionStorage.setItem('bank',index)
        this.bankIndex = index
        this.bankName = this.bankList[this.bankIndex-1].bankName
        this.bankAccount = this.bankList[this.bankIndex-1].bankAccount.substr(this.bankList[this.bankIndex-1].bankAccount.length-4)
        console.log(index)
      }
    })
    if(sessionStorage.getItem('bank')){
      this.bankIndex = sessionStorage.getItem('bank')
    }
    localStorage.setItem('headerTitle','借款')
    this.getProductDetail()
    this.getBankList()
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/style/mixin';
#borrowMoney{
  position: relative;
  @include wh(100%,100%);
  .borrowMoney{
    position: absolute;
    top:1rem;
    left:0;
    padding-bottom:1rem;
    @include wh(100%,100%);
    .titleHeader{
      padding:.5rem .3rem;
      .titleCotent{
        @include borderRadius(.3rem);
        color:#fff;
        @include wh(100%,3rem);
        background: #FCBC33;
        padding:.5rem .3rem;
        p{
          text-align: center;
          padding-top:.36rem;
          font-size:.72rem;
        }
      }
    }
    .hint{
      @include wh(100%,.2rem);
      background: #f7f7f7;
    }
    .detailList{
      border-bottom:1px solid #999;
      background: #fff;
      padding-left:.3rem;
      color:#333;
      p{
        @include df;
        @include jc(space-between);
        padding-right:.3rem;
        line-height: .87rem;
        border-bottom:1px solid #999;
        &:nth-last-child(1){
          border:none;
        }
        .blue{
          color:#0E88EB;
        }
        span{
          font-size:.3rem;
        }
      }
    }
    .btn {
      font-size: .36rem;
      padding:1rem .75rem 0;
      span {
        color: #fff;
      }
      .mint-button {
        width: 100%;
        background: #FCBC33;
      }
    }
  }
}
</style>
