let _hasSrcset
const srcset = () => {
  // only compute if no memoized result
  if (_hasSrcset !== !!_hasSrcset) {
    _hasSrcset = 'srcset' in document.createElement('img')
  }

  return _hasSrcset
}

let _hasPointerEvents
const pointerevents = () => {
  if (_hasPointerEvents !== !!_hasPointerEvents) {
    _hasPointerEvents = 'onpointerdown' in window
  }

  return _hasPointerEvents
}

let _hasTouchEvents
const touchevents = () => {
  if (_hasTouchEvents !== !!_hasTouchEvents) {
    _hasTouchEvents = 'ontouchstart' in window
  }

  return _hasTouchEvents
}

let _supportsPassive
const passiveListener = () => {
  if (_supportsPassive !== !!_supportsPassive) {
    _supportsPassive = false
    try {
      const opts = Object.defineProperty({}, 'passive', {
        get: function () {
          _supportsPassive = true
          return false
        }
      })
      window.addEventListener('test', null, opts)
    } catch (e) {}
  }

  return _supportsPassive
}

export {
  passiveListener,
  pointerevents,
  srcset,
  touchevents
}
