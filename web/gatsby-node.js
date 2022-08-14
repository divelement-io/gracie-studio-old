/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const createContentfulPages = require('./page-creators/pages')
// Implement the Gatsby API “createPages”. This is
// called after the Gatsby bootstrap is finished so you have
// access to any information necessary to programmatically
// create pages.
exports.createPages = ({ graphql, actions }) => {
	const { createPage } = actions
	return Promise.all(
		[
			createContentfulPages
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
