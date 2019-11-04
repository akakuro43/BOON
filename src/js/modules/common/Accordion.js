import sleep from '../../utilities/sleep.js'

const CLASSNAME_ACCORDION = 'js-accordion'
const CLASSNAME_ACCORDION_TARGET = 'js-accordion--target'
const CLASSNAME_ACCORDION_TRIGGER = 'js-accordion--trigger'
const CLASSNAME_ACCORDION_EASE = 'c-accordion-ease'
const CLASSNAME_IS_OPEN = 'is-open'
const IS_OPEN = '.is-open'
const TRANSITION_TIME = 500

export default class Accordion {
  constructor() {
    this.stores = null
    this.functions = null    
  }

  set() {
    let _this = this
    let elmsAccordion = document.querySelectorAll(`.${CLASSNAME_ACCORDION}`)
    Array.from(elmsAccordion, elm => {
      let target = elm.querySelector(`.${CLASSNAME_ACCORDION_TARGET}`)
      let trigger = elm.querySelector(`.${CLASSNAME_ACCORDION_TRIGGER}`)
      trigger.setAttribute('data-h', target.offsetHeight)
      target.style.height = '0px'
      target.classList.add(CLASSNAME_ACCORDION_EASE)

      trigger.addEventListener('click', function (e) {
        let elmAccordion = e.currentTarget.parentElement
        if (elmAccordion.classList.contains(CLASSNAME_IS_OPEN)) {
          elmAccordion.classList.remove(CLASSNAME_IS_OPEN)
          target.style.height = '0px'
        } else {
          elmAccordion.classList.add(CLASSNAME_IS_OPEN)
          target.style.height = `${e.currentTarget.dataset.h}px`
        }
        setTimeout(() => {
          _this.functions.resize()  
        }, TRANSITION_TIME)
      })
    })
  }  
}
