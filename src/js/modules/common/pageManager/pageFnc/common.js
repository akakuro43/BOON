
const initBeforeEnterPage = (contentsArr, isPageLoaded, pageId, modules, stores, functions) => {
  modules.replaceImg.init(contentsArr[0])
  modules.parallaxObject.init()
  modules.mouseParallaxObject.init()
  modules.appearObject.init()
  modules.smoothScroll.init()
  modules.preload.init(contentsArr[0])
  

  if (!isPageLoaded) {

  } else {

  }

  modules.preload.fnc1stCompleted = () => {
    console.log('loaded 1st')
  }
  modules.preload.load1st()
  console.log("COM AA")
}

const initAfterEnterPage = (contentsArr, modules) => {
  modules.preload.fncOtherCompleted = () => {
    console.log('loaded other')
  }
  modules.preload.loadOther()
  console.log("COM BB")
}

const initBeforeLeavePage = (contentsArr, pageId, modules, stores) => {

}

const initAfterLeavePage = (contentsArr, pageId, modules, stores) => {
}

export default {
  initBeforeEnterPage,
  initAfterEnterPage,
  initBeforeLeavePage,
  initAfterLeavePage,
}
