import React, { Component } from 'react'
import styled from '@emotion/styled'
import { colors, typography, animations } from 'src/styles'
import Link from 'src/components/Link'

const StyledLink = styled.div`
	${ ({ size = 'body' }) => typography[size] }
	font-weight: ${ typography.medium };
	line-height: 1.2em;
	position: relative;
	display: inline-block;
	appearance: none;
	background: transparent;
	border: none;
	outline: none;
	text-align: inherit;
	padding: 0;
	cursor: pointer;
	color: inherit;
	&:before {
		content: '';
		display: block;
		position: absolute;
		top: 100%;
		left: 0;
		width: 100%;
		height: 1px;
		background: var(--light-text-color);
		opacity: .2;
		z-index: 1;
	}
	&:after {
		content: '';
		display: block;
		position: absolute;
		top: 100%;
		left: 0;
		width: 100%;
		height: 1px;
		background: ${ ({ theme }) => colors[theme] };
		transform: scaleX(0);
		transform-origin: right center;
		transition: transform ${ animations.mediumSpeed } ease-in-out;
		z-index: 2;
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
			title,
			size,
			as = Link
		} = this.props

		return (
			<StyledLink
				className={'button text-link ' + (className || '')}
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
				size={size}
				as={as}
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
