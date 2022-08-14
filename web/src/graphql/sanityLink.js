import { graphql } from 'gatsby'

export const query = graphql`
  fragment Link on SanityLink {
    _key
    _type
    title
    externalLink
    newTab
    type
    postLink {
      publishedAt
      slug {
        current
      }
    }
    file {
      asset {
        url
      }
    }
    link {
      ... on SanityPage {
        content {
          main {
            slug {
              current
            }
          }
        }
      }
      ... on SanityLowerSchool {
        _type
        school {
          title
        }
      }
      ... on SanityMiddleSchool {
        _type
        school {
          title
        }
      }
      ... on SanityUpperSchool {
        _type
        school {
          title
        }
      }
    }
  }
`
