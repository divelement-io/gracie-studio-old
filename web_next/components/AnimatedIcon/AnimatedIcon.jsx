import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'

const transitionSpeed = '0.3s'

const Piece = styled.div`
	font-size: ${ ({ weight }) => weight + 'px' };
	height: 1em;
	border: .5em solid currentcolor;
	width: 100%;
	background: currentcolor;
	position: absolute;
	left: 0;
	background: currentcolor;
	transform-style: preserve-3d;
	border-radius: ${ ({ rounded }) => rounded ? '20px' : 0 };
	transition: transform ${ transitionSpeed } ease-in-out,
							top ${ transitionSpeed } ease-in-out,
							bottom ${ transitionSpeed } ease-in-out,
							transform ${ transitionSpeed } ease-in-out,
							width ${ transitionSpeed } ease-in-out,
							height ${ transitionSpeed } ease-in-out,
							opacity ${ transitionSpeed } ease-in-out,
							top ${ transitionSpeed } ease-in-out,
							left ${ transitionSpeed } ease-in-out,
							bottom ${ transitionSpeed } ease-in-out,
							right ${ transitionSpeed } ease-in-out,
							border-radius ${ transitionSpeed } ease-in-out,
							font-size ${ transitionSpeed } 3s ease-in-out,
							margin ${ transitionSpeed } ease-in-out,
							background ${ transitionSpeed } ease-in-out,
							border ${ transitionSpeed } ease-in-out;
	${ ({ piece, icon, weight, size }) => `
		${ icon === 'ellipsis' ? `
			transform: ${ size / weight <= 10 ? 'scale(1.5)' : 'scale(2)' };
			width: 1em;
			height: 1em;
			border-radius: 50%;
			left: 50%;
			margin-left: -.5em;
		` : '' }
		// PIECE 1
		${ piece === 'one' ? `
			${ 	icon === 'menu' ||
					icon === 'ellipsis' ||
					icon === 'bar_graph' ? `
				top: calc(${ size / 4 + 'px' } - ${ weight / 2 + 'px' });
			` : '' }
			${	icon === 'arrow_left' ||
					icon === 'arrow_down' ||
					icon === 'download' ||
					icon === 'upload' ? `
				top: 0;
				transform: translate3d(0%, ${ size * 0.31 + 'px' }, 0) rotate(-45deg);
				width: 50%;
			` : '' }
			${ icon === 'arrow_right' || icon === 'arrow_up' ? `
				top: 0;
				transform: translate3d(100%, ${ size * 0.31 + 'px' }, 0) rotate(45deg);
				width: 50%;
			` : '' }
			${ 	icon === 'download' ||
					icon === 'upload' ? `
				transform: translate3d(${ size * 0.15 + 'px' }, ${ size * 0.31 + 'px' }, 0) rotate(-45deg);
			` : '' }
			${ icon === 'close' || icon === 'plus' ? `
				top: calc(50% - .5em);
				transform: rotate(-45deg);
			` : '' }
			${ icon === 'search' ? `
				top: calc(50% - .5em);
				width: calc(100% - ${ size * 0.5 + 'px' } - ${ weight * 2 + 'px' });
				left: calc(100% - ${ size * 0.5 + 'px' } + ${ weight + 'px' });
			` : '' }
			${ icon === 'bar_graph' ? `
				width: 50%;
			` : '' }
		` : '' }
		// PIECE 2
		${ piece === 'two' ? `
			${ 	icon === 'menu' ||
					icon === 'ellipsis' ||
					icon === 'bar_graph' ? `
				top: calc(50% - .5em);
			` : '' }
			${ 	icon.startsWith('arrow_') ||
					icon === 'download' ||
					icon === 'upload' ? `
				top: calc(50% - .5em);
				width: 82%;
				left: 9%;
			` : '' }
			${ 	icon === 'download' ||
					icon === 'upload' ? `
				top: calc(50% - .5em);
				width: 75%;
				left: 25%;
			` : '' }
			${ icon === 'close' || icon === 'plus' ? `
				top: calc(50% - .5em);
				transform: rotate(90deg) scale(0);
				width: ${ weight + 'px' };
				opacity: 0;
			` : '' }
			${ icon === 'search' ? `
				top: 50%;
				margin-top: calc((${ size * 0.5 + 'px' } + ${ weight / 2 + 'px' }) / -2);
				height: calc(${ size * 0.5 + 'px' } + ${ weight / 2 + 'px' });
				width: calc(${ size * 0.5 + 'px' } + ${ weight / 2 + 'px' });
				left: ${ weight / 2 + 'px' };
				background: transparent;
				border-width: ${ weight + 'px' };
				border-radius: 50%;
			` : '' }
			${ icon === 'bar_graph' ? `
				width: 100%;
			` : '' }
		` : '' }
		// PIECE 3
		${ piece === 'three' ? `
			${ 	icon === 'menu' ||
					icon === 'ellipsis' ||
					icon === 'bar_graph' ? `
				bottom: calc(${ size / 4 + 'px' } - ${ weight / 2 + 'px' });
			` : '' }
			${ 	icon === 'arrow_left' ||
					icon === 'arrow_down' ||
					icon === 'download' ||
					icon === 'upload' ? `
				bottom: 0;
				transform: translate3d(0, -${ size * 0.31 + 'px' }, 0) rotate(45deg);
				width: 50%;
			` : '' }
			${ icon === 'arrow_right' || icon === 'arrow_up' ? `
				bottom: 0;
				transform: translate3d(100%, -${ size * 0.31 + 'px' }, 0) rotate(-45deg);
				width: 50%;
			` : '' }
			${ 	icon === 'download' ||
					icon === 'upload' ? `
				transform: translate3d(${ size * 0.15 + 'px' }, -${ size * 0.31 + 'px' }, 0) rotate(45deg);
			` : '' }
			${ icon === 'close' || icon === 'plus' ? `
				bottom: calc(50% - .5em);
				transform: rotate(45deg);
			` : '' }
			${ icon === 'search' ? `
				bottom: calc(50% - .5em);
				width: calc(100% - ${ size * 0.5 + 'px' } - ${ weight * 2 + 'px' });
				left: calc(100% - ${ size * 0.5 + 'px' } + ${ weight + 'px' });
			` : '' }
			${ icon === 'bar_graph' ? `
				width: 75%;
			` : '' }
		` : '' }
		// PIECE 4
		${ piece === 'four' ? `
			// transform: scale(0);
			width: ${ weight + 'px' };
			top: 0;
			left: 0;
			opacity: 0;
			${ 	icon === 'download' ||
					icon === 'upload' ? `
				opacity: 1;
				width: ${ size + 'px' };
				top: calc(50% - .5em);
				left: calc(-50% + .5em);
				transform: rotate(90deg);
			` : '' }
		` : '' }
	` }
`

