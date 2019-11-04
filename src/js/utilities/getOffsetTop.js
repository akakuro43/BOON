export default function getOffsetTop(el) {
    let offsetTop  = 0

    do {
        offsetTop += el.offsetTop

        el = el.offsetParent
    } while (el)

    return offsetTop
}
