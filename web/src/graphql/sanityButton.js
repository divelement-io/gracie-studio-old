import { graphql } from 'gatsby'

export const query = graphql`
  fragment Button on SanityButton {
    _key
    _type
    title
    theme
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
