// const path = require('path')
// const { graphql } = require('gatsby')

// const createPages = (graphql, createPage) => new Promise((resolve, reject) => {
//   graphql(`
//     {
//       allSanityPage {
//         edges {
//           node {
//             id
//             content {
//               main {
//                 slug {
//                   current
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   `).then(result => {
//     if (result.errors) {
//       reject(result.errors)
//     }

//     const template = path.resolve('./src/templates/PageTemplate.jsx')

//     result.data.allContentfulPage.edges
//       .forEach(edge => {
//         let slug = edge.node.content.main.slug.current === 'home' ? '/' : '/' + page.slug,
//         createPage({
//           path: slug,
//           component: template,
//           context: {
//             id: edge.node.id
//           },
//         })
//       })

//     resolve()
//   })
// })

// module.exports = createPages
