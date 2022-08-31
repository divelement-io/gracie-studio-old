import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import SEO from 'src/components/SEO'
import Header from 'src/components/Header'
import Footer from 'src/components/Footer'

import Section from 'src/components/Section'
import Grid, { Container } from 'src/components/Grid'
import TextLockup from 'src/components/TextLockup'
import Button from 'src/components/Button'

import WideMedia from 'src/components/WideMedia'
import WallpaperGrid from 'src/components/WallpaperGrid'
import CollectionList from 'src/components/CollectionList'

const CollectionTempate = ({ data }) => {
  console.log(data)

  const collection = data?.sanityCollection?.content?.main
  const collectionMeta = data?.sanityCollection?.content?.meta
  const path = collection?.slug?.current

  const { title, mainImage } = collection

  return (
      <>
        <SEO
          pagePath={path}
          title={collection.title}
          description={collectionMeta?.metaDescription}
          keywords={collectionMeta?.keywords}
          shareImage={collectionMeta?.shareImage?.asset?.url || mainImage.asset.url }
        />
        <Header
          hasAtf={true}
          // bannerText={site.bannerText}
          // bannerColor={site.bannerColor}
          location={path}
        />
        <WideMedia
          media={{image: mainImage, mediaType: 'image'}}
          width="fullWidth"
          height="mediumHeight"
          overlayTextAlignment="center"
          isFirstSection={true}
          text={<h1>{title}</h1>}
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