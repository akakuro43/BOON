import Swiper from 'swiper'
import { TSExpressionWithTypeArguments } from 'babel-types'

const CLASSNAME_SWIPER_CONTAINER = 'swiper-container'

// 参考資料
// http://reiwinn-web.net/2018/03/15/swiper-4-1-6/#speed

// オプションサンプル
// let option = {
//   isProgress: true,
//   slidesPerView: 1,
//   spaceBetween: 0,
//   centeredSlides: false
// }

export default class SwiperModule {
  constructor(targetClass, stores) {
    this.targetClass = targetClass
    this.swiper = null
  }
  init(option) {
    let isProgress = (option == null || option.isProgress == null) ? true : option.isProgress
    let slidesPerView = (option == null || option.slidesPerView == null) ? 1 : option.slidesPerView
    let spaceBetween = (option == null || option.spaceBetween == null) ? 0 : option.spaceBetween
    let centeredSlides = (option == null || option.centeredSlides == null) ? false : option.centeredSlides

    this.swiper = new Swiper(`.${this.targetClass}`, {
      slidesPerView: slidesPerView,
      spaceBetween: spaceBetween,
      centeredSlides: centeredSlides,
      nested: false
      // pagination: {
      //   el: '.swiper-pagination',
      //   clickable: true,
      // },
    })
    this.updateProgress()
    this.addEvent()
  }
  addEvent() {
      // this.swiper.on('progress', progress => {
      //   // console.log(progress)
      //   // this.progress = progress
      //   // console.log(this.swiper.activeIndex)
      // })
    this.swiper.on('slideChange', () => {
      // console.log(this.swiper.activeIndex)
      this.updateProgress()
      
    })
  }
  updateProgress() {
    let progress = (this.swiper.activeIndex + 1) / 3
    document.querySelector('.progress-value').style.transform = `scaleX(${progress})`
  }
  destory() {
    this.swiper = null
  }

}
