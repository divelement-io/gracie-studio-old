import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import Button from 'src/components/Button'
import ThemeSelector from 'src/components/ThemeSelector'
import SanityRichText from 'src/components/SanityRichText'
import { typography } from 'src/styles'
import { MdClose } from 'react-icons/md'
import AnimateHeight from 'react-animate-height'

const NotificationCollapse = styled(AnimateHeight)`
	position: relative;
`

const Wrapper = styled(ThemeSelector)`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 10px 40px 12px;
	text-align: center;
	p {
		margin: 0;
		${ typography.bodySmall }
		line-height: 1.3em;
		font-weight: ${ typography.medium };
	}
`

const CloseButton = styled(Button)`
	position: absolute;
	top: 50%;
	right: 15px;
	margin-right: -11px;
	transform: translateY(-50%);
	color: inherit;
	background: transparent;
	border-color: transparent;
	&:hover {
		color: inherit;
		border-color: transparent;
		background: transparent;
		opacity: .4;
	}
`

const NotificationBanner = ({ className, setTheme, text, closeBanner, collapsed }) => {
	let bannerColor = setTheme
	if (setTheme === null) {
		bannerColor = 'mainColor'
	}

	return (
		<NotificationCollapse
			duration={300}
			delay={0}
			animateOpacity={false}
			height={collapsed ? 0 : 'auto'}
		>
			<Wrapper className={className} setTheme={bannerColor}>
				{text.raw ? (<SanityRichText richText={text}/>) : <p>{text}</p>}
				<CloseButton onClick={closeBanner} icon={<MdClose size="18"/>} shape="circle" size="tiny" name="Close header banner"/>
			</Wrapper>
		</NotificationCollapse>
	)
}

NotificationBanner.defaultProps = {
	setTheme: 'mainColor',
	collapsed: false
}

NotificationBanner.propTypes = {
	/** `string` or `{ raw: string }` if using Contentful rich text */
	text: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({ raw: PropTypes.string })]),
	/** String of one of the themes in `src/styles/themes.js` */
	setTheme: PropTypes.string,
	/** Prop given by the header component */
	collapsed: PropTypes.bool,
	/** Prop given by the header component */
	closeBanner: PropTypes.func,
}

export default NotificationBanner
