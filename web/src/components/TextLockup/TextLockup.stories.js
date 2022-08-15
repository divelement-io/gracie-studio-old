import React from 'react'
import TextLockup from './TextLockup'

export default {
  title: 'Components/TextLockup',
  component: TextLockup,
}

const Template = args => <TextLockup {...args} />

export const Primary = Template.bind({})
Primary.args = {
  theme: 'default',
	eyebrow: 'Text Lockup Component',
	alignment: 'center',
	headline: 'Intro statement ipsum dolor sit amet, consectetur adipiscing elit. Quid Zeno? Cave putes quicquam esse verius. Peccata paria. Duo Reges: constructio interrete.',
	headlineSize: 'h3',
	text: <p>Intro statement ipsum dolor sit amet, consectetur adipiscing elit. Quid Zeno? Cave putes quicquam esse verius. Peccata paria. Duo Reges: constructio interrete.</p>,
	textSize: 'body'
}
