<template>
<div id="contactKefy">
  <div class="contactKefy">
    <div class="left">
      <img src="../../assets/img/kefu1@2x.png" alt="">
    </div>
    <div class="right">
      <p>1.如果你需要帮助，请帮助扫描下方</p>
      <p>二维码添加58掌柜客服，并留言。</p>
      <p> 2.微信直接搜索“zaixiankefu10”</p>
      <p>客服微信，添加并留言。</p>
    </div>
  </div>
  <div class="imgWrap">
    <img src="../../assets/img/kefu1@2x.png" alt="">
  </div>
</div>
</template>

<script>
  export default {
	props: {},
	components: {},
	data(){
	  return {}
	},
	methods: {},
	created(){

	},
	activated(){
    localStorage.setItem('headerTitle','联系客服')
	}
  }
</script>

<style lang="scss" scoped>
@import '../../assets/style/mixin';
  #contactKefy{
    padding:2rem 1rem 0;
    @include wh(100%,100%);
    @include df;
    @include fd(column);
    //@include jc(center);
    @include ac(center);
    .contactKefy{
      font-size:.28rem;
      //@include wh(100%,3rem);
      margin-bottom:.7rem;
      @include df;
      .left{
        @include wh(.6rem,.6rem);
        margin-right:.3rem;
        img{
        @include wh(100%,100%);
        }
      }
      .right{
        p:nth-of-type(2n){
          text-indent: .22rem;
        }
      }
    }
    .imgWrap{
      img{
        @include wh(3.1rem,3.1rem);
      }
    }
  }
</style>
