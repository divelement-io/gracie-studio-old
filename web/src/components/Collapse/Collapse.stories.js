import React from 'react'
import Collapse from './Collapse'

export default {
  title: 'Components/Collapse',
  component: Collapse,
}

const Template = args => <Collapse {...args} />

export const Primary = Template.bind({})
Primary.args = {
	title: 'Collapse Title (Trigger)',
  children: <div style={{ background: '#eee', padding: '1px 0' }}><p>This is the standard use for the collapse component. It uses the <code>title</code> prop as a trigger to expand and collapse itself.</p></div>,
}
