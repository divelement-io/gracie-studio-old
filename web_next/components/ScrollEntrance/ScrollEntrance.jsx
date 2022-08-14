import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { useInView } from 'react-intersection-observer'

const EnteranceWrap = styled.div`
	${ ({ items, transitionIn, timing, speed, delay, 'data-in-view': inView, transform }) => transitionIn && `
		> * {
			will-change: transform, opacity;
			transition: transform ${ speed + 'ms' } ${ timing }, opacity ${ speed + 'ms' } ${ timing };
			${ inView ? `
					transform: none;
					opacity: 1;
				` : `
					transform: ${ transform };
					opacity: 0;
				`
			}

			${ delay > 0 && `
				transition-delay: ${ (speed * 0.115) * (delay) }ms;
			` }
			
			${ Array.isArray(items) && `
				${ items.map((item, index) => `
					&:nth-of-type(${ index + 1 }) {
						transition-delay: ${ (speed * 0.115) * (index + delay) }ms;
					}
				`) }
			` }
		}
	` }
`

const ScrollEntrance = ({ children, className, transform, speed, as, delay = '10', timing, transitionIn = true }) => {
	const [ref, inView] = useInView({ triggerOnce: true })

	if (!children) {
		return false
	}

	return (
		<EnteranceWrap
			ref={transitionIn ? ref : null}
			delay={delay}
			data-in-view={inView}
			transform={transform}
			className={className}
			items={children}
			timing={timing}
			speed={speed}
			as={as}
			transitionIn={transitionIn}
		>
			{children}
		</EnteranceWrap>
	)
}

ScrollEntrance.defaultProps = {
	transform: 'translate3d(0, 40px, 0)',
	delay: 0,
	timing: 'cubic-bezier(0.44, 0.24, 0.16, 1.00)',
	speed: 650,
	transitionIn: true
}

ScrollEntrance.propTypes = {
	/** Initial transform state before transitioning in */
	transform: PropTypes.string,
	/** Delay transition in (milliseconds) */
	delay: PropTypes.number,
	/** Transition timing function */
	timing: PropTypes.string,
	/** In milliseconds */
	speed: PropTypes.number,
	transitionIn: PropTypes.bool,
}

export default ScrollEntrance
