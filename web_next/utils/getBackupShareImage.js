export const getBackupShareImage = sections => {
	const pageImages = []
	sections.forEach(section => {
		if (section._type === 'wideMedia') {
			const sectionImage = section?.media?.image?.asset?.url
			if (sectionImage) {
				pageImages.push(section?.media?.image?.asset?.url)
			}
		}
		if (section._type === 'fiftyFifty') {
			const sectionImage = section?.media?.image?.asset?.url
			if (sectionImage) {
				pageImages.push(section?.media?.image?.asset?.url)
			}
		}
		if (section._type === 'columns') {
			section.columns.forEach(column => {
				const sectionImage = column?.icon?.asset?.url
				if (sectionImage) {
					pageImages.push(column?.icon?.asset?.url)
				}
			})
		}
	})
	return pageImages[0]
}
