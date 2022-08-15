const path = require('path')

const slugify = (text, separator = '-') => {
  if (!text) {
    return ''
  }
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, separator)
}

const createPages = (graphql, createPage) => new Promise((resolve, reject) => {
  graphql(`
    {
      allSanityPage {
        edges {
          node {
            id
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
    }
  `).then(result => {
    if (result.errors) {
      reject(result.errors)
    }

    const pageTemplate = path.resolve('./src/templates/PageTemplate.jsx')

    result.data.allSanityPage.edges
      .forEach(edge => {
        const slug = edge?.node?.content?.main?.slug?.current === 'home' ? '' :  edge?.node?.content?.main?.slug?.current

        let template = pageTemplate

        if (edge?.node?.content?.main?.slug?.current) {
          createPage({
            path: slug,
            component: template,
            context: {
              id: edge.node.id
            },
          })
        }
      })

    resolve()
  })
})

module.exports = createPages
