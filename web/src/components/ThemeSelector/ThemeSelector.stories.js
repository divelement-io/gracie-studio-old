import React from 'react'
import styled from '@emotion/styled'
import { storiesOf } from '@storybook/react'
import ThemeSelector from './ThemeSelector'
import Grid from 'src/components/Grid'
import Button from 'src/components/Button'
import { typography } from 'src/styles'
import themes from 'src/styles/themes'
const qbf = 'The quick brown fox jumps over the lazy dog'
const lorem = 'lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.'

const Eyebrow = styled.h6`
	${ typography.eyebrow }
`

const themeOptions = Object.keys(themes)

const ThemePreview = styled(ThemeSelector)`
	padding: 2em 2em 2.5em 2em;
`

const stories = storiesOf('Components', module)

stories.add('ThemeSelector', () => (
	<Grid
		small="[1]"
		medium="[1] [1]"
		large="[1] [1] [1]"
		colGap="0"
		rowGap="0"
	>
		{themeOptions.map(theme => {
			return (
				<ThemePreview setTheme={theme}>
					<Eyebrow>{theme}</Eyebrow>
					<h3>{qbf}</h3>
					<p>{lorem}</p>
					<div style={{ display: 'inline-block', marginRight: '10px' }}>
						<Button size="small" setTheme={themes[theme].buttonTheme}>Button</Button>
					</div>
					<Button size="small" setTheme={themes[theme].buttonThemeSecondary}>Button</Button>
				</ThemePreview>
			)
}
		)}
	</Grid>
))
