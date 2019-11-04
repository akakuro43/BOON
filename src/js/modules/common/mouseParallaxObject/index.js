import MouseParallaxObject from './MouseParallaxObject'
const CLASSNAME_MOUSE_PARALLAX_OBJECT = 'js-mouse-parallax-object'

export default class Objects {
  constructor(stores) {
    this.mouseParallaxObjectItems = []
    this.stores = stores
  }

  init() {
    const elmParallaxObjectItems = document.querySelectorAll(`.${CLASSNAME_MOUSE_PARALLAX_OBJECT}`)
    this.mouseParallaxObjectItems = []
    for (var i = 0; i < elmParallaxObjectItems.length; i++) {
      this.mouseParallaxObjectItems[i] = new MouseParallaxObject(elmParallaxObjectItems[i], this.stores)
    }
  }

  resize() {
    for (var i = 0; i < this.mouseParallaxObjectItems.length; i++) {
      this.mouseParallaxObjectItems[i].resize()
    }
  }

  update() {
    for (var i = 0; i < this.mouseParallaxObjectItems.length; i++) {
      this.mouseParallaxObjectItems[i].update()
    }
  }

  destroy() {
    this.mouseParallaxObjectItems = []
  }
}
