import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import Section from 'src/components/Section'
import Grid, { Container } from 'src/components/Grid'
import Button from 'src/components/Button'
import ScrollEntrance from 'src/components/ScrollEntrance'
import SanityRichText from 'src/components/SanityRichText'

import Image from 'src/components/Image'

import { colors, animations, typography, globals, util } from 'src/styles'


const Wrapper = styled(Section)``

const WallpaperContent = styled.div``

const WallpaperImage = styled.div``

const WallpaperId = styled.span`
	display: block;
	${ typography.h6 }
`

const WallpaperTitle = styled.h1`
	${ util.responsiveStyles('font-size', 36, 36, 30, 30) };
	${ util.responsiveStyles('margin-top', 24, 24, 16, 16) };
	${ util.responsiveStyles('margin-bottom', 24, 24, 16, 16) };
`

const WallpaperDimensions = styled.span`
	display: block;
`

const WallpaperDescription = styled(SanityRichText)`
	margin-top: 0.5rem;
	${ util.responsiveStyles('margin-bottom', 56, 56, 40, 40) };

`

const Wallpaper = ({
	theme,
	prevTheme,
	nextTheme,
	isFirstSection,
	isLastSection,
	id,
	title,
	description,
	mainImage: { asset: {
		gatsbyImageData,
		altText,
		metadata: { dimensions }
	}},
	width,
	height,
}) => (
	<Wrapper
		prevTheme={prevTheme}
		setTheme={theme}
		nextTheme={nextTheme}
		isFirstSection={isFirstSection}
		isLastSection={isLastSection}
	>
		<Container>
			<Grid
				small="[5] 1 g [6]"
				vAlign="bottom"
			>
				<WallpaperContent>
					<ScrollEntrance>
						<WallpaperId>{id}</WallpaperId>
						<WallpaperTitle>{title}</WallpaperTitle>
						<WallpaperDimensions>{width}" x {height}"</WallpaperDimensions>
						<WallpaperDescription text={description}/>
						<Button
							setTheme="defaultOutlined"
						>
							Inquire about this design
						</Button>
					</ScrollEntrance>
				</WallpaperContent>
				<WallpaperImage>
					<ScrollEntrance>
						<Image
							image={{...gatsbyImageData}}
							alt={altText}
							width={dimensions.width}
							height={dimensions.height}
						/>
					</ScrollEntrance>
				</WallpaperImage>
			</Grid>
		</Container>
	</Wrapper>
)


export default Wallpaper
