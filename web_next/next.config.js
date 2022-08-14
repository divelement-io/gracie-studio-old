const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: ['@svgr/webpack'],
		})
		config.module.rules.push({
			test: /\.(png|gif|woff|woff2|eot|ttf)$/,
			loader: 'url-loader',
		})
		config.module.rules.push({
			test: /\.(png|gif|jpg|jpeg)$/,
			loader: 'file-loader',
		})
		return config
	},
	images: {
		domains: ['cdn.shopify.com'],
	},
	experimental: {
		esmExternals: false
	}
})
