
module.exports = function(device, functions, elm) {

    let doc = elm == null ? document : elm
    // BG IMG
    const elmBgImgs = [].slice.call( doc.querySelectorAll( '[data-src-bg]' ) )
    elmBgImgs.forEach( ( elmBgImg ) => {
      let src = elmBgImg.dataset.srcBg
      src = replace(src)
      elmBgImg.style.backgroundImage = `url(${src})`
      mgLoad(src)
    })

    // IMG ELM
    const elmImgs = [].slice.call( doc.querySelectorAll( '[data-src]' ) )
    elmImgs.forEach( ( elmImg ) => {
      let src = elmImg.dataset.src
      src = replace(src)
      let alt = elmImg.dataset.alt

      elmImg.setAttribute('src', src)
      elmImg.setAttribute('alt', (alt != null) ? alt : '')
      mgLoad(src)
    })

  function replace(src) {
    return src.replace('device', device)
  }

  function mgLoad(src) {
    const img = new Image()
    img.onload = () => {
      // setTimeout(()=> {
        // console.log('COMPLETE IMAGE!!!')
        // if(this.resizeFunc) this.resizeFunc()
        // functions.resize('replaceImage')
      // },100)
    }
    img.src = src
  }
}
