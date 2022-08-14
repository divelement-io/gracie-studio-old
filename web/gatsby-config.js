const path = require('path')
require('dotenv').config({
	path: `../.env.${ process.env.NODE_ENV || 'development' }`,
})

const isProd = process.env.NODE_ENV === 'production'
const previewEnabled = (process.env.GATSBY_IS_PREVIEW || 'false').toLowerCase() === 'true'

module.exports = {
	siteMetadata: {
		title: 'GW Gatsby Sanity Base',
		siteUrl: process.env.GATSBY_SITE_URL,
	},
	plugins: [
		{
			resolve: 'gatsby-source-sanity',
			options: {
				projectId: process.env.GATSBY_SANITY_PROJECT_ID,
				dataset: process.env.GATSBY_SANITY_DATASET,
				token: process.env.GATSBY_SANITY_READ_TOKEN,
				watchMode: !isProd, // watchMode only in dev mode
				overlayDrafts: !isProd || previewEnabled, // drafts in dev & Gatsby Cloud Preview
			},
		},
		{
			resolve: 'gatsby-plugin-layout',
			options: {
				component: require.resolve('./src/layout/index.js'),
			},
		},
		'gatsby-plugin-emotion',
		'gatsby-plugin-gatsby-cloud',
		'gatsby-plugin-image',
		{
			resolve: 'gatsby-plugin-google-gtag',
			options: {
				trackingIds: [
					process.env.GATSBY_GA_TRACKING_ID,
					process.env.GATSBY_GTM_TRACKING_ID
				]
			},
		},
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-sitemap',
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				icon: 'src/assets/images/favicon.png',
				legacy: false,
				include_favicon: false
			},
		},
		{
			resolve: 'gatsby-plugin-sharp',
			options: {
				defaultQuality: 80
			}
		},
		'gatsby-transformer-sharp',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'assets',
				path: path.join(__dirname, './src/assets'),
			},
		},
		{
			resolve: 'gatsby-plugin-react-svg',
			options: {
				rule: {
					include: /assets/
				}
			}
		},
		'gatsby-plugin-remove-console',
		{
			resolve: 'gatsby-plugin-root-import',
			options: {
				src: path.join(__dirname, 'src'),
			},
		},
		{
			resolve: 'gatsby-plugin-facebook-pixel',
			options: {
				pixelId: process.env.GATSBY_FB_PIXEL_ID,
			},
		}
	],
}