const Wrapper = styled.div`
	position: relative;
	transition: transform ${ transitionSpeed } ease-in-out;
	width: ${ ({ size }) => size + 'px' };
	height: ${ ({ size }) => size + 'px' };
	font-size: ${ ({ size }) => size + 'px' };
	${ ({ icon }) => `
		${ icon === 'menu' ? `
			transform: none;
		` : '' }
		${ 	icon === 'close' ||
				icon === 'ellipsis' ||
				icon === 'bar_graph' ||
				icon === 'arrow_up' ||
				icon === 'arrow_down' ||
				icon === 'download' ? `
			transform: rotate(-90deg);
		` : '' }
		${ icon === 'search' || icon === 'plus' ? `
			transform: rotate(135deg);
		` : '' }
		${ 	icon === 'upload' ? `
			transform: rotate(90deg);
		` : '' }
	` }
`

const AnimatedIcon = ({ size, weight, icon, className, rounded }) => {
	return (
		<Wrapper size={size} icon={icon} className={className}>
			<Piece piece="one" weight={weight} icon={icon} size={size} rounded={rounded} />
			<Piece piece="two" weight={weight} icon={icon} size={size} rounded={rounded} />
			<Piece piece="three" weight={weight} icon={icon} size={size} rounded={rounded} />
			<Piece piece="four" weight={weight} icon={icon} size={size} rounded={rounded} />
		</Wrapper>
	)
}

AnimatedIcon.defaultProps = {
	size: 24,
	weight: 2,
	icon: 'menu',
	rounded: false
}

AnimatedIcon.propTypes = {
	/** Which icon should to use? */
	// icon: PropTypes.oneOf(['default', 'square', 'circle', 'block']),
	icon: PropTypes.oneOf(['menu', 'arrow_left', 'arrow_right', 'arrow_up', 'arrow_down', 'close', 'ellipsis', 'bar_graph', 'download', 'upload']),
	/** What size should the icon be? (Best if even number) */
	size: PropTypes.number,
	/** How thick should the icon be? (Best if even number) */
	weight: PropTypes.number,
	/** Should icons have rounded edges? */
	rounded: PropTypes.bool,
}

export default AnimatedIcon
