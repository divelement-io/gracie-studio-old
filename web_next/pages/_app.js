import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Global, css } from '@emotion/react'
import globalStyles from 'styles/globalStyles'
import ScrollListener from 'components/ScrollListener'
import AppProvider from 'state/AppState'
import PageTransition from 'components/PageTransition'

function MyApp({ Component, pageProps }) {
	const location = typeof window !== 'undefined' && window?.location
	const router = useRouter()
	return (
		<>
			<Global
				styles={css`${ globalStyles }`}
			/>
			<AppProvider>
        <ScrollListener>
					<PageTransition location={location || { pathName: '/' }}>
						<Component
							{...pageProps}
						/>
					</PageTransition>
				</ScrollListener>
			</AppProvider>
		</>
	)
}

export default MyApp
