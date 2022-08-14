import React from 'react'
import { FiAlignLeft } from 'react-icons/fi'

export default {
  name: 'column',
  title: 'Column',
  type: 'object',
  fields: [
    {
      name: 'text',
      title: 'text',
      type: 'textLockup'
    },
    {
      name: 'image',
      title: 'Icon',
      type: 'image'
    }
  ],
  preview: {
    select: {
      media: 'image',
      title: 'text.eyebrow',
    },
    prepare (selection) {
      const { media, title } = selection
      return Object.assign({}, selection, {
        title: title || 'Column',
        media: media || <FiAlignLeft size='24px' />
      })
    }
  }
}