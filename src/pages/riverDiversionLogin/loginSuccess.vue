<template>
  <div class="loginSuccess" :style="{ height: bodyHeight + 'px' }">
    <div class="login_wrap">
      <div class="top_img">
        <img src="../../assets/img/ren.png" alt="">
      </div>
      <div class="login_success">恭喜您，注册成功！</div>
      <div class="login_saoma">扫码立即拿钱！</div>
      <div class="login_hint"></div>
      <div class="login_code">
        <img src="../../assets/img/login_code.jpg" alt="">
      </div>
      <div class="login_bottom">
          <div><img src="../../assets/img/login_jiantou.png" alt=""><span>截屏/保存图片</span></div>
          <div><img src="../../assets/img/login_jiantou.png" alt=""><span>打开微信"扫一扫"刚刚保存的图片</span></div>
          <div><img src="../../assets/img/login_jiantou.png" alt=""><span>关注"58掌柜"公众号，登录立即拿钱</span></div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data(){
      return {
        bodyHeight:'',
      }
    },
    mounted(){
      this.bodyHeight=document.documentElement.clientHeight*1.05
    },
    methods: {},
    activated(){

    }
  }
</script>

<style lang="scss" >
  @import "../../assets/style/mixin";
  .loginSuccess {
    position: relative;
    min-height: 100%;
    font-size: .32rem;
    background: url("../../assets/img/login_success.png") no-repeat left top;
    background-size: 100% 100%;
    img{
      display: block;
    }
    .login_wrap {
      padding: 0 1rem;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      .top_img {
        padding-top: 1.5rem;
        img {
          height: 1.6rem;
          width: 1.6rem;
        }
      }
      .login_success {
        color: #ff8908;
        font-size: .36rem;
        font-weight: bold;
        padding: .2rem 0;
      }
      .login_saoma {
        font-size: .3rem;
        font-weight: bold;
        color: #333;
      }
      .login_hint {
        border-bottom: 1px dotted #333;
        margin: .2rem 0;
        width:100%;
      }
      .login_code{
        img{
          height:3.5rem;
          width:3.5rem;
        }
      }
      .login_bottom{
        border:1px solid #ccc;
        padding:.2rem .1rem;

        @include borderRadius(.2rem);
       div{
         display: flex;
         align-items: center;
         line-height: .5rem;
         span{
           font-weight: bold;
           font-size:.3rem;
         }
          img{
            height:.3rem;
            width:.3rem;
          }
        }
      }
    }

  }
</style>
