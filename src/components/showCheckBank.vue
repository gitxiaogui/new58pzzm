<template>
<transition name="fade">
  <div id="checkBank">
    <div class="checkBank">
      <div class="checkTitle">
        <span></span>
        <span>选择收款银行卡</span>
        <span @click="cloneCheckBank" class="iconfont icon-cha"></span>
      </div>
      <ul class="bankList" v-if="bankList.length>0">
        <li v-for="(item,index) in bankList" :key="index" @click="checkBank(index)">
          <div class="left"><img src="../assets/img/wode1.png" alt=""></div>
          <div class="center">
            <p class="bankName">{{ item.bankName }}（尾号{{ item.bankAccount.substr(item.bankAccount.length-4) }}）</p>
            <span>立即到账</span>
          </div>
          <div class="right" v-if="checkedBank == index"><img src="../assets/img/duihao@2x.png" alt=""></div>
        </li>
      </ul>
      <div class="btn">
        <p @click="addBank"><span class="iconfont icon-jia1"></span>添加银行卡</p>
      </div>
    </div>
  </div>
</transition>
</template>

<script>
import BUS from '../vueBus/index'
export default {
  props: {},
  components: {},
  data(){
	  return {
	    bankList: [],
      checkedBank: 0
    }
  },
  methods: {
    checkBank(index){
      this.checkedBank = index+1
      BUS.$emit('closeCheckBank',this.checkedBank)
    },
    cloneCheckBank(){
      BUS.$emit('closeCheckBank')
    },
    addBank(){
      this.httpRequest.queryRealAuth().then((res)=>{
        console.log('获取实名认证信息')
        if (res.code == '00000000'){
          this.realAuthStatus = true
          sessionStorage.setItem('realAuth',JSON.stringify(res.data))
          this.$router.push('/addBank')
        } else if (res.code == '1000607'){
          // 去实名认证
          this.$router.push('/realAuth')
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
  mounted(){
    this.getBankList()
  },
  activated(){

  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/style/mixin';

#checkBank{
  @include wh(100%,100%);
  position: fixed;
  top:0;
  left:0;
  z-index: 9;
  background: rgba(0,0,0,.5);
  .checkBank{
    overflow-y: auto;
    position: absolute;
    bottom:0;
    left:0;
    background: #fff;
    @include wh(100%,7rem);
    -webkit-border-radius: .3rem .3rem 0 0;
    -moz-border-radius: .3rem .3rem 0 0;
    border-radius: .3rem .3rem 0 0;
    .checkTitle{

      @include wh(100%,1.2rem);
      @include df;
      @include ac(center);
      @include jc(space-between);
      font-size:.3rem;
      padding:0 .3rem;
      border-bottom:1px solid #ccc;
    }
    .bankList{
        li{
          height:1.3rem;
          @include df;
          @include jc(space-between);
          @include ac(center);
          padding:0 .3rem;
          border-bottom:1px solid #ccc;
          .left{
            width:.8rem;
            img{
              @include wh(.55rem,.55rem);
            }
          }
          .center{
            @include flex;
            font-size:.34rem;
            span{
              font-size:.24rem;
              color:#999;
            }
          }
          .right{
            width:1.5rem;
            img{
              float: right;
             @include wh(.37rem,.26rem);
            }
          }
        }
    }
    .btn{
      padding:.6rem .4rem 0;
      margin-bottom:.2rem;
      p{
        @include wh(100%,.8rem);
        background: #fff;
        border:1px solid #ccc;
        line-height: .8rem;
        text-align: center;
        color:#248AF8;
        @include borderRadius(.2rem);
      }
    }
  }
}
</style>
