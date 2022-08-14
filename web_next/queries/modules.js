import groq from 'groq'
import image from 'queries/image'
import richText from 'queries/richText'
import link from 'queries/link'

export default `
	_type == "textSection" => {
		...,
		text {
			...,
			text[]{
				${richText}
			}
		},
		actions[]{
			${link}
		},
	},
	_type == "wideMedia" => {
		...,
		actions[]{
			${link}
		},
		media {
			...,
			image {
				${image}
			}
		}
	},
	_type == "fiftyFifty" => {
		...,
		media.mediaType == "image" => {
			media {
				...,
				image {
					${image}
				}
			}
		},
		actions[]{
			${link}
		},
	},
	_type == "columns" => {
		...,
		columns[]{
			...,
			defined(image) => {
				image {
					${image}
				}
			}
		},
		actions[]{
			${link}
		},
	},
	_type == "twoColumnText" => {...},
	// plopAddModules
`