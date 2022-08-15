import React from 'react'
import WideMedia from './WideMedia'
import * as mock from 'src/mock'
import * as mockCopy from 'src/mock/copy'

export default {
  title: 'Blocks/WideMedia',
  component: WideMedia,
}

const Template = args => <WideMedia {...args} />

export const Primary = Template.bind({})
Primary.args = {
  theme: 'default',
  media: mock.Placeholder169,
  caption: 'caption',
  width: 'default',
  height: 'auto'
}

// export const OverlayText = Template.bind({})
// OverlayText.args = {
//   theme: 'default',
//   media: mock.Placeholder169,
//   eyebrow: 'Eyebrow Text',
//   text: copy.contentfulRichTextShort,
//   paragraphSize: 'bodyLarge',
//   actions: {[
//     {
//       __typename: 'ContentfulButton',
//       label: 'Button No. 1',
//       to: 'https://gdubs.nyc/'
//     },
//     {
//       __typename: 'ContentfulButton',
//       label: 'Button No. 2',
//       to: 'https://gdubs.nyc/'
//     }
//   ]}
//   overlayPlacement: 'center center',
//   overlayTextAlignment: 'center',
//   overlayTextColor: 'auto',
//   width: 'default',
//   height: 'auto'
// }

// export const Video = Template.bind({})
// Video.args = {
//   theme: 'default',
//   loop: true,
//   width: 'default',
//   height: 'auto',
//   media: mock.PlaceholderVideo
// }
