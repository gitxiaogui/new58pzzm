<template>
  <div id="home">
    <ToastHome v-if="showToastHome"></ToastHome>
    <YuqiHome v-if="showYuqiHome" :days="days"></YuqiHome>
    <div class="home">
        <!--------------------------------轮播------------------------------------->
      <div class="banner">
        <mt-swipe :auto="3000">
          <mt-swipe-item v-for="(item,index) in bannerList" :key="index"><img @click="goBannerUrl(item.bannerUrl)" :src="item.bannerImgUrl" alt=""></mt-swipe-item>
        </mt-swipe>
      </div>
      <div class="content">
        <!--------------------------------查看我的额度------------------------------------->
        <div class="content_inner one" v-if="authStatus==0">
          <div class="title">现金短贷-灵活借还</div>
          <div class="edu">最高可借额度（元）</div>
          <div class="price">{{ limitMoney }}</div>
          <mt-button @click="btnZero" type="default">查看我的额度</mt-button>
        </div>
        <!--------------------------------继续认证-生成订单----------------------------------------->
        <div class="content_inner two" v-if="authStatus==1">
          <div class="title">现金短贷-灵活借还</div>
          <div class="edu">可借额度（元）</div>
          <div class="price">{{ basicAmount }}</div>
          <mt-button @click="btnOne" type="default">继续认证</mt-button>
        </div>
        <!--------------------------------审核中----------------------------------------->
        <div class="content_inner three"  v-if="authStatus==2">
          <div class="title">现金短贷-灵活借还</div>
          <img src="../../assets/img/money-home.png" alt="">
          <div class="money">一大波钞票正向你涌来~</div>
          <mt-button @click="btnTwo" type="default">审核中</mt-button>
        </div>
        <!--------------------------------审核未通过-------------------------------------->
        <div class="content_inner four"  v-if="authStatus==3">
          <div class="title">现金短贷-灵活借还</div>
          <img class="jujue" src="../../assets/img/jujue.png" alt="">
          <div class="xinyong">请保持良好信用，1个月后再来申请~</div>
          <mt-button class="disabled"  type="default">马上拿钱</mt-button>
        </div>
        <!--------------------------------继续认证------------------------------------------>
        <div class="content_inner two" v-if="authStatus==4">
          <div class="title">现金短贷-灵活借还</div>
          <div class="edu">可借额度（元）</div>
          <div class="price">{{ basicAmount }}</div>
          <mt-button @click="btnFour" type="default">继续认证</mt-button>
        </div>
        <!--------------------------------认证资料被驳回---------------------------------->
        <!--<div class="content_inner four"  v-if="authStatus==4">
          <div class="title">现金短贷-灵活借还</div>
          <img src="../../assets/img/renzheng-home.png" alt="">
          <div class="xinyong">认证资料被驳回</div>
          <mt-button  @click="btnFive" type="default">重新认证</mt-button>
        </div>-->
        <!-------------------------------------有未结清账单----------------------------------------->
        <div class="content_inner two"  v-if="authStatus==6">
          <div class="title">现金短贷-灵活借还</div>
          <div class="edu">可借额度（元）</div>
          <div class="price">{{ basicAmount }}</div>
          <mt-button @click="btnSix" type="default">马上拿钱</mt-button>
        </div>
        <!--------------------------------审核通过---------------------------------------->
        <div class="content_inner two"  v-if="authStatus==8">
          <div class="title">现金短贷-灵活借还</div>
          <div class="edu">可借额度（元）</div>
          <div class="price">{{ basicAmount }}</div>
          <mt-button @click="btnEight" type="default">马上拿钱</mt-button>
        </div>
        <!--------------------------------等待放款状态---------------------------------------->
        <div class="content_inner two"  v-if="authStatus==9">
          <div class="title">现金短贷-灵活借还</div>
          <div class="edu">可借额度（元）</div>
          <div class="price">{{ basicAmount }}</div>
          <mt-button @click="btnNine" type="default">马上拿钱</mt-button>
        </div>
        <!--------------------------------等待放款状态---------------------------------------->
        <div class="content_inner two"  v-if="authStatus==10">
          <div class="title">现金短贷-灵活借还</div>
          <div class="edu">可借额度（元）</div>
          <div class="price">{{ basicAmount }}</div>
          <mt-button @click="btnTen" type="default">马上拿钱</mt-button>
        </div>
      </div>
      <!-------------------------------------速报----------------------------------------->
      <div class="subao">
        <div class="marquee_box">
          <ul class="marquee_list" :class="{marquee_top:animate}">
            <li v-for="(item, index) in quickList" :key="index">
              <img src="../../assets/img/subao.png" alt=""><span>{{ item.quickReportStr }} </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ToastHome from '@/components/toastHome'
