export default `
	"alt": coalesce(alt, asset->altText),
	asset,
	crop,
	customRatio,
	clipPath,
	hotspot,
	"id": asset->assetId,
	"type": asset->mimeType,
	"aspectRatio": asset->metadata.dimensions.aspectRatio,
	"lqip": asset->metadata.lqip
`