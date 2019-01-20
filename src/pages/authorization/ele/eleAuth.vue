<template>
  <div id="eleAuth">
    <div class="eleAuth">
      <div class="title">您的手机号是？</div>
      <div class="input">
        <mt-field placeholder="请输入本人饿了么手机号" type="tel" v-model="phone" :attr="{maxlength:11}"></mt-field>
      </div>
      <div class="btn">
          <mt-button type="primary" @click="nextStop" :disabled="loading">
            <mt-spinner v-if="loading" type="triple-bounce" :size="24"></mt-spinner>
            <span v-if="!loading">下一步</span>
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
    }
  },
  methods: {
    nextStop(){
      this.loading = true
      sessionStorage.setItem('ele',this.phone)
      this.httpRequest.preLogin({
        mobile: this.phone
      }).then((res)=>{
        console.log('获取饿了么登录')
        this.loading = false
        if(res.code == '00000000'){
          if(res.data.code == '000000' || res.data.code == '000009'){
            this.eleMsgValidate(this.phone,res.data.token)
          }else if(res.data.code == '000001'){
            sessionStorage.setItem('ele',this.phone)
            this.$router.push({path:'/eleAuthCode',query:{token:res.data.token}})
          }else{
            this.toast(res.data.message)
          }
        }
      }).catch((err)=>{
        this.loading = false
      })

    }
  },
  created(){

  },
  activated(){
    localStorage.setItem('headerTitle','饿了么认证')
  }
}
</script>

<style lang="scss" >
@import "../../../assets/style/mixin";
  #eleAuth {
    @include wh(100%, 100%);
    background: #F2F2F2;
    padding: 1.6rem .3rem;
    text-align: center;
    .eleAuth {
      padding: 1.4rem .45rem;
      @include wh(100%, 100%);
      @include borderRadius(.4rem);
      background: #fff;
      .input {
        font-size:.36rem;
        border-bottom: 1px solid $orange;
        margin: 1rem 0;
        .mint-cell-wrapper{
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
