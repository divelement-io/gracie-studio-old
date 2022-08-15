import React, { Component } from 'react'
import styled from '@emotion/styled'
import { darken } from 'polished'
import { colors, typography, animations, util } from 'src/styles'
import MaterialIcon from 'src/components/MaterialIcon'
import { isEmoji } from 'src/utils/validations'
import { inputThemes as themes } from 'src/styles/themes'
import { baseBorderRadius, uiElementSizes, responsiveUiSizes } from 'src/styles/globals'

export const inputVars = {
	tiny: uiElementSizes.tiny,
	small: uiElementSizes.small,
	medium: uiElementSizes.medium,
	large: uiElementSizes.large,
	borderWidth: 1,
	backgroundColor: 'transparent',
	borderRadius: baseBorderRadius
}

export const setInputTheme = theme => {
	return `
		color: ${ themes[theme].color };
		input, select, .mock-input {
			background: ${ themes[theme].background };
			border-color: ${ themes[theme].borderColor };
			caret-color: ${ themes[theme].color };
			color: ${ themes[theme].color };
			&:active,
			&:focus,
			&:active:hover,
			&:focus:hover {
				background: ${ darken(0.05, themes[theme].focusBackground) };
				border-color: ${ themes[theme].focusBorderColor };
			}
			&:hover {
				background: ${ darken(0.05, themes[theme].hoverBackground) };
				border-color: ${ themes[theme].hoverBorderColor };
			}
			&:-webkit-autofill {
				transition: background-color 5000s ease-in-out 0s;
				-webkit-text-fill-color: ${ themes[theme].color } !important;
				color: ${ themes[theme].color } !important;
			}
			&:-internal-autofill-selected,
			&:-webkit-autofill,
			&:-internal-autofill:hover,
			&:-webkit-autofill:focus {
				background: ${ darken(0.05, themes[theme].background) } !important;
				border-color: ${ themes[theme].borderColor };
				-webkit-text-fill-color: ${ themes[theme].color } !important;
				color: ${ themes[theme].color } !important;
			}
			::placeholder {
				color: ${ themes[theme].placeholderColor };
			}
		}
	`
}

export const getState = (loading, error, success, disabled) => {
	let buttonState = ''
	if (error) {
		buttonState = 'error'
	} else if (loading) {
		buttonState = 'loading'
	} else if (success) {
		buttonState = 'success'
	} else if (disabled) {
		buttonState = 'disabled'
	}

	return buttonState
}

export const InputWrap = styled.div`
	position: relative;
	display: inline-block;
	width: 100%;
	${ typography.bodySmall }
	font-weight: ${ typography.normal };
	${ ({ theme }) => setInputTheme(theme) }
`

export const InputStyles = (state, size, icon, iconPosition, theme, label) => (`
  appearance: none;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-touch-callout: none;
  outline: none;
  display: inline-block;
  width: 100%;
  vertical-align: middle;
  background: ${ inputVars.backgroundColor };
  border: ${ inputVars.borderWidth + 'px' } solid;
  // height: ${ inputVars[size] };
  ${ util.responsiveStyles(
		'height',
		inputVars[size] * responsiveUiSizes.huge,
		inputVars[size] * responsiveUiSizes.large,
		inputVars[size] * responsiveUiSizes.medium,
		inputVars[size] * responsiveUiSizes.small
	) }
  line-height: 1em;
  text-transform: inherit;
  letter-spacing: 0;
  border-radius: ${ inputVars.borderRadius }px;
  color: inherit;
  font-style: inherit;
  font-size: inherit;
  font-family: inherit;
  font-weight: inherit;
  line-height: inherit;
  text-align: left;
  box-shadow: none;
  padding: 0 ${ inputVars[size] * 0.3 + 'px' } 0;
  ${ icon ? `
		${ util.responsiveStyles(
			('padding-' + iconPosition),
			inputVars[size] * responsiveUiSizes.huge,
			inputVars[size] * responsiveUiSizes.large,
			inputVars[size] * responsiveUiSizes.medium,
			inputVars[size] * responsiveUiSizes.small
		) }
	` : '' }
  padding-bottom: 0px;
  ${ util.fontSmoothing }
  transition: background ${ animations.mediumSpeed } ease-in-out,
              color ${ animations.mediumSpeed } ease-in-out,
              border ${ animations.mediumSpeed } ease-in-out,
              box-shadow ${ animations.mediumSpeed } ease-in-out,
              transform ${ animations.mediumSpeed } ease-in-out,
              opacity ${ animations.mediumSpeed } ease-in-out;
	// Input States
	::placeholder {
		color: ${ colors.lightTextColor };
	}
	${ state === 'disabled' ? 'cursor: not-allowed;' : '' }
	${ state === 'loading' ? 'cursor: wait;' : '' }
	${ state === 'error' ? `border-color: ${ colors.alert };` : '' }
	${ label ? `${ util.responsiveStyles('padding-top', 18, 16, 16, 14) }` : '' }
`)

const StyledInput = styled.input`
	${ ({
		loading,
		error,
		success,
		disabled,
		size,
		icon,
		iconPosition,
		label,
		theme,
		style,
	}) => InputStyles(getState(loading, error, success, disabled), size, icon, iconPosition, theme, label) }
`

