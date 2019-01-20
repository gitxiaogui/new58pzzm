<template>
  <div id="eleAuthCode">
    <div class="eleAuthCode">
      <div class="titleImg"><img src="../../../assets/img/ele.png" alt=""></div>
      <div class="notice">请输入手机尾号{{ phone.substr(phone.length-4) }}收到的短信验证码</div>
      <div class="input">
        <mt-field placeholder="请输入验证码" v-model="captcha" :attr="{ maxlength: 6 ,minlength: 6}">
          <i></i>
          <span class="code" @click="getCode">重发{{ sendTime }}</span>
        </mt-field>
      </div>
      <div class="btn">
          <mt-button type="primary" @click="submitData" :disabled="loading">
            <mt-spinner v-if="loading" type="triple-bounce" :size="24"></mt-spinner>
            <span v-if="!loading">确定</span>
          </mt-button>
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
      disabled:true,
      loading:false,
      captcha: '',
      yanzheng: '重发',
      num: 59,
      sendTime: '60',
    }
  },
  methods: {
    //TODO 登录
    submitData(){
      if(!this.captcha){
        this.toast('请输入短信验证码')
        return
      }
      this.loading = true
      this.httpRequest.msgValidate({
        account: this.phone,
        captcha: this.captcha,
        dataSourceCode: 'eleme',
        token: this.token
      }).then((res)=>{
        console.log('饿了么短信校验')
        this.loading = false
        if(res.code == '00000000'){
          if(sessionStorage.getItem('shopList')){
            this.jixuAuth()
          }else{
            this.$router.push('/authorization')
          }
        }
      }).catch((err)=>{
        this.loading = false
      })
    },
    //TODO 获取短信验证码
    getCode(){
      if(this.disabled){
        return
      }
      this.disabled = true
      localStorage.setItem('clickTime', new Date().getTime())
      this.interval()
      this.httpRequest.eleSendMsg({
        account: this.phone,
        token: this.token
      }).then((res)=>{
        console.log('获取饿了么验证码')
        this.disabled = false
        if(res.code == '00000000'){
          this.toast('短信发送成功')
        }
      }).catch((err)=>{
        this.disabled = false
      })
    },
    //TODO 定时器
    interval() {
      let _this = this
      let TimeInterval = window.setInterval(function () {
        let nowTime = new Date().getTime()
        _this.sendTime--
        _this.disabled = true
        if ((nowTime - localStorage.getItem('clickTime')) / 1000 >= 60) {
          _this.sendTime = 60
          console.log('stop')
          _this.disabled = false
          window.clearInterval(TimeInterval)
        }
      }, 1000)
    },
  },
  created(){
    let betweenTime = new Date().getTime() - localStorage.getItem('clickTime')
    if (parseInt(betweenTime / 1000) > 60) {
      this.sendTime = 60
      localStorage.removeItem('clickTime')
    } else {
      this.interval()
      this.sendTime = 60 - parseInt(betweenTime / 1000)
    }
  },
  activated(){
    if(!localStorage.getItem('clickTime')){
      localStorage.setItem('clickTime', new Date().getTime())
      this.interval()
    }
    this.phone = sessionStorage.getItem('ele')
    localStorage.setItem('headerTitle','饿了么认证')
    this.token = this.$route.query.token
  }
}
</script>

<style lang="scss" >
@import "../../../assets/style/mixin";
  #eleAuthCode {
    @include wh(100%, 100%);
    background: #F2F2F2;
    padding: 1.6rem .3rem;
    text-align: center;
    .eleAuthCode {
      padding: 1rem .45rem;
      @include wh(100%, 100%);
      @include borderRadius(.4rem);
      background: #fff;
      .titleImg{
        @include wh(2.3rem,.8rem);
        margin:0 auto 1rem;
        img{
          @include wh(100%,100%);
        }
      }
      .notice{
        font-size:.3rem;
        color:#999;
      }
      .input {
        font-size:.36rem;
        border-bottom: 1px solid $orange;
        margin: .5rem 0 1rem;
        .mint-cell-wrapper{
          .mint-field-state{
            display: none;
          }
          padding:0 .8rem;
          input::-ms-input-placeholder {
            text-align: center;
          }
          input::-webkit-input-placeholder {
            text-align: center;
          }
          .mint-field-other{
            @include df;
            @include ac(center);
            i{
              display: inline-block;
              height:.5rem;
              width: .01rem;
              background: #aab2bd;
              margin-right:.2rem;
            }
            span{
                color:$orange;
              }
          }
          .mint-field-core{
            text-align: center;
          }
        }
      }
      .btn {
        font-size: .36rem;
        span {
          color: #fff;
        }
        .mint-button {
          width: 100%;
          background: $orange;
        }
        }
    }

  }
</style>
