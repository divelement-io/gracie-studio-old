import FuturaStdBookWoff from '../assets/fonts/futura/futura-std-book.woff'
import FuturaStdBookWoff2 from '../assets/fonts/futura/futura-std-book.woff2'

import FuturaStdMediumWoff from '../assets/fonts/futura/FuturaStd-Medium.woff'
import FuturaStdMediumWoff2 from '../assets/fonts/futura/FuturaStd-Medium.woff2'

import FuturaStdHeavyWoff from '../assets/fonts/futura/futura-std-heavy.woff'
import FuturaStdHeavyWoff2 from '../assets/fonts/futura/futura-std-heavy.woff2'

import FuturaStdBoldWoff from '../assets/fonts/futura/futura-std-bold.woff'
import FuturaStdBoldWoff2 from '../assets/fonts/futura/futura-std-bold.woff2'


import AGaramondProRegularWoff from '../assets/fonts/garamond/AGaramondPro-Regular.woff'
import AGaramondProRegularWoff2 from '../assets/fonts/garamond/AGaramondPro-Regular.woff2'

import AGaramondProItalicWoff from '../assets/fonts/garamond/AGaramondPro-Italic.woff'
import AGaramondProItalicWoff2 from '../assets/fonts/garamond/AGaramondPro-Italic.woff2'

import AGaramondProSemiboldWoff from '../assets/fonts/garamond/AGaramondPro-Semibold.woff'
import AGaramondProSemiboldWoff2 from '../assets/fonts/garamond/AGaramondPro-Semibold.woff2'

import AGaramondProSemiboldItalicWoff from '../assets/fonts/garamond/AGaramondPro-SemiboldItalic.woff'
import AGaramondProSemiboldItalicWoff2 from '../assets/fonts/garamond/AGaramondPro-SemiboldItalic.woff2'

import AGaramondProBoldWoff from '../assets/fonts/garamond/AGaramondPro-Bold.woff'
import AGaramondProBoldWoff2 from '../assets/fonts/garamond/AGaramondPro-Bold.woff2'

import AGaramondProBoldItalicWoff from '../assets/fonts/garamond/AGaramondPro-BoldItalic.woff'
import AGaramondProBoldItalicWoff2 from '../assets/fonts/garamond/AGaramondPro-BoldItalic.woff2'

import MaterialIconsWoff from '../assets/fonts/icons/material-icons-regular.woff'
import MaterialIconsWoff2 from '../assets/fonts/icons/material-icons-regular.woff2'

export const fontFace = (fontName, woff, woff2, fontWeight = 'normal', fontStyle = 'normal') => `
	@font-face {
		font-family: '${ fontName }';
		src:  url('${ woff }') format('woff'),
					url('${ woff2 }') format('woff2');
		font-weight: ${ fontWeight };
		font-style: ${ fontStyle };
		font-display: swap;
	}
`
export const MaterialIcons = 'Material Icons'
export const MaterialIconsFont = fontFace(MaterialIcons, MaterialIconsWoff, MaterialIconsWoff2)

export const Futura = 'Futura'
export const FuturaFont = fontFace(Futura, FuturaStdBookWoff, FuturaStdBookWoff2)
export const FuturaMediumFont = fontFace(Futura, FuturaStdMediumWoff, FuturaStdMediumWoff2, 400)
export const FuturaHeavyFont = fontFace(Futura, FuturaStdHeavyWoff, FuturaStdHeavyWoff2, 500)
export const FuturaBoldFont = fontFace(Futura, FuturaStdBoldWoff, FuturaStdBoldWoff2, 600)

export const GaramondPro = 'GaramondPro'

export const GaramondProFont = fontFace(GaramondPro, AGaramondProRegularWoff, AGaramondProRegularWoff2)
export const GaramondProItalicFont = fontFace(GaramondPro, AGaramondProItalicWoff, AGaramondProItalicWoff2, 'normal', 'italic')

export const GaramondProSemiBoldFont = fontFace(GaramondPro, AGaramondProSemiboldWoff, AGaramondProSemiboldWoff2, 500)
export const GaramondProSemiBoldItalicFont = fontFace(GaramondPro, AGaramondProSemiboldItalicWoff, AGaramondProSemiboldItalicWoff2, 500, 'italic')

export const GaramondProBoldFont = fontFace(GaramondPro, AGaramondProBoldWoff, AGaramondProBoldWoff2, 700)
export const GaramondProBoldItalicFont = fontFace(GaramondPro, AGaramondProBoldItalicWoff, AGaramondProBoldItalicWoff2, 700, 'italic')

