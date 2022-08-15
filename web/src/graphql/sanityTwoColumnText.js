import { graphql } from 'gatsby'

export const query = graphql`
  fragment TwoColumnText on SanityTwoColumnText {
    _key
    _type
    theme
    _rawLeftText(resolveReferences: {maxDepth: 10})
    _rawRightText(resolveReferences: {maxDepth: 10})
    actions {
      ...Button
      ...Link
    }
  }
`
