import React, { useState, Fragment } from 'react'
import styled from '@emotion/styled'
import { rgba } from 'polished'
import MaterialIcon from 'components/MaterialIcon'
import { isEmoji } from 'utils/validations'
import { uiElementSizes, responsiveUiSizes } from 'styles/globals'
import { colors, util, mq, animations } from 'styles'
import { InputWrap, InputStyles, InputIcon, getState, inputVars } from 'components/Input'
import { Transition } from 'react-transition-group'
import onClickOutside from 'react-onclickoutside'

const timeout = 300

const SelectWrap = styled(InputWrap)`
	position: relative;
	${ ({ open }) => open && `
		z-index: 6;
	` }
`

const StyledSelect = styled.div`
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
	display: flex;
	align-items: center;
	${ ({ open }) => open && `
		border-bottom-right-radius: 0;
		border-bottom-left-radius: 0;
	` }
`

const Options = styled.form`
	position: absolute;
	background: ${ colors.bgColor };
	top: 100%;
	left: 0;
	right: 0;
	transition: none;
	opacity: 0;
	z-index: 2;
	${ mq.largerAndBelow } {
		// transition: opacity ${ timeout }ms ease-in-out, transform ${ timeout }ms ease-in-out;
		// opacity: 1;
		// position: fixed;
		// top: auto;
		// bottom: 0;
		// transform: translate3d(0, 100%, 0);
		// box-shadow: 0 -10px 30px ${ rgba(colors.textColor, 0.15) };
		// padding-bottom: 30px;
	}
	${ ({ transitionStatus }) => transitionStatus === 'entered' && `
		opacity: 1;
		${ mq.largerAndBelow } {
			// transform: none;
		}
	` }
`

const Option = styled.label`
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
	border-top: none;
	position: relative;
	${ ({ lastItem, size }) => !lastItem ? `
		border-bottom: none;
		border-radius: 0;
		${ util.responsiveStyles(
				'height',
				(uiElementSizes[size] - inputVars.borderWidth * 2) * responsiveUiSizes.huge,
				(uiElementSizes[size] - inputVars.borderWidth * 2) * responsiveUiSizes.large,
				(uiElementSizes[size] - inputVars.borderWidth * 2) * responsiveUiSizes.medium,
				(uiElementSizes[size] - inputVars.borderWidth * 2) * responsiveUiSizes.small
			) }
		.icon {
			${ util.responsiveStyles(
				'width',
				(uiElementSizes[size] - inputVars.borderWidth * 2) * responsiveUiSizes.huge,
				(uiElementSizes[size] - inputVars.borderWidth * 2) * responsiveUiSizes.large,
				(uiElementSizes[size] - inputVars.borderWidth * 2) * responsiveUiSizes.medium,
				(uiElementSizes[size] - inputVars.borderWidth * 2) * responsiveUiSizes.small
			) }
		}
	` : `
		${ util.responsiveStyles(
			'height',
			(uiElementSizes[size] - inputVars.borderWidth) * responsiveUiSizes.huge,
			(uiElementSizes[size] - inputVars.borderWidth) * responsiveUiSizes.large,
			(uiElementSizes[size] - inputVars.borderWidth) * responsiveUiSizes.medium,
			(uiElementSizes[size] - inputVars.borderWidth) * responsiveUiSizes.small
		) }
		.icon {
			${ util.responsiveStyles(
				'width',
				(uiElementSizes[size] - inputVars.borderWidth) * responsiveUiSizes.huge,
				(uiElementSizes[size] - inputVars.borderWidth) * responsiveUiSizes.large,
				(uiElementSizes[size] - inputVars.borderWidth) * responsiveUiSizes.medium,
				(uiElementSizes[size] - inputVars.borderWidth) * responsiveUiSizes.small
			) }
		}
		border-top-left-radius: 0;
		border-top-right-radius: 0;
	` }
	display: flex;
	align-items: center;
	justify-content: space-between;
	${ ({ disabled }) => disabled ? `
		cursor: not-allowed;
		border-color: ${ colors.textColor };
		color: ${ colors.lightTextColor };
	` : `
		cursor: pointer;
		&:hover {
			background: ${ colors.lightGrey };
		}
	` }
`

const OptionWrapper = styled.div`
	input {
		display: none;
	}
`

const SelectIcon = styled(InputIcon)`
	pointer-events: none;
`

