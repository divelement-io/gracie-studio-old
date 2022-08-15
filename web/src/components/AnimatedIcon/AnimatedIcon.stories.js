import React from 'react'
import AnimatedIcon from './AnimatedIcon'

export default {
  title: 'Components/AnimatedIcon',
  component: AnimatedIcon,
}

const Template = args => <AnimatedIcon {...args} />

export const Primary = Template.bind({})
Primary.args = {
  icon: 'menu'
}
