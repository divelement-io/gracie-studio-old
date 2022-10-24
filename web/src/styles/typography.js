import { rgba } from 'polished'
import * as colors from './colors'
import { responsiveStyles } from './util'

import './fonts'

// Place global Typography in this file
export const primaryFont = "'GaramondPro', -apple-system, sans-serif"
export const secondaryFont = "'Futura', -apple-system, serif"

export const normal = 'normal'
export const light = 300
export const medium = 400
export const heavy = 500
export const bold = 600

export const bodyLarge = `
	${ responsiveStyles('font-size', 36, 32, 32, 30) }
	line-height: 1.5em;
	font-family: ${ primaryFont };
	letter-spacing: 0;
	text-transform: none;
	font-weight: normal;
`

export const bodyMedium = `
	${ responsiveStyles('font-size', 24, 24, 18, 18) }
	line-height: 1.5em;
	font-family: ${ primaryFont };
	letter-spacing: 0;
	text-transform: none;
	font-weight: normal;
`

export const body = `
	${ responsiveStyles('font-size', 18, 16, 16, 14) }
	line-height: 1.5em;
	font-family: ${ primaryFont };
	letter-spacing: 0;
	text-transform: none;
	font-weight: normal;
`

export const bodySmall = `
	${ responsiveStyles('font-size', 14, 14, 12, 12) }
	line-height: 1.4em;
	font-family: ${ primaryFont };
	letter-spacing: 0;
	text-transform: none;
	font-weight: normal;
`
export const bodyTiny = `
	${ responsiveStyles('font-size', 12, 12, 10, 10) }
	line-height: 1.5em;
	font-family: ${ primaryFont };
	letter-spacing: 0;
	text-transform: none;
	font-weight: normal;
`

export const h1 = `
	${ responsiveStyles('font-size', 72, 48, 48, 42) }
	font-family: ${ primaryFont };
	font-weight: ${ normal };
	line-height: 1.2em;
	letter-spacing: inherit;
	text-transform: none;
	color: var(--text-color);
`

export const h2 = `
	${ responsiveStyles('font-size', 36, 30, 30, 28) };
	font-family: ${ primaryFont };
	font-weight: ${ light };
	line-height: 1.2em;
	letter-spacing: inherit;
	text-transform: none;
	color: var(--text-color);
`

export const h3 = `
	${ responsiveStyles('font-size', 36, 24, 24, 18) };
	font-family: ${ primaryFont };
	font-weight: ${ light };
	line-height: 1.333em;
	letter-spacing: inherit;
	text-transform: none;
	color: var(--text-color);
`

export const h4 = `
	${ responsiveStyles('font-size', 24, 18, 18, 16) };
	font-family: ${ secondaryFont };
	font-weight: ${ medium };
	line-height: 1.333em;
	letter-spacing: 0.15em;
	text-transform: uppercase;
	color: var(--text-color);
`

export const h5 = `
	${ responsiveStyles('font-size', 16, 16, 14, 14) };
	font-family: ${ secondaryFont };
	font-weight: ${ medium };
	line-height: 1.25em;
	letter-spacing: 0.15em;
	text-transform: uppercase;
	color: var(--text-color);
`
export const h6 = `
	${ responsiveStyles('font-size', 12, 12, 10, 10) }
	    text-transform: uppercase;
	font-family: ${ secondaryFont };
	font-weight: ${ medium };
	line-height: 1.4em;
	letter-spacing: 0.15em;
	color: var(--text-color);
`

export const blockquote = `
	${ h3 }
	font-style: normal;
	border-left: 2px solid var(--hr-color);
	padding-left: .5em;
`

export const eyebrow = `
	${ h6 }
`

export const smallCaps = `
	${ h6 }
	${ responsiveStyles('font-size', 14, 14, 12, 12) }
`

export const buttonStyle = `
	font-family: ${ secondaryFont };
	font-weight: ${ medium };
	text-transform: uppercase;
	letter-spacing: 0.15em;
`

export const navStyle = `
	font-family: ${ secondaryFont };
	${ responsiveStyles('font-size', 13, 13, 10, 10) }
	font-weight: ${ normal };
	text-transform: uppercase;
	letter-spacing: 0.15em;
`

export const storyNotes = `
	max-width: 750px;
	p {
		code {
			background: ${ rgba(colors.textColor, 0.1) };
			color: ${ colors.textColor };
			border-radius: 3px;
			padding: .05em .35em .15em;
			font-style: normal;
		}
	}
`