const ActiveIcon = styled(MaterialIcon)`
	position: absolute;
	top: 0;
	bottom: 0;
	right: ${ inputVars.borderWidth }px;
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${ colors.mainColor };
	transition: transform ${ animations.mediumSpeed } ease-in-out, opacity ${ animations.mediumSpeed } ease-in-out;
`

const MobileOverlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: ${ colors.textColor };
	opacity: 0;
	z-index: 1;
	display: none;
	transition: opacity ${ timeout }ms ease-in-out;
	${ ({ transitionStatus }) => transitionStatus === 'entered' && `
		opacity: .5;
	` }
	${ mq.largerAndBelow } {
		// display: block;
	}
`

const CustomSelect = ({
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
	id,
	value = false,
	onChange,
	options,
	allowMultiple,
	checkDisabled = () => {}
}) => {
	const [open, setOpen] = useState(false)
	const [selectedOption, setOption] = useState(value)

	const toggleOpen = () => {
		if (open) {
			setOpen(false)
		} else {
			setOpen(true)
		}
	}

	const renderIcon = (icon, size, iconPosition, theme) => {
		if (icon) {
			let renderedIcon = false
			const isEmojiIcon = isEmoji(icon)
			if (isEmojiIcon) {
				renderedIcon = <SelectIcon size={size} iconPosition={iconPosition} theme={theme} emojiIcon>{icon}</SelectIcon>
			} else if (typeof icon === 'string') {
				renderedIcon = <SelectIcon size={size} iconPosition={iconPosition} theme={theme}><MaterialIcon size={size === 'tiny' && '18px'}>{icon}</MaterialIcon></SelectIcon>
			} else {
				renderedIcon = <SelectIcon size={size} iconPosition={iconPosition} theme={theme}>{icon}</SelectIcon>
			}
			return renderedIcon
		} else {
			return false
		}
	}

	const handleChange = event => {
		setOption({
			value: event.target.value,
			label: event.target.attributes.label.value
		})
		setOpen(false)
		onChange(event)
	}

	const itemId = id || name

	CustomSelect.handleClickOutside = () => { setOpen(false) }

	const renderCurrentLabel = () => {
		let labelText = 'Select an option'
		if (selectedOption && selectedOption.label) {
			labelText = selectedOption.label
		} else if (label) {
			labelText = label
		} else if (placeholder) {
			labelText = placeholder
		}
		return labelText
	}

	return (
		<SelectWrap className={className} theme={theme} open={open}>
			<StyledSelect
				className='mock-select'
				type={type}
				placeholder={placeholder}
				icon={icon}
				iconPosition='left'
				loading={loading}
				error={error}
				success={success}
				disabled={disabled}
				onClick={onClick}
				theme={theme}
				size={size}
				onChange={onChange}
				label={label}
				name={name}
				onClick={toggleOpen}
				open={open}
			>
				{renderIcon(icon, size, 'left', theme, open)}
				{renderCurrentLabel()}
			</StyledSelect>

			<Transition
				in={open}
				timeout={{
					enter: 1,
					exit: timeout
				}}
				unmountOnExit
				mountOnEnter
			>
				{transitionStatus => (
					<Fragment>
						<MobileOverlay onClick={() => setOpen(false)} transitionStatus={transitionStatus}/>
						<Options id={itemId} transitionStatus={transitionStatus}>
							{options && options.map((option, index) => {
								const selected = option.value === selectedOption.value
								return (
									<OptionWrapper>
										<input
											index={index}
											type={allowMultiple ? 'checkbox' : 'radio'}
											value={option.value}
											id={option.value}
											onChange={event => handleChange(event)}
											name={itemId}
											label={option.label}
											disabled={checkDisabled(name, option.value) || option.disabled}
										/>
										<Option htmlFor={option.value} disabled={option.disabled} size={size} lastItem={index + 1 === options.length}>
											{option.label}
											{selected && (<ActiveIcon size='20px'>check</ActiveIcon>)}
										</Option>
									</OptionWrapper>
								)
							})}
						</Options>
					</Fragment>
				)}
			</Transition>

			{renderIcon(open ? 'keyboard_arrow_up' : 'keyboard_arrow_down', size, 'right', theme, open)}
		</SelectWrap>
	)
}

CustomSelect.defaultProps = {
	type: 'text',
	iconPosition: 'right',
	theme: 'default',
	onChange: () => {}
}

const clickOutsideConfig = {
	handleClickOutside: () => CustomSelect.handleClickOutside
}

export const WrappedCustomSelect = onClickOutside(CustomSelect, clickOutsideConfig)
