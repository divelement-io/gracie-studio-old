import React from 'react'
import CartIcon from './CartIcon'

export default {
  title: 'Components/CartIcon',
  component: CartIcon,
}

const Template = args => <CartIcon {...args} />

export const Primary = Template.bind({})
Primary.args = {
  count: 3,
}
