import React from 'react'
import styled from '@emotion/styled'
import ThemeSelector from 'src/components/ThemeSelector'
import { globals, mq } from 'src/styles'
import { headerHeight } from 'src/components/Header'

const SectionWrapper = styled(ThemeSelector)`
	width: 100%;
	z-index: ${ ({ zIndex }) => zIndex };
	${ ({ padded, prevTheme, nextTheme, setTheme, isFirstSection }) => padded !== false && `
		${ !isFirstSection ? `
			${ setTheme === prevTheme ? `
				${ globals.verticalSpacing('padding-top', 0.5) }
			` : `
				${ globals.verticalSpacing('padding-top') }
			` }
		` : `
			${ headerHeight('padding-top', 2.5) }
			${ mq.largerAndUp } {
				${ headerHeight('padding-top', 1.5) }
			}
		` }
		${ setTheme === nextTheme ? `
			${ globals.verticalSpacing('padding-bottom', 0.5) }
		` : `
			${ globals.verticalSpacing('padding-bottom') }
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
	as
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
