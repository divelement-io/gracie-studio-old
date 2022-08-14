import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import Section from 'components/Section'
import Grid from 'components/Grid'
import Video from 'components/Video'
import Media from 'components/Media'
import TextLockup from 'components/TextLockup'
import ScrollEntrance from 'components/ScrollEntrance'
import { mq, globals } from 'styles'

const FFSection = styled(Section)`
  ${ mq.largeAndBelow } {
    ${ globals.verticalSpacing('padding-bottom') }
  }
`

const ColumnWrapper = styled.div`
  ${ ({ fullWidth }) => fullWidth && `
    height: 100%;
    // get to work for video also
    > div,
    .gatsby-image-wrapper,
    .video-wrapper,
    .video-wrapper > div,
    .video-wrapper > div > div {
      height: 100%;
    }
    .video-wrapper > div > div {
      padding-bottom: ${ 9 / 16 * 100 }%;
    }
    .video-wrapper video {
      position: absolute;
      object-fit: cover;
    }
  ` }
  h1, h2, h3 {
    max-width: 20em;
  }
  h4, h5 {
    max-width: 26em;
  }
  h6 {
    max-width: 16em;
  }
  p {
    max-width: 40em;
  }
`

const TextWrapper = styled.div`
  ${ ({ fullWidth }) => fullWidth && `
    ${ mq.largerAndUp } {
      ${ globals.verticalSpacing('padding-top') }
      ${ globals.verticalSpacing('padding-bottom') }
    }
  ` }
`

const arrangeMedia = {
  default: {
    normal: '[11] 2 [11]',
    large: '[12] 2 [10]',
    extraLarge: '[13] 2 [9]'
  },
  fullWidth: {
    normal: '[13] 2 [11] 2',
    large: '[14] 2 [10] 2',
    extraLarge: '[15] 2 [9] 2'
  }
}

const mediaSizes = {
  default: {
    normal: 100 / 28 * 11,
    large: 100 / 28 * 12,
    extraLarge: 100 / 28 * 13
  },
  fullWidth: {
    normal: 100 / 28 * 13,
    large: 100 / 28 * 14,
    extraLarge: 100 / 28 * 15
  }
}

const FiftyFifty = ({
  className,
  theme,
  prevTheme,
  nextTheme,
  media,
  mediaPlacement = 'left',
  mediaWidth = 'normal',
  width = 'default',
  eyebrow,
  text,
  actions,
  verticalAlignment = 'center',
  textAlignment = 'left',
  isFirstSection,
  listType,
  id
}) => {
  const image = media?.image?.asset
  const video = media?.video?.asset

  if (!image && !video) {
    return false
  }

  // set responsive image sizes
  let sizes = '100vw'
  const imageSize = mediaSizes.default[mediaWidth]
  sizes = '(min-width: ' + mq.mediumBreakpoint + 'px) ' + imageSize + 'vw, 86vw'

  const fullWidth = width === 'fullWidth'
  return (
    <FFSection
      className={className}
      setTheme={theme}
      prevTheme={prevTheme}
      nextTheme={nextTheme}
      isFirstSection={isFirstSection}
      padded={!fullWidth}
      id={id}
    >
      <Grid
        small={fullWidth ? '[1]' : 'container'}
        medium={fullWidth ? '[1]' : 'container'}
        large={fullWidth ? '[1]' : 'container'}
        larger={fullWidth ? '[1]' : 'container'}
      >
        <Grid
          small='[1]'
          large={arrangeMedia[width || 'default'][mediaWidth || 'normal']}
          rowGap={['6vw', '4vw', '80px']}
          colGap='var(--site-gutters)'
          vAlign={verticalAlignment}
          gridDirection={mediaPlacement?.includes('right') ? 'rtl' : 'ltr'}
        >
          {media && (
            <ColumnWrapper fullWidth={fullWidth}>
              <ScrollEntrance>
                <Media
                  media={media}
                  loading={isFirstSection ? 'eager' : 'lazy'}
                  alt={text?.eyebrow || media.originalFilename}
                  sizes={sizes}
                  css={css`position: relative; z-index: 1;`}
                />
              </ScrollEntrance>
            </ColumnWrapper>
          )}

          <ColumnWrapper fullWidth={fullWidth}>
            <Grid
              small={fullWidth ? 'container' : '[1]'}
              medium={fullWidth ? 'container' : '[1]'}
              large='[1]'
            >
              <TextWrapper fullWidth={fullWidth}>
                <TextLockup
                  entranceDelay={1}
                  eyebrow={text.eyebrow}
                  text={text.text}
                  actions={actions}
                  theme={theme}
                  listType={listType}
                  alignment={textAlignment}
                />
              </TextWrapper>
            </Grid>
          </ColumnWrapper>
        </Grid>
      </Grid>
    </FFSection>
  )
}

FiftyFifty.defaultProps = {
  mediaWidth: 'normal',
  mediaPlacement: 'left'
}

FiftyFifty.propTypes = {
  /** One of the themes specified in `styles/themes.js` */
  theme: PropTypes.string,
  /** Can be an image or video from Contentful */
  media: PropTypes.string,
  /** Where should the media be placed? */
  mediaPlacement: PropTypes.oneOf(['left', 'right']),
  /** How wide should the media be? */
  mediaWidth: PropTypes.oneOf(['normal', 'large', 'extraLarge']),
  width: PropTypes.oneOf(['default', 'fullWidth']),
  /** Array of Buttons or Links */
  actions: PropTypes.array,
  verticalAlignment: PropTypes.oneOf(['bottom', 'top', 'center', 'baseline', 'stretch']),
  /** Should we adjust the space to accomidate the header? */
  isFirstSection: PropTypes.bool,
}

export default FiftyFifty
