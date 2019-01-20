<template>
  <div id="app">
    <Header :leftShow="leftShow" :rightShow="rightShow" v-if="topShow" :headerTitle="headerTitle"></Header>
    <keep-alive>
      <router-view :key="key"/>
    </keep-alive>
    <Footer v-if="bottomShow"></Footer>
  </div>
</template>

<script>
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
export default {
  components:{
    Header,
    Footer
  },
  data(){
    return ({
      leftShow: false,
      rightShow: false,
      topShow: false,
      bottomShow: true,
      titleShow: false,
      headerTitle: '',
    })
  },
  computed: {
    key() {
      return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
    }
  },
  created () {
    this.getRoute()
  },
  watch: {
    '$route': function () {
      this.$nextTick(() => {
        this.getRoute()
      })
    }
  },
  methods:{
    getRoute(){
      this.headerTitle = localStorage.getItem('headerTitle') ? localStorage.getItem('headerTitle') : '登录'
      // 不显示头部
      if (this.$route.path !== '/loginCode' &&
        this.$route.path !== '/loginPassword' &&
        this.$route.path !== '/forgetPassword' &&
        this.$route.path !== '/bankList' &&
        this.$route.path !== '/user' &&
        this.$route.path !== '/main' &&
        this.$route.path !== '/riverDiversionLogin' &&
        this.$route.path !== '/loginSuccess' &&
        this.$route.path !== '/home'
      ) {
        this.leftShow = true
        this.rightShow = true
        this.topShow = true
      } else {
        this.leftShow = false
        this.topShow = false
      }
      // 不显示左边
      if (this.$route.path !== '/returnMoney' &&
        this.$route.path !== '/returnMoney'
      ) {
        this.leftShow = true
        this.rightShow = true
      } else {
        this.leftShow = false
        this.rightShow = false
      }
      // 不显示底部
      if (this.$route.path !== '/loginCode' &&
        this.$route.path !== '/loginPassword' &&
        this.$route.path !== '/applyForPlan' &&
        this.$route.path !== '/setting' &&
        this.$route.path !== '/affirmReturnMoney' &&
        this.$route.path !== '/oederDetail' &&
        this.$route.path !== '/helpCenter' &&
        this.$route.path !== '/checkShop' &&
        this.$route.path !== '/operatorAuth' &&
        this.$route.path !== '/operatorAuthPassword' &&
        this.$route.path !== '/operatorAuthCode' &&
        this.$route.path !== '/eleAuth' &&
        this.$route.path !== '/helpCenter' &&
        this.$route.path !== '/helpCenter' &&
        this.$route.path !== '/helpCenter' &&
        this.$route.path !== '/helpCenter' &&
        this.$route.path !== '/helpCenter' &&
        this.$route.path !== '/realAuth' &&
        this.$route.path !== '/peopleImg' &&
        this.$route.path !== '/jingdongAuth' &&
        this.$route.path !== '/jingdongCode' &&
        this.$route.path !== '/taobaoAuth' &&
        this.$route.path !== '/taobaoCode' &&
        this.$route.path !== '/riverDiversionLogin' &&
        this.$route.path !== '/loginDeal' &&
        this.$route.path !== '/home' &&
        this.$route.path !== '/loginSuccess' &&
        this.$route.path !== '/contactKefu' &&
        this.$route.path !== '/forgetPassword'
      ) {
        this.bottomShow = true
      } else {
        this.bottomShow = false
      }
    }
  },


}
</script>

<style lang="scss">
  @import './assets/style/common.scss';

  #app {
    height: 100%;
    width: 100%;
    font-size: .32rem;
    color: #333;
    position: fixed;
    top:0;
    left:0;
    overflow-y: auto;
    .mint-cell-wrapper {
      background-size: 100% 1px;
      background: #fff;
    }
    .hint{
      height:.2rem;
      width:100%;
      background: #F1F1F1;
    }
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }
  }
</style>
