import { graphql } from 'gatsby'

export const query = graphql`
  fragment CollectionList on SanityCollectionList {
    _key
    _type
    title
    theme
    collections {
      ...Collection
    }
    actions {
      ...Button
      ...Link
    }
  }
`
