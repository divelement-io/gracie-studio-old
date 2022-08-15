import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import { util } from 'src/styles'

const Icon = styled.span`
	font-family: 'Material Icons';
	font-weight: normal;
	font-style: normal;
	display: inline-block;
	line-height: 1em;
	text-transform: none;
	letter-spacing: normal;
	word-wrap: normal;
	white-space: nowrap;
	direction: ltr;
	${ util.fontSmoothing }
	font-feature-settings: 'liga';
	color: inherit;
	// 24px is the Google prefered icon size
	font-size: ${ ({ size }) => size };
`

const MaterialIcon = ({ children, size, className }) => (
	<Icon size={size || undefined} className={'icon ' + className}>{children}</Icon>
)

MaterialIcon.defaultProps = {
	size: '24px'
}

MaterialIcon.propTypes = {
  /** Can be a string coresponding to <a href="https://fonts.google.com/icons?selected=Material+Icons" target="_blank">Material Icons</a> or a custom component or SVG */
  children: PropTypes.string,
  /** Include units. ei: '24px' or '1em' */
  size: PropTypes.string
}

export default MaterialIcon
