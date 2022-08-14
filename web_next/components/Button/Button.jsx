import React from 'react'
import PropTypes from 'prop-types'
import { lighten, cssVar } from 'polished'
import styled from '@emotion/styled'
import * as util from 'styles/util'
import { typography, animations } from 'styles'
import { buttonThemes as themes } from 'styles/themes'
import MaterialIcon from 'components/MaterialIcon'
import Spinner from 'react-spinner-material'
import { MdCheck, MdClose } from 'react-icons/md'
import { baseBorderRadius, uiElementSizes, responsiveUiSizes } from 'styles/globals'
import Link from 'components/Link'

const buttonSettings = {
	radius: baseBorderRadius,
	border: '1px solid',
	transitionSpeed: animations.mediumSpeed,
	verticalOffset: '2px',
	paddingMultiplier: .25
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

const setButtonTheme = (theme, state) => `
	--button-color: ${ themes[theme].color };
	--button-background: ${ themes[theme].background };
	--button-border-color: ${ themes[theme].borderColor || 'var(--button-background)' };
	--button-hover-color: ${ themes[theme].hoverColor };
	--button-hover-background: ${ themes[theme].hoverBackground };
	--button-hover-border-color: ${ themes[theme].borderHoverColor || 'var(--button-hover-background)' };
	${ theme === 'textColor' ? `
		--button-color: var(--bg-color);
		--button-background: var(--text-color);
		--button-hover-color: ${ lighten(0.07, cssVar('--bg-color'))};
		--button-hover-background: ${ lighten(0.07, cssVar('--text-color')) };
	` : '' }

	color: var(--button-color);
	background: var(--button-background);
	border-color: var(--button-border-color);
	${ themes[theme].shadow ? `
		box-shadow: ${ themes[theme].shadow };
	` : `
		box-shadow: none;
	` }
	&:hover {
		${ !state ? `
			border-color: var(--button-hover-border-color);
			color: var(--button-hover-color);
			background: var(--button-hover-background);
			${ themes[theme].hoverShadow ? `
				box-shadow: ${ themes[theme].hoverShadow };
			` : '' }
		` : '' }
	}
`

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
	${ ({ position }) => position === 'left' ? `
		margin-right: .5em;
	` : `
		margin-left: .5em;
	` }
	span,
	svg {
		display: block;
	}
`

const ButtonStyles = (state, shape, size, theme) => (`
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
	padding: 0 calc(${ uiElementSizes[size] }px * ${ buttonSettings.paddingMultiplier }) ${ buttonSettings.verticalOffset };
	min-width: calc(${ uiElementSizes[size] }px * 2);
	text-transform: none;
	letter-spacing: 0;
	border-radius: ${ buttonSettings.radius }px;
	${ util.responsiveStyles('font-size', 20, 16, 15, 13) }
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
	${ setButtonTheme(theme, state) }
	${ state === 'disabled' ? `${ DisabledButtonStyles() }` : '' }

	// Button Size Tweaks
	${ size === 'small' ? `font-size: inherit; ${ typography.smallCaps }` : '' }
	${ size === 'tiny' ? `font-size: inherit; ${ typography.smallCaps }` : '' }
`)

const ButtonContent = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	width: 100%;
	white-space: nowrap;
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
	className,
	shape,
	size,
	title,
	name,
	children,
	label
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
			as={to ? Link : 'button'}
			label={children || label}
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

Button.propTypes = {
  /** What theme to use. (styles/themes.js) */
  setTheme: PropTypes.string,
  /** How large should the button be? */
  size: PropTypes.oneOf(['tiny', 'small', 'medium', 'large']),
  /** How large should the button be? */
  shape: PropTypes.oneOf(['default', 'square', 'circle', 'block']),
  /** Button contents */
  label: PropTypes.string,
  /** Link a button to internal route */
  to: PropTypes.string,
  /** Optional click handler */
  external: PropTypes.bool,
  /** Optional click handler */
  onClick: PropTypes.func,
  /** Can be a string coresponding to <a href="https://fonts.google.com/icons?selected=Material+Icons" target="_blank">Material Icons</a> or a custom component or SVG */
	icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	/** iconPos */
	iconPosition: PropTypes.oneOf(['left', 'right']),
	/** loading */
	loading: PropTypes.bool,
	/** error */
	error: PropTypes.bool,
	/** success */
	success: PropTypes.bool,
	disabled: PropTypes.bool,
	/** Used for title, name, aria-label attributes. Use when there is no label or children */
	title: PropTypes.string
}

export default Button
