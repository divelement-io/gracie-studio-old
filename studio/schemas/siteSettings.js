import React from 'react'
import Tabs from 'sanity-plugin-tabs'
import { MdSettings } from 'react-icons/md'
import SectionIcon from "../components/SectionIcon"

export default {
  name: 'siteSettings',
  _id: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // You probably want to uncomment the next line once you've made a siteSettings document in the Studio. This will remove the settings document type from the create-menus.
  __experimental_actions: ['update', 'publish', /* 'create', 'delete' */],
  inputComponent: Tabs,
  fieldsets: [
    { name: "main", title: "Settings" },
    { name: "meta", title: "Default SEO" }
  ],
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string',
      fieldset: 'main'
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      fieldset: 'main',
      rows: 4
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      fieldset: 'main',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'social',
      title: 'Social',
      type: 'social',
      fieldset: 'main'
    },
    {
      name: 'favicon',
      title: 'Favicon',
      description: '32x32 .png file to be shown in the browser tab bar. transparent background is best.',
      type: 'image',
      fieldset: 'main',
      options: {
        accept: ['.png'],
      }
    },
    {
      name: 'touchicon',
      title: 'Touch Icon',
      description: '200x200 .png file to be used as an icon in rare occasions. Solid background is best.',
      type: 'image',
      fieldset: 'main',
      options: {
        accept: ['.png'],
      }
    },
    {
      name: 'seo',
      title: 'Default SEO',
      type: 'seo',
      fieldset: 'meta'
    }
  ],
  preview: {
    select: {
      media: 'favicon'
    },
    prepare (selection) {
      return Object.assign({}, selection, {
        title: 'Site Settings',
        media: false
      })
    }
  }
}
