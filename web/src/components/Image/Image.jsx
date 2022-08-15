import React, { useEffect } from 'react'
import styled from '@emotion/styled'
import { GatsbyImage } from 'gatsby-plugin-image'

const StyledImage = styled(GatsbyImage)`
  width: 100%;
  ${ ({ ratio }) => ratio ? `
    > div:first-of-type {
      padding-top: ${ ratio * 100 }% !important;
    }
    img {
      display: block;
    }
  ` : '' }
	img {
    ${ ({ hotspot }) => hotspot ? `
    	object-position: ${ hotspot.x * 100 + '%' } ${ hotspot.y * 100 + '%' };
    ` : '' }
  }
`

const Image = ({
  ratio,
  sizes,
  className,
  loading,
  alt,
  width,
  height,
  hotspot,
  crop,
  aspectRatio,
  image,
  ...rest
}) => {
  const croppedWidth = image?.width * (1 - crop?.left - crop?.right)
  const croppedHeight = image?.height * (1 - crop?.top - crop?.bottom)
  const croppedRatio = croppedHeight / croppedWidth

  const rectTop = Math.round(crop?.top * height)
  const rectLeft = Math.round(crop?.left * width)
  const rectBottom = crop?.bottom * height
  const rectRight = crop?.right * width
  const rectWidth = Math.round(width - rectLeft - rectRight)
  const rectHeight = Math.round(height - rectTop - rectBottom)
  const rect = rectLeft + ',' + rectTop + ',' + rectWidth + ',' + rectHeight

  useEffect(() => {
    if (width && height && crop) {
      const { src, srcSet } = image.images.fallback
      const rectReg = /rect=.*,\d{1,5}/g

      // Change src to use crop
      if (image.images.fallback.src.match(rectReg)) {
        image.images.fallback.src = src.replaceAll(rectReg, ('&rect=' + rect))
      } else {
        image.images.fallback.src = src + '&rect=' + rect
      }

      // Change srcSet to use crop
      if (image.images.fallback.srcSet.match(rectReg)) {
        image.images.fallback.srcSet = srcSet.replaceAll(rectReg, ('rect=' + rect))
      } else {
        image.images.fallback.srcSet = srcSet.replaceAll('&auto=format', ('&auto=format&rect=' + rect))
      }
    }
  }, [])

  return (
    <StyledImage
      {...rest}
      image={image}
      ratio={ratio || croppedRatio}
      crop={crop}
      hotspot={hotspot}
      sizes={sizes}
      className={className}
      loading={loading}
      alt={alt}
      format={['auto', 'avif', 'webp']}
    />
  )
}

export default Image
