import React, { Component } from 'react'
import styled from '@emotion/styled'
import { colors, typography, animations } from 'styles'
import Link from 'components/Link'

const StyledLink = styled(Link)`
	${ typography.h6 }
	position: relative;
	display: inline-block;
	&:after {
		content: '';
		display: block;
		position: absolute;
		top: calc(100% + 2px);
		left: 0;
		width: 100%;
		height: 2px;
		background: ${ ({ theme }) => colors[theme] };
		transform: scaleX(0);
		transform-origin: right center;
		transition: transform ${ animations.mediumSpeed } ease-in-out;
	}
	&:hover {
		&:after {
			transform-origin: left center;
			transform: scaleX(1);
		}
	}
`

class TextLink extends Component {
	render () {
		const {
			to,
			external,
			target,
			loading,
			error,
			success,
			disabled,
			onClick,
			theme,
			className,
			children,
			title
		} = this.props

		return (
			<StyledLink
				className={'button ' + className}
				to={to}
				target={target}
				external={external}
				loading={loading}
				error={error}
				success={success}
				disabled={disabled}
				onClick={onClick}
				theme={theme}
				title={title}
			>
				{children}
			</StyledLink>
		)
	}
}

TextLink.defaultProps = {
	theme: 'currentcolor'
}

export default TextLink
