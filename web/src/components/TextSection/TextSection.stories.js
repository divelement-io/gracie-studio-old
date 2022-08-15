import React from 'react'
import TextSection from './TextSection'
import * as mock from 'src/mock'
import * as mockCopy from 'src/mock/copy'

export default {
  title: 'Blocks/TextSection',
  component: TextSection,
}

const Template = args => <TextSection {...args} />

export const Primary = Template.bind({})
Primary.args = {
  alignment: 'center',
  eyebrow: 'Eyebrow Text',
  text: mockCopy.contentfulRichTextShort,
  theme: 'default',
  paragraphSize: 'body',
  actions: [
    {
      __typename: 'ContentfulButton',
      label: 'Button No. 1',
      to: 'https://gdubs.nyc/'
    },
    {
      __typename: 'ContentfulButton',
      label: 'Button No. 2',
      to: 'https://gdubs.nyc/',
      theme: 'secondary'
    }
  ]
}
