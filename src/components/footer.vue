<template>
  <div class="bottomNav">
    <ul>
      <!--<li v-for="(item,index) in bottomNav" @click="skipClick(item,index)" :class="{showddd:item.path === activeRouter}"><i :class="item.icon"></i><span>{{ item.title }}</span></li>-->
      <li v-for="(item,index) in bottomNav" @click="skipClick(item,index)" :key="index" :class="{showddd:item.path === activeRouter}">
        <img :src="item.path === activeRouter? item.iconClick : item.icon" alt=""><span>{{ item.title }}</span></li>
    </ul>
  </div>
</template>

<script>
import wode1 from '../assets/img/wode1.png'
import wode2 from '../assets/img/wode2.png'
import renzheng1 from '../assets/img/renzheng1.png'
import renzheng2 from '../assets/img/renzheng2.png'
import jiekuan1 from '../assets/img/qiandai1.png'
import jiekuan2 from '../assets/img/qiandai2.png'
import chanpin1 from '../assets/img/chanpin1.png'
import chanpin2 from '../assets/img/chanpin2.png'
export default {
  data(){
    return {
      activeRouter: '',
      bottomNav: [
        {icon: jiekuan1, iconClick:jiekuan2, title: '借款', show: false, path: '/main', id: 1},
        {icon: chanpin1, iconClick:chanpin2, title: '还款', show: false, path: '/returnMoney', id: 1},
        {icon: renzheng1, iconClick:renzheng2, title: '认证', show: false, path: '/authorization', id: 1},
        {icon: wode1, iconClick:wode2, title: '我的', show: false, path: '/user', id: 1}
      ],
      activeIndex: 0,
    }
  },
  created(){
    this.activeRouter = this.$route.path
  },
  watch: {
    $route(to, from){
      console.log(to.name, from.name)
      if (to.path === from.path) {
        this.activeRouter = to.path
      } else {
        this.activeRouter = to.path
      }
    }
  },
  methods: {
    skipClick(item, index){
      if (sessionStorage.getItem('authorization')){
        this.$router.push(item.path)
      }else{
        if (item.path=='/returnMoney' || item.path=='/authorization'){
          this.$router.push('/loginCode')
        }else{
          this.$router.push(item.path)
        }
      }

    }
  },
  activated(){

  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/style/mixin';
  .bottomNav {
    border-top:1px solid rgba(238,238,238,1);
    position: fixed;
    bottom: 0;
    font-size: .3rem;
    height: 1rem;
    background: #fff;
    width: 100%;
    ul {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      li {
        display: flex;
        flex-direction: column;
        align-items: center;
        img{
          @include wh(.4rem,.4rem)
        }
        .iconfont {
          font-size: .4rem;
        }
        &.showddd {
          span {
            color: #F89625;
          }

        }
      }
    }
  }


</style>
