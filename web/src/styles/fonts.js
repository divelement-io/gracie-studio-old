import MaterialIconsWoff from '../assets/fonts/icons/material-icons-regular.woff'
import MaterialIconsWoff2 from '../assets/fonts/icons/material-icons-regular.woff2'

import AvenirWoff from '../assets/fonts/avenir/AvenirLTStd-Roman.woff'
import AvenirWoff2 from '../assets/fonts/avenir/AvenirLTStd-Roman.woff2'

import AvenirObliqueWoff from '../assets/fonts/avenir/AvenirLTStd-BookOblique.woff'
import AvenirObliqueWoff2 from '../assets/fonts/avenir/AvenirLTStd-BookOblique.woff2'

import AvenirMediumWoff from '../assets/fonts/avenir/AvenirLTStd-Medium.woff'
import AvenirMediumWoff2 from '../assets/fonts/avenir/AvenirLTStd-Medium.woff2'

import AvenirMediumObliqueWoff from '../assets/fonts/avenir/AvenirLTStd-MediumOblique.woff'
import AvenirMediumObliqueWoff2 from '../assets/fonts/avenir/AvenirLTStd-MediumOblique.woff2'

import AvenirHeavyWoff from '../assets/fonts/avenir/AvenirLTStd-Heavy.woff'
import AvenirHeavyWoff2 from '../assets/fonts/avenir/AvenirLTStd-Heavy.woff2'

import AvenirHeavyObliqueWoff from '../assets/fonts/avenir/AvenirLTStd-HeavyOblique.woff'
import AvenirHeavyObliqueWoff2 from '../assets/fonts/avenir/AvenirLTStd-HeavyOblique.woff2'

import DidotWoff from '../assets/fonts/didot/DidotLTStd-Regular.woff'
import DidotWoff2 from '../assets/fonts/didot/DidotLTStd-Regular.woff2'

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

export const Avenir = 'Avenir'
export const AvenirFont = fontFace(Avenir, AvenirWoff, AvenirWoff2)
export const AvenirObliqueFont = fontFace(Avenir, AvenirObliqueWoff, AvenirObliqueWoff2, 'normal', 'italic')
export const AvenirMediumFont = fontFace(Avenir, AvenirMediumWoff, AvenirMediumWoff2, 700)
export const AvenirMediumObliqueFont = fontFace(Avenir, AvenirMediumObliqueWoff, AvenirMediumObliqueWoff2, 700, 'italic')
export const AvenirHeavyFont = fontFace(Avenir, AvenirHeavyWoff, AvenirHeavyWoff2, 900)
export const AvenirHeavyObliqueFont = fontFace(Avenir, AvenirHeavyObliqueWoff, AvenirHeavyObliqueWoff2, 900, 'italic')

export const Didot = 'Didot'
export const DidotFont = fontFace(Didot, DidotWoff, DidotWoff2)
