import React from 'react'
import { storiesOf } from '@storybook/react'
import { text, boolean, optionsKnob } from '@storybook/addon-knobs'
import ScrollListener from 'src/components/ScrollListener'
import Header from './Header'
import themes from 'src/styles/themes'

const bannerColorOptions = {}
Object.keys(themes).map(theme => {
  const key = theme.toString()
  bannerColorOptions[key] = theme
  return false
})

storiesOf('Components', module)
	.add('Header', () => (
		<ScrollListener>
			<div style={{ height: '200vh', background: '#ccc' }}>
				<Header
					bannerText={text('Banner Text', 'Free Shipping On Orders $100+')}
					hasAtf={boolean('Has Atf', true)}
          bannerColor={optionsKnob('Banner Color', bannerColorOptions, 'mainColor', { display: 'select' })}
          navigation={[
            {
              id: 'ekdsjflsdkfjds',
              label: 'About',
              to: { id: 'lksfj', slug: '/about' },
              dropdownLinks: [
                {
                  id: 'lksjdfldsdkjf',
                  label: 'Our Process',
                  to: { id: 'lkjsfd', slug: '/our-process' }
                },
                {
                  id: 'lksjdfldskdfjf',
                  label: 'Team Members',
                  to: { id: 'lkjsfd', slug: '/our-process' }
                }
              ]
            },
            {
              id: 'ekdsjflsdkfjds',
              label: 'Shop',
              to: { id: 'sfdkljlksfj', slug: '/shop' },
              dropdownLinks: null
            },
          ]}
				/>
			</div>
		</ScrollListener>
	))
