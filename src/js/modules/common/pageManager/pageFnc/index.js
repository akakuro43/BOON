
const initBeforeEnterPage = async (contentsArr, modules, stores, functions) => {
  console.log("INDEX AA")
}

const initAfterEnterPage = (contentsArr, pageId, modules) => {
  console.log("INDEX BB")
}

const initBeforeLeavePage = (contentsArr, pageId, modules, stores) => {
  
}

const initAfterLeavePage = (contentsArr, pageId, modules, stores) => {

}

const clear = (modules) => {

}

export default {
  initBeforeEnterPage,
  initAfterEnterPage,
  initBeforeLeavePage,
  initAfterLeavePage,
  clear
}
