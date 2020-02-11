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
    this.isWebP = false

    this.checkSupportWebP()
  }

  checkSupportWebP() {
    let WebP = new Image();
    WebP.onload = WebP.onerror =  () => {
      let isSupported = (WebP.height === 2)
      // console.log(isSupported)
      this.isWebP  = isSupported
    };
    WebP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  }

  resize(val) {
    this.device =  val.device
    this.isPC =  val.pc
    this.isSP =  val.sp
  }
}
