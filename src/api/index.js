import axios from 'axios'
import VUE from '../main'
import {Toast} from 'mint-ui'

axios.interceptors.request.use(function (config){
  // 在发送请求之前做些什么
  config.headers['Access-Control-Allow-Origin'] = '*'
  config.headers['Access-Control-Allow-Headers'] = '*'
  config.headers['Access-Control-Allow-Methods'] = '*'
  config.headers['X-Powered-By'] = '3.2.1'
  if (config.headers['Content-Type'] === 'undefined') {
    // console.log(config.headers['Content-Type'])
    config.headers.delete('Content-Type')
  } else {
    config.headers['Content-Type'] = 'application/json;charset=utf-8'
  }
  if (sessionStorage.getItem('authorization')) {
    config.headers['X-Authorization'] = sessionStorage.getItem('authorization')
  }
  console.log(config)
  return config
}, function (error){
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response){
  // 对响应数据做点什么
  console.log('对响应数据做点什么', response)
  if (response.data.code !== '00000000') {
    if (response.data.message) {
      Toast({
        message: response.data.message,
        position: 'top',
        duration: 1500
      })
    }
    if(response.data.code == '1000401'){
      VUE.$router.push('/loginCode')
    }
  }
  return response.data
}, function (error){
  // 对响应错误做点什么
  console.log(error.response)
  if (error.response.data.code === '700005') {
    Toast({
        message: '登陆状态超时或者未获得权限,返回登陆。',
        position: 'top',
        duration: 1500
      })
    VUE.$router.push('/login')
  }
  Toast({
        message: error.response.data.message,
        position: 'top',
        duration: 1500
      })
  return Promise.reject(error)
})
//TODO 短信验证码登录
export const captchaLogin = (data) =>{
  let instance = axios.create()
  sessionStorage.removeItem('authorization')
  instance.interceptors.response.use(function (response){
    // 对响应数据做点什么
    console.log('对响应数据做点什么',response)
    if (response.data.data) {
      sessionStorage.setItem('authorization', response.data.data)
    }
    if (response.data.code !== '00000000') {
      Toast({
        message: response.data.message,
        position: 'top',
        duration: 1500
      })
    }
    return response.data
  }, function (error){
    // 对响应错误做点什么
    Toast({
      message: error.response.data.message,
      position: 'top',
      duration: 1500
    })
    return Promise.reject(error)
  })
  return instance({
    method: 'POST',
    url: '/innercustomer/user/baseinfo/captchaLogin',
    data
  })
}

//TODO 用户密码登录
export const passwordLogin = (data) =>{
  let instance = axios.create()
  sessionStorage.removeItem('authorization')
  instance.interceptors.response.use(function (response){
    // 对响应数据做点什么
    if (response.data.data) {
      sessionStorage.setItem('authorization', response.data.data)
    }
    if (response.data.code !== '00000000') {
      Toast({
        message: response.data.message,
        position: 'top',
        duration: 1500
      })
    }
    return response.data
  }, function (error){
    // 对响应错误做点什么
    Toast({
      message: error.response.data.message,
      position: 'top',
      duration: 1500
    })
    return Promise.reject(error)
  })
  return instance({
    method: 'POST',
    url: '/innercustomer/user/baseinfo/passwordLogin',
    data
  })
}

//TODO 用户登录获取短信验证码
export const getCaptcha = (data) =>{
  return axios({
    method: 'GET',
    url: '/innercustomer/user/baseinfo/getCaptcha',
    params: data
  })
}
//TODO 获取图片验证码
export const getCodeImg = (data) =>{
  return axios({
    method: 'POST',
    url: '/innercustomer/user/baseinfo/code',
    data
  })
}
//TODO 对比图片验证码
export const checkValidate = (data) =>{
  return axios({
    method: 'POST',
    url: '/innercustomer/user/baseinfo/checkValidate',
    data
  })
}

//TODO 用户忘记密码短信验证码
export const getRegisteRcaptcha = (data) =>{
  return axios({
    method: 'GET',
    url: '/innercustomer/user/baseinfo/getRegisteRcaptcha',
    params: data
  })
}

