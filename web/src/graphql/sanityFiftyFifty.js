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
    mediaCaption
    actions {
      ...Button
      ...Link
    }
  }
`
