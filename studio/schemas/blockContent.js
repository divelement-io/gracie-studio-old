import React from 'react'
import { MdLink, MdPlayArrow, MdCode, MdImage } from 'react-icons/md'
import { FaYoutube } from 'react-icons/fa'
import ImagePreview from '../components/previews/ImagePreview'

const largeRender = props => (
  <span style={{ fontSize: '1.2em' }}>{props.children}</span>
)

const smallRender = props => (
  <span style={{ fontSize: '.85em', lineHeight: '1.4em' }}>{props.children}</span>
)

export default {
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      // Styles let you set what your user can mark up blocks with. These
      // corrensponds with HTML tags, but you can set any title or value
      // you want and decide how you want to deal with it where you want to
      // use your content.
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Large', value: 'bodyLarge', blockEditor: { render: largeRender } },
        { title: 'Small', value: 'bodySmall', blockEditor: { render: smallRender } },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'Quote', value: 'blockquote' }
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' }
      ],
      // Marks let you mark up inline text in the block editor.
      marks: {
        // Decorators usually describe a single property – e.g. a typographic
        // preference or highlighting by editors.
        decorators: [{ title: 'Strong', value: 'strong' }, { title: 'Emphasis', value: 'em' }],
        // Annotations can be any object structure – e.g. a link or a footnote.
        annotations: [
          {
            title: 'Link',
            name: 'link',
            type: 'link'
          }
        ]
      }
    },
    {
      name: 'inlineImage',
      title: 'Image',
      type: 'object',
      icon: MdImage,
      fields: [
        {
          name: 'image',
          title: 'Image',
          type: 'image',
          options: {
            hotspot: true
          }
        },
        {
          name: 'caption',
          title: 'Caption (Optional)',
          type: 'string'
        }
      ],
      preview: {
        select: {
          image: 'image',
          caption: 'caption'
        },
        component: ImagePreview,
      }
    },
    {
      type: 'video',
      title: 'Video',
      icon: MdPlayArrow
    },
    {
      type: 'youTube',
      title: 'YouTube',
      icon: FaYoutube
    },
    {
      type: 'descriptionList',
      title: 'Description List',
      // icon: FaYoutube
    },
    // Embed In Progress
    // {
    //   type: 'embed',
    //   title: 'Embed',
    //   icon: MdCode
    // },
    // You can add additional types here. Note that you can't use
    // primitive types such as 'string' and 'number' in the same array
    // as a block type.
   
  ]
}
