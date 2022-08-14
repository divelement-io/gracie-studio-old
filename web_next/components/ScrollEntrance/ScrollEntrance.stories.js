import React from 'react'
import ScrollEntrance from './ScrollEntrance'

export default {
  title: 'Components/ScrollEntrance',
  component: ScrollEntrance,
}

const theArray = [0, 1, 2, 3, 4]

const Template = args => (
	theArray.map(i => (
		<ScrollEntrance {...args} key={i}>
			<div
				style={{
					background: 'rgba(0, 0, 0, 0.05)',
					border: '1px solid rgba(0, 0, 0, 0.05)',
					borderRadius: '2px',
					minHeight: '200px',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					fontSize: '20px',
					width: '100%',
					maxWidth: '600px',
					margin: '20px auto',
				}}
			>
				{i + 1} from left
			</div>
		</ScrollEntrance>
	))
)

const MultiTemplate = args => (
	<ScrollEntrance {...args}>
		{theArray.map(i => (
			<div
				style={{
					background: 'rgba(0, 0, 0, 0.05)',
					border: '1px solid rgba(0, 0, 0, 0.05)',
					borderRadius: '2px',
					minHeight: '50px',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					fontSize: '16px',
					width: '100%',
					maxWidth: '600px',
					margin: '20px auto',
				}}
			>
				{i + 1} from left
			</div>
		))}
	</ScrollEntrance>
)

export const Default = Template.bind({})
Default.args = {}

export const MultipleItems = MultiTemplate.bind({})
Default.args = {}

export const FromLeft = Template.bind({})
FromLeft.args = {
  transform: 'translate3d(-70px, 0, 0)'
}

export const FromRight = Template.bind({})
FromRight.args = {
  transform: 'translate3d(70px, 0, 0)'
}

export const ScaleUp = Template.bind({})
ScaleUp.args = {
  transform: 'translate3d(0, 50px, 0) scale(.8)'
}
