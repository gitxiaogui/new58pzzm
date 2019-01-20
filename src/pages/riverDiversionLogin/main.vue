<template>
  <div class="riverDiversionLogin" :style="{ height: bodyHeight + 'px'}">
    <div class="r_wrap">
      <div class="r_top_wrap">
        <div class="r_top">
        <div class="r_top_title">试 试 你 能 借 多 少 钱？</div>
        <div class="hint1"><span></span><span></span></div>
        <div class="from_data">
          <div class="phone input">
            <span class="iconfont icon-shouji"></span>
            <mt-field placeholder="请输入手机号" v-model="fromData.phone" type="tel" :attr="{ maxlength: 11 }"></mt-field>
          </div>
          <div class="code_wrap ">
            <div class="code input">
              <span class="iconfont icon-renzheng"></span>
              <mt-field placeholder="手机验证码" v-model="fromData.code" type="text" :attr="{ maxlength: 6 }"></mt-field>
            </div>
            <div @click="sendCode" class="btn_code" >
              <span :disabled="btnDisabled" class="sendSpan">{{ yanzheng }}</span>
            </div>
          </div>
          <div class="check">
            <span @click="checked" class="iconfont icon-duihao2" :class="checkedStatus ? 'disabled':'blue'"></span>
            <p><span>我已阅读并同意</span><span class="blue" @click="protocol">《58掌柜注册协议》</span></p>
          </div>
          <div class="btn_obtain" :disabled="disabledStatus" @click="onSubmit"> <mt-spinner type="triple-bounce" :size="24" v-if="myloading"></mt-spinner> <span v-if="!myloading">点击查看我的额度</span></div>
        </div>
      </div>
      </div>
      <div class="r_bottom_wrap">
        <div class="r_bottom">
        <div class="r_bottom_title"><span></span>3步快速放款<span></span></div>
        <div class="r_bottom_content">
          <div>完成注册</div>
          <img src="../../assets/img/jiantou.png" alt="">
          <div>扫描关注公众号</div>
          <img src="../../assets/img/jiantou.png" alt="">
          <div>获取额度</div>
        </div>
      </div>
      </div>
    </div>
    <div class="hint_wrap" v-show="showHint"> <!-- v-show="showHint"-->
      <div class="hint_inner">
        <div class="h_top">
          <p>已经注册过该平台</p>
          <p>进⼊“58掌柜”微信公众号</p>
          <p>登录拿钱！</p>
        </div>
        <div class="h_bottom">
          <!--<span @click="cancel">取消</span>-->
          <!--<span><a href="javascript:testApp('weixin://')" class="dl-btn" id="download">前往微信</a> </span>-->
          <span><a href="javascript:;" @click="testApp('weixin://')" class="dl-btn" id="download">前往微信</a> </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { basicRules } from '../../common/formRules'
