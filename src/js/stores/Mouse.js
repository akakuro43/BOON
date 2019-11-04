export default class Mouse {
  constructor() {
    this.x = window.innerWidth / 2
    this.y = window.innerHeight / 2
    this.x0to1 = 0
    this.y0to1 = 0
  }

  mousemove(val) {
    this.x = val.x
    this.y = val.y
    this.x0to1 = this.x / window.innerWidth
    this.y0to1 = this.y / window.innerHeight
  }
}
