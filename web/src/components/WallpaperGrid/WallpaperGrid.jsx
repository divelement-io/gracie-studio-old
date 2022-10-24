import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import Section from 'src/components/Section'
import Media from 'src/components/Media'
import Grid, { Container } from 'src/components/Grid'
import TextLockup from 'src/components/TextLockup'
import Button from 'src/components/Button'
import ScrollEntrance from 'src/components/ScrollEntrance'
import Image from 'src/components/Image'
import Link from 'src/components/Link'

import { headerHeight } from 'src/components/Header'

import { colors, animations, typography, globals, util } from 'src/styles'
import { themes } from 'src/styles/themes'

import { getSlugLink } from 'src/utils/format'

const Wrapper = styled(Section)`
	padding-bottom: 0;
	${({title, isFirstSection}) => (!title && isFirstSection) && headerHeight('padding-top', 1)}
	${({isLastSection}) => (isLastSection) && `padding-bottom: 0;`}
`

const WallpaperGridTitle = styled.h2`
	${typography.h4};
	${globals.verticalSpacing('padding-bottom')}
`

const WallpaperGridActions = styled.div`
	${globals.verticalSpacing('padding-top')}
`

const SectionContent = styled(Container)`
	text-align: center;
`

const WallpaperImage = styled(Image)`
	margin-bottom: 1rem;
	img[data-main-image] {
		transition: transform ${ animations.slowSpeed } ease-in-out;
	}
	&:hover {
		img[data-main-image] {
			transform: scale(1.15);
		}
	}
`

const WallpaperTitle = styled.h3`
	${typography.body}
	margin-bottom: 0;
	color: ${colors.lightTextColor};
	transition: color ${ animations.mediumSpeed } ease-in-out, opacity ${ animations.mediumSpeed } ease-in-out;
`

const WallpaperId = styled.span`
	${typography.smallCaps}
	transition: color ${ animations.slowSpeed } ease-in-out, opacity ${ animations.slowSpeed } ease-in-out;

	opacity: 0;
	color: ${colors.lightTextColor};
`

const WallpaperItem = styled(Link)`
	display: block;
	text-align: center;
	margin-bottom: 1.5rem;

	&:hover {
		${WallpaperTitle} {
			color: ${colors.textColor};
		}
		${WallpaperId} {
			opacity: 1;
			color: ${colors.textColor};
		}
	}
`


const WallpaperGrid = ({
	title,
	wallpapers,
	actions,
	theme,
	nextTheme,
	prevTheme,
	alignment = 'center',
	isFirstSection,
	isLastSection,
	...props
}) => (
	<Wrapper
		title={title}
		padded={title}
		prevTheme={prevTheme}
		setTheme={theme}
		nextTheme={nextTheme}
		isFirstSection={isFirstSection}
		isLastSection={isLastSection}
	>
		{title && (
			<ScrollEntrance>
				<SectionContent>
					<WallpaperGridTitle>{title}</WallpaperGridTitle>
				</SectionContent>
			</ScrollEntrance>
		)}
		<Container>
			<Grid
				small="container"
				medium="[4] g [4] g [4]"
				large="[3] g [3] g [3] g [3]"
			>
			{wallpapers.map((wallpaper)=> {
				const {
					content: {
						main: {
							title,
							id,
							slug,
							mainImage : {
								asset: {
									gatsbyImageData
								},
								altText
							}
						}
					}
				} = wallpaper
				return (
					<WallpaperItem to={getSlugLink(slug,'wallpaper')}>
						<WallpaperImage ratio="1.5" image={{...gatsbyImageData}} />
						<WallpaperTitle>{title}</WallpaperTitle>
						<WallpaperId>{id}</WallpaperId>
					</WallpaperItem>
				)
			})}
			</Grid>
		</Container>
	</Wrapper>
)


export default WallpaperGrid