import React from 'react'

const ThemeIcon = ({ theme }) => {
	if (!theme) {
		return false
	}

	return (
		<div
			style={{ 
				width: '40px',
				height: '40px',
				margin: '2px',
				background: theme[1]?.background || '#e4e8ed',
				color: theme[1]?.color || 'currentcolor',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				fontSize: '20px'
			}}
		>
			<strong>Aa</strong>
		</div>)
}

export default ThemeIcon
