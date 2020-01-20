import axios from 'axios'
import sleep from '../../../utilities/sleep'
import commonFnc from './pageFnc/common'
import getPage from './getPage'

const CLASSNAME_LINK = 'js-pjax-link'
const CLASSNAME_EXCLUDE = 'js-pjax-exclude'
const CLASSNAME_PAGE = 'js-pjax-page'
const CLASSNAME_PAGE_WRAPPER = 'js-pjax-page-wrapper'
const CLASSNAME_CONTENTS = 'js-pjax-contents'

const CLASSNAME_TRANSITION_ARRIVED = 'is-arrived-contents'
const CLASSNAME_TRANSITION_LEAVED = 'is-leaved-contents'
const TIME_REMOVE_PREV_CONTENTS = 200
const TIME_BEFORE_TRANSITION = 300
const GA_TRACKING_ID = 'GTM-XXX'

export default class PageManager {
  constructor(isPjax) {
    this.isPjax = isPjax !== false
    this.modules = null
    this.stores = null
    this.functions = null
    this.elm = {
      page: document.querySelector(`.${CLASSNAME_PAGE}`),
      wrapper: document.querySelector(`.${CLASSNAME_PAGE_WRAPPER}`),
      contents: document.querySelector(`.${CLASSNAME_CONTENTS}`),
      contentsAfter: null,
      clickTarget: null,
    }
    this.href = location.pathname + location.search
    this.hash = null
    this.currentPageFnc = null
    this.isTransition = false
    this.isPageLoaded = false
    this.currentPageId = null
    this.beforePageId = null
  }


  async onLoad() {
    // ページのIDと機能を切り替え
    this.switchPage()
    // ページ共通処理実行
    await commonFnc.initBeforeEnterPage([document], this.isPageLoaded, this.currentPageId,  this.modules, this.stores, this.functions)
    // ページ個別処理実行
    await this.currentPageFnc.initBeforeEnterPage(
      [this.elm.contents], this.modules, this.stores, this.functions
    )
    // Pjaxがoffの場合は、以降の処理を行わない
    if(!this.isPjax) {
      // 画面表示後の処理
      this.transitEnd()
      return
    }
    // Pjax繊維のイベントを設置
    this.onPjaxLinks(document)
    // リサイズ処理
    this.functions.resize()
    // 画面表示後の処理
    this.transitEnd()
    // ロード完了を知らせる
    this.isPageLoaded = true
    this.on()
    return
  }

  // 現在のページのIDと機能を取得
  switchPage() {
    this.beforePageId = this.currentPageId
    this.currentPageId = this.elm.page.dataset.pageId
    this.currentPageFnc = getPage(this.currentPageId)
    this.elm.page.classList.add(this.currentPageId)
  }


  async send() {
    // 画面遷移スタート直前の設定変更
    this.settingChangeBeforeTransit()
    commonFnc.initBeforeLeavePage(
      [this.elm.contents], this.currentPageId, this.modules, this.stores
    );
    await this.currentPageFnc.initBeforeLeavePage(
      [this.elm.contents], this.currentPageId, this.modules, this.stores
    );
    
    let from = new Date()
    // axios.
    axios.get(this.href)
      .then((response) => {
          let to = new Date()
          let ms = to.getTime() - from.getTime()
          let enterTime = TIME_BEFORE_TRANSITION - ms
          enterTime = (enterTime <= 0) ? 0 : enterTime
          setTimeout(() => {
            commonFnc.initAfterLeavePage(
              [this.elm.contents], this.currentPageId, this.modules, this.stores
            )
            this.currentPageFnc.initAfterLeavePage(
              [this.elm.contents], this.currentPageId, this.modules, this.stores
            )
            this.replaceContent(response)
          }, enterTime)

        
      })
      .catch((error) => {
        // console.log(error)
        console.error(`A post by axios had an error : ${error.response.status} ${error.response.statusText}`)
        if (error.response.status === 404) this.replaceContent(error.response)
      })

    this.leave()
  }

