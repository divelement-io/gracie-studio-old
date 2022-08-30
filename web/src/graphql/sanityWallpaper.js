import { graphql } from 'gatsby'

export const query = graphql`
  fragment Wallpaper on SanityWallpaper {
    _type
    content {
      main {
        title
        slug {
          current
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
  }
`
