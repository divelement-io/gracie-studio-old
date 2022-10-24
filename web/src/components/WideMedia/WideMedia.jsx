import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import Section from 'src/components/Section'
import Media from 'src/components/Media'
import Grid, { Container } from 'src/components/Grid'
import { colors, animations, mq, util } from 'src/styles'
import TextLockup from 'src/components/TextLockup'
import Button from 'src/components/Button'
import { AppContext } from 'src/state/AppState'
import { headerHeight } from 'src/components/Header'
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
    height: ${height};
    position: relative;
    z-index: 2;
  ` }
`

const ContentWrap = styled.div`
  position: relative;
  ${ ({ height }) => height !== 'auto' && `
    height: ${height};
  ` }
`

const MediaItem = styled(Media)`
  z-index: 1;
  width: 100%;
  overflow: hidden;
  ${ ({ isFirstSection }) => isFirstSection ? css`
    opacity: 0;
    will-change: opacity;
    transform: translateZ(0);
    animation: ${ animations.fadeIn } ${ animations.mediumSpeed } .1s ease-in-out forwards;
  ` : '' }
  ${ ({ overlay, setHeight }) => (overlay && setHeight !== 'auto') ? `
    position: absolute !important;
    top: 0;
    left: 0;
    height: 100%;
  ` : `
    position: relative;
  ` }
  ${ ({ setHeight }) => setHeight !== 'auto' ? `
    height: 100%;
    min-height: ${ setHeight };
    > div, 
    > div > div {
      height: 100% !important;
      min-height: ${ setHeight };
      position: relative;
    }
    img {
      position: absolute;
      top: 0;
      left: 0;
      object-fit: cover;
      width: 100%;
      height: 100%;
      min-height: ${ setHeight };
    }
    video {
      position: absolute;
      top: 0;
      left: 0;
      object-fit: cover;
      width: 100%;
      height: 100%;
      min-height: ${ setHeight };
    }
  ` : `
    height: 100%;
  ` }
`

const OverlayContent = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 5;
  display: flex;
  flex-direction: column;
  background: rgba(0, 0, 0, 0.25);
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
    max-width: 38em;
  }
  h4, h5 {
    max-width: 32em;
  }
  h6 {
    max-width: 16em;
  }
  p {
    max-width: 24em;
  }
`

const OverlaySection = styled(Section)`
  position: relative;
  background: transparent;
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
  _key,
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
  overlayTextColor
}) => {
  const winHeight = use100vh()
  if (!media) {
    return false
  }

  if (!height) {
    height = 'auto'
  }
  const { toggleModal } = useContext(AppContext)

  const fullWidth = width === 'fullWidth'

  const fullHeight = !isFirstSection ? winHeight : false

  const heightValues = {
    auto: 'auto',
    fullHeight: (fullHeight && isFirstSection) ? fullHeight + 'px' : '100vh',
    mediumHeight: '70vh',
    shortHeight: '35vh'
  }

  const overlayGridSettings = getHorizontalPlacementGridValues({ fullWidth, overlayPlacementHorizontal })
  const hasOverlay = text && ((text?.type) || (text?._rawText && (text?._rawText !== null)) || (text?._rawHeadline && (text?._rawHeadline !== null)) || actions.length > 0)

  const renderMedia = (mediaItem, size, hasOverlay, autoHeight) => {
    if (mediaItem) {
      return (
        <MediaItem
          overlay={hasOverlay}
          media={media}
          playing={true}
          isFirstSection={isFirstSection}
          loop={true}
          setHeight={heightValues[height]}
          posterImage={mediaItem.posterImage}
          autoPlay={true}
          overlayTextColor={overlayTextColor}
          loading={isFirstSection ? 'eager' : 'lazy'}
          altText={text?.eyebrow || media.originalFilename}
        />
      )
    }
    return false
  }

  return (
    <>
      <Wrapper
        nextTheme={nextTheme}
        prevTheme={prevTheme}
        setTheme={theme}
        padded={!fullWidth}
        overlayTextColor={overlayTextColor}
      >
        <WideMediaWrap height={heightValues[height]} overlayTextColor={overlayTextColor}>
          <Grid small={fullWidth ? '[1]' : 'container'} medium={fullWidth ? '[1]' : 'container'} large={fullWidth ? '[1]' : 'container'} larger={fullWidth ? '[1]' : 'container'}>
            <ContentWrap height={heightValues[height]}>
              {renderMedia(media, 'large', hasOverlay, height === 'auto')}
              {hasOverlay && (
                <OverlayContent
                  padded={!fullWidth}
                  overlayTextAlignment={alignment}
                  verticalPlacement={overlayPlacementVertical}
                  height={heightValues[height]}
                >
                  {hasOverlay && (
                    <OverlaySection isFirstSection={isFirstSection} setTheme='darkGrey'>
                      <Container>
                        <Grid small='[1]' {...overlayGridSettings}>
                          <div style={{ maxWidth: '35rem', margin: 'auto'}}>
                            {text._rawText || text._rawHeadline ? (
                              <TextLockup
                                eyebrow={text.eyebrow}
                                text={text._rawText}
                                headline={text._rawHeadline}
                                textSize={paragraphSize}
                                actions={actions}
                                alignment={alignment}
                                theme='transparent'
                                transitionIn={!isFirstSection}
                              />
                            ) : text}
                          </div>
                        </Grid>
                      </Container>
                    </OverlaySection>
                  )}
                </OverlayContent>
              )}
            </ContentWrap>
          </Grid>
        </WideMediaWrap>
      </Wrapper>
    </>
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
  /** One of the themes specified in `src/styles/themes.js` */
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
