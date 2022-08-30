const path = require('path')


const createPages = (graphql, createPage) => new Promise((resolve, reject) => {
  graphql(`
    {
      allSanityCollection {
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

    const collectionTemplate = path.resolve('./src/templates/CollectionTemplate.jsx')

    result.data.allSanityCollection.edges
      .forEach(edge => {
        const slug = edge?.node?.content?.main?.slug?.current

        if (slug) {
          createPage({
            path: `collection/${slug}`,
            component: collectionTemplate,
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
