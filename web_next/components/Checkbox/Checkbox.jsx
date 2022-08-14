import React from 'react'
import styled from '@emotion/styled'

import { colors, typography, animations } from 'styles'

const Wrapper = styled.div``

const CustomCheckbox = styled.div`
	color: ${ colors.bgColor };
	display: block;
	vertical-align: top;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	width: 18px;
	height: 18px;
	background: transparent;
	border: 2px solid ${ colors.textColor };
	position: relative;
	flex-shrink: 0;
	transition: background ${ animations.mediumSpeed } ease-in-out, border ${ animations.mediumSpeed } ease-in-out, opacity ${ animations.mediumSpeed } ease-in-out;
	${ ({ disabled }) => disabled && `
		cursor: not-allowed;
		opacity: .5;
	` }
`

const Label = styled.label`
	font-size: ${ typography.body };
	display: inline-flex;
	align-items: center;
	cursor: pointer;
	position: relative;
	flex-shrink: 0;
	transition: color ${ animations.mediumSpeed } ease-in-out, opacity ${ animations.mediumSpeed } ease-in-out;

	${ ({ disabled }) => disabled && `
		cursor: not-allowed;
		opacity: .5;
	` }
`

const LabelText = styled.div`
	display: block;
	${ typography.body }
	font-weight: ${ typography.medium };
	padding-left: .6em;
	margin: 0;
`

const Icon = styled.div`
	width: 14px;
	height: 2px;
	background: currentcolor;
	position: relative;
	transition: transform ${ animations.mediumSpeed } ease-in-out;
	transform: scale(.5) rotate(0deg);
	&:after {
		display: block;
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 2px;
		height: 14px;
		margin: -7px 0 0 -1px;
		background: currentcolor;
	}
`

const StyledCheckbox = styled.input`
	display: none;
	appearance: none;
	${ ({ checked }) => checked && `
		~ ${ Label } {
			${ CustomCheckbox } {
				border-color: ${ colors.mainColor };
				background: ${ colors.mainColor }
			}
			${ Icon } {
				transform: rotate(45deg);
			}
		}
	` }
`

const Checkbox = ({ checkbox, readOnly, onChange, checkboxProps, id, checked = false, value, name, disabled, label, children, className, type = 'checkbox' }) => {
	const handleChange = event => {
		if (onChange) {
			onChange(event)
		}
	}

	return (
		<Wrapper className='checkbox-wrapper'>
			<StyledCheckbox
				disabled={disabled}
				type={type}
				value={value}
				id={id || value}
				name={name || id || value}
				onChange={event => handleChange(event)}
				checked={checked}
				readOnly={readOnly}
				{...checkboxProps}
			/>
			<Label htmlFor={id || value} disabled={disabled} className={checked ? className + ' label checked' : className + ' label'}>
				<CustomCheckbox className={checked ? 'checkbox checked' : 'checkbox'}>
					<Icon checkedStatus={checked}/>
				</CustomCheckbox>
				{(label || children) && (
					<LabelText className={checked ? 'label-text checked' : 'label-text'}>{label || children}</LabelText>
				)}
			</Label>
		</Wrapper>
	)
}

export default Checkbox
