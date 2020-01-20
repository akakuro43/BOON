const CLASSNAME_PRELOAD_1ST = 'js-preload-1st'
const CLASSNAME_PRELOAD_BG_IMG = 'js-preload-bg-img'

export default class Prelaod {
  constructor() {
    this.stores = null
    this.functions = null
    this.imgArray1st = []
    this.imgArrayOther = []
    this.count1st = 0
    this.countOther = 0
    this.fnc1stFileLoaded = null
    this.fnc1stCompleted = null
    this.fncOtherFileLoaded = null
    this.fncOtherCompleted = null
    this.progress = 0
  }

  init(elm) {
    let doc = elm == null ? document : elm
    // IMG
    let imgs = document.querySelectorAll('img')
    for (let i = 0; i < imgs.length; i++) {
      let img = imgs[i]
      let src = img.src
      if(img.classList.contains(CLASSNAME_PRELOAD_1ST)) {
        this.imgArray1st.push(src)
        this.count1st++
      } else {
        this.imgArrayOther.push(src)
        this.countOther++
      }
    }
    // BG
    let bgImgs = document.querySelectorAll(`.${CLASSNAME_PRELOAD_BG_IMG}`)
    for (let i = 0; i < bgImgs.length; i++) {
      let bgImg = bgImgs[i]
      let img = bgImg.ownerDocument.defaultView.getComputedStyle(bgImg, null).backgroundImage
      if(img.indexOf('linear-gradient') != -1) continue
      let url = img.replace(/(url\(|\)|")/g, '')
      if(url == 'none' || url == '') continue
      if(bgImg.classList.contains(CLASSNAME_PRELOAD_1ST)) {
        this.imgArray1st.push(url)
        this.count1st++
      } else {
        this.imgArrayOther.push(url)
        this.countOther++
      }
    }
  }

  load1st() {
    for(let i = 0; i<this.imgArray1st.length; i ++) {
      // let p = new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => {
          --this.count1st
          this.progress = 1 - this.count1st / this.imgArray1st.length
          this.handleFileComplete1st()
          if(this.count1st == 0) {
            this.handleComplete1st()
          }
          // resolve(img)
        }
        img.onerror = () => {
          // reject(false)
        }
        img.src = this.imgArray1st[i]
      // })
    }
  }
  loadOther() {
    for(let i = 0; i<this.imgArrayOther.length; i ++) {
        const img = new Image()
        img.onload = () => {
          this.handleFileCompleteOther()

          if(--this.countOther == 0) {
            this.handleCompleteOther()

          }
        }
        img.onerror = () => {
        }
        img.src = this.imgArrayOther[i]
    }
  }

  handleFileComplete1st() {
    if(this.fnc1stFileLoaded) this.fnc1stFileLoaded()
  }

  handleComplete1st() {
    this.functions.resize()
    if(this.fnc1stCompleted) this.fnc1stCompleted()
  }

  handleFileCompleteOther() {
    if(this.fncOtherFileLoaded) this.fncOtherFileLoaded()
  }

  handleCompleteOther() {
    this.functions.resize()
    if(this.fncOtherCompleted) this.fncOtherCompleted()
  }
}
