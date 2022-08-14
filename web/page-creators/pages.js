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
                type
                slug {
                  current
                }
              }
            }
          }
        }
      }
      allSanityLowerSchool {
        edges {
          node {
            id
            school {
              title
            }
          }
        }
      }
      allSanityMiddleSchool {
        edges {
          node {
            id
            school {
              title
            }
          }
        }
      }
      allSanityUpperSchool {
        edges {
          node {
            id
            school {
              title
            }
          }
        }
      }
      allSanityPost {
        edges {
          node {
            id
            publishedAt
            slug {
              current
            }
          }
        }
      }
      allSanityCategory {
        edges {
          node {
            _key
            id
            title
            description
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      reject(result.errors)
    }

    const pageTemplate = path.resolve('./src/templates/PageTemplate.jsx')
    const postTemplate = path.resolve('./src/templates/PostTemplate.jsx')
    // School Templates
    const lowerSchoolTemplate = path.resolve('./src/templates/LowerSchoolTemplate.jsx')
    const middleSchoolTemplate = path.resolve('./src/templates/MiddleSchoolTemplate.jsx')
    const upperSchoolTemplate = path.resolve('./src/templates/UpperSchoolTemplate.jsx')
    // Blog Templates
    const blogTemplate = path.resolve('./src/templates/BlogTemplate.jsx')
    const categoryTemplate = path.resolve('./src/templates/CategoryTemplate.jsx')

    result.data.allSanityPage.edges
      .forEach(edge => {
        const slug = edge?.node?.content?.main?.slug?.current === 'home' ? '/' : '/' + edge?.node?.content?.main?.slug?.current

        let template = pageTemplate
        if (edge?.node?.content?.main?.type === 'blog') {
          template = blogTemplate
        }
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

    result.data.allSanityLowerSchool.edges
      .forEach(edge => {
        const slug = '/lower-schools/' + slugify(edge?.node?.school?.title)
        if (edge?.node?.school?.title) {
          createPage({
            path: slug,
            component: lowerSchoolTemplate,
            context: {
              id: edge.node.id
            },
          })
        }
      })

    result.data.allSanityMiddleSchool.edges
      .forEach(edge => {
        const slug = '/middle-schools/' + slugify(edge?.node?.school?.title)
        if (edge?.node?.school?.title) {
          createPage({
            path: slug,
            component: middleSchoolTemplate,
            context: {
              id: edge.node.id
            },
          })
        }
      })

    result.data.allSanityUpperSchool.edges
      .forEach(edge => {
        const slug = '/high-schools/' + slugify(edge?.node?.school?.title)
        if (edge?.node?.school?.title) {
          createPage({
            path: slug,
            component: upperSchoolTemplate,
            context: {
              id: edge.node.id
            },
          })
        }
      })

    result.data.allSanityPost.edges
      .forEach(edge => {
        const dateSlug = edge.node.publishedAt.replaceAll('-', '/')
        const titleSlug = edge?.node?.slug?.current
        const slug = '/' + dateSlug + '/' + titleSlug
        if (dateSlug && titleSlug) {
          createPage({
            path: slug,
            component: postTemplate,
            context: {
              id: edge.node.id
            },
          })
        }
      })

    result.data.allSanityCategory.edges
      .forEach(edge => {
        const catSlug = slugify(edge.node.title)
        const slug = '/blog/categories/' + catSlug
        if (catSlug) {
          createPage({
            path: slug,
            component: categoryTemplate,
            context: {
              id: edge.node.id,
              title: edge.node.id,
            },
          })
        }
      })

    resolve()
  })
})

module.exports = createPages
