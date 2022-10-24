import { graphql } from 'gatsby'

export const query = graphql`
  fragment Wallpaper on SanityWallpaper {
    _type
    content {
      main {
        title
        id
        slug {
          current
        }
        width
        height
        _rawDescription(resolveReferences: {maxDepth: 10})
        atfImage {
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

        images {
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
            caption
        }
        tags {
          value
          label
        }
        panels {
          id
          image {
            asset {
              gatsbyImageData(placeholder: BLURRED)
              url
              title
              altText
              metadata {
                dimensions {
                  width
                  height
                }
              }
            }
          }
        }
        relatedWallpapers {
          content {
            main {
              id
              title
              slug {
                current
              }
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
            }
          }
          collections {
            _id
            content {
              main {
                title
              }
            }
          }
        }
        modules {
          ...TextSection
          ...WideMedia
          ...FiftyFifty
          ...TwoColumnText
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
    collections {
      _id
      content {
        main {
          title
          slug {
            current
          }
        }
      }
    }
  }
`
