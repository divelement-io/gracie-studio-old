import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { useContext } from 'react'
import { AppContext } from 'state/AppState'
import { buildSrc } from 'utils/imageHelpers'

function SEO ({
		lang,
		pagePath,
		title,
		description,
		keywords,
		shareImage,
		ogTitle,
		ogImage,
		ogDescription,
		twitterDescription,
		twitterImage,
		twitterTitle
	}) {

	const { settings } = useContext(AppContext)

	console.log(settings)

	// return null

	const sanitySiteSettings = settings

	///
	const metaTitle = title
	const metaDescription = description || sanitySiteSettings?.description
	const metaKeywords = keywords
	shareImage = shareImage?.asset?.url
	///

	const host = process.env.NEXT_PUBLIC_SITE_URL

	// Default SEO content from file structure
	const localTouchIcon = 'images/touch-icon.png'
	const localFavicon = 'images/favicon.png'
	const localShareImage = 'images/share-image.png'
	// Sanity SEO content
	const sanityFavicon = sanitySiteSettings?.favicon?.asset?.url
	const sanityTouchIcon = sanitySiteSettings?.touchicon?.asset?.url
	const siteTitle = sanitySiteSettings?.title

	// const metaFavicon = sanityFavicon || localFavicon
	// const metaTouchIcon = sanityTouchIcon || localTouchIcon
	// const metaShareImage = shareImage || localShareImage
	const metaFavicon = localFavicon
	const metaTouchIcon = localTouchIcon
	const metaShareImage = localShareImage

	// const titleTemplate = pagePath !== 'home' && metaTitle ? `${ metaTitle } | ${ siteTitle || site.siteMetadata.title }` : `${ siteTitle || site.siteMetadata.title }`
	const titleTemplate = metaTitle

	return (
		<Head>
			<meta charSet="utf-8"/><meta http-equiv="x-ua-compatible" content="ie=edge"/>
			{/* */}
			<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5.0, shrink-to-fit=no"/>
			<meta name="title" content={titleTemplate}/>
			<meta name="keywords" content={metaKeywords}/>
			<meta name="description" content={metaDescription}/>
			{/* Twitter */}
			<meta name="twitter:title" content={titleTemplate}/>
			<meta name="twitter:description" content={metaDescription}/>
			{/*<meta name="twitter:creator" content={site.siteMetadata.author}/>*/}
			<meta name="twitter:card" content="summary_large_image"/>
			<meta name="twitter:image" content={metaShareImage}/>
			{/* OG */}
			<meta property="og:title" content={titleTemplate}/>
			<meta property="og:type" content="website"/>
			<meta property="og:description" content={metaDescription}/>
			<meta property="og:image" content={metaShareImage}/>
			<meta property="og:locale" content="en_US" />
			{/* */}
			<link rel="preconnect" href="https://cdn.sanity.io"/>
			<link rel="icon" type="image/png" sizes="32x32" href={metaFavicon}/>
			<link rel="apple-touch-icon" type="image/png" sizes="120x120" href={metaTouchIcon}/>
		</Head>
	)
}

SEO.defaultProps = {
	lang: 'en',
	meta: [],
	keywords: [],
	description: '',
	shareImage: ''
}

SEO.propTypes = {
	description: PropTypes.string,
	lang: PropTypes.string,
	meta: PropTypes.arrayOf(PropTypes.object),
	keywords: PropTypes.arrayOf(PropTypes.string),
	title: PropTypes.string
}

export default SEO
