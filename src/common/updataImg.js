import Exif from 'exif-js'


export const rotateImg = function(img, direction, canvas){
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
}


