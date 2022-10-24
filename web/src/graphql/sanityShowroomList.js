import { graphql } from 'gatsby'

export const query = graphql`
  fragment ShowroomList on SanityShowroomList {
    _key
    _type
    theme
    eyebrow
    title
    showrooms {
      ...Showroom
    }
  }
`
