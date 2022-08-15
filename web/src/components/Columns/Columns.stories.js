import React from 'react'
import Columns from './Columns'
import * as mock from 'src/mock'
import * as mockCopy from 'src/mock/copy'

export default {
  title: 'Blocks/Columns',
  component: Columns,
}

const Template = args => <Columns {...args} />

const numberOfTimes = 5
const columns = []
for (let i = 0; i < numberOfTimes; i++) {
 columns.push(
    {
      media: i % 2 ? false : mock.Placeholder43,
      text: i % 2 ? mockCopy.contentfulRichTextShort : mockCopy.contentfulRichTextVeryShort,
      paragraphSize: 'body',
      actions: [
        {
          __typename: i % 2 ? 'ContentfulButton' : 'ContentfulLink',
          label: i % 2 ? 'Button' : 'Link',
          to: 'https://gdubs.nyc/'
        }
      ]
    }
  )
}

export const Primary = Template.bind({})
Primary.args = {
  columns: columns,
  desktopColumnCount: 3,
  tabletColumnCount: 2,
  mobileColumnCount: 1,
  alignment: 'left',
  verticalAlignment: 'top',
  imageSize: 'large'
}
