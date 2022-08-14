import React from 'react'
import styled from '@emotion/styled'
import Image from 'components/Image'
import Video from 'components/Video'

const MediaVideo = styled(Video)`
  ${ ({ ratio }) => ratio ? `
    position: relative;
    > div > div {
      height: 100%;
      padding-bottom: ${ ratio * 100 }%;
    }
    video {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      object-fit: cover;
    }
  ` : '' }
`
const MediaImage = styled(Image)`
  ${ ({ ratio }) => ratio ? `
    > div:first-of-type {
      padding-top: ${ ratio * 100 }% !important;
    }
  ` : '' }
`

const Media = ({
  className,
  media,
  altText,
  loading,
  ratio,
  sizes,
  debug
}) => {
  const image = media?.image
  const video = media?.video?.asset

  if (!image && !video) {
    return false
  }

  if (media.mediaType === 'video' && video?._ref) {
    return (
      <MediaVideo
        className={className}
        video={video}
        ratio={ratio}
      />
    )
  } else if (media.mediaType === 'image') {
    return (
      <MediaImage
        className={className}
        image={image}
        loading={loading || 'lazy'}
        alt={altText}
        sizes={sizes}
        ratio={ratio}
        format={['auto', 'avif', 'webp']}
      />
    )
  } else {
    return false
  }
}

export default Media
