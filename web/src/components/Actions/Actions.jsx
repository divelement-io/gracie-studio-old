import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import Button from 'src/components/Button'
import TextLink from 'src/components/TextLink'

import { themes } from 'src/styles/themes'
import { getSanityLink } from 'src/utils/format'


const ActionWrapper = styled.div`
	padding: 0 10px;
	display: inline-block;
	vertical-align: middle;
`

const ButtonActions = styled.div`
	text-align: ${ ({ alignment }) => alignment };
	margin-left: -10px;
	margin-right: -10px;
`

const Actions = ({
	actions,
	theme = 'default',
	alignment = 'center'
}) => {

	return actions && actions.length > 0 && (
		<ButtonActions buttons={actions} alignment={alignment} className='actions'>
			{actions.map((action, index) => {
				if (action.title) {
					let handleClick = () => { return null }


					if (action._type === 'button') {
						let actionTheme = theme
						if (action.theme === 'primary') {
							actionTheme = themes[theme]?.buttonTheme || 'default'
						} else if (action.theme === 'secondary') {
							actionTheme = themes[theme]?.buttonThemeSecondary || 'default'
						}
						if (action.type === 'newsletterSignup') {
							return (
								<ActionWrapper key={'button-' + index}>
									<Button
										setTheme={actionTheme}
										onClick={() => toggleModal('newsletterSignup')}
										title={action.title}
										name={action.title}
									>
										{action.title}
									</Button>
								</ActionWrapper>
							)
						} else {
							return (
								<ActionWrapper key={'button-' + index} onClick={handleClick}>
									<Button
										target={action.newTab && '_blank'}
										setTheme={actionTheme}
										to={getSanityLink(action)}
										external={action.type === 'externalLink' || action.type === 'fileLink'}
										title={action.title}
										name={action.title}
									>
										{action.title}
									</Button>
								</ActionWrapper>
							)
						}
					} else if (action._type === 'link') {
						return (
							<ActionWrapper key={'link-' + index} onClick={handleClick}>
								<TextLink
									target={action.newTab && '_blank'}
									to={getSanityLink(action)}
									external={action.externalLink}
									title={action.title}
									name={action.title}
									theme='mainColor'
									size='body'
								>
									{action.title}
								</TextLink>
							</ActionWrapper>
						)
					} else {
						return (
							<ActionWrapper key={'custom-item-' + index}>
								{action}
							</ActionWrapper>
						)
					}
				} else {
					return null
				}
			})}
		</ButtonActions>
	)}

export default Actions
