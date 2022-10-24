import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import Section from 'src/components/Section'
import Grid, { Container } from 'src/components/Grid'
import Image from 'src/components/Image'

import { colors, mq, typography, globals, util } from 'src/styles'

const Wrapper = styled(Section)`
	padding-bottom: 0;
`


const GalleryContainer = styled(Grid)``

const Row = styled.div`
	${({ margin }) => `
		${mq.mediumAndUp} {
			display: flex;
			flex-direction: row;
			align-items: center;
			flex-wrap: nowrap;
			justify-content: space-between;
			margin-bottom: ${margin}em;
		}
	`}
`

const ImageItem = styled(Image)`
	background: ${colors.lightGrey};
	${({
		percent, index, rowCount, margin, direction
	}) => {
		let width = 100
		let decimalMargin = 0
		if (rowCount > 1) {
			if (index === 0) {
				width = 100 - percent
				decimalMargin = ((100 - percent) / 100) * margin
			}
			if (index === 1) {
				width = percent
				decimalMargin = (percent / 100) * margin
			}
		}

		return `
			${mq.mediumAndUp} {
				object-fit: cover;
				flex-basis: 0;
				align-items: ${direction};
				width: calc(${width}% - ${decimalMargin}em);
			}
		`
	}}
`

const ImageCaption = styled.p`
	margin-top: 0.75rem;
	color: ${colors.lightTextColor};
	${typography.bodySmall}
`

const ImageWrapper = styled.div`
	${({
		percent, index, rowCount, margin, direction
	}) => {
		let width = 100
		let decimalMargin = 0
		if (rowCount > 1) {
			if (index === 0) {
				width = 100 - percent
				decimalMargin = ((100 - percent) / 100) * margin
			}
			if (index === 1) {
				width = percent
				decimalMargin = (percent / 100) * margin
			}
		}

		return `
			margin-bottom: 4vw;
			${mq.mediumAndUp} {
				margin-bottom: 0;
				object-fit: cover;
				align-items: ${direction};
				width: calc(${width}% - ${decimalMargin}em);
			}
		`
	}}
`


const Images = ({
	theme,
	prevTheme,
	nextTheme,
	isFirstSection,
	isLastSection,
	images
}) => {

	console.log('images', images)

	const structuredImages = images.reduce((gallery, sanityImage) => {

		const { caption, image: { asset: { metadata: { dimensions }, ...asset } } } = sanityImage
		const currentRow = gallery[gallery.length - 1]
		if (currentRow) {
			const prevImage = currentRow[currentRow.length - 1]
			const prevLandscape = prevImage && prevImage.width / prevImage.height > prevImage.height / prevImage.width
			if (!prevLandscape && currentRow.length < 2) {
				currentRow.push({...asset, ...dimensions, caption})
			} else {
				// Start new Row
				gallery.push([{...asset, ...dimensions, caption}])
			}
		} else {
			gallery.push([{...asset, ...dimensions, caption}])
		}
		return gallery
	}, [])

	return (
		<Wrapper
			prevTheme={prevTheme}
			setTheme={theme}
			nextTheme={nextTheme}
			isFirstSection={isFirstSection}
			isLastSection={isLastSection}
		>
				<Container>
					{structuredImages?.map((row, rowIndex) => {
						const margin = 2.5
						return (
							<Row margin={margin} key={rowIndex}>
								{row.map((image, imageIndex) => {
									const rowWidth = row.reduce((width, img) => width + img.width, 0)
									const heightRatio = row.length > 1 ? row[1].height / row[0].height : 1
									const decimalWidth = row.length > 1 ? rowWidth / (row[1].width + row[0].width * heightRatio) : 1
									const percent = row.length > 1 ? ((row[1].width * decimalWidth) / rowWidth) * 100 : 100
									const desktopSize = imageIndex === 0 && percent !== 100 ? 100 - percent : percent
									return (
										<ImageWrapper
											key={imageIndex}
											margin={margin}
											percent={percent}
											direction={rowIndex % 2 === 0 ? 'flex-start' : 'flex-end'}
											index={imageIndex}
											rowCount={row.length}
										>
											<ImageItem
												ratio={image.height / image.width}
												image={image.gatsbyImageData}
												sizes={`(min-width: ${mq.smallBreakpoint}px) ${desktopSize}vw, 86vw`}
											/>
											<ImageCaption>
												{image.caption}
											</ImageCaption>
										</ImageWrapper>
									)
								})}
							</Row>
						)
					})}
				</Container>
		</Wrapper>
	)
}

export default Images
