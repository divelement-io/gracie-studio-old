import React from 'react'
import NotificationBanner from './NotificationBanner'

export default {
  title: 'Components/NotificationBanner',
  component: NotificationBanner,
}

const Template = args => <NotificationBanner {...args} />

export const Primary = Template.bind({})
Primary.args = {
  text: 'I am a notification banner. I am used in the header component.'
}
