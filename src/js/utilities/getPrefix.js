// by Paul Irish

// find out what prefix this browser supports.
// usage: getPrefix('transform') // 'WebkitTransform'
//        returns false if unsupported.

var cache = {}
const prefixes = ['Moz','Khtml','Webkit','O','ms'],
      elem     = document.createElement('div')

export default function getPrefix(prop) {
    if (prop in cache) {
        return cache[prop]
    }

    if (prop in elem.style){
        return (cache[prop] = prop)
    }

    const upper = prop.charAt(0).toUpperCase() + prop.slice(1)

    for (let len = prefixes.length; len--;){
        if ((prefixes[len] + upper) in elem.style) {
            return (cache[prop] = prefixes[len] + upper)
        }
    }

    return false;
}
