import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import Section from 'components/Section'
import Image from 'components/Image'
import Video from 'components/Video'
import Media from 'components/Media'
import Grid, { Container } from 'components/Grid'
import { colors, animations } from 'styles'
import TextLockup from 'components/TextLockup'
// import ResponsiveComponent from 'components/ResponsiveComponent'
import { headerHeight } from 'components/Header'
import { use100vh } from 'react-div-100vh'

const Wrapper = styled(Section)`
  position: relative;
  ${ ({ overlayTextColor }) => overlayTextColor === 'dark' ? `
    color: ${ colors.textColor };
  ` : `
    color: ${ colors.bgColor };
  ` }
`

const WideMediaWrap = styled.div`
  ${ ({ height }) => height !== 'auto' && `
    position: relative;
    z-index: 2;
  ` }
`

const ContentWrap = styled.div`
  position: relative;
`

const MediaItem = styled.div`
  z-index: 1;
  width: 100%;
  overflow: hidden;
  ${ ({ isFirstSection }) => isFirstSection ? css`
    opacity: 0;
    will-change: opacity;
    transform: translateZ(0);
    animation: ${ animations.fadeIn } ${ animations.mediumSpeed } .1s ease-in-out forwards;
  ` : '' }
  position: absolute !important;
  top: 0;
  left: 0;
  height: 100%;
  min-height: ${ ({ height }) => height };
  > div, 
  > div > div {
    height: 100% !important;
    min-height: ${ ({ height }) => height };
    position: relative;
  }
  img {
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
    width: 100%;
    height: 100%;
    min-height: ${ ({ height }) => height };
  }
  video {
    position: absolute;
    top: 0;
    left: 0;
    object-fit: cover;
    width: 100%;
    height: 100%;
    min-height: ${ ({ height }) => height };
  }
`

const OverlayContent = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  display: flex;
  flex-direction: column;
  ${ ({ height }) => height === 'auto' ? `
    position: absolute;
  ` : `
    position: relative;
  ` }
  ${ ({ height }) => height !== 'auto' && `
    min-height: ${ height };
  ` }
  justify-content: ${ ({ verticalPlacement }) => {
    if (!verticalPlacement) return 'center'
    if (verticalPlacement === 'top') return 'flex-start'
    if (verticalPlacement === 'bottom') return 'flex-end'
    else return verticalPlacement
  } };
  text-align: ${ ({ overlayTextAlignment }) => overlayTextAlignment || 'left' };
  h1, h2, h3 {
    max-width: 10em;
  }
  h4, h5 {
    max-width: 12em;
  }
  h6 {
    max-width: 16em;
  }
  p {
    max-width: 36em;
  }
`

const OverlaySection = styled(Section)`
  position: relative;
  ${ ({ isFirstSection }) => isFirstSection && `
    ${ headerHeight('padding-top') }
  ` }
