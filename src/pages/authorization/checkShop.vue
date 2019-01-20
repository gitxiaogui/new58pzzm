<template>
  <div id="checkShop">
    <div class="checkShop">
      <ul class="checkList">
        <li v-for="(item,index) in checkList" :key="index" @click="checked(index)">
          <img :src="check == index ? item.checked : item.check" alt="">
          <img :src="item.icon" alt="">
        </li>
      </ul>
      <div class="notice">
        <div class="left">注：</div>
        <div class="right">
          <p>1、认证“饿了么”会提高信用额度哦</p>
          <p>2、以上三个电商您可任选其一认证</p>
        </div>
      </div>
      <div class="btn">
          <mt-button type="primary" @click="nextStop" >下一步</mt-button>
        </div>
    </div>
  </div>
</template>

<script>
import Juxing1 from '../../assets/img/juxing1.png'
import Juxing2 from '../../assets/img/juxing2.png'
import Ele from '../../assets/img/ele.png'
import Taobao from '../../assets/img/taobao.png'
import Jingdong from '../../assets/img/jingdong.png'
export default {
  props: {},
  components: {},
  data(){
	  return {
      checkList: [
        {icon:Ele,check:Juxing2,checked:Juxing1},
        {icon:Jingdong,check:Juxing2,checked:Juxing1},
        {icon:Taobao,check:Juxing2,checked:Juxing1}
        ],
      check: 0,
      shopList: []
    }
  },
  methods: {
    checked(index){
      this.check = index
    },
    // 下一步
    nextStop(){
      switch (this.check) {
        case 0:
          this.$router.push('/eleAuth')
          break
        case 1:
          this.$router.push('/jingdongAuth')
          break
        case 2:
          this.$router.push('/taobaoAuth')
          break
      }
    }
  },
  created(){

  },
  activated(){
    localStorage.setItem('headerTitle','电商认证')
    this.shopList = sessionStorage.getItem('shopList')
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/mixin';
  #checkShop{
    @include wh(100%,100%);
    background: #F2F2F2;
    padding:1.6rem .3rem;
    .checkShop{
      padding:1.34rem 0;
      background: #fff;
      @include borderRadius(.4rem);
      @include wh(100%,100%);
      .checkList{
        li{
          @include df;
          @include ac(center);
          @include jc(center);
          margin-bottom:.46rem;
          img{
            @include wh(.38rem,.38rem);
            &:nth-of-type(2){
              margin-left:1rem;
              @include wh(1.7rem,.7rem);
            }
          }
        }
      }
      .notice{
        @include df;
        @include jc(center);
        font-size:.28rem;
        color:#333;
        p{
          line-height: .5rem;
        }
      }
      .btn{
        padding:.6rem .45rem 0;
        font-size:.36rem;
        .mint-button{
          @include wh(100%,.8rem);
          background: $orange;
        }
      }
    }
  }
</style>
