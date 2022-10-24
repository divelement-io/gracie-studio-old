import React from 'react'
import styled from '@emotion/styled'
import * as util from 'src/styles/util'
import { typography, animations } from 'src/styles'
import { buttonThemes as themes } from 'src/styles/themes'
import MaterialIcon from 'src/components/MaterialIcon'
import Spinner from 'react-spinner-material'
import { MdCheck, MdClose } from 'react-icons/md'
import { baseBorderRadius, uiElementSizes, responsiveUiSizes } from 'src/styles/globals'
import Link from 'src/components/Link'

const buttonSettings = {
	radius: baseBorderRadius,
	border: '1px solid',
	transitionSpeed: animations.mediumSpeed,
	verticalOffset: '0px'
}

const getState = (loading, error, success, disabled) => {
	let buttonState = ''
	if (error) {
		buttonState = 'error'
	} else if (loading === 'true') {
		buttonState = 'loading'
	} else if (success) {
		buttonState = 'success'
	} else if (disabled) {
		buttonState = 'disabled'
	}

	return buttonState
}

const setButtonTheme = (theme, state) => {

if (!themes[theme]) {
	console.log('wtf no theme')
	console.log(theme)
	return false
}
return `

	color: ${ themes[theme].color };
	background: ${ themes[theme].background };
	${ themes[theme].shadow ? `
		box-shadow: ${ themes[theme].shadow };
	` : '' }
	${ themes[theme].borderColor ? `
		border-color: ${ themes[theme].borderColor };
	` : `
		border-color: ${ themes[theme].background };
	` }
	&:hover {
		${ !state ? `
			color: ${ themes[theme].hoverColor };
			background: ${ themes[theme].hoverBackground };
			${ themes[theme].hoverBorder ? `
				border-color: ${ themes[theme].hoverBorder };
			` : `
				border-color: ${ themes[theme].hoverBackground };
			` }
			${ themes[theme].hoverShadow ? `
				box-shadow: ${ themes[theme].hoverShadow };
			` : '' }
		` : '' }
	}
`
}

const DisabledButtonStyles = () => `
	&[disabled],
	&:disabled {
		opacity: .3;
		mix-blend-mode: luminosity;
		cursor: not-allowed;
		pointer-events: none;
	}
`

const ButtonIcon = styled.div`
	margin-bottom: -1px;
	${ ({ position }) => position === 'left' ? `
		margin-right: .3em;
	` : `
		margin-left: .3em;
	` }
	span,
	svg {
		display: block;
	}
`

export const ButtonStyles = (state, shape, size, theme) => (`
	appearance: none;
	-webkit-tap-highlight-color: rgba(0,0,0,0);
	-webkit-touch-callout: none;
	outline: none;
	cursor: pointer;
	display: inline-block;
	vertical-align: middle;
	border: ${ buttonSettings.border };
	${ util.responsiveStyles(
		'height',
		uiElementSizes[size] * responsiveUiSizes.huge,
		uiElementSizes[size] * responsiveUiSizes.large,
		uiElementSizes[size] * responsiveUiSizes.medium,
		uiElementSizes[size] * responsiveUiSizes.small
	) }
	padding: 0 calc(${ uiElementSizes[size] }px * .5) ${ buttonSettings.verticalOffset };
	min-width: calc(${ uiElementSizes[size] }px * 2);
	text-transform: none;
	letter-spacing: 0;
	border-radius: ${ buttonSettings.radius }px;
	${ util.responsiveStyles('font-size', 16, 14, 12, 12) }
	text-align: center;
	${ typography.buttonStyle }
	line-height: 1em;
	${ util.fontSmoothing }
	transition: background ${ buttonSettings.transitionSpeed } ease-in-out,
							color ${ buttonSettings.transitionSpeed } ease-in-out,
							border ${ buttonSettings.transitionSpeed } ease-in-out,
							box-shadow ${ buttonSettings.transitionSpeed } ease-in-out,
							transform ${ buttonSettings.transitionSpeed } ease-in-out,
							opacity ${ buttonSettings.transitionSpeed } ease-in-out,
							mix-blend-mode ${ buttonSettings.transitionSpeed } ease-in-out;
	// Button States
	${ state === 'loading' ? 'cursor: wait; pointer-events: none;' : '' }
	${ state === 'error' || state === 'success' ? 'cursor: default; pointer-events: none;' : '' }

	// Button Shapes
	${ shape ? `
		${ shape.includes('circle') || shape.includes('square') ? `
			padding: 0 !important;
			${ ButtonIcon } {
				margin: 0;
			}
			${ util.responsiveStyles(
				'width',
				uiElementSizes[size] * responsiveUiSizes.huge,
				uiElementSizes[size] * responsiveUiSizes.large,
				uiElementSizes[size] * responsiveUiSizes.medium,
				uiElementSizes[size] * responsiveUiSizes.small
			) }
			${ util.responsiveStyles(
				'min-width',
				uiElementSizes[size] * responsiveUiSizes.huge,
				uiElementSizes[size] * responsiveUiSizes.large,
				uiElementSizes[size] * responsiveUiSizes.medium,
				uiElementSizes[size] * responsiveUiSizes.small
			) }
			${ ButtonIcon } {
				margin: 0;
			}
		` : '' }
		${ shape === 'block' ? 'display: block; width: 100%;' : '' }
	` : '' }
	${ shape && shape.includes('circle') ? 'border-radius: 50%;' : '' }

	// Button Themes
	${ setButtonTheme(theme || 'default', state) }
	${ state === 'disabled' ? `${ DisabledButtonStyles() }` : '' }

	// Button Size Tweaks
	${ size === 'small' ? `
		font-size: inherit;
		${ util.responsiveStyles('font-size', 15, 13, 13, 13) }
		padding: 0 calc(${ uiElementSizes[size] }px * .3) ${ buttonSettings.verticalOffset };
	` : '' }
	${ size === 'tiny' ? `
		font-size: inherit;
		${ util.responsiveStyles('font-size', 15, 13, 13, 13) }
		padding: 0 calc(${ uiElementSizes[size] }px * .3) ${ buttonSettings.verticalOffset };
	` : '' }
`)

