import React, { Fragment } from 'react'
import withSizes from 'react-sizes'
import { mq } from 'src/styles'

const widthToRenderer = (winWidth, small, medium, large, larger, extraLarge, custom) => {
	if (custom?.breakpoint && winWidth >= custom?.breakpoint) {
		// For custom breakpoint if necessary
		return custom.content
	} else if (winWidth >= mq.extraLargeBreakpoint) {
		return extraLarge || larger || large || medium || small
	} else if (winWidth >= mq.largerBreakpoint) {
		return larger || large || medium || small
	} else if (winWidth >= mq.largeBreakpoint) {
		return large || medium || small
	} else if (winWidth >= mq.mediumBreakpoint) {
		return medium || small
	} else if (winWidth < mq.mediumBreakpoint) {
		return small
	}
}

const ResponsiveComponent = ({
	small,
	medium,
	large,
	larger,
	extraLarge,
	custom,
	winWidth
}) => {
	return (
		<Fragment>
			{widthToRenderer(winWidth, small, medium, large, larger, extraLarge, custom)}
		</Fragment>
	)
}

const mapSizesToProps = ({ width }) => ({
  winWidth: width,
})

export default withSizes(mapSizesToProps)(ResponsiveComponent)
