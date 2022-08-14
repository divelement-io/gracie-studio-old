import React, { useState } from 'react'
import styled from '@emotion/styled'
import MaterialIcon from 'components/MaterialIcon'
import { isEmoji } from 'utils/validations'

import { InputWrap, InputStyles, InputIcon, InputLabel, getState } from 'components/Input'

const SelectWrap = styled(InputWrap)``

const StyledSelect = styled.select`
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
	cursor: pointer;
`

const Select = ({
	value,
	type,
	icon,
	iconPosition,
	loading,
	error,
	success,
	disabled,
	onClick,
	theme = 'default',
	className,
	size = 'medium',
	placeholder,
	label,
	name,
	onChange,
	options
}) => {
	const renderIcon = (icon, size, iconPosition, theme) => {
		let renderedIcon = false
		const isEmojiIcon = isEmoji(icon)
		if (isEmojiIcon) {
			renderedIcon = <InputIcon size={size} iconPosition={iconPosition} theme={theme} emojiIcon>{icon}</InputIcon>
		} else if (typeof icon === 'string') {
			renderedIcon = <InputIcon size={size} iconPosition={iconPosition} theme={theme}><MaterialIcon size={size === 'tiny' && '18px'}>{icon}</MaterialIcon></InputIcon>
		} else {
			renderedIcon = <InputIcon size={size} iconPosition={iconPosition} theme={theme}>{icon}</InputIcon>
		}
		return renderedIcon
	}

	const [focused, setFocus] = useState(false)

	// const focused = true

	if (!options || options.length < 1) {
		return false
	}

	return (
		<SelectWrap className={className} theme={theme}>
			<StyledSelect
				type={type}
				placeholder={placeholder}
				icon={icon}
				iconPosition={iconPosition}
				loading={loading}
				error={error}
				success={success}
				disabled={disabled}
				onClick={onClick}
				theme={theme}
				size={size}
				onFocus={() => setFocus(true)}
				onChange={onChange}
				value={value}
				label={label}
				name={name}
			>
			<option disabled selected value='default'>Select Role</option>
			{options.map((option, index) => (
				<option key={name + '-' + option.value} value={option.value}>{option.label}</option>
			))}
			</StyledSelect>
			{label && (
				<InputLabel
					icon={icon}
					iconPosition={iconPosition}
					size={size}
					error={error}
					theme={theme}
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
				renderIcon(icon, size, iconPosition, theme)
			)}
		</SelectWrap>
	)
}

Select.defaultProps = {
	type: 'text',
	iconPosition: 'right',
	theme: 'default',
	icon: 'keyboard_arrow_down',
	onChange: () => {}
}

export default Select
