const env = process.env.NODE_ENV || 'development'

export default function resolvePreviewUrl(document) {
  const baseUrl = env === 'development' ? 'http://localhost:8000' : process.env.GATSBY_PREVIEW_URL
  let slug = document?.content?.main?.slug?.current
  if (slug === 'home') {
    slug = ''
  }
  switch (document._type) {
    case 'route':
      if (!slug && slug !== '') {
        return baseUrl
      }
      return `${baseUrl}/${slug}`
    case 'post':
      return `${baseUrl}/blog/${slug}`
    case 'siteSettings':
      return baseUrl
    case 'page':
      if (document._id === 'frontpage' || document._id === 'drafts.frontpage') {
        return baseUrl
      }
      return `${baseUrl}/${slug}`
    default:
      return null
  }
}
