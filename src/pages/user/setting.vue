<template>
<div id="setting">
  <div class="setting">
    <p @click="goAlterPassword"><span>修改登录密码</span><i class="iconfont icon-youjiantou"></i></p>
    <p><span>关于58掌柜</span><span>V 1.0</span></p>
    <div class="btn" @click="logOut">退出登录</div>
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
    logOut(){
      sessionStorage.removeItem('authorization')
      sessionStorage.removeItem('phone')
      this.$router.push('/loginCode')
    },
    goAlterPassword(){
      this.$router.push('/alterPassword')
    }
  },
  created(){

  },
  activated(){

  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/mixin';
  #setting {
    padding-top:1rem;
    @include wh(100%,100%);
    background: #F6F6F6;
    .setting{
      padding-top:.4rem;
      p{
        height:1rem;
        line-height: 1rem;
        padding:0 .3rem;
        margin-bottom:.2rem;
        @include df;
        @include jc(space-between);
        background: #fff;
      }
      .btn{
        margin-top:.8rem;
        background: #fff;
        font-size:.36rem;
        font-weight:bold;
        text-align: center;
        line-height: 1rem;
      }
    }
  }
</style>