import YuqiHome from '@/components/yuqiHome'
import BUS from '../../vueBus/index'
import { formatMoney } from '../../common/utils'
export default {
  props: {},
  components: {
    ToastHome,
    YuqiHome
  },
  data(){
    return {
      showToastHome: false,
      showYuqiHome: false,
      animate: false,
      bannerList:[],
      limitMoney: '',//未登录额度
      quickList:[],// 速报
      authStatus:0,
      btnDisabled:'',
      basicAmount:'',
      days:'',
      productId: '',

      flagData: {},
      address: {}
    }
  },
  methods: {
    formatMoney,
    //TODO 去实名认证
    btnZero(){
      if(sessionStorage.getItem('authorization')){
          //去实名认证
        this.$router.push('/realAuth')
      }else{
        this.$router.push('/loginCode')
      }
    },
    //TODO 继续认证-生成订单
    btnOne(type){
      this.httpRequest.addLenderCase({
        prodId: this.productId
      }).then((res)=>{
        console.log('生成订单',res)
        if(res.code == '00000000'){
          if(type==1){
            this.toast('借款已申请，请等待审核')
            //this.updateLenderCaseId(res.data)
          }else{
            this.jixuAuth()
          }
        }
      })
    },
    //TODO 老客复借修改订单
    updateLenderCaseId(lenderCaseId){
      this.httpRequest.updateLenderCaseId({
        lenderCaseId: lenderCaseId
      }).then((res)=>{
        if(res.code == '00000000'){
          this.$router.push('/borrowMoney')
        }
      })
    },
    //TODO 审核中
    btnTwo(){
      this.Toast({
        message: '正在快马加鞭审核...',
        position: 'center',
        duration: 2000
      })
    },
    //TODO 继续认证
    btnFour(){
      this.jixuAuth()
    },
    //TODO 驳回
    btnFive(){

    },
    //TODO 还有未还清的订单
    btnSix(){
      this.Toast({
        message: '您还有未还清的订单，请结清后再来申请',
        position: 'center',
        duration: 2000
      })
    },
    //TODO 马上拿钱
    btnEight(){
      this.$router.push('/borrowMoney')
    },
    //TODO 待放款
    btnNine(){
      this.Toast({
        message: '等待放款中，请耐心等待',
        position: 'center',
        duration: 2000
      })
    },
    //TODO 老客复借
    btnTen(){
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
              this.btnOne(1)
              //this.toast('借款已申请，请等待审核')
              break
          }
        }
      })
    },
    goBannerUrl(path){
      if(path){
        window.open(path)
      }
    },
    //TODO 获取速报列表
    getQuickList(){
      this.httpRequest.queryQuickList().then((res)=>{
        console.log('获取速报>>>>>',res);
        if(res.code == '00000000'){
          this.quickList = res.data
        }
      })
    },
    //TODO 登录后获取首页状态
    getHomeStatus(){
      this.httpRequest.loginHomePage({
        proId:''
      }).then((res)=>{
        console.log('登录后获取首页状态',res)
        if(res.code == '00000000'){
          this.authStatus = res.data.authStatus
          switch (res.data.authStatus){
            case 0://未登录获取额度
              this.getLimitMoney()
              break
            case 1://继续认证-生成订单
              this.getHomeQuery()
              break
            case 4://继续认证
              this.getHomeQuery()
              break
            case 6://显示温馨公告
              if(res.data.days<=0){
                this.showYuqiHome = true
                if (sessionStorage.getItem('closeYuqiHome')){
                  this.showYuqiHome = false
                }
                this.days = res.data.days
              }
              this.getHomeQuery()
              break
            case 8://审核通过
              this.getHomeQuery()
              break
            case 9://等待放款
              this.getHomeQuery()
              break
            case 10://老客复借
              this.getHomeQuery()
              break
          }
        }
      })
    },
    //TODO 未登录获取额度
    getLimitMoney(){
      this.httpRequest.getLimitMoney().then((res)=>{
        console.log('未登录获取额度')
        if(res.code == '00000000'){
          this.limitMoney = res.data
        }
      })
    },
    //TODO 继续认证
    getHomeQuery(){
      this.httpRequest.getHomeQuery().then((res)=>{
        console.log('继续认证',res)
        if(res.code == '00000000'){
          this.basicAmount = res.data.basicAmount
          this.productId = res.data.id
        }
      })
    },
    //TODO 获取bannerList
    getBannerList(){
      this.httpRequest.appGetBanners({
        moduleIdentity:'indexPage'
      }).then((res)=>{
        console.log('获取首页banner>>>>>>>>>',res)
        if(res.code == '00000000'){
          this.bannerList = res.data
        }
      })
    },
    //TODO 判断是否设置密码
    checkPassword(){
      this.httpRequest.checkPassword().then((res)=>{
        console.log('判断是否设置密码',res)
        if(res.code == '600065'){
          this.showToastHome = true
          sessionStorage.setItem('checkPassword','600065')
        }else{
          this.showToastHome = false
        }
      })
    },
    //TODO 速报
    showMarquee: function (){
      this.animate = true
      setTimeout(() =>{
        this.quickList.push(this.quickList[0])
        this.quickList.shift()
        this.animate = false
      }, 500)
    },
    //TODO 埋点
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
    //初始化获取定位信息
      addAddress(){
        this.geolocation = new qq.maps.Geolocation("GRUBZ-YYTCF-NDQJW-NP35Z-GQQU7-VQBRV", "myapp");
        this.options = {timeout: 8000};
        this.geolocation.getLocation(this.showPosition, this.showErr, this.options)
      },
      showPosition(position){
        //console.log(JSON.stringify(position, null, 4))
        this.address = JSON.parse(JSON.stringify(position, null, 4))
        console.log(this.address)
        sessionStorage.setItem('address',JSON.stringify(position, null, 4))
        console.log(JSON.stringify(this.address))
        /*if(this.type==1){
          return
        }*/
        this.httpRequest.addDeviceInfo({
           deviceType:"",//设备类型
            imei:"",//设备的imei或meid号
            keychain_uuid:"",//基于keychain的uuid
            idfa:"",//广告ID
            idfv:"",//供应商ID
            mac:"",//MAC地址
            longitude:this.address.lng,//经度值
            latitude:this.address.lat,//维度值
            osName:"",//设备系统名称
            osVersion:"",//设备系统版本
            browserName:"",//浏览器名称
            browserVersion:"",//浏览器版本
            address:this.address.province+this.address.city+this.address.addr
        }).then((res)=>{
          console.log('获取设备信息',res)
        })
      },
      showErr(){
        this.httpRequest.addDeviceInfo({
           deviceType:"",//设备类型
            imei:"",//设备的imei或meid号
            keychain_uuid:"",//基于keychain的uuid
            idfa:"",//广告ID
            idfv:"",//供应商ID
            mac:"",//MAC地址
            longitude:'',//经度值
            latitude:'',//维度值
            osName:"",//设备系统名称
            osVersion:"",//设备系统版本
            browserName:"",//浏览器名称
            browserVersion:"",//浏览器版本
            address:''
        }).then((res)=>{
          console.log('获取设备信息',res)
        })
        alert('请手动设置打开手机定位服务')
      },
  },
  created(){
    setInterval(this.showMarquee, 2000)
  },
  activated(){

    localStorage.setItem('headerTitle', '主页')
    BUS.$on('closeYuqiHome', ()=> {
      this.showYuqiHome = false
    })
    BUS.$on('closeToastHome',()=>{
      this.showToastHome = false
    })
    this.getBannerList()

    if(sessionStorage.getItem('authorization')){
      // 定位
    if(!sessionStorage.getItem('address')){
      this.addAddress()
    }
      if(!sessionStorage.getItem('checkPassword')){
        this.checkPassword()
      }
      this.getHomeStatus()
    }else{
      this.getLimitMoney()
    }
    this.getQuickList()


    if (JSON.stringify(this.$route.query) != '{}') {
      sessionStorage.setItem('flagData', JSON.stringify(this.$route.query))
    }
    if (sessionStorage.getItem('flagData')) {
      this.flagData = JSON.parse(sessionStorage.getItem('flagData'))
    } else {
      this.flagData = this.$route.query
    }

    this.getSaveInLog()


  }
}
</script>

