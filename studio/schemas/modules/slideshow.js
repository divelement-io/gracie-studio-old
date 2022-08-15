import React from 'react'
import { MdViewCarousel } from 'react-icons/md'
import SectionIcon from '../../components/SectionIcon'

export default {
  title: 'Slideshow',
  name: 'slideshow',
  icon: <MdViewCarousel size='18px' />,
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
      type: 'theme',
    },
    {
      name: 'slides',
      title: 'Slides',
      type: 'array',
      validation: Rule => Rule.required().min(1),
      options: {
        layout: 'grid'
      },
      of: [{ type: 'slide', name: 'slide' }]
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
      slides: 'slides'
    },
    prepare (selection) {
      const { title, subtitle, media, hidden, theme, slides } = selection
      return Object.assign({}, selection, {
        subtitle: hidden ? 'Hidden' : 'Slideshow (' + slides.length + ' slide' + (slides?.length !== 1 ? 's' : '') + ')',
        media: <SectionIcon hidden={hidden} theme={theme}><MdViewCarousel size='24px'/></SectionIcon>
      })
    }
  }
}

export const slideshowItem = {
  title: 'Slide',
  type: 'image',
  name: 'slide',
  fields: [
    {
      title: 'Caption',
      name: 'caption',
      type: 'string',
      options: { isHighlighted: true },
    },
    {
      title: 'Alt Text',
      name: 'altText',
      type: 'string',
      options: { isHighlighted: true },
      description: 'A description of the image. This is important for SEO.'
    }
  ],
  preview: {
    select: {
      caption: 'caption',
      altText: 'altText',
      media: 'asset'
    },
    prepare (selection) {
      console.log(selection)
      const { caption, altText, media } = selection
      return Object.assign({}, selection, {
        title: caption || altText || 'Image',
        subtitle: (caption && altText) && altText || false,
        media: media
      })
    }
  }
}
