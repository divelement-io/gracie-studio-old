import React from 'react'
import _ from 'lodash'

function supportsIntersectionObserver () {
	return (
		!_.isUndefined(window) &&
		'IntersectionObserver' in window &&
		'IntersectionObserverEntry' in window &&
		'intersectionRatio' in IntersectionObserverEntry.prototype
	)
}

class IntersectionObserverPolyfill extends React.Component {
	state = {}

	componentDidMount () {
		this.initialize()
	}

	initialize () {
		if (supportsIntersectionObserver()) {
			this.setState({ ready: true })
		} else {
			// load the polyfill
			// require.ensure(
			// 	['intersection-observer'],
			// 	() => {
			// 		// eslint-disable-next-line global-require
			// 		require('intersection-observer')
			// 		this.setState({ ready: true })
			// 	},
			// 	'intersection-observer'
			// )
		}
	}

	render () {
		const {
			component: Component = 'div',
			...restProps
		} = this.props

		if (
			(typeof window === 'undefined' || this.state.ready)
		) {
			return (
				<Component {...restProps} />
			)
		}

		return null
	}
}

export default IntersectionObserverPolyfill
