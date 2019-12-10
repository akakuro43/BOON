import easingFunctions from '../../utilities/easing'
import ScrollInnerPage from './ScrollInnerPage'

export default class AnchorLink {
  constructor(stores) {
    this.stores = stores
    this.scrollInnerPage = new ScrollInnerPage()
  }

  move(elm, hash, isSmooth) {
    let anchorOffsetPC = elm.dataset['anchorOffsetPc']
    let anchorOffsetSP = elm.dataset['anchorOffsetSp']
    anchorOffsetPC = anchorOffsetPC ? Number(anchorOffsetPC) : 0
    anchorOffsetSP = anchorOffsetSP ? Number(anchorOffsetSP) : 0

    let anchorY = 0

    if(hash) {
      const target = document.querySelector(hash)
      if(target == null) return
      const targetRect = target.getBoundingClientRect()
      anchorY = Number(this.stores.scroll.smoothScroll) + targetRect.top

      if(this.stores.device.isPC) {
        anchorY = anchorY + anchorOffsetPC
      } else {
        anchorY = anchorY + anchorOffsetSP
      }
    }
    if (isSmooth) {
      this.scrollInnerPage.start(anchorY, 1200, easingFunctions.easeInOutExpo)
    } else {
      window.scrollTo(0, anchorY)
    }
  }

  update() {
    this.scrollInnerPage.update()
  }


}
