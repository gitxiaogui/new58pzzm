<template>
  <div id="operatorAuthPassword">
    <div class="operatorAuthPassword">
      <div class="title">您的服务密码是？</div>
      <div class="input">
        <mt-field placeholder="请输入手机号服务密码" type="tel" v-model="password"></mt-field>
      </div>
      <div class="notice">如忘记服务密码，请拨打对应运营商进行重置：<br/>电信：1000，移动：10086，联通10000</div>
      <div class="btn">
        <mt-button type="primary" @click="nextStop" :disabled="loading">
          <mt-spinner v-if="loading" type="triple-bounce" :size="24"></mt-spinner>
          <span v-if="!loading">下一步</span>
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
          <span>如需帮助请拨打人工客服：<br/>400-164-5268</span>
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
        loading: false,
        token: '',
        common: false,
      }
    },
    methods: {
      nextStop(){
        if (!this.password) {
          this.toast('请输入手机服务密码')
          return
        }
        this.loading = true
        this.httpRequest.operatorLogin({
          phone: this.phone,
          password: this.password
        }).then((res) =>{
          console.log('运营商登录>>>>>>>', res)
          this.loading = false
          if (res.code == '00000000') {
            switch (res.data.code) {
              case '0002':
                this.toast('请输入短信验证码')
                this.$router.push({
                  path: '/operatorAuthCode',
                  query: {password: this.password, token: res.data.token, val_passwordType: '0'}
                })
                break
              case '0003':
                this.toast('请输入查询密码')
                this.$router.push({
                  path: '/operatorAuthCode',
                  query: {password: this.password, token: res.data.token, val_passwordType: '1'}
                })
                break
              case '0000':
                this.toast('授权成功')
                this.queryReport(res.data.token)
                break
              case '0009':
                this.toast('系统繁忙，请稍后重试')
                break
            }
          }
        }).catch((err) =>{
          this.loading = false
        })
      },
      showCommon(){
        this.common = true
      },
      closeCommon(){
        this.common = false
      },
    },
    created(){

    },
    activated(){
      this.phone = sessionStorage.getItem('operator')
      localStorage.setItem('headerTitle', '运营商认证')
    }
  }
</script>

<style lang="scss">
  @import "../../../assets/style/mixin";

  #operatorAuthPassword {
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
        background: #fff;
        padding: 0 .5rem;
        border: 1px solid #ccc;
        @include wh(100%, 100%);
        color: #333;
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
    .operatorAuthPassword {
      padding: 1.4rem .45rem;
      @include wh(100%, 100%);
      @include borderRadius(.4rem);
      background: #fff;
      .input {
        border-bottom: 1px solid $orange;
        margin: 1rem 0 0;
        font-size: .36rem;
        .mint-cell-wrapper {
          padding: 0 .8rem;
          input::-ms-input-placeholder {
            text-align: center;
          }
          input::-webkit-input-placeholder {
            text-align: center;
          }
          .mint-field-core {
            text-align: center;
          }
        }
      }
      .notice {
        font-size: .28rem;
        text-align: left;
        margin: .4rem 0 .8rem;
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
