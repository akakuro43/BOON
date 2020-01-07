import getOffsetTop from '../../../utilities/getOffsetTop';

export default class ParallaxObject {
  constructor(el, stores) {
    this.el = el
    this.stores = stores
    this.mode = 'vertical' // 'horizontal', 'oblique'
    this.isRangeUnitPercent = true
    this.rangeX = 0.05
    this.rangeY = 0.05
    this.offset = 0
    this.targetCenter = 0
    this.translationX = 0
    this.translationY = 0
    this.unit = '%'
    this.active = false
    this.originTarget = 'center' // 'top
    this.isOriginTargetCenter = true
    this.init()
  }

  init() {

    let dataset = this.el.dataset
    if (dataset['mode']) this.mode = dataset['mode']
    if (dataset['unit']) this.unit = dataset['unit']
    if (dataset['rangeX']) this.rangeX = dataset['rangeX']
    if (dataset['rangeY']) this.rangeY = dataset['rangeY']
    if (dataset['offset']) this.modeoffset = dataset['offset']
    if (dataset['originTarget']) this.originTarget = dataset['originTarget']

    this.isRangeUnitPercent = this.unit == '%'
    this.isOriginTargetCenter = this.originTarget != 'top'

    this.resize()  
    
  }

  resize() {
    if (this.stores.device.isTouch) {
      this.active = false;
    } else {
      this.off()
      let by = document.body.getBoundingClientRect().y
      
      const rect = this.el.getBoundingClientRect()
      const y = rect.y
      this.y = y
      this.targetHeight = rect.height
      this.targetCenter = y - by + (this.targetHeight / 2) // ターゲットの中心までの距離(px)

      setTimeout(() => {
        this.on()  
      }, 10)
      
    }
  }

  update() {
    if (!this.active) return
  
    let targetToPx = this.targetCenter + (-this.offset) - (this.stores.scroll.smoothScroll + window.innerHeight / 2)
    // ターゲトまでの距離(%)
    let targetToPer = targetToPx / window.innerHeight
    // ターゲットトップまでの距離(%)
    let targetTopToPer = this.stores.scroll.smoothScroll / this.y

    // // -1 〜 1外でリターン
    if (targetToPer > 1.2 || targetToPer < -1.2) return
    if (this.isRangeUnitPercent) {
      this.translationPercent(this.isOriginTargetCenter ? targetToPer : targetTopToPer)
    } else {
      this.translationPx(this.isOriginTargetCenter ? targetToPer : targetTopToPer)
    }
  }

  translationPercent(targetToPer) {
    switch (this.mode) {
      case 'vertical':
        console.log(this.rangeY)
        this.translationY += (targetToPer * (this.rangeY * this.targetHeight) - this.translationY)
        break
      case 'horizontal':
        this.translationX += (targetToPer * this.rangeX - this.translationX)
        break
      case 'oblique':
        this.translationY += (targetToPer * this.rangeY - this.translationY)
        this.translationX += (targetToPer * this.rangeX - this.translationX)
        break
      default:
    }
    // 移動
    this.layout()
  }

  translationPx(targetToPx) {
    switch (this.mode) {
      case 'vertical':
        this.translationY += (targetToPx * this.rangeY - this.translationY)
        console.log(this.translationY)
        break;
      case 'horizontal':
        this.translationX += (targetToPx * this.rangeX - this.translationX)
        break
      case 'oblique':
        this.translationY += (targetToPx * this.rangeY - this.translationY)
        this.translationX += (targetToPx * this.rangeX - this.translationX)
        break
      default:
    }
    // 移動
    this.layout()
  }
  layout() {
    this.el.style.transform = `translate3d(${this.translationX + this.unit},${this.translationY + this.unit},0)`
  }
  off() {
    this.active = false
    this.translationX = this.translationY = 0
    this.layout()
  }
  on() {
    this.active = true
  }
}
