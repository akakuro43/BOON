const throttle = require('../../utilities/throttle')

export default class AttachEvent {
  constructor() {
    this.scrollFnc = null
    this.resizeFnc = null
    this.mousemoveFnc = null
  }

  attachScroll() {
    window.addEventListener('scroll', event => {
      if (this.scrollFnc) this.scrollFnc(event)
    })
  }

  attachResize() {
    window.addEventListener('resize', () => {
      if (this.resizeFnc) this.resizeFnc()
    })
  }

  attachMouseMove() {
    window.addEventListener('mousemove', event => {
      if (this.mousemoveFnc) this.mousemoveFnc(event)
    })
  }

  onAttachAll() {
    this.attachScroll()
    this.attachResize()
    this.attachMouseMove()
  }
}
