import React from 'react'
import styled from '@emotion/styled'

import Section from 'src/components/Section'
import { Container } from 'src/components/Grid'

import Button from 'src/components/Button'
import TextLink from 'src/components/TextLink'
import ScrollEntrance from 'src/components/ScrollEntrance'
import SanityRichText from 'src/components/SanityRichText'

import { typography, mq } from 'src/styles'
import { themes } from 'src/styles/themes'

const Wrapper = styled(Section)``

const Buttons = styled.ul`
	li {
		display: inline-block;
		margin-right: 1em;
		margin-bottom: 1em;
	}
`


// body, bodyMedium, bodySmall, bodyTiny, bodyLarge

// eyebrow, smallCaps,

const Content = () => (
	<>
		<h1>Heading 1</h1>
		<h2>Heading 2</h2>
		<h3>Heading 3</h3>
		<h4>Heading 4</h4>
		<h5>Heading 5</h5>
		<h6>Heading 6</h6>
		<p className="tiny">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</p>
		<p className="small">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</p>

		<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</p>

		<p className="medium">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</p>

		<p className="large">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</p>

		<p>
			<TextLink>Text Link</TextLink>
		</p>
		<br />
		<Buttons>
			<li>
				<Button setTheme="default" >Default Button</Button>
			</li>
			<li>
				<Button setTheme="mainColor" size="small" >Main Color Button</Button>
			</li>
			<li>
				<Button setTheme="textColor" size="tiny" >Text Color Button</Button>
			</li>
			<br />
			<li>
				<Button setTheme="transparent" >Transparent Button</Button>
			</li>
			<br />
			<li>
				<Button setTheme="currentcolor" >Current Color Button</Button>
			</li>
			<li>
				<Button setTheme="currentcolorOutlined" >Current Color Outlined Button</Button>
			</li>
			<br />
			<li>
				<Button setTheme="black" >Black Button</Button>
			</li>
			<li>
				<Button setTheme="white" >White Button</Button>
			</li>
			<li>
				<Button setTheme="lightGrey" >Light Grey Button</Button>
			</li>
		</Buttons>
	</>

)

//<Content />

const Styles = ({ theme, children }) => (
	<Wrapper
		setTheme={theme}
	>
		<Container>
			<ScrollEntrance>
				{children}
			</ScrollEntrance>
		</Container>
	</Wrapper>
)

const AllStyles = () => (
	<>
		<Styles theme="default"><Content /></Styles>
		<Styles theme="lightGrey"><Content /></Styles>
		<Styles theme="darkGrey"><Content /></Styles>
	</>
)


export default AllStyles
