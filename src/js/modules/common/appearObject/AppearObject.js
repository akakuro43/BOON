import getOffsetTop from '../../../utilities/getOffsetTop'
const CLASSNAME_IS_APPEAR = 'is-appear'

export default class AppearObject {
  constructor(el, stores) {
    this.el = el
    this.stores = stores
    this.once = true
    this.isUnitPx = false
    this.trigger = null
    this.show = false

    this.init()
  }

  init() {
    let offset = this.el.dataset['offset']
    let unit = this.el.dataset['unit']
    this.isUnitPx = unit != '%'
    if (this.isUnitPx) {
      // offset:PX
      this.offsetValue = offset ? offset : 100
    } else {
      // offset:%
      this.offsetValue = offset ? offset : 0.1
    }
    this.resize()
  }

  resize() {
    this.offsetY = getOffsetTop(this.el)
    if (this.isUnitPx) {
      this.trigger = this.offsetY - (window.innerHeight - this.offsetValue)
    } else {
      this.trigger = this.offsetY - (window.innerHeight - (window.innerHeight * this.offsetValue))
    }
  }

  update() {
    if (this.trigger === null || this.once && this.show) return

    if (!this.show && this.stores.scroll.smoothScroll >= this.trigger) {
      this.show = true
      this.el.classList.add(CLASSNAME_IS_APPEAR)
    }

    if (!this.once) {
      if (this.show && this.stores.scroll.smoothScroll < (this.offsetY - window.innerHeight)) {
        this.show = false
        this.el.classList.remove(CLASSNAME_IS_APPEAR)
      }
    }
  }
}
