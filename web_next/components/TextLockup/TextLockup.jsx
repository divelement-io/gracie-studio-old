import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import Button from 'components/Button'
import TextLink from 'components/TextLink'
import ScrollEntrance from 'components/ScrollEntrance'
import SanityRichText from 'components/SanityRichText'
import { typography, mq } from 'styles'
import { themes } from 'styles/themes'
import { getSanityLink } from 'utils/format'

const Wrapper = styled.div`
	display: inline-block;
	display: block;
	vertical-align: top;
	text-align: ${ ({ alignment }) => alignment };
	${ ({ alignment }) => alignment === 'center' && `
		margin-left: auto;
		margin-right: auto;
		> div,
		.embeded-content {
			margin-left: auto;
			margin-right: auto;
		}
	` }
	${ mq.mediumAndBelow } {
		display: block;
	}
	dl {
		margin: 1.5em 0;
		li:not(:first-child) {
			margin-top: .75em;
		}
		dt {
			font-weight: ${ typography.bold };
		}
	}
`
const TextContainer = styled(ScrollEntrance)`
	width: 100%;
	${ ({ alignment }) => alignment === 'center' && `
		margin-left: auto;
		margin-right: auto;
		h1, h2, h3, h4, h5, h6, p, blockquote, ul {
			margin-left: auto;
			margin-right: auto;
		}
	` }
	${ ({ alignment }) => alignment === 'right' && `
		margin-left: auto;
		h1, h2, h3, h4, h5, h6, p, blockquote, ul {
			margin-left: auto;
		}
	` }
`

const Eyebrow = styled.p`
	${ typography.eyebrow }
	${ ({ hasText }) => hasText ? `
		margin: 0 0 0.5em;
	` : `
		margin: 0;
	` }
`

const Headline = styled.h3`
	${ ({ headlineSize }) => typography[headlineSize] }
	${ ({ hasText }) => !hasText && `
		margin-bottom: 0;
	` }
	${ ({ hasEyebrow }) => !hasEyebrow && `
		margin-top: 0;
	` }
`

const Text = styled.div`
	h1, h2, h3, h4, h5 {
		margin-top: 20px;
	}
	> div {
		> p:not(.large):not(.medium):not(.small):not(.tiny) {
			${ ({ textSize }) => textSize ? typography[textSize] : '' }
		}
	}
`

const ActionWrapper = styled.div`
	padding: 16px 10px 0;
	display: inline-block;
	vertical-align: middle;
`

const ButtonActions = styled.div`
	margin-top: 8px;
	display: flex;
	align-items: baseline;
	text-align: ${ ({ alignment }) => alignment };
	margin-left: -10px;
	margin-right: -10px;
`

const TextLockup = ({
		theme = 'default',
		eyebrow,
		headline,
		headlineSize,
		headlineElement,
		text,
		textSize,
		actions,
		className,
		icon,
		alignment,
		additions,
		entranceDelay,
		transitionIn,
		listType
	}) => {
	if (!text && !actions && !headline) {
		return false
	}
	eyebrow = eyebrow || text?.eyebrow
	text = text?.text || text?.text || text
	return (
		<Wrapper className={className} alignment={alignment}>
			<div>
				<TextContainer alignment={alignment} delay={entranceDelay} transitionIn={transitionIn}>

					{eyebrow && (
						<div>
							<Eyebrow className='eyebrow' hasText={headline || text} alignment={alignment}>{eyebrow}</Eyebrow>
						</div>
					)}

					{headline && (
						<div>
							<Headline as={headlineElement || headlineSize} headlineSize={headlineSize} hasText={text} hasEyebrow={eyebrow}>{headline}</Headline>
						</div>
					)}

					{text && Array.isArray(text) &&
						<Text textSize={textSize} alignment={alignment}><SanityRichText text={text} listType={listType}/></Text>
					}

					{typeof text === 'string' &&
						<Text textSize={textSize} alignment={alignment}><p>{text}</p></Text>
					}

					{text && typeof text !== 'string' && !Array.isArray(text) &&
						<Text textSize={textSize} alignment={alignment}>{text}</Text>
					}

					{actions && actions.length > 0 && (
						<ButtonActions buttons={actions} alignment={alignment} className='actions'>
							{actions.map((action, index) => {
								const actionType = action.type || 'pageLink'
								if (action._type === 'button') {
									let actionTheme = 'default'
									if (action.theme === 'primary') {
										actionTheme = themes[theme]?.buttonTheme || 'default'
									} else if (action.theme === 'secondary') {
										actionTheme = themes[theme]?.buttonThemeSecondary || 'default'
									}
									return (
										<ActionWrapper key={'button-' + index}>
											<Button
												{...getSanityLink(action)}
												setTheme={actionTheme}
											>
												{action.title}
											</Button>
										</ActionWrapper>
									)
								} else {
									return (
										<ActionWrapper key={'button-' + index}>
											<TextLink {...getSanityLink(action)}>
												{action.title}
											</TextLink>
										</ActionWrapper>
									)
								}
							})}
						</ButtonActions>
					)}
				</TextContainer>
			</div>
		</Wrapper>
	)
}

TextLockup.defaultProps = {
	alignment: 'inherit',
	textSize: 'body',
	entranceDelay: 0,
	transitionIn: true,
	headlineSize: 'h3'
}

TextLockup.propTypes = {
	/** Text alignment */
	alignment: PropTypes.oneOf(['center', 'left', 'right']),
	/** Optional. Should be used if  */
	headline: PropTypes.string,
	/** Style of headline if 'headline' prop is used */
	headlineSize: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5']),
	/** If you want to change the headline element but not it's size, use this */
	headlineElement: 'h3',
	/** `string` or `{ raw: string }` if using Contentful rich text */
	text: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({ raw: PropTypes.string })]),
	/** What size should paragraph text be? */
	textSize: PropTypes.oneOf(['body', 'bodyMedium', 'bodyLarge', 'bodySmall']),
	/** Buttons or links to go under text */
	actions: PropTypes.shape([
		{
			_type: PropTypes.oneOf(['button', 'link']),
			to: PropTypes.string,
			linkToPage: PropTypes.shape({ slug: PropTypes.string }),
			newTab: PropTypes.bool,
			label: PropTypes.string
		}
	]),
	/** Should text animate in? */
	transitionIn: PropTypes.bool,
	/** Delay the stagger animation */
	entranceDelay: PropTypes.number,
	/** When used in component with a theme, this will dictate the "primary" and "secondary" button themes */
	theme: PropTypes.string
}

export default TextLockup
