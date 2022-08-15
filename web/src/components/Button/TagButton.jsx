import React from 'react'
import { rgba } from 'polished'
import styled from '@emotion/styled'
import Button from 'src/components/Button'
import { colors, typography } from 'src/styles'

const StyledButton = styled(Button)`
	border-radius: 0px;
  padding: .6em .5em .6em;
  color: var(--light-text-color);
  ${ typography.bodyTiny }
  line-height: 1em;
  font-weight: ${ typography.medium }; 
  box-shadow: none;
  flex-shrink: 0;
  flex-grow: 0;
  ${ ({ setTheme }) => setTheme === 'lightGrey' ? `
  	background: ${ rgba(colors.textColor, 0.075) };
  	border-color: transparent;
  	&:not([disabled]) {
	  	&:hover {
	  		color: ${ colors.textColor };
	  		background: ${ rgba(colors.textColor, 0.15) };
	  		border-color: transparent;
	  	}
	  }
  ` : '' }
  &[disabled],
  &:disabled {
  	opacity: 1;
  	mix-blend-mode: unset;
  	cursor: default;
  	pointer-events: all;
  	&:hover {
  		color: var(--text-color);
  	}
  }
  &:not([disabled]) {
  	&:hover {
  		color: ${ colors.textColor };
  	}
  }
`

const TagButton = ({
	to = false,
	children,
	className,
	setTheme = 'lightGrey'
}) => {
	return (
		<StyledButton
			className={className}
			as={!to && 'div'}
			to={to}
			size='extraTiny'
			setTheme={setTheme}
			disabled={!to}
		>
			{children}
		</StyledButton>
	)
}

export default TagButton
