import React from 'react'
import IconUI from '../../components/IconUI'
import { MdPause } from 'react-icons/md'
import SectionIcon from '../../components/SectionIcon'

export default {
  title: 'Two Column Text',
  name: 'twoColumnText',
  type: 'object',
  fields: [
    {
      name: 'internalName',
      title: 'Internal Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'leftText',
      title: 'Headline',
      type: 'string',
    },
    {
      name: 'rightText',
      title: 'Right Text',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'actions',
      title: 'Actions',
      type: 'actions',
    },
    {
      name: 'theme',
      title: 'Theme',
      type: 'theme',
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
      // subtitle: 'leftText.eyebrow',
      hidden: 'hidden',
      theme: 'theme'
    },
    prepare(selection) {
      const { alignment, subtitle, hidden, theme } = selection
      return Object.assign({}, selection, {
        subtitle: hidden ? 'Hidden' : subtitle || 'Two Column Text',
        media: <SectionIcon hidden={hidden} theme={theme}><MdPause size='24px'/></SectionIcon>,
      });
    },
  },
};
