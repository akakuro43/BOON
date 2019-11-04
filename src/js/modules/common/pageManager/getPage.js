import blank from './pageFnc/blank'
import index from './pageFnc/index'
import about from './pageFnc/about'
import service from './pageFnc/service'


export default function(pageId) {
  switch (pageId) {
    case 'index':
      return index
      break
    case 'service':
      return service
      break
    case 'about':
      return about
      break
    default:
      return blank
  }
}
