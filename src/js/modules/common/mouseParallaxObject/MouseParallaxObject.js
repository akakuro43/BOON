import getOffsetTop from '../../../utilities/getOffsetTop'
import { thisExpression } from 'babel-types'

export default class MouseParallaxObject {
  constructor(el,stores) {
    this.el = el
    this.stores = stores
    this.vertialMouseX = 0
    this.vertialMouseY = 0
    this.active = true

    this.targetCenter = 0
    this.translationX = 0
    this.translationY = 0

    this.isAxisXOnly = false
    this.isAxisYOnly = false
    this.isReverseX = false
    this.isReverseY = false
    this.rangeX = 10
    this.rangeY = 5
    this.ease = 0.075

    this.init()
  }

  init() {
    this.unit = this.isRangeUnitPercent ? '%' : "px"

    let dataset = this.el.dataset
    // console.log(dataset)
    if(dataset['isAxisXOnly']) this.isAxisXOnly = dataset['isAxisXOnly']
    if(dataset['isAxisYOnly']) this.isAxisYOnly = dataset['isAxisYOnly']
    if(dataset['isReverseX']) this.isReverseX = dataset['isReverseX']
    if(dataset['isReverseY']) this.isReverseY = dataset['isReverseY']
    if(dataset['rangeX']) this.rangeX = dataset['rangeX']
    if(dataset['rangeY']) this.rangeY = dataset['rangeY']
    if(dataset['ease']) this.ease = dataset['ease']

    this.resize()
  }

  resize() {
    if (this.stores.device.isTouch) {
      this.active = false
    } else {
      this.off()
      const rect = this.el.getBoundingClientRect()
      const top = rect.top
      this.targetHeight = rect.height
      this.targetCenter = top + this.stores.scroll.defaultScroll + ( this.targetHeight / 2 ) // ターゲットの中心までの距離(px)
      this.on()
    }
  }

  update() {
    if (!this.active) return

    let targetToPx = this.targetCenter + (-this.offset) - (this.stores.scroll.defaultScroll + window.innerHeight / 2)
    // ターゲトまでの距離(%)
    let targetToPer = targetToPx / window.innerHeight
    // -1 〜 1外でリターン
    if(targetToPer > 1.25 || targetToPer < -1.25) return

    this.translationObject()
  }

  translationObject() {
    let vertialMouseX = this.e(this.vertialMouseX, this.stores.mouse.x, this.ease)
        vertialMouseX = Math.floor(100 * vertialMouseX) / 100
    let vertialMouseY = this.e(this.vertialMouseY, this.stores.mouse.y, this.ease)
        vertialMouseY = Math.floor(100 * vertialMouseY) / 100
    this.vertialMouseX = vertialMouseX
    this.vertialMouseY = vertialMouseY
    let mousePerX = (vertialMouseX / window.innerWidth) * 2 - 1
    let mousePerY = (vertialMouseY / window.innerHeight) * 2 - 1
    let x = this.rangeX * mousePerX
    let y = this.rangeY * mousePerY

    if(this.isAxisXOnly) y = 0
    if(this.isAxisYOnly) x = 0
    if(this.isReverseX) x = -x
    if(this.isReverseY) y = -y
    
    this.layout(x, y)
  }
  layout(x,y) {
    this.el.style.transform = `translate3d(${x + 'px'},${y + 'px'},0)`
  }
  e(e, t, n) {
   return (1 - n) * e + n * t
  }
  off() {
    this.active = false
    this.layout(0,0)
  }
  on() {
    this.active = true
  }
}
