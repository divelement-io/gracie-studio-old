import React, { Fragment } from 'react'
import styled from '@emotion/styled'
import { TransitionGroup, Transition } from 'react-transition-group'
import { colors } from 'src/styles'
import { withAppState } from 'src/state/AppState'

const timeout = 500
const hang = 0

const PageContent = styled.div`
  // transition: opacity ${ timeout }ms ease-in-out;
  display: flex;
  flex-direction: column;
  ${ ({ transitionStatus }) => transitionStatus === 'entering' && `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    opacity: 0;
  ` }
  ${ ({ transitionStatus }) => transitionStatus === 'entered' && `
    opacity: 1;
  ` }
  ${ ({ transitionStatus }) => transitionStatus === 'exiting' && `
    opacity: 0;
    opacity: 1;
  ` }
  ${ ({ transitionStatus }) => transitionStatus === 'exited' && `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    opacity: 0;
  ` }
`

const TransitionOverlay = styled.div`
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
  background: ${ ({ bgColor }) => bgColor };
  ${ ({ overlay, effect, transitionStatus }) => effect === 'fade' && `
    transition: opacity ${ timeout }ms ease-in-out;
    opacity: 0;
    ${ transitionStatus === 'entered' && 'opacity: 1;' }
  ` }
  ${ ({ overlay, effect, transitionStatus }) => effect === 'wipeUp' && `
    transition: transform ${ timeout }ms cubic-bezier(0.785, 0.135, 0.150, 0.860);
    transform-origin: 50% 0%;
    transform: scaleY(0);
    ${ transitionStatus === 'entered' && `
      transform: scaleY(1);
      transform-origin: 50% 100%;
    ` }
  ` }
  ${ ({ overlay, effect, transitionStatus }) => effect === 'wipeDown' && `
    transition: transform ${ timeout }ms cubic-bezier(0.785, 0.135, 0.150, 0.860);
    transform-origin: 50% 100%;
    transform: scaleY(0);
    ${ transitionStatus === 'entered' && `
      transform: scaleY(1);
      transform-origin: 50% 0%;
    ` }
  ` }
  ${ ({ overlay, effect, transitionStatus }) => effect === 'wipeRight' && `
    transition: transform ${ timeout }ms cubic-bezier(0.785, 0.135, 0.150, 0.860);
    transform-origin: 100% 50%;
    transform: scaleX(0);
    ${ transitionStatus === 'entered' && `
      transform: scaleX(1);
      transform-origin: 0% 50%;
    ` }
  ` }
  ${ ({ overlay, effect, transitionStatus }) => effect === 'wipeLeft' && `
    transition: transform ${ timeout }ms cubic-bezier(0.785, 0.135, 0.150, 0.860);
    transform-origin: 0% 50%;
    transform: scaleX(0);
    ${ transitionStatus === 'entered' && `
      transform: scaleX(1);
      transform-origin: 100% 50%;
    ` }
  ` }
`

const transitionColors = [
  colors.bgColor
]

// var overlayColor = transitionColors[Math.floor(Math.random() * transitionColors.length)];

class PageTransition extends React.PureComponent {
  state = {
    overlay: false, // true If you want to transition on page load
    pathname: null,
    overlayColor: transitionColors[0]
  }

  handleEntered = (node, isAppearing) => {
    setTimeout(() => {
      this.setState({ overlay: false })
    }, hang + timeout)
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.location.pathname !== prevState.pathname) { // Use If you want NO transition on page load
    // if (nextProps.location.pathname !== prevState.pathname || !prevState.pathname) { // Use If you want to transition on page load
      return {
        overlay: prevState.pathname, // prevState.pathname If you want NO transition on page load
        pathname: nextProps.location.pathname,
        overlayColor: transitionColors[Math.floor(Math.random() * transitionColors.length)]
      }
    } else {
      return null
    }
  }

  render () {
    const { children, location, appContext } = this.props
    const { overlay } = this.state

    const overlayColor = this.props.overlayColor || colors.bgColor
    const transitionEffect = appContext.pageTransition

    return (
      <Fragment>
        <TransitionGroup>
          <Transition
            key={location.pathname}
            unmountOnExit={true}
            appear={false}
            timeout={{
              enter: timeout,
              exit: timeout,
            }}
          >
            {status => (
              <PageContent transitionStatus={status}>
                {children}
              </PageContent>
            )}
          </Transition>
        </TransitionGroup>

        <Transition
          in={overlay}
          appear={false} // true If you want to transition on page load
          unmountOnExit={true}
          timeout={{
            enter: 0,
            exit: timeout,
            appear: timeout * 2
          }}
          onEntered={this.handleEntered}
        >
          {status => (<TransitionOverlay style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: overlayColor, zIndex: 20 }} effect={transitionEffect} overlay={overlay} transitionStatus={status} bgColor={overlayColor}/>)}
        </Transition>
      </Fragment>
    )
  }
}

export default withAppState(PageTransition)
