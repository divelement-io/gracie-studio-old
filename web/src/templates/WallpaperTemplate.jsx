import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import SEO from 'src/components/SEO'
import Header from 'src/components/Header'
import Footer from 'src/components/Footer'

import Section from 'src/components/Section'
import { Container } from 'src/components/Grid'
import Button from 'src/components/Button'
import ScrollEntrance from 'src/components/ScrollEntrance'
import WideMedia from 'src/components/WideMedia'

import Panels from 'src/components/Panels'
import Wallpaper from 'src/components/Wallpaper'
import WallpaperGrid from 'src/components/WallpaperGrid'
import ImageGrid from 'src/components/ImageGrid'
import Actions from 'src/components/Actions'

import { getSlugLink } from 'src/utils/format'

const WallpaperTempate = ({ data }) => {

	const wallpaper = data?.sanityWallpaper?.content?.main
	const wallpaperMeta = data?.sanityWallpaper?.content?.meta
	const collections = data?.sanityWallpaper?.collections
	const path = wallpaper?.slug?.current

	const {
		panels,
		atfImage,
		mainImage,
		id,
		title,
		_rawDescription: description,
		width,
		height,
		images,
		relatedWallpapers,
	} = wallpaper


	console.log(panels)
	//const panels = ['a', 'b', 'c', 'd', 'e', 'f']

	return (
		<>
			<SEO
				pagePath={path}
				title={wallpaper.title}
				description={wallpaperMeta?.metaDescription}
				keywords={wallpaperMeta?.keywords}
				shareImage={wallpaperMeta?.shareImage?.asset?.url || mainImage?.asset?.url }
			/>
			<Header
				hasAtf={true}
				location={path}
			/>
			{/* Panels */}
			{panels && panels.length > 0 && (
				<Panels
					panels={panels}
				/>
			)}
			{/* Wide Media */}
			{!panels || panels.length === 0 && (
				<WideMedia
					media={{image: atfImage || mainImage, mediaType: 'image'}}
					width="fullWidth"
					height="shortHeight"
					overlayTextAlignment="center"
					isFirstSection={true}
					theme="transparent"
					nextTheme="default"
				/>
			)}
			{/* Wallpaper */}
			<Wallpaper
				isFirstSection={false}
				isLastSection={false}
				prevTheme="transparent"
				theme="default"
				nextTheme="transparent"
				id={id}
				title={title}
				description={description}
				mainImage={mainImage}
				width={width}
				height={height}
			/>
			{/* Interior Images */}
			<ImageGrid
				isFirstSection={false}
				isLastSection={false}
				prevTheme="default"
				theme="default"
				nextTheme="default"
				images={images}
			/>

			{/* Products */}
			<div><h1>TODO Products</h1></div>
			{/* Related Wallpapers */}

			{relatedWallpapers && relatedWallpapers.length > 0 && (
				<WallpaperGrid
					isFirstSection={false}
					isLastSection={false}
					prevTheme="default"
					theme="default"
					nextTheme="default"
					title={`More ${collections[0]?.content?.main?.title}`}
					wallpapers={relatedWallpapers}
				/>
			)}
			{/* Actions : All Collections | This Collection */}
			{}

				<Section>
					<Container>
						<Actions
							actions={[{
								_type: "button",
								type: "pageLink",
								title: "View All Collections",
								link: {
									content: { main: { slug: { current: '/collections'}}}
								},
								theme: "primary"
							}].concat(collections.map(({ _id, content: {main: { slug, title }}}) => {
								return ({
									_type: "button",
									type: "pageLink",
									title,
									link: {
										content: {
											main: {
												slug,
												parentPage: {
													content: {
														main: { slug: '/collections'}
													}
												}
											}
										}
									},
									theme: "secondary"
									})
							}))}
						/>
					</Container>
				</Section>
			<Footer />
		</>
	)
}

export const wallpaperQuery = graphql`
	query ($id: String!) {
		sanityWallpaper(id: { eq: $id }) {
			...Wallpaper
		}
	}
`

export default WallpaperTempate