export const InputIcon = styled.div`
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	top: 0;
	pointer-events: none;
	overflow: hidden;
	font-size: 24px;
	${ ({ emojiIcon }) => emojiIcon && `
		padding-top: .3em;
		font-size: 18px;
		line-height: 1em;
	` }
	${ ({ iconPosition }) => iconPosition }: ${ inputVars.borderWidth + 'px' };
	${ ({ size }) => `
		${ util.responsiveStyles(
			'width',
			inputVars[size] * responsiveUiSizes.huge,
			inputVars[size] * responsiveUiSizes.large,
			inputVars[size] * responsiveUiSizes.medium,
			inputVars[size] * responsiveUiSizes.small
		) }
		${ util.responsiveStyles(
			'height',
			inputVars[size] * responsiveUiSizes.huge,
			inputVars[size] * responsiveUiSizes.large,
			inputVars[size] * responsiveUiSizes.medium,
			inputVars[size] * responsiveUiSizes.small
		) }
	` }
	span, svg {
		display: block;
	}
`

export const InputLabel = styled.label`
	position: absolute;
	font-style: inherit;
  font-size: inherit;
  font-family: inherit;
  font-weight: inherit;
  line-height: inherit;
	top: 0;
	left: ${ inputVars.borderWidth + 'px' };
	height: 100%;
	display: flex;
	align-items: center;
	pointer-events: none;
	margin: 0 ${ ({ size }) => inputVars[size] * 0.3 + 'px' };
	color: ${ ({ error }) => error ? `${ colors.alert }` : 'inherit' };
	transition: transform ${ animations.mediumSpeed } ease-in-out, color ${ animations.mediumSpeed } ease-in-out;
	transform-origin: 0% 50%;
	${ props => (props.placeholder || props.value || props.focused) && `
		transform: translate3d(0, -10px, 0) scale(.75);
	` }
	${ props => props.focused && `
		color: ${ themes[props.theme].color };
	` }
	${ ({ icon, iconPosition, size }) => icon && `
		${ util.responsiveStyles(
			'height',
			inputVars[size] * responsiveUiSizes.huge,
			inputVars[size] * responsiveUiSizes.large,
			inputVars[size] * responsiveUiSizes.medium,
			inputVars[size] * responsiveUiSizes.small
		) }
		${ util.responsiveStyles(
			('margin-' + iconPosition),
			inputVars[size] * responsiveUiSizes.huge,
			inputVars[size] * responsiveUiSizes.large,
			inputVars[size] * responsiveUiSizes.medium,
			inputVars[size] * responsiveUiSizes.small
		) }
	` }
`

class Input extends Component {
	state = {
		focused: false,
		hasValue: false
	}

	renderIcon = (icon, size, iconPosition, theme) => {
		let renderedIcon = false
		if (typeof icon === 'string') {
			const isEmojiIcon = isEmoji(icon)
			if (isEmojiIcon) {
				renderedIcon = <InputIcon size={size} iconPosition={iconPosition} theme={theme} emojiIcon>{icon}</InputIcon>
			} else {
				renderedIcon = <InputIcon size={size} iconPosition={iconPosition} theme={theme}><MaterialIcon size={this.props.size === 'tiny' && '18px'}>{icon}</MaterialIcon></InputIcon>
			}
		} else {
			renderedIcon = <InputIcon size={size} iconPosition={iconPosition} theme={theme}>{icon}</InputIcon>
		}
		return renderedIcon
	}

	setFocus = status => {
		this.setState({ focused: status })
	}

	render () {
		const {
			value,
			type = 'text',
			icon,
			iconPosition = 'left',
			loading,
			error,
			success,
			disabled,
			onClick,
			theme = 'default',
			setTheme = false,
			className,
			shape,
			size = 'medium',
			placeholder,
			label,
			spellcheck = false,
			name,
			onChange = () => {}
		} = this.props

		const { focused } = this.state

		return (
			<InputWrap className={className} theme={setTheme || theme}>
				<StyledInput
					type={type}
					placeholder={placeholder}
					icon={icon}
					iconPosition={iconPosition}
					loading={loading}
					error={error}
					success={success}
					disabled={disabled}
					onClick={onClick}
					theme={setTheme || theme}
					shape={shape}
					size={size}
					onFocus={() => this.setFocus(true)}
					onBlur={() => this.setFocus(false)} // needs work
					onChange={onChange}
					value={value}
					label={label}
					name={name}
					id={name}
					spellCheck={spellcheck}
				/>
				{label && (
					<InputLabel
						icon={icon}
						iconPosition={iconPosition}
						size={size}
						error={error}
						theme={setTheme || theme}
						value={value}
						htmlFor={name}
						focused={focused}
						placeholder={placeholder}
						className={placeholder || value || focused ? 'focused' : 'unfocused' /* to select from styled component */}
					>
						{label}
					</InputLabel>
				)}
				{icon && (
					this.renderIcon(icon, size, iconPosition, theme)
				)}
			</InputWrap>
		)
	}
}

export default Input
