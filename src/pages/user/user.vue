<template>
  <div id="user">
    <div class="user">
      <div class="userTitle">
        <img v-if="!authorization" src="../../assets/img/wode-user.png" alt="">
        <img v-if="authorization" src="../../assets/img/logined.png" alt="">
        <div v-if="!phone" class="login"  @click="goLogin"><span>登录</span>/<span>注册</span></div>
        <div v-if="phone" class="logined">{{ phoneNumber }}</div>
      </div>
      <ul class="jinduList">
        <li @click="goReturnMoney">
          <img src="../../assets/img/huankuan@2x.png" alt="">
          <span>还款计划</span>
        </li>
        <li @click="goApplyForPlan">
          <img src="../../assets/img/jindu@2x.png" alt="">
          <span>查看进度</span>
        </li>
        <li @click="myBank">
          <img src="../../assets/img/xinyongqia@2x.png" alt="">
          <span>我的银行卡</span>
        </li>
      </ul>
      <div class="hint"></div>
      <ul class="setList">
        <li @click="goHelpCenter">
          <div class="left">
            <i class="iconfont icon-bangzhu"></i>
            <span>帮助中心</span>
          </div>
          <i class="iconfont icon-youjiantou"></i>
        </li>
        <li @click="contactKefu">
          <div class="left">
            <i class="iconfont icon-kefu1"></i>
            <span>联系客服</span>
          </div>
          <i class="iconfont icon-youjiantou"></i>
        </li>
        <li @click="goSetting">
          <div class="left">
            <i class="iconfont icon-shezhi"></i>
            <span>设置</span>
          </div>
          <i class="iconfont icon-youjiantou"></i>
        </li>
      </ul>
      <div class="imgWrap">
        <img src="../../assets/img/user-banner.png" alt="">
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
	    phone: '',
      authorization: ''
    }
  },
  methods: {
    goReturnMoney(){
      if (!this.authorization){
        this.$router.push('/loginCode')
        return
      }
      this.$router.push('/returnMoney')
    },
    contactKefu(){
      this.$router.push('/contactKefu')
    },
    myBank(){
      this.$router.push('/bankList')
    },
    goSetting(){
      if (!this.authorization){
        this.$router.push('/loginCode')
        return
      }
      this.$router.push('/setting')
    },
    goLogin(){
      this.$router.push('/loginCode')
    },
    goHelpCenter(){
      this.$router.push('/helpCenter')
    },
    goApplyForPlan(){
      if (!this.authorization){
        this.$router.push('/loginCode')
        return
      }
      this.$router.push('/applyForPlan')
    },

  },
  computed:{
    phoneNumber(){
      return this.phone.substr(0, 3) + '****' + this.phone.substr(7)
    }
  },
  activated(){
    this.phone = sessionStorage.getItem('phone')
    this.authorization = sessionStorage.getItem('authorization')
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/style/mixin";
#user{
  @include wh(100%,auto);
  padding-bottom:1rem;
  .user{
    @include wh(100%,100%);
    .userTitle{
      color:#fff;
      @include wh(100%,2rem);
      background: $orange;
      padding:0 .4rem;
      @include df;
      @include ac(center);
      img{
        margin-right:.2rem;
        @include wh(1rem,1rem);
      }
      span{
        font-size:.34rem;
      }
    }
    .jinduList{
      @include df;
      @include jc(space-between);
      padding:.64rem .8rem;
      li{
        @include df;
        @include fd(column);
        @include ac(center);
        img{
          @include wh(.6rem,.6rem);
        }
        span{
          font-size: .28rem;
          margin-top:.2rem;
        }
      }
      }
    .hint{
      @include wh(100%,.2rem);
      background: #f1f1f1;
    }
    .setList{
      padding-left:.3rem;
      margin-bottom:.95rem;
      li{
        @include df;
        @include jc(space-between);
        height:1rem;
        border-bottom:1px solid #999;
        @include ac(center);
        padding-right:.3rem;
        span{
          font-size:.34rem;
        }
        i{
          font-size:.4rem;
        }
      }
    }
    .imgWrap{
      @include wh(100%,2.5rem);
      padding:0 .3rem;
      img{
        @include wh(100%,100%);
      }
    }
  }
}
</style>
