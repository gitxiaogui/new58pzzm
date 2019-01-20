import {getWechatSignature} from '../api/index'
import weChatImg from '../assets/img/logo.png'
import wx from 'weixin-js-sdk'

export const getSign = function (){
  return getWechatSignature({
    url: window.location.href.split('#')[0]
  }).then((res) =>{
    console.log('获取签名', res)
    // 获取签名
    wx.config({
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: res.data.appid, // 必填，公众号的唯一标识
      timestamp: res.data.timestamp, // 必填，生成签名的时间戳
      nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
      signature: res.data.signature, // 必填，签名，见附录1
      jsApiList: [
        'onMenuShareAppMessage',
        'onMenuShareTimeline',
        'onMenuShareQQ',
        'onMenuShareQZone',
        'closeWindow'
      ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    })
  })
}

export const wxShare = (title, desc, link, sucFn, failFn) =>{
  getSign()
  wx.ready(() =>{
    //朋友
    wx.onMenuShareAppMessage({
      title, // 分享标题
      desc,
      link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: 'http://' + window.location.host + weChatImg, // 分享图标
      success: function (){
        // 用户确认分享后执行的回调函数
        sucFn ? sucFn() : alert('分享成功')
      },
      cancel: function (){
        // 用户取消分享后执行的回调函数
        failFn ? failFn() : alert('取消分享')
      }
    })

    //朋友圈
    wx.onMenuShareTimeline({
      title, // 分享标题
      desc,
      link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: 'http://' + window.location.host + weChatImg, // 分享图标
      success: function (){
        // 用户确认分享后执行的回调函数
        sucFn ? sucFn() : alert('分享成功')
      },
      cancel: function (){
        // 用户取消分享后执行的回调函数
        failFn ? failFn() : alert('取消分享')
      }
    })
    //分享到QQ
    wx.onMenuShareQQ({
      title, // 分享标题
      desc,
      link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: 'http://' + window.location.host + weChatImg, // 分享图标
      success: function (){
        // 用户确认分享后执行的回调函数
        sucFn ? sucFn() : alert('分享成功')
      },
      cancel: function (){
        // 用户取消分享后执行的回调函数
        failFn ? failFn() : alert('取消分享')
      }
    })

    //分享到QQ空间
    wx.onMenuShareQZone({
      title, // 分享标题
      desc,
      link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: 'http://' + window.location.host + weChatImg, // 分享图标
      success: function (){
        // 用户确认分享后执行的回调函数
        sucFn ? sucFn() : alert('分享成功')
      },
      cancel: function (){
        // 用户取消分享后执行的回调函数
        failFn ? failFn() : alert('取消分享')
      }
    })
  })
}
