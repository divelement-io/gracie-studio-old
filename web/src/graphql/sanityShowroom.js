import { graphql } from 'gatsby'

export const query = graphql`
  fragment Showroom on SanityShowroom {
    _key
    _id
    content {
      address {
        city
        state
        street
        zip
      }
      title
      image {
        asset {
          gatsbyImageData(layout: FULL_WIDTH)
          url
          title
          altText
          originalFilename
          metadata {
            dimensions {
              height
              width
            }
          }
        }
      }
      externalLink
      phoneNumber
      salesContacts {
        email
        firstName
        lastName
        _key
      }
      title
    }
  }
`
