const path = require('path')

const createPages = (graphql, createPage) => new Promise((resolve, reject) => {
  graphql(`
    {
      allSanityWallpaper {
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

    const wallpaperTemplate = path.resolve('./src/templates/WallpaperTemplate.jsx')

    result.data.allSanityWallpaper.edges
      .forEach(edge => {
        const slug = edge?.node?.content?.main?.slug?.current

        if (slug) {
          createPage({
            path: `wallpaper${slug.startsWith('/') ? '' : '/'}${slug}`,
            component: wallpaperTemplate,
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
