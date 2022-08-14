import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import CartLeftSvg from 'assets/images/cart-icon-left.svg'
import CartRightSvg from 'assets/images/cart-icon-right.svg'
import { typography } from 'styles'

const Wrapper = styled.div`
	position: relative;
	display: inline-flex;
	align-items: flex-end;
	color: inherit;
	* {
		opacity: 1;
	}
	svg {
		flex-shrink: 0;
		* {
			fill: currentcolor;
		}
	}
`

const CartCount = styled.span`
	position: absolute;
	color: inherit;
	position: absolute;
	top: -5%;
	left: 19%;
	right: -1px;
	text-align: center;
	font-size: 12px;
	font-weight: ${ typography.medium };
	letter-spacing: 0;
	${ ({ count }) => count > 9 ? '' : '' }
	line-height: 10px;
`

const CartCenter = styled.div`
	min-width: ${ ({ width }) => width };
	height: 2px;
	margin-bottom: 4px;
	background: currentcolor;
`

const CartBar = styled.div`
	height: 2px;
	position: absolute;
	left: 6px;
	right: 1px;
	top: 3px;
	background: currentcolor;
`

const CartIcon = ({ className, count }) => (
  <Wrapper className={className}>
		{count > 0 && (<CartCount count={count}>{count}</CartCount>)}
		{count < 1 && (<CartBar/>)}
		<CartLeftSvg/>
		<CartCenter width={count >= 10 ? '12px' : '8px'}/>
		<CartRightSvg/>
  </Wrapper>
)

CartIcon.defaultProps = {
	count: 0
}

CartIcon.propTypes = {
	/** Number of items in cart */
	count: PropTypes.number
}

export default CartIcon
