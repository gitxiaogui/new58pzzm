<template>
  <div id="loginPhoneCode">
    <div class="maskLayer" v-if="maskLayerShow">
      <div class="maskLayerInput">
        <div class="codeTitle">
          <span></span>
          <span>请输入图片验证码</span>
          <img @click="closeCodeImg" src="../../assets/img/cuo2x.png" alt="">
        </div>
        <mt-field placeholder="请输入图片验证码" v-model="validate" :attr="{ maxlength: 6 ,minlength: 6}">
          <div class="imgWrap">
            <img  :src="`data:image/gif;base64,${codeImgUrl}`" alt="">
            <!--<img src="../../assets/img/banner-2.jpg" alt="">-->
            <div class="refreshImg" @click="refreshCodeImg">
              <img src="../../assets/img/shuaxin.png" alt="">
            </div>
          </div>
        </mt-field>
        <div class="btn">
          <mt-button type="primary" @click="submitDataImgCode" :disabled="loading1">
            <mt-spinner v-if="loading1" type="triple-bounce" :size="24"></mt-spinner>
            <span v-if="!loading1">确定</span>
          </mt-button>
        </div>
      </div>
    </div>
    <div class="loginPhoneCode">
      <div class="back iconfont icon-left" @click="getBack"></div>
      <div class="content">
        <div class="title">欢迎登陆58掌柜</div>
        <div class="title_bottom">
          <span>轻松借钱</span><b></b><span>到账快</span><b></b><span>费率低</span>
        </div>
        <div class="form">
          <div class="input">
            <mt-field placeholder="请输入手机号" type="tel" v-model="formData.phone" :attr="{ maxlength: 11 }"></mt-field>
          </div>
          <div class="input">
            <mt-field placeholder="请输入验证码" v-model="formData.captcha" :attr="{ maxlength: 6 ,minlength: 6}">
              <span class="code" @click="getCode">{{ yanzheng }}</span>
            </mt-field>
          </div>
        </div>
        <div class="goPassword"><span @click="goPassword">账号密码登录</span></div>
        <div class="btn">
          <mt-button type="primary" @click="submitData" :disabled="loading">
            <mt-spinner v-if="loading" type="triple-bounce" :size="24"></mt-spinner>
            <span v-if="!loading">登录</span>
          </mt-button>
        </div>
        <div class="hint1">
          如您尚未注册，则您输⼊验证码后即为您自动注册账号，且您确认已阅读并同意<span @click="goDeal">《注册服务协议》</span>
        </div>

      </div>
    </div>
    <div class="footer" v-show="hidshow">
        <img src="../../assets/img/renzheng.png" alt="">
        <span>通过中国人民银行安全认证检查</span>
      </div>
  </div>
</template>

