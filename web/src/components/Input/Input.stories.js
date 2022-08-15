import React from 'react'
import { storiesOf } from '@storybook/react'
import Grid from 'src/components/Grid'
import { colors, themes } from 'src/styles'
import Input from './Input'

import { optionsKnob } from '@storybook/addon-knobs'

const inputs = [
	{
		label: 'Label',
		description: 'Default Input'
	},
	{
		label: 'Label',
		placeholder: 'Placeholder',
		icon: 'person',
		description: "'lightGrey' theme with icon"
	},
	{
		label: false,
		placeholder: 'Placeholder',
		icon: 'phone',
		iconPosition: 'right',
		description: "iconPosition: 'right'"
	},
	{
		icon: '☎️',
		placeholder: 'Call a lawyer',
		description: 'Pass and emoji as an icon prop'
	},
	{
		size: 'tiny',
		icon: 'search',
		placeholder: 'Search...',
		description: 'size: tiny'
	},
	{
		size: 'small',
		icon: 'search',
		placeholder: 'Search...',
		description: 'size: small'
	},
	{
		size: 'large',
		icon: 'search',
		placeholder: 'Search...',
		description: 'size: large'
	},
]

const themeOptions = {}
Object.keys(themes.inputThemes).map(theme => {
  const key = theme.toString()
  themeOptions[key] = theme
  return false
})

const stories = storiesOf('Components/Forms/Input', module)
stories.add('Default', () => (
	<div style={{ padding: '5%' }}>
		<Grid
			small="[1]"
			medium="[1] [1]"
			large="[1] [1] [1]"
			colGap={['20px', '5vw', '5vw']}
			rowGap={['20px', '5vw', '5vw']}
		>
			{inputs.map(input => (
				<div>
					<figcaption className="small" style={{
						marginBottom: '2rem',
						paddingTop: '8px',
						borderTop: '1px solid ' + colors.hrColor,
						color: colors.lightTextColor
					}}>{input.description}</figcaption>
					<Input
						size={input.size}
						label={input.label}
						placeholder={input.placeholder}
						icon={input.icon}
						iconPosition={input.iconPosition}
						theme={ optionsKnob('Theme', themeOptions, 'default', { display: 'select' }) }
						loading={input.loading}
						error={input.error}
						disabled={input.disabled}
					/>

				</div>
			))}
		</Grid>
	</div>
))
