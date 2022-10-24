import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import Section from 'src/components/Section'
import Image from 'src/components/Image'
import Grid, { Container } from 'src/components/Grid'
import Button from 'src/components/Button'
import ScrollEntrance from 'src/components/ScrollEntrance'
import MaterialIcon from 'src/components/MaterialIcon'


import { headerHeight } from 'src/components/Header'

import {
	globals,
	typography,
	colors,
	util
} from 'src/styles'

import { themes } from 'src/styles/themes'

const Wrapper = styled(Section)`
`

const SectionContent = styled(Container)`
	text-align: center;
`

const ShowroomListTitle = styled.h2`
	${typography.h4};
	${globals.verticalSpacing('padding-bottom')}
`

const ShowroomItem = styled.div`
	margin-bottom: 1.5rem;
`

const ShowroomImage = styled(Image)`
	margin-bottom: 1rem;
`

const Border = styled.hr`
	margin-top: 1.125rem;
	margin-bottom: 1.125rem;
	border-color: currentcolor;
	display: block;
`

const SalesContacts = styled.ul`
	list-style: none;
	margin: 0;
	padding: 0;
	margin-bottom: 0.25rem;

`

const SalesContact = styled.li`
	padding: 0.125rem 0;
	a, span {
		display: inline-block;
		vertical-align: middle;
	}

	span.icon {
		margin-right: 4px;
	}

`

const TelephoneLabel = styled.label`
	${typography.smallCaps};
	color: ${colors.lightTextColor};
	font-size: .625rem;
`

const Address = styled.p`
	line-height: 1.25rem;
`


const ShowroomList = ({
	theme,
	title,
	nextTheme,
	prevTheme,
	isFirstSection,
	isLastSection,
	showrooms,
	...props
}) => (
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
					<ShowroomListTitle>{title}</ShowroomListTitle>
				</SectionContent>
			</ScrollEntrance>
		)}
		<Container>
			<Grid
				small="container"
				medium="[6] g [6]"
				large="[3] g [3] g [3] g [3]"
				vAlign="top"
			>
				{showrooms.map(({ content: {
					title,
					address,
					externalLink,
					image : {
							asset: {
								gatsbyImageData
							},
							altText
						},
					salesContacts,
					phoneNumber
				}}) => {

					return (
						<ShowroomItem>
							<h3>{title}</h3>
							<ShowroomImage ratio="0.75" image={{...gatsbyImageData}} />
							{address ? (
								<Address>
									{address.street}
									<br />
									{address.city}, {address.state} {address.zipcode}
								</Address>
							): (
								<Address>
									By Appointment
									<br />
									Authorized Sales Agent
								</Address>
							)}
							<Border />
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
							<Border />
							<h6>Sales Contacts</h6>
							<SalesContacts>
							{salesContacts.map(({firstName, lastName, email}) => {
								return (
									<SalesContact>
										<MaterialIcon size="14">email</MaterialIcon>
										<a href={`mailto:${email}`}>{firstName} {lastName}</a>
									</SalesContact>
								)
							})}
							</SalesContacts>
							{externalLink && (
								<SectionContent>
									<Button
										to={externalLink}
										external={true}
										theme="secondary"
										size="tiny"
									>
										View Showroom
									</Button>
								</SectionContent>
							)}
						</ShowroomItem>
					)
				})}

			</Grid>
		</Container>
	</Wrapper>
)


export default ShowroomList
