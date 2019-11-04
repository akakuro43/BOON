export default class Renderer {
  constructor() {
    this.isWorking = false
    this.render = null
    
  }
  start() {
    this.isWorking = false
    setTimeout(() => {
      this.isWorking = true
      this.update()  
    }, 100)
    
  }
  stop() {
    this.isWorking = false
  }
  off() {
    this.renderPrev = null
    this.renderNext = null
  }
  update() {
    if (this.render) this.render()
    if (this.isWorking === false) return
    requestAnimationFrame(() => {
      this.update()
    })
  }
}
