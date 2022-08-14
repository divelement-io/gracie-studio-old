export const verticalSpacing = (attr = 'padding-top', multiple = 1) => `	
	${ attr }: calc(var(--vertical-spacing) * ${ multiple });
`

export const baseBorderRadius = 0

// Buttons, Inputs, Selects, etc.
export const uiElementSizes = {
	extraTiny: 26,
	tiny: 32,
	small: 40,
	medium: 50,
	large: 60
}

export const responsiveUiSizes = {
	small: 1,
	medium: 1,
	large: 1,
	huge: 1.2
}
