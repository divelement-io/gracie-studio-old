import React from 'react'
import FiftyFifty from './FiftyFifty'
import * as mock from 'src/mock'
import * as mockCopy from 'src/mock/copy'

export default {
  title: 'Blocks/FiftyFifty',
  component: FiftyFifty,
}

const Template = args => <FiftyFifty {...args} />

export const Primary = Template.bind({})
Primary.args = {
  theme: 'default',
  mediaPlacement: 'left',
  mediaWidth: 'normal',
  verticalAlignment: 'center',
  eyebrow: 'Eyebrow Text',
  text: mockCopy.contentfulRichTextShort,
  media: mock.Placeholder32
}
