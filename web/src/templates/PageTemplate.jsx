import React from 'react'
import { graphql } from 'gatsby'
import SEO from 'src/components/SEO'
import Header from 'src/components/Header'
import Footer from 'src/components/Footer'
// import InstagramLinks from 'src/components/InstagramLinks'
import ComponentRenderer from 'src/components/ComponentRenderer'
import { getBackupShareImage } from 'src/utils/getBackupShareImage'

const Page = ({ data }) => {
  const page = data?.sanityPage?.content?.main
  const pageMeta = data?.sanityPage?.content?.meta
  const path = page?.slug?.current
  let modules = page?.modules
    // Filter out hidden modules
    modules = modules?.filter(module => !module?.hidden)
  const hasAtf = (modules[0]?._type === 'wideMedia' && modules[0]?.width === 'fullWidth') || modules[0]?.theme === 'navy'

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

      {modules.map((item, index) => {
        const prevSection = modules[index - 1]
        const nextSection = modules[index + 1]
        let prevTheme = false
        let nextTheme = false
        if (prevSection?.type === 'individual') {
          prevSection.width = 'fullWidth'
        }
        if (prevSection && prevSection.width !== 'fullWidth') {
          prevTheme = prevSection.theme || 'default'
        }
        if (nextSection && nextSection.width !== 'fullWidth') {
          nextTheme = nextSection.theme || 'default'
        }
        if (!item.theme && item.width !== 'fullWidth') {
          item.theme = 'default'
        }
        if (item._type === 'reviews' && item.type !== 'columns') {
          item.setTheme = item.theme
          item.theme = false
        }
        if (nextSection && nextSection?._type === 'reviews' && nextSection?.type !== 'columns') {
          nextSection.setTheme = nextSection.theme
          nextTheme = false
        }
        if (prevSection && prevSection?._type === 'reviews' && prevSection?.type !== 'columns') {
          prevSection.setTheme = prevSection.theme
          prevTheme = false
        }
        return (
          <ComponentRenderer
            item={item}
            key={item?._key || 'section-' + index}
            nextTheme={nextTheme}
            prevTheme={prevTheme}
            isFirstSection={index === 0}
            isLastSection={index === modules.length - 1}
          />
        )
      })}
      {/* RenderModules(modules) */}
      <Footer />
    </>
  )
}

export const pageQuery = graphql`
  query ($id: String!) {
    sanityPage(id: { eq: $id }) {
      ...Page
    }
  }
`

export default Page