//TODO 用户忘记密码提交
export const forgetPassword = (data) =>{
  return axios({
    method: 'POST',
    url: '/innercustomer/user/baseinfo/forgetPassword',
    data
  })
}


//TODO 是否设置密码
export const checkPassword = (data) =>{
  return axios({
    method: 'POST',
    url: '/customer/user/baseinfo/checkPassword',
    data
  })
}
//TODO 获取银行卡列表
export const getBankList = (data) =>{
  return axios({
    method: 'POST',
    url: '/customer/bank/getBankList',
    data
  })
}
//TODO 添加银行卡获取短信验证码
export const addBankCard = (data) =>{
  return axios({
    method: 'POST',
    url: '/customer/bank/addBankCard',
    data
  })
}
//TODO  添加银行卡验证短信验证码
export const bindCardValMsg = (data) =>{
  return axios({
    method: 'POST',
    url: '/customer/bank/bindCardValMsg',
    data
  })
}
//TODO  添加银行卡重发短信验证码
export const bindCardSendMsg = (data) =>{
  return axios({
    method: 'POST',
    url: '/customer/bank/bindCardSendMsg',
    data
  })
}
//TODO  修改密码
export const updatePassword = (data) =>{
  return axios({
    method: 'POST',
    url: '/customer/user/baseinfo/updatePassword',
    data
  })
}
//TODO  首页banner
export const appGetBanners = (data) =>{
  return axios({
    method: 'POST',
    url: '/innercustomer/banner/appGetBanners',
    data
  })
}
//TODO  获取首页额度
export const getLimitMoney = (data) =>{
  return axios({
    method: 'POST',
    url: '/innercustomer/homePage/init/getLimitMoney',
    data
  })
}
//TODO  获取首页速报列表
export const queryQuickList = (data) =>{
  return axios({
    method: 'POST',
    url: '/innercustomer/quickReport/query',
    data
  })
}
//TODO  登录后首页显示状态
export const loginHomePage = (data) =>{
  return axios({
    method: 'POST',
    url: '/customer/auth/loginHomePage',
    data
  })
}
//TODO  登录后首页显示可申请额度
export const getHomeQuery = (data) =>{
  return axios({
    method: 'POST',
    url: '/customer/product/query',
    data
  })
}
//TODO  认证页获取列表
export const authQuery = (data) =>{
  return axios({
    method: 'POST',
    url: '/customer/auth/query',
    data
  })
}
//TODO  查询是否实名认证
export const queryRealAuth = (data) =>{
  return axios({
    method: 'POST',
    url: '/customer/auth/queryRealAuth',
    data
  })
}
//TODO  首页继续认证
export const continueAuth = (data) =>{
  return axios({
    method: 'POST',
    url: '/customer/auth/continueAuth',
    data
  })
}
//TODO  获取借钱详细信息
export const getProductDetail = (data) =>{
  return axios({
    method: 'POST',
    url: '/customer/product/getProductDetail',
    data
  })
}
//TODO  借钱详细信息确认按钮
export const sureLenderCase = (data) =>{
  return axios({
    method: 'POST',
    url: '/customer/lenderCase/sureLenderCase',
    data
  })
}

//TODO  运营商授权登录
export const operatorLogin = (data) =>{
  return axios({
    method: 'POST',
    url: '/customer/dataSource/operator/operatorLogin',
    data
  })
}
//TODO  运营商获去报告
export const queryReport = (data) =>{
  return axios({
    method: 'POST',
    url: '/customer/dataSource/operator/queryReport',
    data
  })
}

//TODO  运营商重发短信
export const sendMsg = (data) =>{
  return axios({
    method: 'POST',
    url: '/customer/dataSource/operator/sendMsg',
    data
  })
}
//TODO  运营商校验短信验证码
export const valMsgPass = (data) =>{
  return axios({
    method: 'POST',
    url: '/customer/dataSource/operator/valMsgPass',
    data
  })
}

//TODO  饿了么登录获取token
export const preLogin = (data) =>{
  return axios({
    method: 'POST',
    url: '/customer/dataSource/eleme/preLogin',
    data
  })
}

