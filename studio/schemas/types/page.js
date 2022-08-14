import React from 'react'
import { MdInsertDriveFile, MdHome } from 'react-icons/md'

export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  liveEdit: false,
  // You probably want to uncomment the next line once you've made the pages documents in the Studio. This will remove the pages document type from the create-menus.
  // __experimental_actions: ['update', 'publish', /* 'create', 'delete' */],
  fields: [
    {
      name: "content",
      type: "pageContent",
    }
  ],
  preview: {
    select: {
      title: 'content.main.title',
      subtitle: 'content.main.slug.current',
      media: 'mainImage'
    },
    prepare (selection) {
      let isHome = false
      if (selection.subtitle === 'home' || selection.subtitle === '/') {
        isHome = true
      }
      return Object.assign({}, selection, {
        media: isHome ? <MdHome size='24px'/> : <MdInsertDriveFile size='24px'/>
      })
    }
  }
}
