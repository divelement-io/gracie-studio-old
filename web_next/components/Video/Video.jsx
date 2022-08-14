import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import ReactPlayer from 'react-player/file'
import { getFile } from 'client'

const Wrapper = styled.div`
	video {
		display: block;
		margin: 0;
	}
`

const VideoWrapper = styled.div`
	${ ({ cover }) => cover && `
		height: 100%;
	` }
`

const StyledVideo = styled(ReactPlayer)`
	z-index: 10;
	position: relative;
	height: auto;
	min-width: 100%;
	min-height: 100%;
	width: 100% !important;
	height: auto !important;
	> div {
		position: absolute;
		width: 100%;
		height: 100%;
	}
	${ ({ cover }) => cover && `
		video {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			object-fit: cover;
		}
	` }
	${ ({ url, cover }) => url.indexOf('youtube') > -1 || url.indexOf('vimeo') > -1 ? `
		padding-bottom: ${ 9 / 16 * 100 }%;
		${ cover && `
			position: absolute;
			top: 50%;
			left: 50%;
			padding: 0;
			width: 100% !important;
			height: 100% !important;
			@media (min-aspect-ratio: 16/9) {
				// tall
				min-width: 100vw;
				min-height: 56.25vw;
				margin-left: -50vw;
				margin-top: -28.125vw;
			}
			@media (max-aspect-ratio: 16/9) {
				// wide
				min-width: 177.77vh;
				min-height: 100vh;
				margin-left: -88.885vh;
				margin-top: -50vh;
			}
			min-width: 0;
			min-height: 0;
		` }
		iframe {
			position: absolute;
			top: 0;
			left: 0;
			width: 100% !important;
			height: 100% !important;
		}
	` : `
	` }
`

const Video = ({
	video,
	loop,
	cover,
	muted,
	autoplay,
	className,
	playing,
	allowFullscreen = false,
	controls = false,
	src
}) => {
	var videoUrl = false
	if (video?._ref) {
		videoUrl = getFile(video).url
	}

	if (!videoUrl) {
		return false
	}

	return (
		<Wrapper className={'video-wrapper ' + className} cover={cover}>
			<VideoWrapper cover={cover}>
				<StyledVideo
					cover={cover}
					url={videoUrl}
					playing={playing}
					loop={loop}
					muted={muted}
					autoPlay={autoplay}
					allowFullscreen={allowFullscreen}
					controls={controls}
					config={{
						file: {
							attributes: {
								controlsList: allowFullscreen ? 'nofullscreen' : '',
							},
						},
					}}
				/>
			</VideoWrapper>
		</Wrapper>
	)
}

Video.defaultProps = {
	playing: true,
	loop: true,
	muted: true,
	autoplay: true
}

Video.propTypes = {
	/** URL of mp4 video asset */
	src: PropTypes.string,
	loop: PropTypes.bool,
	cover: PropTypes.bool,
	muted: PropTypes.bool,
	autoplay: PropTypes.bool,
	playing: PropTypes.bool,
}

export default Video
