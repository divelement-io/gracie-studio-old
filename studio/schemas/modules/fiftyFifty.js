import React from 'react'

import {
  MdArtTrack,
  MdPlayArrow,
  MdVerticalAlignBottom,
  MdVerticalAlignCenter,
  MdVerticalAlignTop,
} from 'react-icons/md'
import { FiAlignCenter, FiAlignLeft } from 'react-icons/fi'
import SectionIcon from '../../components/SectionIcon'
import IconUI from '../../components/IconUI'

export default {
  title: 'Fifty Fifty',
  name: 'fiftyFifty',
  type: 'object',
  hidden: true,
  fields: [
    {
      name: 'internalName',
      title: 'Internal Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'theme',
      title: 'Theme',
      type: 'theme'
    },
    {
      name: 'media',
      title: 'Media',
      type: 'media',
    },
    {
      name: 'text',
      title: 'Text',
      type: 'textLockup'
    },
    {
      name: 'actions',
      title: 'Actions',
      type: 'actions'
    },
    {
      name: 'mediaPlacement',
      title: 'Media Placement',
      type: 'string',
      initialValue: 'left',
      options: {
        list: ['left', 'right'],
        layout: 'dropdown',
      },
    },
    {
      name: 'width',
      title: 'Section Width',
      type: 'string',
      initialValue: 'default',
      options: {
        list: ['default', 'fullWidth'],
        layout: 'dropdown',
      },
    },
    {
      name: 'mediaWidth',
      title: 'Media Size',
      type: 'string',
      initialValue: 'normal',
      options: {
        list: ['normal', 'large', 'extraLarge'],
        layout: 'dropdown',
      },
    },
    {
      name: 'verticalAlignment',
      title: 'Vertical Alignment',
      type: 'string',
      initialValue: 'center',
      inputComponent: IconUI,
      options: {
        list: [
          { title: 'Top', value: 'top', icon: <MdVerticalAlignTop/> },
          { title: 'Center', value: 'center', icon: <MdVerticalAlignCenter/> },
          { title: 'Bottom', value: 'bottom', icon: <MdVerticalAlignBottom/> }
        ]
      }
    },
    {
      name: "textAlignment",
      title: "Alignment",
      type: "string",
      initialValue: "center",
      inputComponent: IconUI,
      options: {
        list: [
          { title: "Left", value: "left", icon: <FiAlignLeft />},
          { title: "Center", value: "center", icon: <FiAlignCenter />}
        ],
      },
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
      subtitle: 'text.eyebrow',
      media: 'media',
      hidden: 'hidden',
      theme: 'theme'
    },
    prepare (selection) {
      const { title, subtitle, media, hidden, theme } = selection
      return Object.assign({}, selection, {
        subtitle: hidden ? 'Hidden' : subtitle || 'Fifty Fifty',
        media: media.mediaType === 'video' ? <SectionIcon hidden={hidden} theme={theme}><MdPlayArrow size='24px'/></SectionIcon> : media.image
      })
    }
  }
}
