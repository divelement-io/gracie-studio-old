import React from 'react'
import styled from '@emotion/styled'
import ThemeSelector from 'components/ThemeSelector'
import { globals } from 'styles'
import { headerHeight } from 'components/Header'

const SectionWrapper = styled(ThemeSelector)`
	width: 100%;
	z-index: ${ ({ zIndex }) => zIndex };
	${ ({ padded, prevTheme, nextTheme, setTheme, isFirstSection }) => padded !== false && `
		${ !isFirstSection ? `
			${ setTheme === prevTheme ? `
				padding-top: calc(var(--vertical-spacing) * .5);
			` : `
				padding-top: var(--vertical-spacing);
			` }
		` : `
			${ headerHeight('padding-top', 1.5) }
		` }
		${ setTheme === nextTheme ? `
			padding-bottom: calc(var(--vertical-spacing) * .5);
		` : `
			padding-bottom: var(--vertical-spacing);
		` }
	` }
`

const Section = ({
	children,
	setTheme,
	prevTheme,
	nextTheme,
	zIndex,
	buttons,
	padded,
	sectionid,
	className,
	isFirstSection,
	as,
	id
}) => {
	return (
		<SectionWrapper
			className={className}
			setTheme={setTheme}
			prevTheme={prevTheme}
			nextTheme={nextTheme}
			zIndex={zIndex}
			padded={padded}
			isFirstSection={isFirstSection}
			as={as || 'section'}
			id={id}
		>
			{children}
		</SectionWrapper>
	)
}

Section.defaultProps = {
	setTheme: 'default',
	prevTheme: false,
	nextTheme: false,
	zIndex: 1,
	padded: true
}

export default Section
