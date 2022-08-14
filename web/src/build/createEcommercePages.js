// const queries = require('../api/queries');
// const sanity = require('../api/sanity');

// //
// // === Get Data ===
// //

// module.exports.getAllPageData = () => {
//   // Fetch all data needs
//   const globalQuery = sanity.fetch(queries.global);
//   const productsQuery = sanity.fetch(queries.products)
//   const collectionQuery = sanity.fetch(queries.collections);

//   // Wait for all data needs
//   return Promise.all([
//     productsQuery,
//     collectionQuery,
//     globalQuery
//   ]);
// };

// //
// // === Create All Pages ===
// //

// module.exports.createAllPages = (
//   promiseResults,
//   actions,
//   resolve,
//   reject
// ) => {
//   const [
//     pages,
//     global,
//     // products,
//     // collections,
//   ] = promiseResults;

//   //
//   // === Create Contexts ===
//   //
//   const sharedContext = {
//     // menus,    Addd this pattern
//     // siteGlobal
//     site: global
//   };

//   //
//   // === Create pages ===
//   //

//   try {

//     // Collections
//     collections && collections.forEach(collection => {
//       actions.createPage({
//         path: `/collections/${collection.slug}`,
//         component: require.resolve('../templates/ecommerce/collection.jsx'),
//         context: {
//           ...sharedContext,
//           ...collection
//         }
//       })
//     })

//     // Products
//     products && products.forEach(product => {
//       actions.createPage({
//         path: `/products/${product.slug}`,
//         component: require.resolve('../templates/ecommerce/product.jsx'),
//         context: {
//           ...sharedContext,
//           ...product,
//         }
//       });
//     });

//     // Accounts
//     actions.createPage({
//       path: '/account',
//       matchPath: '/account',
//       component: require.resolve('../templates/ecommerce/account.jsx'),
//       context: {
//         layout: 'account',
//         ...sharedContext
//       },
//     })

//     actions.createPage({
//       path: '/account',
//       matchPath: '/account/*',
//       component: require.resolve('../templates/ecommerce/account.jsx'),
//       context: {
//         layout: 'account',
//         ...sharedContext
//       },
//     })

//     actions.createRedirect({
//       fromPath: '/account*',
//       toPath: '/account',
//       statusCode: 200,
//     })

//     actions.createRedirect({
//       fromPath: '/:accountId/orders/:orderId/authenticate key=:key',
//       toPath:
//         'https://shop.allkinds.com/:accountId/orders/:orderId/authenticate?key=:key',
//       isPermanent: true,
//       statusCode: 301,
//     })
//   } catch(error) {
//     reject(error);
//     return;
//   }

//   resolve();
// };
