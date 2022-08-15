import React from 'react'
import { storiesOf } from '@storybook/react'
import ResponsiveComponent from './ResponsiveComponent'

const stories = storiesOf('Components/ResponsiveComponent', module)
stories.add('Default', () => (
	<div style={{ padding: '30px' }}>
		<ResponsiveComponent
			small={<h3>👌 Render me at small breakpoint</h3>}
			medium={<h2>📏 Render me at medium breakpoint</h2>}
			large={<h1>📐 Render me at large breakpoint</h1>}
		/>
	</div>
))
