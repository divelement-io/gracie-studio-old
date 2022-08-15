import React from 'react'
import { noop, throttle } from 'lodash'
import { passiveListener } from 'src/utils/feature-detect'
import * as wndw from 'src/utils/wndw'

const defaultValue = {
  scrolledToTop: true,
  scrolledToBottom: false,
  scrollY: 0,
  hasScrolled: true,
  scrolledUp: false,
  doScroll: noop,
}

const { Provider, Consumer } = React.createContext(defaultValue)

class ScrollListener extends React.Component {
  static Consumer = Consumer

  state = defaultValue

  componentDidMount () {
    this.observe()
  }

  componentWillUnmount () {
    this.unobserve()
  }

  _scrollHandler = () => {
    const newScrollY = Math.max(
      0,
      wndw.scrollY()
    )

    // const pageHeight = document.body.clientHeight

    const delta = newScrollY - this.lastScrollY
    this.lastScrollY = newScrollY

    if (this.state.ignoreScroll || isNaN(delta) || this.state.ignoreScroll) {
      return
    }

    // const scrolledUp = delta < 0

    if (delta === 0) {
      return
    }

    //
    if (!this.state.hasScrolled && this.lastScrollY > 0) {
      if (!this.state.hasScrolled) {
        this.setState({ hasScrolled: true })
      }
    }

    if (newScrollY === 0 && !this.state.scrolledToTop) {
      if (!this.state.scrolledToTop) {
        this.setState({ scrolledToTop: true })
      }
    } else {
      if (this.state.scrolledToTop) {
        this.setState({ scrolledToTop: false })
      }
    }

    if (newScrollY >= document.body.clientHeight - window.innerHeight * 1.2) {
      if (!this.state.scrolledToBottom) {
        this.setState({ scrolledToBottom: true })
      }
    } else {
      if (this.state.scrolledToBottom) {
        this.setState({ scrolledToBottom: false })
      }
    }

    // Only use if showing and hiding element
    // based on scroll up and down
    // (ie: native safari bottom bar)
    // if (this.state.scrolledUp !== scrolledUp) {
    //   this.setState({ scrolledUp: scrolledUp })
    // }

    if (!this.state.hasScrolled && this.lastScrollY > 0) {
      this.setState({ hasScrolled: true })
    }
  }

  scrollHandler = throttle(this._scrollHandler, 100)

  observe = () => {
    window.addEventListener('scroll', this.scrollHandler, passiveListener() ? { passive: true } : false)
  }

  unobserve = () => {
    window.removeEventListener('scroll', this.scrollHandler, passiveListener() ? { passive: true } : false)
  }

  doScroll = (targetY, duration = 500) => {
    return new Promise(resolve => {
      // Tell scroll listener to ignore until we're done scrolling
      this.setState({
        ignoreScroll: true
      }, () => {
        // ignore flag set, now start scrolling
        wndw.scrollTo(targetY, duration).then(
          () => {
            resolve()
            window.setTimeout(() => {
              // scroll complete
              // use timeout to add buffer before re-enabling scroll listening
              // to handle timing edge cases
              this.setState({
                ignoreScroll: false
              })
            },
            100
            )
          })
      })
    })
  }

  render () {
    const {
      scrolledToTop,
      scrolledToBottom,
      scrollY,
      scrolledUp,
      hasScrolled,
    } = this.state

    const { children } = this.props

    return (
      <Provider
        value={{
          scrolledToTop,
          scrolledToBottom,
          scrollY,
          scrolledUp,
          hasScrolled,
          doScroll: this.doScroll,
        }}
      >
        {children}
      </Provider>
    )
  }
}

export default ScrollListener
