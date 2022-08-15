import React, { useRef } from 'react'
import styled from '@emotion/styled'
import { rgba } from 'polished'
import Slider from 'react-slick'
import Section from 'src/components/Section'
import Image from 'src/components/Image'
import Button from 'src/components/Button'
import { themes } from 'src/styles/themes'
import { mq, animations } from 'src/styles'

const Wrapper = styled(Section)`
  .slick-track {
    display: flex !important;
    align-items: stretch;
  }
  .slick-slide {
    float: none !important;
    height: auto !important;
    > div {
      height: 100%;
    }
  }
`

const Slide = styled.div`
  padding: 0 12px;
  ${ mq.extraLargeAndUp } {
    padding: 0 15px;
  }
`

const SlideImage = styled.div`
  width: 100%;
  width: 80vw;
  ${ mq.mediumAndUp } {
    width: 70vw;
  }
  ${ mq.largeAndUp } {
    width: 60vw;
  }
  ${ mq.largerAndUp } {
    width: 50vw;
  }
  ${ mq.extraLargeAndUp } {
    width: 45vw;
  }
  .gatsby-image-wrapper {
    ${ mq.largeAndUp } {
      height: 100%;
    }
  }
`

const StyledSlider = styled(Slider)`
  position: relative;
  z-index: 1;
  ${ SlideImage } {
    .gatsby-image-wrapper {
      opacity: .3;
      transition: opacity ${ animations.mediumSpeed } ease-in-out;
    }
  }
  .slick-slide.slick-current {
    ${ SlideImage } {
      .gatsby-image-wrapper {
        opacity: 1;
      }
    }
  }
`

const SliderControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  flex-grow: 0;
  width: 100%;
  z-index: 3;
  margin-top: 10px;
  margin-bottom: -12px;
  padding-left: calc(var(--site-margins) - 16px);
  padding-right: calc(var(--site-margins) - 16px);
  ${ mq.largeAndUp } {
    position: absolute;
    pointer-events: none;
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
    margin-top: 0;
    z-index: 5;
    padding: 0;
  }
  .button {
    ${ mq.largeAndUp } {
      pointer-events: all;
      color: var(--text-color);
      height: 100%;
      min-height: 100%;
      border-radius: 0;
      width: calc((100vw - 60vw - 60px) / 2);
      color: var(--text-color);
      .icon {
        transition: box-shadow ${ animations.mediumSpeed } ease-in-out, background ${ animations.mediumSpeed } ease-in-out, color ${ animations.mediumSpeed } ease-in-out;
        padding: 1em;
        border-radius: 50%;
      }
      &:hover {
        .icon {
          // box-shadow: 0 3px 10px ${ ({ hoverBg }) => rgba(hoverBg, 0.3) };
          background: var(--bg-color);
          color: var(--main-color);
        }
      }
    }
    ${ mq.largerAndUp } {
      width: calc((100vw - 50vw - 60px) / 2);
    }
    ${ mq.extraLargeAndUp } {
      width: calc((100vw - 45vw - 60px) / 2);
    }
  }
  .dots {
    display: flex;
    flex-grow: 0;
    flex-shrink: 0;
    ${ mq.largeAndUp } {
      display: none;
    }
  }
`

const Dot = styled.div`
  width: 6px;
  height: 6px;
  background: currentcolor;
  border-radius: 50%;
  transition: opacity ${ animations.mediumSpeed } ease-in-out;
  margin-left: 14px;
  ${ ({ current }) => current ? `
    opacity: 1;
  ` : `
    opacity: .3;
  ` }
`

export const ThumbnailWrapper = styled.div`
  width: ${ ({ type }) => type === 'individual' ? '80px' : '120px' };
  flex-grow: 0;
`

export const ReviewImage = styled(Image)`
  border-radius: 4px;
  img {
    border-radius: 4px;
  }
`

const Slideshow = ({
  className,
  nextTheme,
  prevTheme,
  theme = 'default',
  isFirstSection,
  headline,
  slides,
  type,
  id
}) => {
  const slider = useRef(null)
  const settings = {
    arrows: false,
    infinite: true,
    variableWidth: true,
    centerMode: true,
    autoplay: true,
    swipe: true,
    speed: 500,
  }

  return (
    <Wrapper
      className={className}
      prevTheme={prevTheme}
      setTheme={theme}
      nextTheme={nextTheme}
      isFirstSection={isFirstSection}
    >
      <div style={{ position: 'relative' }}>
        <StyledSlider ref={slider} {...settings}>
          {slides.map((slide, index) => (
            <Slide key={slide._key} firstSlide={index === 0}>
              <SlideImage type={type}>
                <Image
                  image={slide?.asset?.gatsbyImageData}
                  ratio={3 / 4}
                  alt={slide.altText}
                />
              </SlideImage>
            </Slide>
          ))}
        </StyledSlider>
        <SliderControls>
          <Button
            hoverBg={themes[theme].background}
            setTheme='transparent'
            icon='arrow_back'
            shape='circle'
            onClick={() => slider?.current?.slickPrev()}
          />
          <div className='dots'>
            {slides.map((item, dotIndex) => {
              return (
                <Dot current={dotIndex === 0} />
              )
            })}
          </div>
          <Button
            hoverBg={themes[theme].background}
            setTheme='transparent'
            icon='arrow_forward'
            shape='circle'
            onClick={() => slider?.current?.slickNext()}
          />
        </SliderControls>
      </div>
    </Wrapper>
  )
}

export default Slideshow
