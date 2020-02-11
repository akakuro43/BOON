const USE_WEBP = 'true'

// ---- used dataset ----
// data-src・・・img属性のsrc変更
// data-src-bg・・・backgroundに設定するイメージのパス変更
// data-not-used-webp・・・上記箇所において、webpを使用しない場合に設定

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
      let notUsedWebp = elmImg.dataset.notUsedWebp !== undefined
      
      src = this.replace(src, notUsedWebp)
      let alt = elmImg.dataset.alt

      elmImg.setAttribute('src', src)
      elmImg.setAttribute('alt', (alt != null) ? alt : '')
    })
  }

  replace(src, notUsedWebp) {
    src = src.replace('device', this.stores.device.device)
    if (this.stores.device.isWebP && USE_WEBP && !notUsedWebp) {
      src = src.replace('.jpg', '.webp')
      src = src.replace('.png', '.webp')
    }
    return src
  }
}
