import React from 'react'
import { graphql } from 'gatsby'
import SEO from 'src/components/SEO'
import Header from 'src/components/Header'
import Footer from 'src/components/Footer'

const WallpaperTempate = ({ data }) => {

	return (
    <>
      <SEO
        pagePath={path}
        title={page.title}
        description={pageMeta?.metaDescription}
        keywords={pageMeta?.keywords}
        shareImage={pageMeta?.shareImage?.asset?.url || getBackupShareImage(modules)}
      />
      <Header
        hasAtf={hasAtf}
        // bannerText={site.bannerText}
        // bannerColor={site.bannerColor}
        location={path}
      />
      <Footer />
    </>
  )
}

export const wallpaperQuery = graphql`
  query ($id: String!) {
    sanityWallpaper(id: { eq: $id }) {
      ...Wallpaper
    }
  }
`

export default WallpaperTempate