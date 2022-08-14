import React, { useState, useEffect } from 'react'
import { Card, Stack, Select } from '@sanity/ui'
import { FormField } from '@sanity/base/components'
import PatchEvent, {set, unset} from '@sanity/form-builder/PatchEvent'
import { useId } from '@reach/auto-id' 
import sanityClient from 'part:@sanity/base/client'

export const slugify = (text, separator = '-') => {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, separator)
}

const ClientAsyncSelect = React.forwardRef((props, ref) => {

  const [listItems, setListItems] = useState([])

  const client = sanityClient.withConfig({apiVersion: '2021-03-25'})

  const { 
    type,         // Schema information
    value,        // Current field value
    readOnly,     // Boolean if field is not editable
    markers,      // Markers including validation rules
    presence,     // Presence information for collaborative avatars
    compareValue, // Value to check for "edited" functionality
    onFocus,      // Method to handle focus state
    onBlur,       // Method to handle blur state  
    onChange,      // Method to handle patch events,
    parent
  } = props

  // Creates a change handler for patching data
  const handleChange = React.useCallback(
    // useCallback will help with performance
    (event) => {
      const inputValue = event.currentTarget.value // get current value
      // if the value exists, set the data, if not, unset the data
      onChange(PatchEvent.from(inputValue ? set(inputValue) : unset()))
    },
    [onChange]
  )

  const inputId = useId()

  useEffect(() => {
    const getSections = async () => {
      const items = await client.fetch(`*[_id == $id][0].content.main.modules[]`, {id: parent.link._ref})
      setListItems(items)
    }

    getSections()
  }, [parent.link])

	return (
    <FormField
      description={type.description}  // Creates description from schema
      title={type.title}              // Creates label from schema title
      __unstable_markers={markers}    // Handles all markers including validation
      __unstable_presence={presence}  // Handles presence avatars
      compareValue={compareValue}     // Handles "edited" status
      inputId={inputId}               // Allows the label to connect to the input field
    >
      <Card padding={0}>
        <Stack>
          <Select
            id={inputId}                  // A unique ID for this input
            value={value}                 // Current field value
            readOnly={readOnly}           // If "readOnly" is defined make this field read only
            onFocus={onFocus}             // Handles focus events
            onBlur={onBlur}               // Handles blur events
            ref={ref}
            onChange={handleChange}       // A function to call when the input value changes
            disabled={!listItems || listItems.length < 1}
          >
            <option value='---'>{listItems ? '— Select Page Section —' : 'This page has no sections'}</option>
            {listItems?.map(item => (
              <option 
                key={item._key} 
                value={slugify(item.internalName)}
              >
                {item.internalName}
              </option>
            ))}
          </Select>
        </Stack>
      </Card>
    </FormField>
	)
})

export default ClientAsyncSelect