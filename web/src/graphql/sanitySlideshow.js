import { graphql } from 'gatsby'

export const query = graphql`
	fragment Slideshow on SanitySlideshow {
		_key
		_type
		internalName
		hidden
		slides {
			_key
			asset {
				gatsbyImageData(layout: FULL_WIDTH)
			}
			caption
			altText
		}
	}
`
