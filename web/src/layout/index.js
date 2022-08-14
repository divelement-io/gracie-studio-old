import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import PropTypes from 'prop-types'
import { Global, css } from '@emotion/react'
import globalStyles from 'src/styles/globalStyles'
import PageTransition from 'src/components/PageTransition'
import NewsletterPopup from 'src/components/NewsletterPopup'
import ScrollListener from 'src/components/ScrollListener'
import IntersectionObserverPolyfill from 'src/components/IntersectionObserverPolyfill'
import AppProvider from 'src/state/AppState'
// import ShopifyProvider from 'src/state/ShopifyState.js'
import './reset.css'

const Layout = ({ children, location }) => (
	<>
		<StaticQuery
			query={graphql`
				query SiteTitleQuery {
					site {
						siteMetadata {
							title
						}
					}
				}
			`}
			render={data => (
				<>
					<Global
						styles={css`${ globalStyles }`}
					/>
					<IntersectionObserverPolyfill>
						<AppProvider>
							<ScrollListener>
								<PageTransition location={location || { pathName: '/' }}>
									{children}
								</PageTransition>
							</ScrollListener>
							<NewsletterPopup/>
						</AppProvider>
					</IntersectionObserverPolyfill>
				</>
			)}
		/>
	</>
)

Layout.propTypes = {
	children: PropTypes.node.isRequired
}

export default Layout
