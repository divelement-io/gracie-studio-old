import { graphql } from 'gatsby'

export const query = graphql`
  fragment RepresentativeList on SanityRepresentativeList {
    _key
    _type
    theme
    title
    representatives {
      ...Representative
    }
  }
`