`

function getHorizontalPlacementGridValues ({ fullWidth, overlayPlacementHorizontal }) {
  if (!fullWidth) {
    return {
      left: {
        medium: '[10] 2',
        large: '[8] 3',
        larger: '[6] 6'
      },
      center: {
        medium: '1 [10] 1',
        large: '2 [8] 2',
        larger: '3 [6] 3'
      },
      right: {
        medium: '6 [5] 1',
        large: '6 [5] 1',
        larger: '6 [5] 1'
      }
    }[overlayPlacementHorizontal]
  } else {
    return {
      left: {
        medium: '[1]',
        large: '[1]',
        larger: '[1]'
      },
      center: {
        medium: '1 [10] 1',
        large: '1 [10] 1',
        larger: '1 [10] 1'
      },
      right: {
        medium: '6 [6]',
        large: '6 [6]',
        larger: '6 [6]'
      }
    }[overlayPlacementHorizontal]
  }
}

const WideMedia = ({
  media,
  mediaMedium,
  mediaSmall,
  width,
  theme,
  prevTheme,
  nextTheme,
  height,
  text,
  paragraphSize,
  actions,
  overlayPlacementVertical,
  overlayPlacementHorizontal,
  alignment,
  isFirstSection,
  overlayTextColor,
  id
}) => {
  const winHeight = use100vh()
  if (!media) {
    return false
  }

  if (!height) {
    height = 'auto'
  }

  const fullWidth = width === 'fullWidth'

  const contentType = media.mediaType || 'image'

  const fullHeight = !isFirstSection ? winHeight : false
  // const fullHeight = false

  const heightValues = {
    auto: 'auto',
    fullHeight: (fullHeight && isFirstSection) ? fullHeight + 'px' : '100vh',
    mediumHeight: '70vh',
    shortHeight: '50vh'
  }

  const overlayGridSettings = getHorizontalPlacementGridValues({ fullWidth, overlayPlacementHorizontal })
  const hasOverlay = text?.text || actions?.length > 0

  const renderMedia = (mediaItem, size, hasOverlay, autoHeight) => {
    if (mediaItem) {
      return (
        <MediaItem
          media={mediaItem}
          loading={isFirstSection ? 'eager' : 'lazy'}
          alt={text?.eyebrow || media.originalFilename}
          as={Media}
          height={heightValues[height]}
          isFirstSection={isFirstSection}
        />
      )
    }
    return false
  }

  return (
    <Wrapper
      nextTheme={nextTheme}
      prevTheme={prevTheme}
      setTheme={theme}
      padded={!fullWidth}
      overlayTextColor={overlayTextColor}
      id={id}
    >
      <WideMediaWrap height={heightValues[height]} overlayTextColor={overlayTextColor}>
        <Grid small={fullWidth ? '[1]' : 'container'} medium={fullWidth ? '[1]' : 'container'} large={fullWidth ? '[1]' : 'container'} larger={fullWidth ? '[1]' : 'container'}>
          <ContentWrap>
            {/* <ResponsiveComponent
              small={renderMedia(mediaSmall, 'small', hasOverlay, height === 'auto')}
              medium={renderMedia(mediaMedium, 'medium', hasOverlay, height === 'auto')}
              large={renderMedia(media, 'large', hasOverlay, height === 'auto')}
            /> */}

            {renderMedia(media, 'large', hasOverlay, height === 'auto')}
            {hasOverlay && (
              <OverlayContent
                padded={!fullWidth}
                overlayTextAlignment={alignment}
                verticalPlacement={overlayPlacementVertical}
                height={heightValues[height]}
              >
                <OverlaySection isFirstSection={isFirstSection}>
                  <Container>
                    <Grid small='[1]' colGap='var(--site-gutters)' {...overlayGridSettings}>
                      <TextLockup
                        eyebrow={text.eyebrow}
                        text={text?.text}
                        textSize={paragraphSize}
                        actions={actions}
                        alignment={alignment}
                        transitionIn={!isFirstSection}
                      />
                    </Grid>
                  </Container>
                </OverlaySection>
              </OverlayContent>
            )}
          </ContentWrap>
        </Grid>
      </WideMediaWrap>
    </Wrapper>
  )
}

WideMedia.propTypes = {
  /**
   * What color should the text be?
   */
  overlayTextColor: PropTypes.string,
  /**
   * How large should the button be?
   */
  width: PropTypes.oneOf(['fullWidth', 'margins']),
}

WideMedia.defaultProps = {
  width: 'margins',
  height: 'auto',
  overlayTextColor: 'light'
}

WideMedia.propTypes = {
  /** Can be an image or video from Contentful */
  media: PropTypes.string,
  /** Contentful image or video for tablet screen size */
  mediaMedium: PropTypes.string,
  /** Contentful image or video for mobile screen size */
  mediaSmall: PropTypes.string,
  /** Should the image have space around it our extend the full width of the window? */
  width: PropTypes.oneOf(['margins', 'fullWidth']),
  /** One of the themes specified in `styles/themes.js` */
  theme: PropTypes.string,
  /** How tall should the section be? */
  height: PropTypes.oneOf([
    'auto',
    'fullHeight',
    'mediumHeight',
    'shortHeight'
  ]),
  paragraphSize: PropTypes.oneOf(['body', 'bodyMedium', 'bodyLarge', 'bodySmall']),
  /** Array of Buttons or Links */
  actions: PropTypes.array,
  /** What position should the overlay text be in? */
  overlayPlacement: PropTypes.oneOf([
    'top left',
    'top center',
    'top right',
    'center left',
    'center center',
    'center right',
    'bottom left',
    'bottom center',
    'bottom right',
  ]),
  /** What is the text alignment of the overlay text? */
  overlayTextAlignment: PropTypes.oneOf(['left', 'center', 'right']),
  /** Should we adjust the space to accomidate the header? */
  isFirstSection: PropTypes.bool,
  overlayTextColor: PropTypes.oneOf(['light', 'dark']),
}

export default WideMedia
