import { graphql } from 'gatsby'

export const query = graphql`
  fragment PersonList on SanityPersonList {
    _key
    _type
    theme
    title
    persons {
      ...Person
    }
  }
`
