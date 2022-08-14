import React from 'react'
import getYouTubeID from 'get-youtube-id'

const YouTubePreview = ({ value }) => {
	const id = getYouTubeID(value.url)
	const url = `https://www.youtube.com/embed/${id}`
	if (!id) {
		return <div>Missing Video URL</div>
	}
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
				}}>{value.url}</h2>
			</header>
			<div style={{ position: 'relative', paddingBottom: 9 / 16 * 100 + '%' }}>
				<iframe
					// width="560"
					// height="315"
					style={{ display: 'block', width: '100%', height: '100%', position: 'absolute' }}
					src={'https://www.youtube.com/embed/' + id}
					title="YouTube video player"
					frameborder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				/>
			</div>
		</div>
	)
}

export default {
	name: 'youTube',
	title: 'YouTube',
	type: 'object',
	fields: [
		{
			name: 'url',
			type: 'url',
			title: 'URL',
			description: 'The share URL for the YouTube video. Not the embed code.'
		}
	],
	preview: {
		select: {
			url: 'url'
		},
		component: YouTubePreview
	}
}