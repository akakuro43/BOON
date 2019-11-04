export default class Scroll {
  constructor() {
    this.defaultScroll = 0; // ブラウザデフォルトスクロール値
    this.smoothScroll = 0; // スムーススクロール地
    this.scrollSpeed = 0; // スクロールスピード
    this.scrollProgress = 0; // プログレス
  }

  scroll() {
    this.defaultScroll = window.scrollY || window.pageYOffset || document.documentElement.scrollTop
  }

  update(val) {
    this.smoothScroll = val.smoothScroll; // スムーススクロール地
    this.scrollSpeed = val.scrollSpeed; // スクロールスピード
    this.scrollProgress = val.scrollProgress; // プログレス
  }
  clrearScrollPositon() {
    this.defaultScroll = 0;
    this.smoothScroll = 0;
  }
}
