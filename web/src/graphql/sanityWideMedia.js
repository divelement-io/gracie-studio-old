import { graphql } from 'gatsby'

export const query = graphql`
  fragment WideMedia on SanityWideMedia {
    _key
    _type
    width
    height
    media {
      ...Media
    }
    text {
      eyebrow
      _rawText(resolveReferences: {maxDepth: 10})
    }
    alignment
    actions {
      ...Button
      ...Link
    }
    overlayPlacementVertical
    overlayPlacementHorizontal
  }
`
