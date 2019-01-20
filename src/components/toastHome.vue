<template>
  <div class="toastHome" @click="closeToastHome">
    <div class="bottom">
      <div class="title">建议通过“我的”-“设置”设置登录密码</div>
    </div>
    <div class="feiji">
      <img src="../assets/img/feiji.png" alt="">
    </div>
    <div class="wode">
      <img src="../assets/img/wd.png" alt="">
      <span>我的</span>
    </div>
  </div>
</template>

<script>
import BUS from '../vueBus/index'
export default {
  props: {},
  components: {},
  data(){
	  return {}
  },
  methods: {
    closeToastHome(){
      BUS.$emit('closeToastHome')
    }
  },
  created(){

  },
  activated(){

  }
}
</script>

<style lang="scss" scoped>
@import '../assets/style/mixin';
.toastHome{
  @include wh(100%,100%);
  background: rgba(0,0,0,.5);
  position: relative;
  z-index: 9;
  top:0;
  left:0;
  .bottom{
    padding:.2rem;
    position: fixed;
    @include wh(7rem,2.4rem);
    background: #fff;
    bottom:3.3rem;
    left:50%;
    border:2px dotted #333;
    @include tf(translateX(-50%));
    @include borderRadius(.1rem);
    .title{
      @include borderRadius(.1rem);
      border:2px dashed #333;
      height:100%;
      padding:.4rem;
      font-size:.36rem;
      font-weight: bold;
    }
  }
  .feiji{
    position: fixed;
    bottom:.8rem;
    right:1rem;
    img{
      @include wh(2.2rem,2.6rem);
    }
  }
  .wode{
    position: fixed;
    bottom:.08rem;
    right:.68rem;
    @include df;
    @include fd(column);
    @include ac(center);
    img{
      @include wh(.4rem,.4rem);
    }
    span{
      font-size:.3rem;
      color:#fff;
    }
  }
}



</style>
