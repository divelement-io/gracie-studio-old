export const slugify = (text, separator = '-') => {
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

export const getSlugLink = (link, prefix) => {
	const currentLink = link
	if (currentLink && prefix) {
		return '/' + prefix + '/' + currentLink
	} else if (currentLink === 'home') {
		return '/'
	} else if (currentLink) {
		return '/' + currentLink
	}
	return '/'
}

export const blocksToText = (blocks, opts = {}) => {
	const defaults = { nonTextBehavior: 'remove' }
  const options = Object.assign({}, defaults, opts)
  return blocks.map(block => {
    if (block._type !== 'block' || !block.children) {
      return options.nonTextBehavior === 'remove' ? '' : `[${ block._type } block]`
    }
    return block.children.map(child => child.text).join('')
  })
  .join('\n\n')
}

export const truncate = (text, limit, append) => {
  if (typeof text !== 'string') {
    return ''
  }
  if (typeof append === 'undefined') {
    append = '...'
  }
  const parts = text.split(' ')
  if (parts.length > limit) {
    // loop backward through the string
    for (let i = parts.length - 1; i > -1; --i) {
      // if i is over limit, drop this word from the array
      if (i + 1 > limit) {
          parts.length = i
      }
    }
  }
  // join the array back into a string
  return parts.join(' ') + append
}

export const getSanityLink = item => {
  const linkSlug = item?.link?.content?.main?.slug?.current
  const pageParent = item?.link?.content?.main?.parentPage?.content?.main?.slug?.current
  let renderedLink = getSlugLink(linkSlug, pageParent)
  if (item?.type === 'externalLink') {
    renderedLink = item.externalLink
  } else if (item?.type === 'postLink') {
    const dateSlug = item.postLink.publishedAt.replaceAll('-', '/')
    renderedLink = getSlugLink(item?.postLink?.slug?.current, dateSlug)
  } else if (item?.type === 'fileLink') {
    renderedLink = item?.file?.asset?.url
  } else if (!linkSlug && item?.link?.school?.title) {
    const schoolTypes = {
      upperSchool: 'high-schools/',
      middleSchool: 'middle-schools/',
      lowerSchool: 'upper-schools/'
    }
    // renderedLink = 'test'
    renderedLink = '/' + schoolTypes[item.link._type] + slugify(item?.link?.school?.title)
  }
  return renderedLink
}
