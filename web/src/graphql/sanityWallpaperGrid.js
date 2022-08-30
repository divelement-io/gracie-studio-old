import { graphql } from 'gatsby'

export const query = graphql`
  fragment WallpaperGrid on SanityWallpaperGrid {
    _key
    _type
  }
`
