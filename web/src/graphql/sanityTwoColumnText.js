import { graphql } from 'gatsby'

export const query = graphql`
  fragment TwoColumnText on SanityTwoColumnText {
    _key
    _type
    theme
    leftText
    leftDescription
    _rawRightText(resolveReferences: {maxDepth: 10})
    actions {
      ...Button
      ...Link
    }
  }
`
