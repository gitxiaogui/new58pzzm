// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUi from 'mint-ui'
import 'mint-ui/lib/style.css'
import * as httpRequest from './api/index'



// import FastClick from 'fastclick'
import es6Promise from 'es6-promise'
Vue.config.productionTip = false
// FastClick.attach(document.body)
es6Promise.polyfill()

Vue.use(MintUi)
Vue.prototype.httpRequest = httpRequest
Vue.prototype.Toast = MintUi.Toast
Vue.prototype.toast = function(message){
  MintUi.Toast({
    message: message,
    position: 'top',
    duration: 1500
  })
}

// 运营商获取报告
Vue.prototype.queryReport = function(token){
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
  })
}
Vue.prototype.eleMsgValidate = function(phone,token){
  this.httpRequest.msgValidate({
    account: phone,
    captcha: '',
    dataSourceCode: 'eleme',
    token: token
  }).then((res) =>{
    console.log('饿了么短信校验')
    if (res.code == '00000000') {
      if (sessionStorage.getItem('shopList')){
        this.jixuAuth()
      } else {
        this.$router.push('/authorization')
      }
    }
  })
}
// 京东获取报告
Vue.prototype.jdMsgValidate = function(phone,token){
  this.httpRequest.jdMsgValidate({
    account: phone,
    dataSourceCode: 'jingdong',
    token: token,
    captcha:''
  }).then((res)=>{
    console.log('获取运营商报告信息>>>>>>>',res)
    if (res.code == '00000000'){
      this.toast('授权成功')
      if (sessionStorage.getItem('shopList')){
        this.jixuAuth()
      } else {
        this.$router.push('/authorization')
      }
    }
  })
}

// 淘宝获取报告
Vue.prototype.taobaoMsgValidate = function(phone,token){
  this.httpRequest.taobaoMsgValidate({
    account: phone,
    dataSourceCode: 'taoBao',
    token: token,
    captcha:''
  }).then((res)=>{
    console.log('获取运营商报告信息>>>>>>>',res)
    if (res.code == '00000000'){
      this.toast('授权成功')
      if (sessionStorage.getItem('shopList')){
        this.jixuAuth()
      } else {
        this.$router.push('/authorization')
      }
    }
  })
}



// 继续认证
Vue.prototype.jixuAuth =  function(){
  this.httpRequest.continueAuth({
    proId:''
  }).then((res)=>{
    console.log('查看继续认证信息',res)
    if(res.code == '00000000'){
      switch (res.data.status){
        case 1:
          if(res.data.data.data_source_code=='hulu'){
            sessionStorage.setItem('hulu',res.data.data.data_source_code)
            this.$router.push({path:'/operatorAuth',query:{data_source_code: res.data.data.data_source_code}})
          }
          break
        case 2:
          sessionStorage.setItem('shopList',JSON.stringify(res.data.data))
          this.$router.push('/checkShop')
          break
        case 3:
          this.$router.push('/main')
          this.toast('授权已完成，请耐心等待审核')
          break
      }
    }
  })
}











/* eslint-disable no-new */
let VUE = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

export default VUE
