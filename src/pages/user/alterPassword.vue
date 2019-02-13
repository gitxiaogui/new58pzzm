<template>
<div id="alterPassword">
  <div class="alterPassword">
      <div class="input">
        <mt-field placeholder="请输入旧密码" type="password" :attr="{maxlength:12,minlength:6}" v-model="formData.oldPassWord"></mt-field>
      </div>
    <div class="input">
      <mt-field placeholder="请输入新密码" type="password" :attr="{maxlength:12,minlength:6}" v-model="formData.newPassWord"></mt-field>
    </div>
    <div class="input">
      <mt-field placeholder="请再次输入新密码" type="password" :attr="{maxlength:12,minlength:6}" v-model="formData.surePassWord"></mt-field>
    </div>
    <div class="notice">
      密码需有6-12位数字、字母组合
    </div>
    <div class="btn">
      <mt-button type="primary" @click="submitData" :disabled="loading">
        <mt-spinner v-if="loading" type="triple-bounce" :size="24"></mt-spinner>
        <span v-if="!loading">完成</span>
      </mt-button>
    </div>
    <p><span>注</span>:第一次设置登录密码的新用户，无需填写旧密码，直接设置新密码即可。</p>
  </div>
</div>
</template>

<script>
import { checkRules} from '../../common/utils'
import { basicRules} from '../../common/formRules'

export default {
  props: {},
  components: {},
  data(){
	  return {
	    formData:{
	      oldPassWord: '',
        newPassWord: '',
        surePassWord: ''
      },
      loading: false,
    }
  },
  methods: {
    submitData(){
      let success = checkRules(this.formData,basicRules)
      if (success){
        if(this.formData.oldPassWord == this.formData.newPassWord){
          this.toast('新旧密码不可设置相同')
          return
        }
        if(this.formData.newPassWord != this.formData.surePassWord){
          this.toast('两次密码不一样')
          return
        }
        this.loading = true
        this.httpRequest.updatePassword(this.formData).then((res)=>{
          console.log('修改密码',res)
          if(res.code == '00000000'){
            this.Toast({
            message: '修改成功',
            position: 'top',
            duration: 1500
          })
            sessionStorage.removeItem('authorization')
            this.$router.push('loginPassword')
          }
          this.loading = false
        }).catch((err)=>{
          this.loading = false
        })
      }
    }
  },
  created(){

  },
  activated(){
    localStorage.setItem('headerTitle','修改登录密码')
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/mixin';
  #alterPassword{
    @include wh(100%,100%);
    padding:1rem .7rem 0;
    .alterPassword{
      .input{
        border-bottom:1px solid #ddd;
      }
      .notice{
        font-size:.26rem;
        margin:.4rem 0 .9rem 0;
        color:#999;
      }
      .btn {
          font-size: .36rem;
          span {
            color: #fff;
          }
          .mint-button {
            @include wh(100%,.8rem);
            background: $orange;
          }
        }
      p{
        margin-top:.2rem;
        line-height:.36rem;
        color:#999;
        font-size:.26rem;
        span{
          color: $orange;
        }
      }
    }
  }
</style>
