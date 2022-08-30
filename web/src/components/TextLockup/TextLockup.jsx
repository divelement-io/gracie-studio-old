import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

import ScrollEntrance from 'src/components/ScrollEntrance'
import SanityRichText from 'src/components/SanityRichText'
import { typography, mq } from 'src/styles'
import { AppContext } from 'src/state/AppState'
import Actions from 'src/components/Actions'

import { colors, util } from 'src/styles'


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
		margin: 0 0 1em;
	` : `
		margin: 0;
	` }
	${ ({ theme }) => theme === 'transparent' ?  `
	color: ${colors.white};` : `color: var(--light-text-color);` }
`

const Headline = styled.div`
	${ ({ headlineSize }) => typography[headlineSize] }
	${ ({ hasText, showHr }) => !hasText ? `
		margin-bottom: 0;
	` : `
	` }
	${ ({ hasEyebrow }) => !hasEyebrow && `
		margin-top: 0;
	` }
`

const Text = styled.div`
	p:not(.large):not(.medium):not(.small):not(.tiny) {
		${ ({ textSize }) => typography[textSize] }
	}
	p {
		&.first-item {
			margin-top: 0;
		}
		&.last-item {
			margin-bottom: 0;
		}
	}
`

const ActionsContainer = styled.div`
	padding-top: 1.5rem;
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
		listType,
		showHr
	}) => {
	if (!text && !actions && !headline) {
		return false
	}
	eyebrow = eyebrow || text?.eyebrow
	text = text?._rawText || text?.text || text
	const { toggleModal } = useContext(AppContext)

	return (
		<>
		<Wrapper className={className} alignment={alignment}>
			<div>
				<TextContainer alignment={alignment} delay={entranceDelay} transitionIn={transitionIn}>

					{eyebrow && (
						<div>
							<Eyebrow theme={theme} hasText={headline || text} alignment={alignment}>{eyebrow}</Eyebrow>
						</div>
					)}

					{headline && Array.isArray(headline) &&
						<div>
							<Headline headlineSize={headlineSize} alignment={alignment} hasText={text} showHr={showHr}>
								<SanityRichText text={headline} listType={listType}/>
							</Headline>
						</div>
					}

					{headline && typeof headline === 'string' &&
						<div>
							<Headline as={headlineElement || headlineSize} headlineSize={headlineSize} alignment={alignment} hasText={text} showHr={showHr}>
								{headline}
							</Headline>
						</div>
					}

					{headline && typeof headline !== 'string' && !Array.isArray(headline) &&
						<div>
							<Headline as={headlineElement || headlineSize} headlineSize={headlineSize} alignment={alignment} hasText={text} showHr={showHr}>
								{headline}
							</Headline>
						</div>
					}

					{(((headline?.length > 0 && text) || showHr) && (showHr !== false)) && (
						<div><hr className='short' css={css`${ !text ? 'margin-bottom: 0;' : '' }`}/></div>
					)}

					{text && Array.isArray(text) &&
						<Text textSize={textSize} alignment={alignment}><SanityRichText text={text} listType={listType}/></Text>
					}

					{text && typeof text === 'string' &&
						<Text textSize={textSize} alignment={alignment}><p className='first-item last-item'>{text}</p></Text>
					}

					{text && typeof text !== 'string' && !Array.isArray(text) &&
						<Text textSize={textSize} alignment={alignment}>{text}</Text>
					}
					<ActionsContainer>
						<Actions alignment={alignment} actions={actions} />
					</ActionsContainer>
				</TextContainer>
			</div>
		</Wrapper>
		</>
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