<script>
  import {checkRules} from '../../common/utils'
  import {basicRules} from '../../common/formRules'

  export default {
    props: {},
    components: {},
    data(){
      return {
        formData: {
          phone: '',
          captcha: '',
        },
        docmHeight: document.documentElement.clientHeight,  // 默认屏幕高度
        showHeight: document.documentElement.clientHeight,   // 实时屏幕高度
        hidshow:true,  // 显示或者隐藏footer
        maskLayerShow: false,
        validate:'',// 图片验证码
        codeImgUrl: '',
        loading: false,
        loading1: false,
        num: 59,
        yanzheng: '获取验证码',
        btnDisabled: false,
      }
    },
    methods: {
      // 登录协议
      goDeal(){
        this.$router.push('/loginDeal')
      },
      // 账号密码登录
      goPassword(){
        this.$router.push('/loginPassword')
      },
      // 关闭图片验证码
      closeCodeImg(){
        this.maskLayerShow = false
        this.btnDisabled = false
      },
      //提交图片验证码
      submitDataImgCode(){
        if(!this.validate){
          this.Toast({
            message: '请输入图片验证码',
            position: 'top',
            duration: 1500
          })
          return
        }
        this.httpRequest.checkValidate({
          phoneNumber: this.formData.phone,
          validate: this.validate
        }).then((res)=>{
          console.log('对比图片验证码>>>>>>>>>',res)
          if (res.code == '00000000') {
              this.maskLayerShow = false
              this.btnDisabled = false
              this.getCode()
            }
        })
      },
      // 重新获取图片验证码
      refreshCodeImg(){
        this.getCodeImg()
      },
      // 提交
      submitData(){
        let error = checkRules(this.formData, basicRules)
        console.log(error)
        if (error) {
          this.loading = true
          this.httpRequest.captchaLogin({
            orgFlag: "SHPTXXKJ",
            platformFlag: "weixinzhengshi",
            phoneNumber: this.formData.phone,
            captcha: this.formData.captcha,
          }).then((res) =>{
            console.log('短信验证码登录>>>>>>', res)
            if (res.code == '00000000') {
              this.Toast({
                message: '登录成功',
                position: 'top',
                duration: 1500
              })
              sessionStorage.setItem('phone',this.formData.phone)
              this.$router.push('/main')
            }
            this.loading = false
          }).catch((err) =>{
            this.loading = false
          })
        }
      },
      // 回退
      getBack(){
        this.$router.go(-1)
      },
      getCode(){
        if (this.btnDisabled) {
          return
        }
        if (!this.formData.phone) {
          this.Toast({
            message: '请输入手机号',
            position: 'top',
            duration: 1000
          })
          return
        }
        this.btnDisabled = true
        this.httpRequest.getCaptcha({
          phoneNumber: this.formData.phone,
        }).then((res) =>{
          console.log('获取验证码>>>>>>', res)
          if (res.code == '00000000') {
            clearInterval(this.timer)
            this.timer = setInterval(() =>{
              if (this.num === 0) {
                this.num = 59
                clearInterval(this.timer)
                this.yanzheng = '获取验证码'
                this.btnDisabled = false
              } else {
                this.yanzheng = this.num + 's后重新发送'
                this.btnDisabled = true
              }
              this.num--
            }, 1000)
            this.Toast({
              message: '短信发送成功',
              position: 'top',
              duration: 1000
            })
          }else if (res.code == '600070') {
              this.getCodeImg()
            }else{
            this.btnDisabled = false
          }
        }).catch((err)=>{
          this.btnDisabled = false
        })
      },
      getCodeImg(){
        this.httpRequest.getCodeImg({
          phoneNumber:this.formData.phone
        }).then((res) =>{
          if(res.code == '00000000'){
            this.maskLayerShow = true
            this.codeImgUrl = res.data
          }
          console.log('获取图片验证码', res)
        })
      },
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
    created(){},
    activated(){}
  }
</script>

<style lang="scss">
  @import '../../assets/style/mixin';
  #loginPhoneCode {
    @include wh(100%, 100%);
    position: relative;
    .maskLayer{
      @include wh(100%, 100%);
      position: absolute;
      top:0;
      left:0;
      z-index: 9;
      background: rgba(0,0,0,.5);
      .maskLayerInput{
        @include wh(7rem, 4rem);
        background: #fff;
        position: absolute;
        left:50%;
        top:50%;
        padding:.5rem 0;
        @include borderRadius(.3rem);
        @include tf(translateX(-50%));
        margin-top:-2rem;
        .codeTitle{
          line-height: .8rem;
          border-bottom:1px solid #ccc;
          @include df;
          @include jc(space-between);
          padding:0 .4rem;
          img{
            @include wh(.25rem,.25rem);
          }
        }
        .mint-cell-wrapper{
          padding:0 .4rem;
        }
        .mint-cell-value{
          margin-top:.3rem;
          width:3rem;
          border:1px solid #d1d1d1;
          @include df;
          .mint-field-core{

          }
          .mintui-field-error{
            margin-right:.3rem;
          }
        }
        .imgWrap{
          background: #CECECE;
          @include wh(2.8rem,.8rem);
          @include df;
          @include ac(center);
          img{
            @include wh(2.2rem,.8rem);
          }
          .refreshImg{
            @include wh(.6rem,.8rem);
             @include df;
            @include ac(center);
            @include jc(center);
            img{
              @include wh(.5rem,.5rem);
            }
          }
        }
        .mint-button{
          width:90%;
          margin:.2rem 0 0 5%;
          background: $orange;
        }
      }
    }
    .loginPhoneCode {
      position: absolute;
      left: 0;
      top: 0;
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
            .code {
              color: $orange;
              .mint-button {
                background: #fff;
              }
            }
            .mintui-field-error {
              margin-right: .3rem;
            }
          }
        }
        .goPassword {
          padding: .3rem 0 1.5rem 0;
          font-size: .28rem;
          span {
            color: $orange;
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
        .hint1 {
          margin-top: .2rem;
          font-size: .2rem;
          line-height: .32rem;
          color: #999;
          span{
            text-decoration: underline;
          }
        }
      }
    }
    .footer {
        position: absolute;
        bottom:.5rem;
        left:50%;
      @include tf(translateX(-50%));
        @include df;
        margin-top: 1rem;
        @include jc(center);
        img {
          @include wh(.3rem, .3rem);
          margin-right: .1rem;
        }
        span {
          font-size: .2rem;
          color: #999;
          white-space: nowrap;
        }
      }
  }
</style>
