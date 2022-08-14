import React from 'react'
import MobileMenu from './MobileMenu'

export default {
  title: 'MobileMenu',
  component: MobileMenu,
}

const Template = args => <MobileMenu {...args} />

export const Primary = Template.bind({})
Primary.args = {
  navLinks: [
		{
			label: 'Shop',
			to: { slug: '/' },
			dropdownLinks: [
				{
					label: 'Shirts',
					to: { slug: '/' },
				},
				{
					label: 'Hats',
					to: { slug: '/' },
				},
				{
					label: 'Shoes',
					to: { slug: '/' },
				}
			]
		},
			{
		label: 'About',
			to: { slug: '/' }
		},
		{
			label: 'Contact',
			to: { slug: '/' }
		}
	]
}
