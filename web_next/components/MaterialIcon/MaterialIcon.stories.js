import React from 'react'
import MaterialIcon from './MaterialIcon'

export default {
  title: 'Components/MaterialIcon',
  component: MaterialIcon,
}

const Template = args => <MaterialIcon {...args} />

export const Primary = Template.bind({})
Primary.args = {
  children: 'check',
}
