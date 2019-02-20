<template>
<div id="bankList">
  <Header :leftShow="leftShow" :rightShow="rightShow" v-if="topShow" :headerTitle="headerTitle">
    <span @click="addBank" slot="right" class="iconfont icon-jia1"></span>
  </Header>
  <ul class="bankList">
    <li v-for="(item,index) in bankList" :key="index">
      <div class="left">
        <img  :src="bankNameList[item.bankName]" alt="">
      </div>
      <div class="center">
        <p>{{ item.bankName }}</p>
        <p>储蓄卡</p>
      </div>
      <div class="right">{{ item.bankAccount }}</div>
    </li>
  </ul>
</div>
</template>

<script>
import Header from '../../components/header'
import GD from '@/assets/img/GD.png'
import BJ from '@/assets/img/BJ.png'
import GF from '@/assets/img/GF.png'
import GS from '@/assets/img/GS.png'
import XY from '@/assets/img/XY.png'
import JT from '@/assets/img/JT.png'
import MS from '@/assets/img/MS.png'
import NY from '@/assets/img/NY.png'
import PA from '@/assets/img/PA.png'
import PF from '@/assets/img/PF.png'
import SH from '@/assets/img/SH.png'
import YZ from '@/assets/img/YZ.png'
import ZG from '@/assets/img/ZG.png'
import ZS from '@/assets/img/ZS.png'
import ZX from '@/assets/img/ZX.png'
import JS from '@/assets/img/JS.png'
export default {
  props: {},
  components: {
    Header
  },
  data(){
	  return {
	    leftShow: true,
	    rightShow: false,
	    topShow: true,
      headerTitle: '我的银行卡',
      bankList: [],
      realAuthStatus: false,
      bankNameList: {
        '交通银行': JT,
        '中国工商银行': GS,
        '中国银行': ZG,
        '中国建设银行': JS,
        '中国邮政储蓄银行': YZ,
        '中信银行': ZX,
        '中国光大银行': GD,
        '招商银行': ZS,
        '兴业银行': XY,
        '浦发银行': PF,
        '平安银行': PA,
        '中国民生银行': MS,
        '广发银行股份有限公司': GF,
        '北京银行': BJ,
        '中国农业银行': NY
      },

    }
  },
  methods: {
    // TODO 跳转添加银行卡
    addBank(){
      if (this.realAuthStatus){
        this.$router.push('/addBank')
      }
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
    // TODO 获取实名认证信息
    queryRealAuth(){
      this.httpRequest.queryRealAuth().then((res)=>{
        console.log('获取实名认证信息')
        if (res.code == '00000000'){
          this.realAuthStatus = true
          sessionStorage.setItem('realAuth',JSON.stringify(res.data))
        } else if (res.code == '1000607'){
          this.$router.push('/realAuth')
          // 去实名认证
        }
      })
    }
  },
  created(){

  },
  activated(){
    localStorage.setItem('headerTitle','我的银行卡')
    this.getBankList()
    this.queryRealAuth()
  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/style/mixin';
#bankList{
  .bankList{
    padding:1rem 0 0 .3rem;
    li{
      @include df;
      height: 1.54rem;
      @include jc(space-between);
      @include ac(center);
      padding-right:.3rem;
      border-bottom:1px solid #999;
      .left{
        @include wh(.6rem,.6rem);
        margin-right:.2rem;
        img{
          @include wh(100%,100%);
        }
      }
      .right{
        @include flex;
        text-align: right;
        p{
          line-height: .6rem;
        }
      }
    }
  }
}
</style>
