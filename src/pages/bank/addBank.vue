<template>
  <div id="addBank">
    <div class="addBank">
      <div class="input">
        <mt-field label="银行卡号" placeholder="请输入银行卡号" v-model="formData.bankAccount"></mt-field>
      </div>
      <div class="input">
        <mt-field label="持卡人" placeholder="请输入持卡人姓名" v-model="formData.bankUserName"></mt-field>
      </div>
      <div class="input">
        <mt-field label="身份证号" placeholder="请输入身份证号" type="tel" v-model="formData.idCard"
                  :attr="{ maxlength: 18}"></mt-field>
      </div>
      <div class="input">
        <mt-field label="银行预留手机号" placeholder="请输入手机号" type="tel" v-model="formData.phone"
                  :attr="{ maxlength: 11}"></mt-field>
      </div>
      <div class="input">
        <mt-field label="验证码" placeholder="请输入验证码" v-model="captcha" :attr="{ maxlength: 6 ,minlength: 6}">
          <span class="hint"></span>
          <span class="code" @click="getCode">{{ yanzheng }}</span>
        </mt-field>
      </div>
      <div class="hintState">
        <p>注：</p>
        <p>1.因放款使用，请确保银行卡相关信息填写无误;</p>
        <p>2.为保证账号资金安全，请填写实名认证储蓄卡;</p>
        <p>3.建议绑定银行：农业银行、工商银行、中国银行、邮政储蓄。</p>
      </div>
      <div class="btn">
          <mt-button type="primary" @click="submitData" :disabled="disabled">
            <mt-spinner v-if="loading" type="triple-bounce" :size="24"></mt-spinner>
            <span v-if="!loading">确认</span>
          </mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import { checkRules } from "../../common/utils";
import { basicRules } from "../../common/formRules";
export default {
  props: {},
  components: {},
  data(){
    return {
      num: 59,
      yanzheng: '获取验证码',
      btnDisabled: false,
      loading: false,
      disabled: true,
      formData: {
        phone: '',
        bankAccount: '',
        idCard: '',
        bankUserName: '',
      },
      captcha: '',
      getCodeData:{},

    }
  },
  methods: {
    // 确认按钮
    submitData(){
      if(!this.captcha){
        this.Toast({
          message: '请输入短信验证码',
          position: 'top',
          duration: 1000
        })
        return
      }
      this.loading = true
      this.httpRequest.bindCardValMsg({
        phone: this.formData.phone,
        bankAccount: this.formData.bankAccount,
        idCard: this.formData.idCard,
        bankUserName: this.formData.bankUserName,
        merchantno: this.getCodeData.merchantno,
        requestno: this.getCodeData.requestno,
        identityid: this.getCodeData.identityid,
        validatecode: this.captcha,
      }).then((res)=>{
        console.log('绑定银行卡>>>>>>>>>>',res)
        if(res.code == '00000000'){
          this.Toast({
            message: '绑定成功',
            position: 'top',
            duration: 1000
          })
          this.$router.push('/bankList')
        }
        this.loading = false
      }).catch((err)=>{
        this.loading = false
      })
    },
    timered(){
      this.disabled = false
      this.Toast({
        message: '短信发送成功',
        position: 'top',
        duration: 1000
      })
      clearInterval(this.timer)
        this.timer = setInterval(() =>{
          if (this.num === 0) {
            this.num = 59
            clearInterval(this.timer)
            this.yanzheng = '获取验证码'
            this.btnDisabled = false
          } else {
            this.yanzheng = this.num + 's'
            this.btnDisabled = true
          }
          this.num--
        }, 1000)
    },
    getCode(){
      if(this.btnDisabled){
        return
      }
      let success = checkRules(this.formData,basicRules)
      if(success){
        this.btnDisabled = true
        if(sessionStorage.getItem('sendCode')){
          this.getCodeData = JSON.parse(sessionStorage.getItem('sendCode'))
          this.httpRequest.bindCardSendMsg({
            merchantno: this.getCodeData.merchantno,
            requestno: this.getCodeData.requestno,
            identityid: this.getCodeData.identityid,
            bankAccount: this.formData.bankAccount,
          }).then((res)=>{
            console.log('重新发送短信验证码',res)
            if(res.code == '00000000'){
              this.timered()
            }else{
              this.btnDisabled = false
            }
          })
        }else{
          this.httpRequest.addBankCard(this.formData).then((res)=>{
            console.log('获取短信验证码>>>>>>>>>>',res)
            if (res.code == '00000000') {
              this.getCodeData = res.data
              this.timered()
              sessionStorage.setItem('sendCode',JSON.stringify(this.getCodeData))
              }else{
                this.btnDisabled = false
              }
          })
        }

      }
    }
  },
  created(){

  },
  activated(){
    localStorage.setItem('headerTitle', '绑定银行卡')
    this.realAuth = JSON.parse(sessionStorage.getItem('realAuth'))
    this.formData.idCard = this.realAuth.idCard
    this.formData.bankUserName = this.realAuth.name
    this.formData.phone = this.realAuth.phone
  }
}
</script>

<style lang="scss">
  @import '../../assets/style/mixin';

  #addBank {
    @include wh(100%, 100%);
    background: #F1F1F1;
    padding: 1.45rem .3rem;
    .addBank {
      @include wh(100%, 100%);
      background: #fff;
      @include borderRadius(.3rem);
      padding: 0 .45rem;
      .input {
        .mint-cell-wrapper {
          padding: 0;
          line-height: 1rem;
          border-bottom: 1px solid #ccc;
          ::-webkit-input-placeholder { /* WebKit browsers */
            direction: rtl;
          }
          :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
            direction: rtl;
          }
          ::-moz-placeholder { /* Mozilla Firefox 19+ but I‘m not sure about working */
            direction: rtl;
          }
          :-ms-input-placeholder { /* Internet Explorer 10+ */
            direction: rtl;
          }
          .mint-cell-title {
            width: 2.3rem;
            .mint-cell-text {
              white-space: nowrap;
              font-size: .32rem;
              color: #999;
            }
          }
          .mint-cell-value {
            font-size:.3rem;
            text-align: right;
            .mint-field-core {
              text-align: right;
              color:#333;
            }
          }
          .mint-field-other{
            height:1rem;
            .hint {
              display: inline-block;
              height: .3rem;
              width:0;
              border-left: 1px solid #ccc;
              margin: 0 .05rem 0 .1rem;
              background: #fff;
            }
            .code {
              color:#FC0F0F;
              width: 1.5rem;
              display: inline-block;
              text-align: center;
            }
          }

        }
      }
      .hintState{
        p{
          line-height: .5rem;
          font-size:.26rem;
          &:nth-of-type(1){
            font-size:.3rem;
            line-height: .6rem;
            margin-top:.1rem;
          }
        }
      }
      .btn {
        margin-top:.5rem;
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
