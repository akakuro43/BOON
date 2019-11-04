import ReplaceImg from '../../ReplaceImg'

const initBeforeEnterPage = (contentsArr, isPageLoaded, pageId, modules, stores, functions) => {
  modules.parallaxObject.init()
  modules.mouseParallaxObject.init()
  modules.appearObject.init()
  modules.smoothScroll.init()
  ReplaceImg(stores.device.device, functions)
  
  
  
  if (!isPageLoaded) {
    
  } else {

  }
}

const initAfterEnterPage = (contentsArr, modules) => {
    
    
  
  
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
