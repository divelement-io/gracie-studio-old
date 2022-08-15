import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { rgba, lighten } from 'polished'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import Section from 'src/components/Section'
import Grid from 'src/components/Grid'
import Media from 'src/components/Media'
import Video from 'src/components/Video'
import TextLockup from 'src/components/TextLockup'
import Button from 'src/components/Button'
import ScrollEntrance from 'src/components/ScrollEntrance'
import Modal from 'src/components/Modal'
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
  blockquote {
    max-width: 28em;
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

const VideoModal = styled(Modal)`
  .close-button {
    background: rgba(0, 0, 0, .6);
    top: 10px;
    right: 10px;
    .icon {
      font-size: 24px;
      color: ${ colors.white };
    }
    &:hover {
      transform: none;
      background: ${ colors.mainColor };
    }
  }
`

const ModalContent = styled.div`
  width: calc(100vw - 40px);
  max-width: 1200px;
  video {
    border-radius: var(--card-border-radius);
  }
  ${ mq.largeAndUp } {
    width: 80vw;
  }
  video {
    display: block;
  }
`

const PlayButton = styled(Button)`
  .icon {
    font-size: 48px;
    z-index: 2;
    position: relative;
    transition: transform ${ animations.mediumSpeed } ease-in-out;
  }
  box-shadow: none;
  background: transparent;
  border-color: transparent;
  background: transparent;
  border-color: ${ colors.white };
  color: ${ colors.white };
  position: relative;
  display: block;
  &:after {
    content: '';
    display: block;
    border-radius: 50%;
    position: absolute;
    transition: border ${ animations.mediumSpeed } ease-in-out;
    top: -2px;
    left: -2px;
    bottom: -2px;
    right: -2px;
    border: 2px solid ${ colors.white };
    z-index: 1;
    ${ mq.mediumAndBelow } {
      border-width: 23px;
      border-color: ${ colors.mainColor };
    }
  }
  &:hover {
    transform: none;
    background: transparent;
    border-color: ${ colors.mainColor };
    color: ${ colors.white };
    &:after {
      border-width: 23px;
      border-color: ${ colors.mainColor };
    }
  }
`

const PlayTriggerOverlay = styled.div`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  background: transparent;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  transition: background ${ animations.mediumSpeed } ease-in-out;
  ${ util.responsiveStyles('padding', 50, 40, 30, 20) }
  color: ${ colors.white };
  background: ${ rgba(colors.textColor, 0.2) };
  direction: ltr;
  p {
    margin: 0 0 0 1em;
    font-weight: ${ typography.bold };
    ${ mq.largeAndUp } {
      transition: transform ${ animations.mediumSpeed } ease-in-out, opacity ${ animations.mediumSpeed } ease-in-out;
      opacity: 0;
      transform: translate3d(0, .5em, 0);
    }
  }
  &:hover {
    background: ${ rgba(colors.textColor, 0.5) };
    p {
      opacity: 1;
      transform: none;
    }
    ${ PlayButton } {
      border-color: ${ colors.mainColor };
      &:after {
        border-width: 23px;
        border-color: ${ colors.mainColor };
      }
      &:hover {
        &:after {
          border-color: ${ lighten(0.07, colors.mainColor) };
        }
      }
    }
  }
`

const arrangeMedia = {
  default: {
    normal: '[11] g [11]',
    large: '[12] g [10]',
    extraLarge: '[13] g [9]'
  },
  fullWidth: {
    normal: '[13] g [11] 2',
    large: '[14] g [10] 2',
    extraLarge: '[15] g [9] 2'
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
  videoPopup,
  verticalAlignment = 'center',
  textAlignment = 'left',
  isFirstSection,
  listType,
  mediaCaption
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
                    {videoPopup && (
                      <PlayTriggerOverlay onClick={() => toggleModal(_key + '-video-modal')}>
                        <div css={css`display: flex; align-items: center;`}>
                          <PlayButton shape='circle' icon='play_arrow'/>
                          <p>Play video</p>
                        </div>
                      </PlayTriggerOverlay>
                    )}
                  </div>
                  {mediaCaption && (<p className='small' style={{ marginBottom: 0 }}>{mediaCaption}</p>)}
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

      {videoPopup && (
        <VideoModal id={_key + '-video-modal'}>
          <ModalContent>
            <Video
              src={'https://vimeo.com/' + videoPopup}
              id='modalVideo'
              controls={true}
              muted={false}
              loop={false}
              onEnded={() => toggleModal(false)}
              allowFullscreen={true}
            />
          </ModalContent>
        </VideoModal>
      )}
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
