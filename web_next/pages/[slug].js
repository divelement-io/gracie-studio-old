import groq from 'groq'
import client, { pageQuery } from 'client'
import SEO from 'components/SEO'
import Header from 'components/Header'
import Footer from 'components/Footer'
import ComponentRenderer from 'components/ComponentRenderer'

const Page = ({
  page
}) => {
  if (!page) {
    return false
  }
  const { title, slug, modules } = page
  const hasAtf = modules[0]?._type === 'wideMedia' && modules[0]?.width === 'fullWidth'
  
  const pageMeta = page.meta

  return (
    <>
      <SEO
        pagePath={page.slug}
        title={page.title}
        // description={pageMeta?.metaDescription}
        // keywords={pageMeta?.keywords}
        // ogTitle={page.title}
        // ogImage={pageMeta?.shareImage?.asset?.url || getBackupShareImage(modules)}
        // ogDescription={pageMeta?.metaDescription}
        // twitterDescription={pageMeta?.metaDescription}
        // twitterImage={pageMeta?.shareImage?.asset?.url || getBackupShareImage(modules)}
        // twitterTitle={page.title}
      />
      <Header location={slug} hasAtf={hasAtf} />
      {modules?.map((item, index) => {
        const prevSection = modules[index - 1]
        const nextSection = modules[index + 1]
        let prevTheme = false
        let nextTheme = false
        if (prevSection && prevSection.width !== 'fullWidth') {
          prevTheme = prevSection.theme || 'default'
        }
        if (nextSection && nextSection.width !== 'fullWidth') {
          nextTheme = nextSection.theme || 'default'
        }
        if (!item.theme && item.width !== 'fullWidth') {
          item.theme = 'default'
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
      <Footer/>
    </>
  )
}

export async function getStaticPaths() {
  // Set Paths and Filter out homepage
  const paths = await client.fetch(
    groq`*[_type == "page" && defined(content.main.slug.current) && content.main.slug.current != 'home'][].content.main.slug.current`
  )

  return {
    paths: paths.map((slug) => ({params: {slug}})),
    fallback: true,
  }
}

export async function getStaticProps(context) {
  const { slug = "" } = context.params
  const page = await client.fetch(pageQuery, { slug })
  return {
    props: {
      page
    }
  }
}

export default Page