//TODO  饿了么获取验证码
export const eleSendMsg = (data) =>{
  return axios({
    method: 'POST',
    url: '/customer/dataSource/eleme/sendMsg',
    data
  })
}
//TODO  饿了么短信校验
export const msgValidate = (data) =>{
  return axios({
    method: 'POST',
    url: '/customer/dataSource/eleme/msgValidate',
    data
  })
}
//TODO  京东登录获取token
export const jdPreLogin = (data) =>{
  return axios({
    method: 'POST',
    url: '/customer/dataSource/jd/jdPreLogin',
    data
  })
}
//TODO  京东发送短信验证码
export const jdSendMsg = (data) =>{
  return axios({
    method: 'POST',
    url: '/customer/dataSource/jd/jdSendMsg',
    data
  })
}
//TODO  京东短信校验获取报告
export const jdMsgValidate = (data) =>{
  return axios({
    method: 'POST',
    url: '/customer/dataSource/jd/jdMsgValidate',
    data
  })
}
//TODO  淘宝登录
export const taoBaoPreLogin = (data) =>{
  return axios({
    method: 'POST',
    url: '/customer/dataSource/taoBao/preLogin',
    data
  })
}
//TODO  淘宝获取验证码
export const taoBaoSendMsg = (data) =>{
  return axios({
    method: 'POST',
    url: '/customer/dataSource/taoBao/sendMsg',
    data
  })
}


//TODO  淘宝获取报告
export const taobaoMsgValidate = (data) =>{
  return axios({
    method: 'POST',
    url: '/customer/dataSource/taoBao/msgValidate',
    data
  })
}

//TODO  上传图片
export const uploadFile = (data) =>{
  return axios({
    method: 'POST',
    url: '/customer/auth/uploadFile',
    data
  })
}
//TODO  上传身份证照
export const ocrAuth = (data) =>{
  return axios({
    method: 'POST',
    url: '/customer/auth/ocrAuth',
    data
  })
}

//TODO  照片实名认证
export const identityCompare = (data) =>{
  return axios({
    method: 'POST',
    url: '/customer/auth/identityCompare',
    data
  })
}
//TODO  生成订单
export const addLenderCase = (data) =>{
  return axios({
    method: 'POST',
    url: '/customer/lenderCase/addLenderCase',
    data
  })
}
//TODO  导流注册用户
export const register = (data) =>{
  return axios({
    method: 'POST',
    url: '/innercustomer/user/baseinfo/register',
    data
  })
}
//TODO 获取微信信息
export const getWechatSignature = (data)=>{
  return axios ({
	method:'GET',
	url:'/innercustomer/wechat/getWechatSignature',
	params: data
  })
}
//TODO  埋点保存用户信息
export const saveInLog = (data) =>{
  return axios({
    method: 'POST',
    url: '/innercustomer/user/baseinfo/saveInLog',
    data
  })
}
//TODO  获取借款信息 借款列表
export const queryWaitLenderCase = (data) =>{
  return axios({
    method: 'POST',
    url: '/customer/lenderCase/queryWaitLenderCase',
    data
  })
}
//TODO  获取进度信息
export const getLendCaseProcess = (data) =>{
  return axios({
    method: 'POST',
    url: '/customer/process/getLendCaseProcess',
    data
  })
}
//TODO  查看是否实名认证过
export const validAuth = (data) =>{
  return axios({
    method: 'POST',
    url: '/customer/auth/validAuth',
    data
  })
}
//TODO  点击还款
export const returnMoney = (data) =>{
  return axios({
    method: 'POST',
    url: '/customer/lenderCase/returnMoney',
    data
  })
}

//TODO  添加设备信息
export const addDeviceInfo = (data) =>{
  return axios({
    method: 'POST',
    url: '/customer/deviceInfo/addDeviceInfo',
    data
  })
}

//TODO  老客复借重新生成待用户确认订单
export const updateLenderCaseId = (data) =>{
  return axios({
    method: 'POST',
    url: '/customer/lenderCase/updateLenderCaseId',
    data
  })
}
//TODO  查询是否有实名认证
export const existCaseInfo = (data) =>{
  return axios({
    method: 'POST',
    url: '/customer/lenderCase/existCaseInfo',
    data
  })
}
