import React from 'react'

import { MdViewWeek } from 'react-icons/md'
import SectionIcon from '../../components/SectionIcon'
import IconUI from '../../components/IconUI'
import { FiAlignCenter, FiAlignLeft } from 'react-icons/fi'

export default {
  title: 'Columns',
  name: 'columns',
  type: 'object',
  fields: [
    {
      name: 'internalName',
      title: 'Internal Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'introText',
      title: 'Intro Text',
      type: 'textLockup'
    },
    {
      name: 'columns',
      title: 'Columns',
      type: 'array',
      of: [
        { type: 'column' }
      ]
    },
    {
      name: 'actions',
      title: 'Actions',
      type: 'actions'
    },
    {
      name: 'alignment',
      title: 'Alignment',
      type: 'string',
      initialValue: 'center',
      inputComponent: IconUI,
      options: {
        list: [
          { title: 'Left', value: 'left', icon: <FiAlignLeft/> },
          { title: 'Center', value: 'center', icon: <FiAlignCenter/> }
        ]
      }
    },
    {
      name: 'imageSize',
      title: 'Image Size',
      type: 'string',
      initialValue: 'small',
      options: {
        list: ['small', 'medium', 'large']
      }
    },
    {
      name: 'theme',
      title: 'Theme',
      type: 'theme'
    },
    {
      name: 'hidden',
      title: 'Hidden',
      initialValue: false,
      type: 'boolean',
    },
  ],
  preview: {
    select: {
      title: 'internalName',
      columns: 'columns',
      theme: 'theme',
      hidden: 'hidden'
    },
    prepare (selection) {
      const { columns, theme, hidden } = selection
      const getSubtitle = (columns) => {
        if (hidden) {
          return 'Hidden'
        } else {
          return columns?.length ? (columns.length + ' columns') : '0 columns'
        }
      }
      return Object.assign({}, selection, {
        subtitle: getSubtitle(columns),
        media: <SectionIcon hidden={hidden} theme={theme}><MdViewWeek size='24px'/></SectionIcon>
      })
    }
  }
}