  // コンテンツ切り替え
  async replaceContent(response) {
    this.currentPageFnc.clear(this.modules)
    // コンテンツ取得
    const currentContents = this.elm.contents
    currentContents.classList.remove('js-contents')

    // 次ページのコンテンツ取得
    const responseHtml = document.createElement('div')
    responseHtml.innerHTML = response.data
    const responsePage = responseHtml.querySelector(`.${CLASSNAME_PAGE}`)
    const responseContents = responseHtml.querySelector(`.${CLASSNAME_CONTENTS}`)

    // 前/次ページを重ねるように配置
    responseContents.style.position = 'fixed'
    responseContents.style.top = '0'
    responseContents.style.left = '0'
    responseContents.style.right = '0'

    // 次ページのDOMを追加
    this.elm.page.dataset.pageId = responsePage.dataset.pageId
    this.elm.wrapper.appendChild(responseContents)
    this.elm.contents = responseContents
    // タイトル変更
    document.title = responseHtml.querySelector('title').innerHTML

    // Google Analyticeにログを送信
    // if (window.ga) ga('send', 'pageview', window.location.pathname.replace(/^\/?/, '/') + window.location.search)
    if (window.gtag) {
      gtag('config', GA_TRACKING_ID, {
        'page_title': document.title,
        'page_path':  window.location.pathname.replace(/^\/?/, '/') + window.location.search
      })
    }

    // ページのIDと機能を切り替え
    this.switchPage()
    

    // ページ遷移効果のタイマーを実行した後、現在のページを削除
    setTimeout(() => {
      this.elm.wrapper.removeChild(currentContents)

      // トップへ戻る
      if(this.hash || !this.modules.smoothScroll.isRun) {
        this.modules.anchorLink.move(this.elm.clickTarget, this.hash)
      } else {
        window.scrollTo(0, 0)
      }
      
      this.elm.page.classList.remove(this.beforePageId)
      this.modules.smoothScroll.resize()
      this.functions.resize()
      
    }, TIME_REMOVE_PREV_CONTENTS)

    // ページ遷移後の各ページ初期化処理
    commonFnc.initBeforeEnterPage(
      [this.elm.contents],
      this.isPageLoaded, this.currentPageId, this.modules, this.stores, this.functions
    )
    await this.currentPageFnc.initBeforeEnterPage(
      [this.elm.contents], this.modules, this.stores, this.functions
    )

    // 差し替えたページの本文に対しての非同期遷移のイベント設定
    this.onPjaxLinks(this.elm.contents)
    this.transitEnd()
  }

  // 画面遷移開始
  transitStart() {
    // 画面遷移中の場合処理をやめる
    if (this.isTransition) return
    this.isTransition = true
    this.href = location.pathname + location.search
    this.send()
  }

  // 画面遷移終了
  async transitEnd() {
    await sleep(50)
    this.arrive()

    // ページ遷移間に設定したスタイルのリセット
    this.elm.contents.style.position = ''
    this.elm.contents.style.top = ''
    this.elm.contents.style.left = ''
    this.elm.contents.style.right = ''

    // ページ遷移中のフラグを変更
    this.isTransition = false;
    this.settingChangeAfterTransit()

    if (this.href !== location.pathname + location.search) {
      this.transitStart()
      return
    }

    // ページ遷移後の各処理
    commonFnc.initAfterEnterPage(
      [this.elm.contents], this.modules
    );
    this.currentPageFnc.initAfterEnterPage(
      [this.elm.contents], this.currentPageId, this.modules
    );
  }

  // 画面遷移
  transit(pathname, hash) {
    let href = pathname + hash
    let search = location.search
    var pos = search.indexOf("?")
    if (pos >= 0) search = search.substring(0, pos)
    if (this.removeLastSlash(pathname) == this.removeLastSlash(location.pathname + search)) {
      this.modules.anchorLink.move(this.elm.clickTarget, hash, true)
      return
    }
    this.hash = hash;
    history.pushState(null, null, href)
    this.transitStart()
  }
  // urlの最後にスラッシュがある場合削除する
  removeLastSlash(text) {
    if(text.slice(-1) == '/') {
      text = text.slice(0, -1)
    }
    return text
  }

  // リンクにPjax繊維のイベントを設定
  onPjaxLinks(content) {
    const self = this
    const elms = content.getElementsByTagName('a')

    for (var i = 0; i < elms.length; i++) {
      const elm = elms[i]
      const href = elm.getAttribute('href')
      const target = elm.getAttribute('target')
      if (
        elm.classList.contains(CLASSNAME_LINK) // Pjax遷移するcass
        || (
          !elm.classList.contains(CLASSNAME_EXCLUDE) // Pjax遷移を除外するclass
          && target !== '_blank' // taget属性に"_blank"があればPjax遷移しない
          // && href.indexOf('#') !== 0 // アンカーリンク（＃）にはPjax遷移しない // アンカーリンクを行えるようにする為コメントアウト
          && !(href.indexOf('http') > -1 && href.match(location.host) === null) // ホスト名が別の場合Pjax遷移しない
        )
      ) {
        elm.addEventListener('click', function(event) {
          event.preventDefault()
          self.elm.clickTarget = this
          self.transit(this.pathname, this.hash)
        })
      }
    }
  }
  arrive() {
    this.elm.contents.classList.add(CLASSNAME_TRANSITION_ARRIVED)
    this.elm.contents.classList.remove(CLASSNAME_TRANSITION_LEAVED)
  }

  leave() {
    this.elm.contents.classList.remove(CLASSNAME_TRANSITION_ARRIVED)
    this.elm.contents.classList.add(CLASSNAME_TRANSITION_LEAVED)
  }
  on() {
    window.addEventListener('popstate', (event) => {
      event.preventDefault()
      history.scrollRestoration = 'manual'
      this.transitStart(true)
    })
  }
  settingChangeBeforeTransit() {
    this.modules.smoothScroll.onFixedScroll()
  }
  settingChangeAfterTransit() {
    this.modules.smoothScroll.offFixedScroll()
    this.modules.renderer.start()
    
  }

}