const ButtonContent = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	width: 100%;
	svg {
		* {
			fill: currentcolor;
		}
	}
`

const StyledButtonLink = styled.div`
	${ ({ loading, error, success, disabled, shape, size, theme }) => ButtonStyles(getState(loading, error, success, disabled), shape, size, theme) }
`

const Button = ({
	to,
	external,
	target,
	icon,
	iconPosition,
	loading,
	error,
	success,
	disabled,
	onClick,
	setTheme,
	className = '',
	shape,
	size,
	title,
	name,
	as,
	children,
	label,
	type
}) => {

	const renderIcon = (icon, position, shape, size) => {
		let renderedIcon = false
		if (typeof icon === 'string') {
			renderedIcon = <ButtonIcon className='button-icon' size={size} position={position} shape={shape}><MaterialIcon size={size === 'tiny' ? '18px' : '24px'}>{icon}</MaterialIcon></ButtonIcon>
		} else {
			renderedIcon = <ButtonIcon className='button-icon' size={size} position={position} shape={shape}>{icon}</ButtonIcon>
		}
		return renderedIcon
	}

	const renderButtonContent = () => {
		if (loading) {
			return <ButtonContent className='button-content'>
				<Spinner radius={18} color='inherit' stroke={2} />
			</ButtonContent>
		} else if (error) {
			return <ButtonContent className='button-content'>
				<MdClose size={'1.5em'} />
			</ButtonContent>
		} else if (success) {
			return <ButtonContent className='button-content'>
				<MdCheck size={'1.5em'} />
			</ButtonContent>
		} else {
			return <ButtonContent className='button-content'>
				{icon && iconPosition !== 'right' ? renderIcon(icon, iconPosition, shape, size) : false}
				{children || label}
				{icon && iconPosition === 'right' ? renderIcon(icon, iconPosition, shape, size) : false}
			</ButtonContent>
		}
	}

	let asElement = 'button'
	if (as) {
		asElement = as
	} else if (to) {
		asElement = Link
	}

	return (
		<StyledButtonLink
			className={'button ' + className}
			to={to}
			target={target}
			external={external}
			icon={icon}
			iconPosition={iconPosition}
			loading={loading ? loading.toString() : 'false'}
			error={error}
			success={success}
			disabled={disabled}
			onClick={onClick}
			theme={setTheme || 'default'}
			shape={shape}
			size={size}
			title={title}
			name={name || title}
			aria-label={name || title}
			rel={external ? 'noopener noreferrer' : ''}
			as={asElement}
			type={type}
		>
			{renderButtonContent()}
		</StyledButtonLink>
	)
}

Button.defaultProps = {
	setTheme: 'default',
	size: 'medium',
	shape: 'default',
	iconPosition: 'left'
}

export default Button
