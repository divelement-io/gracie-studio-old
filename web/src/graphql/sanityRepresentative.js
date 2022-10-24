import { graphql } from 'gatsby'

export const query = graphql`
fragment Representative on SanityRepresentative {
  name
  city
  address {
    street
    city
    state
  }
  phoneNumber
  faxNumber
}
`