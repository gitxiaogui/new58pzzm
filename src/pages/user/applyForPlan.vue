<template>
<div id="applyForPlan">
  <div class="plan" v-if="!planData.handleList">暂无进度信息</div>
  <div v-else class="applyForPlan">
    <div class="headerTitle">
      <p>借款金额：{{ planData.amount }}</p>
      <p>借款期限：{{ planData.periodStr }}</p>
    </div>
    <div class="applyForContent">
      <div class="applyForTitle">
        <i></i>
        <span>申请进度</span>
      </div>
      <div class="applyForInner">
        <ul class="statusList">
          <li v-for="(item,index) in planData.handleList" :key="index">
            <div class="statusTitle">
              <!--<i class="iconfont icon-duihao2" :class="{orange: item.btnDisabled ? true : false }"></i>-->
              <i class="iconfont icon-duihao2 orange" ></i>
              <span>{{ item.title }}</span>
            </div>
            <div class="statusContent">
              <div class="right">
                <p>{{ item.desc }}</p>
                <p class="blue"  v-if="item.btnName" @click="JXAuth(item.btnDisabled)">{{ item.btnName }}</p>
                <p class="time">{{ dateFormat(new Date(parseInt(item.time)), 'yyyy-MM-dd hh:mm:ss') }}</p>
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
import { dateFormat } from "../../common/utils";
  export default {
  props: {},
  components: {},
  data(){
	  return {
	    planData:{},
    }
  },
  methods: {
    dateFormat,
    getLendCaseProcess(){
      this.httpRequest.getLendCaseProcess().then((res)=>{
        console.log('获取借款进度',res)
        if(res.code == '00000000'){
          this.planData = res.data
        }
      })
    },

    JXAuth(type){
      if(!type){
        return
      }
      this.jixuAuth()
    }
  },
  created(){

  },
  activated(){
    localStorage.setItem('headerTitle','申请进度')
    this.getLendCaseProcess()
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/style/mixin";
  #applyForPlan{
    padding:1.54rem 0 0;
    @include wh(100%,auto);
    background: #f1f1f1;
    overflow-y: auto;
    .plan{
      text-align: center;
    }
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
