import React, { useContext } from 'react'
import styled from '@emotion/styled'
import { AppContext } from 'state/AppState'
import NextLink from 'next/link'

const LinkStyles = setTheme => `
	font-size: inherit;
	text-decoration: none;
	cursor: pointer;
`

const StyledLinkElement = styled.a`
	cursor: pointer;
	${ ({ setTheme }) => `
		${ LinkStyles(setTheme) }
	` }
`

const StyledNextLink = styled(NextLink)`
	cursor: pointer;
	${ ({ theme }) => `
		${ LinkStyles(theme) }
	` }
`

const Link = ({ to, href, external, target, children, label, className, name, title, setTheme, pageTransition = 'fade', as }) => {
	const { setPageTransition } = useContext(AppContext)
	// TODO make sure anchor links work with animation
	// if (!external && to?.includes('#')) {
	// 	as = AnchorLink
	// }

	// Some logic to change label is the link label is "Learn More"
	let titleText = href || to
	if (titleText == '/') {
		titleText = 'Homepage'
	}

	if (typeof children === 'string') {
		if (children.toLowerCase() === 'learn more') {
			title = "Go to " + titleText
			name = "Go to " + titleText
		}
	}

	if (typeof label === 'string') {
		if (label.toLowerCase() === 'learn more') {
			title = "Go to " + titleText
			name = "Go to " + titleText
		}
	}

	if (external) {
		return (
			<StyledLinkElement
				title={title}
				name={name || title}
				aria-label={name || title}
				className={className}
				href={href || to}
				target={target}
				theme={setTheme}
				rel='noopener noreferrer'
				as={as}
			>
				{children || label}
			</StyledLinkElement>
		)
	} else {
		return (
			<StyledNextLink
				href={href || to}
				theme={setTheme}
				onClick={() => setPageTransition(pageTransition)}
				as={as}
			>
				<a
					className={className}
					title={title}
					name={name || title}
					aria-label={name || title}
				>{children || label}</a>
			</StyledNextLink>
		)
	}
}

Link.defaultProps = {
	to: '#',
	external: false,
	target: '',
	setTheme: 'alert'
}

export default Link
