import React from 'react'
import styled from '@emotion/styled'
import Image from 'src/components/Image'
import Video from 'src/components/Video'

const MediaVideo = styled(Video)`
  ${ ({ ratio, rounded }) => ratio ? `
    position: relative;
    > div > div {
      height: 100%;
      padding-top: ${ ratio * 100 }%;
      ${ rounded ? `
        overflow: hidden;
        border-radius: var(--card-border-radius);
      ` : '' }
    }
    video {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      object-fit: cover;
      display: block;
    }
  ` : '' }
`
const MediaImage = styled(Image)`
  ${ ({ ratio }) => ratio ? `
    > div:first-of-type {
      padding-top: ${ ratio * 100 }% !important;
    }
    img {
      display: block;
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
  rounded,
  ...rest
}) => {
  const image = media?.image?.asset
  const video = media?.video?.asset

  if (!image && !video) {
    return false
  }

  if (media.mediaType === 'video') {
    return (
      <MediaVideo
        src={video?.url}
        ratio={ratio}
        rounded={true}
        className={className}
        {...rest}
      />
    )
  } else if (media.mediaType === 'image') {
    return (
      <MediaImage
        {...rest}
        image={image.gatsbyImageData}
        width={media.image?.asset?.metadata?.dimensions?.width}
        height={media.image?.asset?.metadata?.dimensions?.height}
        hotspot={media?.image?.hotspot}
        crop={media?.image?.crop}
        loading={loading || 'lazy'}
        alt={altText}
        sizes={sizes}
        ratio={ratio}
        format={['auto', 'avif', 'webp']}
        rounded={rounded}
        className={className}
      />
    )
  } else {
    return false
  }
}

export default Media
