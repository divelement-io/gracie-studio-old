import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { rgba, lighten } from 'polished'
import styled from '@emotion/styled'
import { css } from '@emotion/react'

import Section from 'src/components/Section'
import Grid from 'src/components/Grid'
import Media from 'src/components/Media'

import TextLockup from 'src/components/TextLockup'
import ScrollEntrance from 'src/components/ScrollEntrance'

import { AppContext } from 'src/state/AppState'

import { mq, globals, typography, util, animations, colors } from 'src/styles'

const FFSection = styled(Section)`
  ${ mq.largeAndBelow } {
    ${ globals.verticalSpacing('padding-bottom') }
  }
`

const ColumnWrapper = styled.div`
  direction: ltr;
  ${ ({ fullWidth }) => fullWidth && `
    height: 100%;
    > div,
    .gatsby-image-wrapper {
      height: 100%;
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
  blockquote {
    max-width: 28em;
  }
`

const TextWrapper = styled.div`
  ${ ({ fullWidth }) => fullWidth && `
    ${ mq.largerAndUp } {

    }
  ` }
`

const MediaCaption = styled.p`
  ${typography.bodySmall};
  font-family: ${typography.secondaryFont};
  margin-top: 0.25rem;
  ${({width, mediaPlacement}) => width === 'fullWidth' && `
    position: absolute;
    margin-top: 0;
    color: ${colors.white};
    bottom: 0.5rem;
    ${mediaPlacement} : 0.5rem;
    z-index: 1;
    `
  }
`

const arrangeMedia = {
  default: {
    normal: '[14] g [10]',
    large: '[14] g [10]',
    extraLarge: '[15] g [9]'
  },
  fullWidth: {
    normal: '[14] g [10] 2',
    large: '[15] g [9] 2',
    extraLarge: '[16] g [8] 2'
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
  _key,
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
  mediaCaption,
  ...props
}) => {
  const image = media?.image?.asset
  const video = media?.video?.asset

  if (!image && !video) {
    return false
  }

  const { toggleModal } = useContext(AppContext)

  // set responsive image sizes
  let sizes = '100vw'
  const imageSize = mediaSizes.default[mediaWidth]
  sizes = '(min-width: ' + mq.mediumBreakpoint + 'px) ' + imageSize + 'vw, 86vw'

  const fullWidth = width === 'fullWidth'
  return (
    <>
      <FFSection
        className={className}
        setTheme={theme}
        prevTheme={prevTheme}
        nextTheme={nextTheme}
        isFirstSection={isFirstSection}
        padded={!fullWidth}
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
            vAlign={verticalAlignment}
            gridDirection={mediaPlacement?.includes('right') ? 'rtl' : 'ltr'}
          >
            {media && (
              <ColumnWrapper fullWidth={fullWidth}>
                <ScrollEntrance>
                  <div style={{ position: 'relative' }}>
                    <Media
                      media={media}
                      loading={isFirstSection ? 'eager' : 'lazy'}
                      alt={text?.eyebrow || media.originalFilename}
                      sizes={sizes}
                      css={css`position: relative; z-index: 1;`}
                    />
                    {mediaCaption && (<MediaCaption mediaPlacement={mediaPlacement} width={width}>{mediaCaption}</MediaCaption>)}
                  </div>
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
                    eyebrow={text?.eyebrow}
                    text={text?._rawText}
                    headline={text?._rawHeadline}
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
    </>
  )
}

FiftyFifty.defaultProps = {
  mediaWidth: 'normal',
  mediaPlacement: 'left'
}

FiftyFifty.propTypes = {
  /** One of the themes specified in `src/styles/themes.js` */
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
