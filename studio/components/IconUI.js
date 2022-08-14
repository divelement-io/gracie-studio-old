import React from 'react'
import { MdVisibilityOff } from 'react-icons/md'
import { FormField } from '@sanity/base/components'
import { TextInput, Stack, Label } from '@sanity/ui'
import PatchEvent, { set, unset } from '@sanity/form-builder/PatchEvent'
import { useId } from '@reach/auto-id'

export const IconUI = React.forwardRef((props, ref) => {
	const {
		type,
		value,
		readOnly,
		placeholder,
		markers,
		presence,
		compareValue,
		onFocus,
		onBlur,
		onChange
	} = props

	const handleChange = React.useCallback(
		event => {
			const inputValue = event.currentTarget.value
			onChange(PatchEvent.from(inputValue ? set(inputValue) : unset))
		},
		[onChange]
	)

	const inputId = useId()

  return (
  	<FormField
  		description={type.description}
  		title={type.title}
  		compareValue={compareValue}
  		__unstable_markers={markers}
  		__unstable_presence={presence}
  		inputId={inputId}
  		style={{ gridTemplateColumns: 'max-content max-content', columnGap: '16px', alignItems: 'center' }}
  	>
  		<div style={{ display: 'flex', width: '75%', paddingRight: '11px' }}>
	  		{type.options.list.map((item, index) => {
	  			const checked = item.value == value
	  			const itemId = useId()
	  			if (!item) {
	  				return false
	  			}
	  			return (
		  			<div key={itemId}>
		  				<label
		  					htmlFor={itemId}
		  					title={item.title}
		  					style={{
		  						display: 'Flex',
		  						alignItems: 'center',
		  						justifyContent: 'center',
			  					minWidth: '42px',
			  					minHeight: '36px',
			  					fontSize: item.icon ? '24px' : '13px',
			  					fontWeight: item.icon ? 'normal' : '600',
			  					boxSizing: 'border-box',
			  					marginRight: type.options.list.length !== index + 1 ? '-1px' : '0',
			  					position: 'relative',
			  					padding: item.icon ? '0' : '0 10px',
			  					border: '1px solid var(--card-border-color)',
			  					zIndex: checked ? '2' : '1',
			  					cursor: 'pointer',
			  					whiteSpace: 'nowrap',
			  					position: 'relative'
			  				}}
		  				>
		  					{item.icon || item.title}
		  					<div
			  					style={{
			  						display: checked ? 'block' : 'none',
			  						position: 'absolute',
			  						top: '-1px',
			  						left: '-1px',
			  						bottom: '-1px',
			  						right: '-1px',
			  						border: '2px solid var(--card-focus-ring-color)',
			  					}}
			  				/>
		  				</label>
			  			<input
			  				type='radio'
			  				value={item.value}
			  				id={itemId}
			  				onChange={handleChange}
			  				checked={checked}
			  				name={inputId + 'fieldset'}
			  				style={{ display: 'none' }}
			  			/>
		  			</div>
		  		)
	  		})}
  		</div>
    </FormField>
  )
})

export default IconUI
