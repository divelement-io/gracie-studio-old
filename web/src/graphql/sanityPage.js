import { graphql } from 'gatsby'

export const query = graphql`
  fragment Page on SanityPage {
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
          ...CollectionList
          ...WallpaperGrid
          ...PersonList
          ...ShowroomList
          ...RepresentativeList
        }
       # instagram {
       #   items {
       #     _key
       #     asset {
       #       gatsbyImageData(layout: CONSTRAINED, width: 400, height: 400, aspectRatio: 1)
       #     }
       #     title
       #     description
       #     link {
       #       ...Link
       #     }
       #   }
       # }
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
