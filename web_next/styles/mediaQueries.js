import { css } from '@emotion/react'

// these define the maximum size for a breakpoint
const tinyBreakpoint = 360
const smallBreakpoint = 550
const mediumBreakpoint = 767
const largeBreakpoint = 1023
const largerBreakpoint = 1439
const extraLargeBreakpoint = 1919
const extraExtraLargeBreakpoint = 2559

const maxWidth = breakpoint => `@media (max-width: ${ breakpoint }px)`
const minWidth = breakpoint => `@media (min-width: ${ breakpoint }px)`

const smallAndBelow = maxWidth(smallBreakpoint)
const mediumAndBelow = maxWidth(mediumBreakpoint)
const largeAndBelow = maxWidth(largeBreakpoint)
const largerAndBelow = maxWidth(largerBreakpoint)
const extraLargeAndBelow = maxWidth(extraLargeBreakpoint)
const extraExtraLargeAndBelow = maxWidth(extraExtraLargeBreakpoint)

const mediumAndUp = minWidth(smallBreakpoint + 1)
const largeAndUp = minWidth(mediumBreakpoint + 1)
const largerAndUp = minWidth(largeBreakpoint + 1)
const extraLargeAndUp = minWidth(largerBreakpoint + 1)
const extraExtraLargeAndUp = minWidth(extraLargeBreakpoint + 1)

/**
 *
 * Apply rules to browsers that have a hover-able device, as
 * well as devices that do not support the pointer media query.
 * This is to apply hovers to non touch devices if they are detected
 * and default to apply the hover to older browsers (eg. IE11 and FF)
 */
const hasHoverOrNoPointerMq = rules => css`
	@media(hover: hover) {
		${ rules }
	}
	.no-pointermq & {
		${ rules }
	}
`

/**
 * Convenience method for `hasHoverOrNoPointerMq` :hover styles
 * these are equivalent:
 *
 * ```
 * hasHoverOrNoPointerMq(css`
 *   &:hover {
 *     color: red;
 *   }
 * )
 * ```
 *
 * ```
 * hasHoverOrNoPointerMqHover(`
 *   color: red;
 * `)
 *
 * Note that `css` was omitted because the rules do not need
 * any css post processing. `css` would be required if there
 * was nesting, media queries, etc.
 */
const hasHoverOrNoPointerMqHover = rules => hasHoverOrNoPointerMq(css`
	&:hover {
		${ rules }
	}
`)

// This constant is used when we want to switch based on the image aspect ratio
const widerThanSquareAspectRatio = '@media (min-aspect-ratio: 1/1)'

export {
	tinyBreakpoint,
	smallBreakpoint,
	mediumBreakpoint,
	largeBreakpoint,
	largerBreakpoint,
	extraLargeBreakpoint,
	extraExtraLargeBreakpoint,
	maxWidth,
	minWidth,
	smallAndBelow,
	mediumAndBelow,
	largeAndBelow,
	largerAndBelow,
	extraLargeAndBelow,
	extraExtraLargeAndBelow,
	mediumAndUp,
	largeAndUp,
	largerAndUp,
	extraLargeAndUp,
	extraExtraLargeAndUp,
	hasHoverOrNoPointerMq,
	hasHoverOrNoPointerMqHover,
	widerThanSquareAspectRatio
}
