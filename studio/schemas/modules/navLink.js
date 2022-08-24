import React from 'react'
import { MdLink, MdOpenInNew, MdSubdirectoryArrowRight } from 'react-icons/md'

export default {
  title: 'Navigation Link',
  name: 'navLink',
  type: 'object',
  fields: [
    {
      name: 'itemLink',
      type: 'link'
    },
  ],
  preview: {
    select: {
      title: 'itemLink.title',
      externalLink: 'itemLink.externalLink',
    },
    prepare (selection) {
      const { externalLink } = selection

      const fallbackSubtitle = externalLink ? 'Link to ' + externalLink : 'Link to page'

      return Object.assign({}, selection, {
        media:  <MdLink size='24px' />,
        subtitle: fallbackSubtitle
      })
    }
  }
}


    // {
    //   name: 'sublinks',
    //   title: 'Dropdown Links',
    //   type: 'array',
    //   options: {
    //     editModal: 'popover'
    //   },
    //   of: [
    //     { type: 'link' }
    //   ],
    // }