<style lang="scss" scoped>
  @import '../../assets/style/mixin.scss';

  #home {
    position: relative;
    @include wh(100%, 100%);
    overflow-y: auto;
    .home {
      @include wh(100%, 100%);
      overflow-y: auto;
       position: absolute;
      top: 0;
      left: 0;
      padding-bottom:1.4rem;
      .banner {
        .mint-swipe {
          height: 4rem;
          background: red;
          img {
            @include wh(100%, 100%);
          }
        }
      }
      .content {
        height: 5.8rem;
        position: relative;
        font-size: .32rem;
        margin: -.5rem auto 0;
        padding: 1rem .45rem;
        width: 7rem;
        background: #fff;
        box-shadow: 0px 15px 29px 3px rgba(203, 203, 203, 0.44);
        -moz-box-shadow: 0px 15px 29px 3px rgba(203, 203, 203, 0.44);
        -webkit-box-shadow: 0px 15px 29px 3px rgba(203, 203, 203, 0.44);
        -ms-box-shadow: 0px 15px 29px 3px rgba(203, 203, 203, 0.44);
        @include borderRadius(.3rem);
        .content_inner {
          text-align: center;
          .title {
            font-size: .46rem;
          }
          .edu {
            color: #999;
            margin: .4rem 0;
          }
          .price {
            font-size: .7rem;
            color: #FC0F0F;
            font-weight: bold;
          }
          .mint-button {
            color: #fff;
            margin-top: .6rem;
            background: $orange;
            @include wh(100%, .8rem);
            @include borderRadius(.4rem);
          }
          .money{
            font-weight: bold;
          }
          img{
            padding:.36rem 0;
            @include wh(.92rem,.92rem);
          }
          .jujue{
            padding:.46rem 0;
            @include wh(.82rem,.82rem);
          }
          .disabled{
            background: #ccc;
          }
          .xinyong{
            color:$orange;
          }
        }
      }
      .subao {
        text-align: center;
        padding-top: 1rem;
        .marquee_box {
          position: relative;
          height: .5rem;
          overflow: hidden;
        }
        .marquee_list {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          li {
            width: 100%;
            height: .5rem;
            line-height: .5rem;
            @include df;
            @include wh(100%, .5rem);
            @include ac(center);
            @include jc(center);
            span {
              padding: 0 2px;
              font-size: .3rem;
              font-weight: bold;
            }
            img {
              @include wh(.8rem, .4rem);
            }
          }
        }
        .marquee_top {
          -webkit-transition: all 0.5s;
          -moz-transition: all 0.5s;
          -ms-transition: all 0.5s;
          transition: all 0.5s;
          margin-top: -.5rem;
        }
      }
    }
  }
</style>
