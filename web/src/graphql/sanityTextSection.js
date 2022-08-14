import { graphql } from 'gatsby'

export const query = graphql`
  fragment TextSection on SanityTextSection {
    _key
    _type
    text {
      eyebrow
      _rawText(resolveReferences: {maxDepth: 10})
      _rawHeadline(resolveReferences: {maxDepth: 10})
      text {
        _key
      }
      headline {
        _key
      }
    }
    alignment
    theme
    actions {
      ...Button
      ...Link
    }
  }
`
