import React, { useState, useEffect } from 'react'
import groq from 'groq'
import client, { navQuery } from 'client'
import sanityClient from '@sanity/client'

// const client = sanityClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_STUDIO_API_PROJECT_ID,
//   dataset: process.env.NEXT_PUBLIC_SANITY_STUDIO_API_DATASET || 'production',
//   apiVersion: '2021-06-12', // use current UTC date - see "specifying API version"!
//   token: process.env.REACT_APP_SANITY_TOKEN, // or leave blank for unauthenticated usage
//   useCdn: true, // `false` if you want to ensure fresh data
// })

const initialState = {
  modal: false,
  mobileMenu: false,
  cart: false,
  pageTransition: 'fade',
  sanity: client,
  pages: [],
  settings: [],
  navigation: [],
  toggleModal: () => { },
  toggleMobileMenu: () => { },
  setPageTransition: () => { },
  toggleCart: () => { },
}

export const AppContext = React.createContext(initialState)

const AppState = ({ children }) => {
  const [state, setState] = useState(initialState)

  const toggleModal = id => {
    if (id) {
      setState({ ...state, modal: id })
    } else {
      setState({ ...state, modal: '' })
    }
  }

  const setPageTransition = type => {
    if (type && state.pageTransition !== type) {
      setState({ ...state, pageTransition: type })
    }
  }

  const toggleMobileMenu = () => {
    const { mobileMenu } = state
    if (!mobileMenu) setState({ ...state, mobileMenu: true })
    else setState({ ...state, mobileMenu: false })
  }

  const toggleCart = () => {
    const { cart } = state
    if (!cart) setState({ ...state, cart: true })
    else setState({ ...state, cart: false })
  }

  useEffect(() => {
    const settingsQuery = '*[_id == "siteSettings"][0]'
    const fetchSettings = client.fetch(settingsQuery, {}).then(settings => settings)
    const fetchNavigation = client.fetch(navQuery, { slug: 'main-navigation' }).then(navigation => navigation)
    const fetchFooterNav = client.fetch(navQuery, { slug: 'footer-navigation' }).then(navigation => navigation)

    const allData = Promise.all([fetchSettings, fetchNavigation, fetchFooterNav])
    allData.then(res => {
      setState({ ...state, settings: res[0], navigation: res[1], footerNavigation: res[2] })
    })
  }, [])

  return (
    <AppContext.Provider
      value={{
        ...state,
        toggleModal: toggleModal,
        toggleMobileMenu: toggleMobileMenu,
        setPageTransition: setPageTransition,
        toggleCart: toggleCart
      }}
    >
      {children}
    </AppContext.Provider>
  )
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
