<template>
<div id="helpCenter">
  <ul class="helpCenter">
    <li v-for="(item,index) in helpList" :key="index">
      <p>{{ item.name }}</p>
      <span v-html="item.content"></span>
    </li>
  </ul>
  <div class="hint"></div>
</div>
</template>

<script>
export default {
  props: {},
  components: {},
  data(){
	  return {
	    helpList:[
	      {name:'登录验证码收不到？',content:'由于线上申请人数过多，请稍后重试。'},
	      {name:'认证项目具体有哪些？',content:'有三项：实名认证、运营商、电商（饿了么、京东、淘宝）【温馨提示】三项全部认证完成，才可下款哦'},
	      {name:'身份证上传失败？',content:'身份证：拍摄时，与身份证距离不宜过远；背景图尽量保持深色背景；'},
	      {name:'运营商为什么认证失败？',content:'由于线上申请人数过多，如遇此情况，请勿频繁操作，稍后重试即可。'},
	      {name:'审核时间大约多久？',content:'当天即可审核完成，如遇节假日稍有延迟，烦请耐心等待。'},
	      {name:'为什么审核失败？',content:'系统自动审核，如审核失败，请保持良好借款记录，31天后重新申请^_^'},
	      {name:'放款时间多久？',content:'审核通过后，请确认已绑定银行卡，1个工作日内放款。'},
	      {name:'如何查看申请进度？',content:'在应用内点击【我的】——【申请进度】，即可查看。'},
	      {name:'如何查看订单信息？',content:'在应用内点击【我的】——【我的订单】，即可查看。'},
	      {name:'联系我们',content:'如遇其它问题，请直接在微信内搜索“zaixiankefu10”添加58掌柜官方客服，我们会在第一时间回复您，祝您生活愉快！<br/>客服工作时间：周一至周五9:30——18:30'}
	      ]
    }
  },
  methods: {},
  created(){

  },
  activated(){
     localStorage.setItem('headerTitle','帮助中心')
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/mixin';
  #helpCenter{
    @include wh(100%,auto);
    padding:1rem 0 0;
    .helpCenter{
      @include wh(100%,auto);
      padding:0 .3rem;
      li{
        font-size:.3rem;
        padding:.4rem 0 .3rem 0;
        border-bottom:1px solid #999;
        &:nth-last-of-type(1){
          border:none;
        }
        p{
          padding-bottom:.26rem;
        }
        span{
          color:#999;
          font-size:.28rem;
        }
      }
    }
    .hint{
      @include wh(100%,.2rem);
      background: #f1f1f1;
    }
  }
</style>
