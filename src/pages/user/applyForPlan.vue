<template>
<div id="applyForPlan">
  <div class="applyForPlan">
    <div class="headerTitle">
      <p>借款金额：1000元</p>
      <p>借款期限：7天</p>
    </div>
    <div class="applyForContent">
      <div class="applyForTitle">
        <i></i>
        <span>申请进度</span>
      </div>
      <div class="applyForInner">
        <ul class="statusList">
          <li v-for="item in 3" :key="item">
            <div class="statusTitle">
              <i class="iconfont icon-duihao2" :class="{orange: item<3 }"></i>
              <span>审核中</span>
            </div>
            <div class="statusContent">
              <div class="right">
                <p>订单正在审核中，该订单含有未认证项目，为保证审核通过，请尽快认证。</p>
                <p class="blue">前往认证</p>
                <p class="time">2018-10-29 10:21:00</p>
              </div>
            </div>
          </li>
         <!-- <li>
            <div class="statusTitle">
              <i class="iconfont icon-duihao2"></i>
            </div>
          </li>-->
        </ul>
      </div>
    </div>

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
    localStorage.setItem('headerTitle','申请进度')
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/style/mixin";
  #applyForPlan{
    padding:1.54rem 0 .54rem;
    @include wh(100%,auto);
    background: #f1f1f1;
    .applyForPlan{
      @include wh(100%,100%);
      background: #fff;
      padding-bottom:.3rem;
      .headerTitle{
        @include df;
        @include jc(space-between);
        @include ac(center);
        padding:0 .3rem;
        border-bottom:1px solid #ccc;
        height:1.1rem;
      }
      .applyForContent{
        .applyForTitle{
          padding:0 .3rem;
          @include df;
          @include ac(center);
          height:1rem;
          i{
            display: inline-block;
            @include wh(.05rem,.4rem);
            margin-right:.34rem;
            background: $orange;
          }
          span{
            font-size:.3rem;
          }
        }
        .applyForInner{
          //overflow-y: auto;
          //height:8rem;
          height:auto;
          padding:0 .8rem;
          .statusList{
            li{
              .statusTitle{
                .iconfont{
                  margin-right:.3rem;
                  color:#ccc;
                }
                .orange{
                  color: $orange;
                }
              }
              .statusContent{
                margin-left:.12rem;
                padding:.3rem 0;
                border-left:2px solid #ccc;
                p{
                  color:#333;
                  padding-left:.54rem;
                  line-height: .5rem;
                  font-size:.28rem;
                  &.blue{
                    color:#408DFF;
                    margin:.4rem 0 .32rem 0;
                    text-decoration:underline;
                  }
                  &.time{
                    color:#999;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
