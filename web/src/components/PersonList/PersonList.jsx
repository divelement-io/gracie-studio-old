import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import Section from 'src/components/Section'
import Media from 'src/components/Media'
import Grid, { Container } from 'src/components/Grid'
import ScrollEntrance from 'src/components/ScrollEntrance'

import Image from 'src/components/Image'


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
	padding-bottom: 0;
	${({title, isFirstSection}) => (!title && isFirstSection) && headerHeight('padding-top', 1)}
	${({isLastSection}) => (isLastSection) && `padding-bottom: 0;`}
`

const SectionContent = styled(Container)`
	text-align: center;
`

const PersonListTitle = styled.h2`
	${typography.h4};
	${globals.verticalSpacing('padding-bottom')}
`


const PersonImage = styled(Image)`
	margin-bottom: 1rem;

`

const PersonTitle = styled.h3`
	margin-bottom: 0;

`

const PersonItem = styled.div`
	margin-bottom: 1.5rem:
`

const PersonDescription = styled.p`
	color: ${colors.lightTextColor};
`



const PersonList = ({
	theme,
	title,
	nextTheme,
	prevTheme,
	isFirstSection,
	isLastSection,
	persons,
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
					<PersonListTitle>{title}</PersonListTitle>
				</SectionContent>
			</ScrollEntrance>
		)}
		<Container>
			<Grid
				small="container"
				medium="[3] g [3] g [3] g [3]"
				vAlign="top"
			>
				{persons.map(({
					content: {
						firstName,
						lastName,
						title,
						location,
						generation,
						image : {
							asset: {
								gatsbyImageData
							},
							altText
						}
					}
				}) => (
					<PersonItem>
						<PersonImage image={{...gatsbyImageData}}  />
						<PersonTitle>{firstName} {lastName}</PersonTitle>
						<PersonDescription>{title} | {location} {generation && `| ${generation}`}</PersonDescription>
					</PersonItem>
				))}
			</Grid>
		</Container>
	</Wrapper>
)


export default PersonList
