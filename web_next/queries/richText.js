import image from 'queries/image'

export default `
	...,
	_type == "inlineImage" => {
		...,
		image {
			${image}
		}
	}
`