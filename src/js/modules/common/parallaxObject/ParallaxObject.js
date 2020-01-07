import getOffsetTop from '../../../utilities/getOffsetTop';

export default class ParallaxObject {
  constructor(el, stores) {
    this.el = el
    this.stores = stores
    this.mode = 'vertical' // 'horizontal', 'oblique'
    this.isRangeUnitPercent = true
    this.unit = '%'
    this.rangeX = 0.1 // 単位が%の場合：エレメントの10%移動
    this.rangeY = 0.1 // 単位が%の場合：エレメントの10%移動
    this.effectiveRange = 1.2
    this.offset = 0
    this.targetCenter = 0
    this.translationX = 0
    this.translationY = 0
    this.active = false
    this.originTarget = 'center' // 'top
    this.isOriginTargetCenter = true
    this.init()
  }

  init() {

    let dataset = this.el.dataset
    if (dataset['mode']) this.mode = dataset['mode']
    if (dataset['unit']) this.unit = dataset['unit']
    this.isRangeUnitPercent = this.unit == '%'
    if(!this.isRangeUnitPercent) {
      // 単位がPXの場合、初期値に100を設定
      this.rangeX = 100
      this.rangeY = 100
    }
    if (dataset['rangeX']) this.rangeX = dataset['rangeX']
    if (dataset['rangeY']) this.rangeY = dataset['rangeY']
    if (dataset['offset']) this.modeoffset = dataset['offset']
    if (dataset['originTarget']) this.originTarget = dataset['originTarget']
    this.isOriginTargetCenter = this.originTarget != 'top'
    if (dataset['effectiveRange']) this.effectiveRange = dataset['effectiveRange']

    this.resize()
    
  }

  resize() {
    if (this.stores.device.isTouch) {
      this.active = false;
    } else {
      this.off()
      let bodyTop = document.body.getBoundingClientRect().y
      
      const rect = this.el.getBoundingClientRect()
      this.targetTop = rect.y
      this.targetTop
      this.targetHeight = rect.height
      this.targetCenter = this.targetTop - bodyTop + (this.targetHeight / 2) // ターゲットの中心までの距離(px)
      this.on()
    }
  }

  update() {
    if (!this.active) return
  
    let targetToPx = this.targetCenter + (-this.offset) - (this.stores.scroll.vertialScrollTop + window.innerHeight / 2)
    // ターゲトまでの距離(%)
    let targetToPer = targetToPx / window.innerHeight
    
    // 範囲外の場合：トランスレイトしない
    if (targetToPer > this.effectiveRange || targetToPer < -this.effectiveRange) return
    if(this.isOriginTargetCenter) {
      if (this.isRangeUnitPercent) {
        this.translationPercent(targetToPer)
      } else {
        this.translationPx(targetToPer)
      }
    } else {
      let targetTopToPx = this.stores.scroll.vertialScrollTop
      let targetTopToPer = targetTopToPx / 640
      // console.log(targetTopToPer + " " + targetToPer)
      this.translationPx(targetTopToPer)
      
    }
  }

  translationPercent(targetToPer) {
    switch (this.mode) {
      case 'vertical':
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

  translationPx(targetToPer) {
    switch (this.mode) {
      case 'vertical':
        this.translationY += (targetToPer * this.rangeY - this.translationY)
        // console.log(this.translationY)
        break;
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
  layout() {
    this.el.style.transform = `translate3d(${this.translationX}px,${this.translationY}px,0)`
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
