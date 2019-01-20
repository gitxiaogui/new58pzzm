import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)
let routes = [
  {
    path: '',
    redirect:'/main'
  },
  {
    path: '/main', // 主页
    name: 'main',
    component: resolve =>require(['@/pages/home/home'],resolve)
  },
  {
    path: '/loginCode', // 验证码登录
    name: 'login',
    component: resolve =>require(['@/pages/login/loginCode'],resolve)
  },
  {
    path: '/loginPassword', // 手机密码登录
    name: 'loginPassword',
    component: resolve =>require(['@/pages/login/loginPassword'],resolve)
  },
  {
    path: '/forgetPassword', // 忘记密码
    name: 'forgetPassword',
    component: resolve =>require(['@/pages/login/forgetPassword'],resolve)
  },
  {
    path:'/borrowMoney', // 借款
    name:'borrowMoney',
    component:resolve =>require(['@/pages/borrowMoney/borrowMoney'],resolve)
  },
  {
    path:'/addBank',// 添加银行卡
    name:'addBank',
    component:resolve=>require(['@/pages/bank/addBank'],resolve)
  },
  {
    path:'/bankList', // 银行卡列表
    name:'bankList',
    component:resolve =>require(['@/pages/bank/bankList'],resolve)
  },
  {
    path:'/user', // 用户界面
    name:'user',
    component: resolve =>require(['@/pages/user/user'],resolve)
  },
  {
    path:'/alterPassword', // 修改密码
    name:'alterPassword',
    component: resolve =>require(['@/pages/user/alterPassword'],resolve)
  },

  {
    path:'/contactKefu', // 联系客户
    name:'contactKefu',
    component:resolve =>require(['@/pages/user/contactKefu'],resolve)
  },
  {
    path:'/applyForPlan', // 借款进度
    name:'applyForPlan',
    component:resolve =>require(['@/pages/user/applyForPlan'],resolve)
  },
  {
    path:'/setting', // 设置
    name:'setting',
    component:resolve =>require(['@/pages/user/setting'],resolve)
  },
  {
    path:'/helpCenter', // 帮助
    name:'helpCenter',
    component:resolve =>require(['@/pages/user/helpCenter'],resolve)
  },
  {
    path:'/returnMoney', // 还款界面
    name:'returnMoney',
    component:resolve =>require(['@/pages/returnMoney/returnMoney'],resolve)
  },
  {
    path:'/affirmReturnMoney', // 还款订单确认
    name:'affirmReturnMoney',
    component:resolve =>require(['@/pages/returnMoney/affirmReturnMoney'],resolve)
  },
  {
    path:'/orderDetail', // 还款订单详情
    name:'oederDetail',
    component:resolve =>require(['@/pages/returnMoney/orderDetail'],resolve)
  },
  {
    path: '/authorization',// 认证界面
    name: 'authorization',
    component:resolve =>require(['@/pages/authorization/authorization'],resolve)
  },
  {
    path: '/checkShop',// '电商选择'
    name: 'checkShop',
    component:resolve =>require(['@/pages/authorization/checkShop'],resolve)
  },
  {
    path:'/operatorAuth',// 运营商授权输入手机号
    name: 'operatorAuth',
    component:resolve =>require(['@/pages/authorization/operator/operatorAuth'],resolve)
  },
  {
    path:'/operatorAuthPassword',// 运营商授权输入密码
    name: 'operatorAuthPassword',
    component:resolve =>require(['@/pages/authorization/operator/operatorAuthPassword'],resolve)
  },
  {
    path:'/operatorAuthCode',// 运营商授权输入验证码
    name: 'operatorAuthCode',
    component:resolve =>require(['@/pages/authorization/operator/operatorAuthCode'],resolve)
  },
  {
    path:'/eleAuth',// 饿了么授权输入手机号
    name: 'eleAuth',
    component:resolve =>require(['@/pages/authorization/ele/eleAuth'],resolve)
  },
  {
    path:'/eleAuthCode',// 饿了么授权输入验证码
    name: 'eleAuthCode',
    component:resolve =>require(['@/pages/authorization/ele/eleAuthCode'],resolve)
  },
  {
    path:'/jingdongAuth',// 输入京东账号
    name: 'jingdongAuth',
    component:resolve =>require(['@/pages/authorization/jingdong/jingdongAuth'],resolve)
  },
  {
    path:'/jingdongCode',// 输入京东账号验证码
    name: 'jingdongCode',
    component:resolve =>require(['@/pages/authorization/jingdong/jingdongCode'],resolve)
  },
  {
    path:'/taobaoAuth',// 输入淘宝账号
    name: 'taobaoAuth',
    component:resolve =>require(['@/pages/authorization/taobao/taobaoAuth'],resolve)
  },
  {
    path:'/taobaoCode',// 输入淘宝账号验证码
    name: 'taobaoCode',
    component:resolve =>require(['@/pages/authorization/taobao/taobaoCode'],resolve)
  },
  {
    path:'/realAuth',// 实名认证
    name: 'realAuth',
    component:resolve =>require(['@/pages/authorization/realAuth/realAuth'],resolve)
  },
  {
    path:'/peopleImg',// 上传个人正面照
    name: 'peopleImg',
    component:resolve =>require(['@/pages/authorization/realAuth/peopleImg'],resolve)
  },
  {
    path:'/home',// 导流注册界面
    name: 'home',
    component:resolve =>require(['@/pages/riverDiversionLogin/main'],resolve)
  },
  {
    path:'/loginSuccess',// 导流注册成功界面
    name: 'loginSuccess',
    component:resolve =>require(['@/pages/riverDiversionLogin/loginSuccess'],resolve)
  },
  {
    path:'/loginDeal',// 注册协议
    name: 'loginDeal',
    component:resolve =>require(['@/pages/login/loginDeal'],resolve)
  }
]
let router = new Router({
  routes
})



export default router
