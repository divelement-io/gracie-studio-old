import { useState } from 'react'
import styled from '@emotion/styled'
import NextImage from 'next/image'
import { buildSrc } from 'utils/imageHelpers'

const StyledImage = styled(NextImage)``

const Image = ({
  className,
  alt,
  src,
  image,
  width,
  height,
  layout = 'responsive',
  objectFit = 'cover',
  lazyBoundary = '0px',
  quality = 90,
  sizes,
  ...props
}) => {
  // state of our image load (used for animation purposes)
  const [isLoaded, setIsLoaded] = useState(false)

  if (!src && !image) return null

  if (image && !src) {
    src = image
  }

  // warn if there's no alt text provided
  if (!alt && !src?.alt) console.warn('Image missing alt text: ', src)

  const isStatic = typeof src === 'string' ? true : false

  // calculate our image aspect ratio
  const imgAspectRatio =
    typeof width === 'number' && typeof height === 'number'
      ? (height / width) * 100
      : !isStatic
      ? 100 / (src?.customRatio || src?.aspectRatio)
      : null

  // calculate our image dimensions (if not "fill" layout)
  const imgWidth = layout !== 'fill' ? width ?? 2000 : null
  const imgHeight =
    layout !== 'fill'
      ? height ?? imgAspectRatio
        ? Math.round(imgWidth * imgAspectRatio) / 100
        : null
      : null

  // build our image URL
  const imgUrl = isStatic
    ? src
    : buildSrc(src, { width: imgWidth, height: imgHeight, quality })

  // calculate our image alt text
  const imgAlt = alt ?? src?.alt

  // define our loader to use
  const loader = !isStatic
    ? {
        loader: ({ width }) => {
          return (
            buildSrc(src, {
              width,
              height: Math.round(width * imgAspectRatio) / 100,
              quality,
            }) + `&width=${width}`
          )
        },
      }
    : {}

  return (
  	<StyledImage
      //
      className={className}
      alt={imgAlt}
      src={imgUrl}
      width={imgWidth}
      height={imgHeight}
      layout={layout}
      objectFit={objectFit}
      lazyBoundary={lazyBoundary}
      onLoadingComplete={() => setIsLoaded(true)}
      {...loader}
      {...props}
  	/>
  )
}

export default Image
