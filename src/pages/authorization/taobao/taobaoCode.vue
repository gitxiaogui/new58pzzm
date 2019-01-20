<template>
  <div id="taobaoCode">
    <div class="taobaoCode">
      <div class="titleImg"><img src="../../../assets/img/taobao.png" alt=""></div>
      <div class="notice">请输入手机尾号{{ phone.substr(phone.length-4) }}收到的短信验证码</div>
      <div class="input">
        <mt-field placeholder="请输入验证码" v-model="captcha" :attr="{ maxlength: 6 ,minlength: 6}">
          <i></i>
          <span class="code" @click="getCode">{{ yanzheng }}</span>
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
      disabled:false,
      loading:false,
      captcha: '',
      yanzheng: '重发',
      num: 59,
    }
  },
  methods: {
    //TODO 提交信息
    submitData(){
      this.httpRequest.taobaoMsgValidate({
        account: this.phone,
        dataSourceCode: 'taoBao',
        token: this.token,
        captcha:this.captcha
      }).then((res)=>{
        console.log('获取淘宝报告信息>>>>>>>',res)
        if (res.code == '00000000'){
          if (sessionStorage.getItem('shopList')){
            this.jixuAuth()
          } else {
            this.$router.push('/authorization')
          }
        }
      })
    },
    //TODO 获取验证码
    getCode(){
      if(this.disabled){
        return
      }
      this.timed()
      this.httpRequest.taoBaoSendMsg({
        token: this.token,
        account: this.phone
      }).then((res)=>{
        console.log('淘宝获取验证码',res)
        if(res.code == '00000000'){
          this.toast('短信发送成功')
        }
      }).catch((err)=>{
        this.disabled = false
      })
    },
    //TODO 定时器
    timed(){
      clearInterval(this.timer)
        this.timer = setInterval(() =>{
          if (this.num === 0) {
            this.num = 59
            clearInterval(this.timer)
            this.yanzheng = '重发'
            this.disabled = false
          } else {
            this.yanzheng = this.num + 's后'
            this.disabled = true
          }
          this.num--
        }, 1000)
    }
  },
  created(){

  },
  activated(){
    this.phone = sessionStorage.getItem('taobao')
    localStorage.setItem('headerTitle','饿了么认证')
    this.token = this.$route.query.token
  }
}
</script>

<style lang="scss" >
@import "../../../assets/style/mixin";
  #taobaoCode {
    @include wh(100%, 100%);
    background: #F2F2F2;
    padding: 1.6rem .3rem;
    text-align: center;
    .taobaoCode {
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
          .mint-field-core{
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
