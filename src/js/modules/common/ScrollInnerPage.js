export default class ScrollInnerPage {
  constructor() {
    this.scrollTopBefore = 0
    this.scrollTopAfter = 0
    this.timeClick = 0
    this.duration = 0
    this.easingFunc = null
  }

  update() {
    var time = Date.now() - this.timeClick
    if(time >= this.duration) return
    window.scrollTo(0, this.scrollTopBefore + (this.scrollTopAfter - this.scrollTopBefore) * this.easingFunc(Math.min(time / this.duration, 1)))
  }

  start(anchorY, duration, easingFunc) {
    this.duration = (duration) ? duration : 1000
    this.easingFunc = (easingFunc) ? easingFunc : function(t) {
      return t
    }
    this.timeClick = Date.now()
    this.scrollTopBefore = window.pageYOffset
    this.scrollTopAfter = anchorY
  }
}
