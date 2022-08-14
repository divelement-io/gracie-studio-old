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
    videoPopup
    text {
      eyebrow
      _rawHeadline(resolveReferences: {maxDepth: 10})
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
