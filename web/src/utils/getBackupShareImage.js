export const getBackupShareImage = (sections, imageObject = false) => {
	const pageImages = []
	sections.forEach(section => {
		if (section?._type === 'wideMedia') {
			const sectionImage = section?.media?.image?.asset
			if (sectionImage) {
				pageImages.push(sectionImage)
			}
		}
		if (section?._type === 'fiftyFifty') {
			const sectionImage = section?.media?.image?.asset
			if (sectionImage) {
				pageImages.push(sectionImage)
			}
		}
		if (section?._type === 'columns') {
			section.columns.forEach(column => {
				const sectionImage = column?.icon?.asset
				if (sectionImage) {
					pageImages.push(sectionImage)
				}
			})
		}
	})
	if (imageObject) {
		return pageImages[0]?.gatsbyImageData
	} else {
		return pageImages[0]?.url
	}
}
