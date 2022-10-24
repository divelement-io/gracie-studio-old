/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const createPages = require('./page-creators/pages')
const createCollectionPages = require('./page-creators/collections')
const createWallpaperPages = require('./page-creators/wallpapers')
const createArticlePages = require('./page-creators/articles')
// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
exports.createPages = ({ graphql, actions }) => {
	const { createPage } = actions
	return Promise.all(
		[
			createPages,
			createCollectionPages,
			createWallpaperPages,
			createArticlePages
		].map(fn => fn(graphql, createPage))
	)
}

exports.onCreateWebpackConfig = ({ actions, stage }) => {
	if (stage === 'build-html') {
		actions.setWebpackConfig({
			resolve: {
				alias: {
					path: require.resolve('path-browserify')
				},
				fallback: {
					fs: false,
				}
			},
			module: {
				rules: [
					{
						test: /whatwg-fetch/,
						use: ['null-loader']
					},
				],
			}
		})
	}
}

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    SanityWallpaper: {
      collections: {
        type: ["SanityCollection"],
        resolve: async (source, args, context, info) => {
          const { entries } = await context.nodeModel.findAll({ type: `SanityCollection` })
          return entries?.filter((collection) => collection?.content?.main?.wallpapers?.some(({_ref}) => _ref === source.id))
        },
      },
    },
  }
  createResolvers(resolvers)
}