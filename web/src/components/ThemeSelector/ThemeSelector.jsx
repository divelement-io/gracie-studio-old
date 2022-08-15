import React from 'react'
import styled from '@emotion/styled'
import themes from 'src/styles/themes'
import { rgba } from 'polished'
import { colors } from 'src/styles'

const ThemeWrapper = styled.div`
	${ ({ 'data-theme': setTheme }) => (setTheme && setTheme !== 'default' && themes[setTheme]) && `
		--bg-color: ${ themes[setTheme].background || colors.bgColor };
		--text-color: ${ themes[setTheme].color || colors.textColor };
		--light-text-color: ${ themes[setTheme].lightColor || colors.lightTextColor };
		--hr-color: ${ themes[setTheme].hrColor || colors.hrColor };
    --main-color: ${ themes[setTheme].mainColor || colors.mainColor };
		background-color: var(--bg-color);
		color: var(--text-color);
		*::selection {
	    background: ${ rgba(themes[setTheme].hoverColor, 0.9) };
	    color: var(--bg-color);
	  }
	  p a {
	  	border-color: ${ rgba(themes[setTheme].color, 0.25) };
	  	&:hover {
	  		border-color: ${ themes[setTheme].hoverColor };
	  	}
	  }
	` }
`

const ThemeSelector = ({ className, setTheme = 'default', ...rest }) => {
	if (!setTheme || setTheme === null) {
		setTheme = 'default'
	}
	return (
		<ThemeWrapper
			data-theme={setTheme}
			className={className}
			{...rest}
		/>
	)
}

export default ThemeSelector
