import '@babel/polyfill'

import sleep from './utilities/sleep.js'
import UserAgent from './variables/UserAgent'

import PageManager from './modules/common/pageManager/PageManager'
import Renderer from './modules/common/Renderer'
import AttachEvent from './modules/common/AttachEvent'
import AppearObject from './modules/common/appearObject'
import ParallaxObject from './modules/common/parallaxObject'
import MouseParallaxObject from './modules/common/mouseParallaxObject/'
import AnchorLink from './modules/common/AnchorLink'
import SmoothScroll from './modules/common/SmoothScroll'
import ReplaceImg from './modules/common/ReplaceImg'
import Preload from './modules/common/Preload'




import Scroll from './stores/Scroll'
import Mouse from './stores/Mouse'
import Device from './stores/Device'

// let useWebp = isWebP()
// console.log(useWebp)

let ua = new UserAgent()
// stores
const stores = {
  scroll: new Scroll(),
  mouse: new Mouse(),
  device: new Device(),
}

console.log(stores.device.isWebP)
// modules
const modules = {
  renderer: new Renderer(),
  smoothScroll: new SmoothScroll(stores),
  attachEvent: new AttachEvent(),
  appearObject: new AppearObject(stores),
  parallaxObject: new ParallaxObject(stores),
  mouseParallaxObject: new MouseParallaxObject(stores),
  anchorLink: new AnchorLink(stores),
  replaceImg: new ReplaceImg(),
  preload: new Preload(stores)
}
// functions
const functions = {
  resize: () => {
    ua.changeDeviceInfo()
    stores.device.resize(ua)
    modules.appearObject.resize()
    modules.parallaxObject.resize()
    modules.mouseParallaxObject.resize()
    modules.smoothScroll.resize()
  },
  scroll: ()=> {
    stores.scroll.scroll()
  },
  mousemove: event => {
    stores.mouse.mousemove({
      x: event.clientX,
      y: event.clientY
    })
  },
  update: ()=> {
    modules.smoothScroll.update()
    modules.appearObject.update()
    modules.parallaxObject.update()
    modules.mouseParallaxObject.update()
    modules.anchorLink.update()
  }
}

stores.device.resize(ua)
// modules.accordion.stores = stores
// modules.accordion.functions = functions
modules.replaceImg.stores = stores
modules.replaceImg.functions = functions
modules.preload.stores = stores
modules.preload.functions = functions
let pageManager = new PageManager()
pageManager.modules = modules
pageManager.stores = stores
pageManager.functions = functions


// on Event
const onEvent = () => {
  // scroll
  modules.attachEvent.scrollFnc = functions.scroll
  // mousemove
  modules.attachEvent.mousemoveFnc = functions.mousemove
  // window resize
  modules.attachEvent.resizeFnc = functions.resize
  // on
  modules.attachEvent.onAttachAll()
}

const init = async () => {
  await sleep(100)
  console.log(stores.device.isWebP)
  pageManager.modules.renderer.render = functions.update
  pageManager.onLoad()
}
onEvent()
init()
