import groq from 'groq'
import client, { pageQuery } from 'client'
import Header from 'components/Header'
import Footer from 'components/Footer'
import ComponentRenderer from 'components/ComponentRenderer'

const Index = ({
  page
}) => {
  if (!page) {
    return false
  }
  const { title, slug, modules } = page
  const hasAtf = modules[0]?._type === 'wideMedia' && modules[0]?.width === 'fullWidth'
  return (
    <>
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

export async function getStaticProps(context) {
  const page = await client.fetch(pageQuery, { slug: 'home' })
  return {
    props: {
      page
    }
  }
}

export default Index