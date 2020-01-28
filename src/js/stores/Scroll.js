export default class Scroll {
  constructor() {
    this.defaultScroll = 0; // ブラウザデフォルトスクロール値
    this.smoothScroll = 0; // スムーススクロール地
    this.smoothScrollPrev = 0;
    this.scrollSpeed = 0; // スクロールスピード
    this.scrollProgress = 0; // プログレス
    this.direction = 'none'
    this.isRun = true
  }

  scroll() {
    if(!this.isRun) return
    this.defaultScroll = window.scrollY || window.pageYOffset || document.documentElement.scrollTop
  }

  update(val) {
    if(!this.isRun) return
    this.smoothScroll = val.smoothScroll; // スムーススクロール地
    this.scrollSpeed = val.scrollSpeed; // スクロールスピード
    this.scrollProgress = val.scrollProgress; // プログレス
    this.check()
  }
  check() {
    if (this.smoothScroll < this.smoothScrollPrev) {
      this.direction = "up";
    } else if (this.smoothScroll > this.smoothScrollPrev) {
      this.direction = "down";
    } else {
      this.direction = "none";
    }
    this.smoothScrollPrev = this.smoothScroll
  }
  clrearScrollPositon() {
    this.defaultScroll = 0;
    this.smoothScroll = 0;
  }
}
