import React from 'react'
import { storiesOf } from '@storybook/react'
import Select from './Select'
import { CustomSelect } from 'components/Select'
import Input from 'components/Input'

const stories = storiesOf('Components/Forms/Select', module)
stories.add('Default', () => (
	<div style={{ display: 'flex', flexDirection: 'column', columnGap: '20px', rowGap: '20px', margin: '100px auto', maxWidth: '600px' }} >
	<Select
		options={[
			{
				value: 'option-value',
				label: 'A Great Option'
			},
			{
				value: 'option-value-2',
				label: 'Another Great Option'
			}
		]}
	/>
	<Input value='Input Value'/>
	<hr/>
	<CustomSelect
		id='customSelect'
		options={[
			{
				value: 'option-value',
				label: 'A Great Option'
			},
			{
				value: 'option-value-2',
				label: 'Another Great Option'
			}
		]}
	/>

	<CustomSelect
		id='tinyCustomSelectWIcon'
		icon='sync'
		size='tiny'
		options={[
			{
				value: 'option-value',
				label: 'A Great Option'
			},
			{
				value: 'option-value-2',
				label: 'Another Great Option'
			}
		]}
	/>

	<CustomSelect
		id='smallCustomSelectWIcon'
		icon='sync'
		size='small'
		options={[
			{
				value: 'option-value',
				label: 'A Great Option'
			},
			{
				value: 'option-value-2',
				label: 'Another Great Option'
			}
		]}
	/>

	<CustomSelect
		id='customSelectWIcon'
		icon='sync'
		options={[
			{
				value: 'option-value',
				label: 'A Great Option'
			},
			{
				value: 'option-value-2',
				label: 'Another Great Option'
			}
		]}
	/>

	<CustomSelect
		id='largeCustomSelectWIcon'
		icon='sync'
		size='large'
		options={[
			{
				value: 'option-value',
				label: 'A Great Option'
			},
			{
				value: 'option-value-2',
				label: 'Another Great Option'
			}
		]}
	/>
	</div>
))
