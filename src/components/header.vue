<template>
<div class="header" >
  <slot name="left"></slot>
  <span @click="backOut" v-if="leftShow" class="iconfont icon-left"></span>
  <span class="title">{{ headerTitle }}</span>
  <span v-if="rightShow"></span>
  <slot name="right"></slot>
</div>
</template>

<script>
export default {
  props: ['leftShow','rightShow', 'headerTitle'],
  components: {},
  data(){
    return {}
  },
  methods: {
    backOut(){
      this.$router.go(-1)
    }
  },
  created(){

  },
  activated(){

  }
}
</script>
<style lang="scss" scoped>
@import "../assets/style/mixin";
.header{
  position: fixed;
  top:0;
  left:0;
  @include wh(100%,1rem);
  @include df;
  @include ac(center);
  @include jc(space-between);
  padding:0 .3rem;
  background: $orange;
  color:#fff;
  z-index: 7;
  .title{
    flex:1;
    @include df;
    @include ac(center);
    @include jc(center);
  }
}


</style>
