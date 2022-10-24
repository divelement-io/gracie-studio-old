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
`

const SectionContent = styled(Container)`
	text-align: center;
`

const RepListTitle = styled.h2`
	${typography.h4};
	${globals.verticalSpacing('padding-bottom')}
`

const Border = styled.hr`
	margin-top: 1.125rem;
	margin-bottom: 1.125rem;
	border-color: currentcolor;
	display: block;
`

const TelephoneLabel = styled.label`
	${typography.smallCaps};
	color: ${colors.lightTextColor};
	font-size: .625rem;
`

const Address = styled.p`
	line-height: 1.25rem;
`


const RepresentativeList = ({
	theme,
	title,
  nextTheme,
  prevTheme,
  isFirstSection,
  isLastSection,
  representatives,
	...props
}) => {
	console.log(representatives)

return (
	<Wrapper
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
					<RepListTitle>{title}</RepListTitle>
				</SectionContent>
			</ScrollEntrance>
		)}
		<Container>
			<Grid
				small="container"
				medium="[4] g [4] g [4]"
				vAlign="top"
			>
				{representatives.map(({
					name,
					city,
					faxNumber,
					phoneNumber,
					address
				}) => {
					return (
						<div>
							<h3>{name} | {city}</h3>
							{address && (
								<Address>
									{address.street}
									<br />
									{address.city}, {address.state} {address.zipcode}
								</Address>
							)}
							<Border />
								{phoneNumber && (
									<Grid
										small="[1] [1]"
									>
										<div>
											<TelephoneLabel>
												tel
											</TelephoneLabel>
										</div>
										<div>
											<span>
												{phoneNumber}
											</span>
										</div>
									</Grid>
								)}
								{faxNumber && (
									<Grid
										small="[1] [1]"
									>
										<div>
											<TelephoneLabel>
												tel
											</TelephoneLabel>
										</div>
										<div>
											<span>
												{faxNumber}
											</span>
										</div>
									</Grid>
								)}
							<Border />

						</div>
					)
				})}
			</Grid>
		</Container>
	</Wrapper>
)
}


export default RepresentativeList
