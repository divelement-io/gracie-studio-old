import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import Section from 'src/components/Section'
import Media from 'src/components/Media'
import Grid, { Container } from 'src/components/Grid'
import Button from 'src/components/Button'
import ScrollEntrance from 'src/components/ScrollEntrance'
import ThemeSelector from 'src/components/ThemeSelector'
import Actions from 'src/components/Actions'

import { headerHeight } from 'src/components/Header'

import {
	globals,
	typography,
	colors,
	util
} from 'src/styles'

import { themes } from 'src/styles/themes'

import { getSlugLink } from 'src/utils/format'

const Wrapper = styled(Section)`
	${({title, isFirstSection}) => (!title && isFirstSection) && headerHeight('padding-top', 1)}
	${({actions, isLastSection}) => (!actions && isLastSection) && `padding-bottom: 0;`}
`

const SectionContent = styled(Container)`
	text-align: center;
`

const CollectionListTitle = styled.h2`
	${typography.h4};
	${globals.verticalSpacing('padding-bottom')}
`

const CollectionListActions = styled.div`
	${globals.verticalSpacing('padding-top')}
`

const CollectionTitle = styled.h3`
	${typography.h1};
	margin-bottom: 0.5rem;
`

const CollectionContent = styled(Container)`
	position: relative;
	z-index: 1;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`

const CollectionItem = styled.div`
	${ util.responsiveStyles('height', 600, 600, 400, 400)}
	background: ${colors.black};
	position: relative;
	text-align: center;
`

const CollectionMedia = styled(Media)`
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		opacity: .7;
		img, video {
			object-fit: cover;
			object-position: center;
			height: 100%;
			width: 100%;
		}
`

const CollectionList = ({
	title,
	collections,
	actions,
	theme,
  nextTheme,
  prevTheme,
  alignment = 'center',
  isFirstSection,
  isLastSection,
	...props
}) => {
	console.log(collections)

	return (
		<Wrapper
			title={title}
			actions={actions}
			padded={title}
			prevTheme={prevTheme}
      setTheme={theme}
      nextTheme={nextTheme}
      alignment={alignment}
      isFirstSection={isFirstSection}
      isLastSection={isLastSection}
		>
			{title && (
				<ScrollEntrance>
					<SectionContent>
						<CollectionListTitle>{title}</CollectionListTitle>
					</SectionContent>
				</ScrollEntrance>
			)}
			{collections?.map(({ content: { main: {title, slug, mainImage} } }) => (
				<CollectionItem>
					<CollectionContent>
					<ScrollEntrance>
					<ThemeSelector setTheme="transparent">
						<CollectionTitle>
							{title}
						</CollectionTitle>
						<Button
							to={getSlugLink(slug,'collection')}
							size="large"
							setTheme="whiteOutlined"
						>
							View the Collection
						</Button>
					</ThemeSelector>
					</ScrollEntrance>
					</CollectionContent>
					<CollectionMedia
						media={{ image: {...mainImage}, mediaType: 'image' }}
						altText={mainImage?.asset?.altText}
					/>
				</CollectionItem>
			))}
			{actions && actions.length > 0 && (
				<SectionContent>
					<ScrollEntrance>
						<CollectionListActions>
							<Actions actions={actions} />
						</CollectionListActions>
					</ScrollEntrance>
				</SectionContent>
			)}
		</Wrapper>
	)
}

export default CollectionList
