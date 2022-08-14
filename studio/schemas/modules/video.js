import React from 'react'
import { MdArtTrack, MdSlideshow } from 'react-icons/md'

const videoPreview = ({ value }) => {
	const projectId = process.env.SANITY_STUDIO_API_PROJECT_ID
	const dataset = process.env.SANITY_STUDIO_API_DATASET
	const ref = value.video.asset._ref
	const [_file, id, extension] = ref.split('-')
	const getUrlFromId = () => {
	  // Example ref: file-207fd9951e759130053d37cf0a558ffe84ddd1c9-mp3
	  // We don't need the first part, unless we're using the same function for files and images
	  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${id}.${extension}`
	}
	const fileUrl = getUrlFromId()
	const fileName = id + '.' + extension
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
				}}>{fileName}</h2>
			</header>
			<video muted controls style={{ width: '100%', display: 'block', height: 'auto' }}>
				<source src={getUrlFromId()} type="video/mp4"/>
			</video>
		</div>
	)
}

export default {
	name: 'video',
	title: 'Video',
	type: 'object',
	fields: [
		{
			name: 'video',
			title: 'Video',
			type: 'file',
			description: 'Only .mp4 files are supported',
			options: {
				accept: 'video/mp4',
			}
		}
	],
	preview: {
		select: {
			video: 'video'
		},
		component: videoPreview,
		// prepare (selection) {
		// 	 return Object.assign({}, selection, {
		// 		 media: <MdSlideshow size='24px' style={{ width: '24px !important', height: '24px !important' }}/>
		// 	 })
		//  }
	}
}