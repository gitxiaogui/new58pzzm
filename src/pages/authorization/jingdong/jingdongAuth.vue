<template>
  <div id="jingdongAuth">
    <div class="jingdongAuth">
      <div class="titleImg"><img src="../../../assets/img/jingdong.png" alt=""></div>
      <mt-field placeholder="请输入本人京东账号" v-model="formData.phone"  :attr="{maxlength:11}"></mt-field>
      <mt-field placeholder="请输入密码" type="password" v-model="formData.password"></mt-field>
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
import {checkRules} from '../../../common/utils'
import {basicRules} from '../../../common/formRules'
export default {
  props: {},
  components: {},
  data(){
	  return {
      disabled:true,
      loading:false,
      formData: {
        phone: '',
        password: '',
      },
      yanzheng: '重发',
      num: 59,
    }
  },
  methods: {
    submitData(){
      let success = checkRules(this.formData,basicRules)
      if (success){
        this.loading = true
        this.httpRequest.jdPreLogin({
          mobile:this.formData.phone,
          password:this.formData.password
        }).then((res)=>{
          console.log('获取京东登录token',res)
          if(res.code == '00000000'){

            if(res.data.code == '000000' || res.data.code == '000009'){
              this.jdMsgValidate(this.formData.phone,res.data.token)
            }else if(res.data.code == '000001'){
              sessionStorage.setItem('jingdong',this.phone)
              this.$router.push({path:'/jingdongCode',query:{token:res.data.token}})
            }else{
              this.toast(res.data.message)
            }
          }
          this.loading = false
        }).catch((err)=>{
          this.loading = false
        })
      }
    },
  },
  created(){

  },
  activated(){
    localStorage.setItem('headerTitle','京东认证')
  }
}
</script>

<style lang="scss" >
@import "../../../assets/style/mixin";
  #jingdongAuth {
    @include wh(100%, 100%);
    background: #F2F2F2;
    padding: 1.6rem .3rem;
    text-align: center;
    .jingdongAuth {
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
      .mint-cell-wrapper{
        padding:0;
        border-bottom:1px solid $orange;
      }
      .btn {
        font-size: .36rem;
        margin-top:.6rem;
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
