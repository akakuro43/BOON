import AppearObject from './AppearObject'
const CLASSNAME_APPEAR_OBJECT = 'js-appear-object'

export default class Objects {
  constructor(stores) {
    this.appearObjectItems = []
    this.stores = stores
  }

  init() {
    const elmAppearObjectItems = document.querySelectorAll(`.${CLASSNAME_APPEAR_OBJECT}`)
    this.appearObjectItems = []
    for (var i = 0; i < elmAppearObjectItems.length; i++) {
      this.appearObjectItems[i] = new AppearObject(elmAppearObjectItems[i], this.stores)
    }
  }

  resize() {
    for (var i = 0; i < this.appearObjectItems.length; i++) {
      this.appearObjectItems[i].resize()
    }
  }

  update() {
    for (var i = 0; i < this.appearObjectItems.length; i++) {
      this.appearObjectItems[i].update()
    }
  }

  destroy() {
    this.appearObjectItems = []
  }
}
