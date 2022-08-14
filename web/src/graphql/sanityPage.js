import { graphql } from 'gatsby'

export const query = graphql`
  fragment Page on SanityPage {
    content {
      main {
        title
        slug {
          current
        }
        type
        _rawTopArea(resolveReferences: {maxDepth: 10})
        modules {
          ...TextSection
          ...WideMedia
          ...FiftyFifty
          ...Columns
          ...TwoColumnText
          ...TeamGrid
          ...BlogArticles
          ...Reviews
          ...SchoolStats
          ...Slideshow
          ...SchoolList
          ...Juxtaposition
          ...Splitter
          # plopAddModules
					...AccordionSection
					...Curriculum
          ...SchoolsMap
          ...Programs
        }
        instagram {
          items {
            _key
            asset {
              gatsbyImageData(layout: CONSTRAINED, width: 400, height: 400, aspectRatio: 1)
            }
            title
            description
            link {
              ...Link
            }
          }
        }
        videoPage {
          ...VideoPage
        }
        pressItems {
          _key
          image {
            asset {
              gatsbyImageData(layout: FULL_WIDTH)
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
