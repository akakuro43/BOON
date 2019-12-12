
export default class ReplaceImg {
  constructor() {
    this.stores = null
    this.functions = null
  }

  init(elm) {
    console.log(elm)
    let doc = elm == null ? document : elm
    // BG IMG
    const elmBgImgs = [].slice.call( doc.querySelectorAll( '[data-src-bg]' ) )
    elmBgImgs.forEach( ( elmBgImg ) => {
      let src = elmBgImg.dataset.srcBg
      src = this.replace(src)
      elmBgImg.style.backgroundImage = `url(${src})`
    })

    // IMG ELM
    const elmImgs = [].slice.call( doc.querySelectorAll( '[data-src]' ) )
    elmImgs.forEach( ( elmImg ) => {
      let src = elmImg.dataset.src
      src = this.replace(src)
      let alt = elmImg.dataset.alt

      elmImg.setAttribute('src', src)
      elmImg.setAttribute('alt', (alt != null) ? alt : '')
    })
  }

  replace(src) {
    return src.replace('device', this.stores.device.device)
  }
}
