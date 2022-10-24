import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'

import SEO from 'src/components/SEO'
import Header from 'src/components/Header'
import Footer from 'src/components/Footer'

import Section from 'src/components/Section'
import { Container } from 'src/components/Grid'
import Button from 'src/components/Button'
import ScrollEntrance from 'src/components/ScrollEntrance'
import SanityRichText from 'src/components/SanityRichText'
import WideMedia from 'src/components/WideMedia'
import WallpaperGrid from 'src/components/WallpaperGrid'
import CollectionList from 'src/components/CollectionList'

import { typography, mq, globals } from 'src/styles'

const Divider = styled.hr`
  margin: 0 auto;
  width: 100%;
  max-width: 50rem;
`

const DescriptionSection = styled(Section)`
`
const AttachmentSection = styled(Section)`
`

const DescriptionContent = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 32rem;
  text-align: center;

  p:not(.large):not(.medium):not(.small):not(.tiny) {
    ${ typography.bodyMedium }
  }
  p {
    &.first-item {
      margin-top: 0;
    }
    &.last-item {
      margin-bottom: 0;
    }
  }
`

const AttachmentContent = styled.div`
  text-align: center;
`

const AttachmentTitle = styled.h2`
  ${globals.verticalSpacing('padding-bottom', 0.5)}
`

const CollectionTempate = ({ data }) => {
  const collection = data?.sanityCollection?.content?.main
  const collectionMeta = data?.sanityCollection?.content?.meta
  const path = collection?.slug?.current

  const {
    title,
    mainImage,
    _rawDescription: description,
    wallpapers,
    attachment,
    subCollections,
    relatedCollections
  } = collection

    // TODO Attachment Section

  return (
      <>
        <SEO
          pagePath={path}
          title={collection.title}
          description={collectionMeta?.metaDescription}
          keywords={collectionMeta?.keywords}
          shareImage={collectionMeta?.shareImage?.asset?.url || mainImage?.asset?.url }
        />
        <Header
          hasAtf={true}
          location={path}
        />
        <WideMedia
          media={{image: mainImage, mediaType: 'image'}}
          width="fullWidth"
          height="mediumHeight"
          overlayTextAlignment="center"
          isFirstSection={true}
          theme="transparent"
          nextTheme="default"
          text={<h1>{title}</h1>}
        />
        {description && (
          <DescriptionSection
            theme="default"
            prevTheme="transparent"
            nextTheme="default"
          >
            <Container>
              <ScrollEntrance>
                <DescriptionContent>
                  <SanityRichText text={description} />
                </DescriptionContent>
              </ScrollEntrance>
            </Container>
          </DescriptionSection>
        )}
        {(wallpapers && wallpapers.length > 0) && (
          <Divider />
        )}
        {(wallpapers && wallpapers.length > 0) && (
          <WallpaperGrid
            title="Featured Wallpapers"
            isFirstSection={false}
            isLastSection={false}
            theme="default"
            prevTheme="default"
            nextTheme="default"
            wallpapers={wallpapers}
          />
        )}

        {attachment && (
          <AttachmentSection
            isFirstSection={false}
            isLastSection={false}
            theme="default"
            prevTheme="default"
            nextTheme="default"
          >
            <Container>
              <ScrollEntrance>
                <AttachmentContent>
                  <AttachmentTitle>View the Full Scenic Florals Catalog</AttachmentTitle>
                  <Button
                    to={attachment?.asset?.url}
                    external={true}
                    target="_blank"
                  >
                    View PDF
                  </Button>
                </AttachmentContent>
              </ScrollEntrance>
            </Container>
          </AttachmentSection>
        )}

        {(subCollections && subCollections.length > 0) && (
          <CollectionList
            theme="default"
            prevTheme="default"
            nextTheme="default"
            isFirstSection={false}
            isLastSection={false}
            collections={subCollections}
          />
        )}

        {(relatedCollections && relatedCollections.length > 0) && (
          <CollectionList
            theme="default"
            prevTheme="default"
            isFirstSection={false}
            isLastSection={true}
            title="Related Collections"
            collections={relatedCollections}
            actions={[{
              _type: "button",
              type: "pageLink",
              title: "View All Collections",
              link: {
                content: { main: { slug: { current: '/collections'}}}
              },
              theme: "primary"
            }]}
          />
        )}

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