import React from 'react'
import Section from 'src/components/Section'
import Grid, { Container } from 'src/components/Grid'
import TextLockup from 'src/components/TextLockup'

const TwoColumnText = ({
	className,
	theme,
	nextTheme,
	prevTheme,
	isFirstSection,
	leftText,
	leftDescription,
	_rawRightText,
	actions
}) => {
	const rightText = _rawRightText
	return (
		<Section
			className={className}
      setTheme={theme}
      prevTheme={prevTheme}
      nextTheme={nextTheme}
      isFirstSection={isFirstSection}
		>
			<Container>
				<Grid
					small='[1]'
					large='[11] 1 [12]'
					extraLarge='[5] 1 [5] 1'
					colGap={['2vw', '3vw', '3vw']}
					vAlign='top'
					rowGap={leftDescription ? '20px' : 0}
				>
					<div>{leftText && (
						<TextLockup
							headline={leftText}
							text={leftDescription}
							textSize='h3'
							showHr
							theme={theme}
							headlineSize='h1'
						/>
					)}</div>
					<div>{rightText && (<TextLockup text={_rawRightText} theme={theme} actions={actions} />)}</div>
				</Grid>
			</Container>
		</Section>
	)
}

export default TwoColumnText