import { checkRules } from '../../common/utils'
import { Toast } from 'mint-ui'
import { wxShare } from '@/weChat/index'
export default {
  data(){
    return {
      checkedStatus: false,
      fromData: {
        phone: '',
        code: ''
      },
      bodyHeight:'',
      disabledStatus: false,
      myloading: false,
      yanzheng: '获取验证码',
      num: 59,
      btnDisabled: false,
      flagData:{},
      showHint:false,
    }
  },
  methods: {
    // 前往微信
    testApp(url) {
      let that = this
      let timeout, t = 1000, hasApp = true
      setTimeout(function () {
        if (!hasApp) {
          // 没有安装微信
          that.$router.push('/loginSuccess')
          /*let r=confirm('打开微信，搜索‘58掌柜’公众号，查看额度')
          if (r==true){
            that.showHint = false
          }*/
        } else {
          // 安装微信
        }
        document.body.removeChild(ifr)
      }, 2000)
      let t1 = Date.now()
      let ifr = document.createElement('iframe')
      ifr.setAttribute('src', url)
      ifr.setAttribute('style', 'display:none')
      document.body.appendChild(ifr)
      timeout = setTimeout(function () {
        let t2 = Date.now()
        if (!t1 || t2 - t1 < t + 100) {
          hasApp = false
        }
      }, t)
    },
    // 取消
    cancel(){
      this.showHint = false
    },
    // 查看协议
    protocol(){
      this.$router.push('/loginDeal')
    },
    // 选中协议
    checked(){
      this.checkedStatus = !this.checkedStatus
    },
    // 发送短信
    sendCode(){
      if (!this.fromData.phone) {
        Toast({
          message: '请输入手机号',
          position: 'top',
          duration: 1000
        })
        return
      }
      if (this.btnDisabled){
        return
      }
      console.log(1,this.btnDisabled)
      clearInterval(this.timer)
      this.timer = setInterval(() =>{
        if (this.num == 0) {
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
      this.httpRequest.getCaptcha({
        phoneNumber: this.fromData.phone
      }).then((res) =>{
        if (res.code == '00000000') {
          this.toast('请注意查收验证码')
        }
      })
    },
    // 提交
    onSubmit(){
      if (this.disabledStatus){
        return
      }
      let status = checkRules(this.fromData,basicRules)
      if (status){
        if (this.checkedStatus){
          Toast({
            message: '请先勾选《58掌柜注册协议》',
            position: 'top',
            duration: 1000
          })
          return
        }
        this.myloading = true
        this.disabledStatus = true
        this.httpRequest.register({
          phoneNumber: this.fromData.phone,
          captcha: this.fromData.code,
          orgFlag: this.flagData.orgFlag ? this.flagData.orgFlag : '',
          platformFlag:this.flagData.platformFlag ? this.flagData.platformFlag : '',
          diversionFlag:this.flagData.diversionFlag ? this.flagData.diversionFlag : '',
        }).then((res)=>{
          console.log('注册成功》》》》》》》》》',res)
          if (res.code == '00000000'){
            this.$router.push('/loginSuccess')
          } else if (res.code == '600019'){ /* 手机号已存在 */
            this.showHint = true
          }
          this.myloading = false
          this.disabledStatus = false
        }).catch((err)=>{
          this.myloading = false
          this.disabledStatus = false
        })
      }
    },
    // 保存点击量
    getSaveInLog(){
      this.httpRequest.saveInLog({
        orgFlag: this.flagData.orgFlag,
        platformFlag: this.flagData.platformFlag,
        diversionFlag: this.flagData.diversionFlag,
        type:'click',
        userId: ''
      }).then((res) =>{
        if (res.code == '00000000') {
          console.log('第一次进入主界面', res)
          sessionStorage.setItem('oneHome', 'oneHome')
        }
      })
    },
    getWXShare(){
      let url = sessionStorage.getItem('url')
      wxShare('58掌柜', '高达5万额度，下款快，门槛低，新口子', url,
        function (){
          Toast({
            message: '分享成功',
            position: 'top',
            duration: 1000
          })
        },
        function (){
          Toast({
            message: '取消分享',
            position: 'top',
            duration: 1000
          })
        }
      )
    }
  },
  mounted(){
    this.bodyHeight=document.documentElement.clientHeight
    this.getWXShare()
  },
  activated(){
    sessionStorage.setItem('headerTitle', '')
    if (JSON.stringify(this.$route.query) != '{}') {
      sessionStorage.setItem('flagData', JSON.stringify(this.$route.query))
    }
    if (sessionStorage.getItem('flagData')) {
      this.flagData = JSON.parse(sessionStorage.getItem('flagData'))
    } else {
      this.flagData = this.$route.query
    }
    if (!sessionStorage.getItem('url')){
      sessionStorage.setItem('url',window.location.href)
    }
    console.log(this.flagData)
    this.getSaveInLog()
  }
}
</script>

<style lang="scss" >
  @import "../../assets/style/mixin";
  .riverDiversionLogin {
    font-size: .3rem;
    @include wh(100%,auto);
    background: url("../../assets/img/rever_bg.jpg") no-repeat left top;
    background-size: 100% auto;
    color: #333;
    padding-bottom:100%;
    position: relative;
    .r_wrap {
      height: 100%;
      position: relative;
      .r_top_wrap{
        position: absolute;
        top: 3rem;
        left:50%;
        @include wh(100%,5.4rem);
        padding:0 .5rem;
        @include tf(translateX(-50%));
      }
      .r_top {
        @include wh(100%,5.4rem);
        background: #fff;
        @include borderRadius(.5rem);
        .r_top_title {
          padding: .4rem 0 0;
          font-size: .4rem;
          font-weight: bold;
          text-align: center;
        }
        .hint1 {
          position: relative;
          border-bottom: 1px dotted #ccc;
          padding-top:.3rem;
          span {
            position: absolute;
            @include wh(.32rem,.6rem);
            z-index: 9;
            -webkit-border-radius: 0 .3rem .3rem 0;
            -moz-border-radius: 0 .3rem .3rem 0;
            border-radius: 0 .3rem .3rem 0;
            display: block;
            top: 0rem;
            background: #EF5D00;
            &:nth-of-type(1){
              left:-.02rem;
            }
            &:nth-of-type(2) {
              right: -.04rem;
              -webkit-border-radius: .3rem 0 0 .3rem;
              -moz-border-radius: .3rem 0 0 .3rem;
              border-radius: .3rem 0 0 .3rem;
              background: #F86F05;
            }
          }
        }
        .from_data {
          font-size: .32rem;
          margin-top: .5rem;
          padding:0 .5rem;
          .input {
            border: 1px solid #ccc;
            height: .7rem;
            display: flex;
            align-items: center;
            -webkit-border-radius: .1rem;
            -moz-border-radius: .1rem;
            border-radius: .1rem;
            .iconfont {
              font-size: .46rem;
              padding: 0 .1rem;
            }
            .mint-cell {
              min-height: 0;
              font-size: .3rem;
              background: #fff;
              .mint-cell-wrapper{
                padding:0;
                background: #fff;
              }
            }
          }
          .code_wrap {
            display: flex;
            padding-top: .3rem;
            justify-content: space-between;
            align-items: center;
            .code {
              width: 4rem;
              display: flex;
              align-items: center;
              margin-right: .2rem;
            }
            .btn_code {
              height: .7rem;
              line-height: .7rem;
              text-align: center;
              background: #ccc;
              white-space: nowrap;
              padding: 0 .1rem;
              font-size:.30rem;
              background: #F05204;
              color: #fff;
              -webkit-border-radius: .2rem;
              -moz-border-radius: .2rem;
              border-radius: .2rem;
            }
          }
          .check {
            display: flex;
            padding: .2rem 0;
            align-items: center;
            font-size: .3rem;
            .iconfont {
              margin-right: .1rem;
            }
            .disabled {
              color: #ccc;
            }
            .blue {
              color: #FFA956;
            }
          }
          .btn_obtain {
            height: .7rem;
            background: #FB7509;
            background: -webkit-linear-gradient(#FB7509, #F04706); /* Safari 5.1 - 6.0 */
            background: -o-linear-gradient(#FB7509, #F04706); /* Opera 11.1 - 12.0 */
            background: -moz-linear-gradient(#FB7509, #F04706); /* Firefox 3.6 - 15 */
            background: linear-gradient(#FB7509, #F04706); /* 标准的语法 */
            @include borderRadius(.2rem);
            line-height: .7rem;
            text-align: center;
            color: #fff;
          }
        }
      }
      .r_bottom_wrap{
        padding:0 .5rem;
        position: absolute;
        top: 8.7rem;
      }
      .r_bottom {
      padding: .2rem .4rem .3rem;
      background: #fff;
      width:100%;


      @include borderRadius(.3rem);
      .r_bottom_title {
        height: .5rem;
        @include df;
        @include jc(center);
        @include ac(center);
        span {
          height: .01rem;
          border-top: 1px solid #333;
          width: .4rem;
          margin:0 .1rem;
          display: inline-block;
        }
      }
      .r_bottom_content {
        font-size: .26rem;
        display: flex;
        align-items: center;
        margin-top: .1rem;
        div {
          flex: 1;
          height: .8rem;
          border: 1px solid #ccc;
          display: flex;
          align-items: center;
          padding: 0 .1rem;
          justify-content: center;
          font-weight: bold;
        }
        img {
          height: .3rem;
          width: .3rem;
          margin: 0 .2rem;
        }
      }
    }
    }
    .hint_wrap{
      position: absolute;
      @include wh(100%,100%);
      top:0;
      left:0;
      font-size:.32rem;
      color:#333;
      background: rgba(0,0,0,.5);
      z-index: 10;
      .hint_inner{
        position: absolute;
        width:6.8rem;
        left:50%;
        top:40%;
        height:3.2rem;
        @include borderRadius(.3rem);
        @include tf(translateX(-50%));
        background: #fff;

        .h_top{
          font-size:.4rem;
          padding:.4rem .5rem;
          border-bottom:1px solid #ccc;
          p{
            line-height: .5rem;
          }
        }
        .h_bottom{
          @include df;
          span{
            font-size:.36rem;
            @include flex;
            line-height: .9rem;
            text-align: center;
            color:#ccc;
            a{
              color:#549DEE;
              text-decoration: none;
            }
            &:nth-of-type(2){
              border-left:1px solid #ccc;
              color:#549DEE;
            }
          }
        }
      }
    }
  }
</style>
