import React from 'react'

const initialState = {
  modal: false,
  mobileMenu: false,
  cart: false,
  pageTransition: 'fade',
  toggleModal: () => { },
  toggleMobileMenu: () => { },
  setPageTransition: () => { },
  toggleCart: () => { },
}

export const AppContext = React.createContext(initialState)

class AppState extends React.Component {
  constructor (props) {
    super(props)
    this.state = initialState
  }

  // componentDidMount () {
  //   document.addEventListener('keydown', this.escFunction, false)
  // }

  // componentWillUnmount () {
  //   document.removeEventListener('keydown', this.escFunction, false)
  // }

  // escFunction = e => {
  //   if (e && e.keyCode === 27) { // escape key maps to keycode `27`
  //     this.toggleCart()
  //   }
  // }

  toggleMobileMenu = () => {
    const { mobileMenu } = this.state
    if (!mobileMenu) this.setState({ mobileMenu: true })
    else this.setState({ mobileMenu: false })
  }

  toggleModal = id => {
    if (id) {
      this.setState({ modal: id })
    } else {
      this.setState({ modal: '' })
    }
  }

  setPageTransition = type => {
    if (type && this.state.pageTransition !== type) {
      this.setState({ pageTransition: type })
    }
  }

  toggleCart = () => {
    const { cart } = this.state
    if (!cart) this.setState({ cart: true })
    else this.setState({ cart: false })
  }

  render () {
    const { children } = this.props
    return (
      <AppContext.Provider
        value={{
          ...this.state,
          toggleMobileMenu: this.toggleMobileMenu,
          toggleModal: this.toggleModal,
          setPageTransition: this.setPageTransition,
          toggleCart: this.toggleCart
        }}
      >
        {children}
      </AppContext.Provider>
    )
  }
}

export const withAppState = Component => props => (
  <AppContext.Consumer>
    {context => (
      <Component {...props}
        appContext={context}
      />
    )}
  </AppContext.Consumer>
)

export default AppState
