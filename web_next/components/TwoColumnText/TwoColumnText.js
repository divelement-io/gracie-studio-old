import React from 'react'
import Section from 'components/Section'
import Grid, { Container } from 'components/Grid'
import TextLockup from 'components/TextLockup'

const TwoColumnText = ({
	className,
	theme,
	nextTheme,
	prevTheme,
	isFirstSection,
	leftText,
	rightText,
	actions,
	id
}) => {
	return (
		<Section
			className={className}
      setTheme={theme}
      prevTheme={prevTheme}
      nextTheme={nextTheme}
      isFirstSection={isFirstSection}
      id={id}
		>
			<Container>
				<Grid
					small='[1]'
					medium='[5] 1 [6]'
					extraLarge='[5] 1 [5] 1'
					vAlign='top'
					rowGap='1em'
					colGap='var(--site-gutters)'
				>
					<div><TextLockup headline={leftText} theme={theme} headlineElement='h3' /></div>
					<div><TextLockup text={rightText} theme={theme} actions={actions} /></div>
				</Grid>
			</Container>
		</Section>
	)
}

export default TwoColumnText
