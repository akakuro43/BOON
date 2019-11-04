export default class Device {
  constructor() {
    this.width = 0
    this.height = 0
    this.isTouch = 'ontouchstart' in document.documentElement
    this.isIE = !!navigator.userAgent.match(/Trident/g) || !!navigator.userAgent.match(/MSIE/g)
    this.isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1
    this.isSP = false
    this.isPC = false
    this.device = '' // pc or sp
  }

  resize(val) {
    this.device =  val.device
    this.isPC =  val.pc
    this.isSP =  val.sp
  }
}
