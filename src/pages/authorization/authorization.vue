<template>
<div id="authorization">
  <ul class="authorization">
    <li v-for="(item,index) in authQueryList" :key="index" @click="nextStop(item)">
      <div class="left">
        <!--<div class="icon"><img src="../../assets/img/huankuan@2x.png" alt=""></div>-->
        <div class="icon"><img :src="item.iconUrl" alt=""></div>
        <span>{{ item.datasourceName }}</span>
      </div>
      <div class="right">
        <span>{{ item.authStatusStr }}</span>
        <i class="iconfont icon-youjiantou"></i>
      </div>
    </li>
    <li>
      <div class="left">
        <i class="iconfont icon-yinhangqia"></i>
        <span>银行卡</span>
      </div>
      <div class="right" @click="goBankList">
        <span>{{ this.bankList.length ? '已绑定' : '未绑定' }}</span>
        <i class="iconfont icon-youjiantou"></i>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  props: {},
  components: {},
  data(){
	  return {
	    authQueryList: [],
      bankList: [],
      productId:'',
    }
  },
  methods: {
    goBankList(){
      if(this.bankList.length){
        return
      }
      this.httpRequest.queryRealAuth().then((res)=>{
        console.log('获取实名认证信息')
        if (res.code == '00000000'){
          sessionStorage.setItem('realAuth',JSON.stringify(res.data))
          this.$router.push('/addBank')
        } else if (res.code == '1000607'){
          this.$router.push('/realAuth')
          // 去实名认证
        }
      })
    },
    // TODO 获取认证信息列表
	  getAuthQuery(){
	    this.httpRequest.authQuery().then((res)=>{
	      console.log('获取认证信息列表',res)
        if (res.code == '00000000'){
	        this.authQueryList = res.data
        }
      })
    },
    // TODO 跳转
    nextStop(item){

      this.httpRequest.existCaseInfo().then((res)=>{
        console.log('查询是否实名认证',res)
        if(res.code == '00000000'){
          if(res.data){
            if(item.authStatusStr == '已认证'){
              this.toast('已经认证成功')
              return
            }
            console.log(item.datasourceCode)
            switch (item.datasourceCode){
              case 'hulu':
                this.$router.push('/operatorAuth')
                break
              case 'business':
                this.$router.push('/checkShop')
                break
              case 'SFJY':
                this.$router.push('/realAuth')
                break
            }
          }else{
            if(item.datasourceCode == 'SFJY'){
              this.$router.push('/realAuth')
              return
            }
            this.noOrder(item)
          }
        }
      })
    },
    // TODO 没有生成订单
    noOrder(item){
      this.httpRequest.getHomeQuery().then((res)=>{
        console.log('继续认证',res)
        if(res.code == '00000000'){
          this.httpRequest.addLenderCase({
            prodId: res.data.id
          }).then((res1)=>{
            console.log('生成订单',res1)
            if(res1.code == '00000000'){
               switch (item.datasourceCode){
                case 'hulu':
                  this.$router.push('/operatorAuth')
                  break
                case 'business':
                  this.$router.push('/checkShop')
                  break
                case 'SFJY':
                  this.$router.push('/realAuth')
                  break
              }
            }else if(res.code == '300012'){
              this.$router.push('/realAuth')
            }
          })
        }
      })
    },
    //TODO 获取银行卡列表
    getBankList(){
      this.httpRequest.getBankList({}).then((res)=>{
        console.log('获取银行卡列表',res)
        if(res.code == '00000000'){
          this.bankList = res.data
        }
      })
    }
  },
  created(){

  },
  activated(){
    localStorage.setItem('headerTitle','认证信息')
    this.getAuthQuery()
    this.getBankList()
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/style/mixin";
  #authorization{
    @include wh(100%,100%);
    padding:1rem 0;
    .authorization{
      padding:.2rem 0 0 .3rem;
      li{
        padding-right:.3rem;
        border-bottom:1px solid #ccc;
        height:1rem;
        @include df;
        @include jc(space-between);
        @include ac(center);
        .left{
          font-size:.34rem;
          @include df;
          @include ac(center);
          @include jc(center);
          i{
            margin-right:.2rem;
            color:#aaa;
          }
          .icon{
            &.iconfont{
              margin-right:.2rem;

            }
            @include wh(.4rem,.4rem);
            margin-right:.2rem;
            img{
              @include wh(100%,100%);
            }
          }
        }
        .right{
          color:#999;
        }
      }
    }
  }
</style>
