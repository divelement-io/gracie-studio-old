import React from 'react'

const embedPreview = ({ value }) => {
	// return (JSON.stringify(props, null, 2))
	// if (!id) {
	// 	return <div>Missing Video URL</div>
	// }
	return (
		<div>
			<header style={{ padding: '1rem' }}>
				<h2 style={{
					fontSize: '16px',
			    fontSize: '1rem',
			    lineHeight: '1.25',
			    padding: '4px 0',
			    padding: '0.25rem 0',
			    margin: '-2px 0 -1px',
				}}>Embed Code</h2>
			</header>
			<div
				style={{
					borderTop: '1px solid rgba(123, 140, 168, .2)',
					padding: '1rem',
					fontFamily: 'monospace',
					background: '#f1f3f6'
				}}>
				{value.embedCode}
			</div>
		</div>
	)
}

export default {
	name: 'embed',
	title: 'Embed',
	description: 'Use carefully. Input <script> or <iframe> tags',
	type: 'object',
	fields: [
		{
			name: 'embedCode',
			title: 'Embed Code',
			type: 'text',
		}
	],
	preview: {
		select: {
			embedCode: 'embedCode'
		},
		component: embedPreview
	}
}