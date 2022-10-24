export default {
  title: 'Collection Content',
  name: 'collectionModule',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'For Collection URL',
      options: {
        source: 'content.main.title',
        slugify: (input) =>
          '/' + input
            .toLowerCase()
            //Remove spaces
            .replace(/\s+/g, "-")
            //Remove special characters
            .replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, ""),
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true
      },
      validation: Rule => Rule.required()
    },
    {
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    },
    {
      name: 'attachment',
      title: 'Attachment',
      type: 'inlineFile',
      options: {
        accept: 'application/pdf'
      }
    },
    {
      name: 'wallpapers',
      title: 'Wallpapers',
      type: 'array',
      of: [
        { type: 'reference',
          to: [{type: 'wallpaper'}]
        }
      ]
    },
    {
      name: 'subCollections',
      title: 'Sub Collections',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'collection'}]
        }
      ]
    },
    {
      name: 'relatedCollections',
      title: 'Related Collections',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'collection'}]
        }
      ]
    }
  ]
}
