import MaterialIconsWoff from 'assets/fonts/icons/material-icons-regular.woff'
import MaterialIconsWoff2 from 'assets/fonts/icons/material-icons-regular.woff2'

import plainWoff from 'assets/fonts/plain/plain-regular.woff'
import plainWoff2 from 'assets/fonts/plain/plain-regular.woff2'

import plainBoldWoff from 'assets/fonts/plain/plain-bold.woff'
import plainBoldWoff2 from 'assets/fonts/plain/plain-bold.woff2'

import plainMediumWoff from 'assets/fonts/plain/plain-medium.woff'
import plainMediumWoff2 from 'assets/fonts/plain/plain-medium.woff2'

import EditorialWoff from 'assets/fonts/editorial/editorial-new-ultra-light.woff'
import EditorialWoff2 from 'assets/fonts/editorial/editorial-new-ultra-light.woff2'

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

export const plain = 'Plain'
export const plainFont = fontFace(plain, plainWoff, plainWoff2)
export const plainBoldFont = fontFace(plain, plainBoldWoff, plainBoldWoff2, '900')
export const plainMediumFont = fontFace(plain, plainMediumWoff, plainMediumWoff2, '700')

export const editorial = 'Editorial'
export const EditorialFont = fontFace(editorial, EditorialWoff, EditorialWoff2, '700')
