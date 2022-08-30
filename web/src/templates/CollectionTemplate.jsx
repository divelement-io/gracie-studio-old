import React from 'react'
import { graphql } from 'gatsby'
import SEO from 'src/components/SEO'
import Header from 'src/components/Header'
import Footer from 'src/components/Footer'

const CollectionTempate = ({ data }) => {

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

export const collectionQuery = graphql`
  query ($id: String!) {
    sanityCollection(id: { eq: $id }) {
      ...Collection
    }
  }
`


export default CollectionTempate