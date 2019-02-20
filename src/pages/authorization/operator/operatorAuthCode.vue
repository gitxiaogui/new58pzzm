<template>
  <div id="operatorAuthCode">
    <div class="operatorAuthCode">
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
      <div class="common" @click="showCommon">常见问题</div>
    </div>
    <div id="changjian" v-show="common">
      <div class="changjian">
        <div class="title">常见问题</div>
        <p>1、运营商验证码相关问题</p>
        <div class="content">
          <span>部分地区需多个验证码（吉林移动需要四个验证码），如输入验证码后仍然提示输入验证码，请按提输入即可授权成功。</span>
        </div>
        <p>2、忘记服务密码相关问题</p>
        <div class="content">
          <span>如忘记服务密码，请拨打对应运营商电话进行重置，电信：10000，移动：10086，联通：10010</span>
        </div>
        <p>3、修改手机号码相关问题</p>
        <div class="content">
          <span>手机号使用三个月及以上可进行修改。</span>
        </div>
        <p>4、其他</p>
        <div class="content">
          <span>如遇其它问题，请直接在微信内搜索“zaixiankefu10”添加58掌柜官方客服进行留言</span>
        </div>
        <div class="btn" @click="closeCommon">关闭</div>
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
        password: '',
        token: '',
        disabled: true,
        loading: false,
        captcha: '',
        yanzheng: '重发',
        num: 59,
        sendTime: '60',
        sendCodeStatus: false,
        common: false,
      }
    },
    methods: {
      // 提交验证码
      submitData(){
        if (!this.captcha) {
          this.toast('请输入短信验证码')
          return
        }
        this.loading = true
        this.httpRequest.valMsgPass({
          captcha: this.captcha,
          passwordType: this.val_passwordType,
          token: this.token
        }).then((res) =>{
          console.log('运营商短信验证', res)
          if (res.code == '00000000') {
            this.queryReport(res.data)
          }else{
            this.loading = false
          }
        }).catch((err) =>{
          this.loading = false
        })
      },
      // 运营商获取报告
      queryReport(token){
        this.httpRequest.queryReport({
          dataSourceCode: 'hulu',
          token: token
        }).then((res)=>{
          console.log('获取运营商报告信息>>>>>>>',res)
          if (res.code == '00000000'){
            this.toast('授权成功')
            if (sessionStorage.getItem('hulu')){
              this.jixuAuth()
            } else {
              this.$router.push('/authorization')
            }
          }
          this.loading = false
        }).catch((err)=>{
          this.loading = false
        })
      },
      // 显示常见问题
      showCommon(){
        this.common = true
      },
      // 关闭常见问题
      closeCommon(){
        this.common = false
      },
      // 获取验证码
      getCode(){
        if (this.sendCodeStatus) {
          return
        }
        this.sendCodeStatus = true
        localStorage.setItem('clickTime', new Date().getTime())
        this.interval()
        this.httpRequest.sendMsg({
          token: this.token
        }).then((res) =>{
          console.log('重发运营商短信验证码')
          if (res.code == '00000000') {
            this.toast('短信发送成功')
          }
        })
      },
      // 定时器
      interval(){
        let _this = this
        let TimeInterval = window.setInterval(function (){
          let nowTime = new Date().getTime()
          _this.sendTime--
          if ((nowTime - localStorage.getItem('clickTime')) / 1000 >= 60) {
            _this.sendTime = 60
            console.log('stop')
            _this.btnDisabled = false
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
      if (!localStorage.getItem('clickTime')) {
        localStorage.setItem('clickTime', new Date().getTime())
        this.interval()
      }
      this.phone = sessionStorage.getItem('operator')
      localStorage.setItem('headerTitle', '运营商认证')
      this.password = this.$route.query.password
      this.token = this.$route.query.token
      this.val_passwordType = this.$route.query.val_passwordType
    }
  }
</script>

<style lang="scss">
  @import "../../../assets/style/mixin";

  #operatorAuthCode {
    @include wh(100%, 100%);
    background: #F2F2F2;
    padding: 1.6rem .3rem;
    text-align: center;
    #changjian {
      @include wh(100%, 100%);
      //background: rgba(255, 255, 255, .8);
      position: fixed;
      z-index: 10;
      top: 0;
      left: 0;
      padding: 1.5rem .4rem;
      .changjian {
        padding: 0 .5rem;
        border: 1px solid #ccc;
        @include wh(100%, 100%);
        color: #333;
        background: #fff;
        text-align: left;
        .title {
          text-align: center;
          border-bottom: 1px solid #ccc;
          line-height: 1rem;
          margin-bottom: .5rem;
        }
        p {
          font-weight: bold;
          font-size: .3rem;
        }
        .content {
          padding-left: .3rem;
          font-size: .28rem;
          span {
            line-height: .4rem;
          }
        }
        .btn {
          @include wh(1.4rem, .6rem);
          border: 1px solid #ccc;
          text-align: center;
          line-height: .6rem;
          margin: .5rem auto 0;
        }
      }
    }
    .operatorAuthCode {
      padding: 1rem .45rem;
      @include wh(100%, 100%);
      @include borderRadius(.4rem);
      background: #fff;
      .notice {
        font-size: .3rem;
        color: #999;
      }
      .input {
        font-size: .36rem;
        border-bottom: 1px solid $orange;
        margin: .5rem 0 1rem;
        .mint-cell-wrapper {

          .mint-field-state {
            display: none;
          }
          padding: 0 .2rem;
          input::-ms-input-placeholder {
            text-align: center;
          }
          input::-webkit-input-placeholder {
            text-align: center;
          }
          .mint-field-core {
            text-align: center;
          }
          .mint-field-other {
            @include df;
            @include ac(center);
            i {
              display: inline-block;
              height: .5rem;
              width: .01rem;
              background: #aab2bd;
              margin-right: .2rem;
            }
            span {
              color: $orange;
              width: 1.2rem;
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
      .common {
        color: $orange;
        margin-top: .3rem;
        font-size: .3rem;
      }
    }
  }
</style>
