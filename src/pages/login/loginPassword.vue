<template>
  <div id="loginPhonePassword">
    <div class="back iconfont icon-left" @click="getBack"></div>
    <div class="content">
      <div class="title">欢迎登陆58掌柜</div>
      <div class="title_bottom">
        <span>轻松借钱</span><b></b><span>到账快</span><b></b><span>费率低</span>
      </div>
      <div class="form">
        <div class="input">
          <mt-field placeholder="请输入账号" type="tel" v-model="formData.phone" :attr="{maxlength:11}"></mt-field>
        </div>
        <div class="input">
          <mt-field  placeholder="请输入登录密码" type="password" v-model="formData.password" :attr="{ maxlength: 12 ,minlength: 6}"></mt-field>
        </div>
      </div>
      <div class="goNode"><span @click="goNote()">短信快捷登录</span><span @click="forgetPassword">忘记密码？</span></div>
      <div class="btn">
        <mt-button type="primary" :disabled="loading" @click="submitData">
          <mt-spinner v-if="loading" type="triple-bounce" :size="24"></mt-spinner>
          <span v-if="!loading">登录</span>
        </mt-button>
      </div>
    </div>
    <div class="footer">
      <img src="../../assets/img/renzheng.png" alt="">
      <span>通过中国人民银行安全认证检查</span>
    </div>

  </div>
</template>

<script>
import { checkRules } from '../../common/utils'
import { basicRules } from '../../common/formRules'
export default {
  props: {},
  components: {},
  data(){
    return {
      formData: {
        phone: '',
        password: '',
      },
      loading: false,
      docmHeight: document.documentElement.clientHeight,  //默认屏幕高度
      showHeight: document.documentElement.clientHeight,   //实时屏幕高度
      hidshow:true,  //显示或者隐藏footer
    }
  },
  methods: {
    // 短信登录
    goNote(){
      this.$router.push('/loginCode')
    },
    // 忘记密码
    forgetPassword(){
      this.$router.push('/forgetPassword')
    },
    // 提交
    submitData(){
      let error = checkRules(this.formData,basicRules)
      console.log(error)
      if (error){
        this.httpRequest.passwordLogin({
          orgFlag: "SHPTXXKJ",
          platformFlag: "weixinzhengshi",
          phoneNumber: this.formData.phone,
          password: this.formData.password,
        }).then((res)=>{
          console.log('密码登录>>>>>>',res)
          if(res.code == '00000000'){
            this.Toast({
              message: '登录成功',
              position: 'top',
              duration: 1500
            })
            sessionStorage.setItem('phone',this.formData.phone)
            this.$router.push('/main')
          }
          this.loading = false
        }).catch((err)=>{
          this.loading = false
        })
      }
    },
    // 回退
    getBack(){
      this.$router.go(-1)
    }
  },
  mounted(){
    window.onresize = () =>{
      return (() =>{
        this.showHeight = document.body.clientHeight;
      })()
    }
  },
  watch: {
    showHeight: function (){
      if (this.docmHeight > this.showHeight) {
        this.hidshow = false
      } else {
        this.hidshow = true
      }
    }
  },
  created(){

  },
  activated(){

  }
}
</script>

<style lang="scss">
  @import '../../assets/style/mixin';
  #loginPhonePassword {
    position: relative;
    @include wh(100%, 100%);
    .back {
      padding: 0 .4rem;
      height: 1rem;
      line-height: 1rem;
      margin-bottom: .6rem;
    }
    .content {
      padding: 0 .7rem;
      .title {
        font-weight: bold;
        color: rgba(248, 150, 37, 1);
        font-size: .46rem;
        line-height: .5rem;
      }
      .title_bottom {
        @include df;
        margin-top: .3rem;
        @include ac(center);
        span {
          font-size: .26rem;
          color: #ccc;
        }
        b {
          @include wh(.1rem, .1rem);
          @include borderRadius(50%);
          display: inline-block;
          background: #ccc;
          margin: 0 .07rem;
        }
      }
      .form {
        padding-top: 1rem;
        font-size: .32rem;
        .input {
          border-bottom: 1px solid #999;
          .mint-cell-wrapper {
            padding: 0;
          }
          .code{
            color:$orange;
            .mint-button{
              background: #fff;
            }
          }
        }
      }
      .goNode{
        padding:.3rem 0 1.5rem 0;
        font-size:.28rem;
        @include df;
        @include jc(space-between);
        span:nth-of-type(1){
          color:$orange;
        }
      }
      .btn{
        font-size:.36rem;
        span{
          color:#fff;
        }
        .mint-button{
          width:100%;
          background: $orange;
        }
      }
      .hint{
        margin-top:.2rem;
        font-size:.2rem;
        line-height: .32rem;
        color:#999;
      }
    }
    .footer{
      position: absolute;
      left:50%;
      @include tf(translateX(-50%));
      margin-top:1rem;
      @include df;
      @include jc(center);
      bottom:.5rem;
      img{
        @include wh(.3rem,.3rem);
        margin-right:.1rem;
      }
      span{
        font-size:.2rem;
        color:#999;
        white-space: nowrap;
      }
    }
  }
</style>
