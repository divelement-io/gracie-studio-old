import { graphql } from 'gatsby'

export const query = graphql`
  fragment Link on SanityLink {
    _key
    _type
    title
    externalLink
    newTab
    type
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
    }
  }
`
