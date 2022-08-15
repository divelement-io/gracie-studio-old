import { graphql } from 'gatsby'

export const query = graphql`
  fragment TextSection on SanityTextSection {
    _key
    _type
    text {
      eyebrow
      _rawText(resolveReferences: {maxDepth: 10})
    }
    alignment
    theme
    actions {
      ...Button
      ...Link
    }
  }
`
