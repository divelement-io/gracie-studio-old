function easeOutQuint (t) {
  return 1 + (--t) * t * t * t * t // eslint-disable-line no-param-reassign
}

// function easeOutCubic(t) {
//   return 1 + (--t) * t * t; // eslint-disable-line no-param-reassign
// }

/**
 * Gets the pixel amount that the page has been scrolled by
 * Uses pageYOffset if available for IE compatibility
 */
export const scrollY = (container = window) => {
  if (typeof container.pageYOffset !== 'undefined') {
    return container.pageYOffset
  } else if (typeof container.scrollY === 'number') {
    return container.scrollY
  }

  return container.scrollTop
}

let _scrollAnimateTimer = null
let _pendingResolve = null

function clearScrollToTimer (resolve) {
  window.clearInterval(_scrollAnimateTimer)
  if (resolve) {
    _pendingResolve()
  }
}

const doScrollTo = (container, targetY) => {
  if (container.scrollTo) {
    container.scrollTo(0, targetY)
  } else {
    container.scrollTop = targetY
  }
}

/**
 * Animated scroll
 * @param {Integer} targetY - the pixel destination to scroll to
 * @param {Float} duration (optional) - The duration to animate the scroll (ms)
 */
export function scrollTo (targetY, duration = 400.0, container = window) {
  return new Promise(resolve => {
    if (duration <= 0) {
      doScrollTo(container, targetY)
      return resolve()
    }

    const startTime = Date.now()
    const startY = scrollY(container)
    const distance = targetY - startY

    const updateFrequency = 16 // ms (~ 60fps)

    if (_scrollAnimateTimer) {
      clearScrollToTimer(false)
    }

    _pendingResolve = resolve
    _scrollAnimateTimer = window.setInterval(() => {
      const progress = Math.min(1, (Date.now() - startTime) / duration)
      const delta = easeOutQuint(progress)
      const scrollTop = startY + Math.floor(delta * distance)

      doScrollTo(container, scrollTop)

      if (progress >= 1) {
        clearScrollToTimer(true)
      }
    }, updateFrequency)
  })
}
