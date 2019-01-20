<template>
<div id="bankList">
  <Header :leftShow="leftShow" :rightShow="rightShow" v-if="topShow" :headerTitle="headerTitle">
    <span @click="addBank" slot="right" class="iconfont icon-jia1"></span>
  </Header>
  <ul class="bankList">
    <li v-for="(item,index) in bankList" :key="index">
      <div class="left">
        <img src="../../assets/img/wode2.png" alt="">
      </div>
      <div class="center">
        <p>建设银行</p>
        <p>储蓄卡</p>
      </div>
      <div class="right">686 *** *** 7215</div>
    </li>
  </ul>
</div>
</template>

<script>
import Header from '../../components/header'
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
        margin-right:.33rem;
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
