import React from 'react'
import { MdVisibilityOff } from 'react-icons/md'
import themes from '../../web/src/styles/themes'

const SectionIcon = ({ children, hidden, theme }) => {
	if (!theme) {
		theme = 'default'
	}
	return (
		<div 
			style={{ 
				borderRadius: '3px',
				width: '34px',
				height: '100%',
				background: themes[theme] && !hidden ? themes[theme]?.background : '#e4e8ed',
				color: themes[theme] && !hidden ? themes[theme]?.color : 'inherit',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				fontSize: '18px'
			}}
		>
			{hidden ? <MdVisibilityOff size='24px' style={{ color: '#a5b1c4' }}/> : children}
		</div>)
}

export default SectionIcon;
