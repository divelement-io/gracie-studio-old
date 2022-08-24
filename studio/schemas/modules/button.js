import React from 'react'
import { MdLink, MdOpenInNew, MdMail, MdPhone, MdFolder } from 'react-icons/md'
import IconUI from '../../components/IconUI'
import ClientAsyncSelect from '../../components/ClientAsyncSelect'
import { formatPhone } from '../../styles/format'

export default {
  title: 'Button',
  name: 'button',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Link CTA',
      type: 'string'
    },
    {
      name: 'type',
      title: 'Button Type',
      type: 'string',
      validation: (Rule) => Rule.required(),
      inputComponent: IconUI,
      initialValue: 'pageLink',
      options: {
        list: [
          { title: 'To Page', value: 'pageLink', icon: <MdLink /> },
          { title: 'External Link', value: 'externalLink', icon: <MdOpenInNew /> },
          { title: 'Email', value: 'emailLink', icon: <MdMail /> },
          { title: 'Phone', value: 'phoneLink', icon: <MdPhone /> },
          { title: 'File', value: 'fileLink', icon: <MdFolder /> }
        ]
      }
    },
    {
      name: 'link',
      title: 'Link',
      type: 'reference',
      hidden: ({ parent }) => parent.type !== 'pageLink',
      to: [
        { type: 'page' }
      ]
    },
    {
      name: 'linkSection',
      title: 'Page Section',
      description: 'Optional',
      inputComponent: ClientAsyncSelect,
      type: 'string',
      hidden: ({ parent }) => !parent.link || parent.type !== 'pageLink',
    },
    {
      name: 'externalLink',
      title: 'External Link',
      type: 'string',
      hidden: ({ parent }) => parent.type !== 'externalLink',
      validation: Rule =>
        Rule.uri({
          allowRelative: true,
          scheme: ['https', 'http', 'mailto', 'tel']
        })
    },
    {
      name: 'file',
      title: 'File',
      type: 'file',
      hidden: ({ parent }) => parent.type !== 'fileLink',
    },
    {
      name: 'emailLink',
      title: 'Email Address',
      type: 'string',
      hidden: ({ parent }) => parent.type !== 'emailLink',
    },
    {
      name: 'phoneLink',
      title: 'Phone Number',
      description: 'No spaces dashes or dots',
      type: 'string',
      hidden: ({ parent }) => parent.type !== 'phoneLink',
    },
    {
      name: 'theme',
      title: 'Theme',
      type: 'string',
      initialValue: 'primary',
      options: {
        list: ['primary', 'secondary', 'outline']
      }
    },
    {
      name: 'newTab',
      title: 'Open in new tab',
      initialValue: false,
      type: 'boolean'
    }
  ],
  preview: {
    select: {
      title: 'title',
      externalLink: 'externalLink',
      pageLink: 'link.content.main.title',
      link: 'link',
      type: 'type'
    },
    prepare (selection) {
      const { link, externalLink, pageLink, type, phoneNumber } = selection
      let subtitle = 'Link to page'
      let media = MdLink
      if (type === 'externalLink') {
        subtitle = 'Link to ' + externalLink
        media = MdOpenInNew
      } else if (type === 'postLink') {
        subtitle = 'Link to blog post'
        media = MdOpenInNew
      } else if (type === 'fileLink') {
        subtitle = 'Link to file'
        media = MdFolder
      } else if (type === 'phoneLink') {
        subtitle = 'Call ' + formatPhone(phoneNumber)
        media = MdPhone
      } else if (type === 'pageLink') {
        subtitle = 'Link to ' + pageLink + ' page'
      }
      return Object.assign({}, selection, {
        media: media,
        subtitle: subtitle
      })
    }
  }
}
