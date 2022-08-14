import { graphql } from 'gatsby'

export const query = graphql`
  fragment FiftyFifty on SanityFiftyFifty {
    _key
    _type
    theme
    mediaPlacement
    mediaWidth
    width
    textAlignment
    verticalAlignment
    hidden
    media {
      ...Media
    }
    videoPopup
    mediaCaption
    text {
      eyebrow
      _rawText(resolveReferences: {maxDepth: 10})
      _rawHeadline(resolveReferences: {maxDepth: 10})
    }
    actions {
      ...Button
      ...Link
    }
  }
`
