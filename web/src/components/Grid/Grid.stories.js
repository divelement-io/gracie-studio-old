import { range } from 'lodash'
import React from 'react'
import { storiesOf } from '@storybook/react'
import Grid from './Grid'
import styled from '@emotion/styled'
import { typography, colors } from 'src/styles'
import { rgba } from 'polished'

const Column = styled.div`
	background: ${ rgba(colors.textColor, 0.05) };
	border: 1px solid ${ rgba(colors.textColor, 0.05) };
	border-radius: 2px;
	min-height: 80px;
	display: flex;
	justify-content: center;
	align-items: center;
	${ ({ height }) => height === 'tall' && 'min-height: 200px;' }
	${ ({ height }) => height === 'short' && 'min-height: 60px;' }
`

const Notes = styled.div`
	${ typography.storyNotes }
`

class GridStory extends React.Component {
	state = {
		showOverlay: false
	}

	render () {
		const { title, notes, ...rest } = this.props
		const { showOverlay } = this.state
		return (
			<div>
				<header
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'baseline',
					}}
				>
					<h4 style={{ marginTop: 0, marginBottom: '3rem' }}>
						{title}
					</h4>

					<label>
						<input
							type="checkbox"
							checked={showOverlay}
							onClick={e =>
								this.setState({ showOverlay: e.target.checked })
							}
						/>
						Show Overlay
					</label>
				</header>

				<Grid
					showOverlay={showOverlay}
					{...rest}
				/>

				{notes && (<Notes>{notes}</Notes>)}

				<br />
				<hr />
			</div>
		)
	}
}

storiesOf('Styleguide/Grid', module).add('Default', () => (
	<div>

		<GridStory
			title="Different Columns at Different Breakpoints"
			small="[1] [1] [1] [1]"
			medium="[1] [1] [1] [1] [1] [1] [1] [1] [1] [1]"
			large="[1] [1] [1] [1] [1] [1] [1] [1] [1] [1] [1] [1] [1] [1]"
			extraLarge="[1] [1] [1] [1] [1] [1] [1] [1] [1] [1] [1] [1] [1] [1] [1] [1] [1] [1] [1] [1] [1] [1] [1] [1] [1] [1] [1] [1]"
			notes={<p><code>small</code>, <code>medium</code>, <code>large</code>, and <code>extraLarge</code> are used to configure the columns. The format for a column is <code>[1]</code> and the format for a gap is <code>1</code>. ie: <code>1 [4] [4] [4] 1</code> is a 14 column grid with a space of 1 column on each side. <em>Only <code>small</code> is required.</em></p>}
		>
			{range(28).map(i => (
				<Column
					key={i}
				>
					{i + 1}
				</Column>
			))}
		</GridStory>

		<GridStory
			title="4 → 2 → 1"
			small="[12]"
			medium="[2] [2]"
			large="[1] [1] [1] [1]"
			notes={<p>
				<code>small="[1]"</code><br/>
				<code>medium="[2] [2]"</code><br/>
				<code>large="[1] [1] [1] [1]"</code>
			</p>}
		>
			<Column>
				1
			</Column>
			<Column>
				2
			</Column>
			<Column>
				3
			</Column>
			<Column>
				4
			</Column>
		</GridStory>

		<GridStory
			title="Offsets"
			small="[4] 4 [4]"
			medium="[6] 4 [6]"
			large="[8] 8 [8]"
			notes={<p>
				<code>small="[4] 4 [4]"</code><br/>
				<code>medium="[6] 4 [6]"</code><br/>
				<code>large="[8] 8 [8]"</code>
			</p>}
		>
			<Column>
				large 8
			</Column>

			<Column>
				large 8
			</Column>
		</GridStory>

		<GridStory
			title="Grid Direction"
			small="1 [12] 1"
			medium="1 [5] 1 [6] 1"
			large="1 [5] 1 [6] 1"
			gridDirection="rtl"
			notes={<p><code>gridDirection: 'rtl'</code></p>}
		>
			<Column height="tall">
				1st in DOM
			</Column>

			<Column height="short">
				2nd in DOM
			</Column>
		</GridStory>

		<GridStory
			title="Centered"
			small="1 [10] 1"
			medium="1 [3] [3] [6] 1"
			large="1 [3] [5] [4] 1"
			vAlign="center"
			notes={<p><code>vAlign="center"</code></p>}
		>
			<Column>
				col
			</Column>
			<Column height="tall">
				col
			</Column>
			<Column height="short">
				col
			</Column>
		</GridStory>

		<GridStory
			title="Column and Row Gaps"
			small="1 [1] 1"
			medium="1 [6] [6] 1"
			large="1 [3] [3] [3] [3] 1"
			colGap={['.75rem', '1.5rem', '2rem']}
			rowGap={['1.5rem', '3rem', '4rem']}
		>
			<Column>col</Column>
			<Column>col</Column>
			<Column>col</Column>
			<Column>col</Column>
		</GridStory>

		<GridStory
			title="Different Columns at Different Breakpoints"
			small="m [1] g [1] g [1] m"
			medium="m [1] g [1] g [1] m"
			large="m [1] g [1] g [1] m"
			larger="m [1] g [1] g [1] m"
			notes={<p>For advanced grid usage you may also use the characters <code>m</code> or <code>g</code> to add the global margin or gutter values defined in <code>styles/gridSettings.js</code>. ei: <code>m [1] g [1] g [1] m</code></p>}
		>
			{range(6).map(i => (
				<Column
					key={i}
				>
					{i + 1}
				</Column>
			))}
		</GridStory>

	</div>
))
