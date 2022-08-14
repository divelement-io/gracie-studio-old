import React from 'react'
import styled from '@emotion/styled'
import themes from 'styles/themes'
import { rgba, cssVar } from 'polished'
import { colors } from 'styles'

const ThemeWrapper = styled.div`
	${ ({ 'data-theme': setTheme }) => (setTheme && setTheme !== 'default' && themes[setTheme]) && `
		--bg-color: ${ themes[setTheme].background || colors.bgColor };
		--text-color: ${ themes[setTheme].color || colors.textColor };
		--main-color: ${ themes[setTheme].mainColor || colors.mainColor };
		--light-text-color: ${ themes[setTheme].color || colors.lightTextColor };
		--hr-color: ${ themes[setTheme].color || colors.hrColor };
		background-color: var(--bg-color);
		color: var(--text-color);
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
