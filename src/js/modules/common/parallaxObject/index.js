import ParallaxObject from './ParallaxObject'
const CLASSNAME_PARALLAX_OBJECT = 'js-parallax-object'

export default class Objects {
  constructor(stores) {
    this.parallaxObjectItems = []
    this.stores = stores
  }

  init() {
    const elmParallaxObjectItems = document.querySelectorAll(`.${CLASSNAME_PARALLAX_OBJECT}`)
    this.parallaxObjectItems = []
    for (var i = 0; i < elmParallaxObjectItems.length; i++) {
      this.parallaxObjectItems[i] = new ParallaxObject(elmParallaxObjectItems[i], this.stores)
    }
  }

  resize() {
    for (var i = 0; i < this.parallaxObjectItems.length; i++) {
      this.parallaxObjectItems[i].resize()
    }
  }

  update() {
    for (var i = 0; i < this.parallaxObjectItems.length; i++) {
      this.parallaxObjectItems[i].update()
    }
  }

  destroy() {
    this.parallaxObjectItems = []
  }
}
