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
    {
      name: 'sublinks',
      title: 'Dropdown Links',
      type: 'array',
      options: {
        editModal: 'popover'
      },
      of: [
        { type: 'link' }
      ],
    }
  ],
  preview: {
    select: {
      title: 'itemLink.title',
      externalLink: 'itemLink.externalLink',
      sublinks: 'sublinks',
    },
    prepare (selection) {
      const { sublinks, externalLink } = selection
      let hasSublinks = false
      let sublinkLabel = 'sublinks'
      if (sublinks?.length > 0) {
        hasSublinks = true
        if (sublinks.length === 1) {
          sublinkLabel = 'sublink'
        }
      }
      const fallbackSubtitle = externalLink ? 'Link to ' + externalLink : 'Link to page'
      return Object.assign({}, selection, {
        media: hasSublinks > 0 ? <MdOpenInNew size='24px' /> : <MdLink size='24px' />,
        subtitle: hasSublinks > 0 ? sublinks.length + ' ' + sublinkLabel : fallbackSubtitle
      })
    }
  }
}
