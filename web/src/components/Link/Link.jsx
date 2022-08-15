import React, { useContext } from 'react'
import styled from '@emotion/styled'
import { AppContext } from 'src/state/AppState'

import { Link as GatsbyLink } from 'gatsby'

const LinkStyles = setTheme => `
	font-size: inherit;
	text-decoration: none;
	cursor: pointer;
`

const StyledLinkElement = styled.a`
	${ ({ setTheme }) => `
		${ LinkStyles(setTheme) }
	` }
`

const StyledGatsbyLink = styled(GatsbyLink)`
	${ ({ theme }) => `
		${ LinkStyles(theme) }
	` }
`

const Link = ({ to, external, target, children, label, className, setTheme, title, name, pageTransition = 'fade' }) => {
	const { setPageTransition } = useContext(AppContext)

	if (external) {
		return (
			<StyledLinkElement
				title={title}
				name={name || title}
				aria-label={name || title}
				className={className}
				href={to}
				target={target}
				theme={setTheme}
				rel='noopener noreferrer'
			>
				{children || label}
			</StyledLinkElement>
		)
	} else {
		return (
			<StyledGatsbyLink
				title={title}
				name={name || title}
				aria-label={name || title}
				className={className}
				to={to}
				theme={setTheme}
				onClick={() => setPageTransition(pageTransition)}
			>
				{children || label}
			</StyledGatsbyLink>
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
