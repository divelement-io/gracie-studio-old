import React from 'react'
import { storiesOf } from '@storybook/react'
import Checkbox from './Checkbox'
import { text, boolean } from '@storybook/addon-knobs'

const stories = storiesOf('Components/Forms', module)
stories.add('Checkbox', () => (
	<div>
		<h6>With "label" prop</h6>
	  <Checkbox
			checked={ boolean('Checked', false) }
			id='checkbox1'
			label={ text('Eyebrow', 'Label prop text') }
		/>
		<hr/>
		<h6>With children as label prop</h6>
		<Checkbox
			checked={ boolean('Checked', false) }
			id='checkbox2'
		>
			<h5 style={{ margin: 0 }}>I'm an h5 element being used as the label for this checkbox as a 'child' element</h5>
		</Checkbox>
	</div>
))
