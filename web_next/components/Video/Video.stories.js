import React from 'react'
import Video from './Video'

export default {
  title: 'Components/Video',
  component: Video,
}

const Template = args => <Video {...args} />

export const Primary = Template.bind({})
Primary.args = {
  src: 'https://assets.mixkit.co/videos/preview/mixkit-fire-explosion-on-a-black-background-38818-large.mp4',
}
