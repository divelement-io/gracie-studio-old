import { rgba } from 'polished'
import * as colors from './colors'
import { responsiveStyles } from './util'

import './fonts'

// Place global Typography in this file
export const primaryFont = "'Avenir', -apple-system, sans-serif"
export const secondaryFont = "'Didot', -apple-system, serif"
export const normal = 'normal'
export const medium = 700
export const bold = 900

export const bodyLarge = `
	${ responsiveStyles('font-size', 24, 22, 20, 18) }
	line-height: 1.5em;
	font-family: ${ primaryFont };
	letter-spacing: 0;
	text-transform: none;
	font-weight: normal;
`
export const bodyMedium = `
	${ responsiveStyles('font-size', 20, 18, 18, 16) }
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
	${ responsiveStyles('font-size', 16, 15, 14, 14) }
	line-height: 1.4em;
	font-family: ${ primaryFont };
	letter-spacing: 0;
	text-transform: none;
	font-weight: normal;
`
export const bodyTiny = `
	${ responsiveStyles('font-size', 14, 13, 12, 12) }
	line-height: 1.5em;
	font-family: ${ primaryFont };
	letter-spacing: 0;
	text-transform: none;
	font-weight: normal;
`

export const h1 = `
	${ responsiveStyles('font-size', 72, 60, 46, 34) }
	line-height: 1.15em;
	font-family: ${ secondaryFont };
	font-weight: ${ normal };
	letter-spacing: -.015em;
	text-transform: none;
	color: var(--text-color);
`

export const h2 = `
	${ responsiveStyles('font-size', 48, 36, 36, 30) }
	line-height: 1.25em;
	font-family: ${ secondaryFont };
	font-weight: ${ normal };
	letter-spacing: -.015em;
	text-transform: none;
	color: var(--text-color);
`

export const h3 = `
	${ responsiveStyles('font-size', 40, 26, 26, 23) }
	line-height: 1.25em;
	font-family: ${ secondaryFont };
	font-weight: ${ normal };
	letter-spacing: 0;
	text-transform: none;
	color: var(--text-color);
`

export const h4 = `
	${ responsiveStyles('font-size', 28, 22, 22, 20) }
	line-height: 1.3em;
	font-family: ${ secondaryFont };
	font-weight: ${ normal };
	letter-spacing: 0;
	text-transform: none;
	color: var(--text-color);
`

export const h5 = `
	${ responsiveStyles('font-size', 18, 16, 16, 16) }
	font-family: ${ primaryFont };
	font-weight: ${ bold };
	line-height: 1.25em;
	letter-spacing: 0;
	text-transform: none;
	color: var(--text-color);
`
export const h6 = `
	${ responsiveStyles('font-size', 15, 13, 13, 13) }
	font-family: ${ primaryFont };
	font-weight: ${ bold };
	line-height: 1em;
	color: var(--text-color);
`

export const blockquote = `
	${ h4 }
	font-style: normal;
	border-left: 2px solid var(--hr-color);
	padding-left: .5em;
`

export const eyebrow = `
	${ body }
	font-weight: ${ bold };
`

export const smallCaps = `
	${ h6 }
	${ responsiveStyles('font-size', 14, 13, 12, 12) }
`

export const buttonStyle = `
	${ body }
	font-weight: ${ medium };
`

export const navStyle = `
	${ body }
	${ responsiveStyles('font-size', 16, 15, 13, 13) }
	font-weight: ${ medium };
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
