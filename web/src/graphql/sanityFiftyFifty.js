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
    text {
      eyebrow
      _rawText(resolveReferences: {maxDepth: 10})
    }
    media {
      ...Media
    }
    mediaCaption
    actions {
      ...Button
      ...Link
    }
  }
`
