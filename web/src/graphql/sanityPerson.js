import { graphql } from 'gatsby'

export const query = graphql`
fragment Person on SanityPerson {
  _id
  _key
  _type
  content {
    firstName
    generation
    lastName
    location
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
  }
}
`