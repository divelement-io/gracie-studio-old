import { graphql } from 'gatsby'

export const query = graphql`
  fragment Media on SanityMedia {
    mediaType
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
      hotspot {
        width
        height
        x
        y
      }
      crop {
        top
        bottom
        left
        right
      }
    }
    video {
      asset {
        title
        url
      }
    }
    # altText
  }
`
