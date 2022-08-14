import React from 'react'
import { MdArtTrack, MdSlideshow } from 'react-icons/md'

const listPreview = ({ value }) => {
	const { listItems } = value
	if (!listItems || listItems?.length === 0) {
		return (
			<header style={{ padding: '1rem' }}>
				<h2 style={{
					fontSize: '16px',
			    fontSize: '1rem',
			    lineHeight: '1.25',
			    padding: '4px 0',
			    padding: '0.25rem 0',
			    margin: '-2px 0 -1px',
			    opacity: .5
				}}>There are no list items yet.</h2>
			</header>
		)
	}
	return (
		<div>
			<header style={{ padding: '1rem', borderBottom: '1px solid rgb(93 113 145 / 25%)' }}>
				<h2 style={{
					fontSize: '16px',
			    fontSize: '1rem',
			    lineHeight: '1.25',
			    padding: '4px 0',
			    padding: '0.25rem 0',
			    margin: '-2px 0 -1px',
				}}>Description List</h2>
			</header>
			<dl style={{ padding: '0 1rem' }}>
				{listItems.map((item, index) => (
					<div key={'dl-item-' + index}>
					  {item.title && (<dt style={{ margin: 0, fontWeight: 600, marginTop: index !== 0 ? '1rem' : 0 }}>{item.title}</dt>)}
					  {item.text && (<dd style={{ margin: 0, fontSize: '.9em' }}>{item.text}</dd>)}
				  </div>
			  ))}
			</dl>
		</div>
	)
}

export const listItem = {
	title: 'List Item',
	name: 'listItem',
	type: 'object',
	fields: [
		{
			name: 'title',
			title: 'Title',
			type: 'string'
		},
		{
			name: 'text',
			title: 'Text',
			type: 'text',
			rows: 3
		}
	],
	preview: {
		select: {
			title: 'title',
			subtitle: 'text'
		}
	}
}

export default {
	name: 'descriptionList',
	title: 'Description List',
	type: 'object',
	fields: [
		{
			name: 'listItems',
			type: 'array',
			of: [
				{ type: 'listItem' }
			],
		}
	],
	preview: {
		select: {
			listItems: 'listItems'
		},
		component: listPreview,
	}
}