import React, { Component } from 'react'

import { get, map, identity, filter } from 'lodash'
import styled from '@emotion/styled'
import { css } from '@emotion/react'
import PropTypes from 'prop-types'

import gridSettings, { margin,
	gutter,
	containerMaxWidth
} from 'styles/gridSettings'
import { mq } from 'styles'

// Calculate how many columns the grid has
// UNUSED?
// const numberOfCols = gridSettings => {
// 	const total = gridSettings.match(/\d+/g).reduce((prev, num) => {
// 		return prev + +num
// 	}, 0)

// 	return (total)
// }

// is it wrapped with brackets?
const isColumnDef = d => (
	// /\[[\s]*[\d]+[\s]*\]/g.test(d)
	// Add "m" and "g" characters to test
	/\[[\s]*[\dmg/,/]+[\s]*\]/g.test(d)
)

// get the integer value the def
const parseSize = d => {
	const match = /([\d]+)/g.exec(d)
	const val = get(match, 1)
	return val ? parseInt(val, 10) : null
}

// parse a single grid item definition (eg. '1', '[3], etc.)
const parseGridItemDef = d => {
	let size = parseSize(d)
	let isVariableColumn = false
	if (d === '[m]' || d === 'm') {
		size = margin
		isVariableColumn = true
	} else if (d === '[g]' || d === 'g') {
		size = gutter
		isVariableColumn = true
	}
	return size !== null ? ({
		isColumn: isColumnDef(d),
		size,
		isVariableColumn
	}) : null
}

// parse an entire grid definition (eg. '1 [4] 2 [8] 1')
const parseGridDef = gridDef => {
	const defs = gridDef
		.replace(/[\s]+/g, ' ') // remove extra whitespace
		.replace(/\[[\s]+/g, '[') // remove whitespace inside opening bracket
		.replace(/[\s]+\]/g, ']') // remove whitespace inside closing bracket
		.split(' ')
	return map(defs, parseGridItemDef).filter(identity)
}

const gridGapToCss = (gap, index) => {
	if (Array.isArray(gap)) {
		return gap[index]
	} else if (gap) {
		return gap
	} else {
		return 'unset'
	}
}

// convert grid def to css attributes for the grid parent
const gridDefToCss = gridDef => {
	const gridData = parseGridDef(gridDef)

	// while iterating, track where the next item should start
	// this is a grid-column-start css value (1 is the start of the grid)
	let colStart = 1

	// while iterating, track how many items in the grid
	let colCount = 1

	const numColumns = filter(gridData, ({ isColumn }) => isColumn).length

	const columnCssDefinitions = map(gridData, ({ isColumn, size, isVariableColumn }) => {
		let result = null
		if (isColumn) {
			// use nth-child to define the children styles so the children
			// don't have to
			result = `
				& > *:nth-of-type(${ numColumns }n + ${ colCount }) {
					grid-column: ${ colStart } / span ${ isVariableColumn ? 1 : size };
				}
			`
			colCount++
		}

		if (isVariableColumn) {
			colStart++
		} else {
			colStart += size
		}
		return result
	}).filter(identity) // remove any nulls

	const gridWidth = gridData.reduce(
		(acc, { size }) => (acc + size),
		0
	)

	// repeat(${ gridWidth }, minmax(0, 1fr))
	let width = ''

	gridData.forEach(col => {
		if (col.isVariableColumn) {
			width += col.size + ' '
		} else {
			width += 'repeat(' + col.size + ', minmax(0, 1fr)) '
		}
	})

	return `
		// grid-template-columns: repeat(${ gridWidth }, minmax(0, 1fr));
		grid-template-columns: ${ width };
		${ columnCssDefinitions.join(' ') }
	`
}

const containerSetup = `padding-left: var(--site-margins); padding-right: var(--site-margins);`

const StyledGrid = styled.div`
	display: grid;
	width: 100%;
	direction: ${ ({ gridDirection }) => gridDirection };
	align-items: ${ ({ vAlign }) => vAlign };
	> * {
		direction: unset;
	}

	${ props => gridDefToCss(props.small) }
	${ props => ({ columnGap: gridGapToCss(props.colGap, 0) }) }
	${ props => ({ rowGap: gridGapToCss(props.rowGap, 0) }) }
	${ ({ containerSizes }) => containerSizes[0] ? containerSetup : '' }


	${ ({ medium, colGap, rowGap, containerSizes }) => medium && `
		${ mq.mediumAndUp } {
			${ gridDefToCss(medium) }
			column-gap: ${ gridGapToCss(colGap, 1) };
			row-gap: ${ gridGapToCss(rowGap, 1) };
			${ containerSizes[1] ? containerSetup : '' }
		}
	` }

	${ ({ large, colGap, rowGap, containerSizes }) => large && `
		${ mq.largerAndUp } {
			${ gridDefToCss(large) }
			column-gap: ${ gridGapToCss(colGap, 2) };
			row-gap: ${ gridGapToCss(rowGap, 2) };
			${ containerSizes[2] ? containerSetup : '' }
		}
	` }

	${ ({ larger, colGap, rowGap, containerSizes }) => larger && `
		${ mq.extraLargeAndUp } {
			${ gridDefToCss(larger) }
			column-gap: ${ gridGapToCss(colGap, 2) };
			row-gap: ${ gridGapToCss(rowGap, 2) };
			${ containerSizes[3] ? containerSetup : '' }
		}
	` }

	${ ({ extraLarge, colGap, rowGap, containerSizes }) => extraLarge && `
		${ mq.extraExtraLargeAndUp } {
			${ gridDefToCss(extraLarge) }
			column-gap: ${ gridGapToCss(colGap, 2) };
			row-gap: ${ gridGapToCss(rowGap, 2) };
			${ containerSizes[4] ? containerSetup : '' }
		}
	` }
`

class Grid extends Component {
	render () {
		let { small, medium, large, larger, extraLarge, colGap, rowGap, children, vAlign, gridDirection, className, as, ...rest } = this.props

		// Set up special 'container' value
		const containerValue = '[1]'
		const containerSizes = [
			small === 'container',
			medium === 'container',
			large === 'container',
			larger === 'container',
			extraLarge === 'container'
		]
		if (small === 'container') { small = containerValue }
		if (medium === 'container') { medium = containerValue }
		if (large === 'container') { large = containerValue }
		if (larger === 'container') { larger = containerValue }
		if (extraLarge === 'container') { larger = containerValue }

		const vAlignMap = {
			bottom: 'end',
			top: 'start',
			center: 'center',
			middle: 'center',
			baseline: 'baseline',
			stretch: 'stretch'
		}

		return (
			<StyledGrid
				className={className}
				as={as}
				small={small}
				medium={medium}
				large={large}
				larger={larger}
				extraLarge={extraLarge}
				colGap={colGap}
				rowGap={rowGap}
				vAlign={vAlignMap[vAlign]}
				gridDirection={gridDirection}
				containerSizes={containerSizes}
				{...rest}
			>
				{children}
			</StyledGrid>
		)
	}
}

export const Container = ({ small, medium, large, larger, extraLarge, children, ...rest }) => (
	<Grid
		small='container'
		{...rest}
	>
		{children}
	</Grid>
)

Grid.propTypes = {
	small: PropTypes.string.isRequired,
	medium: PropTypes.string,
	large: PropTypes.string,
	extraLarge: PropTypes.string,
	vAlign: PropTypes.string
}

const gridDefaults = gridSettings
gridDefaults.gridDirection = 'ltr'

Grid.defaultProps = gridDefaults

export default Grid
