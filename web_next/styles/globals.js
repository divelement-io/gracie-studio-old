import * as util from './util'

export const verticalSpacing = (attr = 'padding-top', multiple = 1) => `
	${ util.responsiveStyles(attr, (140 * multiple), (100 * multiple), (90 * multiple), (44 * multiple)) }
`

export const baseBorderRadius = 0

// Buttons, Inputs, Selects, etc.
export const uiElementSizes = {
	tiny: 32,
	small: 40,
	medium: 30,
	large: 60
}

export const responsiveUiSizes = {
	small: 1,
	medium: 1,
	large: 1,
	huge: 1.3
}
