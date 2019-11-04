import sleep from '../../utilities/sleep.js'

let OPTIONS = {
  EASE: 0.085,
  IS_ON: true
}

const CLASSNAME_SMOOTH_SCROLL_CONTENT = 'js-smooth-scroll-content'

export default class SmoothScroll {
  constructor(stores) {
    this.stores = stores
    this.containerHeight = 0
    this.elm = {
      body: document.querySelector('body'),
      smoothScrollContent: document.querySelector(`.${CLASSNAME_SMOOTH_SCROLL_CONTENT}`),
    }
    this.ease = OPTIONS.EASE
    this.isOn = OPTIONS.IS_ON
    this.isRun = true
  }

  init() {
    if (OPTIONS.IS_ON) {
      this.isOn = this.stores.device.isPC
    }
    
    this.resize()
    this.isRun = true
  }

  update() {
    let smoothScroll = this.easing(this.stores.scroll.smoothScroll, this.stores.scroll.defaultScroll, this.isRun ? this.ease : 1.0)
        smoothScroll = Math.floor(100 * smoothScroll) / 100
    let scrollSpeed = 1 * +((this.stores.scroll.defaultScroll - smoothScroll) / (window.innerHeight, window.innerWidth))
    let scrollProgress = smoothScroll / ( this.containerHeight - window.innerHeight)
        scrollProgress = Math.floor(1000 * scrollProgress) / 1000

    this.stores.scroll.update({
      smoothScroll: smoothScroll,
      scrollSpeed: scrollSpeed,
      scrollProgress: scrollProgress,
    })
    
    if (this.isOn && this.isRun) this.layout()
  }

  layout() {
    this.elm.smoothScrollContent.style.transform = "translate3d(0, -".concat(this.stores.scroll.smoothScroll.toFixed(2), "px, 0)") 
  }

  easing(e, t, n) {
    return (1 - n) * e + n * t
  }

  async resize() {
    await sleep(10)
    this.containerHeight = this.elm.smoothScrollContent.clientHeight
    if(this.containerHeight !== this.oldContainerHeight) {
      this.setPageHeight()
      this.setStyle()
    }
    this.oldContainerHeight = this.containerHeight
  }
  
  setPageHeight() {
    if (this.isOn) this.elm.body.style.height = this.containerHeight + 'px'
    else this.elm.body.style.height = '0px'
  }

  setStyle() {
    if (this.isOn) {
      let style = this.elm.smoothScrollContent.style
      style.willChange = 'transform'
      style.position = 'fixed'
      style.top = 0
    }
  }
  changeEaseOne() {
    this.ease = 1.0
  }
  changeEaseDefault() {
    this.ease = OPTIONS.EASE
  }
  beforeEnterActions() {
    this.stores.scroll.clrearScrollPositon()
    this.offFixedScroll()
  }

  onFixedScroll() {
    let mt = this.isOn ? this.stores.scroll.smoothScroll : this.stores.scroll.defaultScroll
    this.isRun = false
    this.elm.body.style.marginTop = `-${mt}px`
    this.elm.body.style.position = 'fixed'
  }
  offFixedScroll() {
    this.elm.body.style.position = 'inherit'
    this.elm.body.style.marginTop = `0px`
    this.isRun = true
  }
}
