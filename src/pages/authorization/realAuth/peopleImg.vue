<template>
<div id="peopleImg">
  <div class="peopleImg">
    <div class="upDateImg">
      <input type="file" class="change" capture="camera" accept="image/*" @change="onFileChange($event,1)" id="img">
      <img v-if="!headerImage" class="innerImg" src="../../../assets/img/peopleImg.png" alt="">
      <div class="wrapImg">
        <div v-if="headerImage" class="picture" :style="'backgroundImage:url('+headerImage+')'"></div>
      </div>
      </div>
    <div class="btn">
      <mt-button type="primary" :disabled="loading" @click="nextStop">
        <mt-spinner v-if="loading" type="triple-bounce" :size="24"></mt-spinner>
        <span v-if="!loading">确定</span>
      </mt-button>
    </div>
  </div>
</div>
</template>

<script>
import { Indicator } from 'mint-ui';
import Exif from 'exif-js'
export default {
  props: {},
  components: {},
  data(){
	  return {
	    headerImage: '',
      headerImage1: '',
      userMessage: '',
      loading: false
    }
  },
  methods: {
    nextStop(){
      this.loading = true
      this.httpRequest.identityCompare({
        name: this.userMessage.username,
        idCard: this.userMessage.idCard
      }).then((res)=>{
        console.log('实名认证')
        this.loading = false
        if(res.code == '00000000'){
          this.$router.push('/main')
        }
      }).catch((err)=>{
        this.loading = false
      })
    },
	  // TODO 上传图片
    onFileChange(e){
      console.log(111111,e)
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      this.picValue = files[0]
      this.imgPreview(this.picValue)
    },
    imgPreview (file) {
      Indicator.open('上传中...');
      let self = this
      let Orientation
      // 去获取拍照时的信息，解决拍出来的照片旋转问题
      Exif.getData(file, function(){
        Orientation = Exif.getTag(this, 'Orientation')
      })
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return

      if (/^image/.test(file.type)) {
        // 创建一个reader
        let reader = new FileReader()
        // 将图片2将转成 base64 格式
        reader.readAsDataURL(file)
        // 读取成功后的回调
        reader.onloadend = function () {
          let result = this.result
          let img = new Image()
          img.src = result
          // 判断图片是否大于1500K,是就直接上传，反之压缩图片
          self.headerImage = this.result;//没有压缩的
          if (this.result.length <= (1500 * 1024)) {
            img.onload = function () {
              let data = self.compress(img,Orientation,1)
              self.headerImage1 = data
              self.postImg()
            }
          } else {
            img.onload = function () {
              let data = self.compress(img,Orientation)
              self.headerImage1 = data
              self.postImg()
            }
          }
        }
      }
    },
    postImg () {
      // 这里写接口
      this.httpRequest.uploadFile({
        picBase: this.headerImage1,
        type:'PERSONAL'
      }).then((res)=>{
        console.log('上传照片',res)
         Indicator.close();
      }).catch((err)=>{
        Indicator.close();
      })

    },
    rotateImg (img, direction,canvas) {
      // 最小与最大旋转方向，图片旋转4次后回到原方向
      const min_step = 0
      const max_step = 3
      if (img == null) return
      // img的高度和宽度不能在img元素隐藏后获取，否则会出错
      let height = img.height
      let width = img.width
      let step = 2
      if (step == null) {
        step = min_step
      }
      if (direction == 'right') {
        step++
        // 旋转到原位置，即超过最大值
        step > max_step && (step = min_step)
      } else {
        step--
        step < min_step && (step = max_step)
      }
      // 旋转角度以弧度值为参数
      let degree = step * 90 * Math.PI / 180
      let ctx = canvas.getContext('2d')
      switch (step) {
      case 0:
        canvas.width = width
        canvas.height = height
        ctx.drawImage(img, 0, 0)
        break
      case 1:
        canvas.width = height
        canvas.height = width
        ctx.rotate(degree)
        ctx.drawImage(img, 0, -height)
        break
      case 2:
        canvas.width = width
        canvas.height = height
        ctx.rotate(degree)
        ctx.drawImage(img, -width, -height)
        break
      case 3:
        canvas.width = height
        canvas.height = width
        ctx.rotate(degree)
        ctx.drawImage(img, -width, 0)
        break
      }
    },
    compress(img,Orientation,type) {
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      // 瓦片canvas
      let tCanvas = document.createElement('canvas')
      let tctx = tCanvas.getContext('2d')
      let initSize = img.src.length
      let width = img.width
      let height = img.height
      // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
      let ratio
      if ((ratio = width * height / 4000000) > 1) {
        console.log('大于400万像素')
        ratio = Math.sqrt(ratio)
        width /= ratio
        height /= ratio
      } else {
        ratio = 1
      }
      canvas.width = width
      canvas.height = height
      //        铺底色
      ctx.fillStyle = '#fff'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      // 如果图片像素大于100万则使用瓦片绘制
      let count
      if ((count = width * height / 1000000) > 1) {
        console.log('超过100W像素')
        count = ~~(Math.sqrt(count) + 1) // 计算要分成多少块瓦片
        //            计算每块瓦片的宽和高
        let nw = ~~(width / count)
        let nh = ~~(height / count)
        tCanvas.width = nw
        tCanvas.height = nh
        for (let i = 0; i < count; i++) {
          for (let j = 0; j < count; j++) {
            tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh)
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh)
          }
        }
      } else {
        ctx.drawImage(img, 0, 0, width, height)
      }
      // 修复ios上传图片的时候 被旋转的问题
      if (Orientation != '' && Orientation != 1){
        switch (Orientation){
        case 6:// 需要顺时针（向左）90度旋转
          this.rotateImg(img,'left',canvas)
          break
        case 8:// 需要逆时针（向右）90度旋转
          this.rotateImg(img,'right',canvas)
          break
        case 3:// 需要180度旋转
          this.rotateImg(img,'right',canvas)// 转两次
          this.rotateImg(img,'right',canvas)
          break
        }
      }
      // 进行最小压缩
      let ndata = ''
      if (type){
        ndata = canvas.toDataURL('image/jpeg')
      } else {
        ndata = canvas.toDataURL('image/jpeg', 0.1)
      }
      console.log('压缩前：' + initSize)
      console.log('压缩后：' + ndata.length)
      console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + '%')
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0
      return ndata
    }
  },
  created(){

  },
  activated(){
    localStorage.setItem('headerTitle','实名认证')
    this.userMessage = JSON.parse(sessionStorage.getItem('userMessage'))
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../assets/style/mixin";
  #peopleImg{
    @include wh(100%,100%);
    background: #fff;
    padding:1.6rem .75rem 0;
    .peopleImg{
      border:1px solid $orange;
      @include wh(100%,8rem);
      padding:.5rem;
      .upDateImg {
        @include wh(100%, 100%);
        position: relative;
      input {
        position: absolute;
        @include wh(100%, 100%);
        z-index: 9;
        right: 0;
        top: 0;
        opacity: 0;
        -moz-opacity: 0;
      }
      .wrapImg{
        position: relative;
        .picture {
          margin:0 auto;
          width: 5rem;
          height: 7rem;
          overflow: hidden;
          background-position: center center;
          background-repeat: no-repeat;
          //background-size: cover;
          background-size: 90%;
        }
      }
      .innerImg {
        @include wh(100%, 100%);
        position: absolute;
      }
    }
    }
    .btn{
      margin:1.5rem 0 ;
        @include wh(100%,.8rem);
        .mint-button{
          background: $orange;
          @include wh(100%,100%);
        }
      }
  }
</style>
