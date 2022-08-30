import { graphql } from 'gatsby'

export const query = graphql`
  fragment Collection on SanityCollection {
    _type
    content {
      main {
        title
        slug {
          current
        }
        _rawDescription(resolveReferences: {maxDepth: 10})
        mainImage {
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
        attachment {
          filename
          asset {
            url
            _createdAt
            _updatedAt
          }
        }
        wallpapers {
          ...Wallpaper
        }
        subCollections {
          content {
            main {
              slug {
                current
              }
            }
          }
        }

      }
      meta {
        metaDescription
        keywords
        shareImage {
          asset {
            url
          }
        }
      }
    }
  }
`
