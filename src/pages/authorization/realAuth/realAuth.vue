<template>
  <div id="realAuth">
    <div class="realAuth">
      <div class="form">
        <mt-field :disabled="disabledInput" label="姓名" placeholder="请输入真实姓名" v-model="formData.username"></mt-field>
        <mt-field :disabled="disabledInput" label="身份证号" placeholder="请输入身份证号" v-model="formData.idCard" :attr="{minlength:18,maxlength:18}"></mt-field>
        <div class="upDateImg" >
          <input type="file" class="change" capture="camera" accept="image/*" @change="onFileChange($event,1)" id="img">
          <img v-if="!headerImage1" class="innerImg" src="../../../assets/img/renqian.png" alt="">
          <!--<img class="imgData" v-if="headerImage" :src="headerImage" alt="">-->
          <div class="wrapImg">
            <div v-if="headerImage1" class="picture" :style="'backgroundImage:url('+headerImage1+')'"></div>
          </div>
        </div>
        <div class="upDateImg">
          <input type="file" class="change" capture="camera" accept="image/*" @change="onFileChange($event,2)" id="img">
          <img v-if="!headerImage2" class="innerImg" src="../../../assets/img/renhou.png" alt="">
          <!--<img class="imgData" v-if="headerImage" :src="headerImage" alt="">-->
          <div class="wrapImg">
            <div v-if="headerImage2" class="picture" :style="'backgroundImage:url('+headerImage2+')'"></div>
          </div>
        </div>
        <div class="btn">
          <mt-button type="primary" @click="nextStop" >下一步</mt-button>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Indicator } from 'mint-ui';
  import Exif from 'exif-js'
  import { checkRules } from "../../../common/utils";
  import { basicRules } from "../../../common/formRules";

  export default {
    props: {},
    components: {},
    data(){
      return {
        formData: {
          username: '',
          idCard: ''
        },
        headerImage1: '',
        headerImage2: '',
        disabledInput: true,
        num: 1,
      }
    },
    methods: {
      // TODO 下一步
      nextStop(){
        if(this.num>2){
          sessionStorage.setItem('userMessage',JSON.stringify(this.formData))
          let success = checkRules(this.formData,basicRules)
          if(success){
           this.httpRequest.validAuth({
             idCard: this.formData.idCard,
             name: this.formData.username,
           }).then((res)=>{
             console.log('查询是否实名认证',res)
              if(res.code == '00000000'){
               this.$router.push('/peopleImg')
              }
           })
          }
        }else{
          this.toast('请先上传图片')
        }
      },
      //TODO 上传图片
      onFileChange(e,type){
        console.log(111111,e)
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        this.picValue = files[0];
        this.imgPreview(this.picValue,type);
      },
      imgPreview (file,type) {
        Indicator.open('上传中...');
      let self = this;
      let Orientation;
      //去获取拍照时的信息，解决拍出来的照片旋转问题
      Exif.getData(file, function(){
          Orientation = Exif.getTag(this, 'Orientation');
      });
      // 看支持不支持FileReader
      if (!file || !window.FileReader) return;

      if (/^image/.test(file.type)) {
          // 创建一个reader
          let reader = new FileReader();
          // 将图片2将转成 base64 格式
          reader.readAsDataURL(file);
          // 读取成功后的回调
          reader.onloadend = function () {
            let result = this.result;
            let img = new Image();
            img.src = result;
            //判断图片是否大于5000K,是就直接上传，反之压缩图片
            //if (this.result.length <= (10000 * 1024)) {
              //self.headerImage = this.result;
              img.onload = function () {
                let data = self.compress(img,Orientation,1);
                if(type==1){
                  self.headerImage1 = data;
                }else if(type==2){
                  self.headerImage2 = data;
                }
                self.postImg(type);
              }
            /*}else {
              img.onload = function () {
                let data = self.compress(img,Orientation);
                if(type==1){
                  self.headerImage1 = data;
                }else if(type==2){
                  self.headerImage2 = data;
                }
                self.postImg(type);
              }
            }*/
          }
        }
      },
      postImg (type) {
        this.httpRequest.uploadFile({
          picBase: type==1 ? this.headerImage1 : this.headerImage2,
          type: type==1 ? 'FACE' : 'OPPOSITE'
        }).then((res)=>{
          console.log('上传图片',res)
          Indicator.close();
          if(res.code == '00000000'){
            this.num++
          }
        }).catch((err)=>{
          Indicator.close();
        })
        if(type == 1){
          this.disabledInput = false
          this.ocrAuth()
        }
        //这里写接口
      },
      // ocr
      ocrAuth(){
        this.httpRequest.ocrAuth({
         picBase:this.headerImage1,
          type:'FACE'
        }).then((res)=>{
          console.log('ocr识别>>>>>>>>>>>>',res)
          if(res.code == '00000000'){
            this.formData.username = res.data.name
            this.formData.idCard = res.data.certid
          }
        })
      },
      rotateImg (img, direction,canvas) {
        //最小与最大旋转方向，图片旋转4次后回到原方向
        const min_step = 0;
        const max_step = 3;
        if (img == null)return;
        //img的高度和宽度不能在img元素隐藏后获取，否则会出错
        let height = img.height;
        let width = img.width;
        let step = 2;
        if (step == null) {
            step = min_step;
        }
        if (direction == 'right') {
            step++;
            //旋转到原位置，即超过最大值
            step > max_step && (step = min_step);
        } else {
            step--;
            step < min_step && (step = max_step);
        }
        //旋转角度以弧度值为参数
        let degree = step * 90 * Math.PI / 180;
        let ctx = canvas.getContext('2d');
        switch (step) {
          case 0:
              canvas.width = width;
              canvas.height = height;
              ctx.drawImage(img, 0, 0);
              break;
          case 1:
              canvas.width = height;
              canvas.height = width;
              ctx.rotate(degree);
              ctx.drawImage(img, 0, -height);
              break;
          case 2:
              canvas.width = width;
              canvas.height = height;
              ctx.rotate(degree);
              ctx.drawImage(img, -width, -height);
              break;
          case 3:
              canvas.width = height;
              canvas.height = width;
              ctx.rotate(degree);
              ctx.drawImage(img, -width, 0);
              break;
        }
    },
    compress(img,Orientation,type) {
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext('2d');
        //瓦片canvas
      let tCanvas = document.createElement("canvas");
      let tctx = tCanvas.getContext("2d");
      let initSize = img.src.length;
      let width = img.width;
      let height = img.height;
      //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
      let ratio;
      if ((ratio = width * height / 4000000) > 1) {
        console.log("大于400万像素")
        ratio = Math.sqrt(ratio);
        width /= ratio;
        height /= ratio;
      } else {
        ratio = 1;
      }
      canvas.width = width;
      canvas.height = height;
  //        铺底色
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      //如果图片像素大于100万则使用瓦片绘制
      let count;
      if ((count = width * height / 1000000) > 1) {
        console.log("超过100W像素");
        count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片
  //            计算每块瓦片的宽和高
        let nw = ~~(width / count);
        let nh = ~~(height / count);
        tCanvas.width = nw;
        tCanvas.height = nh;
        for (let i = 0; i < count; i++) {
          for (let j = 0; j < count; j++) {
            tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
            ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
          }
        }
      } else {
        ctx.drawImage(img, 0, 0, width, height);
      }
      //修复ios上传图片的时候 被旋转的问题
      if(Orientation != "" && Orientation != 1){
        switch(Orientation){
          case 6://需要顺时针（向左）90度旋转
              this.rotateImg(img,'left',canvas);
              break;
          case 8://需要逆时针（向右）90度旋转
              this.rotateImg(img,'right',canvas);
              break;
          case 3://需要180度旋转
              this.rotateImg(img,'right',canvas);//转两次
              this.rotateImg(img,'right',canvas);
              break;
        }
      }
      //进行最小压缩
      let ndata = ''
      if(type){
        ndata = canvas.toDataURL('image/jpeg');
      }else{
        ndata = canvas.toDataURL('image/jpeg', 0.1);
      }
      console.log('压缩前：' + initSize);
      console.log('压缩后：' + ndata.length);
      console.log('压缩率：' + ~~(100 * (initSize - ndata.length) / initSize) + "%");
      tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
      return ndata;
    }
    },
    created(){

    },
    activated(){
      localStorage.setItem('headerTitle', '实名认证')
    }
  }
</script>

<style lang="scss">
  @import "../../../assets/style/mixin";

  #realAuth {
    @include wh(100%, auto);
    padding: 1.6rem .75rem .5rem;
    .mint-cell-wrapper {
      padding: 0;
      border-bottom: 1px solid $orange;
    }
    .upDateImg {
      margin-top: .6rem;
      @include wh(100%, 4.1rem);
      position: relative;
      border: 1px solid $orange;
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
          height: 4rem;
          overflow: hidden;
          background-position: center center;
          background-repeat: no-repeat;
          background-size: cover;
          background-size: 80%;
        }
      }
      .innerImg {
        @include wh(100%, 100%);
        position: absolute;
      }

    }
    .btn{
      margin:.5rem 0 ;
        @include wh(100%,.8rem);
        .mint-button{
          background: $orange;
          @include wh(100%,100%);
        }
      }
  }
</style>
